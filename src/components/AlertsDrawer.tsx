import React from 'react';
import { PriceAlert } from '../types/alert';
import { StockData } from '../types/stock';
import { X, Bell, Trash2, CheckCircle2, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

interface AlertsDrawerProps {
  alerts: PriceAlert[];
  stocks: StockData[];
  onClose: () => void;
  onRemoveAlert: (id: string) => void;
  onResetAlert: (id: string) => void;
  onClearAllAlerts: () => void;
  onSelectStock: (stock: StockData) => void;
}

export const AlertsDrawer: React.FC<AlertsDrawerProps> = ({
  alerts,
  stocks,
  onClose,
  onRemoveAlert,
  onResetAlert,
  onClearAllAlerts,
  onSelectStock
}) => {
  const stockMap = React.useMemo(() => {
    const map: Record<string, StockData> = {};
    stocks.forEach(s => {
      map[s.ticker] = s;
    });
    return map;
  }, [stocks]);

  const triggeredAlerts = alerts.filter(a => a.isTriggered);
  const pendingAlerts = alerts.filter(a => !a.isTriggered);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Alerty Cenowe i Powiadomienia ({alerts.length})
              </h3>
              <p className="text-xs text-zinc-400">
                Powiadomienia w czasie rzeczywistym po osiągnięciu ceny docelowej przez kurs spółki.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-200">Brak ustawionych alertów cenowych</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
                Możesz ustawić cel cenowy dla dowolnej spółki WIG20, klikając ikonę dzwonka w tabeli notowań lub w profilu spółki.
              </p>
            </div>
          ) : (
            <>
              {/* Triggered Alerts Section */}
              {triggeredAlerts.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Osiągnięte cele cenowe ({triggeredAlerts.length})</span>
                  </div>

                  <div className="space-y-2">
                    {triggeredAlerts.map(alert => {
                      const stock = stockMap[alert.ticker];
                      const currentPrice = stock ? stock.price : alert.targetPrice;

                      return (
                        <div 
                          key={alert.id}
                          className="bg-emerald-950/20 border border-emerald-500/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg ring-1 ring-emerald-500/20 animate-pulse-subtle"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-extrabold text-sm text-white">
                                {alert.ticker}
                              </span>
                              <span className="text-xs text-zinc-300 font-sans">
                                {alert.stockName}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                                CEL OSIĄGNIĘTY ✓
                              </span>
                            </div>

                            <div className="text-xs text-zinc-300 font-mono mt-1 flex items-center gap-3">
                              <span>
                                Cel: <strong className="text-white">{alert.targetPrice.toFixed(2)} zł</strong>
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>
                                Aktualny kurs: <strong className="text-emerald-400">{currentPrice.toFixed(2)} zł</strong>
                              </span>
                            </div>

                            {alert.triggeredAt && (
                              <div className="text-[10px] text-zinc-400 font-sans mt-0.5">
                                Zdarzenie odnotowano: {new Date(alert.triggeredAt).toLocaleTimeString('pl-PL')}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {stock && (
                              <button
                                onClick={() => {
                                  onSelectStock(stock);
                                  onClose();
                                }}
                                className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs transition-colors flex items-center gap-1"
                              >
                                Profil <ArrowRight className="w-3 h-3" />
                              </button>
                            )}

                            <button
                              onClick={() => onResetAlert(alert.id)}
                              className="p-1.5 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 rounded transition-colors"
                              title="Wznów oczekiwanie na ten alert"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => onRemoveAlert(alert.id)}
                              className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 rounded transition-colors"
                              title="Usuń alert"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pending Alerts Section */}
              {pendingAlerts.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" />
                    <span>Aktywne alerty w toku ({pendingAlerts.length})</span>
                  </div>

                  <div className="space-y-2">
                    {pendingAlerts.map(alert => {
                      const stock = stockMap[alert.ticker];
                      const currentPrice = stock ? stock.price : 0;
                      const diffPercent = currentPrice > 0 
                        ? ((alert.targetPrice - currentPrice) / currentPrice) * 100 
                        : 0;

                      return (
                        <div 
                          key={alert.id}
                          className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-white">
                                {alert.ticker}
                              </span>
                              <span className="text-xs text-zinc-400 font-sans">
                                {alert.stockName}
                              </span>
                              <span className="text-[10px] text-zinc-500 font-mono">
                                ({alert.condition === 'above_or_equal' ? '≥ wzwyż' : '≤ w dół'})
                              </span>
                            </div>

                            <div className="text-xs font-mono mt-1 flex items-center gap-3">
                              <span className="text-zinc-400">
                                Cel: <strong className="text-amber-400">{alert.targetPrice.toFixed(2)} zł</strong>
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="text-zinc-400">
                                Kurs bieżący: <strong className="text-zinc-200">{currentPrice.toFixed(2)} zł</strong>
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className={diffPercent >= 0 ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                                {diffPercent >= 0 ? '+' : ''}{diffPercent.toFixed(1)}% do celu
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {stock && (
                              <button
                                onClick={() => {
                                  onSelectStock(stock);
                                  onClose();
                                }}
                                className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs transition-colors"
                              >
                                Zobacz spółkę
                              </button>
                            )}

                            <button
                              onClick={() => onRemoveAlert(alert.id)}
                              className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 rounded transition-colors"
                              title="Usuń alert"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="bg-zinc-950 px-6 py-3.5 border-t border-zinc-800 flex items-center justify-between text-xs">
          {alerts.length > 0 ? (
            <button
              onClick={onClearAllAlerts}
              className="text-zinc-500 hover:text-rose-400 transition-colors"
            >
              Wyczyść wszystkie alerty
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
