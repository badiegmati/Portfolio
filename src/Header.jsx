// Header.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Home, User, Code, Briefcase, Mail,
  Menu, X, Sparkles, ChevronRight, ArrowRight,
} from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

// ── Suppression des imports inutilisés (Terminal, Cpu, Globe,
//    useScroll, useTransform) → moins de bundle JS ──

const EASE_EXPO = [0.16, 1, 0.3, 1]

const NAV_ITEMS = [
  { icon: Home,      label: 'Accueil',     href: '#home',     color: 'text-blue-400',    glow: 'from-blue-500/20 to-blue-600/10'     },
  { icon: User,      label: 'À propos',    href: '#about',    color: 'text-purple-400',  glow: 'from-purple-500/20 to-purple-600/10' },
  { icon: Code,      label: 'Compétences', href: '#skills',   color: 'text-cyan-400',    glow: 'from-cyan-500/20 to-cyan-600/10'     },
  { icon: Briefcase, label: 'Projets',     href: '#projects', color: 'text-emerald-400', glow: 'from-emerald-500/20 to-emerald-600/10'},
  { icon: Mail,      label: 'Contact',     href: '#contact',  color: 'text-pink-400',    glow: 'from-pink-500/20 to-pink-600/10'     },
]

/* ── NavLink desktop ── */
function NavLink({ item, isActive, onClick }) {
  const reduced = useReducedMotion()
  const Icon    = item.icon

  return (
    <motion.div
      whileHover={reduced ? {} : { y: -2 }}
      whileTap={{ y: 1 }}
      className="relative"
    >
      {/* Active glow — seulement si actif */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`absolute -inset-1 bg-gradient-to-br ${item.glow}
                      rounded-xl blur-md pointer-events-none`}
        />
      )}

      <a
        href={item.href}
        onClick={onClick}
        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl
                    text-sm font-medium transition-all duration-300 group
                    ${isActive
                      ? 'bg-gray-800/90 border border-gray-700/60 backdrop-blur-sm'
                      : 'hover:bg-gray-800/50 border border-transparent'
                    }`}
      >
        <Icon
          size={16}
          className={`transition-colors duration-300
                      ${isActive ? item.color : 'text-gray-400 group-hover:text-gray-200'}`}
        />
        <span className={`transition-colors duration-300
                          ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
          {item.label}
        </span>

        {isActive && (
          <motion.div
            layoutId="nav-underline"
            className="absolute -bottom-0.5 left-3 right-3 h-px
                       bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </a>
    </motion.div>
  )
}

