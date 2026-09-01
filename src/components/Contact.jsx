import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjyvyokq'

function MagneticWrap({ children, strength = 0.2 }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setPos({ x, y })
  }

  const handleLeave = () => setPos({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

function FloatingInput({ label, type = 'text', textarea = false, value, onChange }) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  const Component = textarea ? 'textarea' : 'input'

  return (
    <div style={{
      position: 'relative',
      marginTop: 8,
    }}>
      <Component
        type={textarea ? undefined : type}
        value={value}
        onChange={(e) => { onChange(e.target.value); if (type === 'email') onChange(e.target.value.toLowerCase()) }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={textarea ? 5 : undefined}
        required
        style={{
          width: '100%',
          padding: textarea ? '22px 16px 12px' : '22px 16px 8px',
          borderRadius: 12,
          border: `1.5px solid ${isActive ? 'var(--primary)' : 'rgba(var(--primary-rgb),0.15)'}`,
          background: 'rgba(var(--primary-rgb),0.04)',
          color: 'var(--text)',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          transition: 'border-color 0.2s',
          resize: textarea ? 'vertical' : 'none',
          minHeight: textarea ? 100 : 'auto',
        }}
      />
      <label style={{
        position: 'absolute',
        left: 16,
        top: isActive ? 6 : '50%',
        transform: isActive ? 'translateY(0)' : 'translateY(-50%)',
        fontSize: isActive ? '0.7rem' : '0.9rem',
        color: isActive ? 'var(--primary)' : 'var(--text-muted)',
        fontWeight: isActive ? 600 : 400,
        pointerEvents: 'none',
        transition: 'all 0.2s ease',
        letterSpacing: isActive ? 1 : 0,
      }}>
        {label}
      </label>
    </div>
  )
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  const buttonLabel =
    status === 'sending' ? 'Sending...' :
    status === 'success' ? '✓ Message Sent!' :
    status === 'error' ? '✗ Failed — try again' :
    'Send Message →'

  return (
    <section id="contact" style={{
      padding: '120px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            / contact
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            background: 'var(--gradient-1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Let's Connect
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            maxWidth: 500,
            margin: '0.75rem auto 0',
            fontSize: '0.95rem',
          }}>
            Have a project in mind or just want to say hi?
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '48px',
          maxWidth: 1000,
          margin: '0 auto',
        }} className="contact-grid">
          {/* Left - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              padding: '32px',
              borderRadius: 20,
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
                Contact Information
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.88rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}>
                I'm always open to new opportunities, collaborations, or just a tech chat.
              </p>

              {[
                { label: 'Email', value: 'tuyishimireboscotb@gmail.com' },
                { label: 'Location', value: 'Kigali, Rwanda' },
                { label: 'Availability', value: 'Open to opportunities' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: i < 2 ? '1px solid rgba(var(--primary-rgb),0.06)' : 'none',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: 'var(--card-bg)',
              borderRadius: 20,
              padding: '32px',
              border: '1px solid var(--card-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <FloatingInput label="Your Name" value={name} onChange={setName} />
            <FloatingInput label="Your Email" type="email" value={email} onChange={setEmail} />
            <FloatingInput label="Your Message" textarea value={message} onChange={setMessage} />

            {status === 'error' && (
              <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 8 }}>
                Couldn't send. Please check your connection and try again.
              </p>
            )}

            <MagneticWrap strength={0.15}>
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: 16,
                  padding: '14px 32px',
                  background: status === 'success'
                    ? 'linear-gradient(135deg, #06D6A0, #FFB703)'
                    : status === 'error'
                      ? 'linear-gradient(135deg, #E74C3C, #C0392B)'
                      : 'var(--gradient-1)',
                  color: 'white',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.3s',
                  boxShadow: status === 'success' ? 'none' : '0 4px 20px rgba(var(--primary-rgb),0.3)',
                  width: '100%',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
              >
                {buttonLabel}
              </motion.button>
            </MagneticWrap>
          </motion.form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
