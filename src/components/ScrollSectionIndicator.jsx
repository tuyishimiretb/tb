import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const sections = [
  { id: 'home', name: 'Home', num: '01' },
  { id: 'about', name: 'About', num: '02' },
  { id: 'skills', name: 'Skills', num: '03' },
  { id: 'projects', name: 'Projects', num: '04' },
  { id: 'experience', name: 'Experience', num: '05' },
  { id: 'education', name: 'Education', num: '06' },
  { id: 'contact', name: 'Contact', num: '07' },
]

export default function ScrollSectionIndicator() {
  const [active, setActive] = useState('home')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id)
        }
      })
      if (window.scrollY > window.innerHeight * 0.5) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }, { threshold: 0.3 })

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const currentIdx = sections.findIndex(s => s.id === active)
  const currentSection = sections.find(s => s.id === active)

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{
        opacity: visible ? 1 : 0,
        x: visible ? 0 : 40,
      }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        pointerEvents: 'none',
      }}
      className="section-indicator"
    >
      <motion.div
        key={active}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--primary)',
          fontWeight: 600,
          letterSpacing: 1,
        }}
      >
        {currentSection?.num}
      </motion.div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'center',
      }}>
        {sections.map((section, i) => {
          const isActive = section.id === active
          const isPast = currentIdx > i
          return (
            <div
              key={section.id}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 8,
              }}
            >
              <motion.div
                animate={{
                  width: isActive ? 12 : 4,
                  height: isActive ? 12 : 4,
                  background: isActive
                    ? 'var(--gradient-1)'
                    : isPast
                      ? 'rgba(var(--primary-rgb),0.3)'
                      : 'rgba(var(--primary-rgb),0.1)',
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  borderRadius: '50%',
                }}
              />
            </div>
          )
        })}
      </div>

      <motion.div
        key={`name-${active}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: '0.55rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          letterSpacing: 1,
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          height: 60,
          opacity: 0.6,
        }}
      >
        {currentSection?.name}
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .section-indicator { display: none !important; }
        }
      `}</style>
    </motion.div>
  )
}
