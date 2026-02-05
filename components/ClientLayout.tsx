'use client'

import { useState } from 'react'
import { Header } from './Header'
import { MarketProvider } from './MarketContext'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [chartType, setChartType] = useState<'line' | 'candle'>('line')
  const [timeRange, setTimeRange] = useState<'1H' | '24H' | '7D' | '30D'>('24H')
  const [asset, setAsset] = useState('USDT/USD')

  return (
    <MarketProvider value={{ chartType, timeRange, asset }}>
      <div className="h-screen flex flex-col bg-[#0A0A0F] relative">
        {/* Global ambient effects */}
        <div className="fixed inset-0 bg-mesh pointer-events-none" />
        <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col">
          <Header
            asset={asset}
            setAsset={setAsset}
            chartType={chartType}
            setChartType={setChartType}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
          {children}
        </div>
      </div>
    </MarketProvider>
  )
}
