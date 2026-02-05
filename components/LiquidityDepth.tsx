'use client'

import type { Quote } from '@/data/mockData'

interface LiquidityDepthProps {
  buyQuotes: Quote[]
  sellQuotes: Quote[]
}

interface AggregatedLevel {
  price: number
  volume: number
  count: number
}

export default function LiquidityDepth({ buyQuotes, sellQuotes }: LiquidityDepthProps) {
  // Aggregate quotes by price level
  const aggregateByPrice = (quotes: Quote[]): AggregatedLevel[] => {
    const map = new Map<number, { volume: number; count: number }>()
    quotes.forEach(q => {
      const existing = map.get(q.price) || { volume: 0, count: 0 }
      map.set(q.price, { volume: existing.volume + q.volume, count: existing.count + 1 })
    })
    return Array.from(map.entries())
      .map(([price, data]) => ({ price, volume: data.volume, count: data.count }))
      .sort((a, b) => a.price - b.price)
  }

  const bids = aggregateByPrice(buyQuotes).sort((a, b) => b.price - a.price).slice(0, 5)
  const asks = aggregateByPrice(sellQuotes).sort((a, b) => a.price - b.price).slice(0, 5)

  const maxVolume = Math.max(
    ...bids.map(b => b.volume),
    ...asks.map(a => a.volume)
  )

  const formatVol = (v: number) => {
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`
    if (v >= 1000) return `${(v / 1000).toFixed(0)}K`
    return v.toString()
  }

  return (
    <div className="card">
      <div className="card-header">
        <span className="font-semibold">Liquidity Depth</span>
      </div>
      <div className="p-4">
        {/* Header */}
        <div className="mb-3 grid grid-cols-3 text-xs text-[hsl(215,20%,65%)]">
          <span>Price</span>
          <span className="text-center">Volume</span>
          <span className="text-right">Orders</span>
        </div>

        {/* Asks (sells) - red, sorted low to high but displayed high to low */}
        <div className="mb-2 space-y-1">
          {[...asks].reverse().map((level, i) => (
            <div key={`ask-${i}`} className="relative">
              {/* Background bar */}
              <div 
                className="absolute inset-y-0 right-0 bg-red-500/10 rounded-r"
                style={{ width: `${(level.volume / maxVolume) * 100}%` }}
              />
              {/* Content */}
              <div className="relative grid grid-cols-3 py-1.5 px-2 text-sm">
                <span className="font-medium text-red-400">${level.price.toFixed(4)}</span>
                <span className="text-center text-[hsl(215,20%,65%)]">{formatVol(level.volume)}</span>
                <span className="text-right text-[hsl(215,20%,65%)]">{level.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Spread indicator */}
        <div className="my-3 flex items-center justify-center gap-2 py-2 border-y border-[hsl(217,33%,17%)]">
          <span className="text-xs text-[hsl(215,20%,65%)]">Spread</span>
          <span className="text-sm font-bold text-emerald-400">
            {asks.length > 0 && bids.length > 0 
              ? `${((asks[0].price - bids[0].price) / bids[0].price * 100).toFixed(3)}%`
              : '-'}
          </span>
        </div>

        {/* Bids (buys) - green, sorted high to low */}
        <div className="space-y-1">
          {bids.map((level, i) => (
            <div key={`bid-${i}`} className="relative">
              {/* Background bar */}
              <div 
                className="absolute inset-y-0 left-0 bg-emerald-500/10 rounded-l"
                style={{ width: `${(level.volume / maxVolume) * 100}%` }}
              />
              {/* Content */}
              <div className="relative grid grid-cols-3 py-1.5 px-2 text-sm">
                <span className="font-medium text-emerald-400">${level.price.toFixed(4)}</span>
                <span className="text-center text-[hsl(215,20%,65%)]">{formatVol(level.volume)}</span>
                <span className="text-right text-[hsl(215,20%,65%)]">{level.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-3 border-t border-[hsl(217,33%,17%)] grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xs text-[hsl(215,20%,65%)] mb-1">Total Bid</div>
            <div className="text-sm font-bold text-emerald-400">
              ${formatVol(bids.reduce((s, b) => s + b.volume, 0))}
            </div>
          </div>
          <div>
            <div className="text-xs text-[hsl(215,20%,65%)] mb-1">Total Ask</div>
            <div className="text-sm font-bold text-red-400">
              ${formatVol(asks.reduce((s, a) => s + a.volume, 0))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
