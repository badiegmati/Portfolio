// GlobalBackground.jsx — Ultra Professional Holographic Network
// Palette: #3b82f6 · #8b5cf6 · #06b6d4 · #6366f1
// GPU: transform + opacity only · Zero lag

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/* ═══════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════ */
const CFG = {
  nodes:      55,
  stars:      90,
  maxDist:    185,
  speed:      0.14,
  focal:      900,
  zRange:     340,
  rotSpeedY:  0.00018,
  rotSpeedX:  0.00010,
  mouseFactor: 0.032,
  pulseSpeed:  0.0005,
  trailAlpha:  0.14,
  cellSize:    110,
  dprCap:      2,
}

/* ═══════════════════════════════════════════════
   PALETTE — identique Skills / Header / Hero
═══════════════════════════════════════════════ */
const PALETTE = [
  { h: 217, s: 91, l: 60 },  // blue-500   #3b82f6
  { h: 258, s: 90, l: 66 },  // violet-500 #8b5cf6
  { h: 189, s: 94, l: 43 },  // cyan-500   #06b6d4
  { h: 239, s: 84, l: 67 },  // indigo-400 #6366f1
  { h: 271, s: 81, l: 56 },  // purple-500 #a855f7
  { h: 199, s: 89, l: 48 },  // cyan-600   #0891b2
]

/* ═══════════════════════════════════════════════
   MATH HELPERS
═══════════════════════════════════════════════ */
function project(x, y, z, W, H, rotX, rotY) {
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
  const x1 = x * cosY - z * sinY
  const z1 = x * sinY + z * cosY
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
  const y1 = y * cosX - z1 * sinX
  const z2 = y * sinX + z1 * cosX
  const scale = CFG.focal / (CFG.focal + z2 + CFG.zRange * 0.5)
  return {
    px: W * 0.5 + x1 * scale,
    py: H * 0.5 + y1 * scale,
    scale,
    depth: z2,
  }
}

function buildGrid(nodes, cs) {
  const g = {}
  nodes.forEach((n, i) => {
    const k = `${Math.floor(n.px / cs)},${Math.floor(n.py / cs)}`
    ;(g[k] || (g[k] = [])).push(i)
  })
  return g
}

function getNeighbors(g, cx, cy) {
  const out = []
  for (let dx = -1; dx <= 1; dx++)
    for (let dy = -1; dy <= 1; dy++) {
      const k = `${cx + dx},${cy + dy}`
      if (g[k]) out.push(...g[k])
    }
  return out
}

function rand(min, max) { return min + Math.random() * (max - min) }
function randCol() { return PALETTE[Math.floor(Math.random() * PALETTE.length)] }

/* ═══════════════════════════════════════════════
   FACTORIES
═══════════════════════════════════════════════ */
function makeNode(W, H) {
  const c = randCol()
  return {
    x:  rand(-W * 0.65, W * 0.65),
    y:  rand(-H * 0.65, H * 0.65),
    z:  rand(-CFG.zRange, CFG.zRange),
    vx: rand(-CFG.speed, CFG.speed),
    vy: rand(-CFG.speed, CFG.speed),
    vz: rand(-CFG.speed * 0.35, CFG.speed * 0.35),
    r:  rand(0.7, 2.1),
    h: c.h, s: c.s, l: c.l,
    bright: rand(0.62, 1),
    phase: rand(0, Math.PI * 2),
    phaseSpeed: rand(0.009, 0.018),
    px: 0, py: 0, scale: 1, depth: 0,
  }
}

function makeStar(W, H) {
  return {
    x: rand(0, W),
    y: rand(0, H),
    r: rand(0.18, 1.1),
    a: rand(0.04, 0.22),
    tw: rand(0, Math.PI * 2),
    twS: rand(0.006, 0.016),
  }
}

