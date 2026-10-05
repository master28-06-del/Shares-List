import React from 'react';
import { StockData } from '../types/stock';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Percent, Sparkles, Clock } from 'lucide-react';

interface MarketSummaryBarProps {
  stocks: StockData[];
  wig20Index: number;
  wig20Change1D: number;
  lastUpdated: Date;
  dataSource?: string;
  onQuickFilter?: (filterType: string) => void;
}

export const MarketSummaryBar: React.FC<MarketSummaryBarProps> = ({ 
  stocks,
  wig20Index,
  wig20Change1D,
  lastUpdated,
  dataSource = 'GPW Live API (Warszawska Giełda)',
  onQuickFilter 
}) => {
  // Dynamically compute live averages from current stock prices
  const avgPeTrailing = (stocks.reduce((acc, s) => acc + s.peTrailing, 0) / stocks.length).toFixed(1);
  const avgPeForward = (stocks.reduce((acc, s) => acc + s.peForward, 0) / stocks.length).toFixed(1);
  const avgExpectedGrowth = (stocks.reduce((acc, s) => acc + s.expectedGrowth2Y, 0) / stocks.length).toFixed(1);
  const avgRevGrowth = (stocks.reduce((acc, s) => acc + s.revenueGrowthYoY, 0) / stocks.length).toFixed(1);
  const avgDividendYield = (stocks.reduce((acc, s) => acc + s.dividendYield, 0) / stocks.length).toFixed(2);

  const formattedTime = lastUpdated.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="bg-zinc-900/60 border-b border-zinc-800/80 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top headline context */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
              <span>Giełda Papierów Wartościowych w Warszawie (GPW)</span>
              <span aria-hidden="true">·</span>
              <span>Koszyk 20 Blue-Chipów</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400" />
                Live API GPW (Odświeżanie co 10 min · {formattedTime})
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Zestawienie WIG20: Wycena C/Z, Tempo Wzrostu i Prognoza 2-Letnia
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-zinc-950 px-3.5 py-2 rounded-lg border border-zinc-800 flex items-center gap-3">
              <div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Indeks WIG20</div>
                <div className="text-base font-bold text-white font-mono tabular-nums">
                  {wig20Index.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} pkt
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center text-xs font-semibold font-mono tabular-nums ${
                  wig20Change1D >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {wig20Change1D >= 0 ? (
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                  )}
                  {wig20Change1D >= 0 ? '+' : ''}{wig20Change1D}% (1D)
                </span>
                <div className="text-[10px] text-zinc-400 font-mono">
                  Live co 10 min
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stat Metric Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Tile 1: Aktualne C/Z */}
          <div 
            onClick={() => onQuickFilter && onQuickFilter('low_pe')}
            className="p-3.5 bg-zinc-950/70 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Średnia Wycena C/Z</span>
              <span className="text-amber-400 text-[11px]">Bieżące vs Forward</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-amber-400 font-mono tabular-nums">
                {avgPeTrailing}x
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                / {avgPeForward}x (FWD)
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 flex items-center justify-between">
              <span>Najniższe C/Z:</span>
              <span className="text-amber-300 font-medium font-mono">ALR (5.5x), PKN (5.8x)</span>
            </div>
          </div>

          {/* Tile 2: 2-letni przewidywany wzrost */}
          <div 
            onClick={() => onQuickFilter && onQuickFilter('high_upside')}
            className="p-3.5 bg-zinc-950/70 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Przewidywany Wzrost (2L)</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
                +{avgExpectedGrowth}%
              </span>
              <span className="text-xs text-zinc-400">średni upside</span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 flex items-center justify-between">
              <span>Liderzy potencjału:</span>
              <span className="text-emerald-400 font-medium font-mono">JSW, PCO, KGH, ALE</span>
            </div>
          </div>

          {/* Tile 3: Tempo wzrostu biznesu */}
          <div 
            onClick={() => onQuickFilter && onQuickFilter('high_growth')}
            className="p-3.5 bg-zinc-950/70 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Tempo Wzrostu Biznesu</span>
              <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-teal-400 font-mono tabular-nums">
                +{avgRevGrowth}%
              </span>
              <span className="text-xs text-zinc-400">r/r dynamika sprzedaży</span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 flex items-center justify-between">
              <span>Najszybszy rozwój:</span>
              <span className="text-teal-300 font-medium font-mono">LPP, DNP, KRU</span>
            </div>
          </div>

          {/* Tile 4: Stopa dywidendy */}
          <div 
            onClick={() => onQuickFilter && onQuickFilter('high_dividend')}
            className="p-3.5 bg-zinc-950/70 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Średnia Stopa Dywidendy</span>
              <Percent className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-amber-400 font-mono tabular-nums">
                {avgDividendYield}%
              </span>
              <span className="text-xs text-zinc-400">roczny zwrot z zysku</span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 flex items-center justify-between">
              <span>Liderzy wypłat:</span>
              <span className="text-amber-300 font-medium font-mono">PEO (8.8%), PZU, PKO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
