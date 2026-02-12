'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ShoppingCart, Wallet, Search, Lock, Banknote, CheckCircle2,
  Unlock, Star, ArrowRight, ArrowDown, User, Store, Repeat,
  CreditCard, Building2, Shield, Zap, Clock, AlertTriangle
} from 'lucide-react'

type JourneyType = 'buyer' | 'seller'

const buyerSteps = [
  { 
    step: 1, 
    title: '连接钱包 + 完成KYC',
    desc: '使用MetaMask或其他钱包连接，完成身份验证',
    icon: Wallet,
    detail: '支持多种钱包，KYC通常在24小时内完成'
  },
  { 
    step: 2, 
    title: '浏览订单簿 / AI匹配',
    desc: '查看市场深度，或让AI推荐最优对手方',
    icon: Search,
    detail: 'AI会根据您的偏好推荐信誉好、价格优的卖家'
  },
  { 
    step: 3, 
    title: '确认USDT已锁定',
    desc: '确认卖家的USDT已锁定在托管账户',
    icon: Lock,
    detail: '资金锁定后才进行下一步，保障您的资金安全'
  },
  { 
    step: 4, 
    title: '向卖家转账法币',
    desc: '按指示向卖家银行账户转账',
    icon: Banknote,
    detail: '支持银行转账、支付宝、微信等多种方式'
  },
  { 
    step: 5, 
    title: '等待卖家确认',
    desc: '卖家确认收到法币',
    icon: Clock,
    detail: '如超时未确认，可申请仲裁'
  },
  { 
    step: 6, 
    title: 'USDT自动释放',
    desc: 'USDT自动到账您的钱包',
    icon: Unlock,
    detail: '交易完成，可对卖家进行评价'
  },
]

const sellerSteps = [
  { 
    step: 1, 
    title: '连接钱包 + KYC + 设置收款',
    desc: '完成验证并设置收款方式',
    icon: Wallet,
    detail: '添加银行账户、支付宝等收款方式'
  },
  { 
    step: 2, 
    title: '发布卖单',
    desc: '设置价格、数量、支付方式',
    icon: Store,
    detail: '可设置最小/最大交易额、接受的支付方式'
  },
  { 
    step: 3, 
    title: 'USDT自动锁入托管',
    desc: '买家下单后，USDT自动锁定',
    icon: Lock,
    detail: '您的USDT安全锁定，防止恶意取消'
  },
  { 
    step: 4, 
    title: '等待买家转账',
    desc: '买家向您转账法币',
    icon: Clock,
    detail: '收到转账通知后检查账户'
  },
  { 
    step: 5, 
    title: '确认收款',
    desc: '确认法币已到账',
    icon: CheckCircle2,
    detail: '务必确认实际到账后再确认'
  },
  { 
    step: 6, 
    title: '交易完成',
    desc: 'USDT释放给买家，双方评价',
    icon: Star,
    detail: '良好的评价有助于提升您的信誉分'
  },
]

