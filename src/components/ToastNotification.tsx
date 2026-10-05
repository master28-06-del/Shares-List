import React from 'react';
import { PriceAlert } from '../types/alert';
import { StockData } from '../types/stock';
import { Bell, X, ArrowRight } from 'lucide-react';

interface ToastNotificationProps {
  toasts: PriceAlert[];
  stocks: StockData[];
  onDismiss: (id: string) => void;
  onSelectStock: (stock: StockData) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toasts,
  stocks,
  onDismiss,
  onSelectStock,
}) => {
  if (toasts.length === 0) return null;

  const stockMap = React.useMemo(() => {
    const map: Record<string, StockData> = {};
    stocks.forEach(s => {
      map[s.ticker] = s;
    });
    return map;
  }, [stocks]);

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
      {toasts.map((toast) => {
        const stock = stockMap[toast.ticker];
        const currentPrice = stock ? stock.price : (toast.triggeredPrice || toast.targetPrice);

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-zinc-900/95 border border-emerald-500/60 shadow-2xl rounded-xl p-3.5 backdrop-blur-md ring-1 ring-emerald-500/30 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 animate-pulse">
              <Bell className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                  Alert Cenowy GPW
                </span>
                <button
                  onClick={() => onDismiss(toast.id)}
                  className="text-zinc-500 hover:text-white p-0.5"
                  title="Zamknij powiadomienie"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm font-bold text-white font-sans mt-0.5">
                {toast.ticker}: Cel {toast.targetPrice.toFixed(2)} zł osiągnięty!
              </div>

              <div className="text-xs text-zinc-300 font-mono mt-1">
                Aktualny kurs: <strong className="text-emerald-300">{currentPrice.toFixed(2)} zł</strong>
              </div>

              {stock && (
                <button
                  onClick={() => {
                    onSelectStock(stock);
                    onDismiss(toast.id);
                  }}
                  className="mt-2 text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors"
                >
                  Otwórz profil {stock.ticker} <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
