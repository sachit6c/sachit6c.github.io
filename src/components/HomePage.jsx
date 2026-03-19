import { useEffect } from 'react'
import Hero from './Hero'
import About from './About'
import CaseStudies from './CaseStudies'
import Product from './Product'
import SideBuilds from './SideBuilds'
import Impact from './Impact'
import Contact from './Contact'
import Footer from './Footer'
import AppFloater from './AppFloater'
import AIChatbot from './AIChatbot'

const HomePage = () => {
  useEffect(() => {
    // Force scroll to top
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  return (
    <>
      <Hero />
      <Product />
      <SideBuilds />
      <Impact />
      <CaseStudies />
      <About />
      <Contact />
      <Footer />
      <AppFloater />
      <AIChatbot />
    </>
  )
}

export default HomePage
