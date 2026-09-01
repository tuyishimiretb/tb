import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedLogo from './AnimatedLogo'

const navLinks = [
  { name: 'Home', href: '#home', num: '01', desc: 'Welcome & introduction' },
  { name: 'About', href: '#about', num: '02', desc: 'My journey & story' },
  { name: 'Skills', href: '#skills', num: '03', desc: 'Technologies & expertise' },
  { name: 'Projects', href: '#projects', num: '04', desc: 'Featured work & portfolio' },
  { name: 'Experience', href: '#experience', num: '05', desc: 'Work history & roles' },
  { name: 'Education', href: '#education', num: '06', desc: 'Academic background' },
  { name: 'Contact', href: '#contact', num: '07', desc: 'Get in touch' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const [hoveredLink, setHoveredLink] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(`#${entry.target.id}`)
        }
      })
    }, { threshold: 0.3 })
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Ambient glow behind navbar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 600,
        height: 120,
        background: 'radial-gradient(ellipse at center, rgba(var(--primary-rgb),0.06), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 49,
      }} />

      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          padding: scrolled ? '6px 18px' : '8px 20px',
          borderRadius: 60,
          background: scrolled
            ? 'rgba(8,6,5,0.88)'
            : 'rgba(8,6,5,0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(var(--primary-rgb),0.1)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(var(--primary-rgb),0.05)'
            : '0 4px 20px rgba(0,0,0,0.2)',
          maxWidth: 860,
          width: 'calc(100% - 48px)',
        }}
      >
        {/* Animated gradient border */}
        <div style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 60,
          padding: 1,
          background: 'linear-gradient(60deg, #FF6B35, #FFB703, #06D6A0, #FF6B35, #FF8C5A, #FFD166, #FF6B35)',
          backgroundSize: '300% 300%',
          animation: 'nav-border 6s ease-in-out infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.5,
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          position: 'relative',
        }}>
          {/* Logo with animated mark */}
          <a href="#home" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <AnimatedLogo size={30} />
          </a>

          {/* Right side: nav + status + CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            {/* Status badge - hidden on mobile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '3px 10px',
              borderRadius: 20,
              background: 'rgba(6,214,160,0.08)',
              border: '1px solid rgba(6,214,160,0.12)',
              fontSize: '0.65rem',
              color: '#06D6A0',
              fontFamily: 'var(--font-mono)',
            }} className="status-badge">
              <span style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#06D6A0',
                animation: 'nav-dot 1.5s ease-in-out infinite',
              }} />
              Available
            </div>

            {/* Nav links desktop */}
            <div style={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              position: 'relative',
            }} className="nav-links-desktop">
              {navLinks.map((link) => {
                const isActive = active === link.href
                const isHovered = hoveredLink === link.href
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onMouseEnter={(e) => {
                      setHoveredLink(link.href)
                      const rect = e.currentTarget.getBoundingClientRect()
                      setTooltipPos({ x: rect.left + rect.width / 2, y: rect.bottom + 8 })
                    }}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 20,
                      fontSize: '0.78rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive
                        ? 'var(--text)'
                        : isHovered
                          ? 'var(--text-secondary)'
                          : 'var(--text-muted)',
                      position: 'relative',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      overflow: 'visible',
                    }}
                  >
                    {/* Background pill on hover */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isHovered || isActive ? 1 : 0,
                        scale: isHovered || isActive ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 20,
                        background: isActive
                          ? 'rgba(var(--primary-rgb),0.12)'
                          : 'rgba(var(--primary-rgb),0.06)',
                      }}
                    />

                    {/* Bottom line indicator */}
                    <motion.div
                      animate={{
                        width: isActive ? '60%' : '0%',
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        bottom: 2,
                        left: '20%',
                        height: 2,
                        borderRadius: 1,
                        background: 'var(--gradient-1)',
                      }}
                    />

                    {/* Number prefix on hover */}
                    <motion.span
                      animate={{
                        opacity: isHovered || isActive ? 1 : 0,
                        x: isHovered || isActive ? 0 : -4,
                      }}
                      transition={{ duration: 0.15 }}
                      style={{
                        fontSize: '0.55rem',
                        color: 'var(--primary)',
                        fontFamily: 'var(--font-mono)',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {link.num}
                    </motion.span>

                    <span style={{ position: 'relative', zIndex: 1 }}>
                      {link.name}
                    </span>
                  </motion.a>
                )
              })}
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredLink && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'fixed',
                    left: tooltipPos.x,
                    top: tooltipPos.y,
                    transform: 'translateX(-50%)',
                    padding: '6px 14px',
                    borderRadius: 8,
                    background: 'rgba(8,6,5,0.92)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(var(--primary-rgb),0.15)',
                    fontSize: '0.7rem',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 100,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  }}
                  className="nav-tooltip"
                >
                  {navLinks.find(l => l.href === hoveredLink)?.desc}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Resume CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                background: 'var(--gradient-1)',
                color: 'white',
                fontSize: '0.72rem',
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-mono)',
              }}
              className="resume-cta"
            >
              Hire Me ✦
            </motion.a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 6,
                position: 'relative',
                width: 26,
                height: 26,
              }}
              className="mobile-btn"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                style={{
                  position: 'absolute',
                  left: 3, top: 5,
                  width: 20, height: 1.5,
                  background: 'var(--text)',
                  borderRadius: 1,
                }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -5 } : { opacity: 1, x: 0 }}
                style={{
                  position: 'absolute',
                  left: 3, top: 12,
                  width: 20, height: 1.5,
                  background: 'var(--text)',
                  borderRadius: 1,
                }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                style={{
                  position: 'absolute',
                  left: 3, top: 19,
                  width: 20, height: 1.5,
                  background: 'var(--text)',
                  borderRadius: 1,
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                marginTop: 10,
                paddingTop: 10,
                borderTop: '1px solid rgba(var(--primary-rgb),0.08)',
              }}>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 6px',
                      fontSize: '0.9rem',
                      color: active === link.href ? 'var(--primary-light)' : 'var(--text-muted)',
                      fontWeight: active === link.href ? 600 : 400,
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(var(--primary-rgb),0.04)',
                    }}
                  >
                    <span style={{
                      fontSize: '0.6rem',
                      color: 'var(--primary)',
                      fontFamily: 'var(--font-mono)',
                      width: 22,
                    }}>
                      {link.num}
                    </span>
                    {link.name}
                    {active === link.href && (
                      <span style={{
                        marginLeft: 'auto',
                        fontSize: '0.65rem',
                        color: 'var(--neon-green)',
                      }}>
                        ●
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style>{`
        @keyframes nav-border {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes nav-dot {
          0%, 100% { opacity: 0.3; box-shadow: 0 0 0px rgba(6,214,160,0); }
          50% { opacity: 1; box-shadow: 0 0 6px rgba(6,214,160,0.6); }
        }
        @media (max-width: 860px) {
          .nav-links-desktop { display: none !important; }
          .status-badge { display: none !important; }
          .resume-cta { display: none !important; }
          .mobile-btn { display: flex !important; }
          .nav-tooltip { display: none !important; }
        }
      `}</style>
    </>
  )
}
