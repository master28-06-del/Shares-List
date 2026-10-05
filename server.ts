import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Cache to prevent hitting rate limits
let cachedQuotes: any = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds cache

const TICKER_MAP: Record<string, string> = {
  PKN: 'PKN.WA',
  PKO: 'PKO.WA',
  PZU: 'PZU.WA',
  DNP: 'DNP.WA',
  PEO: 'PEO.WA',
  KGH: 'KGH.WA',
  LPP: 'LPP.WA',
  SPL: 'EBP.WA', // Santander Bank Polska (EBP on WSE)
  ALE: 'ALE.WA',
  CDR: 'CDR.WA',
  BDX: 'BDX.WA',
  MBK: 'MBK.WA',
  KTY: 'KTY.WA',
  ALR: 'ALR.WA',
  KRU: 'KRU.WA',
  PGE: 'PGE.WA',
  OPL: 'OPL.WA',
  PCO: 'PCO.WA',
  CPS: 'CPS.WA',
  JSW: 'JSW.WA'
};

async function fetchLiveQuotes() {
  const now = Date.now();
  if (cachedQuotes && (now - lastCacheTime < CACHE_TTL_MS)) {
    return cachedQuotes;
  }

  const quotes: Record<string, { price: number; change1D: number; high?: number; low?: number }> = {};
  
  // Fetch tickers in parallel with a timeout
  const fetchPromises = Object.entries(TICKER_MAP).map(async ([symbol, yahooSymbol]) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=1d`, {
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
        },
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (res.ok) {
        const json = await res.json();
        const meta = json.chart?.result?.[0]?.meta;
        if (meta && typeof meta.regularMarketPrice === 'number') {
          quotes[symbol] = {
            price: Number(meta.regularMarketPrice.toFixed(2)),
            change1D: meta.regularMarketChangePercent ? Number(meta.regularMarketChangePercent.toFixed(2)) : 0,
            high: meta.regularMarketDayHigh ? Number(meta.regularMarketDayHigh.toFixed(2)) : undefined,
            low: meta.regularMarketDayLow ? Number(meta.regularMarketDayLow.toFixed(2)) : undefined
          };
        }
      }
    } catch (err) {
      console.warn(`Could not fetch quote for ${symbol}:`, (err as Error).message);
    }
  });

  // Also fetch WIG20 Index
  let wig20 = { indexLevel: 4195.20, change1D: 0.79 };
  const wig20Promise = (async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/WIG20.WA?interval=1d&range=1d`, {
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
        },
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (res.ok) {
        const json = await res.json();
        const meta = json.chart?.result?.[0]?.meta;
        if (meta && typeof meta.regularMarketPrice === 'number') {
          wig20 = {
            indexLevel: Number(meta.regularMarketPrice.toFixed(2)),
            change1D: meta.regularMarketChangePercent ? Number(meta.regularMarketChangePercent.toFixed(2)) : 0.79
          };
        }
      }
    } catch (err) {
      console.warn('Could not fetch WIG20 index quote');
    }
  })();

  await Promise.allSettled([...fetchPromises, wig20Promise]);

  cachedQuotes = {
    quotes,
    wig20,
    timestamp: new Date().toISOString(),
    source: 'Giełda Papierów Wartościowych w Warszawie (Yahoo Finance Real-Time API)'
  };
  lastCacheTime = now;

  return cachedQuotes;
}

app.get('/api/quotes', async (req, res) => {
  try {
    const data = await fetchLiveQuotes();
    res.json({
      success: true,
      ...data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
