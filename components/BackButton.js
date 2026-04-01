'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#555',
        fontSize: '14px',
        padding: '0',
        marginBottom: '24px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      ← Back
    </button>
  )
}
