'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Shield, Lock, Unlock, CheckCircle2, Clock, AlertTriangle,
  ArrowRight, ArrowDown, User, Building2, Banknote, Coins,
  FileCheck, Timer, Scale, Users
} from 'lucide-react'

// Mock escrow transaction
const mockTransaction = {
  id: 'ESC-2026-0212-001',
  status: 'locked', // pending, locked, confirming, released, disputed
  amount: '50,000 USDT',
  fiatAmount: '$50,250 USD',
  buyer: 'Enterprise Corp',
  seller: 'MegaFund Capital',
  createdAt: '2026-02-12 18:30',
  lockTime: '1小时前',
  timeLimit: '24小时',
  timeRemaining: '22小时 45分',
}

const escrowSteps = [
  { 
    step: 1, 
    title: '卖方锁定', 
    desc: '卖方将USDT存入托管账户',
    icon: Lock,
    status: 'completed'
  },
  { 
    step: 2, 
    title: '买方付款', 
    desc: '买方向卖方转账法币',
    icon: Banknote,
    status: 'active'
  },
  { 
    step: 3, 
    title: '卖方确认', 
    desc: '卖方确认收到法币',
    icon: CheckCircle2,
    status: 'pending'
  },
  { 
    step: 4, 
    title: '自动释放', 
    desc: 'USDT自动释放给买方',
    icon: Unlock,
    status: 'pending'
  },
]

const escrowFeatures = [
  { 
    title: '时间锁保护', 
    desc: '超时自动退回卖方，防止买方消失',
    icon: Timer,
    color: 'cyan'
  },
  { 
    title: '仲裁机制', 
    desc: '争议时由社区仲裁员投票裁决',
    icon: Scale,
    color: 'amber'
  },
  { 
    title: '链上可验证', 
    desc: '所有交易记录公开透明可查',
    icon: FileCheck,
    color: 'emerald'
  },
]