/* ═══════════════════════════════════════════════
   DRAW UTILITIES
═══════════════════════════════════════════════ */
function drawNode(ctx, n, hShift) {
  const p  = 0.5 + 0.5 * Math.sin(n.phase)
  const h  = (n.h + hShift + 360) % 360
  const bR = n.r * n.scale * 5.5
  const gR = bR * (2.6 + p * 2.0)

  // outer glow
  const g1 = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, gR * 2.0)
  g1.addColorStop(0, `hsla(${h},${n.s}%,${n.l}%,${0.035 * n.scale * p})`)
  g1.addColorStop(1, 'hsla(0,0%,0%,0)')
  ctx.fillStyle = g1
  ctx.beginPath(); ctx.arc(n.px, n.py, gR * 2.0, 0, Math.PI * 2); ctx.fill()

  // mid glow
  const g2 = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, gR)
  g2.addColorStop(0,   `hsla(${h},${n.s + 8}%,${n.l + 8}%,${0.13 * p * n.scale})`)
  g2.addColorStop(0.5, `hsla(${(h + 20) % 360},${n.s}%,${n.l}%,${0.065 * n.scale})`)
  g2.addColorStop(1,   'hsla(0,0%,0%,0)')
  ctx.fillStyle = g2
  ctx.beginPath(); ctx.arc(n.px, n.py, gR, 0, Math.PI * 2); ctx.fill()

  // core
  const g3 = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, bR)
  g3.addColorStop(0,    `hsla(${h},100%,92%,${0.9 * p * n.bright})`)
  g3.addColorStop(0.28, `hsla(${h},${n.s + 5}%,78%,${0.62 * n.scale})`)
  g3.addColorStop(0.65, `hsla(${h},${n.s}%,${n.l}%,${0.26 * n.scale})`)
  g3.addColorStop(1,    'hsla(0,0%,0%,0)')
  ctx.fillStyle = g3
  ctx.beginPath(); ctx.arc(n.px, n.py, bR, 0, Math.PI * 2); ctx.fill()

  // specular
  const sx = n.px - bR * 0.2, sy = n.py - bR * 0.2
  const g4 = ctx.createRadialGradient(sx, sy, 0, n.px, n.py, bR * 0.48)
  g4.addColorStop(0, `hsla(${(h + 30) % 360},100%,96%,${0.82 * p * n.scale})`)
  g4.addColorStop(1, 'hsla(0,0%,0%,0)')
  ctx.fillStyle = g4
  ctx.beginPath(); ctx.arc(n.px, n.py, bR * 0.48, 0, Math.PI * 2); ctx.fill()

  // depth ring
  if (n.scale > 0.8) {
    const rA = (n.scale - 0.8) * 0.52 * p
    ctx.strokeStyle = `hsla(${h},${n.s + 10}%,${n.l + 18}%,${rA})`
    ctx.lineWidth = 0.55 * n.scale
    ctx.beginPath(); ctx.arc(n.px, n.py, bR * 1.6, 0, Math.PI * 2); ctx.stroke()
  }
}

