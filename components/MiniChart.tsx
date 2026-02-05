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
}

export default function MiniChart({
  data,
  currentPrice,
  sellQuotes,
  buyQuotes,
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

  const maxVolume = Math.max(totalBidVolume, totalAskVolume)
  const bidWidth = (totalBidVolume / maxVolume) * 100
  const askWidth = (totalAskVolume / maxVolume) * 100

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: 'transparent' },
        textColor: 'rgba(255, 255, 255, 0.4)',
        fontSize: 10,
        fontFamily: "'JetBrains Mono', monospace",
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
      },
      rightPriceScale: { 
        visible: true,
        borderVisible: false,
      },
      leftPriceScale: { visible: false },
      timeScale: { 
        visible: true,
        borderVisible: false,
        timeVisible: true,
      },
      crosshair: {
        vertLine: { color: 'rgba(0, 245, 212, 0.3)', width: 1 },
        horzLine: { color: 'rgba(0, 245, 212, 0.3)', width: 1 },
      },
    })

    chartRef.current = chart

    const series = chart.addSeries(LineSeries, {
      color: '#00F5D4',
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      priceLineVisible: true,
      priceLineColor: '#00F5D4',
      lastValueVisible: true,
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
  }, [data])

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Chart Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">USDT/USD Price Chart</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-number text-white">${currentPrice.toFixed(4)}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/40">24h Range</div>
            <div className="text-sm font-number text-white/60">$0.9985 - $1.0125</div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-0 p-2">
          <div ref={chartContainerRef} className="w-full h-full" />
        </div>
      </div>

      {/* Liquidity Panel */}
      <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-white/5 p-4 flex flex-col">
        <div className="text-xs text-white/40 uppercase tracking-wider mb-4">OTC Liquidity Depth</div>
        
        {/* Bid */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Bid Side</span>
            </div>
            <span className="text-sm font-number font-bold text-emerald-400">{fmt(totalBidVolume)}</span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500/30 to-emerald-500 rounded-full transition-all"
              style={{ width: `${bidWidth}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-white/30">{buyQuotes.length} active orders</div>
        </div>

        {/* Ask */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingDown size={14} className="text-rose-400" />
              <span className="text-sm font-medium text-rose-400">Ask Side</span>
            </div>
            <span className="text-sm font-number font-bold text-rose-400">{fmt(totalAskVolume)}</span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-500/30 to-rose-500 rounded-full transition-all"
              style={{ width: `${askWidth}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-white/30">{sellQuotes.length} active orders</div>
        </div>

        {/* Best Prices */}
        <div className="glass-card rounded-xl p-4 mt-auto">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[10px] text-white/30 uppercase mb-1">Best Bid</div>
              <div className="text-sm font-number font-bold text-emerald-400">${bestBid.toFixed(4)}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30 uppercase mb-1">Spread</div>
              <div className="text-sm font-number font-medium text-white/60">{spread.toFixed(3)}%</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30 uppercase mb-1">Best Ask</div>
              <div className="text-sm font-number font-bold text-rose-400">${bestAsk.toFixed(4)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
