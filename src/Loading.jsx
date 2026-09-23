// Loading.jsx — Ultra Professional Holographic Loader v2
// FIXES:
//   - Prop onDone → synchronisation avec App.jsx
//   - Duplicate style attribute dans BrandHeader → fusionné
//   - Import useCallback/useRef inutilisés → retirés
//   - Variable dir inutilisée dans OrbitRing → retirée
//   - useCallback importé de GlobalBackground → inutile retiré

import { useEffect, useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Cpu, Code2, Sparkles, Zap, Terminal, Globe } from 'lucide-react'

/* ═══════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════ */
const EASE_EXPO = [0.16, 1, 0.3, 1]
const EASE_BACK = [0.34, 1.56, 0.64, 1]

const STEPS = [
  { label: 'Initialisation système…', icon: Cpu,      color: '#3b82f6', pct: 22  },
  { label: 'Chargement stack…',       icon: Code2,    color: '#8b5cf6', pct: 48  },
  { label: 'Optimisation IA…',        icon: Sparkles, color: '#06b6d4', pct: 76  },
  { label: 'Système prêt !',          icon: Zap,      color: '#10b981', pct: 100 },
]

const TECH_PILLS = [
  { label: 'React',    color: '#60a5fa' },
  { label: 'Next.js',  color: '#a78bfa' },
  { label: 'Python',   color: '#fbbf24' },
  { label: 'Edge AI',  color: '#34d399' },
  { label: 'Tailwind', color: '#22d3ee' },
  { label: 'Framer',   color: '#f472b6' },
]

/* ═══════════════════════════════════════════════════════
   CSS INJECTION
═══════════════════════════════════════════════════════ */
const LOADER_STYLES = `
  @keyframes ld-orb-a {
    0%,100% { transform: translate(0,0) scale(1) }
    50%     { transform: translate(24px,-16px) scale(1.08) }
  }
  @keyframes ld-orb-b {
    0%,100% { transform: translate(0,0) scale(1) }
    50%     { transform: translate(-20px,18px) scale(1.06) }
  }
  @keyframes ld-grad {
    0%,100% { background-position: 0% 50% }
    50%     { background-position: 100% 50% }
  }
  @keyframes ld-shimmer {
    0%   { transform: translateX(-100%) }
    100% { transform: translateX(400%) }
  }
  @keyframes ld-scan {
    0%   { transform: translateY(-100%) }
    100% { transform: translateY(100vh) }
  }
  @keyframes ld-rain {
    0%   { transform: translateY(-20px); opacity: 0 }
    15%  { opacity: 0.8 }
    85%  { opacity: 0.6 }
    100% { transform: translateY(100vh); opacity: 0 }
  }
  @keyframes ld-cw  {
    to { transform: translate(-50%,-50%) rotate(360deg)  }
  }
  @keyframes ld-ccw {
    to { transform: translate(-50%,-50%) rotate(-360deg) }
  }
  @keyframes ld-ring {
    0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.5 }
    100% { transform: translate(-50%,-50%) scale(2.4); opacity: 0   }
  }
  @keyframes ld-holo {
    0%,100% { opacity: 0.2 }
    50%     { opacity: 0.7 }
  }
  @keyframes ld-float {
    0%,100% { transform: translateY(0px)  }
    50%     { transform: translateY(-6px) }
  }
  @keyframes ld-twinkle {
    0%,100% { opacity: 0.15; transform: scale(1)   }
    50%     { opacity: 0.9;  transform: scale(1.4) }
  }
  @keyframes ld-conic {
    to { transform: translate(-50%,-50%) rotate(360deg) }
  }
  @keyframes ld-exit-scale {
    0%   { transform: scale(1);    opacity: 1 }
    100% { transform: scale(1.06); opacity: 0 }
  }

  .ld-orb-a   { animation: ld-orb-a  5s ease-in-out infinite alternate }
  .ld-orb-b   { animation: ld-orb-b  7s ease-in-out infinite alternate }
  .ld-shimmer { animation: ld-shimmer 1.8s ease infinite }
  .ld-float   { animation: ld-float  3.5s ease-in-out infinite }
  .ld-holo    { animation: ld-holo   2.8s ease-in-out infinite }

  @media (prefers-reduced-motion: reduce) {
    .ld-orb-a, .ld-orb-b, .ld-shimmer,
    .ld-float, .ld-holo { animation: none !important }
  }
`

