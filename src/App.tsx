import React, { useState } from 'react';
import { ViewMode, StockData } from './types/stock';
import { useMarketData } from './hooks/useMarketData';
import { usePriceAlerts } from './hooks/usePriceAlerts';
import { Header } from './components/Header';
import { MarketSummaryBar } from './components/MarketSummaryBar';
import { StockTable } from './components/StockTable';
import { ValuationGrowthMatrix } from './components/ValuationGrowthMatrix';
import { StockCardsView } from './components/StockCardsView';
import { PortfolioSimulator } from './components/PortfolioSimulator';
import { CompanyModal } from './components/CompanyModal';
import { CompareDrawer } from './components/CompareDrawer';
import { ExportModal } from './components/ExportModal';
import { SetAlertModal } from './components/SetAlertModal';
import { AlertsDrawer } from './components/AlertsDrawer';
import { ToastNotification } from './components/ToastNotification';

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>('table');
  const [selectedStockIdForModal, setSelectedStockIdForModal] = useState<string | null>(null);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAlertsDrawerOpen, setIsAlertsDrawerOpen] = useState(false);
  const [stockForAlertModal, setStockForAlertModal] = useState<StockData | null>(null);
  const [activeSectorFilter, setActiveSectorFilter] = useState<string>('all');
  const [quickFilterType, setQuickFilterType] = useState<string | undefined>(undefined);

  // 10-Minute live quotes refresh hook (backed by real GPW API)
  const {
    stocks,
    wig20Index,
    wig20Change1D,
    lastUpdated,
    secondsRemaining,
    isAutoRefreshActive,
    isRefreshing,
    dataSource,
    toggleAutoRefresh,
    refreshNow,
    changedTickers
  } = useMarketData();

  // Price target alerts notification system
  const {
    alerts,
    alertMap,
    activeToasts,
    triggeredCount,
    addOrUpdateAlert,
    removeAlert,
    resetAlert,
    dismissToast,
    clearAllAlerts
  } = usePriceAlerts(stocks);

  const handleToggleCompare = (id: string) => {
    setSelectedCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 4) {
          return [...prev.slice(1), id];
        }
        return [...prev, id];
      }
    });
  };

  const handleQuickFilter = (filterType: string) => {
    setActiveView('table');
    setQuickFilterType(prev => prev === filterType ? undefined : filterType);
  };

  const selectedStockForModal = selectedStockIdForModal 
    ? stocks.find(s => s.id === selectedStockIdForModal) || null 
    : null;

  const selectedCompareStocks = stocks.filter(s => selectedCompareIds.includes(s.id));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* 1. Header with 10-minute Refresh Countdown & Notification Bell */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        selectedCount={selectedCompareIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        secondsRemaining={secondsRemaining}
        isRefreshing={isRefreshing}
        onRefreshNow={refreshNow}
        isAutoRefreshActive={isAutoRefreshActive}
        onToggleAutoRefresh={toggleAutoRefresh}
        alertsCount={alerts.length}
        triggeredAlertsCount={triggeredCount}
        onOpenAlerts={() => setIsAlertsDrawerOpen(true)}
      />

      {/* 2. Top High-Level Market Statistics with Live Updates */}
      <MarketSummaryBar 
        stocks={stocks}
        wig20Index={wig20Index}
        wig20Change1D={wig20Change1D}
        lastUpdated={lastUpdated}
        dataSource={dataSource}
        onQuickFilter={handleQuickFilter} 
      />

      {/* 3. Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Active View Router */}
        {activeView === 'table' && (
          <StockTable
            stocks={stocks}
            onSelectStock={(stock) => setSelectedStockIdForModal(stock.id)}
            selectedIds={selectedCompareIds}
            onToggleCompare={handleToggleCompare}
            activeSectorFilter={activeSectorFilter}
            setActiveSectorFilter={setActiveSectorFilter}
            quickFilterType={quickFilterType}
            changedTickers={changedTickers}
            alertMap={alertMap}
            onOpenSetAlert={(stock) => setStockForAlertModal(stock)}
          />
        )}

        {activeView === 'matrix' && (
          <ValuationGrowthMatrix
            stocks={stocks}
            onSelectStock={(stock) => setSelectedStockIdForModal(stock.id)}
          />
        )}

        {activeView === 'cards' && (
          <StockCardsView
            stocks={stocks}
            onSelectStock={(stock) => setSelectedStockIdForModal(stock.id)}
            selectedIds={selectedCompareIds}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {activeView === 'simulator' && (
          <PortfolioSimulator
            stocks={stocks}
            onSelectStock={(stock) => setSelectedStockIdForModal(stock.id)}
          />
        )}
      </main>

      {/* 4. Company Detail Modal with Price Alert Integration */}
      {selectedStockForModal && (
        <CompanyModal
          stock={selectedStockForModal}
          onClose={() => setSelectedStockIdForModal(null)}
          onToggleCompare={handleToggleCompare}
          isCompared={selectedCompareIds.includes(selectedStockForModal.id)}
          alert={alertMap[selectedStockForModal.ticker]}
          onOpenSetAlert={(stock) => setStockForAlertModal(stock)}
        />
      )}

      {/* 5. Head-to-Head Comparison Drawer */}
      {isCompareOpen && (
        <CompareDrawer
          selectedStocks={selectedCompareStocks}
          onClose={() => setIsCompareOpen(false)}
          onRemoveStock={handleToggleCompare}
          onSelectStock={(stock) => {
            setIsCompareOpen(false);
            setSelectedStockIdForModal(stock.id);
          }}
        />
      )}

      {/* 6. Export Modal */}
      {isExportOpen && (
        <ExportModal
          stocks={stocks}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      {/* 7. Target Price Alert Setter Modal */}
      {stockForAlertModal && (
        <SetAlertModal
          stock={stockForAlertModal}
          existingAlert={alertMap[stockForAlertModal.ticker]}
          onClose={() => setStockForAlertModal(null)}
          onSaveAlert={addOrUpdateAlert}
          onRemoveAlert={removeAlert}
        />
      )}

      {/* 8. Alerts Management Drawer */}
      {isAlertsDrawerOpen && (
        <AlertsDrawer
          alerts={alerts}
          stocks={stocks}
          onClose={() => setIsAlertsDrawerOpen(false)}
          onRemoveAlert={removeAlert}
          onResetAlert={resetAlert}
          onClearAllAlerts={clearAllAlerts}
          onSelectStock={(stock) => {
            setIsAlertsDrawerOpen(false);
            setSelectedStockIdForModal(stock.id);
          }}
        />
      )}

      {/* 9. Floating Toast Notification when Alert Triggers */}
      <ToastNotification
        toasts={activeToasts}
        stocks={stocks}
        onDismiss={dismissToast}
        onSelectStock={(stock) => setSelectedStockIdForModal(stock.id)}
      />

      {/* 10. Footer: Methodology & Zero-Pill Metadata */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-zinc-400">
            <span className="font-semibold text-zinc-200">WIG20 Analytics Terminal</span>
            <span aria-hidden="true">·</span>
            <span>Warszawska Giełda Papierów Wartościowych</span>
            <span aria-hidden="true">·</span>
            <span>Alerty Cenowe w czasie rzeczywistym</span>
            <span aria-hidden="true">·</span>
            <span>Konsensus Analityczny 2L</span>
          </div>

          <div className="text-zinc-500 text-[11px] text-center md:text-right leading-relaxed">
            Dane mają charakter analityczno-informacyjny i nie stanowią rekomendacji inwestycyjnej w rozumieniu prawa.
          </div>
        </div>
      </footer>
    </div>
  );
}
