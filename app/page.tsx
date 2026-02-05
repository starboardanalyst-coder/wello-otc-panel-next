'use client'

import { useState } from 'react'
import { mockPriceData, mockSellQuotes, mockBuyQuotes } from '@/data/mockData'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, 
  Clock, Users, BarChart3, LineChart, X, DollarSign,
  ExternalLink, Store, Star, Eye, Sparkles, Zap, Shield
} from 'lucide-react'

const PriceChart = dynamic(() => import('@/components/PriceChart'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-[hsl(215,20%,65%)]">Loading chart...</div>
    </div>
  ),
})

export default function OTCPage() {
  const [showChart, setShowChart] = useState(false)
  
  const currentPrice = mockPriceData[mockPriceData.length - 1].close
  const prevPrice = mockPriceData[mockPriceData.length - 2].close
  const priceChange = ((currentPrice - prevPrice) / prevPrice) * 100
  const isUp = priceChange >= 0

  const bestAsk = Math.min(...mockSellQuotes.map(q => q.price))
  const bestBid = Math.max(...mockBuyQuotes.map(q => q.price))
  const spread = ((bestAsk - bestBid) / bestBid) * 100
  const totalBidVol = mockBuyQuotes.reduce((s, q) => s + q.volume, 0)
  const totalAskVol = mockSellQuotes.reduce((s, q) => s + q.volume, 0)

  const topTraders = [...mockBuyQuotes, ...mockSellQuotes]
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5)

  const fmt = (v: number) => {
    if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
    if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`
    return `$${v}`
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome to <span className="gradient-text">OTC Trading</span>
        </h1>
        <p className="mt-1 text-[hsl(215,20%,65%)]">
          Institutional-grade USDT/USD liquidity · Instant settlement
        </p>
      </div>

      {/* Top Cards Row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Current Price */}
        <div className="card glow-green bg-gradient-to-br from-emerald-500/10 to-transparent">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(215,20%,65%)]">Current Price</span>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-2 text-2xl font-bold">${currentPrice.toFixed(4)}</div>
            <div className={`mt-1 flex items-center gap-1 text-xs ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {isUp ? '+' : ''}{priceChange.toFixed(2)}% today
            </div>
          </div>
        </div>

        {/* Best Bid */}
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(215,20%,65%)]">Best Bid</span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-400">${bestBid.toFixed(4)}</div>
            <div className="mt-1 text-xs text-[hsl(215,20%,65%)]">{fmt(totalBidVol)} depth</div>
          </div>
        </div>

        {/* Best Ask */}
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(215,20%,65%)]">Best Ask</span>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </div>
            <div className="mt-2 text-2xl font-bold text-red-400">${bestAsk.toFixed(4)}</div>
            <div className="mt-1 text-xs text-[hsl(215,20%,65%)]">{fmt(totalAskVol)} depth</div>
          </div>
        </div>

        {/* 24h Volume */}
        <div className="card glow-blue bg-gradient-to-br from-cyan-500/10 to-transparent">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(215,20%,65%)]">24h Volume</span>
              <BarChart3 className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="mt-2 text-2xl font-bold">$47.2M</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-cyan-400">
              <Users className="h-3 w-3" /> 156 active traders
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Link href="/register">
          <button className="btn btn-primary">
            <ArrowUpRight className="h-4 w-4" /> Start Trading
          </button>
        </Link>
        <Link href="/kyb">
          <button className="btn btn-outline">
            <Shield className="h-4 w-4" /> KYB Verification
          </button>
        </Link>
        <button onClick={() => setShowChart(true)} className="btn btn-outline text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10">
          <LineChart className="h-4 w-4" /> View Chart
        </button>
        <a href="https://wello-p2p-demo.vercel.app/market" target="_blank" rel="noopener noreferrer">
          <button className="btn btn-outline">
            <Store className="h-4 w-4" /> Browse Market
          </button>
        </a>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Price Chart Card */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LineChart className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold">Price Chart (7D)</span>
              </div>
              <span className="badge badge-secondary">Spread: {spread.toFixed(3)}%</span>
            </div>
            <div className="h-[300px] p-4">
              <PriceChart data={mockPriceData} />
            </div>
          </div>

          {/* Top Traders Table */}
          <div className="card">
            <div className="card-header">
              <span className="font-semibold">Top Liquidity Providers</span>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[hsl(217,33%,17%)] text-xs text-[hsl(215,20%,65%)]">
                      <th className="pb-3 text-left font-medium">Rank</th>
                      <th className="pb-3 text-left font-medium">Trader</th>
                      <th className="pb-3 text-right font-medium">Completion</th>
                      <th className="pb-3 text-right font-medium">Response</th>
                      <th className="pb-3 text-right font-medium">Volume</th>
                      <th className="pb-3 text-center font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topTraders.map((trader, i) => (
                      <tr key={trader.id} className="border-b border-[hsl(217,33%,17%,0.3)] hover:bg-[hsl(217,33%,17%,0.3)]">
                        <td className="py-3">
                          <span className={`inline-flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                            i === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                            i === 1 ? 'bg-zinc-500/20 text-zinc-300' :
                            i === 2 ? 'bg-orange-500/20 text-orange-400' :
                            'bg-[hsl(217,33%,17%)] text-[hsl(215,20%,65%)]'
                          }`}>
                            {i + 1}
                          </span>
                        </td>
                        <td className="py-3 font-medium">{trader.trader}</td>
                        <td className="py-3 text-right text-emerald-400">{trader.completionRate}%</td>
                        <td className="py-3 text-right text-[hsl(215,20%,65%)]">
                          <span className="flex items-center justify-end gap-1">
                            <Clock className="h-3 w-3" /> {trader.responseTime}
                          </span>
                        </td>
                        <td className="py-3 text-right font-medium">{fmt(trader.volume)}</td>
                        <td className="py-3 text-center">
                          <button className="btn btn-ghost text-xs">
                            <Eye className="h-3 w-3" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* P2P Lending CTA */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="font-semibold">P2P Lending</span>
            </div>
            <div className="space-y-4 p-5">
              {/* Lender Card */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">Earn Yield</span>
                  <span className="badge badge-default">15-36% APY</span>
                </div>
                <p className="mb-4 text-xs text-[hsl(215,20%,65%)]">
                  Lend to verified borrowers in emerging markets with AI-matched counterparties.
                </p>
                <div className="mb-4 space-y-2 text-xs text-[hsl(215,20%,65%)]">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> KYB-verified borrowers
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> 8-layer risk control
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Smart contract escrow
                  </div>
                </div>
                <a
                  href="https://wello-p2p-demo.vercel.app/lender/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full justify-center"
                >
                  Explore Lending <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Borrower Card */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">Need Capital?</span>
                  <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs font-medium text-cyan-400">Borrow</span>
                </div>
                <p className="mb-4 text-xs text-[hsl(215,20%,65%)]">
                  Get matched with lenders for your business needs.
                </p>
                <a
                  href="https://wello-p2p-demo.vercel.app/borrower/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full justify-center text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
                >
                  Apply Now <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Market Info */}
          <div className="card">
            <div className="card-content">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[hsl(215,20%,65%)]">
                Market Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">OTC Desk</span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Settlement</span>
                  <span className="text-sm font-medium">Instant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Min Trade</span>
                  <span className="text-sm font-medium">$1,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Max Trade</span>
                  <span className="text-sm font-medium">$10,000,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Features */}
          <div className="card">
            <div className="card-content">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[hsl(215,20%,65%)]">
                Platform Features
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Zap className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Instant Settlement</div>
                    <div className="text-xs text-[hsl(215,20%,65%)]">Atomic swaps with escrow</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
                    <BarChart3 className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Deep Liquidity</div>
                    <div className="text-xs text-[hsl(215,20%,65%)]">Tight spreads for institutions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                    <Shield className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Secure Escrow</div>
                    <div className="text-xs text-[hsl(215,20%,65%)]">Multi-sig custody</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Modal */}
      {showChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowChart(false)} />
          <div className="card relative w-full max-w-5xl overflow-hidden">
            <div className="card-header flex items-center justify-between">
              <span className="font-semibold">USDT/USD Price Chart</span>
              <button onClick={() => setShowChart(false)} className="btn btn-ghost">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[500px] p-4">
              <PriceChart data={mockPriceData} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
