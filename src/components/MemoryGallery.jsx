import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const photos = [
  { src: '/photos/image5.jpg', caption: 'The day it all began 💕', fallbackColor: 'from-pink-900 to-purple-900' },
  { src: '/photos/image7.jpg', caption: 'Our favorite adventure 🌟', fallbackColor: 'from-purple-900 to-indigo-900' },
  { src: '/photos/image1.jpg', caption: 'That perfect moment ✨', fallbackColor: 'from-rose-900 to-pink-900' },
  { src: '/photos/image6.jpg', caption: 'Forever and always 💖', fallbackColor: 'from-violet-900 to-purple-900' },
]

/* ─── Photo Card ─── */
function PhotoCard({ photo, index, onClick }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => onClick(index)}
      style={{ aspectRatio: '4/5' }}
    >
      {/* Glow border */}
      <div className="absolute inset-0 rounded-2xl glow-pink opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* Image or placeholder */}
      {!imgError ? (
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${photo.fallbackColor} flex flex-col items-center justify-center p-6 group-hover:scale-105 transition-transform duration-700`}>
          <span className="text-5xl mb-3">📸</span>
          <p className="text-white/40 text-sm text-center font-inter">Add your photo here</p>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
        <p className="text-white text-sm font-inter">{photo.caption}</p>
      </div>

      {/* Sparkle effect on hover */}
      <motion.div
        className="absolute top-3 right-3 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✨
      </motion.div>
    </motion.div>
  )
}

/* ─── Fullscreen Modal ─── */
function PhotoModal({ photo, onClose }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-lg"
        onClick={onClose}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-2xl w-full"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Close button */}
        <motion.button
          id="modal-close-btn"
          className="absolute -top-12 right-0 text-white/60 hover:text-white text-2xl transition-colors z-20"
          onClick={onClose}
          whileHover={{ scale: 1.2, rotate: 90 }}
        >
          ✕
        </motion.button>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden glow-pink">
          {!imgError ? (
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full max-h-[70vh] object-contain bg-black/50"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={`w-full h-[50vh] bg-gradient-to-br ${photo.fallbackColor} flex flex-col items-center justify-center`}>
              <span className="text-7xl mb-4">📸</span>
              <p className="text-white/40 text-lg font-inter">Place your photo in public/photos/</p>
            </div>
          )}
        </div>

        {/* Caption */}
        <motion.p
          className="text-center text-white/80 mt-4 text-lg font-display italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {photo.caption}
        </motion.p>

        {/* Floating hearts */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute text-pink-400 text-xl pointer-events-none"
            style={{
              left: `${20 + i * 30}%`,
              bottom: '10%',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.7, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              delay: i * 1,
              repeat: Infinity,
            }}
          >
            💕
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ─── Memory Gallery Component ─── */
export default function MemoryGallery({ onNext, onBack }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  /* Floating hearts */
  const hearts = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 8 + Math.random() * 5,
      size: 14 + Math.random() * 10,
    })), [])

  return (
    <motion.div
      className="min-h-screen bg-gradient-dark relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/6 blur-[100px] pointer-events-none" />

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute text-pink-400/30"
            style={{ left: `${h.left}%`, fontSize: `${h.size}px` }}
            animate={{ y: [800, -100], rotate: [0, 180] }}
            transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
          >
            ❤
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 section-padding max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-glow-pink">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Our Beautiful Memories
            </span>{' '}
            📸
          </h2>
          <p className="text-white/50 text-base md:text-lg font-inter">
            Every picture tells our story.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {photos.map((photo, i) => (
            <PhotoCard
              key={i}
              photo={photo}
              index={i}
              onClick={setSelectedPhoto}
            />
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          className="flex justify-center gap-4 mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            id="gallery-back-btn"
            className="px-6 py-3 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 font-body text-sm"
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>
          <motion.button
            id="gallery-next-btn"
            className="btn-romantic px-8 py-3"
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 77, 141, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Final Surprise →
          </motion.button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <PhotoModal
            photo={photos[selectedPhoto]}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