export default function TradePage() {
  const [journeyType, setJourneyType] = useState<JourneyType>('buyer')
  const [activeStep, setActiveStep] = useState(1)
  
  const steps = journeyType === 'buyer' ? buyerSteps : sellerSteps

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500">
            <Repeat className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              <span className="gradient-text">交易旅程</span>
            </h1>
            <p className="text-sm text-[hsl(215,20%,65%)]">完整的买卖流程指南</p>
          </div>
        </div>
        <p className="mt-2 text-[hsl(215,20%,65%)]">
          了解从下单到完成的每一步，安全高效地完成OTC交易
        </p>
      </div>

      {/* Journey Type Toggle */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-xl border border-[hsl(217,33%,17%)] p-1.5 bg-[hsl(222,47%,6%)]">
          <button 
            onClick={() => { setJourneyType('buyer'); setActiveStep(1); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              journeyType === 'buyer' 
                ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20' 
                : 'text-[hsl(215,20%,65%)] hover:text-white'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            买家旅程（买入USDT）
          </button>
          <button 
            onClick={() => { setJourneyType('seller'); setActiveStep(1); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              journeyType === 'seller' 
                ? 'bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/20' 
                : 'text-[hsl(215,20%,65%)] hover:text-white'
            }`}
          >
            <Store className="h-4 w-4" />
            卖家旅程（卖出USDT）
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Steps List */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <div className="flex items-center gap-2">
                {journeyType === 'buyer' ? (
                  <ShoppingCart className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Store className="h-4 w-4 text-purple-400" />
                )}
                <span className="font-semibold">
                  {journeyType === 'buyer' ? '买家' : '卖家'}流程步骤
                </span>
              </div>
              <span className="badge badge-secondary">共 {steps.length} 步</span>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={step.step} className="relative">
                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <div className={`absolute left-5 top-14 h-6 w-0.5 ${
                        step.step < activeStep 
                          ? journeyType === 'buyer' ? 'bg-emerald-500' : 'bg-purple-500'
                          : 'bg-[hsl(217,33%,17%)]'
                      }`} />
                    )}
                    
                    <button 
                      onClick={() => setActiveStep(step.step)}
                      className={`w-full text-left flex items-start gap-4 rounded-xl p-4 transition-all ${
                        activeStep === step.step 
                          ? journeyType === 'buyer'
                            ? 'bg-emerald-500/10 border border-emerald-500/30' 
                            : 'bg-purple-500/10 border border-purple-500/30'
                          : step.step < activeStep
                          ? 'bg-[hsl(217,33%,17%,0.3)] border border-transparent'
                          : 'bg-[hsl(217,33%,17%,0.2)] border border-transparent hover:border-[hsl(217,33%,25%)]'
                      }`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full shrink-0 ${
                        step.step < activeStep 
                          ? journeyType === 'buyer' ? 'bg-emerald-500' : 'bg-purple-500'
                          : activeStep === step.step
                          ? journeyType === 'buyer' 
                            ? 'bg-emerald-500/20 border-2 border-emerald-500'
                            : 'bg-purple-500/20 border-2 border-purple-500'
                          : 'bg-[hsl(217,33%,17%)]'
                      }`}>
                        {step.step < activeStep ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : (
                          <step.icon className={`h-5 w-5 ${
                            activeStep === step.step 
                              ? journeyType === 'buyer' ? 'text-emerald-400' : 'text-purple-400'
                              : 'text-[hsl(215,20%,65%)]'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${
                            activeStep === step.step 
                              ? journeyType === 'buyer' ? 'text-emerald-400' : 'text-purple-400'
                              : step.step < activeStep 
                              ? journeyType === 'buyer' ? 'text-emerald-400' : 'text-purple-400'
                              : ''
                          }`}>
                            {step.step}. {step.title}
                          </span>
                          {activeStep === step.step && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] animate-pulse ${
                              journeyType === 'buyer' 
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-purple-500/20 text-purple-400'
                            }`}>
                              当前步骤
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-[hsl(215,20%,65%)] mt-1">
                          {step.desc}
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* Step Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <button 
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  className="btn btn-outline text-sm"
                  disabled={activeStep === 1}
                >
                  上一步
                </button>
                <div className="text-sm text-[hsl(215,20%,65%)]">
                  步骤 {activeStep} / {steps.length}
                </div>
                <button 
                  onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                  className={`btn text-sm ${
                    journeyType === 'buyer' ? 'btn-primary' : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                  disabled={activeStep === steps.length}
                >
                  下一步 <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Step Detail */}
        <div className="space-y-6">
          {/* Current Step Detail */}
          <div className={`card ${
            journeyType === 'buyer' 
              ? 'glow-green bg-gradient-to-br from-emerald-500/10 to-transparent'
              : 'bg-gradient-to-br from-purple-500/10 to-transparent'
          }`}>
            <div className="card-header">
              <span className="font-semibold">步骤 {activeStep} 详情</span>
            </div>
            <div className="p-5">
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl mb-4 ${
                journeyType === 'buyer' ? 'bg-emerald-500/20' : 'bg-purple-500/20'
              }`}>
                {(() => {
                  const StepIcon = steps[activeStep - 1].icon
                  return <StepIcon className={`h-8 w-8 ${
                    journeyType === 'buyer' ? 'text-emerald-400' : 'text-purple-400'
                  }`} />
                })()}
              </div>
              <h3 className="text-lg font-bold mb-2">{steps[activeStep - 1].title}</h3>
              <p className="text-sm text-[hsl(215,20%,65%)] mb-4">
                {steps[activeStep - 1].detail}
              </p>

              {/* Tips */}
              <div className="rounded-lg bg-[hsl(217,33%,17%,0.5)] p-3">
                <div className="flex items-start gap-2 text-xs">
                  <AlertTriangle className="h-3 w-3 text-amber-400 mt-0.5 shrink-0" />
                  <span className="text-[hsl(215,20%,65%)]">
                    {activeStep === 4 && journeyType === 'buyer' && '转账前请仔细核对收款信息，避免转错账户'}
                    {activeStep === 5 && journeyType === 'seller' && '请确认资金实际到账后再点击确认，避免遭受欺诈'}
                    {activeStep !== 4 && activeStep !== 5 && '如有任何问题，请联系客服或发起仲裁'}
                    {activeStep === 4 && journeyType === 'seller' && '请耐心等待，买家通常会在30分钟内完成转账'}
                    {activeStep === 5 && journeyType === 'buyer' && '如卖家长时间未确认，可申请平台介入'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <div className="card-content">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,20%,65%)] mb-4">
                平台数据
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">平均交易时间</span>
                  <span className="text-sm font-bold">&lt; 30分钟</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">成功率</span>
                  <span className="text-sm font-bold text-emerald-400">99.97%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">活跃交易者</span>
                  <span className="text-sm font-bold">156</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="card">
            <div className="card-content space-y-3">
              <Link href="/agent" className="btn btn-outline w-full justify-center">
                <Zap className="h-4 w-4" /> AI 撮合 Agent
              </Link>
              <Link href="/escrow" className="btn btn-outline w-full justify-center">
                <Shield className="h-4 w-4" /> 安全托管详解
              </Link>
              <Link href="/reputation" className="btn btn-outline w-full justify-center">
                <Star className="h-4 w-4" /> 信誉系统
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
