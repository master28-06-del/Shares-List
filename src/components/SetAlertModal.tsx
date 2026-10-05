import React, { useState } from 'react';
import { StockData } from '../types/stock';
import { PriceAlert, AlertCondition } from '../types/alert';
import { X, Bell, Target, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';

interface SetAlertModalProps {
  stock: StockData;
  existingAlert?: PriceAlert;
  onClose: () => void;
  onSaveAlert: (ticker: string, stockName: string, targetPrice: number, condition?: AlertCondition) => void;
  onRemoveAlert?: (alertId: string) => void;
}

export const SetAlertModal: React.FC<SetAlertModalProps> = ({
  stock,
  existingAlert,
  onClose,
  onSaveAlert,
  onRemoveAlert
}) => {
  const [targetPrice, setTargetPrice] = useState<number>(
    existingAlert ? existingAlert.targetPrice : Number((stock.price * 1.05).toFixed(2))
  );

  const diffPercent = ((targetPrice - stock.price) / stock.price) * 100;
  const isAbove = targetPrice >= stock.price;

  const handlePreset = (multiplier: number) => {
    setTargetPrice(Number((stock.price * multiplier).toFixed(2)));
  };

  const handleAnalystTarget = () => {
    setTargetPrice(stock.targetPrice2Y);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetPrice <= 0) return;
    onSaveAlert(stock.ticker, stock.name, targetPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Ustaw Alert Cenowy: {stock.ticker}
              </h3>
              <p className="text-[11px] text-zinc-400">{stock.fullName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current price bar */}
        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between mb-4">
          <span className="text-xs text-zinc-400">Aktualny kurs rynkowy:</span>
          <span className="text-base font-bold font-mono text-white tabular-nums">
            {stock.price.toFixed(2)} zł
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Cena Docelowa (PLN):
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.05"
                min="0.01"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full pl-3 pr-14 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white font-mono font-bold text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 tabular-nums"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-zinc-400">
                PLN
              </span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <span className="block text-[11px] text-zinc-400 mb-1.5">Szybkie poziomy docelowe:</span>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => handlePreset(1.05)}
                className="py-1.5 px-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-300 transition-colors"
              >
                +5%
              </button>
              <button
                type="button"
                onClick={() => handlePreset(1.10)}
                className="py-1.5 px-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-300 transition-colors"
              >
                +10%
              </button>
              <button
                type="button"
                onClick={() => handlePreset(0.95)}
                className="py-1.5 px-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-300 transition-colors"
              >
                -5%
              </button>
              <button
                type="button"
                onClick={handleAnalystTarget}
                className="py-1.5 px-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded text-amber-300 font-sans transition-colors truncate"
                title={`Cel 2L analityków: ${stock.targetPrice2Y} zł`}
              >
                Cel 2L
              </button>
            </div>
          </div>

          {/* Calculated Alert Trigger Condition */}
          <div className="p-3 bg-zinc-950/70 border border-zinc-800/80 rounded-xl text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Warunek wyzwolenia:</span>
              <span className="font-semibold text-zinc-200 flex items-center gap-1">
                {isAbove ? (
                  <>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    Wzrost do lub powyżej
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                    Spadek do lub poniżej
                  </>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between font-mono">
              <span className="text-zinc-400">Różnica do kursu:</span>
              <span className={diffPercent >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {diffPercent >= 0 ? '+' : ''}{diffPercent.toFixed(1)}% ({((targetPrice - stock.price)).toFixed(2)} zł)
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            {existingAlert && onRemoveAlert ? (
              <button
                type="button"
                onClick={() => {
                  onRemoveAlert(existingAlert.id);
                  onClose();
                }}
                className="px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-lg transition-colors border border-rose-900/30"
              >
                Usuń alert
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs text-zinc-400 hover:text-white rounded-lg transition-colors"
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5"
              >
                <Target className="w-3.5 h-3.5" />
                Zapisz Alert
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
