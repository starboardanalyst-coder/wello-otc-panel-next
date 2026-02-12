'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Brain, Target, TrendingUp, AlertTriangle, CheckCircle2, 
  User, BarChart3, Clock, Shield, Sparkles, ArrowRight,
  Settings, Zap, Eye, ThumbsUp, ThumbsDown
} from 'lucide-react'

// Mock data for AI Agent demo
const mockCounterparties = [
  { 
    id: 1, 
    name: 'MegaFund Capital', 
    score: 95, 
    risk: 'low',
    completionRate: 100,
    avgResponse: '< 1 hour',
    volume: '$2.5M',
    match: 98,
    reason: 'Excellent trade history, fast response, matches your large trade preferences'
  },
  { 
    id: 2, 
    name: 'InstitutionalDesk', 
    score: 88, 
    risk: 'low',
    completionRate: 99.9,
    avgResponse: '< 30 min',
    volume: '$1.8M',
    match: 92,
    reason: 'Fastest response time, ideal for time-sensitive trades'
  },
  { 
    id: 3, 
    name: 'BigCapital Trading', 
    score: 82, 
    risk: 'medium',
    completionRate: 99.8,
    avgResponse: '< 20 min',
    volume: '$800K',
    match: 85,
    reason: 'Medium volume, some room for price negotiation'
  },
]

const mockPreferences = {
  riskTolerance: 'conservative',
  prioritySpeed: true,
  preferredVolume: '$50K-$500K',
  favoriteTraders: ['MegaFund Capital', 'InstitutionalDesk'],
}

const mockPricingSuggestion = {
  marketMid: 1.0035,
  suggestedBid: 1.0025,
  suggestedAsk: 1.0045,
  expectedFillTime: '5-15 min',
  confidence: 87,
}

const mockRiskAlerts = [
  { id: 1, type: 'info', message: 'Market liquidity is good, recommended to trade now', time: 'Just now' },
  { id: 2, type: 'warning', message: 'Counterparty CryptoDealer response time delayed, proceed with caution', time: '5 min ago' },
]

