import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import Hero from './Hero'
import Skills from './Skills'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
import Loading from './Loading'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-hidden" style={{ position: "relative", zIndex: 1 }} id="Hero">
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
        </div>
      )}
    </>
  )
}

export default App