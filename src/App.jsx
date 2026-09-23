// App.jsx — Synchronisation Loading ↔ timer corrigée
import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react'
import './App.css'
import Header          from './Header'
import Loading         from './Loading'
import GlobalBackground from './components/GlobalBackground'

const Hero     = lazy(() => import('./Hero'))
const About    = lazy(() => import('./About'))
const Skills   = lazy(() => import('./Skills'))
const Projects = lazy(() => import('./Projects'))
const Contact  = lazy(() => import('./Contact'))
const Footer   = lazy(() => import('./Footer'))

const SectionFallback = () => (
  <div
    className="min-h-screen"
    style={{ background: 'transparent' }}
    aria-hidden="true"
  />
)

function App() {
  const [isLoading, setIsLoading] = useState(true)

  /*
   * ── onLoadingDone : callback passé à Loading ──
   * Loading appelle onDone() quand sa barre atteint 100%
   * + le timer de 3s sert de fallback maximum
   */
  const handleLoadingDone = useCallback(() => {
    setIsLoading(false)
  }, [])

  /* Fallback : si Loading ne termine pas en 4s, on force */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading onDone={handleLoadingDone} />
      ) : (
        <div
          className="overflow-x-hidden"
          style={{ position: 'relative', zIndex: 1 }}
          id="Hero"
        >
          <GlobalBackground />

          <div className="min-h-screen bg-transparent text-white overflow-x-hidden">
            <Header />

            <main>
              <Suspense fallback={<SectionFallback />}>
                <Hero />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <About />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Skills />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Projects />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Contact />
              </Suspense>
            </main>

            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>
        </div>
      )}
    </>
  )
}

export default App