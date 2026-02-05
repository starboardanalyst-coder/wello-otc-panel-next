'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createChart, LineSeries, CandlestickSeries } from 'lightweight-charts'
import type { IChartApi, ISeriesApi, LineData, CandlestickData } from 'lightweight-charts'
import type { PricePoint, Quote } from '@/data/mockData'
import { TrendingUp, TrendingDown, Zap, Clock, Star, CreditCard, MessageSquare, Shield, X, Plus, Minus, Maximize2 } from 'lucide-react'

interface IntegratedChartProps {
  data: PricePoint[]
  chartType: 'line' | 'candle'
  currentPrice: number
  sellQuotes: Quote[]
  buyQuotes: Quote[]
}

interface PriceLevel {
  price: number
  buyVolume: number
  sellVolume: number
  buyQuotes: Quote[]
  sellQuotes: Quote[]
}

interface PositionedLevel extends PriceLevel {
  y: number | null
}

export default function IntegratedChart({
  data,
  chartType,
  currentPrice,
  sellQuotes,
  buyQuotes,
}: IntegratedChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Line'> | ISeriesApi<'Candlestick'> | null>(null)

  const [selectedLevel, setSelectedLevel] = useState<PriceLevel | null>(null)
  const [selectedTrader, setSelectedTrader] = useState<{ quote: Quote; side: 'buy' | 'sell' } | null>(null)
  const [positionedLevels, setPositionedLevels] = useState<PositionedLevel[]>([])

  // Aggregate quotes by price level
  const priceMap = new Map<number, PriceLevel>()
  const allPrices = new Set<number>()
  sellQuotes.forEach(q => allPrices.add(Math.round(q.price * 1000) / 1000))
  buyQuotes.forEach(q => allPrices.add(Math.round(q.price * 1000) / 1000))

  allPrices.forEach(price => {
    priceMap.set(price, { price, buyVolume: 0, sellVolume: 0, buyQuotes: [], sellQuotes: [] })
  })

  sellQuotes.forEach(q => {
    const rp = Math.round(q.price * 1000) / 1000
    const level = priceMap.get(rp)!
    level.sellVolume += q.volume
    level.sellQuotes.push(q)
  })

  buyQuotes.forEach(q => {
    const rp = Math.round(q.price * 1000) / 1000
    const level = priceMap.get(rp)!
    level.buyVolume += q.volume
    level.buyQuotes.push(q)
  })

  const levels = Array.from(priceMap.values()).sort((a, b) => b.price - a.price)
  const maxVolume = Math.max(...levels.map(l => Math.max(l.buyVolume, l.sellVolume)), 1)
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

  const levelsRef = useRef(levels)
  levelsRef.current = levels

  // OTC price range refs for autoscaleInfoProvider closure
  const otcMinRef = useRef(0)
  const otcMaxRef = useRef(0)
  {
    const allOtcPrices = [
      ...buyQuotes.map(q => q.price),
      ...sellQuotes.map(q => q.price),
      currentPrice,
    ]
    if (allOtcPrices.length > 0) {
      const mn = Math.min(...allOtcPrices)
      const mx = Math.max(...allOtcPrices)
      const pad = (mx - mn) * 0.10
      otcMinRef.current = mn - pad
      otcMaxRef.current = mx + pad
    }
  }

  const recalcPositions = useCallback(() => {
    const series = seriesRef.current
    if (!series) return
    const next: PositionedLevel[] = levelsRef.current.map(level => ({
      ...level,
      y: series.priceToCoordinate(level.price) as number | null,
    }))
    setPositionedLevels(next)
  }, [])

  // ==================== CHART ====================
  useEffect(() => {
    if (!chartContainerRef.current) return
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: 'transparent' },
        textColor: 'rgba(255, 255, 255, 0.4)',
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.08)',
        scaleMargins: { top: 0.15, bottom: 0.15 },
        visible: true,
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.08)',
        timeVisible: true,
        rightOffset: 5,
      },
      crosshair: {
        vertLine: { color: 'rgba(0, 245, 212, 0.3)', width: 1, style: 2, labelBackgroundColor: '#12121A' },
        horzLine: { color: 'rgba(0, 245, 212, 0.3)', width: 1, style: 2, labelBackgroundColor: '#12121A' },
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
        axisPressedMouseMove: { time: true, price: true },
        axisDoubleClickReset: { time: true, price: true },
      },
    })
    chartRef.current = chart

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        })
        recalcPositions()
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => { window.removeEventListener('resize', handleResize); chart.remove() }
  }, [recalcPositions])

  // Series data + price lines + subscriptions
  useEffect(() => {
    if (!chartRef.current) return
    if (seriesRef.current) chartRef.current.removeSeries(seriesRef.current)

    const autoscaleProvider = (() => ({
      priceRange: {
        minValue: otcMinRef.current,
        maxValue: otcMaxRef.current,
      },
    })) as any

    if (chartType === 'line') {
      const s = chartRef.current.addSeries(LineSeries, {
        color: '#00F5D4', lineWidth: 2,
        crosshairMarkerVisible: true, crosshairMarkerRadius: 6,
        crosshairMarkerBackgroundColor: '#00F5D4', crosshairMarkerBorderColor: '#0A0A0F', crosshairMarkerBorderWidth: 3,
        priceScaleId: 'right',
        autoscaleInfoProvider: autoscaleProvider,
      })
      s.setData(data.map(d => ({ time: d.time as unknown as LineData['time'], value: d.close })))
      seriesRef.current = s as ISeriesApi<'Line'>
    } else {
      const s = chartRef.current.addSeries(CandlestickSeries, {
        upColor: '#00F5D4', downColor: '#FF6B9D',
        borderUpColor: '#00F5D4', borderDownColor: '#FF6B9D',
        wickUpColor: '#00F5D4', wickDownColor: '#FF6B9D',
        priceScaleId: 'right',
        autoscaleInfoProvider: autoscaleProvider,
      })
      s.setData(data.map(d => ({
        time: d.time as unknown as CandlestickData['time'],
        open: d.open, high: d.high, low: d.low, close: d.close,
      })))
      seriesRef.current = s as ISeriesApi<'Candlestick'>
    }

    if (!seriesRef.current) return

    // Market price line
    seriesRef.current.createPriceLine({
      price: currentPrice, color: '#7B61FF', lineWidth: 2, lineStyle: 2,
      axisLabelVisible: true, title: 'Market',
    })

    // OTC price level dashed lines
    const seenPrices = new Set<number>()
    buyQuotes.forEach(q => {
      const rp = Math.round(q.price * 1000) / 1000
      if (seenPrices.has(rp)) return
      seenPrices.add(rp)
      seriesRef.current!.createPriceLine({
        price: rp, color: 'rgba(0, 245, 212, 0.35)', lineWidth: 1, lineStyle: 3,
        axisLabelVisible: false, title: '',
      })
    })
    sellQuotes.forEach(q => {
      const rp = Math.round(q.price * 1000) / 1000
      if (seenPrices.has(rp)) return
      seenPrices.add(rp)
      seriesRef.current!.createPriceLine({
        price: rp, color: 'rgba(255, 107, 157, 0.35)', lineWidth: 1, lineStyle: 3,
        axisLabelVisible: false, title: '',
      })
    })

    chartRef.current.timeScale().fitContent()

    // Initial calc + subscriptions
    requestAnimationFrame(() => recalcPositions())

    const chart = chartRef.current
    const sync = () => recalcPositions()
    chart.timeScale().subscribeVisibleLogicalRangeChange(sync)
    chart.subscribeCrosshairMove(sync)

    return () => {
      chart.timeScale().unsubscribeVisibleLogicalRangeChange(sync)
      chart.unsubscribeCrosshairMove(sync)
    }
  }, [chartType, data, currentPrice, buyQuotes, sellQuotes, recalcPositions])

  // Re-sync on container resize
  useEffect(() => {
    if (!chartContainerRef.current) return
    const ro = new ResizeObserver(() => recalcPositions())
    ro.observe(chartContainerRef.current)
    return () => ro.disconnect()
  }, [recalcPositions])

  // ==================== HANDLERS ====================
  const openLevel = (level: PriceLevel) => {
    setSelectedLevel(level)
    setSelectedTrader(null)
  }

  const selectTrader = (quote: Quote, side: 'buy' | 'sell') => {
    setSelectedTrader({ quote, side })
  }

  const closeDrawer = () => {
    setSelectedLevel(null)
    setSelectedTrader(null)
  }

  const drawerOpen = selectedLevel !== null || selectedTrader !== null

  // ==================== ZOOM HANDLER ====================
  const handlePriceZoom = useCallback((direction: 'in' | 'out' | 'reset') => {
    const chart = chartRef.current
    const container = chartContainerRef.current
    if (!chart || !container) return

    if (direction === 'reset') {
      chart.priceScale('right').applyOptions({ autoScale: true })
      requestAnimationFrame(() => recalcPositions())
      return
    }

    const target = container.children[0] as HTMLElement
    if (!target) return
    const rect = target.getBoundingClientRect()
    const clientX = rect.right - 15
    const clientY = rect.top + rect.height / 2
    const deltaY = direction === 'in' ? -50 : 50

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        target.dispatchEvent(new WheelEvent('wheel', {
          deltaY,
          clientX,
          clientY,
          bubbles: true,
          cancelable: true,
        }))
      }, i * 30)
    }
    setTimeout(() => recalcPositions(), 150)
  }, [recalcPositions])

  // ==================== RENDER ====================
  const ROW_H = 36

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="flex flex-1 min-h-0">

        {/* Chart */}
        <div className="flex-1 relative min-w-0">
          <div ref={chartContainerRef} className="w-full h-full" />

          {/* Bottom Drawer */}
          {drawerOpen && renderDrawer()}
        </div>

        {/* Depth Panel */}
        <div className="w-[340px] flex-shrink-0 border-l border-white/5 bg-[#0A0A0F]/90 relative overflow-hidden z-20">

          {/* Stats overlay */}
          <div className="absolute top-0 left-0 right-0 z-20 border-b border-white/8"
               style={{ background: 'linear-gradient(180deg, rgba(10,10,15,0.97) 70%, rgba(10,10,15,0) 100%)' }}>
            <div className="px-3 py-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">OTC Depth</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePriceZoom('in')}
                    className="w-5 h-5 rounded flex items-center justify-center bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-colors"
                    title="Zoom in (compress)"
                  >
                    <Plus size={10} />
                  </button>
                  <button
                    onClick={() => handlePriceZoom('out')}
                    className="w-5 h-5 rounded flex items-center justify-center bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-colors"
                    title="Zoom out (expand)"
                  >
                    <Minus size={10} />
                  </button>
                  <button
                    onClick={() => handlePriceZoom('reset')}
                    className="w-5 h-5 rounded flex items-center justify-center bg-white/5 hover:bg-[#7B61FF]/30 text-white/50 hover:text-[#7B61FF] transition-colors"
                    title="Fit all OTC levels"
                  >
                    <Maximize2 size={10} />
                  </button>
                  <span className="text-[9px] font-number text-white/30 ml-1">{levels.length}</span>
                </div>
              </div>
              <div className="text-[8px] text-white/20 mb-1" style={{ marginTop: '-2px' }}>Scroll axis to zoom</div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Zap size={9} className="text-[#7B61FF]" />
                  <span className="text-[10px] font-number font-bold text-white">${currentPrice.toFixed(4)}</span>
                </div>
                <div className="text-[10px] font-number text-white/40">
                  spr <span className="font-bold text-white/60">{spread.toFixed(3)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1 font-number font-bold text-[#00F5D4]">
                  <TrendingUp size={10} /> {fmt(totalBidVolume)}
                </span>
                <span className="text-white/15">|</span>
                <span className="flex items-center gap-1 font-number font-bold text-[#FF6B9D]">
                  {fmt(totalAskVolume)} <TrendingDown size={10} />
                </span>
              </div>
            </div>
          </div>

          {/* Price-aligned depth bars */}
          {positionedLevels.map((level) => {
            if (level.y === null || level.y === undefined) return null
            const buyW = (level.buyVolume / maxVolume) * 100
            const sellW = (level.sellVolume / maxVolume) * 100
            const isBestBid = level.price === bestBid && level.buyVolume > 0
            const isBestAsk = level.price === bestAsk && level.sellVolume > 0
            const isSelected = selectedLevel?.price === level.price

            const top = level.y - ROW_H / 2

            return (
              <button
                key={level.price}
                onClick={() => openLevel(level)}
                className={`absolute left-0 right-0 z-10 flex items-center cursor-pointer transition-colors duration-100 group ${
                  isSelected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
                }`}
                style={{ top, height: ROW_H }}
              >
                {/* Buy bar */}
                <div className="flex-1 flex justify-end items-center h-full relative px-1">
                  {level.buyVolume > 0 && (
                    <div
                      className={`h-[24px] rounded-l ${isBestBid ? 'bar-buy-best' : 'bar-buy'} transition-all`}
                      style={{ width: `${Math.max(buyW * 0.9, 6)}%` }}
                    />
                  )}
                  {level.buyVolume > 0 && (
                    <span className="absolute left-2 text-[11px] font-number font-bold text-[#00F5D4]/80 pointer-events-none">
                      {fmt(level.buyVolume)}
                    </span>
                  )}
                </div>

                {/* Price label */}
                <div className={`w-[66px] flex-shrink-0 text-center text-[11px] font-number font-bold leading-none ${
                  isBestBid ? 'text-[#00F5D4]' : isBestAsk ? 'text-[#FF6B9D]' : 'text-white/50'
                }`}>
                  {level.price.toFixed(4)}
                  {(isBestBid || isBestAsk) && (
                    <div className="text-[7px] opacity-50 mt-0.5">{isBestBid ? 'BEST BID' : 'BEST ASK'}</div>
                  )}
                </div>

                {/* Sell bar */}
                <div className="flex-1 flex justify-start items-center h-full relative px-1">
                  {level.sellVolume > 0 && (
                    <div
                      className={`h-[24px] rounded-r ${isBestAsk ? 'bar-sell-best' : 'bar-sell'} transition-all`}
                      style={{ width: `${Math.max(sellW * 0.9, 6)}%` }}
                    />
                  )}
                  {level.sellVolume > 0 && (
                    <span className="absolute right-2 text-[11px] font-number font-bold text-[#FF6B9D]/80 pointer-events-none">
                      {fmt(level.sellVolume)}
                    </span>
                  )}
                </div>
              </button>
            )
          })}

          {/* Quick actions */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5"
               style={{ background: 'linear-gradient(0deg, rgba(10,10,15,0.97) 70%, rgba(10,10,15,0) 100%)' }}>
            <div className="px-3 py-2 flex gap-2">
              <button
                onClick={() => {
                  const lvl = levels.find(l => l.price === bestBid && l.buyQuotes.length > 0)
                  if (lvl) { openLevel(lvl); setTimeout(() => selectTrader(lvl.buyQuotes[0], 'buy'), 50) }
                }}
                className="flex-1 py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 btn-primary"
              >
                <TrendingUp size={12} /> Buy
              </button>
              <button
                onClick={() => {
                  const lvl = levels.find(l => l.price === bestAsk && l.sellQuotes.length > 0)
                  if (lvl) { openLevel(lvl); setTimeout(() => selectTrader(lvl.sellQuotes[0], 'sell'), 50) }
                }}
                className="flex-1 py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 btn-sell"
              >
                <TrendingDown size={12} /> Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // ==================== DRAWER ====================
  function renderDrawer() {
    if (selectedTrader) {
      const { quote, side } = selectedTrader
      const color = side === 'buy' ? '#00F5D4' : '#FF6B9D'
      return (
        <div className="absolute bottom-0 left-0 right-0 z-30 animate-slideUp" style={{ height: 260 }}>
          <div className="h-full glass-ultra border-t border-white/10 flex">
            <div className="flex-1 p-4 flex gap-5 items-start overflow-x-auto">
              <div className="flex-shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black relative"
                    style={{ background: `${color}20`, color, boxShadow: `0 0 24px ${color}20` }}>
                    {quote.trader.charAt(0)}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: color }}>
                      <Shield size={10} className="text-black" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">{quote.trader}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-xs">
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-yellow-400">{quote.completionRate}%</span>
                      </span>
                      <span className="text-xs text-white/40 flex items-center gap-1"><Clock size={10} />{quote.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 flex-shrink-0">
                <div className="stat-card rounded-lg p-2.5 min-w-[90px]">
                  <div className="text-[9px] text-white/35 uppercase mb-0.5">Price</div>
                  <div className="text-lg font-black font-number" style={{ color }}>${quote.price.toFixed(4)}</div>
                </div>
                <div className="stat-card rounded-lg p-2.5 min-w-[90px]">
                  <div className="text-[9px] text-white/35 uppercase mb-0.5">Volume</div>
                  <div className="text-lg font-black font-number text-white">{fmt(quote.volume)}</div>
                </div>
                <div className="stat-card rounded-lg p-2.5 min-w-[90px]">
                  <div className="text-[9px] text-white/35 uppercase mb-0.5">Range</div>
                  <div className="text-sm font-bold font-number text-white">{fmt(quote.minOrder)}</div>
                  <div className="text-[10px] text-white/30 font-number">to {fmt(quote.maxOrder)}</div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="text-[9px] text-white/35 uppercase mb-1.5 flex items-center gap-1"><CreditCard size={9} /> Payment</div>
                <div className="flex flex-wrap gap-1">
                  {quote.paymentMethods.map(m => (
                    <span key={m} className="px-2 py-1 rounded text-[10px] font-medium bg-white/5 text-white/60 border border-white/8">{m}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-[170px] flex-shrink-0 border-l border-white/5 p-3 flex flex-col justify-center gap-2">
              <button
                onClick={() => alert(`Order submitted:\n${side === 'buy' ? 'Buy from' : 'Sell to'} ${quote.trader}\n$${quote.price.toFixed(4)} × ${fmt(quote.volume)}`)}
                className={`w-full py-2.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 ${
                  side === 'buy' ? 'btn-primary glow-buy' : 'btn-sell glow-sell'
                }`}
              >
                <Zap size={14} />{side === 'buy' ? 'Buy' : 'Sell'}
              </button>
              <button
                onClick={() => alert('Message feature coming soon')}
                className="w-full py-2 rounded-lg glass-card text-white/50 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <MessageSquare size={12} /> Message
              </button>
              <button
                onClick={closeDrawer}
                className="w-full py-1.5 text-[10px] text-white/30 hover:text-white/60 transition-colors flex items-center justify-center gap-1"
              >
                <X size={10} /> Close
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (selectedLevel) {
      const allQuotes = [
        ...selectedLevel.buyQuotes.map(q => ({ q, side: 'buy' as const })),
        ...selectedLevel.sellQuotes.map(q => ({ q, side: 'sell' as const })),
      ]
      return (
        <div className="absolute bottom-0 left-0 right-0 z-30 animate-slideUp" style={{ height: 260 }}>
          <div className="h-full glass-ultra border-t border-white/10 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-white/80">Traders at</span>
                <span className="text-sm font-black font-number text-white">${selectedLevel.price.toFixed(4)}</span>
                <span className="text-[10px] text-white/30">{allQuotes.length} trader{allQuotes.length !== 1 ? 's' : ''}</span>
              </div>
              <button onClick={closeDrawer}
                className="text-white/30 hover:text-white/70 transition-colors p-1">
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-hidden px-3 py-2.5 flex gap-2.5">
              {allQuotes.map(({ q, side }) => {
                const color = side === 'buy' ? '#00F5D4' : '#FF6B9D'
                return (
                  <button
                    key={q.id}
                    onClick={() => selectTrader(q, side)}
                    className="flex-shrink-0 w-[190px] rounded-xl p-2.5 text-left bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black"
                        style={{ background: `${color}18`, color }}>{q.trader.charAt(0)}</div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{q.trader}</div>
                        <div className="flex items-center gap-1.5 text-[9px] text-white/35">
                          <span className="flex items-center gap-0.5"><Star size={8} className="text-yellow-400 fill-yellow-400" />{q.completionRate}%</span>
                          <span>{q.responseTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black font-number" style={{ color }}>{fmt(q.volume)}</span>
                      <span className="text-[9px] text-white/25 font-number">{fmt(q.minOrder)}-{fmt(q.maxOrder)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {q.paymentMethods.slice(0, 2).map(m => (
                        <span key={m} className="px-1.5 py-0.5 rounded text-[8px] bg-white/5 text-white/40">{m}</span>
                      ))}
                      {q.paymentMethods.length > 2 && (
                        <span className="px-1 py-0.5 rounded text-[8px] bg-white/5 text-white/30">+{q.paymentMethods.length - 2}</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    return null
  }
}