function StyleInject() {
  useEffect(() => {
    const ID = 'ld-styles-v2'
    if (document.getElementById(ID)) return
    const el = document.createElement('style')
    el.id        = ID
    el.textContent = LOADER_STYLES
    document.head.appendChild(el)
    return () => document.getElementById(ID)?.remove()
  }, [])
  return null
}

/* ═══════════════════════════════════════════════════════
   CANVAS — Particle Network
═══════════════════════════════════════════════════════ */
function ParticleCanvas({ reduced }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reduced) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })

    const W = canvas.width  = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight

    const N       = 32
    const palette = ['#3b82f6','#8b5cf6','#06b6d4','#6366f1','#a855f7']
    const pts     = Array.from({ length: N }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 1.8 + 0.4,
      c:  palette[Math.floor(Math.random() * palette.length)],
      a:  Math.random() * 0.6 + 0.2,
      ph: Math.random() * Math.PI * 2,
      ps: Math.random() * 0.025 + 0.01,
    }))

    let raf      = null
    const MAX_D  = 120

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.ph += p.ps
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        const pulse = 0.5 + 0.5 * Math.sin(p.ph)

        /* glow */
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        g.addColorStop(0, p.c + Math.round(p.a * pulse * 255).toString(16).padStart(2, '0'))
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill()

        /* core */
        ctx.fillStyle = p.c + 'cc'
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      })

      /* connexions */
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d > MAX_D) continue
          const t  = 1 - d / MAX_D
          const gr = ctx.createLinearGradient(pts[i].x, pts[i].y, pts[j].x, pts[j].y)
          gr.addColorStop(0, pts[i].c + Math.round(t * t * 0.35 * 255).toString(16).padStart(2, '0'))
          gr.addColorStop(1, pts[j].c + Math.round(t * t * 0.35 * 255).toString(16).padStart(2, '0'))
          ctx.strokeStyle = gr
          ctx.lineWidth   = t * 0.8
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  if (reduced) return null
  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.22 }}
      aria-hidden="true"
    />
  )
}

