import React, { useState } from 'react';
import { StockData } from '../types/stock';
import { X, Copy, Download, Check } from 'lucide-react';

interface ExportModalProps {
  stocks: StockData[];
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ stocks, onClose }) => {
  const [copied, setCopied] = useState(false);

  const generateCsv = () => {
    const headers = [
      'Ticker',
      'Nazwa',
      'Sektor',
      'Kurs_PLN',
      'C_Z_Trailing',
      'C_Z_Forward_2L',
      'PEG_Ratio',
      'C_WK',
      'Przewidywany_Wzrost_2L_Proc',
      'Cena_Docelowa_2L_PLN',
      'EPS_CAGR_2L_Proc',
      'Tempo_Przychodow_YoY_Proc',
      'Przychody_3L_CAGR_Proc',
      'Stopa_Dywidendy_Proc',
      'Kapitalizacja_mld_PLN'
    ].join(';');

    const rows = stocks.map(s => [
      s.ticker,
      `"${s.name}"`,
      `"${s.sector}"`,
      s.price.toFixed(2),
      s.peTrailing.toFixed(1),
      s.peForward.toFixed(1),
      s.pegRatio.toFixed(2),
      s.pbRatio.toFixed(2),
      s.expectedGrowth2Y.toFixed(1),
      s.targetPrice2Y.toFixed(2),
      s.epsCagr2Y.toFixed(1),
      s.revenueGrowthYoY.toFixed(1),
      s.revenueCagr3Y.toFixed(1),
      s.dividendYield.toFixed(1),
      s.marketCap.toFixed(1)
    ].join(';'));

    return [headers, ...rows].join('\n');
  };

  const handleCopy = () => {
    const csv = generateCsv();
    navigator.clipboard.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const csv = generateCsv();
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'zestawienie_wig20_wzrost_pe.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
          <h3 className="text-base font-bold text-white">Eksport Danych WIG20</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          Pobierz pełne zestawienie 20 spółek WIG20 w formacie CSV (rozdzielane średnikiem, kompatybilne z polskim Excelem i Google Sheets) lub skopiuj do schowka.
        </p>

        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 font-mono text-[11px] text-zinc-300 max-h-48 overflow-y-auto mb-5 whitespace-pre">
          {generateCsv().slice(0, 450)}...
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Skopiowano!' : 'Kopiuj do schowka'}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            Pobierz plik CSV
          </button>
        </div>
      </div>
    </div>
  );
};