export default function AgentPage() {
  const [selectedCounterparty, setSelectedCounterparty] = useState<number | null>(null)
  const [agentMode, setAgentMode] = useState<'auto' | 'manual'>('auto')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              AI <span className="gradient-text">Matching Agent</span>
            </h1>
            <p className="text-sm text-[hsl(215,20%,65%)]">Intelligently match optimal counterparties</p>
          </div>
        </div>
        <p className="mt-2 text-[hsl(215,20%,65%)]">
          The Agent is more than a matching tool — it&apos;s your trading advisor: evaluating counterparties, learning preferences, suggesting pricing, and alerting risks
        </p>
      </div>

      {/* Agent Mode Toggle */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm text-[hsl(215,20%,65%)]">Agent Mode:</span>
        <div className="flex rounded-lg border border-[hsl(217,33%,17%)] p-1">
          <button 
            onClick={() => setAgentMode('auto')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              agentMode === 'auto' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-[hsl(215,20%,65%)] hover:text-white'
            }`}
          >
            <Sparkles className="inline h-3 w-3 mr-1" /> Auto Match
          </button>
          <button 
            onClick={() => setAgentMode('manual')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              agentMode === 'manual' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-[hsl(215,20%,65%)] hover:text-white'
            }`}
          >
            <Settings className="inline h-3 w-3 mr-1" /> Manual Select
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Counterparty Evaluation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Counterparty Evaluation */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold">Counterparty Evaluation</span>
              </div>
              <span className="badge badge-secondary">AI Recommended</span>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-xs text-[hsl(215,20%,65%)] mb-4">
                Multi-dimensional analysis based on trade history, on-chain behavior, response speed, and dispute rate
              </p>
              
              {mockCounterparties.map((cp) => (
                <div 
                  key={cp.id}
                  onClick={() => setSelectedCounterparty(cp.id)}
                  className={`rounded-xl border p-4 cursor-pointer transition-all ${
                    selectedCounterparty === cp.id 
                      ? 'border-emerald-500 bg-emerald-500/5' 
                      : 'border-[hsl(217,33%,17%)] hover:border-[hsl(217,33%,25%)]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(217,33%,17%)] font-bold text-emerald-400">
                        {cp.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{cp.name}</div>
                        <div className="flex items-center gap-2 text-xs text-[hsl(215,20%,65%)]">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                            cp.risk === 'low' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {cp.risk === 'low' ? 'Low Risk' : 'Medium Risk'}
                          </span>
                          <span>Score: {cp.score}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-400">{cp.match}%</div>
                      <div className="text-[10px] text-[hsl(215,20%,65%)]">Match</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center text-xs mb-3">
                    <div>
                      <div className="text-[hsl(215,20%,65%)]">Completion</div>
                      <div className="font-medium text-emerald-400">{cp.completionRate}%</div>
                    </div>
                    <div>
                      <div className="text-[hsl(215,20%,65%)]">Response</div>
                      <div className="font-medium">{cp.avgResponse}</div>
                    </div>
                    <div>
                      <div className="text-[hsl(215,20%,65%)]">Volume</div>
                      <div className="font-medium">{cp.volume}</div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[hsl(217,33%,17%,0.5)] p-2 text-xs text-[hsl(215,20%,65%)]">
                    <Brain className="inline h-3 w-3 mr-1 text-purple-400" />
                    AI Analysis: {cp.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Pricing Suggestions */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span className="font-semibold">Dynamic Pricing Suggestions</span>
            </div>
            <div className="p-5">
              <p className="text-xs text-[hsl(215,20%,65%)] mb-4">
                Real-time calculations based on current market depth, time-based liquidity, and counterparty quality
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="rounded-lg bg-[hsl(217,33%,17%)] p-3 text-center">
                  <div className="text-[10px] text-[hsl(215,20%,65%)] mb-1">Market Mid</div>
                  <div className="text-lg font-bold">${mockPricingSuggestion.marketMid.toFixed(4)}</div>
                </div>
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-center">
                  <div className="text-[10px] text-emerald-400 mb-1">Suggested Bid</div>
                  <div className="text-lg font-bold text-emerald-400">${mockPricingSuggestion.suggestedBid.toFixed(4)}</div>
                </div>
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-center">
                  <div className="text-[10px] text-red-400 mb-1">Suggested Ask</div>
                  <div className="text-lg font-bold text-red-400">${mockPricingSuggestion.suggestedAsk.toFixed(4)}</div>
                </div>
                <div className="rounded-lg bg-[hsl(217,33%,17%)] p-3 text-center">
                  <div className="text-[10px] text-[hsl(215,20%,65%)] mb-1">Expected Fill</div>
                  <div className="text-lg font-bold">{mockPricingSuggestion.expectedFillTime}</div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-purple-500/10 border border-purple-500/30 p-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">AI Confidence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-[hsl(217,33%,17%)]">
                    <div 
                      className="h-full rounded-full bg-purple-500" 
                      style={{ width: `${mockPricingSuggestion.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-purple-400">{mockPricingSuggestion.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Your Preferences */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <User className="h-4 w-4 text-amber-400" />
              <span className="font-semibold">Your Preferences</span>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-xs text-[hsl(215,20%,65%)]">
                The Agent learns your trading habits to provide personalized recommendations
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Risk Tolerance</span>
                  <span className="badge badge-default">Conservative</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Speed Priority</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Preferred Volume</span>
                  <span className="text-sm font-medium">{mockPreferences.preferredVolume}</span>
                </div>
              </div>

              <div className="border-t border-[hsl(217,33%,17%)] pt-3">
                <div className="text-xs text-[hsl(215,20%,65%)] mb-2">Favorite Counterparties</div>
                <div className="flex flex-wrap gap-2">
                  {mockPreferences.favoriteTraders.map((t) => (
                    <span key={t} className="px-2 py-1 rounded-full bg-emerald-500/10 text-xs text-emerald-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Alerts */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span className="font-semibold">Real-time Alerts</span>
            </div>
            <div className="p-5 space-y-3">
              {mockRiskAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`rounded-lg p-3 text-xs ${
                    alert.type === 'warning' 
                      ? 'bg-amber-500/10 border border-amber-500/30' 
                      : 'bg-cyan-500/10 border border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {alert.type === 'warning' ? (
                      <AlertTriangle className="h-3 w-3 text-amber-400 mt-0.5" />
                    ) : (
                      <Eye className="h-3 w-3 text-cyan-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className={alert.type === 'warning' ? 'text-amber-400' : 'text-cyan-400'}>
                        {alert.message}
                      </div>
                      <div className="text-[hsl(215,20%,65%)] mt-1">{alert.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-content space-y-3">
              <button className="btn btn-primary w-full justify-center">
                <Zap className="h-4 w-4" /> One-Click Match
              </button>
              <Link href="/trade" className="btn btn-outline w-full justify-center">
                View Trade Flow <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