function drawConnection(ctx, a, b, hShift) {
  const d3 = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
  if (d3 > CFG.maxDist) return
  const t  = 1 - d3 / CFG.maxDist
  const df = Math.min(1, (a.scale + b.scale) * 0.88)
  const alpha = t * t * 0.26 * df
  if (alpha < 0.01) return

  const lw = Math.max(0.25, t * (a.scale + b.scale) * 0.82)
  const hA = (a.h + hShift + 360) % 360
  const hB = (b.h + hShift + 360) % 360
  const hM = (hA + hB) / 2
  const sat = 78 + t * 14
  const lum = 56 + df * 16

  const gr = ctx.createLinearGradient(a.px, a.py, b.px, b.py)
  gr.addColorStop(0,   `hsla(${hA},${sat}%,${lum}%,${alpha * a.scale * 1.1})`)
  gr.addColorStop(0.4, `hsla(${(hM + 14) % 360},${sat + 6}%,${lum + 10}%,${alpha})`)
  gr.addColorStop(0.6, `hsla(${(hM + 14) % 360},${sat + 6}%,${lum + 10}%,${alpha})`)
  gr.addColorStop(1,   `hsla(${hB},${sat}%,${lum}%,${alpha * b.scale * 1.1})`)

  ctx.strokeStyle = gr
  ctx.lineWidth   = lw
  ctx.lineCap     = 'round'
  ctx.shadowBlur  = 0
  ctx.beginPath()
  ctx.moveTo(a.px, a.py)
  ctx.lineTo(b.px, b.py)
  ctx.stroke()
}

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
export default function GlobalBackground() {
  const reduced   = useReducedMotion()
  const canvasRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })

    /* ── Shared state ── */
    const S = {
      nodes: [], stars: [],
      W: 0, H: 0,
      rotX: 0.12, rotY: 0,
      mX: 0, mY: 0, tmX: 0, tmY: 0,
      time: 0, raf: null, dpr: 1,
      resizeTimer: null,
    }

    /* ── Init ── */
    const init = (W, H) => {
      S.W = W; S.H = H
      S.nodes = Array.from({ length: CFG.nodes }, () => makeNode(W, H))
      S.stars = Array.from({ length: CFG.stars  }, () => makeStar(W, H))
    }

    /* ── Resize ── */
    const resize = () => {
      clearTimeout(S.resizeTimer)
      S.resizeTimer = setTimeout(() => {
        const dpr = Math.min(window.devicePixelRatio || 1, CFG.dprCap)
        const W   = window.innerWidth
        const H   = window.innerHeight
        S.dpr = dpr
        canvas.width        = W * dpr
        canvas.height       = H * dpr
        canvas.style.width  = `${W}px`
        canvas.style.height = `${H}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        init(W, H)
      }, 180)
    }

    /* ── Mouse ── */
    const onMouse = e => {
      S.tmX = (e.clientX / S.W - 0.5) * 2
      S.tmY = (e.clientY / S.H - 0.5) * 2
    }

    /* ── Draw loop ── */
    const draw = () => {
      if (document.hidden) { S.raf = requestAnimationFrame(draw); return }
      const { W, H } = S
      if (!W) { S.raf = requestAnimationFrame(draw); return }

      S.time++
      S.mX += (S.tmX - S.mX) * 0.042
      S.mY += (S.tmY - S.mY) * 0.042
      S.rotY += CFG.rotSpeedY + S.mX * CFG.mouseFactor * 0.008
      S.rotX  = 0.12 + S.mY * CFG.mouseFactor * 0.005

      /* Trail */
      ctx.fillStyle = `rgba(2,8,23,${CFG.trailAlpha})`
      ctx.fillRect(0, 0, W, H)

      const hShift = Math.sin(S.time * CFG.pulseSpeed * Math.PI * 2) * 20

      /* Stars */
      S.stars.forEach(st => {
        st.tw += st.twS
        const a = st.a * (0.55 + 0.45 * Math.sin(st.tw))
        ctx.fillStyle = `rgba(148,163,184,${a})`
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); ctx.fill()
      })

      /* Project nodes */
      S.nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.z += n.vz
        const bx = W * 0.66, by = H * 0.66
        if (n.x < -bx) n.x = bx; if (n.x > bx) n.x = -bx
        if (n.y < -by) n.y = by; if (n.y > by) n.y = -by
        if (n.z < -CFG.zRange) n.z = CFG.zRange
        if (n.z >  CFG.zRange) n.z = -CFG.zRange
        const p = project(n.x, n.y, n.z, W, H, S.rotX, S.rotY)
        n.px = p.px; n.py = p.py; n.scale = p.scale; n.depth = p.depth
        n.phase += n.phaseSpeed
      })

      /* Sort back→front */
      const sorted = [...S.nodes].sort((a, b) => b.depth - a.depth)

      /* Connections */
      const grid = buildGrid(sorted, CFG.cellSize)
      sorted.forEach((a, i) => {
        const cx = Math.floor(a.px / CFG.cellSize)
        const cy = Math.floor(a.py / CFG.cellSize)
        getNeighbors(grid, cx, cy).forEach(j => {
          if (j > i) drawConnection(ctx, a, sorted[j], hShift)
        })
      })

      /* Nodes */
      sorted.forEach(n => drawNode(ctx, n, hShift))

      /* Vignette */
      const vg = ctx.createRadialGradient(W*.5,H*.5,H*.12,W*.5,H*.5,H*.92)
      vg.addColorStop(0,   'rgba(2,8,23,0)')
      vg.addColorStop(0.68,'rgba(2,8,23,0.06)')
      vg.addColorStop(1,   'rgba(2,8,23,0.48)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, W, H)

      /* Scanline subtil */
      const scanY = (S.time * 0.6) % (H * 2)
      const sg = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80)
      sg.addColorStop(0,   'rgba(99,102,241,0)')
      sg.addColorStop(0.5, 'rgba(99,102,241,0.022)')
      sg.addColorStop(1,   'rgba(99,102,241,0)')
      ctx.fillStyle = sg
      ctx.fillRect(0, scanY - 80, W, 160)

      S.raf = requestAnimationFrame(draw)
    }

    /* ── Visibility ── */
    const onVis = () => {
      if (!document.hidden && !S.raf) S.raf = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    resize()
    S.raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(S.raf)
      clearTimeout(S.resizeTimer)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100vw',
        height:        '100vh',
        zIndex:        0,
        pointerEvents: 'none',
        willChange:    'transform',
        mixBlendMode:  'screen',
      }}
    />
  )
}