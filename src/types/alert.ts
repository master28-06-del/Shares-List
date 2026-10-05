export type AlertCondition = 'above_or_equal' | 'below_or_equal';

export interface PriceAlert {
  id: string;
  ticker: string;
  stockName: string;
  targetPrice: number;
  condition: AlertCondition;
  createdAt: string;
  isTriggered: boolean;
  triggeredAt?: string;
  triggeredPrice?: number;
  isDismissed?: boolean;
}
