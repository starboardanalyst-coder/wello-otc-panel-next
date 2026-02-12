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
    reason: '历史交易记录优秀，响应速度快，符合您的大额交易偏好'
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
    reason: '响应速度最快，适合时间敏感型交易'
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
    reason: '中等交易量，价格有一定议价空间'
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
  { id: 1, type: 'info', message: '市场流动性良好，建议现在交易', time: '刚刚' },
  { id: 2, type: 'warning', message: '对手方 CryptoDealer 响应时间延长，建议谨慎', time: '5分钟前' },
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
              AI <span className="gradient-text">撮合 Agent</span>
            </h1>
            <p className="text-sm text-[hsl(215,20%,65%)]">智能匹配最优交易对手</p>
          </div>
        </div>
        <p className="mt-2 text-[hsl(215,20%,65%)]">
          Agent 不只是匹配工具，而是您的「交易顾问」——评估对手方、学习偏好、建议定价、预警风险
        </p>
      </div>

      {/* Agent Mode Toggle */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm text-[hsl(215,20%,65%)]">Agent 模式:</span>
        <div className="flex rounded-lg border border-[hsl(217,33%,17%)] p-1">
          <button 
            onClick={() => setAgentMode('auto')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              agentMode === 'auto' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-[hsl(215,20%,65%)] hover:text-white'
            }`}
          >
            <Sparkles className="inline h-3 w-3 mr-1" /> 自动匹配
          </button>
          <button 
            onClick={() => setAgentMode('manual')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              agentMode === 'manual' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-[hsl(215,20%,65%)] hover:text-white'
            }`}
          >
            <Settings className="inline h-3 w-3 mr-1" /> 手动选择
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Counterparty Evaluation */}
        <div className="lg:col-span-2 space-y-6">
          {/* 3.3.1 对手方评估 */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold">对手方评估</span>
              </div>
              <span className="badge badge-secondary">AI 推荐</span>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-xs text-[hsl(215,20%,65%)] mb-4">
                基于历史交易记录、链上行为、响应速度、纠纷率等多维度分析
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
                            {cp.risk === 'low' ? '低风险' : '中风险'}
                          </span>
                          <span>信誉: {cp.score}分</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-400">{cp.match}%</div>
                      <div className="text-[10px] text-[hsl(215,20%,65%)]">匹配度</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center text-xs mb-3">
                    <div>
                      <div className="text-[hsl(215,20%,65%)]">完成率</div>
                      <div className="font-medium text-emerald-400">{cp.completionRate}%</div>
                    </div>
                    <div>
                      <div className="text-[hsl(215,20%,65%)]">响应</div>
                      <div className="font-medium">{cp.avgResponse}</div>
                    </div>
                    <div>
                      <div className="text-[hsl(215,20%,65%)]">交易量</div>
                      <div className="font-medium">{cp.volume}</div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[hsl(217,33%,17%,0.5)] p-2 text-xs text-[hsl(215,20%,65%)]">
                    <Brain className="inline h-3 w-3 mr-1 text-purple-400" />
                    AI 分析: {cp.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3.3.3 动态定价建议 */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span className="font-semibold">动态定价建议</span>
            </div>
            <div className="p-5">
              <p className="text-xs text-[hsl(215,20%,65%)] mb-4">
                基于当前市场深度、时间段流动性、对手方质量实时计算
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="rounded-lg bg-[hsl(217,33%,17%)] p-3 text-center">
                  <div className="text-[10px] text-[hsl(215,20%,65%)] mb-1">市场中间价</div>
                  <div className="text-lg font-bold">${mockPricingSuggestion.marketMid.toFixed(4)}</div>
                </div>
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-center">
                  <div className="text-[10px] text-emerald-400 mb-1">建议买入价</div>
                  <div className="text-lg font-bold text-emerald-400">${mockPricingSuggestion.suggestedBid.toFixed(4)}</div>
                </div>
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-center">
                  <div className="text-[10px] text-red-400 mb-1">建议卖出价</div>
                  <div className="text-lg font-bold text-red-400">${mockPricingSuggestion.suggestedAsk.toFixed(4)}</div>
                </div>
                <div className="rounded-lg bg-[hsl(217,33%,17%)] p-3 text-center">
                  <div className="text-[10px] text-[hsl(215,20%,65%)] mb-1">预期成交</div>
                  <div className="text-lg font-bold">{mockPricingSuggestion.expectedFillTime}</div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-purple-500/10 border border-purple-500/30 p-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">AI 置信度</span>
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
          {/* 3.3.2 偏好学习 */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <User className="h-4 w-4 text-amber-400" />
              <span className="font-semibold">您的偏好</span>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-xs text-[hsl(215,20%,65%)]">
                Agent 会学习您的交易习惯，提供个性化推荐
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">风险偏好</span>
                  <span className="badge badge-default">保守型</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">速度优先</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">常用额度</span>
                  <span className="text-sm font-medium">{mockPreferences.preferredVolume}</span>
                </div>
              </div>

              <div className="border-t border-[hsl(217,33%,17%)] pt-3">
                <div className="text-xs text-[hsl(215,20%,65%)] mb-2">常用交易对手</div>
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

          {/* 3.3.4 风险预警 */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span className="font-semibold">实时预警</span>
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
                <Zap className="h-4 w-4" /> 一键匹配交易
              </button>
              <Link href="/trade" className="btn btn-outline w-full justify-center">
                查看交易流程 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
