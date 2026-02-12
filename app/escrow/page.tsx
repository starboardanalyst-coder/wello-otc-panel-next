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
  status: 'locked',
  amount: '50,000 USDT',
  fiatAmount: '$50,250 USD',
  buyer: 'Enterprise Corp',
  seller: 'MegaFund Capital',
  createdAt: '2026-02-12 18:30',
  lockTime: '1 hour ago',
  timeLimit: '24 hours',
  timeRemaining: '22h 45m',
}

const escrowSteps = [
  { 
    step: 1, 
    title: 'Seller Locks', 
    desc: 'Seller deposits USDT into escrow account',
    icon: Lock,
    status: 'completed'
  },
  { 
    step: 2, 
    title: 'Buyer Pays', 
    desc: 'Buyer transfers fiat to seller',
    icon: Banknote,
    status: 'active'
  },
  { 
    step: 3, 
    title: 'Seller Confirms', 
    desc: 'Seller confirms fiat receipt',
    icon: CheckCircle2,
    status: 'pending'
  },
  { 
    step: 4, 
    title: 'Auto Release', 
    desc: 'USDT automatically released to buyer',
    icon: Unlock,
    status: 'pending'
  },
]

const escrowFeatures = [
  { 
    title: 'Time-Lock Protection', 
    desc: 'Auto-refund to seller on timeout, preventing buyer disappearance',
    icon: Timer,
    color: 'cyan'
  },
  { 
    title: 'Arbitration System', 
    desc: 'Community arbitrators vote to resolve disputes',
    icon: Scale,
    color: 'amber'
  },
  { 
    title: 'On-Chain Verifiable', 
    desc: 'All transactions publicly transparent and auditable',
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
              <span className="gradient-text">Secure Escrow</span>
            </h1>
            <p className="text-sm text-[hsl(215,20%,65%)]">Eliminate counterparty trust issues</p>
          </div>
        </div>
        <p className="mt-2 text-[hsl(215,20%,65%)]">
          Funds locked in escrow, released only after buyer confirms receipt — atomic swaps eliminate runaway risk
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
                <span className="font-semibold">Current Escrow Transaction</span>
              </div>
              <span className="badge badge-default">{mockTransaction.id}</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-xs text-[hsl(215,20%,65%)]">Escrow Amount</div>
                  <div className="font-bold text-lg text-cyan-400">{mockTransaction.amount}</div>
                </div>
                <div>
                  <div className="text-xs text-[hsl(215,20%,65%)]">Fiat Amount</div>
                  <div className="font-bold text-lg">{mockTransaction.fiatAmount}</div>
                </div>
                <div>
                  <div className="text-xs text-[hsl(215,20%,65%)]">Lock Time</div>
                  <div className="font-bold">{mockTransaction.lockTime}</div>
                </div>
                <div>
                  <div className="text-xs text-[hsl(215,20%,65%)]">Time Remaining</div>
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
                    <div className="text-xs text-[hsl(215,20%,65%)]">Buyer</div>
                    <div className="font-medium">{mockTransaction.buyer}</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-[hsl(215,20%,65%)]" />
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-xs text-[hsl(215,20%,65%)] text-right">Seller</div>
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
              <span className="font-semibold">Escrow Process</span>
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
                              Step {step.step}: {step.title}
                            </span>
                            {status === 'active' && (
                              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-[10px] text-cyan-400 animate-pulse">
                                In Progress
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
                  Previous
                </button>
                <button 
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="btn btn-primary text-sm"
                  disabled={currentStep === 4}
                >
                  Simulate Next <ArrowRight className="h-3 w-3" />
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
              <span className="font-semibold">Escrow Features</span>
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
              <span className="font-semibold">Dispute Resolution</span>
            </div>
            <div className="p-5">
              <p className="text-xs text-[hsl(215,20%,65%)] mb-4">
                If a dispute arises, the arbitration process begins:
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(217,33%,17%)] text-[10px]">1</span>
                  <span className="text-[hsl(215,20%,65%)]">Either party initiates dispute</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(217,33%,17%)] text-[10px]">2</span>
                  <span className="text-[hsl(215,20%,65%)]">Both parties submit evidence (screenshots, records)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(217,33%,17%)] text-[10px]">3</span>
                  <span className="text-[hsl(215,20%,65%)]">3-5 arbitrators vote on resolution</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(217,33%,17%)] text-[10px]">4</span>
                  <span className="text-[hsl(215,20%,65%)]">Losing party pays 2% arbitration fee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Stats */}
          <div className="card">
            <div className="card-content">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,20%,65%)] mb-4">
                Platform Safety Data
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Escrow Success Rate</span>
                  <span className="text-sm font-bold text-emerald-400">99.97%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Dispute Rate</span>
                  <span className="text-sm font-bold">0.03%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Avg Settlement Time</span>
                  <span className="text-sm font-bold">&lt; 2 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Total Escrowed</span>
                  <span className="text-sm font-bold">$128M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="card">
            <div className="card-content space-y-3">
              <Link href="/trade" className="btn btn-primary w-full justify-center">
                <ArrowRight className="h-4 w-4" /> View Full Trade Flow
              </Link>
              <Link href="/reputation" className="btn btn-outline w-full justify-center">
                <Users className="h-4 w-4" /> Reputation System
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
