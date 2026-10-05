import React, { useState, useMemo } from 'react';
import { StockData, TableMetricGroup } from '../types/stock';
import { PriceAlert } from '../types/alert';
import { SECTORS } from '../data/wig20Data';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  Sparkles,
  ChevronRight,
  Bell
} from 'lucide-react';

interface StockTableProps {
  stocks: StockData[];
  onSelectStock: (stock: StockData) => void;
  selectedIds: string[];
  onToggleCompare: (id: string) => void;
  activeSectorFilter: string;
  setActiveSectorFilter: (sector: string) => void;
  quickFilterType?: string;
  changedTickers?: Record<string, 'up' | 'down'>;
  alertMap?: Record<string, PriceAlert>;
  onOpenSetAlert?: (stock: StockData) => void;
}

type SortField = 
  | 'ticker'
  | 'price'
  | 'peTrailing'
  | 'peForward'
  | 'pegRatio'
  | 'pbRatio'
  | 'expectedGrowth2Y'
  | 'epsCagr2Y'
  | 'revenueGrowthYoY'
  | 'revenueCagr3Y'
  | 'dividendYield'
  | 'marketCap'
  | 'wig20Weight';

export const StockTable: React.FC<StockTableProps> = ({
  stocks,
  onSelectStock,
  selectedIds,
  onToggleCompare,
  activeSectorFilter,
  setActiveSectorFilter,
  quickFilterType,
  changedTickers = {},
  alertMap = {},
  onOpenSetAlert
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [metricGroup, setMetricGroup] = useState<TableMetricGroup>('all');
  const [sortField, setSortField] = useState<SortField>('expectedGrowth2Y');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [onlyLowPeg, setOnlyLowPeg] = useState(false);

  // Sorting handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      if (['peTrailing', 'peForward', 'pegRatio', 'pbRatio'].includes(field)) {
        setSortDirection('asc');
      } else {
        setSortDirection('desc');
      }
    }
  };

  // Filtered and sorted stocks
  const filteredStocks = useMemo(() => {
    return stocks.filter(stock => {
      const matchesSearch = 
        stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.sector.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSector = 
        activeSectorFilter === 'all' || stock.sector === activeSectorFilter;

      let matchesQuick = true;
      if (quickFilterType === 'low_pe') {
        matchesQuick = stock.peTrailing <= 9.0;
      } else if (quickFilterType === 'high_upside') {
        matchesQuick = stock.expectedGrowth2Y >= 28.0;
      } else if (quickFilterType === 'high_growth') {
        matchesQuick = stock.revenueGrowthYoY >= 12.0 || stock.growthCategory === 'Wysoki wzrost (>15%)';
      } else if (quickFilterType === 'high_dividend') {
        matchesQuick = stock.dividendYield >= 5.0;
      }

      const matchesPeg = !onlyLowPeg || stock.pegRatio <= 1.0;

      return matchesSearch && matchesSector && matchesQuick && matchesPeg;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' 
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return sortDirection === 'asc'
        ? (valA as number) - (valB as number)
        : (valB as number) - (valA as number);
    });
  }, [stocks, searchTerm, activeSectorFilter, quickFilterType, onlyLowPeg, sortField, sortDirection]);

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-zinc-500 opacity-60 group-hover:opacity-100" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-3 h-3 text-amber-400" />
      : <ArrowDown className="w-3 h-3 text-amber-400" />;
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar: Search, Category Filters, Metric Groups */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
        {/* Search & Sector Filter */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Szukaj po nazwie lub tickerze (np. Dino, PKN, Banki)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="relative">
            <select
              value={activeSectorFilter}
              onChange={(e) => setActiveSectorFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">Wszystkie Sektory ({stocks.length})</option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setOnlyLowPeg(prev => !prev)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              onlyLowPeg 
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/40' 
                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
            title="Spółki ze wskaźnikiem PEG <= 1.0 (potencjalnie niedowartościowane względem dynamiki zysków)"
          >
            <span>PEG ≤ 1.0 (Okazje)</span>
          </button>
        </div>

        {/* Metric Group Tabs */}
        <div className="flex items-center gap-1 p-1 bg-zinc-950 rounded-lg border border-zinc-800 overflow-x-auto">
          <button
            onClick={() => setMetricGroup('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              metricGroup === 'all'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Główny Przegląd
          </button>
          <button
            onClick={() => setMetricGroup('valuation')}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              metricGroup === 'valuation'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Wskaźniki C/Z i Wycena
          </button>
          <button
            onClick={() => setMetricGroup('growth')}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              metricGroup === 'growth'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Prognoza 2L (Upside)
          </button>
          <button
            onClick={() => setMetricGroup('business')}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              metricGroup === 'business'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Dynamika Biznesu
          </button>
          <button
            onClick={() => setMetricGroup('dividends')}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              metricGroup === 'dividends'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Dywidendy
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/80 text-zinc-400 uppercase text-[11px] font-semibold tracking-wider select-none">
                <th className="py-3 px-3 w-10 text-center">
                  <span className="sr-only">Wybierz</span>
                </th>
                <th 
                  onClick={() => handleSort('ticker')}
                  className="py-3 px-4 cursor-pointer group hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Spółka / Ticker</span>
                    {renderSortIcon('ticker')}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('price')}
                  className="py-3 px-4 text-right cursor-pointer group hover:text-white transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Kurs (PLN)</span>
                    {renderSortIcon('price')}
                  </div>
                </th>

                {/* 1. Aktualna Cena Akcji do Zysku (C/Z) */}
                {(metricGroup === 'all' || metricGroup === 'valuation') && (
                  <>
                    <th 
                      onClick={() => handleSort('peTrailing')}
                      className="py-3 px-4 text-right cursor-pointer group hover:text-white transition-colors bg-amber-950/20"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-amber-300">C/Z (Bieżące)</span>
                        {renderSortIcon('peTrailing')}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('peForward')}
                      className="py-3 px-4 text-right cursor-pointer group hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>C/Z Forward (2L)</span>
                        {renderSortIcon('peForward')}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('pegRatio')}
                      className="py-3 px-4 text-right cursor-pointer group hover:text-white transition-colors"
                      title="PEG: Cena do Zysku podzielona przez tempo wzrostu EPS. Poniżej 1.0 oznacza atrakcyjną wycenę."
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>PEG Ratio</span>
                        {renderSortIcon('pegRatio')}
                      </div>
                    </th>
                  </>
                )}

                {metricGroup === 'valuation' && (
                  <>
                    <th 
                      onClick={() => handleSort('pbRatio')}
                      className="py-3 px-4 text-right cursor-pointer group hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>C/WK (P/BV)</span>
                        {renderSortIcon('pbRatio')}
                      </div>
                    </th>
                    <th className="py-3 px-4 text-right text-zinc-400">
                      Śr. Sektora C/Z
                    </th>
                  </>
                )}

                {/* 2. 2-Letni Przewidywany Wzrost */}
                {(metricGroup === 'all' || metricGroup === 'growth') && (
                  <>
                    <th 
                      onClick={() => handleSort('expectedGrowth2Y')}
                      className="py-3 px-4 text-right cursor-pointer group hover:text-white transition-colors bg-emerald-950/20"
                      title="Średni prognozowany 2-letni wzrost kursu akcji według konsensusu analityków domów maklerskich"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-emerald-300 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          2L Wzrost Kursu
                        </span>
                        {renderSortIcon('expectedGrowth2Y')}
                      </div>
                    </th>
                    <th className="py-3 px-4 text-right text-zinc-400">
                      Cena Docelowa 2L
                    </th>
                    <th 
                      onClick={() => handleSort('epsCagr2Y')}
                      className="py-3 px-4 text-right cursor-pointer group hover:text-white transition-colors"
                      title="Prognozowane średnioroczne tempo wzrostu zysku na akcję (EPS CAGR 2-letni)"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>EPS CAGR 2L</span>
                        {renderSortIcon('epsCagr2Y')}
                      </div>
                    </th>
                  </>
                )}

                {/* 3. Tempo Wzrostu Biznesu */}
                {(metricGroup === 'all' || metricGroup === 'business') && (
                  <>
                    <th 
                      onClick={() => handleSort('revenueGrowthYoY')}
                      className="py-3 px-4 text-right cursor-pointer group hover:text-white transition-colors bg-teal-950/20"
                      title="Dynamika wzrostu przychodów ze sprzedaży rok do roku (YoY)"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-teal-300">Tempo Przychodów r/r</span>
                        {renderSortIcon('revenueGrowthYoY')}
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-zinc-400">
                      Kategoria Tempa
                    </th>
                  </>
                )}

                {metricGroup === 'business' && (
                  <th 
                    onClick={() => handleSort('revenueCagr3Y')}
                    className="py-3 px-4 text-right cursor-pointer group hover:text-white transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Przychody 3L CAGR</span>
                      {renderSortIcon('revenueCagr3Y')}
                    </div>
                  </th>
                )}

                {/* Dywidendy */}
                {(metricGroup === 'all' || metricGroup === 'dividends') && (
                  <th 
                    onClick={() => handleSort('dividendYield')}
                    className="py-3 px-4 text-right cursor-pointer group hover:text-white transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Stopa Dywidendy</span>
                      {renderSortIcon('dividendYield')}
                    </div>
                  </th>
                )}

                {metricGroup === 'dividends' && (
                  <th className="py-3 px-4 text-right text-zinc-400">
                    Suma Dywidend 2L
                  </th>
                )}

                <th 
                  onClick={() => handleSort('marketCap')}
                  className="py-3 px-4 text-right cursor-pointer group hover:text-white transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Kapitalizacja</span>
                    {renderSortIcon('marketCap')}
                  </div>
                </th>

                <th className="py-3 px-4 text-center">
                  Szczegóły
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800/60 font-mono">
              {filteredStocks.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-zinc-400">
                    <div className="max-w-md mx-auto space-y-2">
                      <p className="text-sm font-medium text-zinc-300 font-sans">Brak spółek spełniających wybrane kryteria</p>
                      <p className="text-xs text-zinc-500 font-sans">Zresetuj filtry wyszukiwania lub wybierz inny sektor.</p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setActiveSectorFilter('all');
                          setOnlyLowPeg(false);
                        }}
                        className="mt-3 px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-sans"
                      >
                        Wyczyść wszystkie filtry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStocks.map((stock) => {
                  const isSelected = selectedIds.includes(stock.id);
                  const isLowPe = stock.peTrailing <= 8.5;
                  const isLowPeg = stock.pegRatio <= 1.0;
                  const isHighGrowth = stock.expectedGrowth2Y >= 30;
                  const tickerChange = changedTickers[stock.ticker];

                  return (
                    <tr 
                      key={stock.id}
                      onClick={() => onSelectStock(stock)}
                      className={`hover:bg-zinc-800/50 transition-colors cursor-pointer group ${
                        tickerChange === 'up' 
                          ? 'bg-emerald-950/20' 
                          : tickerChange === 'down' 
                            ? 'bg-rose-950/20' 
                            : ''
                      }`}
                    >
                      {/* Checkbox for side-by-side comparison */}
                      <td 
                        className="py-3 px-3 text-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCompare(stock.id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500 cursor-pointer"
                        />
                      </td>

                      {/* Ticker & Name & Alert Indicator */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white tracking-wider group-hover:text-amber-400 transition-colors">
                            {stock.ticker}
                          </span>
                          <span className="text-zinc-400 font-sans text-xs truncate max-w-[120px]">
                            {stock.name}
                          </span>

                          {/* Visual Indicator: Target Price Alert */}
                          {(() => {
                            const alert = alertMap[stock.ticker];
                            if (alert) {
                              return (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenSetAlert?.(stock);
                                  }}
                                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono transition-all shrink-0 ${
                                    alert.isTriggered
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm animate-pulse font-bold'
                                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                                  }`}
                                  title={
                                    alert.isTriggered
                                      ? `Alert: Cel ${alert.targetPrice} zł osiągnięty! Kliknij, aby zarządzać.`
                                      : `Ustawiony cel: ${alert.targetPrice} zł (kliknij, aby edytować)`
                                  }
                                >
                                  <Bell className={`w-3 h-3 ${alert.isTriggered ? 'text-emerald-400 animate-bounce' : 'text-amber-400'}`} />
                                  <span>{alert.targetPrice.toFixed(0)} zł</span>
                                  {alert.isTriggered && <span className="text-emerald-300">✓</span>}
                                </button>
                              );
                            }
                            return (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenSetAlert?.(stock);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-amber-400 transition-opacity shrink-0"
                                title={`Ustaw alert cenowy dla ${stock.ticker}`}
                              >
                                <Bell className="w-3.5 h-3.5" />
                              </button>
                            );
                          })()}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-sans flex items-center gap-1.5 mt-0.5">
                          <span>{stock.sector}</span>
                          <span aria-hidden="true">·</span>
                          <span>WIG20: {stock.wig20Weight}%</span>
                        </div>
                      </td>

                      {/* Kurs PLN & 1D Change with Live Update Flash */}
                      <td className="py-3 px-4 text-right">
                        <div className={`font-semibold tabular-nums transition-all ${
                          tickerChange === 'up' 
                            ? 'text-emerald-400 font-bold scale-105' 
                            : tickerChange === 'down' 
                              ? 'text-rose-400 font-bold scale-105' 
                              : 'text-white'
                        }`}>
                          {stock.price.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł
                        </div>
                        <div className={`text-[10px] tabular-nums ${stock.change1D >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {stock.change1D >= 0 ? '+' : ''}{stock.change1D}%
                        </div>
                      </td>

                      {/* 1. Aktualna Cena Akcji do Zysku (C/Z) */}
                      {(metricGroup === 'all' || metricGroup === 'valuation') && (
                        <>
                          <td className="py-3 px-4 text-right bg-amber-950/10">
                            <span className={`inline-block font-semibold tabular-nums ${
                              isLowPe ? 'text-amber-400 font-bold' : stock.peTrailing > 20 ? 'text-zinc-300' : 'text-zinc-200'
                            }`}>
                              {stock.peTrailing.toFixed(1)}x
                            </span>
                            {stock.peTrailing <= 7.0 && (
                              <span className="block text-[9px] text-amber-400 font-sans">Niskie C/Z</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right text-zinc-300 tabular-nums">
                            {stock.peForward.toFixed(1)}x
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className={`tabular-nums ${
                              isLowPeg ? 'text-emerald-400 font-semibold' : 'text-zinc-300'
                            }`}>
                              {stock.pegRatio.toFixed(2)}
                            </span>
                          </td>
                        </>
                      )}

                      {metricGroup === 'valuation' && (
                        <>
                          <td className="py-3 px-4 text-right text-zinc-300 tabular-nums">
                            {stock.pbRatio.toFixed(2)}x
                          </td>
                          <td className="py-3 px-4 text-right text-zinc-500 tabular-nums">
                            {stock.industryPeAvg.toFixed(1)}x
                          </td>
                        </>
                      )}

                      {/* 2. 2-Letni Przewidywany Wzrost */}
                      {(metricGroup === 'all' || metricGroup === 'growth') && (
                        <>
                          <td className="py-3 px-4 text-right bg-emerald-950/10">
                            <div className="flex items-center justify-end gap-1.5">
                              <span className={`font-bold tabular-nums text-sm ${
                                isHighGrowth ? 'text-emerald-400' : 'text-emerald-300'
                              }`}>
                                +{stock.expectedGrowth2Y.toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full bg-zinc-800 rounded-full h-1 mt-1 overflow-hidden">
                              <div 
                                className="bg-emerald-500 h-full rounded-full transition-all"
                                style={{ width: `${Math.min(100, Math.max(0, (stock.expectedGrowth2Y / 45) * 100))}%` }}
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right text-zinc-200 tabular-nums">
                            {stock.targetPrice2Y.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł
                          </td>
                          <td className="py-3 px-4 text-right text-emerald-400 tabular-nums">
                            +{stock.epsCagr2Y.toFixed(1)}%
                          </td>
                        </>
                      )}

                      {/* 3. Tempo Wzrostu Biznesu */}
                      {(metricGroup === 'all' || metricGroup === 'business') && (
                        <>
                          <td className="py-3 px-4 text-right bg-teal-950/10">
                            <span className={`font-semibold tabular-nums ${
                              stock.revenueGrowthYoY >= 15 ? 'text-teal-400 font-bold' : stock.revenueGrowthYoY > 0 ? 'text-teal-300' : 'text-zinc-400'
                            }`}>
                              {stock.revenueGrowthYoY > 0 ? '+' : ''}{stock.revenueGrowthYoY.toFixed(1)}%
                            </span>
                            <span className="block text-[9px] text-zinc-500 font-sans">EBITDA: {stock.ebitdaGrowthYoY > 0 ? '+' : ''}{stock.ebitdaGrowthYoY}%</span>
                          </td>
                          <td className="py-3 px-4 text-left font-sans">
                            <span className="text-zinc-300 text-xs">
                              {stock.growthCategory}
                            </span>
                          </td>
                        </>
                      )}

                      {metricGroup === 'business' && (
                        <td className="py-3 px-4 text-right text-zinc-300 tabular-nums">
                          {stock.revenueCagr3Y > 0 ? '+' : ''}{stock.revenueCagr3Y.toFixed(1)}%
                        </td>
                      )}

                      {/* Dywidendy */}
                      {(metricGroup === 'all' || metricGroup === 'dividends') && (
                        <td className="py-3 px-4 text-right">
                          <span className={`tabular-nums ${
                            stock.dividendYield >= 7.0 ? 'text-amber-400 font-bold' : stock.dividendYield > 0 ? 'text-zinc-200' : 'text-zinc-500'
                          }`}>
                            {stock.dividendYield > 0 ? `${stock.dividendYield.toFixed(1)}%` : '—'}
                          </span>
                        </td>
                      )}

                      {metricGroup === 'dividends' && (
                        <td className="py-3 px-4 text-right text-amber-300 tabular-nums">
                          {stock.expectedDividends2Y > 0 ? `${stock.expectedDividends2Y.toFixed(2)} zł` : '—'}
                        </td>
                      )}

                      {/* Kapitalizacja */}
                      <td className="py-3 px-4 text-right text-zinc-400 tabular-nums">
                        {stock.marketCap.toFixed(1)} mld zł
                      </td>

                      {/* Row action button */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectStock(stock);
                          }}
                          className="p-1.5 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 rounded-md transition-colors"
                          title="Otwórz pełny profil analityczny"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info strip */}
        <div className="p-3 bg-zinc-950/80 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-2">
          <div className="flex items-center gap-2">
            <span>Wyświetlono: <strong>{filteredStocks.length}</strong> z {stocks.length} spółek WIG20</span>
            <span aria-hidden="true">·</span>
            <span>Notowania odświeżane automatycznie co 10 minut</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Wycena C/Z (Niskie C/Z)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              2L Wzrost Kursu
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Tempo Przychodów
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
