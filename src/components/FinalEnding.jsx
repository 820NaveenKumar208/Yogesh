import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Floating Stars ─── */
function FloatingStars() {
  const stars = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
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
            opacity: [0.1, 0.8, 0.1],
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

/* ─── Heart Particles ─── */
function HeartParticles() {
  const hearts = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 6,
      size: 12 + Math.random() * 12,
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-pink-400/20"
          style={{ left: `${h.left}%`, fontSize: `${h.size}px` }}
          animate={{ y: [800, -100], rotate: [0, 360] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Hearts Explosion Effect ─── */
function HeartsExplosion() {
  const explosionHearts = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2
      const distance = 80 + Math.random() * 120
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 16 + Math.random() * 20,
        delay: Math.random() * 0.3,
        emoji: ['❤️', '💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 6)],
      }
    }), [])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      {explosionHearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute"
          style={{ fontSize: `${h.size}px` }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5, 1, 0],
            x: [0, h.x],
            y: [0, h.y],
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: 2,
            delay: h.delay,
            ease: 'easeOut',
          }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  )
}

/* ─── Final Ending Component ─── */
export default function FinalEnding({ onBack }) {
  const [heartsExploded, setHeartsExploded] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showCredits, setShowCredits] = useState(false)
  const [coupleImgError, setCoupleImgError] = useState(false)

  const handleTouchHeart = () => {
    setHeartsExploded(true)
    setTimeout(() => setShowPopup(true), 800)
    setTimeout(() => setShowCredits(true), 3000)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-romantic relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingStars />
      <HeartParticles />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-pink-500/8 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/8 blur-[110px] pointer-events-none" />

      {/* Hearts explosion */}
      <AnimatePresence>
        {heartsExploded && <HeartsExplosion key="explosion" />}
      </AnimatePresence>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Couple Image */}
        <motion.div
          className="mb-8 md:mb-10 relative inline-block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="relative rounded-full overflow-hidden w-40 h-40 md:w-52 md:h-52 mx-auto"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              boxShadow: '0 0 40px rgba(255, 77, 141, 0.3), 0 0 80px rgba(155, 89, 182, 0.15)',
            }}
          >
            {!coupleImgError ? (
              <img
                src="/photos/image4.jpg"
                alt="Us together"
                className="w-full h-full object-cover"
                onError={() => setCoupleImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-900 to-purple-900 flex items-center justify-center">
                <span className="text-5xl">💑</span>
              </div>
            )}
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full border-2 border-pink-400/30 animate-pulse-glow" />
          </motion.div>
        </motion.div>

        {/* Main Text */}
        <motion.h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-glow-pink leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 bg-clip-text text-transparent">
            You Are My Favorite Chapter
          </span>{' '}
          ❤️
        </motion.h2>

        {/* Sub Text */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="text-white/60 text-base md:text-lg font-inter leading-relaxed">
            No matter where life goes…
            <br />
            I'll always cherish every moment with you.
          </p>
        </motion.div>

        {/* Thought text */}
        <motion.p
          className="text-white/35 text-sm md:text-base italic font-inter mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          "You were living in my thoughts."
        </motion.p>

        {/* Touch My Heart Button */}
        {!heartsExploded && (
          <motion.button
            id="touch-heart-btn"
            className="btn-romantic text-base md:text-lg px-10 py-4"
            onClick={handleTouchHeart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.08, boxShadow: '0 0 60px rgba(255, 77, 141, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Touch My Heart ❤️
          </motion.button>
        )}

        {/* Love Popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            >
              <div className="glass-card-strong p-6 md:p-8 inline-block">
                <motion.span
                  className="text-5xl md:text-6xl block mb-3"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💝
                </motion.span>
                <h3 className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent mb-2">
                  I Love You Forever ❤️
                </h3>
                <p className="text-white/50 text-sm font-inter">
                  You mean everything to me.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Credits */}
        <AnimatePresence>
          {showCredits && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-white/25 text-sm font-inter">
                Made with love by{' '}
                <span className="text-pink-400/60 font-medium">Your Name</span>
              </p>
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  id="ending-back-btn"
                  className="px-6 py-2 rounded-full border border-white/10 text-white/40 hover:text-white/60 hover:border-white/20 transition-all duration-300 font-body text-xs"
                  onClick={onBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Go Back
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
