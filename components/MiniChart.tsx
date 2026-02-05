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
        textColor: 'rgba(255, 255, 255, 0.3)',
        fontSize: 9,
        fontFamily: "'JetBrains Mono', monospace",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
      },
      rightPriceScale: { visible: false },
      leftPriceScale: { visible: false },
      timeScale: { visible: false },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
      handleScale: false,
      handleScroll: false,
    })

    chartRef.current = chart

    const series = chart.addSeries(LineSeries, {
      color: '#00F5D4',
      lineWidth: 2,
      crosshairMarkerVisible: false,
      priceLineVisible: false,
      lastValueVisible: false,
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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Price Chart</div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-black font-number text-white">${currentPrice.toFixed(4)}</span>
          <span className="text-xs text-white/40">USDT/USD</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0 p-2">
        <div ref={chartContainerRef} className="w-full h-full" />
      </div>

      {/* Liquidity Section */}
      <div className="p-4 border-t border-white/5">
        <div className="text-xs text-white/40 uppercase tracking-wider mb-3">OTC Liquidity</div>
        
        {/* Bid */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <TrendingUp size={12} className="text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Bid</span>
            </div>
            <span className="text-xs font-number font-bold text-emerald-400">{fmt(totalBidVolume)}</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500/20 to-emerald-500 rounded-full"
              style={{ width: `${bidWidth}%` }}
            />
          </div>
        </div>

        {/* Ask */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <TrendingDown size={12} className="text-rose-400" />
              <span className="text-xs font-medium text-rose-400">Ask</span>
            </div>
            <span className="text-xs font-number font-bold text-rose-400">{fmt(totalAskVolume)}</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-500/20 to-rose-500 rounded-full"
              style={{ width: `${askWidth}%` }}
            />
          </div>
        </div>

        {/* Best Prices */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            <div className="text-[10px] text-white/30 uppercase">Best Bid</div>
            <div className="text-sm font-number font-bold text-emerald-400">${bestBid.toFixed(4)}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-white/30 uppercase">Spread</div>
            <div className="text-sm font-number font-medium text-white/60">{spread.toFixed(3)}%</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/30 uppercase">Best Ask</div>
            <div className="text-sm font-number font-bold text-rose-400">${bestAsk.toFixed(4)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
