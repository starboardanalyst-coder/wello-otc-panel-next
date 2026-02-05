export interface Quote {
  id: string
  price: number
  volume: number // in USDT
  trader: string
  paymentMethods: string[]
  minOrder: number
  maxOrder: number
  completionRate: number
  responseTime: string
}

export interface PricePoint {
  time: number
  open: number
  high: number
  low: number
  close: number
}

// Mock sell orders (Asks) - people selling USDT for USD
// Multiple traders at same price levels to demo drill-down
export const mockSellQuotes: Quote[] = [
  // Price level: 1.025
  {
    id: 'sell-1',
    price: 1.025,
    volume: 50000,
    trader: 'CryptoWhale',
    paymentMethods: ['Bank Transfer', 'Wise'],
    minOrder: 1000,
    maxOrder: 50000,
    completionRate: 98.5,
    responseTime: '< 5 min'
  },
  {
    id: 'sell-1b',
    price: 1.025,
    volume: 80000,
    trader: 'SwiftDeals',
    paymentMethods: ['SWIFT', 'Bank Transfer'],
    minOrder: 10000,
    maxOrder: 80000,
    completionRate: 99.1,
    responseTime: '< 15 min'
  },
  // Price level: 1.018
  {
    id: 'sell-2',
    price: 1.018,
    volume: 200000,
    trader: 'TradeMaster',
    paymentMethods: ['Bank Transfer', 'SEPA'],
    minOrder: 5000,
    maxOrder: 200000,
    completionRate: 99.2,
    responseTime: '< 15 min'
  },
  {
    id: 'sell-2b',
    price: 1.018,
    volume: 150000,
    trader: 'EuroDesk',
    paymentMethods: ['SEPA', 'Wise', 'Revolut'],
    minOrder: 2000,
    maxOrder: 150000,
    completionRate: 97.8,
    responseTime: '< 10 min'
  },
  {
    id: 'sell-2c',
    price: 1.018,
    volume: 45000,
    trader: 'QuickFlip',
    paymentMethods: ['Revolut', 'PayPal'],
    minOrder: 500,
    maxOrder: 45000,
    completionRate: 95.5,
    responseTime: '< 5 min'
  },
  // Price level: 1.012
  {
    id: 'sell-3',
    price: 1.012,
    volume: 75000,
    trader: 'QuickExchange',
    paymentMethods: ['Bank Transfer'],
    minOrder: 2000,
    maxOrder: 75000,
    completionRate: 97.8,
    responseTime: '< 10 min'
  },
  // Price level: 1.008
  {
    id: 'sell-4',
    price: 1.008,
    volume: 500000,
    trader: 'InstitutionalDesk',
    paymentMethods: ['Wire Transfer', 'SWIFT'],
    minOrder: 50000,
    maxOrder: 500000,
    completionRate: 99.9,
    responseTime: '< 30 min'
  },
  {
    id: 'sell-4b',
    price: 1.008,
    volume: 300000,
    trader: 'PrimeBroker',
    paymentMethods: ['Wire Transfer', 'SWIFT', 'Bank Transfer'],
    minOrder: 25000,
    maxOrder: 300000,
    completionRate: 100,
    responseTime: '< 1 hour'
  },
  // Price level: 1.005
  {
    id: 'sell-5',
    price: 1.005,
    volume: 120000,
    trader: 'FastTrader',
    paymentMethods: ['Bank Transfer', 'Revolut'],
    minOrder: 1000,
    maxOrder: 120000,
    completionRate: 96.5,
    responseTime: '< 5 min'
  },
]

// Mock buy orders (Bids) - people buying USDT with USD  
export const mockBuyQuotes: Quote[] = [
  // Price level: 1.002
  {
    id: 'buy-1',
    price: 1.002,
    volume: 180000,
    trader: 'StableBuyer',
    paymentMethods: ['Bank Transfer', 'Wise'],
    minOrder: 5000,
    maxOrder: 180000,
    completionRate: 99.1,
    responseTime: '< 10 min'
  },
  {
    id: 'buy-1b',
    price: 1.002,
    volume: 250000,
    trader: 'HedgeFundAlpha',
    paymentMethods: ['Wire Transfer', 'SWIFT'],
    minOrder: 50000,
    maxOrder: 250000,
    completionRate: 100,
    responseTime: '< 20 min'
  },
  {
    id: 'buy-1c',
    price: 1.002,
    volume: 65000,
    trader: 'ArbitrageBot',
    paymentMethods: ['Bank Transfer'],
    minOrder: 10000,
    maxOrder: 65000,
    completionRate: 98.5,
    responseTime: '< 5 min'
  },
  // Price level: 0.998
  {
    id: 'buy-2',
    price: 0.998,
    volume: 350000,
    trader: 'BigCapital',
    paymentMethods: ['Wire Transfer', 'SWIFT'],
    minOrder: 25000,
    maxOrder: 350000,
    completionRate: 99.8,
    responseTime: '< 20 min'
  },
  {
    id: 'buy-2b',
    price: 0.998,
    volume: 175000,
    trader: 'AsiaDesk',
    paymentMethods: ['Wire Transfer', 'Bank Transfer'],
    minOrder: 10000,
    maxOrder: 175000,
    completionRate: 98.9,
    responseTime: '< 30 min'
  },
  // Price level: 0.995
  {
    id: 'buy-3',
    price: 0.995,
    volume: 80000,
    trader: 'DailyTrader',
    paymentMethods: ['Bank Transfer', 'PayPal'],
    minOrder: 1000,
    maxOrder: 80000,
    completionRate: 95.2,
    responseTime: '< 5 min'
  },
  {
    id: 'buy-3b',
    price: 0.995,
    volume: 120000,
    trader: 'MarketMaker',
    paymentMethods: ['Bank Transfer', 'Wise', 'SEPA'],
    minOrder: 5000,
    maxOrder: 120000,
    completionRate: 99.5,
    responseTime: '< 10 min'
  },
  // Price level: 0.992
  {
    id: 'buy-4',
    price: 0.992,
    volume: 600000,
    trader: 'MegaFund',
    paymentMethods: ['Wire Transfer'],
    minOrder: 100000,
    maxOrder: 600000,
    completionRate: 100,
    responseTime: '< 1 hour'
  },
  // Price level: 0.988
  {
    id: 'buy-5',
    price: 0.988,
    volume: 45000,
    trader: 'SmallFish',
    paymentMethods: ['Bank Transfer', 'Zelle'],
    minOrder: 500,
    maxOrder: 45000,
    completionRate: 94.0,
    responseTime: '< 5 min'
  },
  {
    id: 'buy-5b',
    price: 0.988,
    volume: 90000,
    trader: 'DiscountHunter',
    paymentMethods: ['Bank Transfer', 'Wise', 'Revolut'],
    minOrder: 2000,
    maxOrder: 90000,
    completionRate: 96.5,
    responseTime: '< 15 min'
  },
]

// Generate mock price data for the last 24 hours
export const mockPriceData: PricePoint[] = (() => {
  const data: PricePoint[] = []
  const now = Date.now()
  const hourMs = 60 * 60 * 1000
  
  let price = 0.998
  
  for (let i = 48; i >= 0; i--) {
    const time = Math.floor((now - i * hourMs / 2) / 1000)
    const change = (Math.random() - 0.48) * 0.008
    const open = price
    price = Math.max(0.985, Math.min(1.015, price + change))
    const close = price
    const high = Math.max(open, close) + Math.random() * 0.003
    const low = Math.min(open, close) - Math.random() * 0.003
    
    data.push({ time, open, high, low, close })
  }
  
  return data
})()
