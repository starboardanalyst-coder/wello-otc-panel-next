'use client'

import { TrendingUp, BarChart3, ChevronDown, Plus, Building2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  asset: string
  setAsset: (asset: string) => void
  chartType: 'line' | 'candle'
  setChartType: (type: 'line' | 'candle') => void
  timeRange: '1H' | '24H' | '7D' | '30D'
  setTimeRange: (range: '1H' | '24H' | '7D' | '30D') => void
}

export function Header({
  asset,
  setAsset,
  chartType,
  setChartType,
  timeRange,
  setTimeRange,
}: HeaderProps) {
  const pathname = usePathname()
  const assets = ['USDT/USD', 'USDC/USD', 'DAI/USD']
  const timeRanges: ('1H' | '24H' | '7D' | '30D')[] = ['1H', '24H', '7D', '30D']
  const isMarket = pathname === '/'

  return (
    <header className="h-12 glass-ultra border-b border-white/5 px-6 flex items-center justify-between relative z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 relative z-10 group">
        <img src="/wello-logo.png" alt="Wello" className="h-7 transition-transform duration-300 group-hover:scale-105" />
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] font-medium text-white/40 tracking-widest uppercase">Institutional</span>
          <h1 className="text-sm font-bold tracking-tight">
            <span className="gradient-text">OTC Desk</span>
          </h1>
        </div>
      </Link>

      {/* Center Controls - only on market page */}
      {isMarket && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          {/* Chart Type Toggle */}
          <div className="flex glass-card rounded-xl p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all duration-300 ${
                chartType === 'line'
                  ? 'bg-white/10 text-white shadow-lg'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <TrendingUp size={13} />
              <span className="hidden md:inline">Line</span>
            </button>
            <button
              onClick={() => setChartType('candle')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all duration-300 ${
                chartType === 'candle'
                  ? 'bg-white/10 text-white shadow-lg'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <BarChart3 size={13} />
              <span className="hidden md:inline">Candle</span>
            </button>
          </div>

          <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Time Range */}
          <div className="flex glass-card rounded-xl p-1">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-[#00F5D4]/20 to-[#7B61FF]/20 text-[#00F5D4] shadow-lg'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Right - Navigation & Asset */}
      <div className="flex items-center gap-3 relative z-10">
        <Link
          href="/register"
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
            pathname === '/register'
              ? 'btn-primary glow-primary'
              : 'glass-card text-white/70 hover:text-white hover:border-white/20'
          }`}
        >
          <Plus size={14} strokeWidth={2.5} />
          <span className="hidden lg:inline">Post Order</span>
        </Link>

        <Link
          href="/kyb"
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
            pathname === '/kyb'
              ? 'btn-primary glow-primary'
              : 'glass-card text-white/70 hover:text-white hover:border-white/20'
          }`}
        >
          <Building2 size={14} />
          <span className="hidden lg:inline">KYB</span>
        </Link>

        <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Asset Selector */}
        <div className="relative group">
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="appearance-none glass-card rounded-xl px-4 py-1.5 pr-8 text-xs font-bold text-white cursor-pointer focus:outline-none focus:border-[#00F5D4]/50 hover:border-white/20 transition-all duration-300"
          >
            {assets.map((a) => (
              <option key={a} value={a} className="bg-[#0A0A0F]">{a}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={14} />
        </div>
      </div>
    </header>
  )
}
