'use client'

import { mockPriceData, mockSellQuotes, mockBuyQuotes } from '@/data/mockData'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, TrendingUp, TrendingDown, Activity } from 'lucide-react'

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

  // Mock stats
  const stats = {
    volume24h: '$47.2M',
    trades24h: '1,247',
    avgSpread: '0.15%',
  }

  return (
    <main className="flex-1 overflow-hidden">
      <div className="h-full flex">
        {/* Left Section - Main Trading Area */}
        <div className="flex-1 flex flex-col p-6 lg:p-8">
          {/* Top Row - Price & Stats */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl lg:text-5xl font-black font-number text-white">
                  ${currentPrice.toFixed(4)}
                </span>
                <span className={`flex items-center gap-1 text-sm font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {isUp ? '+' : ''}{priceChange.toFixed(2)}%
                </span>
              </div>
              <p className="text-white/40 text-sm mt-1">USDT / USD · OTC Rate</p>
            </div>

            <div className="flex items-center gap-6 text-right">
              <div>
                <div className="text-white/40 text-xs mb-1">24h Volume</div>
                <div className="text-lg font-bold font-number text-white">{stats.volume24h}</div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-1">24h Trades</div>
                <div className="text-lg font-bold font-number text-white">{stats.trades24h}</div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-1">Avg Spread</div>
                <div className="text-lg font-bold font-number text-emerald-400">{stats.avgSpread}</div>
              </div>
            </div>
          </div>

          {/* Center - CTA Cards */}
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-3xl w-full">
              {/* Main CTA */}
              <div className="text-center mb-10">
                <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">
                  Institutional <span className="gradient-text">OTC Trading</span>
                </h1>
                <p className="text-white/50 text-lg max-w-lg mx-auto">
                  Deep liquidity. Competitive rates. Secure settlement.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold btn-primary glow-primary w-full sm:w-auto justify-center"
                >
                  <TrendingUp size={20} />
                  Start Trading
                </Link>
                <Link
                  href="/kyb"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold btn-secondary w-full sm:w-auto justify-center"
                >
                  <Shield size={20} />
                  Complete KYB Verification
                </Link>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-white/60">
                  <Zap size={14} className="text-[#00F5D4]" />
                  Instant Settlement
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-white/60">
                  <Shield size={14} className="text-[#7B61FF]" />
                  Multi-Sig Escrow
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-white/60">
                  <Activity size={14} className="text-[#FF6B9D]" />
                  24/7 Support
                </div>
              </div>

              {/* P2P Lending CTA */}
              <div className="mt-12 pt-8 border-t border-white/5 text-center">
                <p className="text-white/40 text-sm mb-3">Looking for yield on idle capital?</p>
                <a
                  href="https://wello-p2p-demo.vercel.app/lender/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  Explore P2P Lending
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Chart & Liquidity */}
        <div className="w-80 lg:w-96 flex-shrink-0 border-l border-white/5 bg-[#08080C] hidden md:flex flex-col">
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
