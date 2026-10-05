import React from 'react';
import { ViewMode } from '../types/stock';
import { 
  TrendingUp, 
  BarChart3, 
  LayoutGrid, 
  Calculator, 
  Download, 
  CheckSquare, 
  RefreshCw,
  Bell
} from 'lucide-react';

interface HeaderProps {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  selectedCount: number;
  onOpenCompare: () => void;
  onOpenExport: () => void;
  secondsRemaining: number;
  isRefreshing: boolean;
  onRefreshNow: () => void;
  isAutoRefreshActive: boolean;
  onToggleAutoRefresh: () => void;
  alertsCount?: number;
  triggeredAlertsCount?: number;
  onOpenAlerts?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  selectedCount,
  onOpenCompare,
  onOpenExport,
  secondsRemaining,
  isRefreshing,
  onRefreshNow,
  isAutoRefreshActive,
  onToggleAutoRefresh,
  alertsCount = 0,
  triggeredAlertsCount = 0,
  onOpenAlerts
}) => {
  // Format MM:SS
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            WIG20<span className="text-amber-400">Terminal</span>
          </span>
        </div>

        {/* Zone 2: Clean navigation links / view modes */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/90 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setActiveView('table')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeView === 'table'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Tabela Wskaźników
          </button>
          <button
            onClick={() => setActiveView('matrix')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeView === 'matrix'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Matryca Wycena vs Wzrost
          </button>
          <button
            onClick={() => setActiveView('cards')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeView === 'cards'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Karty Spółek
          </button>
          <button
            onClick={() => setActiveView('simulator')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeView === 'simulator'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            Symulator 2-letni
          </button>
        </nav>

        {/* Zone 3: 10-Minute Live Update Indicator, Alert Bell & Actions */}
        <div className="flex items-center gap-2">
          {/* 10-min countdown timer & instant refresh button */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={onToggleAutoRefresh}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-zinc-300 hover:text-white transition-colors"
              title={isAutoRefreshActive ? 'Automatyczna aktualizacja co 10 min włączona (kliknij aby spauzować)' : 'Aktualizacja wstrzymana'}
            >
              <span className={`w-2 h-2 rounded-full ${isAutoRefreshActive ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
              <span className="hidden sm:inline text-zinc-400">Aktualizacja za:</span>
              <span className="font-mono tabular-nums font-semibold text-amber-400">
                {timeFormatted}
              </span>
            </button>

            <button
              onClick={onRefreshNow}
              disabled={isRefreshing}
              className="p-1.5 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 rounded-md transition-all disabled:opacity-50"
              title="Odśwież kursy i wyceny teraz"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>

          {/* Price Alerts Bell Button */}
          {onOpenAlerts && (
            <button
              onClick={onOpenAlerts}
              className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                triggeredAlertsCount > 0
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                  : alertsCount > 0
                    ? 'bg-zinc-900 text-amber-400 border-amber-500/30 hover:bg-zinc-800'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
              }`}
              title={
                triggeredAlertsCount > 0
                  ? `${triggeredAlertsCount} alert(y) cenowe osiągnęły cel!`
                  : `Alerty cenowe (${alertsCount} aktywnych)`
              }
            >
              <Bell className={`w-3.5 h-3.5 ${triggeredAlertsCount > 0 ? 'animate-bounce text-emerald-400' : ''}`} />
              <span className="hidden sm:inline">Alerty</span>
              {triggeredAlertsCount > 0 ? (
                <span className="px-1.5 py-0.2 bg-emerald-500 text-zinc-950 font-bold rounded-full text-[10px] font-mono">
                  {triggeredAlertsCount}
                </span>
              ) : alertsCount > 0 ? (
                <span className="text-[10px] font-mono text-amber-400 font-semibold">
                  ({alertsCount})
                </span>
              ) : null}
            </button>
          )}

          {selectedCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors whitespace-nowrap"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Porównaj ({selectedCount})
            </button>
          )}

          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Eksportuj</span>
          </button>
        </div>
      </div>

      {/* Mobile nav strip */}
      <div className="lg:hidden flex items-center justify-around px-2 py-2 border-t border-zinc-900 bg-zinc-950 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveView('table')}
          className={`px-2.5 py-1 rounded ${activeView === 'table' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'}`}
        >
          Tabela
        </button>
        <button
          onClick={() => setActiveView('matrix')}
          className={`px-2.5 py-1 rounded ${activeView === 'matrix' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'}`}
        >
          Matryca 2D
        </button>
        <button
          onClick={() => setActiveView('cards')}
          className={`px-2.5 py-1 rounded ${activeView === 'cards' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'}`}
        >
          Karty
        </button>
        <button
          onClick={() => setActiveView('simulator')}
          className={`px-2.5 py-1 rounded ${activeView === 'simulator' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'}`}
        >
          Symulator 2Y
        </button>
      </div>
    </header>
  );
};
