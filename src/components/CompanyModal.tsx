import React from 'react';
import { StockData } from '../types/stock';
import { PriceAlert } from '../types/alert';
import { 
  X, 
  TrendingUp, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  PieChart, 
  BarChart2,
  Bell
} from 'lucide-react';

interface CompanyModalProps {
  stock: StockData | null;
  onClose: () => void;
  onToggleCompare: (id: string) => void;
  isCompared: boolean;
  alert?: PriceAlert;
  onOpenSetAlert?: (stock: StockData) => void;
}

export const CompanyModal: React.FC<CompanyModalProps> = ({
  stock,
  onClose,
  onToggleCompare,
  isCompared,
  alert,
  onOpenSetAlert
}) => {
  if (!stock) return null;

  // Maximum value for safe scaling with generous headroom so nothing ever overflows
  const maxRevenue = Math.max(...stock.financials.map(f => Math.max(f.revenue, Math.abs(f.netIncome))), 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-zinc-950 px-5 sm:px-6 py-4 sm:py-5 border-b border-zinc-800 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-wider">
                {stock.ticker}
              </span>
              <span className="text-base sm:text-lg font-semibold text-zinc-200 truncate">
                {stock.fullName}
              </span>
              <span className="px-2 py-0.5 text-xs bg-zinc-800 text-zinc-300 rounded font-medium shrink-0">
                {stock.sector}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 max-w-2xl leading-relaxed">
              {stock.businessDescription}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenSetAlert && (
              <button
                onClick={() => onOpenSetAlert(stock)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  alert?.isTriggered
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md animate-pulse font-bold'
                    : alert
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white'
                }`}
                title={alert ? `Cel: ${alert.targetPrice} zł (kliknij, aby edytować)` : 'Ustaw alert cenowy dla tej spółki'}
              >
                <Bell className={`w-3.5 h-3.5 ${alert?.isTriggered ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span>
                  {alert?.isTriggered 
                    ? `Cel ${alert.targetPrice.toFixed(0)} zł ✓` 
                    : alert 
                      ? `Alert: ${alert.targetPrice.toFixed(0)} zł` 
                      : '+ Alert Cenowy'}
                </span>
              </button>
            )}

            <button
              onClick={() => onToggleCompare(stock.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                isCompared
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white'
              }`}
            >
              {isCompared ? 'W porównywarce ✓' : '+ Porównaj'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Key Metric Triad (Balanced scale, no oversized fonts) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Pillar 1: Aktualna Cena do Zysku (C/Z) */}
            <div className="bg-zinc-950/90 p-4 rounded-xl border border-amber-900/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1.5">
                  <span>1. Wycena C/Z (P/E)</span>
                  <PieChart className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold text-white font-mono tabular-nums">
                  {stock.peTrailing.toFixed(1)}x
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Bieżący wskaźnik cena/zysk (TTM)
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-zinc-800/80 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">C/Z Forward (2L):</span>
                  <span className="text-zinc-200 font-bold">{stock.peForward.toFixed(1)}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Wskaźnik PEG:</span>
                  <span className={`font-bold ${stock.pegRatio <= 1.0 ? 'text-emerald-400' : 'text-zinc-200'}`}>
                    {stock.pegRatio.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">C/WK (P/BV):</span>
                  <span className="text-zinc-200">{stock.pbRatio.toFixed(2)}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Śr. sektora C/Z:</span>
                  <span className="text-zinc-400">{stock.industryPeAvg.toFixed(1)}x</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: 2-Letni Przewidywany Wzrost */}
            <div className="bg-zinc-950/90 p-4 rounded-xl border border-emerald-900/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-1.5">
                  <span>2. 2-Letni Wzrost (Upside)</span>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
                  +{stock.expectedGrowth2Y.toFixed(1)}%
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Prognozowany 2-letni wzrost kursu
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-zinc-800/80 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Cena docelowa 2L:</span>
                  <span className="text-emerald-300 font-bold">{stock.targetPrice2Y.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Kurs bieżący:</span>
                  <span className="text-zinc-200">{stock.price.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">EPS CAGR 2L:</span>
                  <span className="text-emerald-400 font-bold">+{stock.epsCagr2Y.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Konsensus:</span>
                  <span className="text-white font-sans font-semibold text-[11px]">{stock.consensusRating} ({stock.analystsCount})</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Tempo Wzrostu Biznesu */}
            <div className="bg-zinc-950/90 p-4 rounded-xl border border-teal-900/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-teal-400 font-semibold mb-1.5">
                  <span>3. Tempo Wzrostu Biznesu</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold text-teal-400 font-mono tabular-nums">
                  {stock.revenueGrowthYoY > 0 ? '+' : ''}{stock.revenueGrowthYoY.toFixed(1)}%
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Roczna dynamika przychodów (YoY)
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-zinc-800/80 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">3L Przychody CAGR:</span>
                  <span className="text-zinc-200">+{stock.revenueCagr3Y.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">EBITDA r/r:</span>
                  <span className="text-teal-300 font-bold">{stock.ebitdaGrowthYoY > 0 ? '+' : ''}{stock.ebitdaGrowthYoY.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Rentowność ROE:</span>
                  <span className="text-zinc-200">{stock.roe.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Stopa dywidendy:</span>
                  <span className="text-amber-400 font-bold">{stock.dividendYield.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Forecast Chart with Controlled Height & No Overflow */}
          <div className="bg-zinc-950 p-4 sm:p-5 rounded-xl border border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-amber-400" />
                  Trajektoria Finansowa: Wyniki Historyczne i Prognoza 2-Letnia (mld PLN)
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Porównanie wielkości przychodów oraz zysku netto w czytelnej, proporcjonalnej skali
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-2.5 h-2.5 bg-zinc-600 rounded-sm"></span>
                  Przychody
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm"></span>
                  Zysk Netto
                </span>
              </div>
            </div>

            {/* Financial Bars Container - Safe bounded height (h-36), max bar 72% */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-1">
              {stock.financials.map((fin) => {
                // Safe proportions: cap at 72% max so nothing ever pokes out of the box
                const revenueBarHeight = Math.min(72, Math.max(12, (fin.revenue / maxRevenue) * 72));
                const netIncomeBarHeight = Math.min(
                  70,
                  Math.max(6, (Math.abs(fin.netIncome) / maxRevenue) * 72)
                );

                return (
                  <div key={fin.year} className="flex flex-col items-center">
                    {/* Compact top value label */}
                    <div className="text-[10px] sm:text-[11px] font-mono font-medium text-zinc-300 mb-1 truncate max-w-full">
                      {fin.revenue.toFixed(1)} mld
                    </div>

                    {/* Bar frame with fixed height and overflow-hidden safety */}
                    <div className="w-full bg-zinc-900/90 rounded-lg h-28 sm:h-32 flex items-end justify-center p-2 gap-1.5 sm:gap-2 border border-zinc-800/80 overflow-hidden relative">
                      {/* Revenue Bar */}
                      <div 
                        className={`w-2/5 sm:w-1/2 rounded-t transition-all ${
                          fin.isForecast ? 'bg-zinc-600/70 border-t-2 border-zinc-400' : 'bg-zinc-500'
                        }`}
                        style={{ height: `${revenueBarHeight}%` }}
                        title={`Przychody: ${fin.revenue.toFixed(2)} mld zł`}
                      />

                      {/* Net Income Bar (Positive in emerald, negative in rose) */}
                      <div 
                        className={`w-2/5 sm:w-1/2 rounded-t transition-all ${
                          fin.netIncome < 0 
                            ? 'bg-rose-600/80' 
                            : fin.isForecast 
                              ? 'bg-emerald-600/70 border-t-2 border-emerald-400' 
                              : 'bg-emerald-500'
                        }`}
                        style={{ height: `${netIncomeBarHeight}%` }}
                        title={`Zysk netto: ${fin.netIncome.toFixed(2)} mld zł`}
                      />
                    </div>

                    {/* Bottom Year and Profit Label */}
                    <div className="mt-1.5 text-center">
                      <div className={`text-[11px] font-mono font-bold ${fin.isForecast ? 'text-amber-400' : 'text-zinc-300'}`}>
                        {fin.year}
                      </div>
                      <div className={`text-[10px] font-mono ${fin.netIncome >= 0 ? 'text-emerald-400/90' : 'text-rose-400'}`}>
                        {fin.netIncome >= 0 ? `+${fin.netIncome.toFixed(2)}` : fin.netIncome.toFixed(2)} mld
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strategic Analysis: Growth Catalysts & Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Growth Catalysts */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-2.5">
                <CheckCircle2 className="w-4 h-4" />
                Kluczowe Motory Wzrostu Biznesu (2L)
              </h4>
              <ul className="space-y-2">
                {stock.growthCatalysts.map((catalyst, idx) => (
                  <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{catalyst}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Risks */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 mb-2.5">
                <ShieldAlert className="w-4 h-4" />
                Główne Czynniki Ryzyka
              </h4>
              <ul className="space-y-2">
                {stock.businessRisks.map((risk, idx) => (
                  <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-zinc-950 px-5 sm:px-6 py-3.5 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span>Kapitalizacja: <strong className="text-white font-mono">{stock.marketCap.toFixed(1)} mld zł</strong></span>
            <span aria-hidden="true">·</span>
            <span>Waga WIG20: <strong className="text-white font-mono">{stock.wig20Weight.toFixed(1)}%</strong></span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium text-xs"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
