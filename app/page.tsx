'use client'

import { mockPriceData, mockSellQuotes, mockBuyQuotes } from '@/data/mockData'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Shield, Zap, TrendingUp, TrendingDown, Clock, Users, Activity, BarChart3 } from 'lucide-react'

const MiniChart = dynamic(() => import('@/components/MiniChart'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white/30 text-sm">Loading...</div>
    </div>
  ),
})

export default function OTCPage() {
  const currentPrice = mockPriceData[mockPriceData.length - 1].close
  const prevPrice = mockPriceData[mockPriceData.length - 2].close
  const priceChange = ((currentPrice - prevPrice) / prevPrice) * 100
  const isUp = priceChange >= 0

  const bestAsk = Math.min(...mockSellQuotes.map(q => q.price))
  const bestBid = Math.max(...mockBuyQuotes.map(q => q.price))

  // Top traders from mock data
  const topTraders = [...mockBuyQuotes, ...mockSellQuotes]
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 4)

  return (
    <main className="flex-1 overflow-hidden">
      <div className="h-full flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Top Stats Bar */}
          <div className="border-b border-white/5 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Price */}
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-white/40 mb-1">USDT/USD</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black font-number text-white">${currentPrice.toFixed(4)}</span>
                    <span className={`flex items-center gap-1 text-sm font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {isUp ? '+' : ''}{priceChange.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div>
                  <div className="text-xs text-white/40 mb-1">Best Bid</div>
                  <div className="text-lg font-bold font-number text-emerald-400">${bestBid.toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-1">Best Ask</div>
                  <div className="text-lg font-bold font-number text-rose-400">${bestAsk.toFixed(4)}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-white/40 mb-1">24h Volume</div>
                  <div className="text-lg font-bold font-number text-white">$47.2M</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/40 mb-1">Spread</div>
                  <div className="text-lg font-bold font-number text-emerald-400">0.15%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/40 mb-1">Active</div>
                  <div className="text-lg font-bold font-number text-white">156</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions Card */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-[#00F5D4]" />
                  Quick Actions
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link
                    href="/register"
                    className="flex items-center justify-between p-4 rounded-xl btn-primary glow-primary group"
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp size={20} />
                      <div>
                        <div className="font-bold">Start Trading</div>
                        <div className="text-xs opacity-70">Create a new order</div>
                      </div>
                    </div>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/kyb"
                    className="flex items-center justify-between p-4 rounded-xl glass-card border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-[#7B61FF]" />
                      <div>
                        <div className="font-bold text-white">KYB Verification</div>
                        <div className="text-xs text-white/50">Unlock full access</div>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-white/40 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Features Card */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap size={18} className="text-[#7B61FF]" />
                  Platform Features
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <Zap size={20} className="text-[#00F5D4] mb-3" />
                    <div className="font-semibold text-white text-sm mb-1">Instant Settlement</div>
                    <div className="text-xs text-white/40">Atomic swaps & smart contract escrow</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <BarChart3 size={20} className="text-[#7B61FF] mb-3" />
                    <div className="font-semibold text-white text-sm mb-1">Deep Liquidity</div>
                    <div className="text-xs text-white/40">Tight spreads for institutional volumes</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <Shield size={20} className="text-[#FF6B9D] mb-3" />
                    <div className="font-semibold text-white text-sm mb-1">Secure Escrow</div>
                    <div className="text-xs text-white/40">Multi-sig custody & audited contracts</div>
                  </div>
                </div>
              </div>

              {/* Top Traders Card */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Users size={18} className="text-[#FF6B9D]" />
                  Top Liquidity Providers
                </h2>
                <div className="space-y-3">
                  {topTraders.map((trader, i) => (
                    <div key={trader.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F5D4]/20 to-[#7B61FF]/20 flex items-center justify-center text-xs font-bold text-white">
                          #{i + 1}
                        </div>
                        <div>
                          <div className="font-medium text-white text-sm">{trader.trader}</div>
                          <div className="text-xs text-white/40 flex items-center gap-2">
                            <span>{trader.completionRate}% completion</span>
                            <span>·</span>
                            <Clock size={10} />
                            <span>{trader.responseTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-number text-white text-sm">${trader.volume.toLocaleString()}</div>
                        <div className="text-xs text-white/40">volume</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - P2P CTA */}
            <div className="space-y-6">
              {/* P2P Lending CTA */}
              <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp size={16} className="text-emerald-400" />
                  </div>
                  <div className="text-sm font-bold text-emerald-400">P2P Lending</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Earn Yield on Idle Capital</h3>
                <p className="text-sm text-white/50 mb-4">
                  Lend to verified borrowers in emerging markets. AI-matched, 15-36% APY.
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

              {/* Market Status */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Market Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">OTC Desk</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Settlement</span>
                    <span className="text-sm font-medium text-white">Instant</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Min Trade</span>
                    <span className="text-sm font-medium text-white font-number">$1,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Max Trade</span>
                    <span className="text-sm font-medium text-white font-number">$10M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Chart & Liquidity */}
        <div className="w-72 lg:w-80 flex-shrink-0 border-l border-white/5 bg-[#08080C] hidden lg:flex flex-col">
          <MiniChart
            data={mockPriceData}
            currentPrice={currentPrice}
            sellQuotes={mockSellQuotes}
            buyQuotes={mockBuyQuotes}
          />
        </div>
      </div>
    </main>
  )
}
