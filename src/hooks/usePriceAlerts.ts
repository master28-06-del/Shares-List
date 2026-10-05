import { useState, useEffect, useCallback, useMemo } from 'react';
import { StockData } from '../types/stock';
import { PriceAlert, AlertCondition } from '../types/alert';

const STORAGE_KEY = 'wig20_price_alerts_v1';

export function usePriceAlerts(stocks: StockData[]) {
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse price alerts from localStorage', e);
    }
    // Default sample alert on CD Projekt to demonstrate the feature immediately if near 250 PLN
    return [
      {
        id: 'alert_cdr_demo',
        ticker: 'CDR',
        stockName: 'CD Projekt',
        targetPrice: 250.00,
        condition: 'above_or_equal',
        createdAt: new Date().toISOString(),
        isTriggered: false,
        isDismissed: false
      }
    ];
  });

  const [activeToasts, setActiveToasts] = useState<PriceAlert[]>([]);

  // Persist to localStorage whenever alerts change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
    } catch (e) {
      console.warn('Failed to save alerts to localStorage', e);
    }
  }, [alerts]);

  // Evaluate alerts against updated stock prices
  useEffect(() => {
    if (!stocks || stocks.length === 0) return;

    let hasUpdates = false;
    const newlyTriggered: PriceAlert[] = [];

    const updatedAlerts = alerts.map(alert => {
      const stock = stocks.find(s => s.ticker === alert.ticker);
      if (!stock) return alert;

      // Check if alert conditions are satisfied
      let shouldTrigger = false;
      if (alert.condition === 'above_or_equal') {
        shouldTrigger = stock.price >= alert.targetPrice;
      } else {
        shouldTrigger = stock.price <= alert.targetPrice;
      }

      if (shouldTrigger && !alert.isTriggered) {
        hasUpdates = true;
        const triggeredAlert: PriceAlert = {
          ...alert,
          isTriggered: true,
          triggeredAt: new Date().toISOString(),
          triggeredPrice: stock.price,
          isDismissed: false
        };
        newlyTriggered.push(triggeredAlert);
        return triggeredAlert;
      }

      return alert;
    });

    if (hasUpdates) {
      setAlerts(updatedAlerts);
      setActiveToasts(prev => [...prev, ...newlyTriggered]);
    }
  }, [stocks]);

  const addOrUpdateAlert = useCallback((
    ticker: string,
    stockName: string,
    targetPrice: number,
    condition?: AlertCondition
  ) => {
    const stock = stocks.find(s => s.ticker === ticker);
    const currentPrice = stock ? stock.price : targetPrice;

    // Automatically decide condition if not provided
    const determinedCondition: AlertCondition = condition || (targetPrice >= currentPrice ? 'above_or_equal' : 'below_or_equal');

    setAlerts(prev => {
      // Remove any existing alert for this ticker or append
      const filtered = prev.filter(a => a.ticker !== ticker);
      const isAlreadyHit = determinedCondition === 'above_or_equal' 
        ? currentPrice >= targetPrice 
        : currentPrice <= targetPrice;

      const newAlert: PriceAlert = {
        id: `alert_${ticker}_${Date.now()}`,
        ticker,
        stockName,
        targetPrice: Number(targetPrice.toFixed(2)),
        condition: determinedCondition,
        createdAt: new Date().toISOString(),
        isTriggered: isAlreadyHit,
        triggeredAt: isAlreadyHit ? new Date().toISOString() : undefined,
        triggeredPrice: isAlreadyHit ? currentPrice : undefined,
        isDismissed: false
      };

      if (isAlreadyHit) {
        setActiveToasts(t => [...t, newAlert]);
      }

      return [newAlert, ...filtered];
    });
  }, [stocks]);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    setActiveToasts(prev => prev.filter(a => a.id !== id));
  }, []);

  const resetAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          isTriggered: false,
          triggeredAt: undefined,
          triggeredPrice: undefined,
          isDismissed: false
        };
      }
      return a;
    }));
    setActiveToasts(prev => prev.filter(a => a.id !== id));
  }, []);

  const dismissToast = useCallback((id: string) => {
    setActiveToasts(prev => prev.filter(a => a.id !== id));
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isDismissed: true } : a));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
    setActiveToasts([]);
  }, []);

  // Quick lookup helper: maps ticker to its alert if present
  const alertMap = useMemo(() => {
    const map: Record<string, PriceAlert> = {};
    alerts.forEach(a => {
      map[a.ticker] = a;
    });
    return map;
  }, [alerts]);

  const triggeredCount = useMemo(() => {
    return alerts.filter(a => a.isTriggered && !a.isDismissed).length;
  }, [alerts]);

  return {
    alerts,
    alertMap,
    activeToasts,
    triggeredCount,
    addOrUpdateAlert,
    removeAlert,
    resetAlert,
    dismissToast,
    clearAllAlerts
  };
}
