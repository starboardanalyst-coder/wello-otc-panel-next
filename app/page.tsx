'use client'

import { useState } from 'react'
import { mockPriceData, mockSellQuotes, mockBuyQuotes } from '@/data/mockData'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { 
  ArrowRight, ArrowUpRight, Shield, Zap, TrendingUp, TrendingDown, 
  Clock, Users, Activity, BarChart3, LineChart, X, ChevronRight 
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
      {/* Hero Section */}
      <section className="px-6 lg:px-12 py-8 lg:py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Price & CTA */}
            <div>
              <div className="text-sm text-white/40 mb-2">USDT/USD OTC Market</div>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-5xl lg:text-6xl font-black font-number text-white">
                  ${currentPrice.toFixed(4)}
                </span>
                <span className={`flex items-center gap-1 text-lg font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isUp ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  {isUp ? '+' : ''}{priceChange.toFixed(2)}%
                </span>
              </div>
              
              <p className="text-white/50 text-lg mb-6 max-w-md">
                Institutional-grade OTC trading with deep liquidity, tight spreads, and instant settlement.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary glow-primary font-bold"
                >
                  Start Trading
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/kyb"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border border-white/10 hover:border-white/20 font-semibold text-white transition-all"
                >
                  <Shield size={18} className="text-[#7B61FF]" />
                  KYB Verification
                </Link>
                <button
                  onClick={() => setShowChart(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border border-white/10 hover:border-[#00F5D4]/50 font-semibold text-white transition-all"
                >
                  <LineChart size={18} className="text-[#00F5D4]" />
                  View Chart
                </button>
              </div>
            </div>

            {/* Right - Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-4">
                <div className="text-xs text-white/40 mb-1">Best Bid</div>
                <div className="text-xl font-bold font-number text-emerald-400">${bestBid.toFixed(4)}</div>
                <div className="text-xs text-white/30 mt-1">{formatVol(totalBidVol)} depth</div>
              </div>
              <div className="glass-card rounded-xl p-4">
                <div className="text-xs text-white/40 mb-1">Best Ask</div>
                <div className="text-xl font-bold font-number text-rose-400">${bestAsk.toFixed(4)}</div>
                <div className="text-xs text-white/30 mt-1">{formatVol(totalAskVol)} depth</div>
              </div>
              <div className="glass-card rounded-xl p-4">
                <div className="text-xs text-white/40 mb-1">Spread</div>
                <div className="text-xl font-bold font-number text-[#00F5D4]">{spread.toFixed(3)}%</div>
                <div className="text-xs text-white/30 mt-1">Tight spreads</div>
              </div>
              <div className="glass-card rounded-xl p-4">
                <div className="text-xs text-white/40 mb-1">24h Volume</div>
                <div className="text-xl font-bold font-number text-white">$47.2M</div>
                <div className="text-xs text-white/30 mt-1">156 traders</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-12 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card rounded-2xl p-6 hover:border-[#00F5D4]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#00F5D4]/10 flex items-center justify-center mb-4">
                <Zap size={24} className="text-[#00F5D4]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Settlement</h3>
              <p className="text-sm text-white/50">Atomic swaps with smart contract escrow. No counterparty risk, no waiting.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 hover:border-[#7B61FF]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#7B61FF]/10 flex items-center justify-center mb-4">
                <BarChart3 size={24} className="text-[#7B61FF]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Deep Liquidity</h3>
              <p className="text-sm text-white/50">Access institutional-grade liquidity with tight spreads for any volume.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 hover:border-[#FF6B9D]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B9D]/10 flex items-center justify-center mb-4">
                <Shield size={24} className="text-[#FF6B9D]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Secure Escrow</h3>
              <p className="text-sm text-white/50">Multi-sig custody with audited smart contracts. Your funds, protected.</p>
            </div>
          </div>

          {/* Bottom Row - Traders + P2P CTA */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Top Traders */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users size={18} className="text-[#7B61FF]" />
                  Top Liquidity Providers
                </h3>
                <span className="text-xs text-white/40">Last 24h</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-white/40 border-b border-white/5">
                      <th className="text-left py-2 font-medium">Rank</th>
                      <th className="text-left py-2 font-medium">Trader</th>
                      <th className="text-left py-2 font-medium">Completion</th>
                      <th className="text-left py-2 font-medium">Response</th>
                      <th className="text-right py-2 font-medium">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topTraders.map((trader, i) => (
                      <tr key={trader.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="py-3">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${
                            i === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                            i === 1 ? 'bg-gray-400/20 text-gray-300' :
                            i === 2 ? 'bg-orange-500/20 text-orange-400' :
                            'bg-white/5 text-white/40'
                          }`}>
                            {i + 1}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="font-medium text-white">{trader.trader}</span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-emerald-400 rounded-full" 
                                style={{ width: `${trader.completionRate}%` }} 
                              />
                            </div>
                            <span className="text-xs text-white/60">{trader.completionRate}%</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="text-sm text-white/60 flex items-center gap-1">
                            <Clock size={12} />
                            {trader.responseTime}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <span className="font-bold font-number text-white">{formatVol(trader.volume)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* P2P Lending CTA */}
            <div className="glass-card rounded-2xl p-6 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp size={20} className="text-emerald-400" />
                </div>
                <span className="text-sm font-bold text-emerald-400">P2P Lending</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Earn Yield on Idle Capital</h3>
              <p className="text-sm text-white/50 mb-4 flex-1">
                Lend to verified borrowers in emerging markets. AI-matched counterparties, 15-36% APY, institutional-grade risk controls.
              </p>
              <a
                href="https://wello-p2p-demo.vercel.app/lender/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors"
              >
                Explore P2P Lending
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Modal/Drawer */}
      {showChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowChart(false)}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-4xl h-[500px] glass-card rounded-2xl overflow-hidden border border-white/10">
            <button
              onClick={() => setShowChart(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X size={18} />
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
