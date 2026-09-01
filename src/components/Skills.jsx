import { motion } from 'framer-motion'
import RevealText from './RevealText'

const skillGroups = [
  {
    category: 'Frontend',
    icon: 'T',
    color: '#FF6B35',
    skills: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Framer Motion', 'HTML5 / CSS3'],
  },
  {
    category: 'Backend',
    icon: 'S',
    color: '#06D6A0',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Authentication'],
  },
  {
    category: 'Database',
    icon: 'D',
    color: '#FFB703',
    skills: ['MongoDB', 'MySQL', 'Firebase Firestore', 'Schema Design'],
  },
  {
    category: 'Tools & Cloud',
    icon: 'T',
    color: '#FF8C5A',
    skills: ['Git / GitHub', 'Docker', 'Cloudinary', 'Vite', 'npm / CLI'],
  },
]

const coreSkills = [
  { name: 'React', level: 90 },
  { name: 'Node.js', level: 88 },
  { name: 'JavaScript', level: 92 },
  { name: 'Express', level: 85 },
  { name: 'MongoDB', level: 82 },
  { name: 'Tailwind CSS', level: 86 },
]

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '140px 24px', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'var(--primary)',
            marginBottom: '0.75rem',
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(var(--primary-rgb), 0.1)',
            border: '1px solid rgba(var(--primary-rgb), 0.15)',
            fontFamily: 'var(--font-mono)',
          }}>
            / skills
          </span>
          <RevealText
            text="Technologies I work with"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              background: 'var(--gradient-1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gap: '40px',
        }} className="skills-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              padding: '28px',
              borderRadius: 16,
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              marginBottom: '1.8rem',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
            }}>
              / core skills
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {coreSkills.map((skill, i) => (
                <div key={skill.name}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}>
                    <span style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                    }}>
                      {skill.name}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      color: 'var(--primary)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div style={{
                    height: 8,
                    borderRadius: 6,
                    background: 'rgba(var(--primary-rgb),0.08)',
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.12, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        borderRadius: 6,
                        background: 'var(--gradient-1)',
                        position: 'relative',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  padding: '18px 20px',
                  borderRadius: 14,
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${group.color}55`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                }}>
                  <span style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: `${group.color}14`,
                    border: `1px solid ${group.color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: group.color,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}>
                    {group.icon}
                  </span>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                  }}>
                    {group.category}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {group.skills.map(tag => (
                    <span key={tag} style={{
                      padding: '3px 10px',
                      borderRadius: 10,
                      background: `${group.color}0e`,
                      border: `1px solid ${group.color}18`,
                      fontSize: '0.7rem',
                      color: group.color,
                      fontWeight: 500,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  )
}
