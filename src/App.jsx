import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import HomePage from './components/HomePage'

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => window.scrollTo(0, 0), 0)
    setTimeout(() => window.scrollTo(0, 0), 10)
  }, [location.pathname])

  return (
    <div className="min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Case study detail pages — coming soon */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
