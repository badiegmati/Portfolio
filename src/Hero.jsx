// Hero.jsx — Ultra Professional · Zero Lag · Cohérent GlobalBackground
import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  ChevronDown, Github, Linkedin, Mail, Phone,
  Download, Cpu, Code2, Terminal, ArrowRight,
  MapPin, Award, Globe, Star, Layers, Sparkles,
} from 'lucide-react'
import {
  motion, AnimatePresence, useReducedMotion,
  useMotionValue, useSpring,
} from 'framer-motion'
import logo from './logo1.png'

/* ═══════════════════════════════════════════════
   CV URL — Vite public/ folder
═══════════════════════════════════════════════ */
const CV_URL = `${import.meta.env.BASE_URL}pdf/CV_Badie_Gmati_final.pdf`

/* ═══════════════════════════════════════════════
   CSS INJECTION — palette GlobalBackground
   #3b82f6 · #8b5cf6 · #06b6d4 · #6366f1
═══════════════════════════════════════════════ */
const HERO_CSS = `
  @keyframes h-grad {
    0%,100% { background-position: 0% 50% }
    50%      { background-position: 100% 50% }
  }
  @keyframes h-spin-cw  { to { transform: rotate(360deg)  } }
  @keyframes h-spin-ccw { to { transform: rotate(-360deg) } }
  @keyframes h-pulse-dot {
    0%,100% { transform: scale(1);   opacity: .9 }
    50%     { transform: scale(1.35); opacity: .5 }
  }
  @keyframes h-float-a {
    0%,100% { transform: translateY(0) rotate(0deg)  }
    50%     { transform: translateY(-14px) rotate(3deg) }
  }
  @keyframes h-float-b {
    0%,100% { transform: translateY(0) rotate(0deg)  }
    50%     { transform: translateY(-18px) rotate(-3deg) }
  }
  @keyframes h-scan {
    0%   { transform: translateY(-100%) }
    100% { transform: translateY(500%)  }
  }
  @keyframes h-shimmer {
    0%   { transform: translateX(-100%) skewX(-12deg) }
    100% { transform: translateX(220%)  skewX(-12deg) }
  }
  @keyframes h-ping {
    0%   { transform: scale(1);   opacity: .55 }
    100% { transform: scale(2.2); opacity: 0   }
  }
  @keyframes h-orbit {
    to { transform: rotate(360deg) }
  }

  .h-grad {
    background-size: 280% 280%;
    animation: h-grad 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .h-spin-cw  { animation: h-spin-cw  18s linear infinite }
  .h-spin-ccw { animation: h-spin-ccw 12s linear infinite }
  .h-float-a  { animation: h-float-a  4s ease-in-out infinite }
  .h-float-b  { animation: h-float-b  5s ease-in-out infinite }
  .h-orbit    { animation: h-orbit    12s linear infinite }
  .h-ping     { animation: h-ping     2.4s ease-out infinite }
  .h-pulse-dot{ animation: h-pulse-dot 2s ease-in-out infinite }

  /* Download button shimmer */
  .h-btn-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
    transform: translateX(-100%) skewX(-12deg);
    pointer-events: none;
  }
  .h-btn-shimmer:hover::after {
    animation: h-shimmer .65s ease forwards;
  }

  /* Stat card hover */
  .h-stat {
    transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .28s ease;
    will-change: transform;
  }
  .h-stat:hover {
    transform: translateY(-5px) scale(1.04);
    box-shadow: 0 12px 28px rgba(0,0,0,.4);
  }

  /* Social icon */
  .h-social {
    transition: transform .24s cubic-bezier(.34,1.56,.64,1);
    will-change: transform;
  }
  .h-social:hover { transform: translateY(-4px) scale(1.18) }
  .h-social:active{ transform: scale(.9); transition-duration: .1s }

  /* Badge floating */
  .h-badge-a { animation: h-float-a 4.2s ease-in-out infinite }
  .h-badge-b { animation: h-float-b 5.1s ease-in-out infinite }
  .h-badge-c { animation: h-float-a 3.8s ease-in-out infinite }
  .h-badge-d { animation: h-float-b 4.6s ease-in-out infinite }

  /* Scroll indicator */
  .h-scroll-mouse {
    transition: border-color .3s ease;
  }
  .h-scroll-mouse:hover { border-color: rgba(99,102,241,.6) }

  @media (prefers-reduced-motion: reduce) {
    .h-grad, .h-spin-cw, .h-spin-ccw, .h-float-a, .h-float-b,
    .h-orbit, .h-ping, .h-pulse-dot, .h-badge-a, .h-badge-b,
    .h-badge-c, .h-badge-d, .h-stat, .h-social {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`

