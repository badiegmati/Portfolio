// Projects.jsx — Background cohérent Skills.jsx + GlobalBackground · Zero Lag
// Palette: #3b82f6 · #8b5cf6 · #06b6d4 · #6366f1

import React, { useState, useRef, useEffect, useMemo } from 'react'
import {
  Github, Database, Globe,
  GamepadIcon, Cpu, Download, Sparkles,
  Zap, Terminal, Eye,
  Camera, Activity, Shield, ChevronRight, X,
  Car, Server, Smartphone, MapPin, Users, Gauge,
  Star, ArrowUpRight,
  Play, Trophy,
  Box, Hand, ScanEye, Wand2,
  RotateCcw, Layers, Brain, Orbit,
  MousePointer2, Fingerprint, Move3d,
} from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import image1 from './assets/image1.png'
import image3 from './assets/image4.png'

/* ═══════════════════════════════════════════════════════════
   CSS INJECTION
═══════════════════════════════════════════════════════════ */
const STYLES = `
  @keyframes pj-grad {
    0%,100% { background-position: 0% 50% }
    50%      { background-position: 100% 50% }
  }
  @keyframes pj-orb-drift-a {
    0%,100% { transform: translate(0,0) scale(1) }
    33%     { transform: translate(28px,-18px) scale(1.06) }
    66%     { transform: translate(-14px,22px) scale(0.97) }
  }
  @keyframes pj-orb-drift-b {
    0%,100% { transform: translate(0,0) scale(1) }
    40%     { transform: translate(-22px,16px) scale(1.05) }
    75%     { transform: translate(18px,-12px) scale(0.96) }
  }
  @keyframes pj-spin-cw  { to { transform: rotate(360deg)  } }
  @keyframes pj-spin-ccw { to { transform: rotate(-360deg) } }
  @keyframes pj-spin-slow{ to { transform: rotate(360deg)  } }
  @keyframes pj-float {
    0%,100% { transform: translateY(0) }
    50%     { transform: translateY(-5px) }
  }
  @keyframes pj-cube-spin {
    from { transform: rotateX(-20deg) rotateY(0deg)   }
    to   { transform: rotateX(-20deg) rotateY(360deg) }
  }
  @keyframes pj-cube-bob {
    0%,100% { transform: translateY(0) }
    50%     { transform: translateY(-6px) }
  }
  @keyframes pj-scan-line {
    0%   { transform: translateY(-100%); opacity: 0 }
    12%  { opacity: .9 }
    88%  { opacity: .9 }
    100% { transform: translateY(100%); opacity: 0 }
  }

  /* ── Cube 3D hero (RubiksModal) ── */
  .pj-cube-scene { perspective: 900px }
  .pj-cube-rig   { animation: pj-cube-bob 4s ease-in-out infinite }
  .pj-cube {
    position: relative;
    width: 88px; height: 88px;
    transform-style: preserve-3d;
    animation: pj-cube-spin 10s linear infinite;
  }
  .pj-cube-face {
    position: absolute; inset: 0;
    border-radius: 8px;
    box-shadow: inset 0 0 0 7px rgba(10,10,20,0.55),
                inset 0 0 0 8px rgba(255,255,255,0.08);
  }
  .pj-cube-face--f { background:#e63946; transform: translateZ(44px) }
  .pj-cube-face--b { background:#f4a300; transform: rotateY(180deg) translateZ(44px) }
  .pj-cube-face--r { background:#2563eb; transform: rotateY(90deg)  translateZ(44px) }
  .pj-cube-face--l { background:#16a34a; transform: rotateY(-90deg) translateZ(44px) }
  .pj-cube-face--u { background:#f8fafc; transform: rotateX(90deg)  translateZ(44px) }
  .pj-cube-face--d { background:#facc15; transform: rotateX(-90deg) translateZ(44px) }
  .pj-scan-line     { animation: pj-scan-line 2.6s ease-in-out infinite }

  /* ── Rubik's hero cube (card) ── */
  .rk-scene { perspective: 700px }
  .rk-cube-rig { animation: pj-cube-bob 3.5s ease-in-out infinite }
  .rk-cube {
    position: relative;
    width: 64px; height: 64px;
    transform-style: preserve-3d;
    animation: pj-cube-spin 8s linear infinite;
  }
  .rk-face {
    position: absolute; inset: 0;
    border-radius: 6px;
    box-shadow: inset 0 0 0 5px rgba(10,10,20,0.6),
                inset 0 0 0 6px rgba(255,255,255,0.10);
  }
  .rk-face--f { background:#e63946; transform: translateZ(32px) }
  .rk-face--b { background:#f4a300; transform: rotateY(180deg) translateZ(32px) }
  .rk-face--r { background:#2563eb; transform: rotateY(90deg)  translateZ(32px) }
  .rk-face--l { background:#16a34a; transform: rotateY(-90deg) translateZ(32px) }
  .rk-face--u { background:#f8fafc; transform: rotateX(90deg)  translateZ(32px) }
  .rk-face--d { background:#facc15; transform: rotateX(-90deg) translateZ(32px) }

  /* ── Modal large cube ── */
  .rk-modal-scene { perspective: 1100px }
  .rk-modal-rig   { animation: pj-cube-bob 4.2s ease-in-out infinite }
  .rk-modal-cube {
    position: relative;
    width: 110px; height: 110px;
    transform-style: preserve-3d;
    animation: pj-cube-spin 9s linear infinite;
  }
  .rk-modal-face {
    position: absolute; inset: 0;
    border-radius: 10px;
    box-shadow: inset 0 0 0 8px rgba(10,10,20,0.55),
                inset 0 0 0 9px rgba(255,255,255,0.09);
  }
  .rk-modal-face--f { background:linear-gradient(135deg,#e63946,#c1121f); transform: translateZ(55px) }
  .rk-modal-face--b { background:linear-gradient(135deg,#f4a300,#e07c00); transform: rotateY(180deg) translateZ(55px) }
  .rk-modal-face--r { background:linear-gradient(135deg,#2563eb,#1d4ed8); transform: rotateY(90deg)  translateZ(55px) }
  .rk-modal-face--l { background:linear-gradient(135deg,#16a34a,#15803d); transform: rotateY(-90deg) translateZ(55px) }
  .rk-modal-face--u { background:linear-gradient(135deg,#f8fafc,#e2e8f0); transform: rotateX(90deg)  translateZ(55px) }
  .rk-modal-face--d { background:linear-gradient(135deg,#facc15,#eab308); transform: rotateX(-90deg) translateZ(55px) }

  /* ── Gradient animated text ── */
  .pj-gt {
    background-size: 300% 100%;
    animation: pj-grad 6s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Orbs ── */
  .pj-orb-a { animation: pj-orb-drift-a 12s ease-in-out infinite }
  .pj-orb-b { animation: pj-orb-drift-b 15s ease-in-out infinite }

  /* ── Spin ── */
  .pj-spin      { animation: pj-spin-cw   18s linear infinite }
  .pj-spin-r    { animation: pj-spin-ccw  18s linear infinite }
  .pj-spin-slow { animation: pj-spin-slow 14s linear infinite }
  .pj-float     { animation: pj-float 4s ease-in-out infinite }

  /* ── Shimmer bar ── */
  .pj-shimmer-bar {
    transition: width .44s cubic-bezier(.16,1,.3,1), opacity .3s ease;
  }

  /* ── Rubik's card neon glow ── */
  @keyframes rk-neon-pulse {
    0%,100% { box-shadow: 0 0 18px rgba(99,102,241,0.18), 0 0 36px rgba(139,92,246,0.10) }
    50%     { box-shadow: 0 0 32px rgba(99,102,241,0.32), 0 0 64px rgba(139,92,246,0.18) }
  }
  .rk-neon { animation: rk-neon-pulse 3s ease-in-out infinite }

  /* ── Particle float ── */
  @keyframes rk-particle-a {
    0%,100% { transform: translate(0,0) scale(1); opacity:.7 }
    33%     { transform: translate(12px,-18px) scale(1.2); opacity:1 }
    66%     { transform: translate(-10px,10px) scale(0.85); opacity:.5 }
  }
  @keyframes rk-particle-b {
    0%,100% { transform: translate(0,0) scale(1); opacity:.5 }
    40%     { transform: translate(-14px,12px) scale(1.15); opacity:.9 }
    75%     { transform: translate(10px,-8px) scale(0.9); opacity:.6 }
  }
  @keyframes rk-particle-c {
    0%,100% { transform: translate(0,0) scale(1); opacity:.6 }
    50%     { transform: translate(16px,14px) scale(1.1); opacity:.85 }
  }
  .rk-p-a { animation: rk-particle-a 5s ease-in-out infinite }
  .rk-p-b { animation: rk-particle-b 6.5s ease-in-out infinite }
  .rk-p-c { animation: rk-particle-c 4s ease-in-out infinite }

  /* ── Scan line modal ── */
  @keyframes rk-scan {
    0%   { transform:translateY(-100%); opacity:0 }
    10%  { opacity:.6 }
    90%  { opacity:.6 }
    100% { transform:translateY(500%); opacity:0 }
  }
  .rk-scan { animation: rk-scan 3s ease-in-out infinite }

  /* ── Orbit ring ── */
  @keyframes rk-orbit {
    from { transform: rotateZ(0deg) }
    to   { transform: rotateZ(360deg) }
  }
  .rk-orbit-ring {
    animation: rk-orbit 6s linear infinite;
    transform-origin: center center;
  }
  .rk-orbit-ring-r {
    animation: rk-orbit 9s linear infinite reverse;
    transform-origin: center center;
  }

  @media (prefers-reduced-motion: reduce) {
    .pj-gt, .pj-orb-a, .pj-orb-b,
    .pj-spin, .pj-spin-r, .pj-spin-slow, .pj-float,
    .rk-cube, .rk-modal-cube, .pj-cube,
    .rk-neon, .rk-p-a, .rk-p-b, .rk-p-c,
    .rk-scan, .rk-orbit-ring, .rk-orbit-ring-r,
    .rk-cube-rig, .rk-modal-rig, .pj-cube-rig {
      animation: none !important;
    }
    .pj-gt { -webkit-text-fill-color: transparent; }
  }
`

