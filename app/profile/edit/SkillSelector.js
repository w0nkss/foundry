'use client'

import { useState } from 'react'
import { SKILL_CATEGORIES, getSkillColor } from '@/utils/skills'

// A single skill badge — the colored dot + skill name
function SkillBadge({ skill, selected, onClick }) {
  const color = getSkillColor(skill)

  return (
    <button
      type="button"
      onClick={() => onClick(skill)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: '999px',
        fontSize: '13px',
        cursor: 'pointer',
        border: `1px solid ${selected ? color : '#ddd'}`,
        backgroundColor: selected ? `${color}20` : '#f9f9f9',
        color: selected ? color : '#888',
        fontWeight: selected ? '600' : '400',
      }}
    >
      {/* Colored circle */}
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
    </button>
  )
}

export default function SkillSelector({ selected, onChange }) {
  const [search, setSearch] = useState('')

  function toggleSkill(skill) {
    if (selected.includes(skill)) {
      // Remove it
      onChange(selected.filter((s) => s !== skill))
    } else {
      // Add it
      onChange([...selected, skill])
    }
  }

  // Filter categories and skills by the search term
  const query = search.toLowerCase()
  const filteredCategories = SKILL_CATEGORIES.map((category) => ({
    ...category,
    skills: category.skills.filter((skill) =>
      skill.toLowerCase().includes(query)
    ),
  })).filter((category) => category.skills.length > 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Selected skills */}
      {selected.length > 0 && (
        <div>
          <p style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>
            Selected ({selected.length}):
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {selected.map((skill) => (
              <SkillBadge
                key={skill}
                skill={skill}
                selected={true}
                onClick={toggleSkill}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search input */}
      <input
        type="text"
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          border: '1px solid #ccc',
          borderRadius: '6px',
          padding: '8px 12px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />

      {/* Skill list grouped by category */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '300px', overflowY: 'auto' }}>
        {filteredCategories.map((category) => (
          <div key={category.name}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>
              {category.name}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {category.skills.map((skill) => (
                <SkillBadge
                  key={skill}
                  skill={skill}
                  selected={selected.includes(skill)}
                  onClick={toggleSkill}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
