import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If logged in, fetch their profile so we can show their name
  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <main style={{ maxWidth: '600px', margin: '64px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Welcome to Foundry</h1>
      <p style={{ color: '#555', marginTop: '8px' }}>
        The community where young tech entrepreneurs build together.
      </p>

      <div style={{ marginTop: '32px' }}>
        {user ? (
          // Logged-in view
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p>
              Hey, <strong>{profile?.name || user.email}</strong>! 👋
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={`/profile/${user.id}`}
                style={{
                  backgroundColor: '#171717',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                View my profile
              </Link>
              <Link
                href="/profile/edit"
                style={{
                  border: '1px solid #ccc',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#171717',
                }}
              >
                Edit profile
              </Link>
            </div>
          </div>
        ) : (
          // Logged-out view
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link
              href="/signup"
              style={{
                backgroundColor: '#171717',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              Join Foundry
            </Link>
            <Link
              href="/login"
              style={{
                border: '1px solid #ccc',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                color: '#171717',
              }}
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