/* ── MobileMenu ── */
function MobileMenu({ open, onClose, activeSection }) {
  const reduced = useReducedMotion()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-[min(320px,90vw)]
                       bg-gray-950 border-l border-gray-800/60
                       shadow-2xl shadow-black/60 flex flex-col"
          >
            {/* top accent */}
            <div className="absolute top-0 left-0 right-0 h-px
                            bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />

            {/* header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800/60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                  <Sparkles className="text-white" size={18} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Menu</p>
                  <p className="text-gray-500 text-xs">Navigation principale</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-xl bg-gray-800/60 border border-gray-700/40
                           text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* nav items */}
            <div className="flex-1 p-5 space-y-2 overflow-y-auto">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.href.substring(1)
                const Icon     = item.icon

                return (
                  <motion.a
                    key={i}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35, ease: EASE_EXPO }}
                    href={item.href}
                    onClick={e => {
                      e.preventDefault()
                      document.getElementById(item.href.substring(1))
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      onClose()
                    }}
                    className={`flex items-center gap-4 p-4 rounded-2xl
                                transition-all duration-300 group relative overflow-hidden
                                ${isActive
                                  ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/30 border border-blue-500/25'
                                  : 'hover:bg-gray-800/50 border border-transparent'
                                }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5
                                      bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full" />
                    )}

                    <div className={`p-2.5 rounded-xl transition-all duration-300
                                    ${isActive
                                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'
                                      : 'bg-gray-800/80 group-hover:bg-gray-700/80'
                                    }`}>
                      <Icon
                        size={18}
                        className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}
                      />
                    </div>

                    <span className={`flex-1 font-semibold text-sm transition-colors duration-300
                                     ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {item.label}
                    </span>

                    {/* Suppression du motion.div x:[0,4,0] infini sur chaque item actif */}
                    <ChevronRight
                      size={15}
                      className={isActive
                        ? 'text-blue-400'
                        : 'text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-200'
                      }
                    />
                  </motion.a>
                )
              })}
            </div>

            {/* footer */}
            <div className="p-5 border-t border-gray-800/50">
              <motion.a
                whileHover={reduced ? {} : { scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 px-5
                           rounded-xl bg-gradient-to-r from-blue-600 to-purple-600
                           text-white text-sm font-semibold shadow-lg
                           shadow-blue-500/25 transition-shadow duration-300
                           relative overflow-hidden group"
              >
                {/* Shimmer CSS au lieu de motion.div animé */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                                bg-gradient-to-r from-transparent via-white/15 to-transparent
                                transition-transform duration-700" />
                <Mail size={16} />
                <span>Me contacter</span>
                <ArrowRight size={15} />
              </motion.a>
              <p className="text-center text-gray-600 text-xs mt-4">© 2025 Badie Gmati</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ── Header principal ── */
export default function Header() {
  const reduced   = useReducedMotion()
  const headerRef = useRef(null)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [active,    setActive]    = useState('home')

  // Scroll tracking avec throttle via requestAnimationFrame
  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const sy  = window.scrollY
        const max = document.body.scrollHeight - window.innerHeight

        setScrolled(sy > 50)
        setScrollPct(max > 0 ? sy / max : 0)

        let cur = 'home'
        for (const item of NAV_ITEMS) {
          const el = document.getElementById(item.href.substring(1))
          if (el) {
            const { top, bottom } = el.getBoundingClientRect()
            if (top <= 120 && bottom >= 120) cur = item.href.substring(1)
          }
        }
        setActive(cur)
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    const el = document.getElementById(href.substring(1))
    if (!el) return
    const offset = (headerRef.current?.offsetHeight ?? 72) + 8
    window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  return (
    <>
      {/* Barre de progression scroll — CSS transform, pas de motion style */}
      <div
        className="fixed top-0 left-0 right-0 h-0.5 z-[60]
                   bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500
                   origin-left"
        style={{ transform: `scaleX(${scrollPct})` }}
        aria-hidden="true"
      />

      <motion.header
        ref={headerRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_EXPO }}
        className={`fixed top-0 w-full z-50 transition-all duration-500
                    ${scrolled
                      ? 'bg-gray-950/90 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-gray-800/50'
                      : 'bg-transparent'
                    }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/3
                        via-transparent to-transparent pointer-events-none" />

        <nav className="container relative mx-auto px-4 md:px-8 py-3.5">
          <div className="flex items-center justify-between gap-6">

            {/* Logo */}
            <motion.a
              href="#home"
              onClick={e => handleNavClick(e, '#home')}
              whileHover={reduced ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex items-center gap-2.5 px-4 py-2 rounded-xl
                         bg-gray-900/70 border border-gray-700/50 backdrop-blur-sm
                         hover:border-gray-600/70 transition-colors duration-300"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20
                              rounded-xl blur opacity-0 group-hover:opacity-100
                              transition-opacity duration-300 pointer-events-none" />

              {/* Sparkles : rotation CSS plutôt que motion.div infini */}
              <Sparkles
                size={17}
                className="text-blue-400 relative"
                style={{
                  animation: reduced ? 'none' : 'spin 20s linear infinite',
                }}
              />

              <span className="relative text-xl font-black tracking-tight
                               text-transparent bg-clip-text
                               bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400
                               animate-gradient-x">
                BG
              </span>

              {/* Pulse dot — CSS animation */}
              <div className="relative w-1.5 h-1.5">
                <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-70" />
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
            </motion.a>

            {/* Desktop nav */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden:  { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
              }}
              className="hidden md:flex items-center gap-1"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden:  { y: -16, opacity: 0 },
                    visible: { y: 0, opacity: 1,
                      transition: { type: 'spring', stiffness: 300, damping: 24 }
                    },
                  }}
                >
                  <NavLink
                    item={item}
                    isActive={active === item.href.substring(1)}
                    onClick={e => handleNavClick(e, item.href)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile burger */}
            <motion.button
              whileHover={reduced ? {} : { scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden relative p-2.5 rounded-xl bg-gray-800/60
                         border border-gray-700/50 hover:border-gray-600/70
                         backdrop-blur-sm transition-colors duration-200"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{ rotate: 90,    opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="text-white" size={21} />
                  </motion.div>
                ) : (
                  <motion.div key="m"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{ rotate: -90,   opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="text-white" size={21} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dot pulsant — CSS au lieu de motion */}
              {!menuOpen && (
                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full
                               bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={active}
      />

      {/* spin CSS défini une seule fois dans App.css normalement,
          mais ajouté ici en fallback si besoin */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}