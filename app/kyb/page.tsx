'use client'

import { useState } from 'react'
import { Building2, Upload, Check, ChevronRight, Shield, FileText, Globe, Users, AlertCircle, Sparkles, Zap } from 'lucide-react'

type KYBStep = 'company' | 'documents' | 'directors' | 'review'

interface FormData {
  companyName: string
  registrationNumber: string
  country: string
  address: string
  website: string
  businessType: string
  expectedVolume: string
}

export default function KYBPage() {
  const [currentStep, setCurrentStep] = useState<KYBStep>('company')
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    registrationNumber: '',
    country: '',
    address: '',
    website: '',
    businessType: '',
    expectedVolume: '',
  })
  const [uploadedDocs, setUploadedDocs] = useState<{
    incorporation: boolean
    proofOfAddress: boolean
    shareholderRegistry: boolean
  }>({
    incorporation: false,
    proofOfAddress: false,
    shareholderRegistry: false,
  })
  const [directors, setDirectors] = useState([
    { name: '', email: '', position: '', idUploaded: false }
  ])

  const steps: { id: KYBStep; title: string; icon: React.ReactNode }[] = [
    { id: 'company', title: 'Company', icon: <Building2 size={16} /> },
    { id: 'documents', title: 'Documents', icon: <FileText size={16} /> },
    { id: 'directors', title: 'Directors', icon: <Users size={16} /> },
    { id: 'review', title: 'Review', icon: <Shield size={16} /> },
  ]

  const currentIndex = steps.findIndex(s => s.id === currentStep)

  const updateFormData = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const addDirector = () => {
    setDirectors([...directors, { name: '', email: '', position: '', idUploaded: false }])
  }

  const updateDirector = (index: number, key: string, value: string | boolean) => {
    const updated = [...directors]
    updated[index] = { ...updated[index], [key]: value }
    setDirectors(updated)
  }

  const handleNext = () => {
    const nextIndex = currentIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id)
    }
  }

  const handleBack = () => {
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id)
    }
  }

  const handleSubmit = () => {
    alert('KYB Application Submitted! You will receive an email within 2-3 business days.')
  }

  return (
    <div className="flex-1 overflow-y-auto bg-mesh relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full bg-[#7B61FF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-[#00F5D4]/5 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 py-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 relative"
              style={{ 
                background: 'linear-gradient(135deg, rgba(0,245,212,0.2) 0%, rgba(123,97,255,0.2) 100%)',
                boxShadow: '0 0 60px rgba(0,245,212,0.2)'
              }}
            >
              <Shield size={36} className="text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#7B61FF] flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-black text-white mb-3">
              <span className="gradient-text">KYB</span> Verification
            </h1>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              Complete business verification to unlock institutional OTC trading
            </p>
          </div>

          {/* Progress Steps */}
          <div className="glass-card rounded-3xl p-6 mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => index <= currentIndex && setCurrentStep(step.id)}
                    disabled={index > currentIndex}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 ${
                      step.id === currentStep
                        ? 'step-active text-black font-bold'
                        : index < currentIndex
                          ? 'step-completed text-[#00F5D4] font-medium'
                          : 'text-white/30 cursor-not-allowed'
                    }`}
                  >
                    {index < currentIndex ? (
                      <Check size={16} />
                    ) : (
                      step.icon
                    )}
                    <span className="text-sm hidden sm:inline">{step.title}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 rounded-full transition-colors duration-300 ${
                      index < currentIndex ? 'bg-[#00F5D4]/50' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="glass-card rounded-3xl p-8">
            {currentStep === 'company' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#7B61FF]/20 flex items-center justify-center">
                    <Building2 size={20} className="text-[#7B61FF]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Company Information</h2>
                    <p className="text-sm text-white/40">Basic details about your business</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider">Legal Company Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateFormData('companyName', e.target.value)}
                      placeholder="Acme Holdings Ltd"
                      className="w-full input-premium rounded-xl py-3.5 px-4 text-white placeholder:text-white/20 font-medium"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider">Registration Number *</label>
                    <input
                      type="text"
                      value={formData.registrationNumber}
                      onChange={(e) => updateFormData('registrationNumber', e.target.value)}
                      placeholder="12345678"
                      className="w-full input-premium rounded-xl py-3.5 px-4 font-number text-white placeholder:text-white/20"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider">Country *</label>
                    <select
                      value={formData.country}
                      onChange={(e) => updateFormData('country', e.target.value)}
                      className="w-full input-premium rounded-xl py-3.5 px-4 text-white"
                    >
                      <option value="" className="bg-[#0A0A0F]">Select country...</option>
                      <option value="UK" className="bg-[#0A0A0F]">United Kingdom</option>
                      <option value="US" className="bg-[#0A0A0F]">United States</option>
                      <option value="SG" className="bg-[#0A0A0F]">Singapore</option>
                      <option value="HK" className="bg-[#0A0A0F]">Hong Kong</option>
                      <option value="CH" className="bg-[#0A0A0F]">Switzerland</option>
                      <option value="DE" className="bg-[#0A0A0F]">Germany</option>
                      <option value="OTHER" className="bg-[#0A0A0F]">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider flex items-center gap-1">
                      <Globe size={10} />
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => updateFormData('website', e.target.value)}
                      placeholder="https://example.com"
                      className="w-full input-premium rounded-xl py-3.5 px-4 text-white placeholder:text-white/20"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider">Registered Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    placeholder="123 Business Street, London, EC1A 1BB, United Kingdom"
                    rows={3}
                    className="w-full input-premium rounded-xl py-3.5 px-4 text-white placeholder:text-white/20 resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider">Business Type *</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => updateFormData('businessType', e.target.value)}
                      className="w-full input-premium rounded-xl py-3.5 px-4 text-white"
                    >
                      <option value="" className="bg-[#0A0A0F]">Select type...</option>
                      <option value="exchange" className="bg-[#0A0A0F]">Crypto Exchange</option>
                      <option value="trading" className="bg-[#0A0A0F]">Prop Trading Firm</option>
                      <option value="fund" className="bg-[#0A0A0F]">Investment Fund</option>
                      <option value="otc" className="bg-[#0A0A0F]">OTC Desk</option>
                      <option value="treasury" className="bg-[#0A0A0F]">Corporate Treasury</option>
                      <option value="other" className="bg-[#0A0A0F]">Other Financial Services</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider">Expected Monthly Volume *</label>
                    <select
                      value={formData.expectedVolume}
                      onChange={(e) => updateFormData('expectedVolume', e.target.value)}
                      className="w-full input-premium rounded-xl py-3.5 px-4 text-white"
                    >
                      <option value="" className="bg-[#0A0A0F]">Select range...</option>
                      <option value="100k" className="bg-[#0A0A0F]">$100K - $500K</option>
                      <option value="500k" className="bg-[#0A0A0F]">$500K - $1M</option>
                      <option value="1m" className="bg-[#0A0A0F]">$1M - $5M</option>
                      <option value="5m" className="bg-[#0A0A0F]">$5M - $10M</option>
                      <option value="10m" className="bg-[#0A0A0F]">$10M+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'documents' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B9D]/20 flex items-center justify-center">
                    <FileText size={20} className="text-[#FF6B9D]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Corporate Documents</h2>
                    <p className="text-sm text-white/40">PDF, JPG, PNG (max 10MB each)</p>
                  </div>
                </div>
                
                {[
                  { key: 'incorporation', title: 'Certificate of Incorporation', desc: 'Official company registration document', icon: FileText },
                  { key: 'proofOfAddress', title: 'Proof of Business Address', desc: 'Utility bill or bank statement (< 3 months)', icon: Building2 },
                  { key: 'shareholderRegistry', title: 'Shareholder Registry', desc: 'List of all shareholders with ownership %', icon: Users },
                ].map((doc) => (
                  <div
                    key={doc.key}
                    className={`p-6 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                      uploadedDocs[doc.key as keyof typeof uploadedDocs]
                        ? 'border-[#00F5D4]/30 bg-[#00F5D4]/5'
                        : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          uploadedDocs[doc.key as keyof typeof uploadedDocs] ? 'bg-[#00F5D4]/20' : 'bg-white/5'
                        }`}>
                          <doc.icon size={22} className={uploadedDocs[doc.key as keyof typeof uploadedDocs] ? 'text-[#00F5D4]' : 'text-white/40'} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white flex items-center gap-2 mb-1">
                            {uploadedDocs[doc.key as keyof typeof uploadedDocs] && (
                              <Check size={16} className="text-[#00F5D4]" />
                            )}
                            {doc.title}
                          </h3>
                          <p className="text-sm text-white/40">{doc.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setUploadedDocs(prev => ({ ...prev, [doc.key]: !prev[doc.key as keyof typeof uploadedDocs] }))}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                          uploadedDocs[doc.key as keyof typeof uploadedDocs]
                            ? 'bg-[#00F5D4]/20 text-[#00F5D4]'
                            : 'glass-card text-white/60 hover:text-white'
                        }`}
                      >
                        <Upload size={16} />
                        {uploadedDocs[doc.key as keyof typeof uploadedDocs] ? 'Uploaded' : 'Upload'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentStep === 'directors' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#00F5D4]/20 flex items-center justify-center">
                    <Users size={20} className="text-[#00F5D4]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Directors & UBOs</h2>
                    <p className="text-sm text-white/40">Add all directors and 25%+ shareholders</p>
                  </div>
                </div>
                
                {directors.map((director, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white/70 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#7B61FF]/20 flex items-center justify-center text-xs font-bold text-[#7B61FF]">
                          {index + 1}
                        </div>
                        Person {index + 1}
                      </span>
                      {index > 0 && (
                        <button
                          onClick={() => setDirectors(directors.filter((_, i) => i !== index))}
                          className="text-xs text-[#FF6B9D] hover:text-[#FF6B9D]/80 font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider">Full Name *</label>
                        <input
                          type="text"
                          value={director.name}
                          onChange={(e) => updateDirector(index, 'name', e.target.value)}
                          placeholder="John Smith"
                          className="w-full input-premium rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider">Email *</label>
                        <input
                          type="email"
                          value={director.email}
                          onChange={(e) => updateDirector(index, 'email', e.target.value)}
                          placeholder="john@company.com"
                          className="w-full input-premium rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-white/40 mb-2 block font-medium uppercase tracking-wider">Position *</label>
                        <select
                          value={director.position}
                          onChange={(e) => updateDirector(index, 'position', e.target.value)}
                          className="w-full input-premium rounded-xl py-3 px-4 text-sm text-white"
                        >
                          <option value="" className="bg-[#0A0A0F]">Select...</option>
                          <option value="director" className="bg-[#0A0A0F]">Director</option>
                          <option value="ceo" className="bg-[#0A0A0F]">CEO</option>
                          <option value="cfo" className="bg-[#0A0A0F]">CFO</option>
                          <option value="ubo" className="bg-[#0A0A0F]">UBO (25%+)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-xs text-white/40 font-medium">ID Verification</span>
                      <button
                        onClick={() => updateDirector(index, 'idUploaded', !director.idUploaded)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          director.idUploaded
                            ? 'bg-[#00F5D4]/20 text-[#00F5D4]'
                            : 'glass-card text-white/50 hover:text-white/70'
                        }`}
                      >
                        {director.idUploaded ? <Check size={14} /> : <Upload size={14} />}
                        {director.idUploaded ? 'ID Uploaded' : 'Upload ID'}
                      </button>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={addDirector}
                  className="w-full py-4 rounded-2xl border-2 border-dashed border-white/10 text-sm font-semibold text-white/40 hover:text-white/60 hover:border-white/20 transition-all duration-300"
                >
                  + Add Another Person
                </button>
              </div>
            )}

            {currentStep === 'review' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4]/20 to-[#7B61FF]/20 flex items-center justify-center">
                    <Shield size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Review & Submit</h2>
                    <p className="text-sm text-white/40">Verify your information before submitting</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h3 className="text-sm font-bold text-white/50 mb-4 uppercase tracking-wider">Company Details</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <span className="text-white/40">Name:</span>
                      <span className="text-white font-medium">{formData.companyName || '—'}</span>
                      <span className="text-white/40">Registration:</span>
                      <span className="text-white font-number">{formData.registrationNumber || '—'}</span>
                      <span className="text-white/40">Country:</span>
                      <span className="text-white">{formData.country || '—'}</span>
                      <span className="text-white/40">Type:</span>
                      <span className="text-white">{formData.businessType || '—'}</span>
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h3 className="text-sm font-bold text-white/50 mb-4 uppercase tracking-wider">Documents</h3>
                    <div className="space-y-2">
                      {Object.entries(uploadedDocs).map(([key, uploaded]) => (
                        <div key={key} className="flex items-center gap-3">
                          {uploaded ? (
                            <Check size={16} className="text-[#00F5D4]" />
                          ) : (
                            <AlertCircle size={16} className="text-yellow-500" />
                          )}
                          <span className={`text-sm ${uploaded ? 'text-white' : 'text-yellow-500'}`}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h3 className="text-sm font-bold text-white/50 mb-4 uppercase tracking-wider">
                      Authorized Persons ({directors.filter(d => d.name).length})
                    </h3>
                    <div className="space-y-2">
                      {directors.filter(d => d.name).map((d, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-white font-medium">{d.name}</span>
                          <span className="text-white/40">{d.position}</span>
                        </div>
                      ))}
                      {directors.filter(d => d.name).length === 0 && (
                        <span className="text-white/40 text-sm">No persons added</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-5 rounded-2xl border glow-primary" style={{ background: 'rgba(0,245,212,0.05)', borderColor: 'rgba(0,245,212,0.2)' }}>
                  <div className="flex items-start gap-3">
                    <Zap size={18} className="text-[#00F5D4] mt-0.5" />
                    <div>
                      <div className="font-bold text-[#00F5D4] mb-1">Processing Time</div>
                      <p className="text-sm text-[#00F5D4]/60">
                        Your application will be reviewed within 2-3 business days. You&apos;ll receive an email notification once approved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/5">
              {currentIndex > 0 ? (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl text-white/60 hover:text-white font-semibold transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}
              
              {currentIndex < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="btn-primary px-8 py-4 rounded-2xl font-bold flex items-center gap-2"
                >
                  Continue
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn-primary glow-buy px-8 py-4 rounded-2xl font-bold flex items-center gap-2"
                >
                  <Zap size={18} />
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
