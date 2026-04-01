// All available skills, grouped by category with a color per category.
// The color is used for the role-style badge on profile pages.

export const SKILL_CATEGORIES = [
  {
    name: 'Development',
    color: '#3B82F6', // blue
    skills: [
      'Frontend Development',
      'Backend Development',
      'Full Stack',
      'Mobile Development',
      'DevOps',
      'Cybersecurity',
      'Machine Learning',
      'Data Science',
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'Go',
      'Rust',
      'C',
      'C++',
      'C#',
      'Swift',
      'Kotlin',
      'PHP',
      'Ruby',
      'SQL',
      'HTML/CSS',
      'React',
      'Vue',
      'Angular',
      'Node.js',
      'Next.js',
      'Svelte',
    ],
  },
  {
    name: 'Design',
    color: '#8B5CF6', // purple
    skills: [
      'UI/UX Design',
      'Graphic Design',
      'Product Design',
      'Figma',
      'Adobe XD',
      'Illustration',
      'Motion Design',
      'Brand Design',
      'Typography',
    ],
  },
  {
    name: 'Product & Business',
    color: '#10B981', // green
    skills: [
      'Product Management',
      'Growth Marketing',
      'Content Creation',
      'Copywriting',
      'SEO',
      'Sales',
      'Market Research',
      'Business Strategy',
      'Fundraising',
      'Public Speaking',
      'Community Building',
    ],
  },
  {
    name: 'Other',
    color: '#F59E0B', // amber
    skills: [
      'No Code/Low Code',
      'Blockchain',
      'Game Development',
      'Open Source',
      'AI Prompting',
      'Technical Writing',
      'Cybersecurity',
      'AR/VR',
      'Web3',
    ],
  },
]

// Given a skill name, return its category color (or gray if not found)
export function getSkillColor(skillName) {
  for (const category of SKILL_CATEGORIES) {
    if (category.skills.includes(skillName)) {
      return category.color
    }
  }
  return '#9CA3AF' // fallback gray
}
