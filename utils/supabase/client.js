import { createBrowserClient } from '@supabase/ssr'

// Use this client in Client Components (pages/components with 'use client')
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
