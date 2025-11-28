import React from 'react'
import './App.css'
import Header from './Header'
import Hero from './Hero'
import Skills from './Skills'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
function App() {

  return (
    
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
