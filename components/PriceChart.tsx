'use client'

import { useEffect, useRef } from 'react'
import { createChart, LineSeries } from 'lightweight-charts'
import type { IChartApi, LineData } from 'lightweight-charts'
import type { PricePoint } from '@/data/mockData'

interface PriceChartProps {
  data: PricePoint[]
}

export default function PriceChart({ data }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: 'transparent' },
        textColor: 'hsl(215, 20%, 65%)',
        fontSize: 11,
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      grid: {
        vertLines: { color: 'hsl(217, 33%, 17%, 0.5)' },
        horzLines: { color: 'hsl(217, 33%, 17%, 0.5)' },
      },
      rightPriceScale: { 
        visible: true,
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      leftPriceScale: { visible: false },
      timeScale: { 
        visible: true,
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: { 
          color: 'hsl(142, 71%, 45%, 0.5)', 
          width: 1,
          style: 2,
          labelBackgroundColor: 'hsl(142, 71%, 45%)',
        },
        horzLine: { 
          color: 'hsl(142, 71%, 45%, 0.5)', 
          width: 1,
          style: 2,
          labelBackgroundColor: 'hsl(142, 71%, 45%)',
        },
      },
      handleScale: { axisPressedMouseMove: true },
      handleScroll: { vertTouchDrag: false },
    })

    chartRef.current = chart

    const series = chart.addSeries(LineSeries, {
      color: 'hsl(142, 71%, 45%)',
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: 'hsl(142, 71%, 45%)',
      crosshairMarkerBackgroundColor: 'hsl(222, 47%, 6%)',
      priceLineVisible: true,
      priceLineColor: 'hsl(142, 71%, 45%, 0.5)',
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

  return <div ref={chartContainerRef} className="h-full w-full" />
}