/* ═══════════════════════════════════════════════════════
   ORBIT RING — variable dir supprimée
═══════════════════════════════════════════════════════ */
function OrbitRing({ radius, duration, dotCount, color, clockwise, reduced }) {
  const dots = useMemo(() =>
    Array.from({ length: dotCount }, (_, i) => ({
      angle:   (i / dotCount) * 360,
      opacity: 0.35 + (i / dotCount) * 0.65,
      scale:   0.7  + (i / dotCount) * 0.5,
    })), [dotCount])

  return (
    <div
      className="absolute"
      style={{
        width:      radius * 2,
        height:     radius * 2,
        top:        '50%',
        left:       '50%',
        transform:  'translate(-50%,-50%)',
        animation:  reduced
          ? 'none'
          : `${clockwise ? 'ld-cw' : 'ld-ccw'} ${duration}s linear infinite`,
        willChange: 'transform',
      }}
    >
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width:      d.scale * 6 + 'px',
            height:     d.scale * 6 + 'px',
            background: color,
            boxShadow:  `0 0 ${d.scale * 8}px ${color}`,
            top:        '50%',
            left:       '50%',
            transform:  `rotate(${d.angle}deg) translateX(${radius}px) translateY(-50%)`,
            opacity:    d.opacity,
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   PULSE RINGS
═══════════════════════════════════════════════════════ */
function PulseRings({ color, reduced }) {
  if (reduced) return null
  return (
    <>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="absolute rounded-full border pointer-events-none"
          style={{
            width:       160,
            height:      160,
            top:         '50%',
            left:        '50%',
            borderColor: color + '55',
            animation:   `ld-ring ${2.4 + i * 0.6}s ease-out ${i * 0.8}s infinite`,
            willChange:  'transform, opacity',
          }}
          aria-hidden="true"
        />
      ))}
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   CODE RAIN
═══════════════════════════════════════════════════════ */
function CodeRain({ reduced }) {
  const drops = useMemo(() => {
    const chars = ['0','1','<','>','{','}','λ','∞','→','⚡','⬡','//']
    return Array.from({ length: 12 }, (_, i) => ({
      id:    i,
      char:  chars[i % chars.length],
      left:  `${(i / 12) * 96 + 2}%`,
      delay: `${(i * 0.28) % 3.2}s`,
      dur:   `${1.8 + (i % 4) * 0.55}s`,
      color: ['#3b82f6','#8b5cf6','#06b6d4','#6366f1'][i % 4],
      size:  9 + (i % 3) * 2,
    }))
  }, [])

  if (reduced) return null
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: 0.18 }}
      aria-hidden="true"
    >
      {drops.map(d => (
        <div
          key={d.id}
          className="absolute font-mono font-black"
          style={{
            left:       d.left,
            top:        0,
            color:      d.color,
            fontSize:   d.size,
            textShadow: `0 0 8px ${d.color}`,
            animation:  `ld-rain ${d.dur} ${d.delay} linear infinite`,
            willChange: 'transform, opacity',
          }}
        >
          {d.char}
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   HOLOGRAPHIC CENTER ICON
═══════════════════════════════════════════════════════ */
function CenterIcon({ step, cur, reduced }) {
  const Icon = cur.icon
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ scale: 0.4, opacity: 0, rotate: -90, filter: 'blur(8px)'  }}
          animate={{ scale: 1,   opacity: 1, rotate: 0,   filter: 'blur(0px)'  }}
          exit={{   scale: 1.6,  opacity: 0, rotate: 90,  filter: 'blur(6px)'  }}
          transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          className="relative"
        >
          {/* Outer glow */}
          <div
            className="absolute rounded-full blur-2xl"
            style={{ inset: '-20px', background: cur.color + '30' }}
          />

          {/* Holographic card */}
          <div
            className="relative w-24 h-24 rounded-2xl flex items-center
                       justify-center shadow-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg,${cur.color}22,${cur.color}08)`,
              border:     `1px solid ${cur.color}45`,
              boxShadow:  `0 0 40px ${cur.color}25, inset 0 1px 0 ${cur.color}30`,
            }}
          >
            {!reduced && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg,${cur.color}18 0%,transparent 60%)`,
                }}
              />
            )}

            <div
              className="ld-holo absolute inset-0 rounded-2xl pointer-events-none"
              style={{ border: `1px solid ${cur.color}50` }}
            />

            <motion.div
              animate={reduced ? {} : {
                filter: [
                  `drop-shadow(0 0 6px ${cur.color}80)`,
                  `drop-shadow(0 0 16px ${cur.color}cc)`,
                  `drop-shadow(0 0 6px ${cur.color}80)`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon size={36} style={{ color: cur.color }} />
            </motion.div>

            {['top-1.5 left-1.5','top-1.5 right-1.5',
              'bottom-1.5 left-1.5','bottom-1.5 right-1.5'].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-1 h-1 rounded-full`}
                style={{
                  background: cur.color,
                  opacity:    0.6,
                  animation:  reduced
                    ? 'none'
                    : `ld-twinkle 1.8s ${i * 0.45}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>

          {/* Step badge */}
          <div
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full
                       flex items-center justify-center text-[9px] font-black text-white"
            style={{ background: cur.color, boxShadow: `0 0 10px ${cur.color}` }}
          >
            {step + 1}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════════════════════════ */
function ProgressBar({ pct, step, cur, reduced }) {
  return (
    <div className="w-72 md:w-96 mb-6">

      <div className="flex justify-between items-center mb-2.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1,  x: 0   }}
            exit={{   opacity: 0,  x: 10   }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
            className="flex items-center gap-1.5"
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: cur.color,
                boxShadow:  `0 0 6px ${cur.color}`,
                animation:  reduced ? 'none' : 'ld-twinkle 1.2s ease-in-out infinite',
              }}
            />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.15em]"
              style={{ color: cur.color }}
            >
              {cur.label}
            </span>
          </motion.div>
        </AnimatePresence>
        <span className="text-gray-500 text-xs font-mono tabular-nums">
          {Math.round(pct)}<span className="text-gray-700">%</span>
        </span>
      </div>

      {/* Track */}
      <div
        className="relative h-[3px] rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
          style={{
            width:      `${pct}%`,
            background: `linear-gradient(90deg,#3b82f6,${cur.color})`,
            transition: 'width 0.12s ease',
            boxShadow:  `0 0 10px ${cur.color}80`,
          }}
        >
          {!reduced && (
            <div
              className="ld-shimmer absolute inset-0"
              style={{
                background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)',
                width:      '40%',
              }}
            />
          )}
        </div>

        {/* Glow head */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{
            left:       `calc(${pct}% - 4px)`,
            background: cur.color,
            boxShadow:  `0 0 8px ${cur.color}, 0 0 20px ${cur.color}60`,
            transition: 'left 0.12s ease',
          }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-4">
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-1"
            animate={
              i <= step
                ? { scale: i === step ? 1.15 : 1, opacity: 1   }
                : { scale: 0.75,                  opacity: 0.25 }
            }
            transition={{ type: 'spring', stiffness: 320 }}
          >
            <div
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i <= step ? s.color : 'rgba(255,255,255,0.10)',
                boxShadow:  i === step ? `0 0 8px ${s.color}` : 'none',
              }}
            />
            {i < step && (
              <div
                className="w-[1px] h-3"
                style={{
                  background: `linear-gradient(to bottom,${s.color}80,transparent)`,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   TECH PILLS
═══════════════════════════════════════════════════════ */
function TechPills({ reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1,  y: 0  }}
      transition={{ delay: 0.7, duration: 0.6, ease: EASE_EXPO }}
      className="flex flex-wrap justify-center gap-2 max-w-xs"
    >
      {TECH_PILLS.map((t, i) => (
        <motion.span
          key={t.label}
          initial={{ opacity: 0, scale: 0.7, y: 8 }}
          animate={{ opacity: 1, scale: 1,   y: 0 }}
          transition={{ delay: 0.85 + i * 0.06, ease: EASE_BACK }}
          whileHover={reduced ? {} : { scale: 1.08, y: -3 }}
          className="relative px-3 py-1 rounded-full text-[10px] font-bold
                     cursor-default select-none overflow-hidden"
          style={{
            background: `linear-gradient(135deg,${t.color}12,${t.color}06)`,
            border:     `1px solid ${t.color}28`,
            color:      t.color,
            boxShadow:  `0 2px 10px ${t.color}10`,
          }}
        >
          {!reduced && (
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `linear-gradient(90deg,transparent,${t.color}18,transparent)`,
                animation:  `ld-shimmer ${1.5 + i * 0.3}s ${i * 0.15}s ease infinite`,
              }}
            />
          )}
          <span className="relative z-10">{t.label}</span>
        </motion.span>
      ))}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   BRAND HEADER
   FIX : un seul attribut style (originX + background fusionnés)
═══════════════════════════════════════════════════════ */
function BrandHeader({ reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1,  y: 0  }}
      transition={{ delay: 0.25, duration: 0.65, ease: EASE_EXPO }}
      className="text-center mb-8"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1,  scale: 1   }}
        transition={{ delay: 0.15, duration: 0.5, ease: EASE_BACK }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5
                   border border-indigo-500/[0.18] bg-indigo-500/[0.06]
                   text-indigo-300/80 text-[9px] font-black uppercase tracking-[0.28em]"
        style={{
          backdropFilter: 'blur(12px)',
          boxShadow:      '0 0 20px rgba(99,102,241,0.08)',
        }}
      >
        <Terminal size={9} />
        Portfolio v2.0
        <Globe size={9} />
      </motion.div>

      {/* Name */}
      <h1
        className="text-4xl md:text-5xl font-black tracking-tight mb-2
                   text-transparent bg-clip-text"
        style={{
          backgroundImage: 'linear-gradient(90deg,#60a5fa 0%,#818cf8 28%,#a78bfa 50%,#22d3ee 100%)',
          backgroundSize:  '200% 200%',
          animation:       reduced ? 'none' : 'ld-grad 4s ease infinite',
        }}
      >
        Badie Gmati
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm tracking-wide">
        Ingénieur Full-Stack
        <span
          className="mx-2 text-indigo-500/60"
          style={{ fontFamily: 'monospace' }}
        >
          ·
        </span>
        Développeur IA Embarquée
      </p>

      {/*
       * FIX CRITIQUE : un seul attribut style
       * originX (Framer Motion transform-origin) + background fusionnés
       */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.9, ease: EASE_EXPO }}
        className="mx-auto mt-3 h-px max-w-[180px] rounded-full"
        style={{
          originX:    0.5,
          background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.55),transparent)',
        }}
      />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   LOADING MAIN
   FIX : prop onDone → appelée quand pct atteint 100%
