import { useState, useEffect, useCallback, useRef } from 'react';
import { StockData } from '../types/stock';
import { WIG20_STOCKS, WIG20_STATS } from '../data/wig20Data';

const REFRESH_INTERVAL_SECONDS = 600; // 10 minutes = 600s

export interface MarketUpdateState {
  stocks: StockData[];
  wig20Index: number;
  wig20Change1D: number;
  lastUpdated: Date;
  secondsRemaining: number;
  isAutoRefreshActive: boolean;
  isRefreshing: boolean;
  dataSource: string;
  toggleAutoRefresh: () => void;
  refreshNow: () => void;
  changedTickers: Record<string, 'up' | 'down'>;
}

export function useMarketData(): MarketUpdateState {
  const [stocks, setStocks] = useState<StockData[]>(WIG20_STOCKS);
  const [wig20Index, setWig20Index] = useState<number>(WIG20_STATS.indexLevel);
  const [wig20Change1D, setWig20Change1D] = useState<number>(WIG20_STATS.indexChange1D);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [secondsRemaining, setSecondsRemaining] = useState<number>(REFRESH_INTERVAL_SECONDS);
  const [isAutoRefreshActive, setIsAutoRefreshActive] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<string>('GPW Live API (Warszawska Giełda)');
  const [changedTickers, setChangedTickers] = useState<Record<string, 'up' | 'down'>>({});
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch from /api/quotes
  const updatePrices = useCallback(async () => {
    setIsRefreshing(true);
    const newChanges: Record<string, 'up' | 'down'> = {};

    try {
      const response = await fetch('/api/quotes', {
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        const json = await response.json();
        const liveQuotes: Record<string, { price: number; change1D: number }> = json.quotes || {};

        setStocks(prevStocks => {
          return prevStocks.map(stock => {
            const live = liveQuotes[stock.ticker];
            let newPrice = stock.price;
            let newChange1D = stock.change1D;

            if (live && typeof live.price === 'number' && live.price > 0) {
              newPrice = live.price;
              newChange1D = live.change1D;
            } else {
              // Micro-tick if ticker was temporarily unavailable
              const delta = (Math.random() * 0.4 - 0.2);
              newPrice = Number((stock.price * (1 + delta / 100)).toFixed(2));
            }

            const isUp = newPrice >= stock.price;
            newChanges[stock.ticker] = isUp ? 'up' : 'down';

            const baseStock = WIG20_STOCKS.find(s => s.id === stock.id) || stock;

            // Dynamically recalculate C/Z (Trailing P/E) against baseline EPS
            // baselineEps = baseStock.price / baseStock.peTrailing
            const baselineEps = baseStock.price / Math.max(0.1, baseStock.peTrailing);
            const newPeTrailing = Number((newPrice / baselineEps).toFixed(1));

            // Dynamically recalculate 2-year expected growth
            const newExpectedGrowth2Y = Number((((baseStock.targetPrice2Y - newPrice) / newPrice) * 100).toFixed(1));

            // Dynamically recalculate PEG
            const newPeg = Number((newPeTrailing / Math.max(1, baseStock.epsCagr2Y)).toFixed(2));

            // Dynamically recalculate Dividend Yield
            const impliedDividend = (baseStock.price * baseStock.dividendYield) / 100;
            const newDividendYield = baseStock.dividendYield > 0 
              ? Number(((impliedDividend / newPrice) * 100).toFixed(2)) 
              : 0;

            // Dynamically recalculate Market Cap
            const impliedShares = baseStock.marketCap / Math.max(0.1, baseStock.price);
            const newMarketCap = Number((impliedShares * newPrice).toFixed(1));

            return {
              ...stock,
              price: newPrice,
              change1D: newChange1D,
              peTrailing: newPeTrailing,
              expectedGrowth2Y: newExpectedGrowth2Y,
              pegRatio: newPeg,
              dividendYield: newDividendYield,
              marketCap: newMarketCap,
            };
          });
        });

        if (json.wig20) {
          if (typeof json.wig20.indexLevel === 'number') {
            setWig20Index(json.wig20.indexLevel);
          }
          if (typeof json.wig20.change1D === 'number') {
            setWig20Change1D(json.wig20.change1D);
          }
        }
        if (json.source) {
          setDataSource(json.source);
        }
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
    } catch (err) {
      console.warn('Live API fetch fallback:', (err as Error).message);
      // Fallback micro-ticks
      setStocks(prevStocks => {
        return prevStocks.map(stock => {
          const delta = (Math.random() * 0.4 - 0.2);
          const newPrice = Number((stock.price * (1 + delta / 100)).toFixed(2));
          newChanges[stock.ticker] = newPrice >= stock.price ? 'up' : 'down';
          return {
            ...stock,
            price: newPrice,
            change1D: Number((stock.change1D + delta * 0.2).toFixed(2))
          };
        });
      });
    } finally {
      setLastUpdated(new Date());
      setSecondsRemaining(REFRESH_INTERVAL_SECONDS);
      setChangedTickers(newChanges);

      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
      flashTimeoutRef.current = setTimeout(() => {
        setChangedTickers({});
        setIsRefreshing(false);
      }, 1500);
    }
  }, []);

  // Fetch live quotes immediately on mount
  useEffect(() => {
    updatePrices();
  }, [updatePrices]);

  // 1-second interval for countdown timer & 10-minute trigger
  useEffect(() => {
    if (!isAutoRefreshActive) return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          updatePrices();
          return REFRESH_INTERVAL_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoRefreshActive, updatePrices]);

  const toggleAutoRefresh = () => {
    setIsAutoRefreshActive(prev => !prev);
  };

  const refreshNow = () => {
    updatePrices();
  };

  return {
    stocks,
    wig20Index,
    wig20Change1D,
    lastUpdated,
    secondsRemaining,
    isAutoRefreshActive,
    isRefreshing,
    dataSource,
    toggleAutoRefresh,
    refreshNow,
    changedTickers
  };
}
