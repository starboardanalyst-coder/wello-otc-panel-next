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
    title: 'Connect Wallet + Complete KYC',
    desc: 'Connect with MetaMask or other wallets, complete identity verification',
    icon: Wallet,
    detail: 'Supports multiple wallets, KYC typically completed within 24 hours'
  },
  { 
    step: 2, 
    title: 'Browse Order Book / AI Match',
    desc: 'View market depth, or let AI recommend optimal counterparties',
    icon: Search,
    detail: 'AI recommends reputable sellers with best prices based on your preferences'
  },
  { 
    step: 3, 
    title: 'Confirm USDT Locked',
    desc: 'Confirm seller\'s USDT is locked in escrow',
    icon: Lock,
    detail: 'Funds are locked before proceeding, ensuring your security'
  },
  { 
    step: 4, 
    title: 'Transfer Fiat to Seller',
    desc: 'Transfer fiat to seller\'s bank account as instructed',
    icon: Banknote,
    detail: 'Supports bank transfer, PayPal, and various payment methods'
  },
  { 
    step: 5, 
    title: 'Wait for Seller Confirmation',
    desc: 'Seller confirms receipt of fiat',
    icon: Clock,
    detail: 'If confirmation times out, you can request arbitration'
  },
  { 
    step: 6, 
    title: 'USDT Auto-Released',
    desc: 'USDT automatically deposited to your wallet',
    icon: Unlock,
    detail: 'Trade complete, you can rate the seller'
  },
]

const sellerSteps = [
  { 
    step: 1, 
    title: 'Connect Wallet + KYC + Set Payment',
    desc: 'Complete verification and set payment methods',
    icon: Wallet,
    detail: 'Add bank accounts, PayPal, and other payment methods'
  },
  { 
    step: 2, 
    title: 'Post Sell Order',
    desc: 'Set price, quantity, and payment methods',
    icon: Store,
    detail: 'Set min/max trade amounts and accepted payment methods'
  },
  { 
    step: 3, 
    title: 'USDT Auto-Locked in Escrow',
    desc: 'When buyer orders, USDT is automatically locked',
    icon: Lock,
    detail: 'Your USDT is securely locked, preventing malicious cancellations'
  },
  { 
    step: 4, 
    title: 'Wait for Buyer Transfer',
    desc: 'Buyer transfers fiat to you',
    icon: Clock,
    detail: 'Check your account when you receive transfer notification'
  },
  { 
    step: 5, 
    title: 'Confirm Receipt',
    desc: 'Confirm fiat has arrived',
    icon: CheckCircle2,
    detail: 'Only confirm after verifying actual receipt'
  },
  { 
    step: 6, 
    title: 'Trade Complete',
    desc: 'USDT released to buyer, both parties rate',
    icon: Star,
    detail: 'Good ratings help improve your reputation score'
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
              <span className="gradient-text">Trade Journey</span>
            </h1>
            <p className="text-sm text-[hsl(215,20%,65%)]">Complete buy/sell flow guide</p>
          </div>
        </div>
        <p className="mt-2 text-[hsl(215,20%,65%)]">
          Understand every step from order to completion, trade OTC safely and efficiently
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
            Buyer Journey (Buy USDT)
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
            Seller Journey (Sell USDT)
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
                  {journeyType === 'buyer' ? 'Buyer' : 'Seller'} Process Steps
                </span>
              </div>
              <span className="badge badge-secondary">{steps.length} Steps</span>
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
                              Current Step
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
                  Previous
                </button>
                <div className="text-sm text-[hsl(215,20%,65%)]">
                  Step {activeStep} / {steps.length}
                </div>
                <button 
                  onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                  className={`btn text-sm ${
                    journeyType === 'buyer' ? 'btn-primary' : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                  disabled={activeStep === steps.length}
                >
                  Next <ArrowRight className="h-3 w-3" />
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
              <span className="font-semibold">Step {activeStep} Details</span>
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
                    {activeStep === 4 && journeyType === 'buyer' && 'Double-check payment details before transferring to avoid wrong transfers'}
                    {activeStep === 5 && journeyType === 'seller' && 'Only confirm after funds are actually received to avoid fraud'}
                    {activeStep !== 4 && activeStep !== 5 && 'Contact support or request arbitration if any issues arise'}
                    {activeStep === 4 && journeyType === 'seller' && 'Please be patient, buyers typically complete transfer within 30 minutes'}
                    {activeStep === 5 && journeyType === 'buyer' && 'Request platform intervention if seller delays confirmation'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <div className="card-content">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,20%,65%)] mb-4">
                Platform Data
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Avg Trade Time</span>
                  <span className="text-sm font-bold">&lt; 30 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Success Rate</span>
                  <span className="text-sm font-bold text-emerald-400">99.97%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[hsl(215,20%,65%)]">Active Traders</span>
                  <span className="text-sm font-bold">156</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="card">
            <div className="card-content space-y-3">
              <Link href="/agent" className="btn btn-outline w-full justify-center">
                <Zap className="h-4 w-4" /> AI Matching Agent
              </Link>
              <Link href="/escrow" className="btn btn-outline w-full justify-center">
                <Shield className="h-4 w-4" /> Escrow Details
              </Link>
              <Link href="/reputation" className="btn btn-outline w-full justify-center">
                <Star className="h-4 w-4" /> Reputation System
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
