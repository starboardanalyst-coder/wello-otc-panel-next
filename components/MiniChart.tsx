'use client'

import { useEffect, useRef } from 'react'
import { createChart, LineSeries } from 'lightweight-charts'
import type { IChartApi, LineData } from 'lightweight-charts'
import type { PricePoint, Quote } from '@/data/mockData'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

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

  // Calculate depth bars
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
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: false,
      },
      timeScale: {
        visible: false,
      },
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
      <div className="p-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[#7B61FF]" />
            <span className="text-lg font-black font-number text-white">${currentPrice.toFixed(4)}</span>
          </div>
          <div className="text-[10px] font-number text-white/40">
            USDT/USD
          </div>
        </div>
        <div className="text-[10px] text-white/30">
          Spread: <span className="text-white/50 font-medium">{spread.toFixed(3)}%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <div ref={chartContainerRef} className="w-full h-full" />
      </div>

      {/* Depth Summary */}
      <div className="p-3 border-t border-white/5">
        <div className="text-[9px] text-white/30 uppercase tracking-wider mb-2">OTC Liquidity</div>
        
        {/* Buy depth bar */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={10} className="text-[#00F5D4]" />
              <span className="text-[10px] font-medium text-[#00F5D4]">Bid</span>
            </div>
            <span className="text-[10px] font-number font-bold text-[#00F5D4]">{fmt(totalBidVolume)}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00F5D4]/30 to-[#00F5D4] rounded-full transition-all duration-500"
              style={{ width: `${bidWidth}%` }}
            />
          </div>
        </div>

        {/* Sell depth bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <TrendingDown size={10} className="text-[#FF6B9D]" />
              <span className="text-[10px] font-medium text-[#FF6B9D]">Ask</span>
            </div>
            <span className="text-[10px] font-number font-bold text-[#FF6B9D]">{fmt(totalAskVolume)}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF6B9D]/30 to-[#FF6B9D] rounded-full transition-all duration-500"
              style={{ width: `${askWidth}%` }}
            />
          </div>
        </div>

        {/* Best prices */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
          <div className="text-center">
            <div className="text-[8px] text-white/30 uppercase">Best Bid</div>
            <div className="text-xs font-number font-bold text-[#00F5D4]">${bestBid.toFixed(4)}</div>
          </div>
          <div className="text-center">
            <div className="text-[8px] text-white/30 uppercase">Best Ask</div>
            <div className="text-xs font-number font-bold text-[#FF6B9D]">${bestAsk.toFixed(4)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
