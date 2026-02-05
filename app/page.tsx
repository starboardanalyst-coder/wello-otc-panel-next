'use client'

import { mockPriceData, mockSellQuotes, mockBuyQuotes } from '@/data/mockData'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { 
  Zap, Shield, Clock, TrendingUp, BarChart3, 
  ArrowRight, DollarSign, Users, Activity,
  Wallet, Globe, Lock, RefreshCw
} from 'lucide-react'

const MiniChart = dynamic(() => import('@/components/MiniChart'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white/30 text-sm">Loading chart...</div>
    </div>
  ),
})

const steps = [
  { icon: Wallet, title: 'Connect', desc: 'Link your institutional wallet' },
  { icon: DollarSign, title: 'Quote', desc: 'Get competitive OTC rates' },
  { icon: RefreshCw, title: 'Trade', desc: 'Execute with verified counterparties' },
  { icon: Lock, title: 'Settle', desc: 'Instant on-chain settlement' },
]

const features = [
  {
    icon: Zap,
    title: 'Instant Settlement',
    desc: 'Near-instant settlement with atomic swaps and smart contract escrow',
    color: '#00F5D4',
  },
  {
    icon: BarChart3,
    title: 'Competitive Rates',
    desc: 'Deep liquidity pools with tight spreads for institutional volumes',
    color: '#7B61FF',
  },
  {
    icon: Shield,
    title: 'Secure Escrow',
    desc: 'Multi-sig custody and audited smart contracts protect every trade',
    color: '#FF6B9D',
  },
]

const stats = [
  { label: '24h Volume', value: '$47.2M', change: '+12.5%', positive: true },
  { label: 'Active Pairs', value: '24', change: '+3', positive: true },
  { label: 'Avg Spread', value: '0.15%', change: '-0.02%', positive: true },
  { label: 'Active Traders', value: '156', change: '+8', positive: true },
]

export default function DashboardPage() {
  const currentPrice = mockPriceData[mockPriceData.length - 1].close

  return (
    <main className="flex-1 overflow-auto">
      <div className="flex h-full">
        {/* Main Content - Left 5/6 */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-6 py-8">
            
            {/* Hero Section */}
            <section className="mb-12">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-black mb-3">
                    <span className="gradient-text">Wello OTC Exchange</span>
                  </h1>
                  <p className="text-lg text-white/60 max-w-xl leading-relaxed">
                    Institutional-grade stablecoin trading with deep liquidity, 
                    competitive rates, and secure settlement.
                  </p>
                </div>
                <a
                  href="https://wello-p2p-demo.vercel.app/lender/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 glow-green"
                >
                  <span>Try P2P Lending</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3 mt-6">
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold btn-primary glow-primary"
                >
                  <TrendingUp size={16} />
                  Start Trading
                </Link>
                <Link
                  href="/kyb"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold btn-secondary"
                >
                  <Shield size={16} />
                  Complete KYB
                </Link>
              </div>
            </section>

            {/* Stats Row */}
            <section className="mb-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="dashboard-card p-4">
                    <div className="text-xs text-white/40 mb-1">{stat.label}</div>
                    <div className="text-2xl font-black font-number text-white">{stat.value}</div>
                    <div className={`text-xs font-medium mt-1 ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section className="mb-10">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity size={18} className="text-[#7B61FF]" />
                Platform Features
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {features.map((feature) => (
                  <div key={feature.title} className="feature-card group">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                      style={{ 
                        background: `${feature.color}20`,
                        boxShadow: `0 0 20px ${feature.color}10`
                      }}
                    >
                      <feature.icon size={20} style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How it Works */}
            <section className="mb-10">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Globe size={18} className="text-[#00F5D4]" />
                How It Works
              </h2>
              <div className="dashboard-card p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {steps.map((step, i) => (
                    <div key={step.title} className="relative">
                      {/* Connector line */}
                      {i < steps.length - 1 && (
                        <div className="hidden md:block absolute top-5 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-gradient-to-r from-white/10 to-white/5" />
                      )}
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F5D4]/20 to-[#7B61FF]/20 border border-white/10 flex items-center justify-center mb-3 relative z-10">
                          <step.icon size={18} className="text-[#00F5D4]" />
                        </div>
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1">
                          Step {i + 1}
                        </div>
                        <h3 className="text-sm font-bold text-white mb-0.5">{step.title}</h3>
                        <p className="text-[11px] text-white/40">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Recent Activity / Top Traders */}
            <section>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users size={18} className="text-[#FF6B9D]" />
                Top Liquidity Providers
              </h2>
              <div className="dashboard-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left text-xs font-medium text-white/40 p-4">Trader</th>
                      <th className="text-right text-xs font-medium text-white/40 p-4">Volume</th>
                      <th className="text-right text-xs font-medium text-white/40 p-4">Rating</th>
                      <th className="text-right text-xs font-medium text-white/40 p-4">Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...mockBuyQuotes, ...mockSellQuotes]
                      .sort((a, b) => b.volume - a.volume)
                      .slice(0, 5)
                      .map((quote) => (
                        <tr key={quote.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F5D4]/20 to-[#7B61FF]/20 flex items-center justify-center text-xs font-bold text-white">
                                {quote.trader.charAt(0)}
                              </div>
                              <span className="font-medium text-white">{quote.trader}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right font-number font-medium text-white">
                            ${quote.volume.toLocaleString()}
                          </td>
                          <td className="p-4 text-right">
                            <span className="text-emerald-400 font-medium">{quote.completionRate}%</span>
                          </td>
                          <td className="p-4 text-right text-white/50 flex items-center justify-end gap-1">
                            <Clock size={12} />
                            {quote.responseTime}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        {/* Right Panel - Chart & Depth (1/6 width) */}
        <div className="w-72 lg:w-80 flex-shrink-0 border-l border-white/5 bg-[#0A0A0F]/80 hidden md:block">
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
