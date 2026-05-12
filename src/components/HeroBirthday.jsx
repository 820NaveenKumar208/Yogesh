import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

/* ─── Soft Particles ─── */
function SoftParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: Math.random() > 0.5
              ? 'rgba(255, 77, 141, 0.4)'
              : 'rgba(255, 255, 255, 0.5)',
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            y: [0, -30, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Cute Puppy SVG ─── */
function CutePuppy() {
  return (
    <motion.div
      className="relative inline-block"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="60" cy="78" rx="32" ry="26" fill="#c4956a" />
        {/* Head */}
        <circle cx="60" cy="48" r="26" fill="#d4a574" />
        {/* Left ear */}
        <motion.ellipse
          cx="38" cy="28" rx="12" ry="16"
          fill="#b8845a"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transformOrigin: '38px 40px' }}
        />
        {/* Right ear */}
        <motion.ellipse
          cx="82" cy="28" rx="12" ry="16"
          fill="#b8845a"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transformOrigin: '82px 40px' }}
        />
        {/* Left eye */}
        <motion.g
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          style={{ transformOrigin: '50px 45px' }}
        >
          <circle cx="50" cy="45" r="4" fill="#2d1b0e" />
          <circle cx="51.5" cy="43.5" r="1.5" fill="white" />
        </motion.g>
        {/* Right eye */}
        <motion.g
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          style={{ transformOrigin: '70px 45px' }}
        >
          <circle cx="70" cy="45" r="4" fill="#2d1b0e" />
          <circle cx="71.5" cy="43.5" r="1.5" fill="white" />
        </motion.g>
        {/* Nose */}
        <ellipse cx="60" cy="54" rx="5" ry="3.5" fill="#2d1b0e" />
        {/* Mouth */}
        <path d="M55 57 Q60 62 65 57" stroke="#2d1b0e" strokeWidth="1.5" fill="none" />
        {/* Tongue */}
        <motion.ellipse
          cx="60" cy="62" rx="3" ry="4"
          fill="#ff6b8a"
          animate={{ scaleY: [0.8, 1, 0.8] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        {/* Blush */}
        <circle cx="44" cy="52" r="4" fill="rgba(255,107,138,0.3)" />
        <circle cx="76" cy="52" r="4" fill="rgba(255,107,138,0.3)" />
        {/* Tail */}
        <motion.path
          d="M90 75 Q105 60 100 50"
          stroke="#c4956a"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          animate={{ d: ['M90 75 Q105 60 100 50', 'M90 75 Q110 70 105 55', 'M90 75 Q105 60 100 50'] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
        {/* Paws */}
        <circle cx="40" cy="100" r="8" fill="#d4a574" />
        <circle cx="80" cy="100" r="8" fill="#d4a574" />
      </svg>

      {/* Floating hearts around puppy */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute text-pink-400 text-sm"
          style={{
            top: `${-10 + i * 15}px`,
            right: `${-15 + i * 10}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: i * 0.7,
            repeat: Infinity,
          }}
        >
          💕
        </motion.span>
      ))}
    </motion.div>
  )
}

/* ─── Countdown Timer ─── */
function CountdownTimer() {
  const targetDate = new Date('2026-05-15T00:00:00')

  const calcTime = () => {
    const now = new Date()
    const diff = targetDate - now
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [time, setTime] = useState(calcTime)

  useEffect(() => {
    const interval = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(interval)
  }, [])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <div className="flex justify-center gap-3 md:gap-5 flex-wrap">
      {units.map((unit, i) => (
        <motion.div
          key={unit.label}
          className="glass-card text-center px-4 py-4 md:px-6 md:py-5 min-w-[75px] md:min-w-[90px] glow-purple"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.15 }}
        >
          <motion.span
            key={unit.value}
            className="block text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {String(unit.value).padStart(2, '0')}
          </motion.span>
          <span className="text-xs md:text-sm text-white/50 font-inter mt-1 block">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Hero Birthday Component ─── */
export default function HeroBirthday({ onNext }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-purple relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      <SoftParticles />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-pink-500/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Main Heading */}
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 text-glow-pink leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            HAPPY BIRTHDAY
          </span>
          <br />
          <span className="text-white">MY LOVE ❤️</span>
        </motion.h1>

        {/* Sub Heading */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/60 font-inter mb-8 md:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          You are the best thing that ever happened to me.
        </motion.p>

        {/* Countdown */}
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* Below countdown text */}
        <motion.p
          className="text-sm md:text-base text-white/40 italic font-inter mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          "You were living in my thoughts."
        </motion.p>

        {/* Button + Puppy */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <motion.button
            id="start-story-btn"
            className="btn-romantic text-base md:text-lg px-8 md:px-10 py-4"
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255, 77, 141, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Start Our Story →
          </motion.button>

          <CutePuppy />
        </motion.div>
      </div>
    </motion.div>
  )
}
