'use client'

import { useState } from 'react'
import { mockPriceData, mockSellQuotes, mockBuyQuotes } from '@/data/mockData'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { 
  ArrowUpRight, ArrowDownRight, Shield, Zap, TrendingUp, TrendingDown, 
  Clock, Users, BarChart3, LineChart, X, Wallet, DollarSign,
  ExternalLink, Store, Star, Eye, Plus, Sparkles
} from 'lucide-react'

const MiniChart = dynamic(() => import('@/components/MiniChart'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-zinc-500 text-sm">Loading chart...</div>
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

  const formatVol = (v: number) => {
    if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
    if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`
    return `$${v}`
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">OTC Trading</span>
        </h1>
        <p className="mt-1 text-zinc-400">Institutional-grade USDT/USD liquidity · Instant settlement</p>
      </div>

      {/* Top Cards Row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Current Price */}
        <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-emerald-500/10 to-transparent p-5 shadow-lg shadow-emerald-500/5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Current Price</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold">${currentPrice.toFixed(4)}</div>
          <div className={`mt-1 flex items-center gap-1 text-xs ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
            {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {isUp ? '+' : ''}{priceChange.toFixed(2)}% today
          </div>
        </div>

        {/* Best Bid */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Best Bid</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400">${bestBid.toFixed(4)}</div>
          <div className="mt-1 text-xs text-zinc-500">{formatVol(totalBidVol)} depth</div>
        </div>

        {/* Best Ask */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Best Ask</span>
            <TrendingDown className="h-4 w-4 text-red-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-red-400">${bestAsk.toFixed(4)}</div>
          <div className="mt-1 text-xs text-zinc-500">{formatVol(totalAskVol)} depth</div>
        </div>

        {/* 24h Volume */}
        <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-cyan-500/10 to-transparent p-5 shadow-lg shadow-cyan-500/5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">24h Volume</span>
            <BarChart3 className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold">$47.2M</div>
          <div className="mt-1 flex items-center gap-1 text-xs text-cyan-400">
            <Users className="h-3 w-3" /> 156 active traders
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Link href="/register">
          <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            <ArrowUpRight className="h-4 w-4" /> Start Trading
          </button>
        </Link>
        <Link href="/kyb">
          <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors">
            <Shield className="h-4 w-4" /> KYB Verification
          </button>
        </Link>
        <button
          onClick={() => setShowChart(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-transparent px-4 py-2.5 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-colors"
        >
          <LineChart className="h-4 w-4" /> View Chart
        </button>
        <Link href="https://wello-p2p-demo.vercel.app/market" target="_blank">
          <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors">
            <Store className="h-4 w-4" /> Browse Market
          </button>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Price Chart Card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <div className="flex items-center gap-2">
                <LineChart className="h-4 w-4 text-emerald-400" />
                <h2 className="font-semibold">Price Chart (7D)</h2>
              </div>
              <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                Spread: {spread.toFixed(3)}%
              </span>
            </div>
            <div className="h-[280px] p-4">
              <MiniChart
                data={mockPriceData}
                currentPrice={currentPrice}
                sellQuotes={mockSellQuotes}
                buyQuotes={mockBuyQuotes}
                compact
              />
            </div>
          </div>

          {/* Top Traders Table */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="border-b border-zinc-800 px-5 py-4">
              <h2 className="font-semibold">Top Liquidity Providers</h2>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 text-xs text-zinc-500">
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
                      <tr key={trader.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className="py-3">
                          <span className={`inline-flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                            i === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                            i === 1 ? 'bg-zinc-500/20 text-zinc-300' :
                            i === 2 ? 'bg-orange-500/20 text-orange-400' :
                            'bg-zinc-800 text-zinc-500'
                          }`}>
                            {i + 1}
                          </span>
                        </td>
                        <td className="py-3 font-medium">{trader.trader}</td>
                        <td className="py-3 text-right text-emerald-400">{trader.completionRate}%</td>
                        <td className="py-3 text-right text-zinc-400">
                          <span className="flex items-center justify-end gap-1">
                            <Clock className="h-3 w-3" /> {trader.responseTime}
                          </span>
                        </td>
                        <td className="py-3 text-right font-medium">{formatVol(trader.volume)}</td>
                        <td className="py-3 text-center">
                          <button className="inline-flex items-center gap-1 rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-700">
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
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="border-b border-zinc-800 px-5 py-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <h2 className="font-semibold">P2P Lending</h2>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">Earn Yield</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                    15-36% APY
                  </span>
                </div>
                <p className="mb-4 text-xs text-zinc-400">
                  Lend to verified borrowers in emerging markets with AI-matched counterparties.
                </p>
                <div className="mb-4 space-y-2 text-xs text-zinc-400">
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
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Explore Lending <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">Need Capital?</span>
                  <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs font-semibold text-cyan-400">
                    Borrow
                  </span>
                </div>
                <p className="mb-4 text-xs text-zinc-400">
                  Get matched with lenders for your business needs.
                </p>
                <a
                  href="https://wello-p2p-demo.vercel.app/borrower/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-500/30 py-2.5 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/10"
                >
                  Apply Now <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Market Info */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Market Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">OTC Desk</span>
                <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Settlement</span>
                <span className="text-sm font-medium">Instant</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Min Trade</span>
                <span className="text-sm font-medium">$1,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Max Trade</span>
                <span className="text-sm font-medium">$10,000,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Modal */}
      {showChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowChart(false)}
          />
          <div className="relative w-full max-w-5xl rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <h2 className="font-semibold">USDT/USD Price Chart</h2>
              <button
                onClick={() => setShowChart(false)}
                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[500px]">
              <MiniChart
                data={mockPriceData}
                currentPrice={currentPrice}
                sellQuotes={mockSellQuotes}
                buyQuotes={mockBuyQuotes}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