function StyleInject() {
  useEffect(() => {
    const ID = 'hero-styles-v2'
    if (document.getElementById(ID)) return
    const el = document.createElement('style')
    el.id = ID; el.textContent = HERO_CSS
    document.head.appendChild(el)
    return () => document.getElementById(ID)?.remove()
  }, [])
  return null
}

/* ═══════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════ */
const EXPO = [0.16, 1, 0.3, 1]
const BACK = [0.34, 1.56, 0.64, 1]

const FLOATING_BADGES = [
  {
    icon: Code2, label: 'Full-Stack',
    cls: 'h-badge-a',
    style: { top: '16%', left: '3%' },
    border: 'rgba(59,130,246,.28)', bg: 'rgba(59,130,246,.1)', color: '#60a5fa',
  },
  {
    icon: Cpu, label: 'Edge AI',
    cls: 'h-badge-b',
    style: { top: '58%', left: '2%' },
    border: 'rgba(139,92,246,.28)', bg: 'rgba(139,92,246,.1)', color: '#a78bfa',
  },
  {
    icon: Terminal, label: 'DevOps',
    cls: 'h-badge-c',
    style: { top: '16%', right: '3%' },
    border: 'rgba(6,182,212,.28)', bg: 'rgba(6,182,212,.1)', color: '#22d3ee',
  },
  {
    icon: Layers, label: 'Microservices',
    cls: 'h-badge-d',
    style: { top: '58%', right: '2%' },
    border: 'rgba(16,185,129,.28)', bg: 'rgba(16,185,129,.1)', color: '#34d399',
  },
]

const STATS = [
  { value: '17/20',   label: 'Mention TB',     icon: Award, color: '#fbbf24' },
  { value: '3+',      label: 'Projets majeurs', icon: Star,  color: '#60a5fa' },
  { value: 'Edge AI', label: 'Raspberry Pi',    icon: Cpu,   color: '#a78bfa' },
  { value: 'B1+',     label: 'EN · FR',         icon: Globe, color: '#22d3ee' },
]

const SOCIAL_LINKS = [
  { href: 'https://github.com/badiegmati',                      icon: Github,   label: 'GitHub',   hoverColor: '#f1f5f9' },
  { href: 'https://www.linkedin.com/in/badie-gmati-3168b535b/', icon: Linkedin, label: 'LinkedIn', hoverColor: '#60a5fa' },
  { href: 'mailto:badiegmati11@gmail.com',                      icon: Mail,     label: 'Email',    hoverColor: '#34d399' },
]

const ROLES = [
  'Ingénieur Full-Stack',
  'Développeur IA Embarquée',
  'Architecte Microservices',
  'Expert Edge AI · Raspberry Pi',
]

const INFO_PILLS = [
  { icon: MapPin, text: 'Bouargoub, Nabeul, Tunisie', color: '#f87171' },
  { icon: Mail,   text: 'badiegmati11@gmail.com',     color: '#60a5fa' },
  { icon: Phone,  text: '+216 58 294 838',            color: '#4ade80' },
]

/* ═══════════════════════════════════════════════
   MOTION VARIANTS
═══════════════════════════════════════════════ */
const containerVar = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.18 } },
}
const itemVar = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EXPO } },
}

