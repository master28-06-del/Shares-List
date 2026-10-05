import React, { useState } from 'react';
import { StockData } from '../types/stock';
import { Sparkles, Info, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

interface ValuationGrowthMatrixProps {
  stocks: StockData[];
  onSelectStock: (stock: StockData) => void;
}

export const ValuationGrowthMatrix: React.FC<ValuationGrowthMatrixProps> = ({
  stocks,
  onSelectStock
}) => {
  const [hoveredStock, setHoveredStock] = useState<StockData | null>(null);
  const [xAxisType, setXAxisType] = useState<'revenue' | 'eps'>('revenue');
  const [yAxisType, setYAxisType] = useState<'pe' | 'growth2y'>('pe');

  const xMin = xAxisType === 'revenue' ? -6 : 4;
  const xMax = xAxisType === 'revenue' ? 24 : 32;

  const yMin = yAxisType === 'pe' ? 4 : 12;
  const yMax = yAxisType === 'pe' ? 48 : 46;

  const getX = (stock: StockData) => {
    const val = xAxisType === 'revenue' ? stock.revenueGrowthYoY : stock.epsCagr2Y;
    const clamped = Math.max(xMin, Math.min(xMax, val));
    return ((clamped - xMin) / (xMax - xMin)) * 100;
  };

  const getY = (stock: StockData) => {
    const val = yAxisType === 'pe' ? stock.peTrailing : stock.expectedGrowth2Y;
    const clamped = Math.max(yMin, Math.min(yMax, val));
    return ((clamped - yMin) / (yMax - yMin)) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Intro and Axis Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Matryca Analityczna: Wycena C/Z vs Tempo Wzrostu Biznesu
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Pozycjonowanie 20 spółek WIG20 na płaszczyźnie relacji ceny do zysku oraz dynamiki biznesowej.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-300">
            <span className="text-zinc-400">Oś Pozioma (X):</span>
            <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setXAxisType('revenue')}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  xAxisType === 'revenue' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Tempo Przychodów r/r
              </button>
              <button
                onClick={() => setXAxisType('eps')}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  xAxisType === 'eps' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                EPS 2L CAGR
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-300">
            <span className="text-zinc-400">Oś Pionowa (Y):</span>
            <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setYAxisType('pe')}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  yAxisType === 'pe' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Wskaźnik C/Z
              </button>
              <button
                onClick={() => setYAxisType('growth2y')}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  yAxisType === 'growth2y' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                2L Wzrost Kursu %
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Scatter Quadrant View */}
      <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl p-6 min-h-[520px] flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Quadrant Background Zones */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-30 pointer-events-none">
          {/* Top Left */}
          <div className="border-r border-b border-zinc-800/80 bg-zinc-900/10 p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
              {yAxisType === 'pe' ? 'Wysoka Wycena / Umiarkowany Wzrost' : 'Wysoki Upside / Umiarkowane Tempo'}
            </span>
            <span className="text-[10px] text-zinc-500">
              {yAxisType === 'pe' ? 'Wymaga selektywności' : 'Okazje w restrukturyzacji i cyklu'}
            </span>
          </div>

          {/* Top Right */}
          <div className="border-b border-zinc-800/80 bg-emerald-950/15 p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 block">
              {yAxisType === 'pe' ? 'Liderzy Wzrostu (Growth Premium)' : 'Super-Okazje (Wysoki Wzrost + Duży Upside)'}
            </span>
            <span className="text-[10px] text-emerald-500/80">
              {yAxisType === 'pe' ? 'Wysokie tempo skalowania biznesu' : 'Najwyższy łączny potencjał'}
            </span>
          </div>

          {/* Bottom Left */}
          <div className="border-r border-zinc-800/80 bg-amber-950/10 p-4 flex flex-col justify-end">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 block">
              {yAxisType === 'pe' ? 'Dojrzałe Czempiony Dywidendowe (Niskie C/Z)' : 'Konserwatywne Spółki Wartościowe'}
            </span>
            <span className="text-[10px] text-amber-500/80">
              Stabilny cash-flow, wysoka stopa dywidendy
            </span>
          </div>

          {/* Bottom Right */}
          <div className="bg-emerald-950/20 p-4 flex flex-col justify-end">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300 block">
              {yAxisType === 'pe' ? 'Okazje GARP (Niskie C/Z + Szybki Rozwój)' : 'Stabilny Wzrost Biznesowy'}
            </span>
            <span className="text-[10px] text-emerald-400/80">
              Atrakcyjne PEG &lt; 1.0 (Kruk, mBank, LPP)
            </span>
          </div>
        </div>

        {/* Quadrant Center Hairline Cross */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800/60 pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-800/60 pointer-events-none" />

        {/* Axis Labels */}
        <div className="absolute top-4 left-6 text-xs text-zinc-400 font-mono">
          ▲ {yAxisType === 'pe' ? 'C/Z: 48x (Wysoka wycena)' : '2L Upside: +46% (Wysoki potencjał)'}
        </div>
        <div className="absolute bottom-4 left-6 text-xs text-zinc-400 font-mono">
          ▼ {yAxisType === 'pe' ? 'C/Z: 4x (Niska wycena)' : '2L Upside: +12%'}
        </div>
        <div className="absolute bottom-4 right-6 text-xs text-zinc-400 font-mono text-right">
          {xAxisType === 'revenue' ? 'Tempo przychodów: +24% r/r ▶' : 'EPS CAGR: +32% ▶'}
        </div>

        {/* Scatter Points Area */}
        <div className="relative w-full h-[400px] my-6">
          {stocks.map((stock) => {
            const posX = getX(stock);
            const posY = getY(stock);
            const isHovered = hoveredStock?.id === stock.id;

            let dotColor = 'bg-emerald-600 text-white shadow-emerald-600/30';
            if (stock.peTrailing > 20) {
              dotColor = 'bg-zinc-700 text-zinc-100 shadow-zinc-700/30';
            } else if (stock.pegRatio <= 0.9) {
              dotColor = 'bg-amber-400 text-zinc-950 font-bold shadow-amber-400/40 ring-2 ring-amber-300/60';
            } else {
              dotColor = 'bg-teal-600 text-white shadow-teal-600/30';
            }

            return (
              <div
                key={stock.id}
                style={{
                  left: `${posX}%`,
                  bottom: `${posY}%`,
                  transform: 'translate(-50%, 50%)'
                }}
                onMouseEnter={() => setHoveredStock(stock)}
                onMouseLeave={() => setHoveredStock(null)}
                onClick={() => onSelectStock(stock)}
                className={`absolute cursor-pointer transition-transform duration-150 z-20 ${
                  isHovered ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
              >
                <div className={`px-2 py-0.5 rounded-md text-[11px] font-mono shadow-lg transition-all flex items-center gap-1 ${dotColor}`}>
                  <span>{stock.ticker}</span>
                  <span className="text-[9px] opacity-80">
                    {yAxisType === 'pe' ? `${stock.peTrailing}x` : `+${stock.expectedGrowth2Y}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tooltip Overlay */}
        {hoveredStock && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-900 border border-zinc-700/80 p-4 rounded-xl shadow-2xl text-xs max-w-sm pointer-events-none animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between gap-3 border-b border-zinc-800 pb-2 mb-2">
              <div>
                <span className="text-sm font-bold text-white">{hoveredStock.ticker}</span>
                <span className="text-zinc-400 ml-2">{hoveredStock.name}</span>
              </div>
              <span className="text-amber-400 font-mono font-bold">
                {hoveredStock.price} zł
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[11px]">
              <div>
                <span className="text-zinc-400">Aktualne C/Z:</span>
                <span className="text-amber-400 font-bold ml-1">{hoveredStock.peTrailing}x</span>
              </div>
              <div>
                <span className="text-zinc-400">Wskaźnik PEG:</span>
                <span className="text-emerald-400 font-bold ml-1">{hoveredStock.pegRatio}</span>
              </div>
              <div>
                <span className="text-zinc-400">Tempo przychodów:</span>
                <span className="text-teal-400 font-bold ml-1">+{hoveredStock.revenueGrowthYoY}%</span>
              </div>
              <div>
                <span className="text-zinc-400">2L Przewidywany Wzrost:</span>
                <span className="text-emerald-400 font-bold ml-1">+{hoveredStock.expectedGrowth2Y}%</span>
              </div>
              <div>
                <span className="text-zinc-400">Cena docelowa 2L:</span>
                <span className="text-zinc-200 ml-1">{hoveredStock.targetPrice2Y} zł</span>
              </div>
              <div>
                <span className="text-zinc-400">Stopa dywidendy:</span>
                <span className="text-amber-400 ml-1">{hoveredStock.dividendYield}%</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400 font-sans line-clamp-2">
              {hoveredStock.growthCatalysts[0]}
            </div>
          </div>
        )}
      </div>

      {/* 4 Quadrant Strategic Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-zinc-900/60 border border-amber-900/40 rounded-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase mb-1">
            <Zap className="w-3.5 h-3.5" />
            Okazje GARP (Niski C/Z + Wzrost)
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Spółki o wskaźniku PEG &lt; 1.0, gdzie wysokie tempo wzrostu zysków (14-20%) nie zostało w pełni wycenione przez rynek.
          </p>
          <div className="mt-3 flex flex-wrap gap-1 font-mono text-[11px] text-amber-300">
            <span>KRUK (KRU)</span> · <span>mBank (MBK)</span> · <span>LPP</span>
          </div>
        </div>

        <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2 text-zinc-300 font-bold text-xs uppercase mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Dojrzałe Czempiony Dywidendowe
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Bardzo niskie C/Z (5-8x), potężny strumień gotówki i wysoka stopa dywidendy (6-9%), stabilne umiarkowane tempo rozwoju.
          </p>
          <div className="mt-3 flex flex-wrap gap-1 font-mono text-[11px] text-zinc-300">
            <span>Pekao (PEO)</span> · <span>PKO BP</span> · <span>PZU</span> · <span>Orlen</span>
          </div>
        </div>

        <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Liderzy Wzrostu (Growth Premium)
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Spółki o ponadprzeciętnej dynamice ekspansji rynkowej (otwarcia marketów, platformy online), gdzie rynek akceptuje wyższe C/Z.
          </p>
          <div className="mt-3 flex flex-wrap gap-1 font-mono text-[11px] text-emerald-300">
            <span>Dino Polska</span> · <span>Allegro</span> · <span>CD Projekt</span>
          </div>
        </div>

        <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase mb-1">
            <Info className="w-3.5 h-3.5" />
            Odbicia Cykliczne & Restrukturyzacja
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Spółki w głębokim dołku cyklu lub procesie transformacji o niskiej wycenie majątkowej C/WK &lt; 0.7x i bardzo wysokim 2L potencjale kursu.
          </p>
          <div className="mt-3 flex flex-wrap gap-1 font-mono text-[11px] text-zinc-300">
            <span>JSW</span> · <span>Pepco (PCO)</span> · <span>KGHM</span> · <span>PGE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
