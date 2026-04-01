'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  async function handleSignup(e) {
    e.preventDefault()
    setError(null)
    setMessage(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for a confirmation link!')
    }
  }

  return (
    <main style={{ maxWidth: '400px', margin: '64px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
        Create an account
      </h1>

      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px' }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <button
          type="submit"
          style={{ backgroundColor: '#171717', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px', cursor: 'pointer' }}
        >
          Sign up
        </button>
      </form>

      <p style={{ marginTop: '16px' }}>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  )
}
