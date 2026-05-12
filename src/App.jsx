import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoginScreen from './components/LoginScreen.jsx'
import HeroBirthday from './components/HeroBirthday.jsx'
import ReasonsSection from './components/ReasonsSection.jsx'
import MemoryGallery from './components/MemoryGallery.jsx'
import FinalEnding from './components/FinalEnding.jsx'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage(1)
  }

  const goToPage = (page) => setCurrentPage(page)

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!isLoggedIn && (
          <LoginScreen key="login" onLogin={handleLogin} />
        )}
        {isLoggedIn && currentPage === 1 && (
          <HeroBirthday key="hero" onNext={() => goToPage(2)} />
        )}
        {isLoggedIn && currentPage === 2 && (
          <ReasonsSection key="reasons" onNext={() => goToPage(3)} onBack={() => goToPage(1)} />
        )}
        {isLoggedIn && currentPage === 3 && (
          <MemoryGallery key="gallery" onNext={() => goToPage(4)} onBack={() => goToPage(2)} />
        )}
        {isLoggedIn && currentPage === 4 && (
          <FinalEnding key="ending" onBack={() => goToPage(3)} />
        )}
      </AnimatePresence>
    </div>
  )
}
