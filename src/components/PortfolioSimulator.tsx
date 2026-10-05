import React, { useState, useMemo } from 'react';
import { StockData } from '../types/stock';
import { Calculator, ArrowUpRight, Check, Plus, Trash2, PlusCircle, Sparkles } from 'lucide-react';

interface PortfolioSimulatorProps {
  stocks: StockData[];
  onSelectStock: (stock: StockData) => void;
}

export const PortfolioSimulator: React.FC<PortfolioSimulatorProps> = ({
  stocks,
  onSelectStock,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(50000);
  const [selectedStockIds, setSelectedStockIds] = useState<string[]>([
    'dnp', 'kru', 'peo', 'lpp', 'ale'
  ]);
  const [activeStrategy, setActiveStrategy] = useState<string>('balanced');

  const presetStrategies = [
    {
      id: 'high_growth',
      name: 'Maksymalny Wzrost 2L',
      desc: 'Top 5 spółek o najwyższym 2-letnim potencjale wzrostu wg konsensusu analityków.',
      tickers: ['jsw', 'pco', 'kgh', 'ale', 'dnp']
    },
    {
      id: 'dividend_value',
      name: 'Niski C/Z + Dywidenda',
      desc: 'Spółki o jednocyfrowym C/Z i wysokich stopach dywidendy (>7%).',
      tickers: ['peo', 'pko', 'pzu', 'pkn', 'alr']
    },
    {
      id: 'garp',
      name: 'Liderzy GARP (PEG < 1.0)',
      desc: 'Wzrost w rozsądnej cenie: spółki dynamicznie rosnące, tanie wskaźnikowo.',
      tickers: ['kru', 'mbk', 'lpp', 'kgh', 'pkn']
    },
    {
      id: 'balanced',
      name: 'Zrównoważony Portfel WIG20',
      desc: 'Kombinacja liderów wzrostu, technologii i czempionów dywidendowych.',
      tickers: ['dnp', 'kru', 'peo', 'lpp', 'ale']
    }
  ];

  const handleApplyPreset = (preset: typeof presetStrategies[0]) => {
    setActiveStrategy(preset.id);
    setSelectedStockIds(preset.tickers);
  };

  const toggleStock = (id: string) => {
    setActiveStrategy('custom');
    if (selectedStockIds.includes(id)) {
      // Unconditionally allow removal (no block on removing the last item)
      setSelectedStockIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedStockIds(prev => [...prev, id]);
    }
  };

  const clearPortfolio = () => {
    setActiveStrategy('custom');
    setSelectedStockIds([]);
  };

  const selectAllStocks = () => {
    setActiveStrategy('custom');
    setSelectedStockIds(stocks.map(s => s.id));
  };

  const portfolioMetrics = useMemo(() => {
    const chosenStocks = stocks.filter(s => selectedStockIds.includes(s.id));
    if (chosenStocks.length === 0) return null;

    const count = chosenStocks.length;
    const allocationPerStock = investmentAmount / count;

    let totalProjectedValue = 0;
    let totalDividends = 0;
    let weightedPe = 0;
    let weightedGrowth2Y = 0;
    let weightedRevGrowth = 0;

    const breakdown = chosenStocks.map(stock => {
      const sharesCount = Math.floor(allocationPerStock / stock.price);
      const actualInvested = sharesCount * stock.price;
      const expectedEndPrice = stock.targetPrice2Y;
      const capitalGain = sharesCount * (expectedEndPrice - stock.price);
      const dividendGain = sharesCount * stock.expectedDividends2Y;
      const endValue = actualInvested + capitalGain + dividendGain;

      totalProjectedValue += endValue;
      totalDividends += dividendGain;
      weightedPe += stock.peTrailing * (1 / count);
      weightedGrowth2Y += stock.expectedGrowth2Y * (1 / count);
      weightedRevGrowth += stock.revenueGrowthYoY * (1 / count);

      return {
        stock,
        sharesCount,
        actualInvested,
        capitalGain,
        dividendGain,
        endValue,
        returnPercent: actualInvested > 0 ? ((endValue - actualInvested) / actualInvested) * 100 : 0
      };
    });

    const totalReturnPln = totalProjectedValue - investmentAmount;
    const totalReturnPercent = (totalReturnPln / investmentAmount) * 100;
    const capitalGainsOnlyPln = totalReturnPln - totalDividends;

    return {
      chosenStocks,
      breakdown,
      totalProjectedValue,
      totalReturnPln,
      totalReturnPercent,
      totalDividends,
      capitalGainsOnlyPln,
      weightedPe,
      weightedGrowth2Y,
      weightedRevGrowth
    };
  }, [stocks, selectedStockIds, investmentAmount]);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-zinc-900/80 p-5 rounded-xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            Symulator Inwestycyjny WIG20: Horyzont 2-Letni
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Oblicz szacowany 2-letni wynik inwestycji (wzrost kursu z konsensusu analityków + przewidywane dywidendy) dla wybranego portfela.
          </p>
        </div>

        {/* Capital Input */}
        <div className="flex items-center gap-3 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
          <label className="text-xs text-zinc-400 font-medium whitespace-nowrap">
            Kwota inwestycji:
          </label>
          <div className="relative">
            <input
              type="number"
              step="5000"
              min="1000"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Math.max(1000, Number(e.target.value)))}
              className="w-32 bg-zinc-900 border border-zinc-700 rounded px-2.5 py-1 text-sm font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-500 text-right tabular-nums"
            />
          </div>
          <span className="text-xs font-bold text-zinc-300">PLN</span>
        </div>
      </div>

      {/* Preset Strategies Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {presetStrategies.map((strat) => {
          const isActive = activeStrategy === strat.id && selectedStockIds.length > 0;
          return (
            <button
              key={strat.id}
              onClick={() => handleApplyPreset(strat)}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                isActive
                  ? 'bg-zinc-900 border-amber-500/60 shadow-lg ring-1 ring-amber-500/20'
                  : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">{strat.name}</span>
                {isActive && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug mb-2">{strat.desc}</p>
              <div className="flex gap-1 font-mono text-[10px] text-zinc-300 uppercase">
                {strat.tickers.map(t => (
                  <span key={t} className="bg-zinc-800/80 px-1 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary KPI Result Cards (Visible when stocks are selected) */}
      {portfolioMetrics ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Projected Value */}
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
            <div className="text-xs text-zinc-400 mb-1">Szacowana Wartość Portfela za 2L</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">
              {Math.round(portfolioMetrics.totalProjectedValue).toLocaleString('pl-PL')} zł
            </div>
            <div className="text-xs font-semibold text-emerald-400 mt-1 font-mono tabular-nums flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +{portfolioMetrics.totalReturnPercent.toFixed(1)}% łącznego zwrotu
            </div>
          </div>

          {/* Capital Gains vs Dividends */}
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
            <div className="text-xs text-zinc-400 mb-1">Struktura Zysku (2 Lata)</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
              +{Math.round(portfolioMetrics.totalReturnPln).toLocaleString('pl-PL')} zł
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 font-mono">
              Wzrost kursu: <strong className="text-zinc-200">+{Math.round(portfolioMetrics.capitalGainsOnlyPln).toLocaleString('pl-PL')} zł</strong>
              <br />
              Dywidendy: <strong className="text-amber-400">+{Math.round(portfolioMetrics.totalDividends).toLocaleString('pl-PL')} zł</strong>
            </div>
          </div>

          {/* Average Weighted P/E */}
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
            <div className="text-xs text-zinc-400 mb-1">Średnie Ważone C/Z Portfela</div>
            <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">
              {portfolioMetrics.weightedPe.toFixed(1)}x
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">
              Wycena portfela vs WIG20 (13.5x):{' '}
              <strong className={portfolioMetrics.weightedPe < 13.5 ? 'text-emerald-400' : 'text-zinc-300'}>
                {portfolioMetrics.weightedPe < 13.5 ? 'Dyskonto' : 'Premia'}
              </strong>
            </div>
          </div>

          {/* Average Expected 2Y Upside */}
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
            <div className="text-xs text-zinc-400 mb-1">Średnie Tempo Wzrostu Biznesu</div>
            <div className="text-2xl font-bold text-teal-400 font-mono tabular-nums">
              +{portfolioMetrics.weightedRevGrowth.toFixed(1)}%
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">
              Średni wzrost kursu akcji: <strong className="text-emerald-400 font-mono">+{portfolioMetrics.weightedGrowth2Y.toFixed(1)}%</strong>
            </div>
          </div>
        </div>
      ) : null}

      {/* Portfolio Stock Composition Section */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Skład Portfela ({selectedStockIds.length} {selectedStockIds.length === 1 ? 'spółka' : selectedStockIds.length >= 2 && selectedStockIds.length <= 4 ? 'spółki' : 'spółek'})
              </h3>
              {selectedStockIds.length === 0 && (
                <span className="text-[11px] text-amber-400/90 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Portfel pusty
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              {selectedStockIds.length === 0 
                ? 'Wybierz spółki z listy poniżej, aby dodać je do portfela.'
                : 'Możesz usuwać dowolne pozycje lub dodawać kolejne spółki poniżej.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedStockIds.length > 0 && (
              <button
                onClick={clearPortfolio}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-400 hover:text-rose-400 hover:bg-zinc-800/80 rounded-lg transition-colors border border-zinc-800"
                title="Usuń wszystkie spółki z portfela"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Wyczyść portfel
              </button>
            )}

            <button
              onClick={selectAllStocks}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/80 rounded-lg transition-colors border border-zinc-800"
            >
              <Plus className="w-3.5 h-3.5" />
              Wybierz cały WIG20
            </button>
          </div>
        </div>

        {/* Selected Stocks Breakdown Table or Empty State */}
        {portfolioMetrics && portfolioMetrics.breakdown.length > 0 ? (
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Spółka</th>
                  <th className="py-2.5 px-3 text-right">Alokacja</th>
                  <th className="py-2.5 px-3 text-right">Cena Akt.</th>
                  <th className="py-2.5 px-3 text-right">C/Z</th>
                  <th className="py-2.5 px-3 text-right">2L Wzrost</th>
                  <th className="py-2.5 px-3 text-right">Dywidendy 2L</th>
                  <th className="py-2.5 px-3 text-right">Wartość za 2L</th>
                  <th className="py-2.5 px-3 text-right">Stopa Zwrotu</th>
                  <th className="py-2.5 px-2 text-center">Usuń</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {portfolioMetrics.breakdown.map(({ stock, actualInvested, endValue, returnPercent }) => (
                  <tr key={stock.id} className="hover:bg-zinc-800/40">
                    <td className="py-2.5 px-3 font-sans">
                      <button
                        onClick={() => onSelectStock(stock)}
                        className="font-bold text-white hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                      >
                        <span className="font-mono">{stock.ticker}</span>
                        <span className="text-zinc-400 font-normal text-xs">{stock.name}</span>
                      </button>
                    </td>
                    <td className="py-2.5 px-3 text-right text-zinc-300">
                      {Math.round(actualInvested).toLocaleString('pl-PL')} zł
                    </td>
                    <td className="py-2.5 px-3 text-right text-zinc-300">
                      {stock.price.toFixed(2)} zł
                    </td>
                    <td className="py-2.5 px-3 text-right text-amber-400">
                      {stock.peTrailing.toFixed(1)}x
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">
                      +{stock.expectedGrowth2Y.toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3 text-right text-amber-400">
                      {stock.expectedDividends2Y > 0 ? `${stock.expectedDividends2Y.toFixed(2)} zł` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-right text-white font-bold">
                      {Math.round(endValue).toLocaleString('pl-PL')} zł
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">
                      +{returnPercent.toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => toggleStock(stock.id)}
                        className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                        title="Usuń z portfela"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty Portfolio Call to Action */
          <div className="py-10 px-4 text-center bg-zinc-950/60 rounded-xl border border-dashed border-zinc-800 mb-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <PlusCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              Twój symulowany portfel jest pusty
            </h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto mb-4 leading-relaxed">
              Nie wybrałeś jeszcze żadnej spółki. Kliknij poniższe przyciski spółek z napisem <strong>„+ Dodaj do portfela”</strong> lub wybierz jedną z gotowych strategii u góry, aby obliczyć 2-letnią stopę zwrotu.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => handleApplyPreset(presetStrategies[3])}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-500 text-zinc-950 rounded-lg hover:bg-amber-400 transition-colors font-sans"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Wybierz gotową strategię (Zrównoważony WIG20)
              </button>
              <button
                onClick={selectAllStocks}
                className="px-3 py-1.5 text-xs font-medium bg-zinc-800 text-zinc-200 rounded-lg hover:bg-zinc-700 transition-colors font-sans"
              >
                Dodaj wszystkie 20 spółek
              </button>
            </div>
          </div>
        )}

        {/* All 20 Available Stocks Toggle & Add Badges */}
        <div className="pt-4 border-t border-zinc-800">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-zinc-300">
              Dostępne spółki WIG20 (kliknij, aby dodać lub usunąć):
            </span>
            <span className="text-[11px] text-zinc-500">
              Wybrano: {selectedStockIds.length} / {stocks.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {stocks.map(stock => {
              const isIn = selectedStockIds.includes(stock.id);
              return (
                <button
                  key={stock.id}
                  onClick={() => toggleStock(stock.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                    isIn
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                  title={isIn ? `Kliknij, aby usunąć ${stock.ticker} z portfela` : `Kliknij, aby dodać ${stock.ticker} do portfela`}
                >
                  {isIn ? (
                    <>
                      <Check className="w-3 h-3 text-amber-400" />
                      <span className="font-bold">{stock.ticker}</span>
                      <span className="text-[10px] text-amber-400/80">+{stock.expectedGrowth2Y.toFixed(1)}%</span>
                      <span className="text-[10px] text-zinc-500 hover:text-rose-400 ml-0.5">✕</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 text-zinc-500" />
                      <span>{stock.ticker}</span>
                      <span className="text-[10px] text-zinc-500">+{stock.expectedGrowth2Y.toFixed(1)}%</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