function StyleInject() {
  useEffect(() => {
    const ID = 'pj-pro-v1'
    if (document.getElementById(ID)) return
    const el = document.createElement('style')
    el.id = ID
    el.textContent = STYLES
    document.head.appendChild(el)
    return () => document.getElementById(ID)?.remove()
  }, [])
  return null
}

/* ── Constants ── */
const EASE_EXPO = [0.16, 1, 0.3, 1]
const EASE_BACK = [0.34, 1.56, 0.64, 1]

const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE_EXPO } },
}

const stagger = (delay = 0.08, ch = 0.1) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: ch, delayChildren: delay } },
})

const modalBackdrop = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

const modalPanel = {
  hidden:  { scale: 0.93, opacity: 0, y: 28 },
  visible: { scale: 1, opacity: 1, y: 0,
    transition: { type: 'spring', damping: 26, stiffness: 300 } },
  exit:    { scale: 0.96, opacity: 0, y: 12,
    transition: { duration: 0.18 } },
}

/* ══════════════════════════════════════════════════════════
   RUBIK'S CUBE 3D COMPONENT (réutilisable)
══════════════════════════════════════════════════════════ */
function RubiksCube3D({ size = 'md' }) {
  const cfg = {
    sm:  { scene: 'rk-scene', rig: 'rk-cube-rig', cube: 'rk-cube', face: 'rk-face' },
    md:  { scene: 'rk-scene', rig: 'rk-cube-rig', cube: 'rk-cube', face: 'rk-face' },
    lg:  { scene: 'rk-modal-scene', rig: 'rk-modal-rig', cube: 'rk-modal-cube', face: 'rk-modal-face' },
  }[size] || { scene: 'rk-scene', rig: 'rk-cube-rig', cube: 'rk-cube', face: 'rk-face' }

  return (
    <div className={cfg.scene}>
      <div className={cfg.rig}>
        <div className={cfg.cube}>
          {['f','b','r','l','u','d'].map(f => (
            <div key={f} className={`${cfg.face} ${cfg.face}--${f}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── BottomStatCard ── */
function BottomStatCard({ s, i, reduced }) {
  const [hovered, setHovered] = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.88, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.09, duration: 0.6, ease: EASE_BACK }}
      whileHover={reduced ? {} : { y: -6, scale: 1.03 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-6 rounded-[22px] text-center border border-white/[0.06]
                 cursor-default overflow-hidden"
      style={{
        background: 'linear-gradient(145deg,rgba(13,20,42,0.95) 0%,rgba(8,10,20,0.98) 100%)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: i * 0.09 + 0.3, duration: 0.9, ease: EASE_EXPO }}
        style={{ originX: 0.5 }}
        className={`absolute top-0 left-6 right-6 h-px rounded-full bg-gradient-to-r ${s.g}`}
      />
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl
                   pointer-events-none transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg,${s.gr})`, opacity: hovered ? 0.14 : 0.04 }}
        aria-hidden="true"
      />
      <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${s.g}
                       bg-clip-text text-transparent mb-2 tabular-nums`}>
        {s.v}
      </div>
      <div className="text-gray-500 text-[11px] font-semibold uppercase tracking-[0.18em]">
        {s.l}
      </div>
      <div
        className="pj-shimmer-bar h-px mx-auto mt-3 rounded-full"
        style={{
          width: hovered ? '65%' : '28%',
          opacity: hovered ? 1 : 0.4,
          background: `linear-gradient(90deg,${s.gr})`,
        }}
      />
    </motion.div>
  )
}

/* ── StatusBadge ── */
function StatusBadge({ status, isPFE, isRubiks }) {
  const cfg = isRubiks
    ? { cls: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30', dot: 'bg-cyan-400' }
    : isPFE
    ? { cls: 'bg-violet-500/15 text-violet-300 border-violet-500/30', dot: 'bg-violet-400' }
    : status === 'Complet'
    ? { cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400' }
    : status === 'Actif'
    ? { cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30', dot: 'bg-blue-400' }
    : { cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30', dot: 'bg-amber-400' }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                      text-xs font-semibold border ${cfg.cls} whitespace-nowrap`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
      {status}
    </span>
  )
}

/* ── TechTag ── */
function TechTag({ tech, reduced }) {
  return (
    <motion.span
      whileHover={reduced ? {} : { scale: 1.07, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className="px-2.5 py-1 bg-white/[0.05] text-gray-300 rounded-lg text-xs
                 font-medium border border-white/[0.08] hover:border-white/20
                 hover:text-white transition-colors duration-200 cursor-default"
    >
      {tech}
    </motion.span>
  )
}

/* ══════════════════════════════════════════════════════════
   RUBIK'S MODAL
══════════════════════════════════════════════════════════ */
function RubiksModal({ open, onClose, reduced }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else      document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Couleurs du cube
  const cubeColors = [
    { face: 'F', color: '#e63946', label: 'Rouge', pos: 'Avant' },
    { face: 'B', color: '#f4a300', label: 'Orange', pos: 'Arrière' },
    { face: 'R', color: '#2563eb', label: 'Bleu', pos: 'Droite' },
    { face: 'L', color: '#16a34a', label: 'Vert', pos: 'Gauche' },
    { face: 'U', color: '#f8fafc', label: 'Blanc', pos: 'Haut' },
    { face: 'D', color: '#facc15', label: 'Jaune', pos: 'Bas' },
  ]

  const gestures = [
    { icon: Fingerprint, label: 'Pincement', desc: 'Pouce + index → attrape et tourne une face', color: '#06b6d4' },
    { icon: Move3d,      label: 'Poing',     desc: 'Fermer le poing + déplacer → orbite caméra', color: '#8b5cf6' },
    { icon: Hand,        label: 'Pouce levé',desc: 'Maintenu ~1s → mélange aléatoire du cube',  color: '#3b82f6' },
  ]

  const techLayers = [
    { icon: Camera,     label: 'Vision', color: '#06b6d4',
      items: ['MediaPipe Hands 21 pts', 'OpenCV frame pipeline', 'YOLOv8 compatible'] },
    { icon: Brain,      label: 'IA Gestes', color: '#8b5cf6',
      items: ['Pinch detection HST', 'Orbite poing fermé', 'Hist. stabilisation'] },
    { icon: Box,        label: 'Moteur Cube', color: '#3b82f6',
      items: ['Facelets WCA validées', '26 moves + rotations', 'Kociemba solver'] },
    { icon: ScanEye,    label: 'Rendu 3D', color: '#6366f1',
      items: ['Projection 3D OpenCV', 'Particules + effets', 'Éclairage dynamique'] },
  ]

  const stats = [
    { v: '21', l: 'Landmarks main', c: '#06b6d4' },
    { v: '54', l: 'Facelets WCA',   c: '#8b5cf6' },
    { v: '26', l: 'Moves validés',  c: '#3b82f6' },
    { v: '≤20', l: 'Moves solution', c: '#6366f1' },
  ]

  const steps = [
    '# Cloner le dépôt',
    'git clone https://github.com/badiegmati/-Rubik-Cube.git',
    '',
    '# Installer les dépendances',
    'pip install -r requirements.txt',
    '',
    '# Lancer l\'application',
    'python main.py',
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={modalBackdrop} initial="hidden" animate="visible" exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4
                     bg-black/92 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            variants={modalPanel}
            className="relative rounded-2xl max-w-5xl w-full max-h-[92vh]
                       overflow-y-auto border shadow-2xl"
            style={{
              background: 'linear-gradient(145deg,rgba(4,14,40,0.97) 0%,rgba(8,10,20,0.99) 60%,rgba(2,6,18,1) 100%)',
              backdropFilter: 'blur(32px)',
              borderColor: 'rgba(99,102,241,0.28)',
              boxShadow: '0 40px 120px rgba(99,102,241,0.18), 0 0 0 1px rgba(99,102,241,0.12)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* ── Scan line overlay ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
              <div
                className="rk-scan absolute left-0 right-0 h-32"
                style={{
                  background: 'linear-gradient(180deg,transparent 0%,rgba(99,102,241,0.04) 50%,transparent 100%)',
                  top: 0,
                }}
              />
            </div>

            {/* ── Ambient orbs ── */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.15),transparent)', opacity: 0.6 }} />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(6,182,212,0.12),transparent)', opacity: 0.6 }} />

            {/* ═══ HEADER ═══ */}
            <div className="sticky top-0 z-20 p-6 backdrop-blur-2xl border-b"
              style={{ background: 'rgba(4,8,22,0.94)', borderColor: 'rgba(99,102,241,0.2)' }}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Mini cube animé header */}
                  <div className="flex-shrink-0">
                    <RubiksCube3D size="sm" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-lg font-bold text-white leading-tight">
                        Rubik's Cube AR — Contrôle Gestuel
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold
                                       bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                        DEMO
                      </span>
                    </div>
                    <p className="text-indigo-300/70 text-xs">
                      Python · OpenCV · MediaPipe · NumPy · Kociemba
                    </p>
                  </div>
                </div>
                <button onClick={onClose}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09]
                             text-gray-400 hover:text-white border border-white/[0.08]
                             transition-all duration-200 flex-shrink-0">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="relative z-10 p-8 space-y-10">

              {/* ═══ HERO — Cube 3D + description ═══ */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Cube hero animé */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.15, duration: 0.8, ease: EASE_BACK }}
                  className="flex flex-col items-center justify-center gap-6"
                >
                  {/* Grande scène 3D */}
                  <div className="relative flex items-center justify-center">
                    {/* Orbit rings décoratifs */}
                    <svg
                      width="200" height="200"
                      className="absolute rk-orbit-ring opacity-20"
                      viewBox="0 0 200 200"
                    >
                      <ellipse cx="100" cy="100" rx="90" ry="28"
                        stroke="url(#rk-ring-grad)" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
                      <defs>
                        <linearGradient id="rk-ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="50%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <svg
                      width="200" height="200"
                      className="absolute rk-orbit-ring-r opacity-15"
                      viewBox="0 0 200 200"
                    >
                      <ellipse cx="100" cy="100" rx="70" ry="20"
                        stroke="url(#rk-ring-grad2)" strokeWidth="1" fill="none" strokeDasharray="4 6" />
                      <defs>
                        <linearGradient id="rk-ring-grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#a78bfa" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Glow derrière le cube */}
                    <div className="absolute w-28 h-28 rounded-full blur-3xl"
                      style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.35),rgba(6,182,212,0.18),transparent)' }}
                    />

                    {/* Particules flottantes */}
                    {[
                      { cls: 'rk-p-a', top: '10%', left: '12%',  color: '#e63946', size: 8 },
                      { cls: 'rk-p-b', top: '20%', right: '10%', color: '#2563eb', size: 7 },
                      { cls: 'rk-p-c', bottom: '18%', left: '18%', color: '#16a34a', size: 6 },
                      { cls: 'rk-p-a', bottom: '12%', right: '14%', color: '#facc15', size: 7 },
                      { cls: 'rk-p-b', top: '50%', left: '5%',  color: '#f4a300', size: 5 },
                      { cls: 'rk-p-c', top: '45%', right: '5%', color: '#f8fafc', size: 5 },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className={`${p.cls} absolute rounded-full pointer-events-none`}
                        style={{
                          width: p.size, height: p.size,
                          background: p.color,
                          boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                          top: p.top, left: p.left,
                          right: p.right, bottom: p.bottom,
                        }}
                      />
                    ))}

                    {/* Cube 3D grand */}
                    <RubiksCube3D size="lg" />
                  </div>

                  {/* Couleurs des faces */}
                  <div className="grid grid-cols-3 gap-2 w-full max-w-[220px]">
                    {cubeColors.map(c => (
                      <div key={c.face}
                        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-white/[0.06]"
                        style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <div className="w-3 h-3 rounded-sm flex-shrink-0"
                          style={{ background: c.color, boxShadow: `0 0 6px ${c.color}60` }} />
                        <span className="text-[10px] text-gray-400">{c.pos}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.7, ease: EASE_EXPO }}
                  className="space-y-5"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4
                                    border border-indigo-500/25 bg-indigo-500/8 text-indigo-300
                                    text-[10px] font-bold uppercase tracking-widest">
                      <Orbit size={10} />
                      Réalité Augmentée · Vision par Ordinateur
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      Application Python de <span className="text-white font-semibold">réalité augmentée</span> :
                      un Rubik's Cube 3×3 flotte devant la caméra et se manipule à la main
                      grâce à <span className="text-cyan-300 font-semibold">MediaPipe Hands</span>.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Le moteur reproduit fidèlement les <span className="text-indigo-300 font-medium">54 facelets WCA</span>,
                      tous les moves valides (U/D/R/L/F/B + tranches M/E/S + rotations globales),
                      et intègre un solveur <span className="text-violet-300 font-medium">Kociemba optimal</span>.
                    </p>
                  </div>

                  {/* Contrôles clavier */}
                  <div className="p-4 rounded-xl border border-white/[0.06]"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <MousePointer2 size={13} className="text-indigo-400" />
                      <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Contrôles clavier
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        ['Q / Esc', 'Quitter'],
                        ['S', 'Mélanger'],
                        ['R', 'Réinitialiser'],
                        ['V', 'Résoudre'],
                        ['+/-', 'Zoom'],
                        ['Flèches', 'Orbiter'],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-center gap-2">
                          <kbd className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold
                                          bg-white/[0.06] text-white border border-white/[0.12]">
                            {k}
                          </kbd>
                          <span className="text-gray-500 text-[11px]">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats rapides */}
                  <div className="grid grid-cols-2 gap-2">
                    {stats.map((s, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.35 + i * 0.06, type: 'spring', stiffness: 220 }}
                        className="p-3 rounded-xl text-center border border-white/[0.05]"
                        style={{ background: 'rgba(255,255,255,0.025)' }}
                      >
                        <div className="text-xl font-black mb-0.5" style={{ color: s.c }}>{s.v}</div>
                        <div className="text-[10px] text-gray-500">{s.l}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ═══ GESTES ═══ */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Hand className="text-cyan-400" size={16} />
                  <span className="text-white font-bold text-sm">Contrôle Gestuel — 3 gestes</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {gestures.map((g, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 + i * 0.09 }}
                      whileHover={reduced ? {} : { y: -4, scale: 1.02 }}
                      className="relative p-5 rounded-xl border overflow-hidden group"
                      style={{ borderColor: `${g.color}28`, background: `${g.color}08` }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `radial-gradient(ellipse at 50% 0%,${g.color}10,transparent 70%)` }} />
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                          style={{ background: `${g.color}18`, border: `1px solid ${g.color}30` }}>
                          <g.icon size={18} style={{ color: g.color }} />
                        </div>
                        <div className="text-sm font-bold text-white mb-1">{g.label}</div>
                        <div className="text-xs text-gray-400 leading-relaxed">{g.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ═══ ARCHITECTURE TECHNIQUE ═══ */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Cpu className="text-indigo-400" size={16} />
                  <span className="text-white font-bold text-sm">Architecture technique</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {techLayers.map((l, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24 + i * 0.07 }}
                      whileHover={reduced ? {} : { y: -3 }}
                      className="p-4 rounded-xl border"
                      style={{ borderColor: `${l.color}25`, background: `${l.color}07` }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <l.icon size={14} style={{ color: l.color }} />
                        <span className="text-xs font-bold" style={{ color: l.color }}>{l.label}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {l.items.map((it, j) => (
                          <li key={j} className="flex items-start gap-1.5 text-[11px] text-gray-400">
                            <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                              style={{ background: l.color }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ═══ INSTALLATION ═══ */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}>
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="text-emerald-400" size={16} />
                  <span className="text-white font-bold text-sm">Installation locale</span>
                </div>
                <div className="rounded-xl p-5 border border-white/[0.05] font-mono overflow-x-auto"
                  style={{ background: 'rgba(4,6,14,0.85)' }}>
                  {steps.map((line, i) => (
                    <div key={i} className={`text-xs leading-6 ${
                      line.startsWith('#') ? 'text-gray-500' : 'text-emerald-400'
                    } ${line === '' ? 'h-3' : ''}`}>
                      {line !== '' && (
                        <><span className="text-gray-600 select-none mr-2">$</span>{line}</>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ═══ ACTIONS ═══ */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-white/[0.05]">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  href="https://github.com/badiegmati/-Rubik-Cube"
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2
                             px-5 py-3 text-white rounded-xl border border-white/[0.08]
                             text-sm font-medium transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <Github size={17} /> Code Source
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  href="https://github.com/badiegmati/-Rubik-Cube/archive/refs/heads/main.zip"
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2
                             px-5 py-3 text-white rounded-xl text-sm font-medium
                             shadow-lg transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)',
                    boxShadow: '0 8px 32px rgba(99,102,241,0.32)',
                  }}
                >
                  <Download size={17} /> Télécharger
                </motion.a>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── ProjectCard ── */
function ProjectCard({ project, index, reduced, onPFE, onGame, onRubiks }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const Icon = project.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.92, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_BACK }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col h-full ${project.isPFE ? 'lg:col-span-2' : ''}`}
    >
      {/* Ambient glow */}
      <div
        className={`absolute -inset-4 bg-gradient-to-br ${project.gradient}
                    rounded-3xl blur-3xl pointer-events-none transition-opacity duration-500`}
        style={{ opacity: hovered && !reduced ? (project.isRubiksGame ? 0.28 : 0.35) : 0 }}
        aria-hidden="true"
      />

      <motion.div
        whileHover={reduced ? {} : { y: -8 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={`relative flex flex-col h-full rounded-2xl border overflow-hidden
                    shadow-2xl transition-all duration-300
                    ${project.isPFE
                      ? 'border-violet-500/25 hover:border-violet-400/50'
                      : project.isRubiksGame
                      ? 'border-indigo-500/20 hover:border-indigo-400/45 rk-neon'
                      : 'border-white/[0.07] hover:border-white/[0.14]'}`}
        style={{
          background: project.isPFE
            ? 'linear-gradient(145deg,rgba(46,16,101,0.55) 0%,rgba(13,20,42,0.92) 50%,rgba(29,14,80,0.45) 100%)'
            : project.isRubiksGame
            ? 'linear-gradient(145deg,rgba(14,16,60,0.60) 0%,rgba(8,12,32,0.95) 50%,rgba(4,8,28,0.98) 100%)'
            : 'linear-gradient(145deg,rgba(13,20,42,0.95) 0%,rgba(8,10,20,0.98) 100%)',
          backdropFilter: 'blur(28px)',
        }}
      >
        {/* Top accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.9, ease: EASE_EXPO }}
          style={{ originX: 0.5 }}
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${project.gradient} opacity-90`}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-400"
          style={{
            background: `radial-gradient(ellipse at 50% 0%,${
              project.isPFE ? 'rgba(139,92,246,0.08)'
              : project.isRubiksGame ? 'rgba(99,102,241,0.10)'
              : 'rgba(96,165,250,0.06)'
            } 0%,transparent 65%)`,
            opacity: hovered ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* PFE ribbon */}
        {project.isPFE && (
          <div className="absolute top-5 left-0 z-10">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE_EXPO }}
              className="flex items-center gap-1.5 pl-4 pr-3 py-1
                         bg-gradient-to-r from-violet-600 to-indigo-600
                         rounded-r-full text-white text-xs font-bold
                         shadow-lg shadow-violet-900/40"
            >
              <Star size={11} fill="white" />
              Projet PFE
            </motion.div>
          </div>
        )}

        {/* Rubik's ribbon */}
        {project.isRubiksGame && (
          <div className="absolute top-5 left-0 z-10">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE_EXPO }}
              className="flex items-center gap-1.5 pl-4 pr-3 py-1
                         rounded-r-full text-white text-xs font-bold shadow-lg"
              style={{
                background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)',
                boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
              }}
            >
              <Box size={11} />
              AR · Vision par ordi
            </motion.div>
          </div>
        )}

        {/* Status */}
        <div className="absolute top-4 right-4 z-10">
          <StatusBadge
            status={project.status}
            isPFE={project.isPFE}
            isRubiks={project.isRubiksGame}
          />
        </div>

        <div className={`p-7 flex flex-col flex-1
          ${project.isPFE || project.isRubiksGame ? 'pt-12' : 'pt-8'}`}>

          {/* Icon + Title */}
          <div className="flex items-start gap-4 mb-5 pr-24">
            <motion.div
              whileHover={reduced ? {} : { rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              className="relative flex-shrink-0"
            >
              {/* Pour Rubik's : afficher le mini cube 3D à la place de l'icône */}
              {project.isRubiksGame ? (
                <div className="relative">
                  <div className={`absolute inset-0 rounded-2xl blur-md opacity-40
                                   bg-gradient-to-br ${project.gradient}`} />
                  <div className={`relative p-3 rounded-2xl bg-gradient-to-br from-indigo-900/60 to-indigo-800/40
                                   shadow-xl ring-1 ring-indigo-500/30`}>
                    <RubiksCube3D size="sm" />
                  </div>
                </div>
              ) : (
                <>
                  <div className={`absolute inset-0 rounded-2xl blur-md opacity-45
                                   bg-gradient-to-br ${project.gradient}`} />
                  <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${project.gradient}
                                   shadow-xl ring-1 ring-white/15`}>
                    <Icon className="text-white" size={26} />
                  </div>
                </>
              )}
              <div
                className="absolute inset-0 rounded-2xl border border-white/22 animate-ping"
                style={{ animationDelay: `${index * 0.3}s`, animationDuration: '3s' }}
              />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white mb-1.5 leading-tight
                             group-hover:text-blue-100 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>

          {/* Rubik's layout spécial */}
          {project.isRubiksGame ? (
            <>
              <div className="grid md:grid-cols-2 gap-5 mb-6">
                <div>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                    Stack technique
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t, i) => (
                      <TechTag key={i} tech={t} reduced={reduced} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                    Fonctionnalités
                  </p>
                  <ul className="space-y-1.5">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0
                                         bg-gradient-to-r ${project.gradient}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gestes rapides */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { icon: Fingerprint, label: 'Pincement → Face',    col: '#06b6d4' },
                  { icon: Move3d,      label: 'Poing → Orbite',       col: '#8b5cf6' },
                  { icon: Hand,        label: 'Pouce → Mélange',      col: '#3b82f6' },
                  { icon: RotateCcw,   label: 'V → Résolution auto',  col: '#6366f1' },
                ].map((g, i) => (
                  <div key={i}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium"
                    style={{ borderColor: `${g.col}28`, background: `${g.col}0a`, color: g.col }}>
                    <g.icon size={11} />
                    {g.label}
                  </div>
                ))}
              </div>
            </>
          ) : project.isPFE ? (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                  Stack technique
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t, i) => (
                    <TechTag key={i} tech={t} reduced={reduced} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                  Fonctionnalités
                </p>
                <ul className="space-y-1.5">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400 text-xs">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0
                                       bg-gradient-to-r ${project.gradient}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.map((t, i) => (
                  <TechTag key={i} tech={t} reduced={reduced} />
                ))}
              </div>
              <div className="flex-1 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={13} className={project.accentColor} />
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Fonctionnalités
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {project.features.slice(0, 4).map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.06 + 0.3, ease: EASE_EXPO }}
                      className="flex items-start gap-2 text-gray-400 text-sm"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0
                                       bg-gradient-to-r ${project.gradient}`} />
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2.5 mt-auto">
            {project.code && project.code !== '#' && (
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                href={project.code} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                           bg-white/[0.05] hover:bg-white/[0.09] text-white text-sm font-medium
                           border border-white/[0.08] hover:border-white/[0.18]
                           transition-all duration-200 backdrop-blur-sm"
              >
                <Github size={16} /><span>Code</span>
              </motion.a>
            )}

            {project.demoUrl && project.demoUrl !== '#' && (
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
                            bg-gradient-to-r ${project.gradient} text-white text-sm font-medium
                            shadow-lg hover:shadow-xl transition-all duration-200`}
              >
                <Eye size={16} /><span>Démo Live</span><ArrowUpRight size={14} />
              </motion.a>
            )}

            {project.isPFE && (
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                onClick={onPFE}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                           bg-gradient-to-r from-violet-600 to-indigo-600
                           hover:from-violet-500 hover:to-indigo-500
                           text-white text-sm font-medium shadow-lg transition-all duration-200"
              >
                <Cpu size={16} /><span>Architecture</span>
              </motion.button>
            )}

            {project.isPythonGame && (
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                onClick={onGame}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
                            bg-gradient-to-r ${project.gradient} text-white text-sm font-medium
                            shadow-lg transition-all duration-200`}
              >
                <Play size={16} /><span>Voir Démo</span>
              </motion.button>
            )}

            {project.isRubiksGame && (
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                onClick={onRubiks}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white
                           text-sm font-medium shadow-lg transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)',
                  boxShadow: '0 8px 28px rgba(99,102,241,0.35)',
                }}
              >
                <Box size={16} /><span>Voir le projet</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Corner dots */}
        <div className="absolute bottom-3 right-3 flex gap-1 opacity-20">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1 h-1 rounded-full bg-white animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── PFEModal ── */
function PFEModal({ open, onClose, reduced }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else      document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const layers = [
    { icon: Camera,     label: 'Couche 1 — Embarquée',         color: '#a78bfa',
      desc: 'Raspberry Pi 4 · CAM DMS + ADAS · YOLOv8n · MediaPipe FaceMesh · SQLite (store-and-forward)' },
    { icon: Server,     label: 'Couche 2 — Backend & Scoring',  color: '#60a5fa',
      desc: 'Spring Boot (auth JWT, lecture API) · Fonction Edge Supabase (score-drivers, pg_cron 02h00)' },
    { icon: Smartphone, label: 'Couche 3 — Applications',       color: '#34d399',
      desc: 'Dashboard gestionnaire React 18 · Application conducteur Flutter 3.22+' },
  ]

  const features = [
    { icon: Eye,    title: 'DMS — Fatigue & distraction', color: '#a78bfa',
      desc: 'EAR/MAR adaptatifs, pose de tête, session téléphone, ceinture (HSV + Hough)'    },
    { icon: Car,    title: 'ADAS — Collision & voie',     color: '#fbbf24',
      desc: 'FCW (distance monoculaire + taux de rapprochement) et LDW (Canny + Hough)'       },
    { icon: Gauge,  title: 'Scoring comportemental',      color: '#34d399',
      desc: 'Décroissance exponentielle (0,9), 4 niveaux de risque, calcul nocturne'          },
    { icon: MapPin, title: 'Géolocalisation & flotte',    color: '#60a5fa',
      desc: 'Boîtier VEGEO (GSM/GPRS, SIM868E), carte Leaflet, messagerie temps réel'         },
  ]

  const metrics = [
    { value: '91,6 %', label: 'Détection (190 scénarios)', color: '#a78bfa' },
    { value: '≤130 ms', label: 'Latence embarquée',         color: '#34d399' },
    { value: '52/52',  label: 'Endpoints API validés',      color: '#60a5fa' },
    { value: '74/74',  label: 'Événements test C10',        color: '#fbbf24' },
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={modalBackdrop} initial="hidden" animate="visible" exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4
                     bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            variants={modalPanel}
            className="relative rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto
                       border border-violet-500/30 shadow-2xl shadow-violet-900/30"
            style={{
              background: 'linear-gradient(145deg,rgba(46,16,101,0.55) 0%,rgba(13,20,42,0.97) 50%,rgba(8,10,20,0.99) 100%)',
              backdropFilter: 'blur(28px)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 p-6 backdrop-blur-xl border-b border-violet-500/25"
              style={{ background: 'rgba(13,10,40,0.92)' }}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ rotate: -10, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="p-2.5 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl"
                  >
                    <Car className="text-white" size={22} />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      Système ADAS/DMS — PFE Alpha Technology
                    </h3>
                    <p className="text-violet-300/80 text-xs mt-0.5">
                      Edge AI · YOLOv8n · MediaPipe · Spring Boot · React 18 · Flutter
                    </p>
                  </div>
                </div>
                <button onClick={onClose}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09]
                             text-gray-400 hover:text-white border border-white/[0.08]
                             transition-all duration-200">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <p className="text-gray-300 text-sm leading-relaxed">
                Réalisé en binôme (avec{' '}
                <span className="text-violet-300 font-medium">Ahmed Arfaoui</span>)
                au sein d'<span className="text-violet-300 font-medium">Alpha Technology</span> (Ben Arous).
                Architecture à trois couches : détection embarquée, scoring backend et applications clientes.
              </p>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="text-violet-400" size={16} />
                  <span className="text-white font-semibold text-sm">Architecture Edge-to-Cloud</span>
                </div>
                <div className="space-y-2">
                  {layers.map((l, i) => (
                    <React.Fragment key={i}>
                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.09 }}
                        className="flex items-start gap-3 p-4 rounded-xl"
                        style={{ border: `1px solid ${l.color}30`, background: `${l.color}0a` }}
                      >
                        <l.icon size={16} style={{ color: l.color }} className="mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-bold mb-1" style={{ color: l.color }}>{l.label}</div>
                          <div className="text-xs text-gray-400 leading-relaxed">{l.desc}</div>
                        </div>
                      </motion.div>
                      {i < layers.length - 1 && (
                        <div className="flex justify-center">
                          <ChevronRight size={14} className="text-gray-600 rotate-90" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 + i * 0.06 }}
                    whileHover={reduced ? {} : { y: -3 }}
                    className="flex items-start gap-3 p-4 rounded-xl border"
                    style={{ borderColor: `${f.color}25`, background: `${f.color}08` }}
                  >
                    <f.icon size={15} style={{ color: f.color }} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-gray-100 mb-1">{f.title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{f.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="text-violet-400" size={16} />
                  <span className="text-white font-semibold text-sm">Résultats de validation</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {metrics.map((m, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.42 + i * 0.06, type: 'spring', stiffness: 200 }}
                      className="p-4 rounded-xl text-center border border-white/[0.06]"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div className="text-lg font-black mb-1" style={{ color: m.color }}>{m.value}</div>
                      <div className="text-[11px] text-gray-500 leading-tight">{m.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-gray-500 border-t border-white/[0.06] pt-5">
                <Users size={13} className="mt-0.5 flex-shrink-0 text-gray-600" />
                <span>
                  Projet de Fin d'Études (2025–2026), ISIGK — binôme avec Ahmed Arfaoui.
                  Encadrement académique : M. Abdelbasset Trad.
                  Encadrement professionnel : M. Wassim Smati (Alpha Technology).
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── TicTacToeModal ── */
function TicTacToeModal({ open, onClose, features, reduced }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else      document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const steps = useMemo(() => [
    '# Cloner le repository',
    'git clone https://github.com/badiegmati/TicTacToe-AI.git',
    '',
    '# Installer les dépendances',
    'pip install kivy',
    '',
    '# Lancer le jeu',
    'python main.py',
  ], [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={modalBackdrop} initial="hidden" animate="visible" exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4
                     bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            variants={modalPanel}
            className="relative rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto
                       border border-white/[0.08] shadow-2xl"
            style={{
              background: 'linear-gradient(145deg,rgba(13,20,42,0.97) 0%,rgba(8,10,20,0.99) 100%)',
              backdropFilter: 'blur(28px)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 p-6 backdrop-blur-xl border-b border-emerald-500/20"
              style={{ background: 'rgba(8,20,18,0.92)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                    <GamepadIcon className="text-white" size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Tic-Tac-Toe AI</h3>
                    <p className="text-emerald-300/80 text-xs">Python · Kivy · Minimax</p>
                  </div>
                </div>
                <button onClick={onClose}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09]
                             text-gray-400 hover:text-white border border-white/[0.08]
                             transition-all duration-200">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.12 }}
                className="text-gray-300 text-sm text-center leading-relaxed"
              >
                Ce jeu Python nécessite une installation locale. Voici comment le tester :
              </motion.p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { src: image1, label: 'Interface du jeu',  grad: 'from-green-500 to-emerald-600' },
                  { src: image3, label: 'Écran de victoire', grad: 'from-cyan-500 to-blue-600'     },
                ].map((img, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: i === 0 ? -16 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.1 }}
                    className="group relative overflow-hidden rounded-xl border border-white/[0.07]"
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${img.grad}
                                    blur opacity-0 group-hover:opacity-18
                                    transition-opacity duration-500`} />
                    <img src={img.src} alt={img.label}
                      className="w-full h-56 object-cover group-hover:scale-105
                                 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3
                                    bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm font-medium">{img.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}>
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="text-green-400" size={16} />
                  <span className="text-white font-semibold text-sm">Installation</span>
                </div>
                <div className="rounded-xl p-5 border border-white/[0.06] font-mono"
                  style={{ background: 'rgba(4,6,14,0.8)' }}>
                  {steps.map((line, i) => (
                    <div key={i} className={`text-xs leading-6 ${
                      line.startsWith('#') ? 'text-gray-500' : 'text-green-400'
                    } ${line === '' ? 'h-3' : ''}`}>
                      {line !== '' && (
                        <><span className="text-gray-600 select-none mr-2">$</span>{line}</>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.48 }}>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="text-yellow-400" size={16} />
                  <span className="text-white font-semibold text-sm">Fonctionnalités</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {features.map((f, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.52 + i * 0.06 }}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-white/[0.06]"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-3">
                <motion.a whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  href="https://github.com/badiegmati/TicTacToe-AI"
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2
                             px-5 py-3 text-white rounded-xl border border-white/[0.08]
                             text-sm font-medium transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <Github size={17} /> Code Source
                </motion.a>
                <motion.a whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  href="https://github.com/badiegmati/TicTacToe-AI/archive/refs/heads/main.zip"
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2
                             px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600
                             hover:from-green-500 hover:to-emerald-500 text-white rounded-xl
                             text-sm font-medium shadow-lg transition-all duration-200"
                >
                  <Download size={17} /> Télécharger
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════════════════════
   PROJECTS — MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export default function Projects() {
  const reduced = useReducedMotion()
  const [showPFE,    setShowPFE]    = useState(false)
  const [showGame,   setShowGame]   = useState(false)
  const [showRubiks, setShowRubiks] = useState(false)
  const [filter,     setFilter]     = useState('phares')

  const projects = useMemo(() => [
    {
      id: 0,
      title: 'Système ADAS/DMS Embarqué — PFE',
      description: 'Plateforme embarquée Edge AI sur Raspberry Pi 4 : détection temps réel de 12 comportements dangereux (fatigue, distraction, FCW, LDW), scoring comportemental ML et supervision flotte via web React et mobile Flutter.',
      technologies: ['Python','YOLOv8n','MediaPipe','OpenCV','Raspberry Pi 4','Spring Boot','Java 17','Supabase','PostgreSQL','React 18','Flutter'],
      icon: Car,
      gradient: 'from-violet-600 via-purple-500 to-indigo-600',
      accentColor: 'text-violet-400',
      isPFE: true,
      demoUrl: 'https://badiegmati.github.io/Projet_pfe/',
      code: 'https://github.com/badiegmati/Projet_pfe',
      features: [
        'DMS : fatigue (EAR/MAR), distraction, téléphone, ceinture',
        'ADAS : anti-collision (FCW) et sortie de voie (LDW)',
        'Scoring comportemental par décroissance exponentielle',
        'Dashboards React 18 + app Flutter conducteur',
      ],
      status: 'Alpha Technology · Binôme',
      featured: true,
    },
    {
      id: 1,
      title: 'Réservation Hôtelière Full-Stack',
      description: "Plateforme web complète de réservation d'hôtels — interface SSR/SSG moderne, auth, PostgreSQL et score Lighthouse > 90.",
      technologies: ['Next.js','React','TailwindCSS','Supabase','PostgreSQL','JavaScript'],
      icon: Globe,
      gradient: 'from-blue-500 via-cyan-500 to-purple-600',
      accentColor: 'text-blue-400',
      demoUrl: 'https://badiegmati.github.io/Chi5a/',
      code: 'https://github.com/badiegmati/Chi5a',
      features: ['Responsive Design','REST API','Authentification','Temps réel'],
      status: 'Complet',
      featured: true,
    },
    {
      id: 2,
      title: 'Tic-Tac-Toe AI — Jeu Python',
      description: 'Jeu de morpion avec IA avancée (Minimax). Interface Kivy professionnelle, 3 niveaux de difficulté.',
      technologies: ['Python','Kivy','IA Minimax','Algorithmes','OOP','AI/ML'],
      icon: GamepadIcon,
      gradient: 'from-green-500 via-emerald-500 to-cyan-600',
      accentColor: 'text-green-400',
      code: 'https://github.com/badiegmati/TicTacToe-AI',
      isPythonGame: true,
      features: [
        'Interface Kivy moderne',
        "3 niveaux d'IA",
        'Algorithme Minimax optimisé',
        'Système de score persistant',
        'Choix symbole X/O',
        'Animation fluide',
      ],
      status: 'Actif',
      featured: true,
    },
    {
      id: 3,
      title: 'Rubik\'s Cube AR — Contrôle Gestuel',
      description: "Application de réalité augmentée Python : un Rubik's Cube 3×3 flotte devant la caméra et se manipule à la main grâce à MediaPipe Hands. Pincement pour tourner une face, poing pour orbiter, pouce levé pour mélanger.",
      technologies: ['Python','OpenCV','MediaPipe','NumPy','Kociemba','Vision par ordi'],
      icon: Box,
      gradient: 'from-indigo-500 via-violet-500 to-cyan-500',
      accentColor: 'text-indigo-400',
      code: 'https://github.com/badiegmati/-Rubik-Cube',
      isRubiksGame: true,
      features: [
        'Détection 21 landmarks main (MediaPipe)',
        'Pincement pouce+index → tourne la face',
        'Poing fermé + déplacement → orbite vue',
        'Solveur Kociemba optimal (≤20 moves)',
        'Moteur facelets WCA complet validé',
        'Rendu 3D + particules + effets visuels',
      ],
      status: 'AR · Vision',
      featured: true,
    },
    {
      id: 4,
      title: 'Quiz Interactif — Corsair',
      description: 'Application de quiz gamifiée sur la marque Corsair : inscription utilisateur, timer 11s par question, scoring en temps réel, résultats détaillés et persistance via Supabase.',
      technologies: ['React','TypeScript','Supabase','PostgreSQL','TailwindCSS','Vite'],
      icon: Trophy,
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      accentColor: 'text-amber-400',
      demoUrl: 'https://badiegmati.github.io/quiz-with-timer/',
      code: 'https://github.com/badiegmati/quiz-with-timer',
      features: [
        'Timer 11s par question avec compte à rebours visuel',
        '10 questions aléatoires sur Corsair Gaming',
        'Inscription utilisateur (prénom, nom, âge)',
        'Résultats détaillés avec correction et grade',
        'Persistance des scores via Supabase',
        'Design responsive & animations fluides',
      ],
      status: 'Complet',
      featured: false,
    },
    {
      id: 5,
      title: 'Application Mobile Angular',
      description: 'Application mobile cross-platform Angular avec fonctionnalités avancées et design responsive.',
      technologies: ['Angular','TypeScript','CSS3','API REST','RxJS','NgRx'],
      icon: Smartphone,
      gradient: 'from-purple-500 via-pink-500 to-rose-600',
      accentColor: 'text-purple-400',
      features: ['PWA','Offline Support','Push Notifications','Material Design'],
      status: 'En développement',
      featured: false,
    },
    {
      id: 6,
      title: 'Plateforme Data Python',
      description: "Dashboard d'analyse de données Flask + MongoDB + D3.js. Visualisations interactives et export multi-format.",
      technologies: ['Python','MongoDB','Flask','HTML/CSS','D3.js','Pandas'],
      icon: Database,
      gradient: 'from-orange-500 via-red-500 to-amber-600',
      accentColor: 'text-orange-400',
      features: ['Dashboard interactif','Analyse temps réel','Export données','Visualisations'],
      status: 'En développement',
      featured: false,
    },
  ], [])

  const FILTERS = useMemo(() => [
    { key: 'phares', label: `Projets phares (${projects.filter(p => p.featured).length})` },
    { key: 'tous',   label: `Tous (${projects.length})` },
  ], [projects])

  const visible      = filter === 'tous' ? projects : projects.filter(p => p.featured)
  const gameFeatures = useMemo(() => projects[2].features, [projects])

  const bottomStats = [
    { v: `${projects.length}+`, l: 'Projets réalisés',       g: 'from-blue-400 to-cyan-400',     gr: '#60a5fa,#22d3ee' },
    { v: '10+',                 l: 'Technologies maîtrisées', g: 'from-purple-400 to-pink-400',   gr: '#c084fc,#f472b6' },
    { v: 'Edge AI',             l: 'Spécialité PFE',          g: 'from-violet-400 to-indigo-400', gr: '#a78bfa,#6366f1' },
    { v: '17/20',               l: 'Mention Très Bien',       g: 'from-amber-400 to-orange-400',  gr: '#fbbf24,#f97316' },
  ]

  return (
    <>
      <StyleInject />

      <section
        id="projects"
        className="relative py-36 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg,rgba(2,8,23,0) 0%,rgba(2,8,23,.55) 40%,rgba(2,8,23,.62) 100%)',
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle,rgba(148,163,184,.038) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse 82% 68% at 50% 50%,transparent 38%,rgba(2,8,23,.52) 100%)',
          }}
        />

        {/* Ambient orbs */}
        <div
          className="pj-orb-a absolute -top-32 -left-32 w-[380px] h-[380px]
                     rounded-full blur-[88px] opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#1e40af,#6d28d9)' }}
          aria-hidden="true"
        />
        <div
          className="pj-orb-b absolute -bottom-32 -right-32 w-[320px] h-[320px]
                     rounded-full blur-[88px] opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#7c3aed,#0891b2)' }}
          aria-hidden="true"
        />

        <div className="container relative mx-auto px-4 md:px-10 z-10 max-w-[1400px]">

          {/* ── HEADER ── */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger(0, 0.1)}
            className="text-center mb-24"
          >
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10
                         border border-blue-500/18 bg-blue-500/[0.055] backdrop-blur-xl
                         text-blue-400 text-[10px] font-black uppercase tracking-[0.24em]
                         shadow-xl shadow-blue-900/20"
            >
              <Sparkles size={11} className={reduced ? '' : 'pj-spin'} />
              Portfolio
              <Sparkles size={11} className={reduced ? '' : 'pj-spin-r'} />
            </motion.div>

            <motion.h2 variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-[88px] font-black tracking-tight mb-6 leading-[1.01]"
            >
              <span className="text-white">Mes </span>
              <span className="relative inline-block">
                <span
                  className={reduced ? 'text-transparent bg-clip-text' : 'pj-gt'}
                  style={{
                    backgroundImage: 'linear-gradient(90deg,#60a5fa 0%,#a78bfa 30%,#f472b6 60%,#60a5fa 100%)',
                  }}
                >
                  Projets
                </span>
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 1.2, ease: EASE_EXPO }}
                  style={{ originX: 0.5 }}
                  className="absolute -bottom-3 left-0 right-0 h-[2px] rounded-full
                             bg-gradient-to-r from-transparent via-violet-400/75 to-transparent blur-sm"
                />
              </span>
            </motion.h2>

            <motion.p variants={fadeUp}
              className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Une sélection de projets qui démontrent mes compétences en{' '}
              <span className="text-white font-semibold">développement Full-Stack</span> et ma passion pour l'
              <span className="font-semibold"
                style={{ background: 'linear-gradient(90deg,#a78bfa,#818cf8)',
                         WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                innovation
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 1.1, ease: EASE_EXPO }}
              className="mt-12 mx-auto flex items-center gap-4 max-w-[200px]"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/28 to-transparent" />
              <Star size={13}
                className={`text-blue-400/52 flex-shrink-0 ${reduced ? '' : 'pj-spin-slow'}`}
              />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/28 to-transparent" />
            </motion.div>
          </motion.div>

          {/* ── FILTER TABS ── */}
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE_EXPO }}
            className="flex justify-center mb-14"
          >
            <div className="inline-flex p-1.5 rounded-full gap-1 border border-white/[0.07] backdrop-blur-xl"
              style={{ background: 'rgba(13,20,42,0.8)' }}>
              {FILTERS.map((tab, i) => (
                <motion.button key={tab.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.42, ease: EASE_EXPO }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => setFilter(tab.key)}
                  className={`relative px-6 py-2.5 text-sm font-semibold rounded-full
                              transition-colors duration-200
                              ${filter === tab.key
                                ? 'text-white'
                                : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {filter === tab.key && (
                    <motion.div layoutId="proj-filter"
                      className="absolute inset-0 rounded-full
                                 bg-gradient-to-r from-blue-600 to-purple-600"
                      transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── GRID ── */}
          <AnimatePresence mode="popLayout">
            <motion.div key={filter} layout
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
              exit={{   opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.38, ease: EASE_EXPO }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {visible.map((project, i) => (
                <ProjectCard
                  key={project.id} project={project} index={i} reduced={reduced}
                  onPFE={() => setShowPFE(true)}
                  onGame={() => setShowGame(true)}
                  onRubiks={() => setShowRubiks(true)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── BOTTOM STATS ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.75, ease: EASE_EXPO }}
            className="mt-20 pt-12 border-t border-white/[0.05]"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {bottomStats.map((s, i) => (
                <BottomStatCard key={i} s={s} i={i} reduced={reduced} />
              ))}
            </div>
          </motion.div>

          {/* Footer divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.82, ease: EASE_EXPO }}
            className="mt-16 mx-auto flex items-center gap-3 max-w-[130px]"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/22 to-transparent" />
            <Star size={9}
              className={`text-indigo-400/32 flex-shrink-0 ${reduced ? '' : 'pj-spin'}`}
            />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/22 to-transparent" />
          </motion.div>
        </div>

        {/* ── Modals ── */}
        <PFEModal    open={showPFE}    onClose={() => setShowPFE(false)}    reduced={reduced} />
        <TicTacToeModal
          open={showGame}
          onClose={() => setShowGame(false)}
          features={gameFeatures}
          reduced={reduced}
        />
        <RubiksModal open={showRubiks} onClose={() => setShowRubiks(false)} reduced={reduced} />
      </section>
    </>
  )
}