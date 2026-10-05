import React, { useState } from 'react';
import { StockData } from '../types/stock';
import { SECTORS } from '../data/wig20Data';
import { Sparkles, TrendingUp, ChevronRight, CheckSquare } from 'lucide-react';

interface StockCardsViewProps {
  stocks: StockData[];
  onSelectStock: (stock: StockData) => void;
  selectedIds: string[];
  onToggleCompare: (id: string) => void;
}

export const StockCardsView: React.FC<StockCardsViewProps> = ({
  stocks,
  onSelectStock,
  selectedIds,
  onToggleCompare,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'highest_growth' | 'lowest_pe' | 'dividend'>('all');

  const filtered = stocks.filter(s => {
    if (selectedSector !== 'all' && s.sector !== selectedSector) return false;
    if (filterMode === 'highest_growth') return s.expectedGrowth2Y >= 30;
    if (filterMode === 'lowest_pe') return s.peTrailing <= 8.5;
    if (filterMode === 'dividend') return s.dividendYield >= 5.0;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter Chips */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterMode === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Wszystkie 20 Spółek
          </button>
          <button
            onClick={() => setFilterMode('lowest_pe')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterMode === 'lowest_pe' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Niskie C/Z (≤8.5x)
          </button>
          <button
            onClick={() => setFilterMode('highest_growth')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterMode === 'highest_growth' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Top Wzrost 2L (≥30%)
          </button>
          <button
            onClick={() => setFilterMode('dividend')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterMode === 'dividend' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Wysoka Dywidenda (≥5%)
          </button>
        </div>

        <div>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 cursor-pointer"
          >
            <option value="all">Wszystkie Sektory</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((stock) => {
          const isSelected = selectedIds.includes(stock.id);

          return (
            <div
              key={stock.id}
              onClick={() => onSelectStock(stock)}
              className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4.5 flex flex-col justify-between transition-all hover:shadow-xl cursor-pointer group relative"
            >
              {/* Card Top: Ticker, Name, Sector & Compare Checkbox */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white font-mono group-hover:text-amber-400 transition-colors">
                        {stock.ticker}
                      </span>
                      <span className="text-xs text-zinc-300 font-medium truncate max-w-[130px]">
                        {stock.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      {stock.sector}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompare(stock.id);
                    }}
                    className={`p-1.5 rounded-md border transition-colors ${
                      isSelected 
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                        : 'text-zinc-600 hover:text-zinc-400 border-transparent'
                    }`}
                    title="Dodaj do porównania"
                  >
                    <CheckSquare className="w-4 h-4" />
                  </button>
                </div>

                {/* Price and 1D Change */}
                <div className="flex items-baseline justify-between py-2 border-y border-zinc-800/80 mb-3">
                  <span className="text-lg font-bold text-white font-mono tabular-nums">
                    {stock.price.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł
                  </span>
                  <span className={`text-xs font-semibold font-mono tabular-nums ${
                    stock.change1D >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {stock.change1D >= 0 ? '+' : ''}{stock.change1D}%
                  </span>
                </div>

                {/* 3 Core Metric Highlights */}
                <div className="space-y-2 font-mono text-xs">
                  {/* 1. Aktualne C/Z */}
                  <div className="flex items-center justify-between bg-zinc-950/70 p-2 rounded-lg border border-zinc-850">
                    <span className="text-zinc-400 font-sans text-[11px]">Wycena C/Z (bieżąca):</span>
                    <span className={`font-bold tabular-nums ${
                      stock.peTrailing <= 8.5 ? 'text-amber-400' : 'text-white'
                    }`}>
                      {stock.peTrailing}x
                    </span>
                  </div>

                  {/* 2. 2-letni prognozowany wzrost */}
                  <div className="flex items-center justify-between bg-emerald-950/15 p-2 rounded-lg border border-emerald-900/30">
                    <span className="text-emerald-300 font-sans text-[11px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      2L Wzrost Kursu:
                    </span>
                    <span className="font-bold text-emerald-400 tabular-nums">
                      +{stock.expectedGrowth2Y}%
                    </span>
                  </div>

                  {/* 3. Tempo wzrostu biznesu */}
                  <div className="flex items-center justify-between bg-teal-950/15 p-2 rounded-lg border border-teal-900/30">
                    <span className="text-teal-300 font-sans text-[11px] flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Wzrost Przychodów:
                    </span>
                    <span className="font-bold text-teal-300 tabular-nums">
                      {stock.revenueGrowthYoY > 0 ? '+' : ''}{stock.revenueGrowthYoY}%
                    </span>
                  </div>
                </div>

                {/* Growth Catalyst Snippet */}
                <p className="text-[11px] text-zinc-400 font-sans mt-3 line-clamp-2 leading-relaxed">
                  {stock.growthCatalysts[0]}
                </p>
              </div>

              {/* Card Bottom Meta */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-sans">
                <div className="flex items-center gap-2">
                  <span>DY: <strong className="text-zinc-200 font-mono">{stock.dividendYield > 0 ? `${stock.dividendYield}%` : '0%'}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>PEG: <strong className="text-zinc-200 font-mono">{stock.pegRatio}</strong></span>
                </div>

                <span className="text-amber-400 font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  Więcej
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
