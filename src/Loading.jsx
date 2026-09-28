// Loading.jsx — Ultra Professional Holographic Loader v4
// Features:
//   - Zero lag : RAF optimisé, will-change ciblé, passive listeners
//   - Responsive : fluid sur mobile/tablet/desktop/4K
//   - Reduced motion : toutes animations désactivées proprement
//   - StrictMode safe : useRef flag, onDone stabilisé
//   - Accessibilité : role="status", aria-live, aria-label
//   - Performance : useMemo partout, canvas DPR-aware

import { useEffect, useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Cpu, Code2, Sparkles, Zap, Terminal, Globe } from 'lucide-react'

/* ═══════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════ */
const EASE_EXPO = [0.16, 1, 0.3, 1]
const EASE_BACK = [0.34, 1.56, 0.64, 1]

const STEPS = [
  { label: 'System initialization…', icon: Cpu,      color: '#3b82f6', pct: 22  },
  { label: 'Loading stack…',         icon: Code2,    color: '#8b5cf6', pct: 48  },
  { label: 'AI optimization…',       icon: Sparkles, color: '#06b6d4', pct: 76  },
  { label: 'System ready!',          icon: Zap,      color: '#10b981', pct: 100 },
]

const TECH_PILLS = [
  { label: 'React',         color: '#60a5fa' },
  { label: 'Next.js',       color: '#a78bfa' },
  { label: 'Python',        color: '#fbbf24' },
  { label: 'Edge AI',       color: '#34d399' },
  { label: 'Flutter',       color: '#22d3ee' },
  { label: 'Framer Motion', color: '#f472b6' },
]

/* ═══════════════════════════════════════════════════════
   CSS INJECTION — Zero Lag
═══════════════════════════════════════════════════════ */
const LOADER_STYLES = `
  /* ── Keyframes ── */
  @keyframes ld-orb-a {
    0%,100% { transform: translate(0,0) scale(1) }
    50%     { transform: translate(20px,-14px) scale(1.06) }
  }
  @keyframes ld-orb-b {
    0%,100% { transform: translate(0,0) scale(1) }
    50%     { transform: translate(-18px,16px) scale(1.05) }
  }
  @keyframes ld-grad {
    0%,100% { background-position: 0% 50% }
    50%     { background-position: 100% 50% }
  }
  @keyframes ld-shimmer {
    0%   { transform: translateX(-100%) skewX(-12deg) }
    100% { transform: translateX(500%) skewX(-12deg) }
  }
  @keyframes ld-scan {
    0%   { transform: translateY(-100%) }
    100% { transform: translateY(100vh)  }
  }
  @keyframes ld-rain {
    0%   { transform: translateY(-30px); opacity:0   }
    12%  { opacity:.75 }
    88%  { opacity:.55 }
    100% { transform: translateY(105vh); opacity:0   }
  }
  @keyframes ld-cw {
    to { transform: translate(-50%,-50%) rotate(360deg) }
  }
  @keyframes ld-ccw {
    to { transform: translate(-50%,-50%) rotate(-360deg) }
  }
  @keyframes ld-ring {
    0%   { transform:translate(-50%,-50%) scale(1);   opacity:.55 }
    100% { transform:translate(-50%,-50%) scale(2.6); opacity:0   }
  }
  @keyframes ld-holo {
    0%,100% { opacity:.18 }
    50%     { opacity:.65 }
  }
  @keyframes ld-float {
    0%,100% { transform: translateY(0px)  }
    50%     { transform: translateY(-7px) }
  }
  @keyframes ld-twinkle {
    0%,100% { opacity:.14; transform:scale(1)   }
    50%     { opacity:.9;  transform:scale(1.5) }
  }
  @keyframes ld-conic {
    to { transform: translate(-50%,-50%) rotate(360deg) }
  }
  @keyframes ld-breathe {
    0%,100% { opacity:.55; transform:scale(1)    }
    50%     { opacity:.85; transform:scale(1.015) }
  }
  @keyframes ld-dot-bounce {
    0%,80%,100% { transform:scale(0.6); opacity:.4 }
    40%         { transform:scale(1);   opacity:1   }
  }
  @keyframes ld-bar-glow {
    0%,100% { box-shadow: 0 0 8px currentColor  }
    50%     { box-shadow: 0 0 22px currentColor  }
  }
  @keyframes ld-pill-in {
    from { opacity:0; transform:translateY(10px) scale(.85) }
    to   { opacity:1; transform:translateY(0)    scale(1)   }
  }

  /* ── Utility classes ── */
  .ld-orb-a   { animation: ld-orb-a   6s ease-in-out infinite alternate }
  .ld-orb-b   { animation: ld-orb-b   8s ease-in-out infinite alternate }
  .ld-shimmer { animation: ld-shimmer 2s ease-in-out infinite }
  .ld-float   { animation: ld-float   3.8s ease-in-out infinite }
  .ld-holo    { animation: ld-holo    3s   ease-in-out infinite }
  .ld-breathe { animation: ld-breathe 3.2s ease-in-out infinite }

  /* ── GPU-only properties ── */
  .ld-gpu {
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  /* ── Scrollbar hidden ── */
  .ld-root { overflow: hidden }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .ld-orb-a, .ld-orb-b, .ld-shimmer,
    .ld-float, .ld-holo, .ld-breathe,
    .ld-gpu { animation: none !important }
  }

  /* ── Mobile touch ── */
  .ld-touch { -webkit-tap-highlight-color: transparent }
`

