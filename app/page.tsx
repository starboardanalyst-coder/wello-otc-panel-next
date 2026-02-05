'use client'

import { useState } from 'react'
import { mockPriceData, mockSellQuotes, mockBuyQuotes } from '@/data/mockData'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { 
  ArrowRight, ArrowUpRight, Shield, Zap, TrendingUp, TrendingDown, 
  Clock, Users, BarChart3, LineChart, X, Wallet, DollarSign,
  ExternalLink, Store, Star
} from 'lucide-react'

const MiniChart = dynamic(() => import('@/components/MiniChart'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white/30 text-sm">Loading chart...</div>
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
    <main className="flex-1 overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">USDT/USD</span> OTC Trading
          </h1>
          <p className="mt-2 text-lg text-white/50">
            Institutional-grade liquidity · Instant settlement · Zero counterparty risk
          </p>
        </div>

        {/* Top Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Current Price */}
          <div className="glass-card rounded-2xl p-5 bg-gradient-to-br from-[#00F5D4]/10 to-transparent border border-[#00F5D4]/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">Current Price</span>
              <DollarSign className="h-4 w-4 text-[#00F5D4]" />
            </div>
            <div className="mt-2 text-3xl font-bold font-number">${currentPrice.toFixed(4)}</div>
            <div className={`mt-1 flex items-center gap-1 text-sm ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {isUp ? '+' : ''}{priceChange.toFixed(2)}% today
            </div>
          </div>

          {/* Best Bid */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">Best Bid</span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-2 text-3xl font-bold font-number text-emerald-400">${bestBid.toFixed(4)}</div>
            <div className="mt-1 text-sm text-white/40">{formatVol(totalBidVol)} depth</div>
          </div>

          {/* Best Ask */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">Best Ask</span>
              <TrendingDown className="h-4 w-4 text-rose-400" />
            </div>
            <div className="mt-2 text-3xl font-bold font-number text-rose-400">${bestAsk.toFixed(4)}</div>
            <div className="mt-1 text-sm text-white/40">{formatVol(totalAskVol)} depth</div>
          </div>

          {/* 24h Volume */}
          <div className="glass-card rounded-2xl p-5 bg-gradient-to-br from-[#7B61FF]/10 to-transparent border border-[#7B61FF]/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">24h Volume</span>
              <BarChart3 className="h-4 w-4 text-[#7B61FF]" />
            </div>
            <div className="mt-2 text-3xl font-bold font-number">$47.2M</div>
            <div className="mt-1 flex items-center gap-1 text-sm text-[#7B61FF]">
              <Users className="h-3 w-3" /> 156 active traders
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Link href="/register">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00F5D4] text-black font-bold hover:bg-[#00F5D4]/90 transition-colors">
              <ArrowUpRight className="h-5 w-5" /> Start Trading
            </button>
          </Link>
          <Link href="/kyb">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border border-white/10 hover:border-[#7B61FF]/50 font-semibold transition-colors">
              <Shield className="h-5 w-5 text-[#7B61FF]" /> KYB Verification
            </button>
          </Link>
          <button
            onClick={() => setShowChart(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border border-white/10 hover:border-[#00F5D4]/50 font-semibold transition-colors"
          >
            <LineChart className="h-5 w-5 text-[#00F5D4]" /> View Chart
          </button>
          <Link href="https://wello-p2p-demo.vercel.app/market" target="_blank">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border border-white/10 hover:border-white/20 font-semibold transition-colors">
              <Store className="h-5 w-5" /> Browse Market
            </button>
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Features + Traders */}
          <div className="space-y-6 lg:col-span-2">
            {/* Platform Features */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#00F5D4]" />
                Platform Features
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 hover:border-[#00F5D4]/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#00F5D4]/10 flex items-center justify-center mb-3">
                    <Zap className="h-5 w-5 text-[#00F5D4]" />
                  </div>
                  <h3 className="font-semibold mb-1">Instant Settlement</h3>
                  <p className="text-sm text-white/40">Atomic swaps with smart contract escrow</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 hover:border-[#7B61FF]/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#7B61FF]/10 flex items-center justify-center mb-3">
                    <BarChart3 className="h-5 w-5 text-[#7B61FF]" />
                  </div>
                  <h3 className="font-semibold mb-1">Deep Liquidity</h3>
                  <p className="text-sm text-white/40">Tight spreads for institutional volumes</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 hover:border-[#FF6B9D]/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#FF6B9D]/10 flex items-center justify-center mb-3">
                    <Shield className="h-5 w-5 text-[#FF6B9D]" />
                  </div>
                  <h3 className="font-semibold mb-1">Secure Escrow</h3>
                  <p className="text-sm text-white/40">Multi-sig custody & audited contracts</p>
                </div>
              </div>
            </div>

            {/* Top Traders */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#7B61FF]" />
                  Top Liquidity Providers
                </h2>
                <span className="text-xs text-white/40 px-2 py-1 rounded-full bg-white/5">Last 24h</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-xs text-white/40">
                      <th className="pb-3 text-left font-medium">Rank</th>
                      <th className="pb-3 text-left font-medium">Trader</th>
                      <th className="pb-3 text-right font-medium">Completion</th>
                      <th className="pb-3 text-right font-medium">Response</th>
                      <th className="pb-3 text-right font-medium">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topTraders.map((trader, i) => (
                      <tr key={trader.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="py-4">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                            i === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                            i === 1 ? 'bg-gray-400/20 text-gray-300' :
                            i === 2 ? 'bg-orange-500/20 text-orange-400' :
                            'bg-white/5 text-white/40'
                          }`}>
                            {i + 1}
                          </span>
                        </td>
                        <td className="py-4 font-medium">{trader.trader}</td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-emerald-400 rounded-full" 
                                style={{ width: `${trader.completionRate}%` }} 
                              />
                            </div>
                            <span className="text-white/60">{trader.completionRate}%</span>
                          </div>
                        </td>
                        <td className="py-4 text-right text-white/60">
                          <span className="flex items-center justify-end gap-1">
                            <Clock className="h-3 w-3" /> {trader.responseTime}
                          </span>
                        </td>
                        <td className="py-4 text-right font-bold font-number">{formatVol(trader.volume)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: P2P Lending CTA */}
          <div className="space-y-6">
            {/* P2P Lending - BIG CTA */}
            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-emerald-400 font-medium">P2P Lending</div>
                  <div className="text-xl font-bold">Earn 15-36% APY</div>
                </div>
              </div>
              
              <p className="text-white/50 mb-6">
                Lend to verified borrowers in emerging markets. AI-matched counterparties with institutional-grade risk controls.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400 text-xs">✓</span>
                  </div>
                  <span className="text-white/70">KYB-verified borrowers only</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400 text-xs">✓</span>
                  </div>
                  <span className="text-white/70">8-layer risk control system</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400 text-xs">✓</span>
                  </div>
                  <span className="text-white/70">Smart contract escrow</span>
                </div>
              </div>

              <a
                href="https://wello-p2p-demo.vercel.app/lender/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-emerald-500 text-black font-bold text-lg hover:bg-emerald-400 transition-colors"
              >
                Explore P2P Lending
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>

            {/* Market Status */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Market Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">OTC Desk</span>
                  <span className="flex items-center gap-2 font-medium text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Settlement</span>
                  <span className="font-medium">Instant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Spread</span>
                  <span className="font-medium font-number text-[#00F5D4]">{spread.toFixed(3)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Min Trade</span>
                  <span className="font-medium font-number">$1,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Max Trade</span>
                  <span className="font-medium font-number">$10M</span>
                </div>
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
          <div className="relative w-full max-w-5xl h-[550px] glass-card rounded-2xl overflow-hidden border border-white/10">
            <button
              onClick={() => setShowChart(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <MiniChart
              data={mockPriceData}
              currentPrice={currentPrice}
              sellQuotes={mockSellQuotes}
              buyQuotes={mockBuyQuotes}
            />
          </div>
        </div>
      )}
    </main>
  )
}
