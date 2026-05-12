import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Floating Hearts Background ─── */
function FloatingHearts() {
  const hearts = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 12 + Math.random() * 14,
      opacity: 0.15 + Math.random() * 0.25,
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-pink-400"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
          }}
          animate={{
            y: [800, -100],
            rotate: [0, 360],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Soft Stars Background ─── */
function SoftStars() {
  const stars = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Login Screen Component ─── */
export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Check for specific credentials
    if (username.toLowerCase() === 'yogesh' && password === '9') {
      setError(false)
      setSuccess(true)
      setTimeout(() => onLogin(), 1200)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-dark overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Backgrounds */}
      <FloatingHearts />
      <SoftStars />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-pink-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/8 blur-[100px] pointer-events-none" />

      {/* Login Card */}
      <AnimatePresence>
        {!success ? (
          <motion.div
            className="relative z-10 w-[90%] max-w-[420px] mx-auto"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={error
              ? { opacity: 1, y: 0, scale: 1, x: [0, -10, 10, -10, 10, 0] }
              : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="glass-card-strong p-8 md:p-10">
              {/* Heart icon */}
              <motion.div
                className="text-center mb-6"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-5xl">💖</span>
              </motion.div>

              {/* Title */}
              <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-3 text-white text-glow-pink leading-snug">
                Only My Favorite Person Can Enter ❤️
              </h1>

              {/* Subtitle */}
              <p className="text-center text-sm md:text-base text-white/50 mb-8 font-inter">
                This little world is only for us.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    id="login-username"
                    type="text"
                    className="input-romantic"
                    placeholder="Type your boy name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    id="login-password"
                    type="password"
                    className="input-romantic"
                    placeholder="Which standard did we first meet?"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <motion.p
                    className="text-pink-400 text-sm text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Incorrect name or password 💔
                  </motion.p>
                )}

                <motion.button
                  id="login-submit"
                  type="submit"
                  className="btn-romantic w-full text-base py-4"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(255, 77, 141, 0.5)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Unlock My Heart ❤️
                </motion.button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              className="text-7xl block mb-4"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: 1 }}
            >
              💝
            </motion.span>
            <h2 className="font-display text-3xl text-white text-glow-pink">
              Welcome, My Love
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
