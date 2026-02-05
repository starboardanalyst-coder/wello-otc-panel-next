'use client'

import { useState } from 'react'
import { ArrowLeftRight, DollarSign, Percent, Clock, CreditCard, ChevronDown, AlertCircle, CheckCircle, Zap, TrendingUp, TrendingDown } from 'lucide-react'

type OrderSide = 'buy' | 'sell'

const paymentOptions = [
  'Bank Transfer',
  'Wire Transfer',
  'SWIFT',
  'SEPA',
  'Wise',
  'Revolut',
  'PayPal',
  'Zelle',
]

export default function RegisterOrderPage() {
  const [side, setSide] = useState<OrderSide>('buy')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [minOrder, setMinOrder] = useState('')
  const [maxOrder, setMaxOrder] = useState('')
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])
  const [responseTime, setResponseTime] = useState('15')
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const marketPrice = 1.001

  const togglePayment = (payment: string) => {
    if (selectedPayments.includes(payment)) {
      setSelectedPayments(selectedPayments.filter(p => p !== payment))
    } else {
      setSelectedPayments([...selectedPayments, payment])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const premium = price ? ((parseFloat(price) - marketPrice) / marketPrice * 100).toFixed(2) : '0.00'
  const premiumValue = parseFloat(premium)

  const sideColor = side === 'buy' ? '#00F5D4' : '#FF6B9D'

  return (
    <div className="flex-1 overflow-y-auto bg-mesh relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${side === 'buy' ? 'rgba(0,245,212,0.08)' : 'rgba(255,107,157,0.08)'} 0%, transparent 70%)` }} 
      />
      
      <div className="relative z-10 py-12">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
              <Zap size={14} className="text-[#7B61FF]" />
              <span className="text-xs font-medium text-white/60 uppercase tracking-wider">Post New Order</span>
            </div>
            <h1 className="text-4xl font-black text-white mb-3">
              Create <span className="gradient-text">OTC Order</span>
            </h1>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              Set your price and terms. Your order will be visible to verified counterparties.
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mb-8 p-5 rounded-2xl border glow-buy" style={{ background: 'rgba(0,245,212,0.05)', borderColor: 'rgba(0,245,212,0.2)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00F5D4]/20 flex items-center justify-center">
                  <CheckCircle className="text-[#00F5D4]" size={20} />
                </div>
                <div>
                  <div className="font-bold text-[#00F5D4] mb-0.5">Order Submitted!</div>
                  <div className="text-sm text-[#00F5D4]/60">It will appear on the market after review.</div>
                </div>
              </div>
            </div>
          )}

          {/* Side Toggle */}
          <div className="glass-card rounded-3xl p-2 mb-8">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSide('buy')}
                className={`py-5 rounded-2xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  side === 'buy'
                    ? 'toggle-buy active'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                <TrendingUp size={22} />
                Buy USDT
              </button>
              <button
                type="button"
                onClick={() => setSide('sell')}
                className={`py-5 rounded-2xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  side === 'sell'
                    ? 'toggle-sell active'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                <TrendingDown size={22} />
                Sell USDT
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Price Section */}
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${sideColor}20` }}>
                    <DollarSign size={16} style={{ color: sideColor }} />
                  </div>
                  <span className="font-bold text-white">Your Price</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                  <span className="text-xs text-white/40">Market:</span>
                  <span className="text-sm font-bold font-number gradient-text-subtle">${marketPrice.toFixed(4)}</span>
                </div>
              </div>
              
              <div className="relative mb-4">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-white/30">$</span>
                <input
                  type="number"
                  step="0.0001"
                  placeholder="1.0050"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full input-premium rounded-2xl py-5 pl-12 pr-5 text-3xl font-black font-number text-white placeholder:text-white/20"
                />
              </div>
              
              {price && (
                <div className={`flex items-center gap-2 p-3 rounded-xl ${
                  premiumValue > 0 ? 'bg-[#00F5D4]/10' : premiumValue < 0 ? 'bg-[#FF6B9D]/10' : 'bg-white/5'
                }`}>
                  <Percent size={14} style={{ color: premiumValue > 0 ? '#00F5D4' : premiumValue < 0 ? '#FF6B9D' : 'white' }} />
                  <span className={`text-sm font-bold font-number ${
                    premiumValue > 0 ? 'text-[#00F5D4]' : premiumValue < 0 ? 'text-[#FF6B9D]' : 'text-white/50'
                  }`}>
                    {premiumValue > 0 ? '+' : ''}{premium}% {premiumValue > 0 ? 'premium' : premiumValue < 0 ? 'discount' : 'at market'}
                  </span>
                </div>
              )}
            </div>

            {/* Amount Section */}
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#7B61FF]/20 flex items-center justify-center">
                  <ArrowLeftRight size={16} className="text-[#7B61FF]" />
                </div>
                <span className="font-bold text-white">Total Amount</span>
              </div>
              
              <div className="relative mb-5">
                <input
                  type="number"
                  placeholder="100,000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full input-premium rounded-2xl py-5 px-5 pr-20 text-3xl font-black font-number text-white placeholder:text-white/20"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-white/30">USDT</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider">Min Order</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-bold">$</span>
                    <input
                      type="number"
                      placeholder="1,000"
                      value={minOrder}
                      onChange={(e) => setMinOrder(e.target.value)}
                      className="w-full input-premium rounded-xl py-3.5 pl-9 pr-4 font-number font-bold text-white placeholder:text-white/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider">Max Order</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-bold">$</span>
                    <input
                      type="number"
                      placeholder="100,000"
                      value={maxOrder}
                      onChange={(e) => setMaxOrder(e.target.value)}
                      className="w-full input-premium rounded-xl py-3.5 pl-9 pr-4 font-number font-bold text-white placeholder:text-white/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#FF6B9D]/20 flex items-center justify-center">
                  <CreditCard size={16} className="text-[#FF6B9D]" />
                </div>
                <span className="font-bold text-white">Payment Methods</span>
              </div>
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
                  className="w-full input-premium rounded-2xl py-4 px-5 text-left flex items-center justify-between"
                >
                  {selectedPayments.length > 0 ? (
                    <span className="text-white font-medium">
                      {selectedPayments.slice(0, 2).join(', ')}
                      {selectedPayments.length > 2 && <span className="text-white/50"> +{selectedPayments.length - 2} more</span>}
                    </span>
                  ) : (
                    <span className="text-white/30">Select payment methods...</span>
                  )}
                  <ChevronDown size={18} className={`text-white/40 transition-transform duration-300 ${showPaymentDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showPaymentDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl p-2 z-20 shadow-2xl border border-white/10">
                    {paymentOptions.map((payment) => (
                      <button
                        key={payment}
                        type="button"
                        onClick={() => togglePayment(payment)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${
                          selectedPayments.includes(payment)
                            ? 'bg-[#00F5D4]/10 text-[#00F5D4]'
                            : 'text-white/70 hover:bg-white/5'
                        }`}
                      >
                        <span className="font-medium">{payment}</span>
                        {selectedPayments.includes(payment) && <CheckCircle size={16} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {selectedPayments.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedPayments.map((payment) => (
                    <span
                      key={payment}
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-white/70 border border-white/10 flex items-center gap-2"
                    >
                      {payment}
                      <button
                        type="button"
                        onClick={() => togglePayment(payment)}
                        className="text-white/30 hover:text-white transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Response Time */}
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#7B61FF]/20 flex items-center justify-center">
                  <Clock size={16} className="text-[#7B61FF]" />
                </div>
                <span className="font-bold text-white">Response Time</span>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {['5', '15', '30', '60'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setResponseTime(time)}
                    className={`py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                      responseTime === time
                        ? 'bg-gradient-to-r from-[#7B61FF]/20 to-[#00F5D4]/20 text-white border border-[#7B61FF]/30'
                        : 'glass-card text-white/40 hover:text-white/60'
                    }`}
                  >
                    &lt; {time}m
                  </button>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={18} className="text-yellow-500" />
              </div>
              <div>
                <div className="font-bold text-yellow-500 mb-1">KYB Required</div>
                <p className="text-sm text-yellow-500/60">
                  Orders require business verification. Your order will only be visible to verified counterparties.
                </p>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full py-6 rounded-3xl font-black text-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                side === 'buy' ? 'btn-primary glow-buy' : 'btn-sell glow-sell'
              }`}
            >
              <Zap size={22} />
              Post {side === 'buy' ? 'Buy' : 'Sell'} Order
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
