import { createClient } from '@/utils/supabase/server'

export default async function ProfilePage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (!profile) {
    return (
      <main style={{ maxWidth: '600px', margin: '64px auto', padding: '0 16px' }}>
        <p>Profile not found.</p>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: '600px', margin: '64px auto', padding: '0 16px' }}>

      {/* Name and headline */}
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>{profile.name}</h1>
      {profile.headline && (
        <p style={{ color: '#555', marginTop: '4px', marginBottom: '24px' }}>{profile.headline}</p>
      )}

      {/* Meta: location, availability, member since */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px', fontSize: '14px', color: '#666' }}>
        {profile.location && <span>📍 {profile.location}</span>}
        {profile.availability_status && <span>🟢 {profile.availability_status}</span>}
        {profile.member_since && (
          <span>
            Member since {new Date(profile.member_since).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        )}
      </div>

      {/* Bio */}
      {profile.bio && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '8px' }}>About</h2>
          <p style={{ lineHeight: '1.6' }}>{profile.bio}</p>
        </section>
      )}

      {/* Skills */}
      {profile.skills && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Skills</h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {profile.skills.split(',').map((skill) => (
              <span
                key={skill}
                style={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  fontSize: '14px',
                }}
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Building now */}
      {profile.building_now && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Building now</h2>
          <p style={{ lineHeight: '1.6' }}>{profile.building_now}</p>
        </section>
      )}

      {/* Past projects */}
      {profile.past_projects && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Past projects</h2>
          <p style={{ lineHeight: '1.6' }}>{profile.past_projects}</p>
        </section>
      )}

      {/* Featured links */}
      {profile.featured_links && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Links</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', listStyle: 'none', padding: 0 }}>
            {profile.featured_links.split('\n').filter(Boolean).map((link) => (
              <li key={link}>
                <a
                  href={link.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0070f3' }}
                >
                  {link.trim()}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

    </main>
  )
}