function StyleInject() {
  useEffect(() => {
    const ID = 'ld-styles-v4'
    if (document.getElementById(ID)) return
    const el = document.createElement('style')
    el.id          = ID
    el.textContent = LOADER_STYLES
    document.head.appendChild(el)
    return () => document.getElementById(ID)?.remove()
  }, [])
  return null
}

/* ═══════════════════════════════════════════════════════
   CANVAS — DPR-aware, responsive, zero lag
═══════════════════════════════════════════════════════ */
function ParticleCanvas({ reduced }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reduced) return
    const canvas = ref.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', {
      alpha:          true,
      desynchronized: true,
    })

    /* DPR-aware sizing */
    const dpr  = Math.min(window.devicePixelRatio || 1, 2)
    const W    = window.innerWidth
    const H    = window.innerHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    canvas.style.width  = W + 'px'
    canvas.style.height = H + 'px'
    ctx.scale(dpr, dpr)

    /* Fewer particles on mobile */
    const isMobile = W < 768
    const N        = isMobile ? 18 : 32
    const MAX_D    = isMobile ? 90  : 120

    const palette = ['#3b82f6','#8b5cf6','#06b6d4','#6366f1','#a855f7']
    const pts     = Array.from({ length: N }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * (isMobile ? .25 : .4),
      vy: (Math.random() - .5) * (isMobile ? .25 : .4),
      r:  Math.random() * 1.6 + .5,
      c:  palette[Math.floor(Math.random() * palette.length)],
      a:  Math.random() * .55 + .2,
      ph: Math.random() * Math.PI * 2,
      ps: Math.random() * .02  + .008,
    }))

    let raf  = null
    let last = 0
    const FPS = isMobile ? 30 : 60
    const FT  = 1000 / FPS

    const draw = (ts) => {
      raf = requestAnimationFrame(draw)
      if (ts - last < FT) return
      last = ts

      ctx.clearRect(0, 0, W, H)

      /* Particles */
      pts.forEach(p => {
        p.x  += p.vx; p.y += p.vy; p.ph += p.ps
        if (p.x < 0)  p.x = W
        if (p.x > W)  p.x = 0
        if (p.y < 0)  p.y = H
        if (p.y > H)  p.y = 0
        const pulse = .5 + .5 * Math.sin(p.ph)
        const alpha = Math.round(p.a * pulse * 255)
          .toString(16).padStart(2,'0')

        /* glow */
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5)
        g.addColorStop(0, p.c + alpha)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
        ctx.fill()

        /* core */
        ctx.fillStyle = p.c + 'dd'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      /* Connections */
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx*dx + dy*dy)
          if (d > MAX_D) continue
          const t  = 1 - d / MAX_D
          const gr = ctx.createLinearGradient(
            pts[i].x, pts[i].y, pts[j].x, pts[j].y
          )
          const a0 = Math.round(t*t*.3*255).toString(16).padStart(2,'0')
          gr.addColorStop(0, pts[i].c + a0)
          gr.addColorStop(1, pts[j].c + a0)
          ctx.strokeStyle = gr
          ctx.lineWidth   = t * .9
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.stroke()
        }
      }
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  if (reduced) return null
  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none ld-gpu"
      style={{ opacity: .2 }}
      aria-hidden="true"
    />
  )
}

