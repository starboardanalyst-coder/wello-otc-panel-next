'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Store,
  FileText,
  Shield,
  Bell,
  Menu,
  X,
  ChevronDown,
  LineChart,
  ExternalLink,
} from 'lucide-react'

const navLinks = [
  { href: '/', label: 'OTC Trading', icon: LayoutDashboard },
  { href: '/agent', label: 'AI Agent', icon: LineChart },
  { href: '/reputation', label: 'Reputation', icon: Shield },
  { href: '/escrow', label: 'Escrow', icon: Shield },
  { href: '/trade', label: 'Trade Flow', icon: FileText },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-[hsl(217,33%,17%,0.5)] bg-[hsl(222,47%,6%,0.8)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500">
            <span className="text-sm font-bold text-white">W</span>
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-text">Wello</span>
            <span className="ml-1 text-[hsl(215,20%,65%)]">OTC</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[hsl(217,33%,17%)] text-emerald-400'
                    : 'text-[hsl(215,20%,65%)] hover:bg-[hsl(217,33%,17%,0.5)] hover:text-white'
                }`}
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            )
          })}
          
          {/* P2P Lending Link */}
          <a
            href="https://wello-p2p-demo.vercel.app/lender/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
          >
            <LineChart className="h-3.5 w-3.5" />
            P2P Lending
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <button className="btn-ghost relative rounded-lg p-2">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
              2
            </span>
          </button>

          <button className="btn-ghost flex items-center gap-2 rounded-lg px-3 py-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
              D
            </div>
            <span className="hidden text-sm sm:inline">Demo</span>
            <ChevronDown className="h-3 w-3 text-[hsl(215,20%,65%)]" />
          </button>

          {/* Mobile hamburger */}
          <button
            className="btn-ghost rounded-lg p-2 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-[hsl(217,33%,17%,0.5)] lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                    active
                      ? 'bg-[hsl(217,33%,17%)] text-emerald-400'
                      : 'text-[hsl(215,20%,65%)] hover:bg-[hsl(217,33%,17%,0.5)] hover:text-white'
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
            <a
              href="https://wello-p2p-demo.vercel.app/lender/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400"
            >
              <LineChart className="h-4 w-4" />
              P2P Lending
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
