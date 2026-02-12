'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Star, Award, TrendingUp, Clock, AlertTriangle, CheckCircle2,
  Shield, BarChart3, Users, Zap, Crown, Medal, Target
} from 'lucide-react'

// Mock reputation data
const mockUserReputation = {
  score: 87,
  level: 'trusted',
  levelName: 'Trusted',
  totalTrades: 156,
  completionRate: 99.4,
  avgResponseTime: '< 25 min',
  disputeRate: 0.6,
  totalVolume: '$2.8M',
  memberSince: '2025-08',
}

const reputationLevels = [
  { name: 'Newcomer', range: '0-50', color: 'zinc', limit: '$5K', features: ['Requires counterparty approval', 'Basic features'] },
  { name: 'Regular', range: '50-80', color: 'blue', limit: '$50K', features: ['Can post ads', 'Normal trading'] },
  { name: 'Trusted', range: '80-95', color: 'emerald', limit: '$500K', features: ['Priority matching', 'Advanced analytics'] },
  { name: 'Elite', range: '95-100', color: 'amber', limit: 'Unlimited', features: ['Market maker certified', 'Fee discounts', 'API access'] },
]

const scoreBreakdown = [
  { name: 'Completion Rate', weight: 30, score: 29.8, icon: CheckCircle2, color: 'emerald' },
  { name: 'Response Speed', weight: 20, score: 18.5, icon: Clock, color: 'cyan' },
  { name: 'Dispute Rate', weight: 30, score: 28.2, icon: AlertTriangle, color: 'amber' },
  { name: 'Trade Volume', weight: 20, score: 10.5, icon: BarChart3, color: 'purple' },
]

const recentActivity = [
  { type: 'trade', desc: 'Completed $25,000 USDT trade', score: '+0.2', time: '2 hours ago' },
  { type: 'trade', desc: 'Completed $50,000 USDT trade', score: '+0.3', time: '1 day ago' },
  { type: 'fast', desc: 'Fast response bonus', score: '+0.1', time: '2 days ago' },
  { type: 'trade', desc: 'Completed $10,000 USDT trade', score: '+0.1', time: '3 days ago' },
]

