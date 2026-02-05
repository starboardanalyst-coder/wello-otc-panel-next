'use client'

import { createContext, useContext } from 'react'

interface MarketContextType {
  chartType: 'line' | 'candle'
  timeRange: '1H' | '24H' | '7D' | '30D'
  asset: string
}

const MarketContext = createContext<MarketContextType>({
  chartType: 'line',
  timeRange: '24H',
  asset: 'USDT/USD',
})

export const MarketProvider = MarketContext.Provider
export const useMarket = () => useContext(MarketContext)
