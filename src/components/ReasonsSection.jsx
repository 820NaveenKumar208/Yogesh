import { motion } from 'framer-motion'

const reasons = [
  { emoji: '😊', text: 'Your smile fixes my worst days.' },
  { emoji: '🌸', text: 'You make life beautiful.' },
  { emoji: '🏠', text: 'Your voice feels like home.' },
  { emoji: '☮️', text: 'You are my peace.' },
  { emoji: '✨', text: 'You make normal moments magical.' },
  { emoji: '💭', text: 'You understand me without words.' },
  { emoji: '🌙', text: 'You are my favorite goodnight.' },
  { emoji: '☀️', text: 'You are my favorite good morning.' },
  { emoji: '💪', text: 'You make me a better person.' },
  { emoji: '🎵', text: 'Your laugh is my favorite melody.' },
  { emoji: '🌻', text: 'You bring sunshine into my world.' },
  { emoji: '🤗', text: 'Your hugs heal everything.' },
  { emoji: '🦋', text: 'You give me butterflies every day.' },
  { emoji: '📖', text: 'You are my favorite chapter in life.' },
  { emoji: '🌈', text: 'You color my world with happiness.' },
  { emoji: '💎', text: 'You are rare and precious to me.' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function ReasonsSection({ onNext, onBack }) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-romantic relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient glows */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-pink-500/6 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 section-padding max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-glow-pink">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Reasons Why You Are Special
            </span>{' '}
            ❤️
          </h2>
          <p className="text-white/50 text-base md:text-lg font-inter">
            Every reason is a heartbeat.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              className="glass-card p-5 md:p-6 text-center group cursor-default"
              variants={cardVariants}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 30px rgba(255, 77, 141, 0.2)',
                borderColor: 'rgba(255, 77, 141, 0.3)',
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.span
                className="text-3xl md:text-4xl block mb-3"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {reason.emoji}
              </motion.span>
              <p className="text-white/70 text-sm md:text-base font-inter leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                {reason.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex justify-center gap-4 mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            id="reasons-back-btn"
            className="px-6 py-3 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 font-body text-sm"
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>
          <motion.button
            id="reasons-next-btn"
            className="btn-romantic px-8 py-3"
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 77, 141, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Our Memories →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
