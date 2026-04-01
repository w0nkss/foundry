import { createClient } from '@/utils/supabase/server'
import { getSkillColor } from '@/utils/skills'
import BackButton from '@/components/BackButton'

// Handles both old format ("React, Python") and new format (JSON array)
function parseSkills(skills) {
  try {
    return JSON.parse(skills)
  } catch {
    return skills.split(',').map((s) => s.trim()).filter(Boolean)
  }
}

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

      <BackButton />

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

      {/* Skills — rendered as Discord-style role badges */}
      {profile.skills && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Skills</h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {parseSkills(profile.skills).map((skill) => {
              const color = getSkillColor(skill)
              return (
                <span
                  key={skill}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    border: `1px solid ${color}`,
                    backgroundColor: `${color}15`,
                    color: color,
                    fontWeight: '600',
                  }}
                >
                  {/* Colored dot */}
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      flexShrink: 0,
                    }}
                  />
                  #{skill}
                </span>
              )
            })}
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
