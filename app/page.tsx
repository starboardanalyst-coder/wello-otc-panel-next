'use client'

import { useMarket } from '@/components/MarketContext'
import { mockPriceData, mockSellQuotes, mockBuyQuotes } from '@/data/mockData'
import dynamic from 'next/dynamic'

const IntegratedChart = dynamic(() => import('@/components/IntegratedChart'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white/30 text-sm">Loading chart...</div>
    </div>
  ),
})

export default function MarketPage() {
  const { chartType } = useMarket()
  const currentPrice = mockPriceData[mockPriceData.length - 1].close

  return (
    <main className="flex-1 overflow-hidden relative">
      <IntegratedChart
        data={mockPriceData}
        chartType={chartType}
        currentPrice={currentPrice}
        sellQuotes={mockSellQuotes}
        buyQuotes={mockBuyQuotes}
      />
    </main>
  )
}
