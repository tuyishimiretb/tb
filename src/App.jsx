import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'

import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import ThemeToggle from './components/ThemeToggle'
import SurpriseButton from './components/SurpriseButton'
import ParticlesBackground from './components/ParticlesBackground'
import GeometricBackground from './components/GeometricBackground'
import SectionDivider from './components/SectionDivider'
import ScrollSectionIndicator from './components/ScrollSectionIndicator'

export default function App() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollSectionIndicator />
      <ParticlesBackground />
      <GeometricBackground />
      <ScrollProgress />
      <ThemeToggle />
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <Contact />
      <Footer />
      <SurpriseButton />
    </>
  )
}