export default function ReputationPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  
  const getLevelIcon = (level: string) => {
    switch(level) {
      case 'Newcomer': return Users
      case 'Regular': return Medal
      case 'Trusted': return Award
      case 'Elite': return Crown
      default: return Star
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
            <Star className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              <span className="gradient-text">Reputation System</span>
            </h1>
            <p className="text-sm text-[hsl(215,20%,65%)]">Transparent on-chain verifiable reputation</p>
          </div>
        </div>
        <p className="mt-2 text-[hsl(215,20%,65%)]">
          Real-time reputation score calculated from four dimensions: completion rate, response speed, dispute rate, and trade volume
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Score Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Score Card */}
          <div className="card">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Score Circle */}
                <div className="relative">
                  <svg className="h-36 w-36 -rotate-90">
                    <circle
                      cx="72" cy="72" r="64"
                      className="fill-none stroke-[hsl(217,33%,17%)]"
                      strokeWidth="12"
                    />
                    <circle
                      cx="72" cy="72" r="64"
                      className="fill-none stroke-emerald-500"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${mockUserReputation.score * 4.02} 402`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">{mockUserReputation.score}</span>
                    <span className="text-xs text-[hsl(215,20%,65%)]">/ 100</span>
                  </div>
                </div>

                {/* Level Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <Award className="h-5 w-5 text-emerald-400" />
                    <span className="text-xl font-bold">{mockUserReputation.levelName} Trader</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="text-xs text-[hsl(215,20%,65%)]">Total Trades</div>
                      <div className="font-bold">{mockUserReputation.totalTrades}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[hsl(215,20%,65%)]">Total Volume</div>
                      <div className="font-bold">{mockUserReputation.totalVolume}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[hsl(215,20%,65%)]">Completion Rate</div>
                      <div className="font-bold text-emerald-400">{mockUserReputation.completionRate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-[hsl(215,20%,65%)]">Member Since</div>
                      <div className="font-bold">{mockUserReputation.memberSince}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-400" />
              <span className="font-semibold">Score Breakdown</span>
            </div>
            <div className="p-5 space-y-4">
              {scoreBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${item.color}-500/10`}>
                    <item.icon className={`h-4 w-4 text-${item.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-xs text-[hsl(215,20%,65%)]">
                        {item.score.toFixed(1)} / {item.weight} (Weight {item.weight}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[hsl(217,33%,17%)]">
                      <div 
                        className={`h-full rounded-full bg-${item.color}-500`}
                        style={{ width: `${(item.score / item.weight) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Level System */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="font-semibold">Level System</span>
            </div>
            <div className="p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {reputationLevels.map((level) => {
                  const isCurrentLevel = level.name === mockUserReputation.levelName
                  const LevelIcon = getLevelIcon(level.name)
                  
                  return (
                    <div 
                      key={level.name}
                      className={`rounded-xl border p-4 transition-all ${
                        isCurrentLevel 
                          ? 'border-emerald-500 bg-emerald-500/5' 
                          : 'border-[hsl(217,33%,17%)] hover:border-[hsl(217,33%,25%)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          level.color === 'zinc' ? 'bg-zinc-500/20' :
                          level.color === 'blue' ? 'bg-blue-500/20' :
                          level.color === 'emerald' ? 'bg-emerald-500/20' :
                          'bg-amber-500/20'
                        }`}>
                          <LevelIcon className={`h-5 w-5 ${
                            level.color === 'zinc' ? 'text-zinc-400' :
                            level.color === 'blue' ? 'text-blue-400' :
                            level.color === 'emerald' ? 'text-emerald-400' :
                            'text-amber-400'
                          }`} />
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {level.name}
                            {isCurrentLevel && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[hsl(215,20%,65%)]">{level.range} points</div>
                        </div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[hsl(215,20%,65%)]">Trade Limit</span>
                          <span className="font-medium">{level.limit}</span>
                        </div>
                        <div className="text-xs text-[hsl(215,20%,65%)]">
                          {level.features.map((f, i) => (
                            <span key={f}>
                              {f}{i < level.features.length - 1 ? ' · ' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="card glow-green bg-gradient-to-br from-emerald-500/10 to-transparent">
            <div className="card-content">
              <div className="text-xs text-[hsl(215,20%,65%)] mb-1">Current Trade Limit</div>
              <div className="text-2xl font-bold">$500,000</div>
              <div className="mt-2 text-xs text-emerald-400">
                8 more points to reach Elite
              </div>
              <div className="mt-3 h-2 rounded-full bg-[hsl(217,33%,17%)]">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '87%' }} />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span className="font-semibold">Recent Activity</span>
            </div>
            <div className="p-5 space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="flex-1">
                    <div className="text-[hsl(215,20%,65%)]">{activity.desc}</div>
                    <div className="text-xs text-[hsl(215,20%,55%)]">{activity.time}</div>
                  </div>
                  <span className="text-emerald-400 font-medium">{activity.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-400" />
              <span className="font-semibold">Trust Badges</span>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
                  <CheckCircle2 className="inline h-3 w-3 mr-1" /> KYB Verified
                </span>
                <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-400">
                  <Zap className="inline h-3 w-3 mr-1" /> Fast Responder
                </span>
                <span className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs text-purple-400">
                  <Target className="inline h-3 w-3 mr-1" /> 100 Trades
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="card">
            <div className="card-content space-y-3">
              <Link href="/agent" className="btn btn-outline w-full justify-center">
                <Target className="h-4 w-4" /> AI Matching Agent
              </Link>
              <Link href="/escrow" className="btn btn-outline w-full justify-center">
                <Shield className="h-4 w-4" /> Secure Escrow
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
