import { StockData, SectorType } from '../types/stock';

export const WIG20_STOCKS: StockData[] = [
  {
    id: 'pkn',
    ticker: 'PKN',
    name: 'Orlen',
    fullName: 'Orlen S.A.',
    sector: 'Paliwa i Energetyka',
    price: 146.50,
    change1D: -0.85,
    change1Y: 24.5,
    marketCap: 170.2,
    wig20Weight: 11.5,

    // C/Z i wycena
    peTrailing: 7.2,
    peForward: 6.8,
    pbRatio: 0.88,
    pegRatio: 0.85,
    industryPeAvg: 7.5,

    // 2-letni przewidywany wzrost
    targetPrice2Y: 185.00,
    expectedGrowth2Y: 26.3,
    epsCagr2Y: 8.5,
    consensusRating: 'Kupuj',
    analystsCount: 15,
    expectedDividends2Y: 14.80,

    // Tempo wzrostu biznesu
    revenueGrowthYoY: 7.2,
    revenueCagr3Y: 19.5,
    ebitdaGrowthYoY: 9.4,
    growthCategory: 'Stabilny wzrost (7-15%)',
    roe: 14.2,
    dividendYield: 5.80,

    businessDescription: 'Największy koncern multienergetyczny w Europie Środkowo-Wschodniej po integracji z PGNiG i Lotosem. Posiada sieć ponad 3100 stacji paliw, aktywa rafineryjne i dynamicznie rozwija segment OZE (morskie farmy Baltic Power) oraz petrochemię.',
    growthCatalysts: [
      'Uruchomienie pierwszej morskiej farmy wiatrowej Baltic Power (1,14 GW) w 2026 r.',
      'Monetyzacja synergii operacyjnych po fuzjach z Lotosem i PGNiG (szacunek >12 mld zł)',
      'Ekspansja stacji paliw w Niemczech, Austrii, Czechach i na Węgrzech'
    ],
    businessRisks: [
      'Wahania marż rafineryjnych i petrochemicznych na rynkach światowych',
      'Rządowe regulacje cen nośników energii i obciążenia podatkowe'
    ],
    financials: [
      { year: '2023', revenue: 372.6, netIncome: 20.7, eps: 17.8 },
      { year: '2024', revenue: 345.2, netIncome: 14.5, eps: 12.5 },
      { year: '2025 (P)', revenue: 375.0, netIncome: 18.2, eps: 15.6, isForecast: true },
      { year: '2026 (P)', revenue: 405.0, netIncome: 21.5, eps: 18.5, isForecast: true }
    ]
  },
  {
    id: 'pko',
    ticker: 'PKO',
    name: 'PKO BP',
    fullName: 'Powszechna Kasa Oszczędności Bank Polski S.A.',
    sector: 'Banki i Finanse',
    price: 124.50,
    change1D: 1.12,
    change1Y: 34.2,
    marketCap: 154.2,
    wig20Weight: 13.8,

    peTrailing: 8.8,
    peForward: 8.2,
    pbRatio: 1.62,
    pegRatio: 1.10,
    industryPeAvg: 8.4,

    targetPrice2Y: 148.00,
    expectedGrowth2Y: 18.9,
    epsCagr2Y: 8.0,
    consensusRating: 'Kupuj',
    analystsCount: 16,
    expectedDividends2Y: 18.50,

    revenueGrowthYoY: 12.4,
    revenueCagr3Y: 16.2,
    ebitdaGrowthYoY: 13.5,
    growthCategory: 'Stabilny wzrost (7-15%)',
    roe: 19.5,
    dividendYield: 7.40,

    businessDescription: 'Niekwestionowany lider polskiego sektora bankowego pod względem aktywów (>500 mld zł) i bazy depozytowej. Obsługuje ponad 12 mln klientów i jest pionierem bankowości cyfrowej i mobilnej IKO.',
    growthCatalysts: [
      'Definitywne wygasanie obciążeń rezerwami frankowymi (masowe ugody z klientami)',
      'Ożywienie akcji kredytowej dla przedsiębiorstw i hipotek po cięciach stóp',
      'Bardzo wysoka stopa wypłaty dywidendy sięgająca 75% rocznego zysku netto'
    ],
    businessRisks: [
      'Ewentualne obciążenia podatkowe sektora bankowego',
      'Tempo obniżek stóp NBP zawężające marżę odsetkową netto (NIM)'
    ],
    financials: [
      { year: '2023', revenue: 25.1, netIncome: 5.5, eps: 4.4 },
      { year: '2024', revenue: 31.2, netIncome: 8.9, eps: 7.12 },
      { year: '2025 (P)', revenue: 34.5, netIncome: 10.4, eps: 8.32, isForecast: true },
      { year: '2026 (P)', revenue: 38.0, netIncome: 12.1, eps: 9.68, isForecast: true }
    ]
  },
  {
    id: 'peo',
    ticker: 'PEO',
    name: 'Bank Pekao',
    fullName: 'Bank Polska Kasa Opieki S.A.',
    sector: 'Banki i Finanse',
    price: 280.00,
    change1D: -0.25,
    change1Y: 29.8,
    marketCap: 73.5,
    wig20Weight: 8.5,

    peTrailing: 8.4,
    peForward: 7.9,
    pbRatio: 1.55,
    pegRatio: 1.05,
    industryPeAvg: 8.4,

    targetPrice2Y: 335.00,
    expectedGrowth2Y: 19.6,
    epsCagr2Y: 8.0,
    consensusRating: 'Kupuj',
    analystsCount: 15,
    expectedDividends2Y: 48.00,

    revenueGrowthYoY: 11.2,
    revenueCagr3Y: 17.0,
    ebitdaGrowthYoY: 12.1,
    growthCategory: 'Stabilny wzrost (7-15%)',
    roe: 20.8,
    dividendYield: 8.60,

    businessDescription: 'Drugi największy bank uniwersalny w Polsce, lider bankowości korporacyjnej i finansowania inwestycji strukturalnych. Posiada jedną z najzdrowszych struktur bilansowych i znikomy portfel CHF.',
    growthCatalysts: [
      'Jedna z najwyższych stóp dywidendy wśród czołowych banków europejskich (~8,6%)',
      'Mocna pozycja w finansowaniu transformacji energetycznej i inwestycji KPO',
      'Bardzo silna baza kapitałowa pozwalająca na równoległą wypłatę zysków i rozwój akcji kredytowej'
    ],
    businessRisks: [
      'Spadek marży odsetkowej przy cyklu luzowania stóp procentowych',
      'Wpływ spowolnienia inwestycji w wybranych branżach'
    ],
    financials: [
      { year: '2023', revenue: 14.8, netIncome: 6.58, eps: 25.05 },
      { year: '2024', revenue: 17.8, netIncome: 7.20, eps: 27.40 },
      { year: '2025 (P)', revenue: 19.5, netIncome: 7.90, eps: 30.10, isForecast: true },
      { year: '2026 (P)', revenue: 21.2, netIncome: 8.70, eps: 33.15, isForecast: true }
    ]
  },
  {
    id: 'cdr',
    ticker: 'CDR',
    name: 'CD Projekt',
    fullName: 'CD Projekt S.A.',
    sector: 'Technologia i Gaming',
    price: 250.00,
    change1D: 0.65,
    change1Y: 54.0,
    marketCap: 24.8,
    wig20Weight: 4.5,

    peTrailing: 44.5,
    peForward: 28.0,
    pbRatio: 7.50,
    pegRatio: 1.45,
    industryPeAvg: 26.0,

    targetPrice2Y: 310.00,
    expectedGrowth2Y: 24.0,
    epsCagr2Y: 30.5,
    consensusRating: 'Akumuluj',
    analystsCount: 16,
    expectedDividends2Y: 4.50,

    revenueGrowthYoY: 18.5,
    revenueCagr3Y: 16.0,
    ebitdaGrowthYoY: 22.4,
    growthCategory: 'Cykliczny / Odbicie',
    roe: 21.5,
    dividendYield: 1.00,

    businessDescription: 'Światowej sławy polski twórca gier wideo, twórca uniwersum Wiedźmina i Cyberpunka 2077. Obecnie studio rozwija nową sagę wiedźmińską – Projekt Polaris (Wiedźmin 4) na silniku Unreal Engine 5 oraz sequel Cyberpunka (Orion) w studio w Bostonie.',
    growthCatalysts: [
      'Przejście projektu Polaris (Wiedźmin 4) do pełnej fazy produkcyjnej z ponad 400 deweloperami',
      'Ogromna poduszka gotówkowa (>1,4 mld zł) dająca pełną niezależność twórczą i finansową',
      'Ekspansja marek w projektach transmedialnych (filmy, seriale animowane, gry mobilne)'
    ],
    businessRisks: [
      'Horyzont premiery kolejnego dużego tytułu AAA (Polaris) i koszty R&D',
      'Ryzyko przesunięć premierowych typowe dla branży gamingowej'
    ],
    financials: [
      { year: '2023', revenue: 1.23, netIncome: 0.48, eps: 4.80 },
      { year: '2024', revenue: 1.35, netIncome: 0.52, eps: 5.20 },
      { year: '2025 (P)', revenue: 1.85, netIncome: 0.78, eps: 7.80, isForecast: true },
      { year: '2026 (P)', revenue: 2.80, netIncome: 1.45, eps: 14.50, isForecast: true }
    ]
  },
  {
    id: 'kgh',
    ticker: 'KGH',
    name: 'KGHM',
    fullName: 'KGHM Polska Miedź S.A.',
    sector: 'Surowce i Górnictwo',
    price: 325.00,
    change1D: 0.85,
    change1Y: 58.0,
    marketCap: 65.0,
    wig20Weight: 7.5,

    peTrailing: 14.5,
    peForward: 10.8,
    pbRatio: 1.35,
    pegRatio: 0.65,
    industryPeAvg: 13.0,

    targetPrice2Y: 410.00,
    expectedGrowth2Y: 26.2,
    epsCagr2Y: 22.0,
    consensusRating: 'Kupuj',
    analystsCount: 14,
    expectedDividends2Y: 18.00,

    revenueGrowthYoY: 16.5,
    revenueCagr3Y: 14.2,
    ebitdaGrowthYoY: 24.0,
    growthCategory: 'Cykliczny / Odbicie',
    roe: 12.5,
    dividendYield: 3.20,

    businessDescription: 'Jeden z czołowych producentów miedzi elektrolitycznej i srebra na świecie. Posiada kopalnie w Zagłębiu Miedziowym w Polsce oraz aktywa zagraniczne (Sierra Gorda w Chile, Robinson w USA).',
    growthCatalysts: [
      'Globalny deficyt miedzi i srebra napędzany transformacją energetyczną, elektromobilnością i centrami danych AI',
      'Wysokie ceny srebra generujące rekordowy cash-flow uboczny w hutach',
      'Optymalizacja produkcji w Sierra Gorda i perspektywa ulg w podatku miedziowym'
    ],
    businessRisks: [
      'Głębokie pokłady wydobycia w Polsce generujące koszty energii i pracy',
      'Wahania popytu w globalnym przemyśle hutniczym'
    ],
    financials: [
      { year: '2023', revenue: 33.5, netIncome: -1.0, eps: -5.0 },
      { year: '2024', revenue: 38.5, netIncome: 2.8, eps: 14.0 },
      { year: '2025 (P)', revenue: 45.0, netIncome: 4.5, eps: 22.5, isForecast: true },
      { year: '2026 (P)', revenue: 52.0, netIncome: 6.2, eps: 31.0, isForecast: true }
    ]
  },
  {
    id: 'lpp',
    ticker: 'LPP',
    name: 'LPP',
    fullName: 'LPP S.A.',
    sector: 'Handel i E-commerce',
    price: 24900.00,
    change1D: -0.32,
    change1Y: 38.0,
    marketCap: 46.2,
    wig20Weight: 7.2,

    peTrailing: 17.5,
    peForward: 13.8,
    pbRatio: 5.20,
    pegRatio: 0.95,
    industryPeAvg: 16.0,

    targetPrice2Y: 32000.00,
    expectedGrowth2Y: 28.5,
    epsCagr2Y: 18.5,
    consensusRating: 'Kupuj',
    analystsCount: 14,
    expectedDividends2Y: 2150.00,

    revenueGrowthYoY: 19.5,
    revenueCagr3Y: 21.0,
    ebitdaGrowthYoY: 22.0,
    growthCategory: 'Wysoki wzrost (>15%)',
    roe: 35.0,
    dividendYield: 4.30,

    businessDescription: 'Polska globalna firma odzieżowa zarządzająca markami Reserved, Sinsay, Cropp, House i Mohito. Posiada ponad 2400 salonów w kilkudziesięciu krajach i dynamicznie rozbudowuje e-commerce.',
    growthCatalysts: [
      'Gwałtowna ekspansja formatu Sinsay w Europie Południowej i CEE (setki nowych salonów)',
      'Odzyskanie pełnego zaufania inwestorów instytucjonalnych po weryfikacji łańcucha dostaw',
      'Bardzo wysoki zwrot na kapitale własnym (ROE > 30%) oraz wzrost dywidendy'
    ],
    businessRisks: [
      'Ryzyko kursowe (koszt zakupu kolekcji w USD vs sprzedaż w PLN/EUR)',
      'Zmienne warunki pogodowe wpływające na marżę sezonową'
    ],
    financials: [
      { year: '2023', revenue: 17.4, netIncome: 1.61, eps: 870.0 },
      { year: '2024', revenue: 21.5, netIncome: 2.35, eps: 1270.0 },
      { year: '2025 (P)', revenue: 26.2, netIncome: 2.95, eps: 1595.0, isForecast: true },
      { year: '2026 (P)', revenue: 31.5, netIncome: 3.65, eps: 1973.0, isForecast: true }
    ]
  },
  {
    id: 'pzu',
    ticker: 'PZU',
    name: 'PZU',
    fullName: 'Powszechny Zakład Ubezpieczeń S.A.',
    sector: 'Banki i Finanse',
    price: 72.20,
    change1D: 0.75,
    change1Y: 31.5,
    marketCap: 62.3,
    wig20Weight: 7.8,

    peTrailing: 9.2,
    peForward: 8.5,
    pbRatio: 2.45,
    pegRatio: 1.15,
    industryPeAvg: 8.4,

    targetPrice2Y: 88.00,
    expectedGrowth2Y: 21.9,
    epsCagr2Y: 8.0,
    consensusRating: 'Kupuj',
    analystsCount: 13,
    expectedDividends2Y: 12.20,

    revenueGrowthYoY: 10.2,
    revenueCagr3Y: 12.0,
    ebitdaGrowthYoY: 9.8,
    growthCategory: 'Stabilny wzrost (7-15%)',
    roe: 23.5,
    dividendYield: 7.10,

    businessDescription: 'Największa instytucja finansowo-ubezpieczeniowa w Europie Środkowo-Wschodniej. Kontroluje pakiety akcji w Banku Pekao i Alior Banku oraz rozwija własny segment medyczny PZU Zdrowie.',
    growthCatalysts: [
      'Wysoka rentowność w segmencie majątkowym i polis komunikacyjnych (indeksacja stawek)',
      'Dynamiczny rozwój przychodów sieci PZU Zdrowie (>2 mld zł rocznie)',
      'Niezawodna wysoka stopa dywidendy (>7% rocznie)'
    ],
    businessRisks: [
      'Zdarzenia katastroficzne (np. powodzie, gradobicia w rolnictwie)',
      'Cykl rynkowy wycen portfela obligacji skarbowych'
    ],
    financials: [
      { year: '2023', revenue: 27.2, netIncome: 5.7, eps: 6.6 },
      { year: '2024', revenue: 31.5, netIncome: 6.2, eps: 7.18 },
      { year: '2025 (P)', revenue: 34.8, netIncome: 6.9, eps: 7.99, isForecast: true },
      { year: '2026 (P)', revenue: 38.2, netIncome: 7.6, eps: 8.80, isForecast: true }
    ]
  },
  {
    id: 'ale',
    ticker: 'ALE',
    name: 'Allegro',
    fullName: 'Allegro.eu S.A.',
    sector: 'Handel i E-commerce',
    price: 50.20,
    change1D: 1.20,
    change1Y: 42.0,
    marketCap: 51.8,
    wig20Weight: 6.2,

    peTrailing: 24.5,
    peForward: 16.5,
    pbRatio: 3.85,
    pegRatio: 0.90,
    industryPeAvg: 22.0,

    targetPrice2Y: 68.00,
    expectedGrowth2Y: 35.5,
    epsCagr2Y: 27.0,
    consensusRating: 'Kupuj',
    analystsCount: 16,
    expectedDividends2Y: 0.00,

    revenueGrowthYoY: 15.5,
    revenueCagr3Y: 18.0,
    ebitdaGrowthYoY: 26.0,
    growthCategory: 'Wysoki wzrost (>15%)',
    roe: 16.5,
    dividendYield: 0.00,

    businessDescription: 'Dominująca platforma handlu internetowego w Polsce, odwiedzana przez ponad 22 mln użytkowników miesięcznie. Skutecznie rozwija ekosystem SMART!, automaty paczkowe One Box, usługi finansowe Allegro Pay oraz ekspansję zagraniczną.',
    growthCatalysts: [
      'Gwałtowny wzrost segmentu reklamy cyfrowej (Allegro Ads z marżą >85%)',
      'Monetyzacja i optymalizacja operacji w Czechach, na Słowacji i Węgrzech',
      'Skalowanie Allegro Pay i własnej sieci logistycznej zmniejszającej koszty'
    ],
    businessRisks: [
      'Agresywna konkurencja ze strony azjatyckich platform (Temu, Shein) w tanich kategoriach',
      'Koszty zadłużenia i inwestycji technologicznych'
    ],
    financials: [
      { year: '2023', revenue: 10.2, netIncome: 1.05, eps: 1.02 },
      { year: '2024', revenue: 12.4, netIncome: 1.85, eps: 1.79 },
      { year: '2025 (P)', revenue: 14.8, netIncome: 2.45, eps: 2.38, isForecast: true },
      { year: '2026 (P)', revenue: 17.5, netIncome: 3.20, eps: 3.10, isForecast: true }
    ]
  },
  {
    id: 'alr',
    ticker: 'ALR',
    name: 'Alior Bank',
    fullName: 'Alior Bank S.A.',
    sector: 'Banki i Finanse',
    price: 138.00,
    change1D: 0.62,
    change1Y: 52.0,
    marketCap: 18.0,
    wig20Weight: 3.2,

    peTrailing: 6.8,
    peForward: 6.2,
    pbRatio: 1.45,
    pegRatio: 0.85,
    industryPeAvg: 8.4,

    targetPrice2Y: 172.00,
    expectedGrowth2Y: 24.6,
    epsCagr2Y: 8.0,
    consensusRating: 'Kupuj',
    analystsCount: 12,
    expectedDividends2Y: 22.00,

    revenueGrowthYoY: 11.5,
    revenueCagr3Y: 24.0,
    ebitdaGrowthYoY: 10.8,
    growthCategory: 'Stabilny wzrost (7-15%)',
    roe: 23.5,
    dividendYield: 7.90,

    businessDescription: 'Jeden z najbardziej rentownych banków w Polsce o najwyższej marży odsetkowej netto (NIM >5,5%). Lider pożyczek gotówkowych dla ludności i małych firm oraz partner strategiczny PZU.',
    growthCatalysts: [
      'Bardzo niski wskaźnik C/Z w całym sektorze bankowym WIG20 (6.8x)',
      'Wysokie wypłaty dywidend (stopa ~7,9%)',
      'Skuteczna cyfryzacja i automatyzacja procesów kredytowych (Alior Mobile)'
    ],
    businessRisks: [
      'Wrażliwość klientów consumer finance na ewentualne pogorszenie rynku pracy',
      'Obniżki stóp procentowych wpływające na marżę'
    ],
    financials: [
      { year: '2023', revenue: 5.5, netIncome: 2.03, eps: 15.5 },
      { year: '2024', revenue: 6.5, netIncome: 2.35, eps: 17.95 },
      { year: '2025 (P)', revenue: 7.1, netIncome: 2.55, eps: 19.48, isForecast: true },
      { year: '2026 (P)', revenue: 7.8, netIncome: 2.80, eps: 21.39, isForecast: true }
    ]
  },
  {
    id: 'mbk',
    ticker: 'MBK',
    name: 'mBank',
    fullName: 'mBank S.A.',
    sector: 'Banki i Finanse',
    price: 1480.00,
    change1D: 1.15,
    change1Y: 62.0,
    marketCap: 62.8,
    wig20Weight: 6.5,

    peTrailing: 9.5,
    peForward: 7.6,
    pbRatio: 1.65,
    pegRatio: 0.60,
    industryPeAvg: 8.4,

    targetPrice2Y: 1820.00,
    expectedGrowth2Y: 23.0,
    epsCagr2Y: 16.0,
    consensusRating: 'Kupuj',
    analystsCount: 14,
    expectedDividends2Y: 98.00,

    revenueGrowthYoY: 14.5,
    revenueCagr3Y: 18.0,
    ebitdaGrowthYoY: 26.0,
    growthCategory: 'Wysoki wzrost (>15%)',
    roe: 18.5,
    dividendYield: 3.80,

    businessDescription: 'Ikona nowoczesnej bankowości cyfrowej i mobilnej w Polsce. Obsługuje dynamicznych klientów detalicznych i zamożne przedsiębiorstwa. Po minięciu szczytu rezerw frankowych powraca do generowania potężnych zysków.',
    growthCatalysts: [
      'Gwałtowny spadek tworzenia nowych rezerw na kredyty CHF (drastyczny wzrost zysku netto)',
      'Bardzo niski wskaźnik PEG (0.60) wskazujący na dyskonto względem tempa wzrostu',
      'Wznowienie regularnych wypłat dywidend po latach przymusowej pauzy'
    ],
    businessRisks: [
      'Końcowe rozstrzygnięcia pozwów frankowych',
      'Skutki ewentualnych obniżek stóp procentowych w Polsce'
    ],
    financials: [
      { year: '2023', revenue: 10.6, netIncome: 0.02, eps: 0.50 },
      { year: '2024', revenue: 13.2, netIncome: 3.10, eps: 73.1 },
      { year: '2025 (P)', revenue: 15.0, netIncome: 4.20, eps: 99.0, isForecast: true },
      { year: '2026 (P)', revenue: 17.2, netIncome: 5.10, eps: 120.2, isForecast: true }
    ]
  },
  {
    id: 'dnp',
    ticker: 'DNP',
    name: 'Dino Polska',
    fullName: 'Dino Polska S.A.',
    sector: 'Handel i E-commerce',
    price: 34.60,
    change1D: -0.85,
    change1Y: 4.8,
    marketCap: 33.9,
    wig20Weight: 6.8,

    peTrailing: 22.9,
    peForward: 18.2,
    pbRatio: 5.10,
    pegRatio: 1.10,
    industryPeAvg: 16.5,

    targetPrice2Y: 46.00,
    expectedGrowth2Y: 32.9,
    epsCagr2Y: 20.5,
    consensusRating: 'Kupuj',
    analystsCount: 15,
    expectedDividends2Y: 0.00,

    revenueGrowthYoY: 18.8,
    revenueCagr3Y: 24.5,
    ebitdaGrowthYoY: 17.2,
    growthCategory: 'Wysoki wzrost (>15%)',
    roe: 25.0,
    dividendYield: 0.00,

    businessDescription: 'Najszybciej rozwijająca się sieć supermarketów proximity w Polsce. Posiada ponad 2600 sklepów, własne centra dystrybucyjne oraz zakład mięsny Agro-Rydzyna. Całość zysków inwestuje w organiczną ekspansję (po splicie akcji 10:1).',
    growthCatalysts: [
      'Planowane tempo otwarć 250-300 nowych sklepów rocznie w całej Polsce',
      'Unikalny model standardu własności gruntów i budynków gwarantujący niskie koszty operacyjne',
      'Poprawa siły nabywczej konsumentów dzięki realnemu wzrostowi wynagrodzeń'
    ],
    businessRisks: [
      'Wojna cenowa na rynku dyskontów spożywczych (Biedronka vs Lidl vs Dino)',
      'Presja płacowa pracowników i koszty energii'
    ],
    financials: [
      { year: '2023', revenue: 25.7, netIncome: 1.41, eps: 1.44 },
      { year: '2024', revenue: 30.5, netIncome: 1.72, eps: 1.75 },
      { year: '2025 (P)', revenue: 36.5, netIncome: 2.15, eps: 2.19, isForecast: true },
      { year: '2026 (P)', revenue: 43.5, netIncome: 2.68, eps: 2.73, isForecast: true }
    ]
  },
  {
    id: 'kty',
    ticker: 'KTY',
    name: 'Grupa Kęty',
    fullName: 'Grupa Kęty S.A.',
    sector: 'Przemysł i Budownictwo',
    price: 1275.00,
    change1D: 0.39,
    change1Y: 22.0,
    marketCap: 12.3,
    wig20Weight: 2.8,

    peTrailing: 14.8,
    peForward: 12.5,
    pbRatio: 3.45,
    pegRatio: 1.20,
    industryPeAvg: 13.5,

    targetPrice2Y: 1520.00,
    expectedGrowth2Y: 19.2,
    epsCagr2Y: 10.2,
    consensusRating: 'Kupuj',
    analystsCount: 10,
    expectedDividends2Y: 185.00,

    revenueGrowthYoY: 8.5,
    revenueCagr3Y: 11.5,
    ebitdaGrowthYoY: 9.8,
    growthCategory: 'Stabilny wzrost (7-15%)',
    roe: 26.5,
    dividendYield: 7.20,

    businessDescription: 'Lider polskiego przetwórstwa aluminium, zaawansowanych systemów architektonicznych oraz opakowań giętkich. Eksportuje wyroby do kilkudziesięciu krajów świata. Wzorzec dyscypliny operacyjnej i polityki dywidendowej.',
    growthCatalysts: [
      'Ożywienie w europejskim budownictwie kubaturowym i renowacjach termoizolacyjnych',
      'Coroczne podnoszenie dywidendy ze średnią stopą powyżej 7%',
      'Inwestycje w niskoemisyjny recykling aluminium obniżający koszty'
    ],
    businessRisks: [
      'Wahania cen wlewków aluminiowych na giełdzie LME',
      'Popyt w zachodnioeuropejskim przemyśle wytwórczym'
    ],
    financials: [
      { year: '2023', revenue: 5.2, netIncome: 0.55, eps: 57.0 },
      { year: '2024', revenue: 5.8, netIncome: 0.62, eps: 64.2 },
      { year: '2025 (P)', revenue: 6.4, netIncome: 0.71, eps: 73.5, isForecast: true },
      { year: '2026 (P)', revenue: 7.2, netIncome: 0.82, eps: 85.0, isForecast: true }
    ]
  },
  {
    id: 'spl',
    ticker: 'SPL',
    name: 'Santander BP',
    fullName: 'Santander Bank Polska S.A.',
    sector: 'Banki i Finanse',
    price: 796.00,
    change1D: -0.25,
    change1Y: 36.0,
    marketCap: 81.2,
    wig20Weight: 7.9,

    peTrailing: 9.5,
    peForward: 8.9,
    pbRatio: 1.68,
    pegRatio: 1.15,
    industryPeAvg: 8.4,

    targetPrice2Y: 940.00,
    expectedGrowth2Y: 18.1,
    epsCagr2Y: 8.5,
    consensusRating: 'Akumuluj',
    analystsCount: 12,
    expectedDividends2Y: 115.00,

    revenueGrowthYoY: 11.0,
    revenueCagr3Y: 17.5,
    ebitdaGrowthYoY: 11.5,
    growthCategory: 'Stabilny wzrost (7-15%)',
    roe: 20.2,
    dividendYield: 7.10,

    businessDescription: 'Trzeci największy bank w Polsce, część hiszpańskiej Grupy Santander. Charakteryzuje się wiodącą efektywnością kosztową w sektorze (wskaźnik C/I < 32%) oraz zaawansowanymi usługami bankowości przedsiębiorstw.',
    growthCatalysts: [
      'Wysoka jakość aktywów kredytowych i konserwatywna polityka ryzyka',
      'Solidne wypłaty dywidend (stopa >7%) i wysoki współczynnik wypłacalności',
      'Wzrost dochodów z prowizji od funduszy inwestycyjnych i bankowości prywatnej'
    ],
    businessRisks: [
      'Koszty rozstrzygnięć sporów frankowych',
      'Wpływ obniżek stóp na przychody odsetkowe'
    ],
    financials: [
      { year: '2023', revenue: 15.6, netIncome: 4.85, eps: 47.45 },
      { year: '2024', revenue: 18.2, netIncome: 6.80, eps: 66.50 },
      { year: '2025 (P)', revenue: 19.8, netIncome: 7.45, eps: 72.85, isForecast: true },
      { year: '2026 (P)', revenue: 21.5, netIncome: 8.20, eps: 80.20, isForecast: true }
    ]
  },
  {
    id: 'kru',
    ticker: 'KRU',
    name: 'Kruk',
    fullName: 'Kruk S.A.',
    sector: 'Banki i Finanse',
    price: 378.00,
    change1D: -0.11,
    change1Y: 28.0,
    marketCap: 7.3,
    wig20Weight: 2.2,

    peTrailing: 8.2,
    peForward: 6.8,
    pbRatio: 1.85,
    pegRatio: 0.58,
    industryPeAvg: 9.5,

    targetPrice2Y: 510.00,
    expectedGrowth2Y: 34.9,
    epsCagr2Y: 14.5,
    consensusRating: 'Kupuj',
    analystsCount: 11,
    expectedDividends2Y: 42.00,

    revenueGrowthYoY: 16.5,
    revenueCagr3Y: 18.5,
    ebitdaGrowthYoY: 19.0,
    growthCategory: 'Wysoki wzrost (>15%)',
    roe: 24.5,
    dividendYield: 5.20,

    businessDescription: 'Międzynarodowy czempion zarządzania wierzytelnościami. Poza dominacją w Polsce z sukcesem podbija rynki Włoch, Hiszpanii i Niemiec. Stosuje strategię polubownych spłat ratalnych i zaawansowaną analitykę danych.',
    growthCatalysts: [
      'Rekordowo niski wskaźnik PEG (0.58) łączący niskie C/Z z 15% tempem wzrostu zysków',
      'Skalowanie zakupów portfeli NPL w Europie Zachodniej po wysokich stopach zwrotu',
      'Unikalny model operacyjny oparty na cyfrowym podpisywaniu ugód online'
    ],
    businessRisks: [
      'Zaostrzenie konkurencji cenowej przy przetargach na pakiety wierzytelności',
      'Wzrost kosztu długu obligacyjnego'
    ],
    financials: [
      { year: '2023', revenue: 2.59, netIncome: 1.01, eps: 52.3 },
      { year: '2024', revenue: 3.15, netIncome: 1.25, eps: 64.7 },
      { year: '2025 (P)', revenue: 3.80, netIncome: 1.50, eps: 77.6, isForecast: true },
      { year: '2026 (P)', revenue: 4.55, netIncome: 1.82, eps: 94.2, isForecast: true }
    ]
  },
  {
    id: 'bdx',
    ticker: 'BDX',
    name: 'Budimex',
    fullName: 'Budimex S.A.',
    sector: 'Przemysł i Budownictwo',
    price: 745.00,
    change1D: -0.45,
    change1Y: 32.0,
    marketCap: 19.0,
    wig20Weight: 3.4,

    peTrailing: 21.0,
    peForward: 17.5,
    pbRatio: 8.80,
    pegRatio: 1.50,
    industryPeAvg: 14.0,

    targetPrice2Y: 890.00,
    expectedGrowth2Y: 19.5,
    epsCagr2Y: 11.5,
    consensusRating: 'Trzymaj',
    analystsCount: 11,
    expectedDividends2Y: 88.00,

    revenueGrowthYoY: 9.5,
    revenueCagr3Y: 12.0,
    ebitdaGrowthYoY: 11.2,
    growthCategory: 'Stabilny wzrost (7-15%)',
    roe: 45.0,
    dividendYield: 5.60,

    businessDescription: 'Największa grupa budowlana w Polsce z ponad 50-letnią historią. Specjalizuje się w wielkich kontraktach drogowych, kolejowych, kubaturowych oraz OZE. Skutecznie wchodzi na rynki Czech, Słowacji i Łotwy.',
    growthCatalysts: [
      'Rekordowy portfel zamówień (backlog >15 mld zł) gwarantujący przychody na kolejne lata',
      'Napływ środków z KPO i funduszy spójności na infrastrukturę kolejową i energetyczną',
      'Arystokrata dywidendowy z GPW wypłacający blisko 100% zysku'
    ],
    businessRisks: [
      'Wzrost cen materiałów budowlanych i energii przy kontraktach o stałej cenie',
      'Wysoka wycena C/WK (8.8x) wymagająca utrzymania bezbłędnej rentowności'
    ],
    financials: [
      { year: '2023', revenue: 9.8, netIncome: 0.74, eps: 29.0 },
      { year: '2024', revenue: 10.9, netIncome: 0.91, eps: 35.6 },
      { year: '2025 (P)', revenue: 12.2, netIncome: 1.05, eps: 41.1, isForecast: true },
      { year: '2026 (P)', revenue: 13.8, netIncome: 1.20, eps: 47.0, isForecast: true }
    ]
  },
  {
    id: 'pge',
    ticker: 'PGE',
    name: 'PGE',
    fullName: 'PGE Polska Grupa Energetyczna S.A.',
    sector: 'Paliwa i Energetyka',
    price: 14.85,
    change1D: 4.27,
    change1Y: 48.0,
    marketCap: 33.2,
    wig20Weight: 3.5,

    peTrailing: 8.2,
    peForward: 7.1,
    pbRatio: 0.48,
    pegRatio: 0.70,
    industryPeAvg: 8.5,

    targetPrice2Y: 20.50,
    expectedGrowth2Y: 38.0,
    epsCagr2Y: 13.5,
    consensusRating: 'Kupuj',
    analystsCount: 12,
    expectedDividends2Y: 0.00,

    revenueGrowthYoY: 6.8,
    revenueCagr3Y: 9.5,
    ebitdaGrowthYoY: 14.0,
    growthCategory: 'Cykliczny / Odbicie',
    roe: 6.5,
    dividendYield: 0.00,

    businessDescription: 'Największy wytwórca i dystrybutor energii elektrycznej w Polsce. Odpowiada za dostarczanie prądu do ponad 5,5 mln odbiorców. Realizuje gigantyczne inwestycje w morskie farmy wiatrowe Baltica.',
    growthCatalysts: [
      'Głębokie niedowartościowanie majątkowe ze wskaźnikiem C/WK na poziomie zaledwie 0.48x',
      'Proces transformacji i wydzielenia elektrowni węglowych zdejmujący ciężar CO2',
      'Miliardy złotych dotacji unijnych na modernizację sieci dystrybucyjnych'
    ],
    businessRisks: [
      'Koszty uprawnień do emisji CO2 obciążające generację konwencjonalną',
      'Brak dywidend przez najbliższe lata z uwagi na gigantyczny program CAPEX'
    ],
    financials: [
      { year: '2023', revenue: 95.8, netIncome: -5.0, eps: -2.2 },
      { year: '2024', revenue: 96.0, netIncome: 3.8, eps: 1.70 },
      { year: '2025 (P)', revenue: 104.0, netIncome: 4.5, eps: 2.01, isForecast: true },
      { year: '2026 (P)', revenue: 112.0, netIncome: 5.4, eps: 2.41, isForecast: true }
    ]
  },
  {
    id: 'opl',
    ticker: 'OPL',
    name: 'Orange Polska',
    fullName: 'Orange Polska S.A.',
    sector: 'Telekomunikacja i Media',
    price: 13.10,
    change1D: 0.19,
    change1Y: 26.0,
    marketCap: 17.2,
    wig20Weight: 2.5,

    peTrailing: 12.5,
    peForward: 11.0,
    pbRatio: 1.35,
    pegRatio: 1.25,
    industryPeAvg: 11.2,

    targetPrice2Y: 15.80,
    expectedGrowth2Y: 20.6,
    epsCagr2Y: 9.2,
    consensusRating: 'Akumuluj',
    analystsCount: 11,
    expectedDividends2Y: 1.75,

    revenueGrowthYoY: 5.5,
    revenueCagr3Y: 5.0,
    ebitdaGrowthYoY: 6.2,
    growthCategory: 'Umiarkowany (2-7%)',
    roe: 11.2,
    dividendYield: 5.80,

    businessDescription: 'Główny operator telekomunikacyjny w Polsce z najszerszą siecią światłowodową docierającą do ponad 8,5 mln gospodarstw domowych. Lider usług konwergentnych (Orange Love) i rozwiązań B2B.',
    growthCatalysts: [
      'Wzrost średniego przychodu na klienta (ARPU) dzięki klauzulom inflacyjnym',
      'Monetyzacja infrastruktury światłowodowej i masztowej (spółka Światłowód Inwestycje)',
      'Wzrost dywidendy bazowej o 10-15% rocznie'
    ],
    businessRisks: [
      'Intensywna konkurencja cenowa na polskim rynku telekomunikacyjnym',
      'Koszty rozbudowy i utrzymania nowej sieci 5G'
    ],
    financials: [
      { year: '2023', revenue: 12.9, netIncome: 0.82, eps: 0.63 },
      { year: '2024', revenue: 13.8, netIncome: 1.05, eps: 0.80 },
      { year: '2025 (P)', revenue: 14.6, netIncome: 1.18, eps: 0.90, isForecast: true },
      { year: '2026 (P)', revenue: 15.5, netIncome: 1.32, eps: 1.01, isForecast: true }
    ]
  },
  {
    id: 'pco',
    ticker: 'PCO',
    name: 'Pepco Group',
    fullName: 'Pepco Group N.V.',
    sector: 'Handel i E-commerce',
    price: 44.50,
    change1D: 1.87,
    change1Y: 73.0,
    marketCap: 25.6,
    wig20Weight: 3.1,

    peTrailing: 16.5,
    peForward: 12.8,
    pbRatio: 2.35,
    pegRatio: 0.78,
    industryPeAvg: 16.5,

    targetPrice2Y: 62.00,
    expectedGrowth2Y: 39.3,
    epsCagr2Y: 18.5,
    consensusRating: 'Kupuj',
    analystsCount: 12,
    expectedDividends2Y: 0.00,

    revenueGrowthYoY: 14.2,
    revenueCagr3Y: 18.0,
    ebitdaGrowthYoY: 21.0,
    growthCategory: 'Cykliczny / Odbicie',
    roe: 15.5,
    dividendYield: 0.00,

    businessDescription: 'Ogólnoeuropejska sieć dyskontowych sklepów wielobranżowych (Pepco, Dealz, Poundland). Posiada niemal 5000 sklepów w 21 krajach, oferując odzież i artykuły dla domu w niskich cenach.',
    growthCatalysts: [
      'Nowa strategia: rezygnacja z nierentownych rynków i skupienie na marżach w Europie Środkowej',
      'Dynamiczna poprawa zysków i wskaźnik PEG na atrakcyjnym poziomie 0.78',
      'Stabilizacja sytuacji właścicielskiej po turbulencjach holdingu Steinhoff'
    ],
    businessRisks: [
      'Presja kosztowa w łańcuchach logistycznych (frach morski)',
      'Ostra konkurencja ze strony dyskontów niespożywczych (Action, KiK, Tedi)'
    ],
    financials: [
      { year: '2023', revenue: 26.5, netIncome: 0.45, eps: 0.78 },
      { year: '2024', revenue: 31.0, netIncome: 1.35, eps: 2.34 },
      { year: '2025 (P)', revenue: 35.5, netIncome: 1.75, eps: 3.04, isForecast: true },
      { year: '2026 (P)', revenue: 41.0, netIncome: 2.25, eps: 3.91, isForecast: true }
    ]
  },
  {
    id: 'jsw',
    ticker: 'JSW',
    name: 'JSW',
    fullName: 'Jastrzębska Spółka Węglowa S.A.',
    sector: 'Surowce i Górnictwo',
    price: 32.00,
    change1D: 1.14,
    change1Y: 8.5,
    marketCap: 3.8,
    wig20Weight: 0.8,

    peTrailing: 7.8,
    peForward: 5.8,
    pbRatio: 0.35,
    pegRatio: 0.65,
    industryPeAvg: 8.0,

    targetPrice2Y: 46.00,
    expectedGrowth2Y: 43.8,
    epsCagr2Y: 15.0,
    consensusRating: 'Akumuluj',
    analystsCount: 9,
    expectedDividends2Y: 0.00,

    revenueGrowthYoY: 4.5,
    revenueCagr3Y: -2.0,
    ebitdaGrowthYoY: 11.0,
    growthCategory: 'Cykliczny / Odbicie',
    roe: 4.8,
    dividendYield: 0.00,

    businessDescription: 'Największy producent wysokiej jakości węgla koksowego (metalurgicznego) w Unii Europejskiej. Węgiel koksowy znajduje się na liście surowców krytycznych UE jako niezbędny składnik produkcji stali pierwotnej.',
    growthCatalysts: [
      'Głębokie niedowartościowanie majątkowe – wskaźnik C/WK wynosi zaledwie 0.35x',
      'Poduszka płynnościowa w Funduszu Stabilizacyjnym (FIZ) chroniąca spółkę w dołku cyklu',
      'Potencjalny silny skok cen węgla koksowego przy ożywieniu światowego hutnictwa stali'
    ],
    businessRisks: [
      'Wysoka baza kosztów stałych i presja płacowa związków zawodowych',
      'Zmienność globalnych cen węgla metalurgicznego i koksu'
    ],
    financials: [
      { year: '2023', revenue: 15.3, netIncome: 0.99, eps: 8.4 },
      { year: '2024', revenue: 13.5, netIncome: 0.45, eps: 3.85 },
      { year: '2025 (P)', revenue: 15.2, netIncome: 0.75, eps: 6.40, isForecast: true },
      { year: '2026 (P)', revenue: 17.5, netIncome: 1.10, eps: 9.38, isForecast: true }
    ]
  },
  {
    id: 'cps',
    ticker: 'CPS',
    name: 'Cyfrowy Polsat',
    fullName: 'Cyfrowy Polsat S.A.',
    sector: 'Telekomunikacja i Media',
    price: 16.40,
    change1D: -0.45,
    change1Y: 18.5,
    marketCap: 10.5,
    wig20Weight: 1.5,

    peTrailing: 17.2,
    peForward: 12.0,
    pbRatio: 0.72,
    pegRatio: 0.90,
    industryPeAvg: 11.2,

    targetPrice2Y: 22.00,
    expectedGrowth2Y: 34.1,
    epsCagr2Y: 16.5,
    consensusRating: 'Akumuluj',
    analystsCount: 8,
    expectedDividends2Y: 0.00,

    revenueGrowthYoY: 7.2,
    revenueCagr3Y: 6.5,
    ebitdaGrowthYoY: 10.5,
    growthCategory: 'Stabilny wzrost (7-15%)',
    roe: 4.5,
    dividendYield: 0.00,

    businessDescription: 'Grupa medialno-telekomunikacyjna Zygmunta Solorza (sieć Plus, Telewizja Polsat, Polsat Box) przechodząca transformację w kierunku czystej energii (farmy wiatrowe, słoneczne i zielony wodór).',
    growthCatalysts: [
      'Uruchomienie wielkich farm wiatrowych generujących tanią zieloną energię dla grupy i klientów B2B',
      'Niska wycena majątkowa ze wskaźnikiem C/WK na poziomie 0.72x',
      'Synergie sprzedaży pakietowej: media, telekomunikacja i zielona energia dla firm'
    ],
    businessRisks: [
      'Wysoki poziom długu netto w relacji do EBITDA wymagający dyscypliny finansowej',
      'Spory sukcesyjne wokół aktywów założyciela grupy'
    ],
    financials: [
      { year: '2023', revenue: 13.6, netIncome: 0.31, eps: 0.48 },
      { year: '2024', revenue: 14.8, netIncome: 0.58, eps: 0.91 },
      { year: '2025 (P)', revenue: 16.2, netIncome: 0.85, eps: 1.33, isForecast: true },
      { year: '2026 (P)', revenue: 17.8, netIncome: 1.15, eps: 1.80, isForecast: true }
    ]
  }
];

export const SECTORS: SectorType[] = [
  'Banki i Finanse',
  'Paliwa i Energetyka',
  'Handel i E-commerce',
  'Surowce i Górnictwo',
  'Technologia i Gaming',
  'Przemysł i Budownictwo',
  'Telekomunikacja i Media'
];

export const WIG20_STATS = {
  indexLevel: 4165.80,
  indexChange1D: 0.52,
  indexChange1Y: 28.4,
  totalMarketCap: 940.5, // mld PLN
  averagePeTrailing: 13.5,
  averagePeForward: 10.8,
  averageExpectedGrowth2Y: 26.4, // %
  averageRevenueGrowth: 11.8, // %
  averageDividendYield: 4.65, // %
};
