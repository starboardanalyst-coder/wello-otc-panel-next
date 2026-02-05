'use client'

import { useEffect, useRef } from 'react'
import { createChart, LineSeries } from 'lightweight-charts'
import type { IChartApi, LineData } from 'lightweight-charts'
import type { PricePoint, Quote } from '@/data/mockData'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MiniChartProps {
  data: PricePoint[]
  currentPrice: number
  sellQuotes: Quote[]
  buyQuotes: Quote[]
  compact?: boolean
}

export default function MiniChart({
  data,
  currentPrice,
  sellQuotes,
  buyQuotes,
  compact = false,
}: MiniChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  const bestAsk = Math.min(...sellQuotes.map(q => q.price))
  const bestBid = Math.max(...buyQuotes.map(q => q.price))
  const spread = ((bestAsk - bestBid) / bestBid) * 100
  const totalAskVolume = sellQuotes.reduce((s, q) => s + q.volume, 0)
  const totalBidVolume = buyQuotes.reduce((s, q) => s + q.volume, 0)

  const fmt = (v: number) => {
    if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
    if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`
    return `$${v}`
  }

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: 'transparent' },
        textColor: '#71717a',
        fontSize: 10,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
      grid: {
        vertLines: { color: 'rgba(113, 113, 122, 0.1)' },
        horzLines: { color: 'rgba(113, 113, 122, 0.1)' },
      },
      rightPriceScale: { 
        visible: !compact,
        borderVisible: false,
      },
      leftPriceScale: { visible: false },
      timeScale: { 
        visible: !compact,
        borderVisible: false,
        timeVisible: true,
      },
      crosshair: {
        vertLine: { color: 'rgba(16, 185, 129, 0.3)', width: 1 },
        horzLine: { color: 'rgba(16, 185, 129, 0.3)', width: 1 },
      },
    })

    chartRef.current = chart

    const series = chart.addSeries(LineSeries, {
      color: '#10b981',
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      priceLineVisible: !compact,
      priceLineColor: '#10b981',
      lastValueVisible: !compact,
    })

    series.setData(data.map(d => ({ 
      time: d.time as unknown as LineData['time'], 
      value: d.close 
    })))

    chart.timeScale().fitContent()

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data, compact])

  // Compact mode - just the chart
  if (compact) {
    return (
      <div className="h-full w-full">
        <div ref={chartContainerRef} className="h-full w-full" />
      </div>
    )
  }

  // Full mode with liquidity panel
  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Chart Area */}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <div>
            <div className="mb-1 text-xs uppercase tracking-wider text-zinc-500">USDT/USD</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">${currentPrice.toFixed(4)}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-zinc-500">24h Range</div>
            <div className="text-sm text-zinc-400">$0.9985 - $1.0125</div>
          </div>
        </div>
        <div className="min-h-0 flex-1 p-2">
          <div ref={chartContainerRef} className="h-full w-full" />
        </div>
      </div>

      {/* Liquidity Panel */}
      <div className="flex w-full flex-col border-t border-zinc-800 p-4 lg:w-72 lg:border-l lg:border-t-0">
        <div className="mb-4 text-xs uppercase tracking-wider text-zinc-500">OTC Liquidity</div>
        
        {/* Bid */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Bid Side</span>
            </div>
            <span className="text-sm font-bold text-emerald-400">{fmt(totalBidVolume)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div 
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${(totalBidVolume / (totalBidVolume + totalAskVolume)) * 100}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-zinc-500">{buyQuotes.length} active orders</div>
        </div>

        {/* Ask */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">Ask Side</span>
            </div>
            <span className="text-sm font-bold text-red-400">{fmt(totalAskVolume)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div 
              className="h-full rounded-full bg-red-500"
              style={{ width: `${(totalAskVolume / (totalBidVolume + totalAskVolume)) * 100}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-zinc-500">{sellQuotes.length} active orders</div>
        </div>

        {/* Best Prices */}
        <div className="mt-auto rounded-xl border border-zinc-800 bg-zinc-800/50 p-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="mb-1 text-[10px] uppercase text-zinc-500">Best Bid</div>
              <div className="text-sm font-bold text-emerald-400">${bestBid.toFixed(4)}</div>
            </div>
            <div>
              <div className="mb-1 text-[10px] uppercase text-zinc-500">Spread</div>
              <div className="text-sm font-medium text-zinc-400">{spread.toFixed(3)}%</div>
            </div>
            <div>
              <div className="mb-1 text-[10px] uppercase text-zinc-500">Best Ask</div>
              <div className="text-sm font-bold text-red-400">${bestAsk.toFixed(4)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
