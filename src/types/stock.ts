export type SectorType = 
  | 'Banki i Finanse'
  | 'Paliwa i Energetyka'
  | 'Handel i E-commerce'
  | 'Surowce i Górnictwo'
  | 'Technologia i Gaming'
  | 'Przemysł i Budownictwo'
  | 'Telekomunikacja i Media';

export type GrowthCategory = 
  | 'Wysoki wzrost (>15%)'
  | 'Stabilny wzrost (7-15%)'
  | 'Umiarkowany (2-7%)'
  | 'Cykliczny / Odbicie';

export interface FinancialMetricYear {
  year: string;
  revenue: number; // mld PLN
  netIncome: number; // mld PLN
  eps: number; // PLN
  isForecast?: boolean;
}

export interface StockData {
  id: string;
  ticker: string;
  name: string;
  fullName: string;
  sector: SectorType;
  price: number; // PLN
  change1D: number; // %
  change1Y: number; // %
  marketCap: number; // mld PLN
  wig20Weight: number; // % udział w WIG20

  // 1. Aktualna cena akcji do zysku (C/Z)
  peTrailing: number; // C/Z bieżące (trailing 12m)
  peForward: number; // C/Z prognozowane 2-letnie
  pbRatio: number; // C/WK (Cena do Wartości Księgowej)
  pegRatio: number; // PEG = (C/Z) / (tempo wzrostu zysków)
  industryPeAvg: number; // Średnie C/Z sektora dla kontekstu

  // 2. 2-letni przewidywany wzrost
  targetPrice2Y: number; // Średnia 2-letnia cena docelowa (konsensus)
  expectedGrowth2Y: number; // Przewidywany 2-letni wzrost kursu akcji %
  epsCagr2Y: number; // 2-letnie tempo wzrostu zysku na akcję (% CAGR)
  consensusRating: 'Kupuj' | 'Akumuluj' | 'Trzymaj' | 'Redukuj';
  analystsCount: number;
  expectedDividends2Y: number; // Suma przewidywanych dywidend za 2 lata (PLN na akcję)

  // 3. Tempo wzrostu biznesu
  revenueGrowthYoY: number; // Tempo wzrostu przychodów r/r %
  revenueCagr3Y: number; // Historyczne tempo wzrostu przychodów 3Y %
  ebitdaGrowthYoY: number; // Tempo wzrostu EBITDA r/r %
  growthCategory: GrowthCategory;
  roe: number; // Zwrot z kapitału własnego %
  dividendYield: number; // Bieżąca stopa dywidendy %

  // Jakościowa analiza biznesowa
  businessDescription: string;
  growthCatalysts: string[];
  businessRisks: string[];
  financials: FinancialMetricYear[];
}

export type ViewMode = 'table' | 'matrix' | 'cards' | 'simulator';

export type TableMetricGroup = 'all' | 'valuation' | 'growth' | 'business' | 'dividends';