export default function EscrowPage() {
  const [currentStep, setCurrentStep] = useState(2)

  const getStepStatus = (stepNum: number) => {
    if (stepNum < currentStep) return 'completed'
    if (stepNum === currentStep) return 'active'
    return 'pending'
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              <span className="gradient-text">安全托管</span>
            </h1>
            <p className="text-sm text-[hsl(215,20%,65%)]">消除对手方信任问题</p>
          </div>
        </div>
        <p className="mt-2 text-[hsl(215,20%,65%)]">
          资金锁定在托管账户，买方确认收款后才释放，原子交换消除一方跑路风险
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Process Flow */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Transaction Card */}
          <div className="card glow-blue bg-gradient-to-br from-cyan-500/10 to-transparent">
            <div className="card-header flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-cyan-400" />
                <span className="font-semibold">当前托管交易</span>
              </div>
              <span className="badge badge-default">{mockTransaction.id}</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-xs text-[hsl(215,20%,65%)]">托管金额</div>
                  <div className="font-bold text-lg text-cyan-400">{mockTransaction.amount}</div>
                </div>
                <div>
                  <div className="text-xs text-[hsl(215,20%,65%)]">法币金额</div>
                  <div className="font-bold text-lg">{mockTransaction.fiatAmount}</div>
                </div>
                <div>
                  <div className="text-xs text-[hsl(215,20%,65%)]">锁定时间</div>
                  <div className="font-bold">{mockTransaction.lockTime}</div>
                </div>
                <div>
                  <div className="text-xs text-[hsl(215,20%,65%)]">剩余时间</div>
                  <div className="font-bold text-amber-400">{mockTransaction.timeRemaining}</div>
                </div>
              </div>

              {/* Parties */}
              <div className="flex items-center justify-between rounded-xl bg-[hsl(217,33%,17%,0.5)] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                    <Building2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-[hsl(215,20%,65%)]">买方</div>
                    <div className="font-medium">{mockTransaction.buyer}</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-[hsl(215,20%,65%)]" />
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-xs text-[hsl(215,20%,65%)] text-right">卖方</div>
                    <div className="font-medium">{mockTransaction.seller}</div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
                    <User className="h-5 w-5 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-emerald-400" />
              <span className="font-semibold">托管流程</span>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {escrowSteps.map((step, index) => {
                  const status = getStepStatus(step.step)
                  return (
                    <div key={step.step} className="relative">
                      {/* Connection Line */}
                      {index < escrowSteps.length - 1 && (
                        <div className={`absolute left-5 top-12 h-8 w-0.5 ${
                          status === 'completed' ? 'bg-emerald-500' : 'bg-[hsl(217,33%,17%)]'
                        }`} />
                      )}
                      
                      <div className={`flex items-start gap-4 rounded-xl p-4 transition-all ${
                        status === 'active' 
                          ? 'bg-cyan-500/10 border border-cyan-500/30' 
                          : status === 'completed'
                          ? 'bg-emerald-500/5 border border-emerald-500/20'
                          : 'bg-[hsl(217,33%,17%,0.3)]'
                      }`}>
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full shrink-0 ${
                          status === 'completed' 
                            ? 'bg-emerald-500' 
                            : status === 'active'
                            ? 'bg-cyan-500/20 border-2 border-cyan-500'
                            : 'bg-[hsl(217,33%,17%)]'
                        }`}>
                          {status === 'completed' ? (
                            <CheckCircle2 className="h-5 w-5 text-white" />
                          ) : (
                            <step.icon className={`h-5 w-5 ${
                              status === 'active' ? 'text-cyan-400' : 'text-[hsl(215,20%,65%)]'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${
                              status === 'active' ? 'text-cyan-400' : 
                              status === 'completed' ? 'text-emerald-400' : ''
                            }`}>
                              步骤 {step.step}: {step.title}
                            </span>
                            {status === 'active' && (
                              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-[10px] text-cyan-400 animate-pulse">
                                进行中
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-[hsl(215,20%,65%)] mt-1">
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Demo Controls */}
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  className="btn btn-outline text-sm"
                  disabled={currentStep === 1}
                >
                  上一步
                </button>
                <button 
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="btn btn-primary text-sm"
                  disabled={currentStep === 4}
                >
                  模拟下一步 <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Escrow Features */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-400" />
              <span className="font-semibold">托管特性</span>
            </div>
            <div className="p-5 space-y-4">
              {escrowFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${
                    feature.color === 'cyan' ? 'bg-cyan-500/10' :
                    feature.color === 'amber' ? 'bg-amber-500/10' :
                    'bg-emerald-500/10'
                  }`}>
                    <feature.icon className={`h-4 w-4 ${
                      feature.color === 'cyan' ? 'text-cyan-400' :
                      feature.color === 'amber' ? 'text-amber-400' :
                      'text-emerald-400'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{feature.title}</div>
                    <div className="text-xs text-[hsl(215,20%,65%)]">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispute Handling */}
          <div className="card">
            <div className="card-header flex items-center gap-2">
              <Scale className="h-4 w-4 text-amber-400" />
              <span className="font-semibold">争议处理</span>
            </div>
            <div className="p-5">
              <p className="text-xs text-[hsl(215,20%,65%)] mb-4">
                如果交易产生争议，将进入仲裁流程：
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(217,33%,17%)] text-[10px]">1</span>
                  <span className="text-[hsl(215,20%,65%)]">任一方发起争议申请</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(217,33%,17%)] text-[10px]">2</span>
                  <span className="text-[hsl(215,20%,65%)]">双方提交证据（截图、记录）</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(217,33%,17%)] text-[10px]">3</span>
                  <span className="text-[hsl(215,20%,65%)]">3-5名仲裁员投票裁决</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(217,33%,17%)] text-[10px]">4</span>
                  <span className="text-[hsl(215,20%,65%)]">败诉方承担2%仲裁费</span>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Stats */}
          <div className="card">
            <div className="card-content">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,20%,65%)] mb-4">
                平台安全数据
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">托管成功率</span>
                  <span className="text-sm font-bold text-emerald-400">99.97%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">争议率</span>
                  <span className="text-sm font-bold">0.03%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">平均结算时间</span>
                  <span className="text-sm font-bold">&lt; 2小时</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">累计托管</span>
                  <span className="text-sm font-bold">$128M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="card">
            <div className="card-content space-y-3">
              <Link href="/trade" className="btn btn-primary w-full justify-center">
                <ArrowRight className="h-4 w-4" /> 查看完整交易流程
              </Link>
              <Link href="/reputation" className="btn btn-outline w-full justify-center">
                <Users className="h-4 w-4" /> 信誉系统
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
