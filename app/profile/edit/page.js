'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import SkillSelector from './SkillSelector'
import BackButton from '@/components/BackButton'

// Handles both old format ("React, Python") and new format (JSON array)
function parseSkills(skills) {
  try {
    return JSON.parse(skills)
  } catch {
    return skills.split(',').map((s) => s.trim()).filter(Boolean)
  }
}

// Reusable styles to keep the form consistent
const inputStyle = {
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: '8px 12px',
  width: '100%',
  boxSizing: 'border-box',
}

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}

export default function EditProfilePage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    name: '',
    headline: '',
    bio: '',
    skills: [],
    building_now: '',
    past_projects: '',
    availability_status: '',
    location: '',
    featured_links: '',
  })

  // On page load: check the user is logged in, then load their existing profile
  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      // If a profile already exists, pre-fill the form
      if (profile) {
        setForm({
          name: profile.name || '',
          headline: profile.headline || '',
          bio: profile.bio || '',
          skills: profile.skills ? parseSkills(profile.skills) : [],
          building_now: profile.building_now || '',
          past_projects: profile.past_projects || '',
          availability_status: profile.availability_status || '',
          location: profile.location || '',
          featured_links: profile.featured_links || '',
        })
      }

      setLoading(false)
    }

    loadProfile()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()

    // upsert = insert if no profile exists, update if one does
    // skills is an array so we serialize it to a JSON string for storage
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...form, skills: JSON.stringify(form.skills) })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Profile saved!')
    }

    setSaving(false)
  }

  if (loading) return <p style={{ margin: '64px auto', maxWidth: '600px' }}>Loading...</p>

  return (
    <main style={{ maxWidth: '600px', margin: '64px auto', padding: '0 16px' }}>
      <BackButton />
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
        Edit Profile
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        <div style={fieldStyle}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="headline">Headline</label>
          <input
            id="headline"
            name="headline"
            type="text"
            placeholder="e.g. Building the future of edtech"
            value={form.headline}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label>Skills</label>
          <SkillSelector
            selected={form.skills}
            onChange={(skills) => setForm({ ...form, skills })}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="building_now">What are you building now?</label>
          <textarea
            id="building_now"
            name="building_now"
            rows={3}
            value={form.building_now}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="past_projects">Past projects</label>
          <textarea
            id="past_projects"
            name="past_projects"
            rows={3}
            value={form.past_projects}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="availability_status">Availability</label>
          <select
            id="availability_status"
            name="availability_status"
            value={form.availability_status}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select status</option>
            <option value="Open to collaboration">Open to collaboration</option>
            <option value="Looking for co-founder">Looking for co-founder</option>
            <option value="Open to feedback">Open to feedback</option>
            <option value="Heads down">Heads down — not available</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. Austin, TX"
            value={form.location}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="featured_links">Featured links</label>
          <textarea
            id="featured_links"
            name="featured_links"
            rows={3}
            placeholder="One link per line"
            value={form.featured_links}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <button
          type="submit"
          disabled={saving}
          style={{
            backgroundColor: saving ? '#999' : '#171717',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px',
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>

      </form>
    </main>
  )
}
