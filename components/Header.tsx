'use client'

import { Plus, Building2, ArrowUpRight } from 'lucide-react'
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

export function Header({ asset, setAsset }: HeaderProps) {
  const pathname = usePathname()
  const assets = ['USDT/USD', 'USDC/USD', 'DAI/USD']

  return (
    <header className="h-14 glass-ultra border-b border-white/5 px-6 flex items-center justify-between relative z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-all duration-300">
        <img src="/wello-logo.png" alt="Wello" className="h-7" />
        <div className="hidden sm:flex items-center gap-2">
          <h1 className="text-sm font-bold tracking-tight">
            <span className="gradient-text">OTC Desk</span>
          </h1>
        </div>
      </Link>

      {/* Right - Navigation */}
      <div className="flex items-center gap-3">
        {/* Asset Selector */}
        <select
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
          className="appearance-none glass-card rounded-xl px-4 py-2 pr-8 text-xs font-bold text-white cursor-pointer focus:outline-none hover:border-white/20 transition-all"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
        >
          {assets.map((a) => (
            <option key={a} value={a} className="bg-[#0A0A0F]">{a}</option>
          ))}
        </select>

        <div className="w-px h-6 bg-white/10" />

        <Link
          href="/register"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            pathname === '/register'
              ? 'btn-primary'
              : 'glass-card text-white/70 hover:text-white'
          }`}
        >
          <Plus size={14} />
          <span className="hidden lg:inline">Post Order</span>
        </Link>

        <Link
          href="/kyb"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            pathname === '/kyb'
              ? 'btn-primary'
              : 'glass-card text-white/70 hover:text-white'
          }`}
        >
          <Building2 size={14} />
          <span className="hidden lg:inline">KYB</span>
        </Link>

        <div className="w-px h-6 bg-white/10" />

        {/* P2P Lending Link */}
        <a
          href="https://wello-p2p-demo.vercel.app/lender/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all"
        >
          <span>P2P Lending</span>
          <ArrowUpRight size={12} />
        </a>
      </div>
    </header>
  )
}