═══════════════════════════════════════════════════════ */
export default function Loading({ onDone }) {
  const reduced          = useReducedMotion()
  const [step,  setStep] = useState(0)
  const [pct,   setPct]  = useState(0)
  const [done,  setDone] = useState(false)

  useEffect(() => {
    const target = STEPS[step]?.pct ?? 100
    const id = setInterval(() => {
      setPct(cur => {
        const next = cur + Math.random() * 2.8 + 0.8
        if (next >= target) {
          clearInterval(id)
          if (step < STEPS.length - 1) {
            setTimeout(() => setStep(s => s + 1), 380)
          } else {
            /*
             * ── FIX SYNCHRONISATION ──
             * On attend 650ms (animation exit) puis :
             * 1. setDone(true) → AnimatePresence déclenche exit
             * 2. onDone?.()    → App.jsx setIsLoading(false)
             */
            setTimeout(() => {
              setDone(true)
              setTimeout(() => onDone?.(), 700) // attendre exit animation
            }, 650)
          }
          return target
        }
        return next
      })
    }, 38)
    return () => clearInterval(id)
  }, [step, onDone])

  const cur = STEPS[step] ?? STEPS[STEPS.length - 1]

  return (
    <>
      <StyleInject />
      <AnimatePresence>
        {!done && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
            transition={{ duration: 0.65, ease: EASE_EXPO }}
            className="fixed inset-0 z-[200] flex flex-col items-center
                       justify-center overflow-hidden"
            style={{
              background:
                'linear-gradient(180deg,#020817 0%,#030d20 50%,#020810 100%)',
            }}
          >
            {/* Canvas particules */}
            <ParticleCanvas reduced={reduced} />

            {/* Code rain */}
            <CodeRain reduced={reduced} />

            {/* Dot grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'radial-gradient(circle,rgba(148,163,184,0.038) 1px,transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  'radial-gradient(ellipse 82% 68% at 50% 50%,transparent 38%,rgba(2,8,23,0.72) 100%)',
              }}
            />

            {/* Scanlines */}
            {!reduced && (
              <>
                <div
                  className="absolute left-0 right-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    height:     '2px',
                    background: 'rgba(99,102,241,0.06)',
                    animation:  'ld-scan 4s linear infinite',
                    willChange: 'transform',
                  }}
                />
                <div
                  className="absolute left-0 right-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    height:     '1px',
                    background: 'rgba(6,182,212,0.04)',
                    animation:  'ld-scan 6.5s 2s linear infinite',
                    willChange: 'transform',
                  }}
                />
              </>
            )}

            {/* Orb A */}
            <div
              className="ld-orb-a absolute -top-32 -left-32 rounded-full pointer-events-none"
              aria-hidden="true"
              style={{
                width:      380,
                height:     380,
                background: 'radial-gradient(circle,#1e40af,#6d28d9)',
                filter:     'blur(88px)',
                opacity:    0.08,
              }}
            />

            {/* Orb B */}
            <div
              className="ld-orb-b absolute -bottom-32 -right-32 rounded-full pointer-events-none"
              aria-hidden="true"
              style={{
                width:      320,
                height:     320,
                background: 'radial-gradient(circle,#7c3aed,#0891b2)',
                filter:     'blur(88px)',
                opacity:    0.07,
              }}
            />

            {/* ═══ ORBIT SYSTEM ═══ */}
            <div className="relative mb-10">
              <div
                className="ld-float relative"
                style={{ width: 280, height: 280 }}
              >
                {/* Outer static ring */}
                <div
                  className="absolute rounded-full border border-white/[0.04]"
                  style={{
                    inset:     -8,
                    boxShadow: '0 0 40px rgba(99,102,241,0.04)',
                  }}
                />

                <OrbitRing radius={122} duration={16} dotCount={7}
                  color="#3b82f6" clockwise={true}  reduced={reduced} />
                <OrbitRing radius={96}  duration={10} dotCount={5}
                  color="#8b5cf6" clockwise={false} reduced={reduced} />
                <OrbitRing radius={70}  duration={7}  dotCount={4}
                  color="#06b6d4" clockwise={true}  reduced={reduced} />

                {/* Conic spinner */}
                {!reduced && (
                  <div
                    className="absolute rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg,#3b82f6,#8b5cf6,#06b6d4,#6366f1,transparent)',
                      opacity:    0.22,
                      filter:     'blur(6px)',
                      animation:  'ld-conic 3s linear infinite',
                      top:        '50%',
                      left:       '50%',
                      width:      'calc(100% - 48px)',
                      height:     'calc(100% - 48px)',
                      willChange: 'transform',
                    }}
                  />
                )}

                {/* Counter-conic */}
                {!reduced && (
                  <div
                    className="absolute rounded-full"
                    style={{
                      background: 'conic-gradient(from 180deg,#6366f1,#a855f7,transparent,#06b6d4)',
                      opacity:    0.14,
                      filter:     'blur(4px)',
                      animation:  'ld-ccw 5s linear infinite',
                      top:        '50%',
                      left:       '50%',
                      width:      'calc(100% - 72px)',
                      height:     'calc(100% - 72px)',
                      willChange: 'transform',
                    }}
                  />
                )}

                {/* Dashed ring */}
                <div
                  className="absolute rounded-full border border-dashed border-indigo-500/20"
                  style={{
                    animation:  reduced ? 'none' : 'ld-ccw 8s linear infinite',
                    top:        '50%',
                    left:       '50%',
                    width:      'calc(100% - 32px)',
                    height:     'calc(100% - 32px)',
                    willChange: 'transform',
                  }}
                />

                <PulseRings color={cur.color} reduced={reduced} />
                <CenterIcon step={step} cur={cur} reduced={reduced} />
              </div>
            </div>

            <BrandHeader reduced={reduced} />
            <ProgressBar pct={pct} step={step} cur={cur} reduced={reduced} />
            <TechPills reduced={reduced} />

            {/* Bottom watermark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-6 left-0 right-0 flex items-center
                         justify-center gap-2 text-[9px] text-gray-700
                         font-mono uppercase tracking-[0.22em]"
            >
              <div className="w-4 h-px" style={{
                background: 'linear-gradient(to right,transparent,rgba(99,102,241,0.4))',
              }} />
              React · Tailwind · Framer Motion · Vite
              <div className="w-4 h-px" style={{
                background: 'linear-gradient(to left,transparent,rgba(99,102,241,0.4))',
              }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}