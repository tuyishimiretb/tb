import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import RevealText from './RevealText'

function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true
        const start = performance.now()
        const animate = (now) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * end))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref} className="counter-value">{count}{suffix}</span>
}

const stats = [
  { value: 2, suffix: '+', label: 'Years of Experience', desc: 'Building production apps' },
  { value: 20, suffix: '+', label: 'Projects Delivered', desc: 'From concept to launch' },
  { value: 10, suffix: '+', label: 'Happy Clients', desc: 'Across 3 countries' },
]

const journey = [
  { year: '2023', event: 'Started Software Development Level 3, mastering programming fundamentals and web basics' },
  { year: '2024', event: 'Advanced to Software Development Level 4, building full-stack applications' },
  { year: '2025', event: 'Reached Software Development Level 5, working on real-world projects with modern frameworks' },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
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
            / about
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '60px',
          alignItems: 'start',
        }} className="about-grid">
          {/* Left - Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: 'sticky', top: 120 }}
          >
            <div className="photo-frame">
              <img
                src="/tb/IMG-20260630-WA0025.jpg"
                alt="Tuyishimire Bosco"
                className="profile-photo"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'flex'
                }}
              />
              <div className="photo-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 8 }}>Add your photo here</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Main content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <RevealText
              text="I craft digital experiences that matter"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '1.5rem',
                gap: '0.15em',
              }}
            />

            <div style={{
              padding: '24px',
              borderRadius: 16,
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              marginBottom: '1.5rem',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute',
                top: -10, left: 24,
                padding: '2px 10px',
                borderRadius: 6,
                background: 'var(--primary)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
              }}>BIO</span>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.9,
                fontSize: '0.95rem',
                marginBottom: '1rem',
              }}>
                A passionate Full Stack Developer based in Rwanda with a keen eye for creating
                beautiful, functional, and user-centered digital experiences.
              </p>
              <p style={{
                color: 'var(--text-muted)',
                lineHeight: 1.9,
                fontSize: '0.9rem',
              }}>
                With over 2 years of hands-on experience, I've worked on diverse projects ranging
                from e-commerce platforms to real-time applications.
              </p>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 16, marginBottom: '2.5rem' }}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{
                    flex: 1,
                    padding: '16px 12px',
                    borderRadius: 12,
                    background: 'rgba(var(--primary-rgb),0.05)',
                    border: '1px solid rgba(var(--primary-rgb),0.08)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 800,
                    background: 'var(--gradient-1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    <AnimatedCounter end={s.value} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {s.label.split(' ')[0]}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Journey timeline */}
            <div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
              }}>
                / my journey
              </h3>

              <div style={{ position: 'relative', paddingLeft: 28 }}>
                <div style={{
                  position: 'absolute',
                  left: 8,
                  top: 0,
                  bottom: 0,
                  width: 1.5,
                  background: 'linear-gradient(to bottom, var(--primary), var(--secondary), transparent)',
                }} />

                {journey.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                    style={{
                      position: 'relative',
                      paddingBottom: i < journey.length - 1 ? 28 : 0,
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      left: -24,
                      top: 4,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: i === journey.length - 1 ? 'var(--gradient-1)' : 'var(--primary-dark)',
                      border: '2px solid var(--bg)',
                      boxShadow: `0 0 0 2px ${i === journey.length - 1 ? 'var(--primary)' : 'rgba(var(--primary-rgb),0.3)'}`,
                    }} />

                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--primary)',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                      marginBottom: 2,
                    }}>
                      {item.year}
                    </div>
                    <div style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}>
                      {item.event}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, x: 4 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: '1.5rem',
                  padding: '12px 28px',
                  borderRadius: 50,
                  background: 'var(--gradient-1)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                Let's Work Together →
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .photo-frame {
          width: 100%;
          aspect-ratio: 1;
          max-width: 400px;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        .photo-frame::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: var(--gradient-1);
          z-index: -1;
          opacity: 0.6;
        }
        .profile-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .photo-placeholder {
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .photo-frame { max-width: 280px; }
        }
      `}</style>
    </section>
  )
}