/* ═══════════════════════════════════════════════════════
   CODE RAIN — responsive, throttled
═══════════════════════════════════════════════════════ */
function CodeRain({ reduced }) {
  const drops = useMemo(() => {
    const chars = ['0','1','<','>','{','}','λ','∞','→','⚡','//','AI']
    const count = typeof window !== 'undefined' && window.innerWidth < 640
      ? 6 : 12
    return Array.from({ length: count }, (_, i) => ({
      id:    i,
      char:  chars[i % chars.length],
      left:  `${(i / count) * 94 + 3}%`,
      delay: `${(i * .32) % 3.4}s`,
      dur:   `${2 + (i % 4) * .6}s`,
      color: ['#3b82f6','#8b5cf6','#06b6d4','#6366f1'][i % 4],
      size:  8 + (i % 3) * 2,
    }))
  }, [])

  if (reduced) return null
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none ld-gpu"
      style={{ opacity: .15 }}
      aria-hidden="true"
    >
      {drops.map(d => (
        <span
          key={d.id}
          className="absolute font-mono font-black select-none"
          style={{
            left:       d.left,
            top:        0,
            color:      d.color,
            fontSize:   d.size,
            textShadow: `0 0 8px ${d.color}`,
            animation:  `ld-rain ${d.dur} ${d.delay} linear infinite`,
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        >
          {d.char}
        </span>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   ORBIT RING — GPU only
═══════════════════════════════════════════════════════ */
function OrbitRing({ radius, duration, dotCount, color, clockwise, reduced }) {
  const dots = useMemo(() =>
    Array.from({ length: dotCount }, (_, i) => ({
      angle:   (i / dotCount) * 360,
      opacity: .3 + (i / dotCount) * .7,
      size:    (.65 + (i / dotCount) * .55) * 6,
    }))
  , [dotCount])

  return (
    <div
      className="absolute ld-gpu"
      style={{
        width:     radius * 2,
        height:    radius * 2,
        top:       '50%',
        left:      '50%',
        transform: 'translate(-50%,-50%)',
        animation: reduced
          ? 'none'
          : `${clockwise ? 'ld-cw' : 'ld-ccw'} ${duration}s linear infinite`,
      }}
      aria-hidden="true"
    >
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width:      d.size,
            height:     d.size,
            background: color,
            boxShadow:  `0 0 ${d.size * 1.8}px ${color}`,
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
          className="absolute rounded-full border pointer-events-none ld-gpu"
          style={{
            width:       148,
            height:      148,
            top:         '50%',
            left:        '50%',
            borderColor: color + '50',
            animation:   `ld-ring ${2.6 + i * .65}s ease-out ${i * .85}s infinite`,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   CENTER ICON
═══════════════════════════════════════════════════════ */
function CenterIcon({ step, cur, reduced }) {
  const Icon = cur.icon
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ scale:.35, opacity:0, rotate:-90, filter:'blur(10px)' }}
          animate={{ scale:1,   opacity:1, rotate:0,   filter:'blur(0px)'  }}
          exit={{   scale:1.7,  opacity:0, rotate:90,  filter:'blur(8px)'  }}
          transition={{ type:'spring', stiffness:260, damping:20 }}
          className="relative"
        >
          {/* Outer glow */}
          <div
            className="absolute rounded-full"
            style={{
              inset:      -22,
              background: cur.color + '28',
              filter:     'blur(18px)',
            }}
            aria-hidden="true"
          />

          {/* Card */}
          <div
            className="relative flex items-center justify-center
                       rounded-2xl shadow-2xl overflow-hidden
                       w-20 h-20 sm:w-24 sm:h-24"
            style={{
              background: `linear-gradient(135deg,${cur.color}20,${cur.color}08)`,
              border:     `1px solid ${cur.color}40`,
              boxShadow:  `0 0 44px ${cur.color}22,
                           inset 0 1px 0 ${cur.color}28`,
            }}
          >
            {/* Shine */}
            {!reduced && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    `linear-gradient(135deg,${cur.color}16 0%,transparent 55%)`,
                }}
                aria-hidden="true"
              />
            )}

            {/* Holo border */}
            <div
              className="ld-holo absolute inset-0 rounded-2xl pointer-events-none"
              style={{ border: `1px solid ${cur.color}45` }}
              aria-hidden="true"
            />

            {/* Icon */}
            <motion.div
              animate={reduced ? {} : {
                filter: [
                  `drop-shadow(0 0 5px ${cur.color}70)`,
                  `drop-shadow(0 0 18px ${cur.color}bb)`,
                  `drop-shadow(0 0 5px ${cur.color}70)`,
                ],
              }}
              transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }}
            >
              <Icon
                size={typeof window !== 'undefined' && window.innerWidth < 640
                  ? 28 : 36}
                style={{ color: cur.color }}
              />
            </motion.div>

            {/* Corner dots */}
            {['top-1.5 left-1.5','top-1.5 right-1.5',
              'bottom-1.5 left-1.5','bottom-1.5 right-1.5'].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-1 h-1 rounded-full`}
                style={{
                  background: cur.color,
                  opacity:    .55,
                  animation:  reduced
                    ? 'none'
                    : `ld-twinkle 1.9s ${i * .48}s ease-in-out infinite`,
                }}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Step badge */}
          <div
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full
                       flex items-center justify-center
                       text-[9px] font-black text-white"
            style={{
              background: cur.color,
              boxShadow:  `0 0 10px ${cur.color}`,
            }}
            aria-hidden="true"
          >
            {step + 1}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   PROGRESS BAR — fluid, responsive
═══════════════════════════════════════════════════════ */
function ProgressBar({ pct, step, cur, reduced }) {
  return (
    <div className="w-[88vw] max-w-sm sm:max-w-md mb-5 px-1">

      {/* Label row */}
      <div className="flex justify-between items-center mb-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity:0, x:-10 }}
            animate={{ opacity:1, x:0   }}
            exit={{   opacity:0, x:10   }}
            transition={{ duration:.28, ease:EASE_EXPO }}
            className="flex items-center gap-1.5 min-w-0"
          >
            <span
              className="w-1.5 h-1.5 flex-shrink-0 rounded-full"
              style={{
                background: cur.color,
                boxShadow:  `0 0 6px ${cur.color}`,
                animation:  reduced
                  ? 'none'
                  : 'ld-twinkle 1.2s ease-in-out infinite',
              }}
              aria-hidden="true"
            />
            <span
              className="text-[10px] sm:text-[11px] font-bold
                         uppercase tracking-[.14em] truncate"
              style={{ color: cur.color }}
            >
              {cur.label}
            </span>
          </motion.div>
        </AnimatePresence>

        <span className="text-gray-500 text-[10px] sm:text-xs
                         font-mono tabular-nums flex-shrink-0 ml-2">
          {Math.round(pct)}
          <span className="text-gray-700">%</span>
        </span>
      </div>

      {/* Track */}
      <div
        className="relative h-[3px] rounded-full overflow-hidden"
        style={{ background:'rgba(255,255,255,0.055)' }}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading progress"
      >
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
          style={{
            width:      `${pct}%`,
            background: `linear-gradient(90deg,#3b82f6,${cur.color})`,
            transition: 'width .1s linear',
            boxShadow:  `0 0 12px ${cur.color}70`,
          }}
        >
          {/* Shimmer */}
          {!reduced && (
            <div
              className="ld-shimmer absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)',
                width: '35%',
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Glow head */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ld-gpu"
          style={{
            left:       `calc(${pct}% - 4px)`,
            background: cur.color,
            boxShadow:  `0 0 10px ${cur.color}, 0 0 22px ${cur.color}55`,
            transition: 'left .1s linear',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Step dots */}
      <div className="flex justify-between mt-3.5 px-0.5">
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-1"
            animate={
              i <= step
                ? { scale: i === step ? 1.2 : 1, opacity:1   }
                : { scale: .7,                    opacity:.2  }
            }
            transition={{ type:'spring', stiffness:340 }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: i <= step ? s.color : 'rgba(255,255,255,.08)',
                boxShadow:  i === step ? `0 0 9px ${s.color}` : 'none',
                transition: 'background .3s, box-shadow .3s',
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   LOADING DOTS — indicator under pills
═══════════════════════════════════════════════════════ */
function LoadingDots({ color, reduced }) {
  if (reduced) return null
  return (
    <div className="flex items-center gap-1.5 mt-4" aria-hidden="true">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: color,
            animation:  `ld-dot-bounce 1.2s ${i * .2}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   TECH PILLS — responsive wrap
═══════════════════════════════════════════════════════ */
function TechPills({ reduced }) {
  return (
    <motion.div
      initial={{ opacity:0, y:12 }}
      animate={{ opacity:1, y:0  }}
      transition={{ delay:.65, duration:.6, ease:EASE_EXPO }}
      className="flex flex-wrap justify-center gap-1.5 sm:gap-2
                 max-w-[88vw] sm:max-w-xs"
    >
      {TECH_PILLS.map((t, i) => (
        <motion.span
          key={t.label}
          initial={{ opacity:0, scale:.7, y:8  }}
          animate={{ opacity:1, scale:1,  y:0  }}
          transition={{ delay:.8 + i * .06, ease:EASE_BACK }}
          className="relative px-2.5 py-1 rounded-full
                     text-[9px] sm:text-[10px] font-bold
                     cursor-default select-none overflow-hidden
                     ld-touch"
          style={{
            background: `linear-gradient(135deg,${t.color}10,${t.color}05)`,
            border:     `1px solid ${t.color}25`,
            color:      t.color,
            boxShadow:  `0 2px 8px ${t.color}0e`,
          }}
        >
          {/* Shimmer */}
          {!reduced && (
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  `linear-gradient(90deg,transparent,${t.color}16,transparent)`,
                animation:
                  `ld-shimmer ${1.6 + i * .32}s ${i * .18}s ease-in-out infinite`,
              }}
              aria-hidden="true"
            />
          )}
          <span className="relative z-10">{t.label}</span>
        </motion.span>
      ))}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   BRAND HEADER — fluid typography
═══════════════════════════════════════════════════════ */
function BrandHeader({ reduced }) {
  return (
    <motion.div
      initial={{ opacity:0, y:22 }}
      animate={{ opacity:1, y:0  }}
      transition={{ delay:.22, duration:.65, ease:EASE_EXPO }}
      className="text-center mb-5 sm:mb-7 px-4"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity:0, scale:.8 }}
        animate={{ opacity:1, scale:1  }}
        transition={{ delay:.12, duration:.48, ease:EASE_BACK }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4
                   border border-indigo-500/[.16] bg-indigo-500/[.055]
                   text-indigo-300/80
                   text-[8px] sm:text-[9px] font-black uppercase
                   tracking-[.26em]"
        style={{
          backdropFilter: 'blur(14px)',
          boxShadow:      '0 0 22px rgba(99,102,241,.07)',
        }}
      >
        <Terminal size={8} aria-hidden="true" />
        Portfolio · 2026
        <Globe size={8} aria-hidden="true" />
      </motion.div>

      {/* Name — fluid clamp */}
      <h1
        className="font-black tracking-tight mb-1.5 text-transparent bg-clip-text"
        style={{
          fontSize:        'clamp(1.9rem, 7vw, 3.4rem)',
          backgroundImage: 'linear-gradient(90deg,'
            + '#60a5fa 0%,#818cf8 28%,#a78bfa 50%,#22d3ee 100%)',
          backgroundSize:  '200% 200%',
          animation:       reduced ? 'none' : 'ld-grad 4.5s ease infinite',
          lineHeight:      1.1,
        }}
      >
        Badie Gmati
      </h1>

      {/* Subtitle */}
      <p
        className="text-gray-500 tracking-wide"
        style={{ fontSize:'clamp(.72rem, 2.2vw, .875rem)' }}
      >
        Full-Stack Developer
        <span
          className="mx-2 text-indigo-500/55"
          style={{ fontFamily:'monospace' }}
          aria-hidden="true"
        >
          ·
        </span>
        Embedded AI Developer
      </p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX:0, opacity:0 }}
        animate={{ scaleX:1, opacity:1 }}
        transition={{ delay:.52, duration:.9, ease:EASE_EXPO }}
        className="mx-auto mt-3 h-px max-w-[160px] rounded-full"
        style={{
          originX:    .5,
          background: 'linear-gradient(90deg,transparent,'
            + 'rgba(99,102,241,.5),transparent)',
        }}
        aria-hidden="true"
      />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   ORBIT SYSTEM — responsive size
═══════════════════════════════════════════════════════ */
function OrbitSystem({ cur, step, reduced }) {
  const size = useMemo(() => {
    if (typeof window === 'undefined') return 260
    const w = window.innerWidth
    if (w < 380) return 200
    if (w < 640) return 230
    return 268
  }, [])

  const r1 = Math.round(size * .455)
  const r2 = Math.round(size * .357)
  const r3 = Math.round(size * .26)

  return (
    <div className="relative mb-6 sm:mb-9 flex-shrink-0">
      <div
        className="ld-float relative"
        style={{ width:size, height:size }}
        aria-hidden="true"
      >
        {/* Static outer ring */}
        <div
          className="absolute rounded-full border border-white/[.035]"
          style={{ inset:-6, boxShadow:'0 0 36px rgba(99,102,241,.035)' }}
        />

        <OrbitRing
          radius={r1} duration={18} dotCount={7}
          color="#3b82f6" clockwise={true}  reduced={reduced}
        />
        <OrbitRing
          radius={r2} duration={11} dotCount={5}
          color="#8b5cf6" clockwise={false} reduced={reduced}
        />
        <OrbitRing
          radius={r3} duration={7}  dotCount={4}
          color="#06b6d4" clockwise={true}  reduced={reduced}
        />

        {/* Conic gradients */}
        {!reduced && (
          <>
            <div
              className="absolute rounded-full ld-gpu"
              style={{
                background: 'conic-gradient(from 0deg,'
                  + '#3b82f6,#8b5cf6,#06b6d4,#6366f1,transparent)',
                opacity:    .18,
                filter:     'blur(7px)',
                animation:  'ld-conic 3.5s linear infinite',
                top:'50%', left:'50%',
                width:  `calc(100% - ${size*.18}px)`,
                height: `calc(100% - ${size*.18}px)`,
              }}
            />
            <div
              className="absolute rounded-full ld-gpu"
              style={{
                background: 'conic-gradient(from 180deg,'
                  + '#6366f1,#a855f7,transparent,#06b6d4)',
                opacity:    .11,
                filter:     'blur(5px)',
                animation:  'ld-ccw 5.5s linear infinite',
                top:'50%', left:'50%',
                width:  `calc(100% - ${size*.27}px)`,
                height: `calc(100% - ${size*.27}px)`,
              }}
            />
          </>
        )}

        {/* Dashed ring */}
        <div
          className="absolute rounded-full border border-dashed
                     border-indigo-500/[.16] ld-gpu"
          style={{
            animation: reduced ? 'none' : 'ld-ccw 9s linear infinite',
            top:'50%', left:'50%',
            width:  `calc(100% - ${size*.12}px)`,
            height: `calc(100% - ${size*.12}px)`,
          }}
          aria-hidden="true"
        />

        <PulseRings color={cur.color} reduced={reduced} />
        <CenterIcon step={step} cur={cur} reduced={reduced} />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   LOADING MAIN
═══════════════════════════════════════════════════════ */
export default function Loading({ onDone }) {
  const reduced           = useReducedMotion()
  const [step,  setStep]  = useState(0)
  const [pct,   setPct]   = useState(0)
  const [done,  setDone]  = useState(false)

  /* Stabilise onDone */
  const onDoneRef  = useRef(onDone)
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  /* StrictMode-safe flag */
  const reachedRef = useRef(false)

  useEffect(() => {
    reachedRef.current = false
    const target = STEPS[step]?.pct ?? 100

    const id = setInterval(() => {
      setPct(cur => {
        const next = Math.min(cur + Math.random() * 2.8 + .8, target)
        if (next >= target && !reachedRef.current) {
          reachedRef.current = true
          clearInterval(id)
          if (step < STEPS.length - 1) {
            setTimeout(() => setStep(s => s + 1), 380)
          } else {
            setTimeout(() => {
              setDone(true)
              setTimeout(() => onDoneRef.current?.(), 680)
            }, 620)
          }
        }
        return next
      })
    }, 36)

    return () => clearInterval(id)
  }, [step])

  const cur = STEPS[step] ?? STEPS[STEPS.length - 1]

  return (
    <>
      <StyleInject />
      <AnimatePresence>
        {!done && (
          <motion.div
            key="loader"
            role="status"
            aria-label="Loading portfolio, please wait…"
            aria-live="polite"
            initial={{ opacity:1 }}
            exit={{
              opacity: 0,
              scale:   1.05,
              filter:  'blur(14px)',
            }}
            transition={{ duration:.62, ease:EASE_EXPO }}
            className="ld-root ld-touch fixed inset-0 z-[200]
                       flex flex-col items-center justify-center"
            style={{
              background:
                'linear-gradient(180deg,#020817 0%,#030d20 50%,#020810 100%)',
            }}
          >
            {/* Layers */}
            <ParticleCanvas reduced={reduced} />
            <CodeRain       reduced={reduced} />

            {/* Dot grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'radial-gradient(circle,rgba(148,163,184,.036) 1px,transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  'radial-gradient(ellipse 80% 65% at 50% 50%,'
                  + 'transparent 35%,rgba(2,8,23,.75) 100%)',
              }}
            />

            {/* Scanlines */}
            {!reduced && (
              <>
                {[
                  { h:'2px', bg:'rgba(99,102,241,.055)', dur:'4s',   delay:'0s'  },
                  { h:'1px', bg:'rgba(6,182,212,.038)',  dur:'6.5s', delay:'2.2s'},
                ].map((s, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 pointer-events-none ld-gpu"
                    aria-hidden="true"
                    style={{
                      height:     s.h,
                      background: s.bg,
                      animation:  `ld-scan ${s.dur} ${s.delay} linear infinite`,
                    }}
                  />
                ))}
              </>
            )}

            {/* Orbs */}
            <div
              className="ld-orb-a absolute -top-28 -left-28 rounded-full
                         pointer-events-none ld-gpu"
              aria-hidden="true"
              style={{
                width:380, height:380,
                background:'radial-gradient(circle,#1e40af,#6d28d9)',
                filter:'blur(90px)',
                opacity:.075,
              }}
            />
            <div
              className="ld-orb-b absolute -bottom-28 -right-28 rounded-full
                         pointer-events-none ld-gpu"
              aria-hidden="true"
              style={{
                width:320, height:320,
                background:'radial-gradient(circle,#7c3aed,#0891b2)',
                filter:'blur(90px)',
                opacity:.065,
              }}
            />

            {/* ── CONTENT ── */}
            <OrbitSystem cur={cur} step={step} reduced={reduced} />
            <BrandHeader reduced={reduced} />
            <ProgressBar pct={pct} step={step} cur={cur} reduced={reduced} />
            <TechPills   reduced={reduced} />
            <LoadingDots color={cur.color} reduced={reduced} />

            {/* Watermark */}
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:1.1, duration:.9 }}
              className="absolute bottom-4 sm:bottom-6 left-0 right-0
                         flex items-center justify-center gap-2
                         text-[8px] sm:text-[9px] text-gray-700
                         font-mono uppercase tracking-[.2em]
                         pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-4 h-px" style={{
                background:
                  'linear-gradient(to right,transparent,rgba(99,102,241,.38))',
              }} />
              React · Next.js · Python · Framer Motion
              <div className="w-4 h-px" style={{
                background:
                  'linear-gradient(to left,transparent,rgba(99,102,241,.38))',
              }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}