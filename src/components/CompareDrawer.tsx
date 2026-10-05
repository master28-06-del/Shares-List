import React from 'react';
import { StockData } from '../types/stock';
import { X } from 'lucide-react';

interface CompareDrawerProps {
  selectedStocks: StockData[];
  onClose: () => void;
  onRemoveStock: (id: string) => void;
  onSelectStock: (stock: StockData) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  selectedStocks,
  onClose,
  onRemoveStock,
  onSelectStock,
}) => {
  if (selectedStocks.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Porównanie Wskaźnikowe Spółek WIG20 ({selectedStocks.length} wybrane)
            </h3>
            <p className="text-xs text-zinc-400">
              Bezpośrednie zestawienie C/Z, 2-letniego prognozowanego wzrostu i dynamiki biznesowej.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="p-6 overflow-x-auto max-h-[75vh]">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-3 px-4 w-44 font-sans text-zinc-400 uppercase text-[10px]">Metryka</th>
                {selectedStocks.map((stock) => (
                  <th key={stock.id} className="py-3 px-4 min-w-[180px]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{stock.ticker}</span>
                      <button
                        onClick={() => onRemoveStock(stock.id)}
                        className="text-zinc-500 hover:text-rose-400 transition-colors text-xs"
                        title="Usuń"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-sans truncate font-normal">
                      {stock.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800/60">
              {/* Sektor */}
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400 font-medium">Sektor</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 font-sans text-zinc-300 text-[11px]">
                    {s.sector}
                  </td>
                ))}
              </tr>

              {/* Kurs i kapitalizacja */}
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400 font-medium">Kurs Aktualny</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-white font-bold tabular-nums">
                    {s.price.toFixed(2)} zł
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400 font-medium">Kapitalizacja</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-zinc-300 tabular-nums">
                    {s.marketCap.toFixed(1)} mld zł
                  </td>
                ))}
              </tr>

              {/* 1. Aktualna cena akcji do zysku (C/Z) */}
              <tr className="bg-amber-950/20">
                <td className="py-3 px-4 font-sans text-amber-300 font-semibold" colSpan={selectedStocks.length + 1}>
                  1. Wskaźniki Wyceny (C/Z)
                </td>
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">C/Z (Bieżące Trailing)</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-amber-400 font-bold tabular-nums">
                    {s.peTrailing.toFixed(1)}x
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">C/Z Forward (2L)</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-zinc-200 tabular-nums">
                    {s.peForward.toFixed(1)}x
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">Wskaźnik PEG</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className={`py-3 px-4 font-bold tabular-nums ${s.pegRatio <= 1.0 ? 'text-emerald-400' : 'text-zinc-200'}`}>
                    {s.pegRatio.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">C/WK (P/BV)</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-zinc-300 tabular-nums">
                    {s.pbRatio.toFixed(2)}x
                  </td>
                ))}
              </tr>

              {/* 2. 2-letni przewidywany wzrost */}
              <tr className="bg-emerald-950/20">
                <td className="py-3 px-4 font-sans text-emerald-300 font-semibold" colSpan={selectedStocks.length + 1}>
                  2. 2-Letni Przewidywany Wzrost
                </td>
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">2L Przewidywany Wzrost Kursu</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-emerald-400 font-bold text-sm tabular-nums">
                    +{s.expectedGrowth2Y.toFixed(1)}%
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">Cena Docelowa 2L</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-zinc-200 tabular-nums">
                    {s.targetPrice2Y.toFixed(2)} zł
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">EPS CAGR (2L)</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-emerald-400 tabular-nums">
                    +{s.epsCagr2Y.toFixed(1)}%
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">Konsensus Analityków</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 font-sans text-zinc-200 font-semibold">
                    {s.consensusRating} ({s.analystsCount})
                  </td>
                ))}
              </tr>

              {/* 3. Tempo wzrostu biznesu */}
              <tr className="bg-teal-950/20">
                <td className="py-3 px-4 font-sans text-teal-300 font-semibold" colSpan={selectedStocks.length + 1}>
                  3. Tempo Wzrostu Biznesu
                </td>
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">Wzrost Przychodów r/r</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-teal-400 font-bold tabular-nums">
                    {s.revenueGrowthYoY > 0 ? '+' : ''}{s.revenueGrowthYoY.toFixed(1)}%
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">Przychody 3L CAGR</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-zinc-300 tabular-nums">
                    {s.revenueCagr3Y > 0 ? '+' : ''}{s.revenueCagr3Y.toFixed(1)}%
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">Wzrost EBITDA r/r</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-zinc-200 tabular-nums">
                    {s.ebitdaGrowthYoY > 0 ? '+' : ''}{s.ebitdaGrowthYoY.toFixed(1)}%
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">Kategoria Dynamiki</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 font-sans text-zinc-300 text-[11px]">
                    {s.growthCategory}
                  </td>
                ))}
              </tr>

              {/* Dywidendy */}
              <tr className="hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-sans text-zinc-400">Stopa Dywidendy</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4 text-amber-400 font-bold tabular-nums">
                    {s.dividendYield > 0 ? `${s.dividendYield.toFixed(1)}%` : '0%'}
                  </td>
                ))}
              </tr>

              {/* Akcja */}
              <tr>
                <td className="py-3 px-4 font-sans text-zinc-400">Profil</td>
                {selectedStocks.map(s => (
                  <td key={s.id} className="py-3 px-4">
                    <button
                      onClick={() => onSelectStock(s)}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-sans transition-colors"
                    >
                      Otwórz profil
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-zinc-950 px-6 py-3 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Zamknij Porównanie
          </button>
        </div>
      </div>
    </div>
  );
};