/* ═══════════════════════════════════════════════
   CURSOR GLOW — GPU only
═══════════════════════════════════════════════ */
function CursorGlow() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 75, damping: 22 })
  const sy = useSpring(my, { stiffness: 75, damping: 22 })

  useEffect(() => {
    const fn = e => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [mx, my])

  return (
    <motion.div
      aria-hidden
      style={{
        x: sx, y: sy,
        translateX: '-50%', translateY: '-50%',
        position: 'fixed', top: 0, left: 0,
        zIndex: 0, pointerEvents: 'none',
        width: '520px', height: '520px',
        borderRadius: '50%',
        filter: 'blur(88px)',
        background: 'radial-gradient(circle,rgba(99,102,241,.07),rgba(139,92,246,.04),transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}

/* ═══════════════════════════════════════════════
   GRID — cohérent GlobalBackground dot-grid
═══════════════════════════════════════════════ */
function HeroGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* dot grid identique GlobalBackground */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle,rgba(148,163,184,.042) 1px,transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* diagonal subtle */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(45deg,  #6366f1 .5px, transparent .5px),
            linear-gradient(-45deg, #8b5cf6 .5px, transparent .5px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   AMBIENT ORBS — palette GlobalBackground
═══════════════════════════════════════════════ */
function HeroOrbs({ reduced }) {
  const orbs = [
    { style: { top: '-12%', left: '-10%', width: 520, height: 520 }, colors: '#1e40af,#6d28d9', dur: 20, dx: 70, dy: 50 },
    { style: { bottom: '-12%', right: '-10%', width: 440, height: 440 }, colors: '#7c3aed,#0e7490', dur: 26, dx: -65, dy: -55 },
    { style: { top: '38%', left: '38%', width: 260, height: 260 }, colors: '#0891b2,#1e40af', dur: 16, dx: 35, dy: -35 },
  ]
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          animate={reduced ? {} : {
            x: [0, o.dx, 0], y: [0, o.dy, 0], scale: [1, 1.12, 1],
          }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          className="absolute rounded-full"
          style={{
            ...o.style,
            opacity: .065,
            filter: 'blur(80px)',
            background: `linear-gradient(135deg,${o.colors})`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SCAN LINE — cohérent GlobalBackground
═══════════════════════════════════════════════ */
function ScanLine({ reduced }) {
  if (reduced) return null
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0, right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom,transparent,rgba(99,102,241,.018),transparent)',
          animation: 'h-scan 6s linear infinite',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   PARTICLES — DOM-based, throttled
═══════════════════════════════════════════════ */
function Particles({ reduced }) {
  const ref = useRef(null)
  const cnt = useRef(0)

  const spawn = useCallback(() => {
    if (!ref.current || cnt.current > 30) return
    const el  = document.createElement('div')
    const sz  = Math.random() * 2.5 + 1.2
    const dur = Math.random() * 4500 + 2800
    const colors = ['59,130,246', '139,92,246', '6,182,212', '99,102,241']
    const hue = colors[Math.floor(Math.random() * colors.length)]
    Object.assign(el.style, {
      position: 'absolute',
      width: `${sz}px`, height: `${sz}px`,
      borderRadius: '50%',
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      background: `rgba(${hue},.72)`,
      boxShadow: `0 0 ${sz * 3}px rgba(${hue},.55)`,
      opacity: '0',
      pointerEvents: 'none',
      willChange: 'transform, opacity',
    })
    const anim = el.animate([
      { opacity: 0, transform: 'translateY(0) scale(0)' },
      { opacity: 1, transform: `translateY(${-(Math.random()*70+35)}px) scale(1)`, offset: .38 },
      { opacity: 0, transform: `translateY(${-(Math.random()*160+90)}px) scale(.35)` },
    ], { duration: dur, easing: 'cubic-bezier(.4,0,.2,1)' })
    ref.current.appendChild(el)
    cnt.current++
    anim.onfinish = () => { el.remove(); cnt.current-- }
  }, [])

  useEffect(() => {
    if (reduced) return
    const id = setInterval(spawn, 110)
    return () => clearInterval(id)
  }, [reduced, spawn])

  return <div ref={ref} aria-hidden className="absolute inset-0 pointer-events-none z-0"/>
}

/* ═══════════════════════════════════════════════
   FLOATING BADGES — CSS animation
═══════════════════════════════════════════════ */
function FloatingBadges({ reduced }) {
  return (
    <>
      {FLOATING_BADGES.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: .7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * .18 + .9, duration: .5, ease: BACK }}
          style={{ ...b.style, position: 'absolute' }}
          className={`hidden xl:flex items-center gap-2 px-3.5 py-2
                      rounded-2xl border backdrop-blur-md cursor-default select-none
                      ${!reduced ? b.cls : ''}`}
          aria-hidden
        >
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ background: b.bg, border: `1px solid ${b.border}` }}
          />
          <b.icon size={13} style={{ color: b.color, position: 'relative', zIndex: 1 }}/>
          <span style={{ color: b.color, fontSize: '11px', fontWeight: 600,
                         letterSpacing: '.03em', position: 'relative', zIndex: 1 }}>
            {b.label}
          </span>
        </motion.div>
      ))}
    </>
  )
}

/* ═══════════════════════════════════════════════
   PROFILE IMAGE — holographic rings
═══════════════════════════════════════════════ */
function ProfileImage({ reduced }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={itemVar}
      className="relative flex-shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer conic glow */}
      <div
        className={`absolute -inset-8 rounded-full pointer-events-none ${!reduced ? 'h-spin-cw' : ''}`}
        style={{
          background: 'conic-gradient(from 0deg,#3b82f6,#8b5cf6,#06b6d4,#6366f1,#3b82f6)',
          opacity: .22,
          filter: 'blur(22px)',
        }}
        aria-hidden
      />

      {/* Dashed counter ring */}
      <div
        className={`absolute -inset-4 rounded-full border border-dashed
                    border-indigo-500/25 pointer-events-none ${!reduced ? 'h-spin-ccw' : ''}`}
        aria-hidden
      />

      {/* Solid thin ring */}
      <div
        className={`absolute -inset-2 rounded-full border border-blue-500/18
                    pointer-events-none ${!reduced ? 'h-spin-cw' : ''}`}
        style={{ animationDuration: '22s' }}
        aria-hidden
      />

      {/* Orbit dots */}
      {!reduced && [0, 72, 144, 216, 288].map((deg, i) => (
        <div
          key={i}
          aria-hidden
          className="h-orbit absolute inset-0 rounded-full pointer-events-none"
          style={{ transformOrigin: '50% 50%', animationDelay: `${i * -2.4}s` }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 7, height: 7,
              borderRadius: '50%',
              background: i % 2 === 0
                ? 'rgba(99,102,241,.65)'
                : 'rgba(139,92,246,.55)',
              boxShadow: `0 0 8px rgba(99,102,241,.5)`,
              transform: `rotate(${deg}deg) translateX(calc(50% + 142px)) translateY(-50%)`,
            }}
          />
        </div>
      ))}

      {/* Image */}
      <motion.div
        whileHover={reduced ? {} : { scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        className="relative w-52 h-52 md:w-60 md:h-60 rounded-full p-[3px]"
        style={{
          background: 'linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4)',
          boxShadow: '0 0 48px rgba(99,102,241,.28), 0 20px 48px rgba(0,0,0,.45)',
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden relative"
             style={{ background: '#0a0f1e' }}>
          <img
            src={logo}
            alt="Badie Gmati — Ingénieur Logiciel"
            className="w-full h-full object-cover"
            style={{ transition: 'transform .7s ease' }}
          />
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .28 }}
                className="absolute inset-0 flex items-end justify-center pb-4"
                style={{
                  background: 'linear-gradient(to top,rgba(10,15,40,.72),transparent)',
                }}
              >
                <span style={{
                  color: '#e2e8f0', fontSize: '10px',
                  fontWeight: 600, letterSpacing: '.14em',
                  textTransform: 'uppercase',
                }}>
                  Badie Gmati
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Online ping */}
      <div
        className="absolute bottom-3 right-3 w-5 h-5 rounded-full
                   border-[2.5px] border-gray-950"
        style={{ background: 'linear-gradient(135deg,#4ade80,#10b981)' }}
      >
        {!reduced && (
          <div
            className="h-ping absolute inset-0 rounded-full"
            style={{ borderColor: 'rgba(74,222,128,.4)', border: '1px solid' }}
            aria-hidden
          />
        )}
      </div>

      {/* Availability chip */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: .5, ease: EXPO }}
        className="absolute -right-3 top-5 backdrop-blur-md
                   rounded-xl px-3 py-1.5 shadow-xl border"
        style={{
          background: 'rgba(9,12,28,.88)',
          borderColor: 'rgba(74,222,128,.22)',
          boxShadow: '0 4px 16px rgba(0,0,0,.4)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${!reduced ? 'h-pulse-dot' : ''}`}
            style={{ background: '#4ade80' }}
            aria-hidden
          />
          <span style={{ color: '#4ade80', fontSize: '11px', fontWeight: 600 }}>
            Disponible
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   STATS BAR
═══════════════════════════════════════════════ */
function StatsBar() {
  return (
    <motion.div
      variants={itemVar}
      className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8"
    >
      {STATS.map(({ value, label, icon: Icon, color }, i) => (
        <div
          key={i}
          className="h-stat group flex flex-col items-center gap-1.5
                     p-3.5 rounded-2xl border cursor-default"
          style={{
            background: 'rgba(255,255,255,.028)',
            borderColor: 'rgba(255,255,255,.068)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Icon size={16} style={{ color, marginBottom: 2 }}/>
          <span style={{ color, fontSize: '1.1rem', fontWeight: 800,
                         lineHeight: 1, letterSpacing: '-.01em' }}>
            {value}
          </span>
          <span style={{ color: '#94a3b8', fontSize: '9.5px',
                         textAlign: 'center', lineHeight: 1.3 }}>
            {label}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   TYPEWRITER
═══════════════════════════════════════════════ */
function TypeWriter() {
  const [idx,      setIdx]      = useState(0)
  const [display,  setDisplay]  = useState('')
  const [deleting, setDeleting] = useState(false)
  const [paused,   setPaused]   = useState(false)

  useEffect(() => {
    const full = ROLES[idx]
    if (paused) {
      const t = setTimeout(() => { setDeleting(true); setPaused(false) }, 1800)
      return () => clearTimeout(t)
    }
    if (!deleting && display.length < full.length) {
      const t = setTimeout(() => setDisplay(full.slice(0, display.length + 1)), 52)
      return () => clearTimeout(t)
    }
    if (!deleting && display.length === full.length) { setPaused(true); return }
    if (deleting && display.length > 0) {
      const t = setTimeout(() => setDisplay(display.slice(0, -1)), 28)
      return () => clearTimeout(t)
    }
    if (deleting && display.length === 0) {
      setDeleting(false)
      setIdx(p => (p + 1) % ROLES.length)
    }
  }, [display, deleting, paused, idx])

  return (
    <span
      className="h-grad"
      style={{ backgroundImage: 'linear-gradient(90deg,#60a5fa,#818cf8,#a78bfa,#60a5fa)' }}
    >
      {display}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: .75, repeat: Infinity }}
        style={{
          display: 'inline-block',
          width: '2px', height: '1.1em',
          background: '#818cf8',
          borderRadius: '1px',
          marginLeft: '3px',
          verticalAlign: 'middle',
        }}
      />
    </span>
  )
}

/* ═══════════════════════════════════════════════
   DOWNLOAD BUTTON — holographic
═══════════════════════════════════════════════ */
function DownloadButton({ onDownload }) {
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)

  const handle = async () => {
    if (loading) return
    setLoading(true)
    try { await onDownload() } catch {}
    setLoading(false)
    setDone(true)
    setTimeout(() => setDone(false), 2400)
  }

  return (
    <button
      onClick={handle}
      disabled={loading}
      className="h-btn-shimmer group relative flex items-center gap-3
                 px-7 py-3.5 rounded-2xl font-semibold text-sm
                 text-white overflow-hidden border"
      style={{
        background: 'linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)',
        borderColor: 'rgba(255,255,255,.12)',
        boxShadow: '0 8px 28px rgba(99,102,241,.32), inset 0 1px 0 rgba(255,255,255,.1)',
        transition: 'transform .24s cubic-bezier(.34,1.56,.64,1), box-shadow .24s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)'
        e.currentTarget.style.boxShadow = '0 14px 36px rgba(99,102,241,.44), inset 0 1px 0 rgba(255,255,255,.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(99,102,241,.32), inset 0 1px 0 rgba(255,255,255,.1)'
      }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="spin"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="w-4 h-4 border-2 rounded-full animate-spin"
            style={{ borderColor: 'rgba(255,255,255,.3)', borderTopColor: '#fff' }}
          />
        ) : done ? (
          <motion.span key="done"
            initial={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            style={{ color: '#86efac', fontSize: '1rem' }}
          >✓</motion.span>
        ) : (
          <motion.div key="icon"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Download size={17}/>
          </motion.div>
        )}
      </AnimatePresence>
      <span>{done ? 'Téléchargé !' : 'Télécharger mon CV'}</span>
      <ArrowRight
        size={15}
        style={{
          opacity: .7,
          transition: 'transform .28s ease',
        }}
        className="group-hover:translate-x-1"
      />
    </button>
  )
}

/* ═══════════════════════════════════════════════
   HERO — MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function Hero() {
  const reduced = useReducedMotion()

  const downloadCV = async () => {
    try {
      const res = await fetch(CV_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url; a.download = 'CV-Badie-Gmati.pdf'
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      setTimeout(() => { URL.revokeObjectURL(url); a.remove() }, 300)
    } catch (err) {
      console.warn('[Hero] fallback →', err.message)
      window.open(CV_URL, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <>
      <StyleInject/>

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center
                   overflow-hidden mt-16"
        style={{ background: 'transparent' }}
      >
        {/* Layers */}
        <HeroGrid/>
        <HeroOrbs reduced={reduced}/>
        <ScanLine reduced={reduced}/>
        <Particles reduced={reduced}/>
        <CursorGlow/>
        <FloatingBadges reduced={reduced}/>

        {/* Main */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 py-16">
          <motion.div
            variants={containerVar}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row items-center
                            gap-12 lg:gap-16 mb-10">
              <ProfileImage reduced={reduced}/>

              <motion.div variants={containerVar} className="flex-1 text-center lg:text-left">

                

                {/* Name */}
                <motion.div variants={itemVar} className="mb-3">
                  <h1
                    className="font-black tracking-tight leading-none text-white"
                    style={{ fontSize: 'clamp(2.6rem,6vw,4.2rem)' }}
                  >
                    <span
                      className="h-grad"
                      style={{
                        backgroundImage:
                          'linear-gradient(90deg,#60a5fa 0%,#818cf8 30%,#a78bfa 55%,#f472b6 80%,#60a5fa 100%)',
                      }}
                    >
                      Badie Gmati
                    </span>
                  </h1>
                </motion.div>

                {/* Typewriter */}
                <motion.div
                  variants={itemVar}
                  className="mb-5 font-semibold"
                  style={{ height: '2.2rem', fontSize: 'clamp(1rem,2.2vw,1.35rem)' }}
                >
                  <TypeWriter/>
                </motion.div>

                {/* Description */}
                <motion.p
                  variants={itemVar}
                  className="mb-6 mx-auto lg:mx-0 max-w-lg leading-relaxed"
                  style={{ color: '#94a3b8', fontSize: '14px' }}
                >
                  Diplômé{' '}
                  <span style={{ color: '#a78bfa', fontWeight: 600 }}>
                    Génie Logiciel Sciences Informatiques
                  </span>{' '}
                  avec mention{' '}
                  <span style={{ color: '#fbbf24', fontWeight: 700 }}>
                    Très Bien (17/20)
                  </span>.
                  {' '}Spécialisé en Full-Stack et IA embarquée.
                </motion.p>

                {/* Info pills */}
                <motion.div
                  variants={itemVar}
                  className="flex flex-wrap justify-center lg:justify-start gap-2 mb-7"
                >
                  {INFO_PILLS.map(({ icon: Icon, text, color }, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{
                        background: 'rgba(255,255,255,.03)',
                        border: '1px solid rgba(255,255,255,.07)',
                        color: '#94a3b8',
                        fontSize: '11.5px',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <Icon size={12} style={{ color }}/>
                      <span>{text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Stats */}
                

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVar}
                  className="flex flex-col sm:flex-row justify-center
                             lg:justify-start gap-3 mb-7"
                >
                  <DownloadButton onDownload={downloadCV}/>

                  <button
                    onClick={() =>
                      document.getElementById('about')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="group flex items-center justify-center gap-2.5
                               px-7 py-3.5 rounded-2xl font-semibold text-sm border"
                    style={{
                      background: 'rgba(255,255,255,.04)',
                      borderColor: 'rgba(255,255,255,.09)',
                      color: '#cbd5e1',
                      backdropFilter: 'blur(10px)',
                      transition: 'background .22s ease, border-color .22s ease, transform .24s cubic-bezier(.34,1.56,.64,1)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,.07)'
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,.04)'
                      e.currentTarget.style.transform = ''
                    }}
                  >
                    <span>Découvrir mon profil</span>
                    <ChevronDown size={16} style={{ opacity: .7 }}
                      className="group-hover:translate-y-1 transition-transform duration-300"/>
                  </button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  variants={itemVar}
                  className="flex justify-center lg:justify-start items-center gap-2.5"
                >
                  <span style={{ color: '#475569', fontSize: '11.5px', marginRight: 4 }}>
                    Me retrouver sur
                  </span>
                  {SOCIAL_LINKS.map(({ href, icon: Icon, label, hoverColor }, i) => (
                    <a
                      key={i}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="h-social group relative p-2.5 rounded-xl border"
                      style={{
                        background: 'rgba(255,255,255,.035)',
                        borderColor: 'rgba(255,255,255,.07)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <Icon size={18} style={{ color: '#64748b', transition: 'color .22s ease' }}
                        onMouseEnter={e => e.currentTarget.style.color = hoverColor}
                        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                      />
                      {/* Tooltip */}
                      <span
                        className="absolute -top-8 left-1/2 -translate-x-1/2
                                   opacity-0 group-hover:opacity-100
                                   transition-opacity duration-200 pointer-events-none
                                   text-xs text-white px-2 py-1 rounded-lg whitespace-nowrap"
                        style={{
                          background: 'rgba(9,12,28,.95)',
                          border: '1px solid rgba(255,255,255,.08)',
                        }}
                      >
                        {label}
                      </span>
                    </a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: .7 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
        >
          <div
            className="h-scroll-mouse flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() =>
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <div
              className="w-5 h-9 rounded-full border-2 flex items-start
                         justify-center pt-1.5"
              style={{ borderColor: 'rgba(99,102,241,.3)' }}
            >
              <motion.div
                animate={reduced ? {} : {
                  y: [0, 10, 0], opacity: [1, 0, 1],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[2px] h-2 rounded-full"
                style={{ background: '#818cf8' }}
              />
            </div>
            <span
              style={{ color: '#475569', fontSize: '9.5px',
                       letterSpacing: '.14em', textTransform: 'uppercase',
                       transition: 'color .22s ease' }}
              className="group-hover:!text-slate-400"
            >
              Scroll
            </span>
          </div>
        </motion.div>
      </section>
    </>
  )
}