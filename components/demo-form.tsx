'use client'

import { useState } from 'react'
import { Button } from './ui'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-indigo-200/80 bg-white/80 px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-indigo-400/40'

type Step = 'form' | 'verify' | 'done'

export function DemoForm() {
  const [step, setStep] = useState<Step>('form')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  async function requestCode() {
    setLoading(true)
    setError(null)
    setInfo(null)
    try {
      const res = await fetch('/api/demo/request-code', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, website: '' }),
      })
      const data = (await res.json()) as { error?: string; message?: string }
      if (!res.ok) throw new Error(data.error ?? 'Could not send code')
      setInfo(data.message ?? 'Check your inbox for a 6-digit code.')
      setStep('verify')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function verifyCode() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/demo/verify-code', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Verification failed')
      setVerified(true)
      setInfo('Email verified. Submit your demo request below.')
      setStep('form')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function submitDemo(e: React.FormEvent) {
    e.preventDefault()
    if (!verified) {
      setError('Verify your work email first.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/demo/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, name, company, message, website: '' }),
      })
      const data = (await res.json()) as { error?: string; message?: string }
      if (!res.ok) throw new Error(data.error ?? 'Submit failed')
      setStep('done')
      setInfo(data.message ?? 'Thanks — we will email you soon.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'done') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-ink">Request received</h3>
        <p className="mt-2 text-sm text-muted">{info}</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white/60 p-6 md:p-8">
      <p className="text-sm text-muted">
        Work email only — company domains like <span className="font-medium text-ink">you@acme.com</span>. Gmail,
        Outlook, and other personal inboxes are blocked. We verify ownership before accepting demo requests.
      </p>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {step === 'verify' && (
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-ink/80">
            Verification code
            <input
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className={inputClass}
              placeholder="123456"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={verifyCode} disabled={loading || code.length !== 6}>
              {loading ? 'Checking…' : 'Verify email'}
            </Button>
            <Button type="button" variant="ghost" onClick={requestCode} disabled={loading}>
              Resend code
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={submitDemo} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-ink/80">
          Work email *
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setVerified(false)
            }}
            className={inputClass}
            placeholder="you@company.com"
          />
        </label>
        {!verified && (
          <Button type="button" className="w-full" onClick={requestCode} disabled={loading || !email.includes('@')}>
            {loading ? 'Sending…' : 'Send verification code'}
          </Button>
        )}
        {verified && (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
            Verified — you can submit the demo request.
          </p>
        )}

        <label className="block text-sm font-medium text-ink/80">
          Full name *
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-ink/80">
          Company *
          <input required value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-ink/80">
          What should we show you? (optional)
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className={inputClass}
            placeholder="Team size, roles, ATS, compliance needs…"
          />
        </label>

        {error && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>
        )}
        {info && !error && <p className="text-sm text-indigo-700">{info}</p>}

        <Button type="submit" className="w-full" disabled={loading || !verified}>
          {loading ? 'Submitting…' : 'Request demo'}
        </Button>
      </form>
    </div>
  )
}
