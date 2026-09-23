// About.jsx — Background cohérent Skills.jsx + GlobalBackground
// Palette: #3b82f6 · #8b5cf6 · #06b6d4 · #6366f1

import React, { useRef, useState, useEffect } from 'react'
import {
  BookOpen, Globe, Code2, Sparkles, Target,
  GraduationCap, MapPin, Calendar, Award,
  ChevronRight, Cpu, Database, Smartphone,
  Wifi, Brain, Star,
} from 'lucide-react'
import { motion, useReducedMotion, useInView } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════
   CSS INJECTION — Pattern identique Skills.jsx
   Palette identique GlobalBackground
═══════════════════════════════════════════════════════════ */
const STYLES = `
  /* ── Keyframes ── */
  @keyframes ab-grad {
    0%,100% { background-position: 0% 50% }
    50%      { background-position: 100% 50% }
  }
  @keyframes ab-orb-drift-a {
    0%,100% { transform: translate(0,0) scale(1) }
    33%     { transform: translate(28px,-18px) scale(1.06) }
    66%     { transform: translate(-14px,22px) scale(0.97) }
  }
  @keyframes ab-orb-drift-b {
    0%,100% { transform: translate(0,0) scale(1) }
    40%     { transform: translate(-22px,16px) scale(1.05) }
    75%     { transform: translate(18px,-12px) scale(0.96) }
  }
  @keyframes ab-spin-cw  { to { transform: rotate(360deg)  } }
  @keyframes ab-spin-ccw { to { transform: rotate(-360deg) } }
  @keyframes ab-float {
    0%,100% { transform: translateY(0) }
    50%     { transform: translateY(-5px) }
  }

  /* ── Gradient animated text ── */
  .ab-gt {
    background-size: 300% 100%;
    animation: ab-grad 6s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Orbs ── */
  .ab-orb-a { animation: ab-orb-drift-a 12s ease-in-out infinite }
  .ab-orb-b { animation: ab-orb-drift-b 15s ease-in-out infinite }

  /* ── Spin ── */
  .ab-spin   { animation: ab-spin-cw  18s linear infinite }
  .ab-spin-r { animation: ab-spin-ccw 18s linear infinite }
  .ab-spin-slow { animation: ab-spin-cw 14s linear infinite }
  .ab-float  { animation: ab-float 4s ease-in-out infinite }

  /* ── Shimmer bar ── */
  .ab-shimmer-bar {
    transition: width .4s cubic-bezier(.16,1,.3,1), opacity .3s ease;
  }

  /* ══════════════════════════════════════════
     Reduced motion
  ══════════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .ab-gt, .ab-orb-a, .ab-orb-b,
    .ab-spin, .ab-spin-r, .ab-spin-slow, .ab-float {
      animation: none !important;
    }
    .ab-gt {
      -webkit-text-fill-color: transparent;
    }
  }
`

function StyleInject() {
  useEffect(() => {
    const ID = 'ab-pro-v1'
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

const LANGUAGES = [
  { name: 'Arabe',   flag: '🇹🇳', level: 'Langue maternelle', pct: 100,
    color: 'from-emerald-500 to-teal-500',  badge: 'Natif', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { name: 'Français',flag: '🇫🇷', level: 'Intermédiaire',     pct: 55,
    color: 'from-blue-500 to-indigo-500',   badge: 'B1',    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'         },
  { name: 'Anglais', flag: '🇬🇧', level: 'Intermédiaire',     pct: 55,
    color: 'from-purple-500 to-pink-500',   badge: 'B1',    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'   },
]

const EDUCATION = [
  { degree: 'Licence en Informatique',            school: 'ISIGK — Kairouan', period: 'Sept. 2023 – Juin 2026', mention: 'Mention Très Bien · 17/20',  color: 'from-blue-500 to-purple-600',  icon: GraduationCap, active: true  },
  { degree: 'Baccalauréat Sciences Informatiques', school: 'Lycée Bouargoub', period: 'Juin 2023',              mention: "Sciences de l'Informatique", color: 'from-purple-500 to-pink-500',  icon: BookOpen,      active: false },
]

const INTERESTS = [
  { icon: Globe,    title: 'Développement Web & Mobile',      desc: 'Applications modernes Full-Stack avec Next.js, React, Flutter', color: 'from-blue-500/10 to-cyan-500/10',    accent: 'text-blue-400',   tags: ['Next.js','React','Flutter']       },
  { icon: Cpu,      title: 'IA Embarquée & Edge AI',          desc: 'Vision par ordinateur temps réel sur Raspberry Pi',            color: 'from-purple-500/10 to-pink-500/10',  accent: 'text-purple-400', tags: ['YOLOv8','TFLite','OpenCV']        },
  { icon: Brain,    title: 'Machine Learning',                desc: "Algorithmes prédictifs, traitement d'image",                   color: 'from-pink-500/10 to-rose-500/10',    accent: 'text-pink-400',   tags: ['Python','NumPy','TensorFlow']     },
  { icon: Database, title: 'Architecture & Bases de Données', desc: 'Conception microservices, optimisation SQL/NoSQL',             color: 'from-amber-500/10 to-orange-500/10', accent: 'text-amber-400',  tags: ['PostgreSQL','MongoDB','Supabase'] },
  { icon: Wifi,     title: 'Internet des Objets (IoT)',       desc: 'Systèmes connectés, GPIO, capteurs et automatisation',         color: 'from-cyan-500/10 to-teal-500/10',    accent: 'text-cyan-400',   tags: ['RPi.GPIO','IoT','C++']            },
]

const SOFT_SKILLS = [
  { label: 'Résolution de problèmes', icon: '🎯', desc: 'Analyse critique & solutions créatives',        color: 'from-yellow-500 to-orange-500', textColor: 'text-yellow-400',  borderColor: 'border-yellow-500/25' },
  { label: 'Autonomie & Rigueur',     icon: '⚡', desc: 'Travail indépendant avec précision technique', color: 'from-blue-500 to-cyan-500',     textColor: 'text-blue-400',    borderColor: 'border-blue-500/25'   },
  { label: 'Travail en équipe',       icon: '🤝', desc: 'Collaboration Agile & communication fluide',   color: 'from-emerald-500 to-teal-500',  textColor: 'text-emerald-400', borderColor: 'border-emerald-500/25'},
  { label: 'Communication',           icon: '💬', desc: 'Expression claire & présentations techniques', color: 'from-purple-500 to-pink-500',   textColor: 'text-purple-400',  borderColor: 'border-purple-500/25' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_EXPO } },
}

const stagger = (delay = 0.1, children = 0.15) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: children, delayChildren: delay } },
})

/* ── AnimatedBar — shimmer supprimé (classe Tailwind inexistante) ── */
function AnimatedBar({ pct, color, delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className="h-2 rounded-full overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.1, delay, ease: EASE_EXPO }}
        className={`h-full bg-gradient-to-r ${color} rounded-full`}
      />
    </div>
  )
}

/* ── EducationCard ── */
function EducationCard({ item, index, reduced }) {
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon
  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex gap-5 p-5 rounded-2xl border transition-all duration-300 group overflow-hidden"
      style={{
        background: item.active
          ? 'linear-gradient(145deg,rgba(29,78,216,0.12) 0%,rgba(13,20,42,0.95) 100%)'
          : 'linear-gradient(145deg,rgba(13,20,42,0.92) 0%,rgba(8,10,20,0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderColor: item.active
          ? hovered ? 'rgba(96,165,250,0.5)' : 'rgba(96,165,250,0.22)'
          : hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
      }}
    >
      <motion.div
        initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.7, ease: EASE_EXPO }}
        style={{ originY: 0 }}
        className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-gradient-to-b ${item.color}`}
      />

      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 30% 50%,${
          item.active ? 'rgba(96,165,250,0.06)' : 'rgba(167,139,250,0.04)'
        } 0%,transparent 70%)` }}
      />

      <div className="relative flex-shrink-0">
        <div className={`absolute inset-0 rounded-xl blur-md opacity-40 bg-gradient-to-br ${item.color}`} />
        <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${item.color}
                         flex items-center justify-center shadow-lg ring-1 ring-white/15`}>
          <Icon size={22} className="text-white" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h4 className="text-white font-bold text-base leading-tight
                         group-hover:text-blue-100 transition-colors duration-300">
            {item.degree}
          </h4>
          {item.active && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full
                             bg-green-500/15 text-green-400 border border-green-500/28
                             flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              En cours
            </span>
          )}
        </div>
        <p className="text-blue-300/90 text-sm font-medium mb-2">{item.school}</p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <Calendar size={11} className="text-gray-500" /> {item.period}
          </span>
          <span className="flex items-center gap-1.5">
            <Award size={11} className="text-yellow-400" />
            <span className="text-yellow-400 font-semibold">{item.mention}</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ── LanguageCard ── */
function LanguageCard({ lang, index, reduced }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-5 rounded-2xl border transition-all duration-300 overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(145deg,rgba(13,20,42,0.95) 0%,rgba(8,10,20,0.98) 100%)',
        backdropFilter: 'blur(24px)',
        borderColor: hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ delay: index * 0.12 + 0.3, duration: 0.9, ease: EASE_EXPO }}
        style={{ originX: 0.5 }}
        className={`absolute top-0 left-4 right-4 h-px rounded-full bg-gradient-to-r ${lang.color}`}
      />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{lang.flag}</span>
          <span className="text-white font-bold">{lang.name}</span>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${lang.badgeColor}`}>
          {lang.badge}
        </span>
      </div>

      <p className="text-gray-500 text-xs mb-3">{lang.level}</p>
      <AnimatedBar pct={lang.pct} color={lang.color} delay={index * 0.15 + 0.3} />

      <div className="flex justify-between mt-2">
        <span className="text-gray-600 text-[10px]">Niveau</span>
        <span className={`text-[10px] font-black bg-gradient-to-r ${lang.color} bg-clip-text text-transparent`}>
          {lang.pct}%
        </span>
      </div>
    </motion.div>
  )
}

/* ── InterestCard ── */
function InterestCard({ item, index, reduced }) {
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon
  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { x: 6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-4 p-5 rounded-2xl border
                 transition-all duration-300 group cursor-default overflow-hidden"
      style={{
        background: 'linear-gradient(145deg,rgba(13,20,42,0.92) 0%,rgba(8,10,20,0.96) 100%)',
        backdropFilter: 'blur(20px)',
        borderColor: hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
      }}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-[2px] rounded-r-full
                    bg-gradient-to-b ${item.color.replace('/10', '')}
                    transition-opacity duration-300`}
        style={{ opacity: hovered ? 1 : 0 }}
      />

      <div className="flex-shrink-0 relative">
        <div className="relative w-11 h-11 rounded-xl flex items-center justify-center
                        border border-white/[0.08] group-hover:border-white/[0.15]
                        transition-colors duration-300"
          style={{ background: 'rgba(255,255,255,0.04)' }}>
          <Icon size={20} className={item.accent} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-white mb-1 text-sm group-hover:text-blue-100 transition-colors duration-300">
          {item.title}
        </h4>
        <p className="text-gray-500 text-xs leading-relaxed mb-2.5
                      group-hover:text-gray-400 transition-colors duration-300">
          {item.desc}
        </p>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag, i) => (
            <span key={i}
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                          border border-white/[0.08] ${item.accent} cursor-default`}
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`flex-shrink-0 self-center ${item.accent} transition-all duration-200`}
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-8px)' }}
      >
        <ChevronRight size={16} />
      </div>
    </motion.div>
  )
}

/* ── SoftSkillBar ── */
function SoftSkillBar({ skill, index, reduced }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { x: 4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-4 p-4 rounded-2xl border
                 transition-all duration-300 group cursor-default overflow-hidden"
      style={{
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        borderColor: hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
      }}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-0.5 origin-top rounded-r-full
                    bg-gradient-to-b ${skill.color} transition-opacity duration-300`}
        style={{ opacity: hovered ? 1 : 0 }}
      />

      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                   text-xl select-none border border-white/[0.07] transition-transform duration-200"
        style={{
          background: 'rgba(255,255,255,0.04)',
          transform: hovered && !reduced ? 'scale(1.15) rotate(-6deg)' : 'none',
        }}
      >
        {skill.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="font-bold text-sm text-white">{skill.label}</h4>
          <div
            className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full
                        ${skill.textColor} border ${skill.borderColor}
                        transition-all duration-200`}
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.6)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            ✓
          </div>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
          {skill.desc}
        </p>
      </div>

      <div
        className={`flex-shrink-0 self-center ${skill.textColor} transition-all duration-200`}
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-6px)' }}
      >
        <ChevronRight size={15} />
      </div>
    </motion.div>
  )
}

/* ── StatBadge ── */
function StatBadge({ value, label, gradient, gradientRaw, delay = 0, reduced }) {
  const [hovered, setHovered] = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.88, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: EASE_BACK }}
      whileHover={reduced ? {} : { y: -6, scale: 1.03 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-5 rounded-[22px] text-center border border-white/[0.06]
                 cursor-default overflow-hidden"
      style={{
        background: 'linear-gradient(145deg,rgba(13,20,42,0.95) 0%,rgba(8,10,20,0.98) 100%)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.3, duration: 0.9, ease: EASE_EXPO }}
        style={{ originX: 0.5 }}
        className={`absolute top-0 left-4 right-4 h-px rounded-full bg-gradient-to-r ${gradient}`}
      />

      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg,${gradientRaw})`,
          opacity: hovered ? 0.15 : 0.05,
        }}
      />

      <div className={`text-2xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-1.5`}>
        {value}
      </div>
      <div className="text-gray-500 text-[11px] font-semibold uppercase tracking-[0.18em]">
        {label}
      </div>

      {/* Shimmer bar — pattern identique Skills StatCard bottom bar */}
      <div
        className="ab-shimmer-bar h-px mx-auto mt-3 rounded-full"
        style={{
          width: hovered ? '60%' : '28%',
          opacity: hovered ? 1 : 0.4,
          background: `linear-gradient(90deg,${gradientRaw})`,
        }}
      />
    </motion.div>
  )
}

/* ── SectionTitle ── */
function SectionTitle({ icon: Icon, title, sub, gradient, iconGradient }) {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
      <div className="relative flex-shrink-0">
        <div className={`absolute inset-0 rounded-xl blur-md opacity-40 bg-gradient-to-br ${iconGradient}`} />
        <div className={`relative p-2.5 rounded-xl bg-gradient-to-br ${iconGradient} shadow-lg ring-1 ring-white/15`}>
          <Icon size={22} className="text-white" />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
        <p className="text-gray-500 text-xs mt-0.5">{sub}</p>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 40, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE_EXPO }}
          className={`h-0.5 mt-1.5 rounded-full bg-gradient-to-r ${gradient}`}
        />
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
   ABOUT — MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export default function About() {
  const reduced = useReducedMotion()

  const stats = [
    { value: '17/20', label: 'Mention Très Bien', gradient: 'from-yellow-400 to-orange-400', gradientRaw: '#fbbf24,#f97316' },
    { value: '3+',    label: 'Projets majeurs',   gradient: 'from-blue-400 to-cyan-400',     gradientRaw: '#60a5fa,#22d3ee' },
    { value: '2023',  label: 'Début formation',   gradient: 'from-purple-400 to-pink-400',   gradientRaw: '#c084fc,#f472b6' },
    { value: '3',     label: 'Langues',           gradient: 'from-emerald-400 to-teal-400',  gradientRaw: '#34d399,#14b8a6' },
  ]

  return (
    <>
      <StyleInject />

      <section
        id="about"
        className="relative py-36 overflow-hidden"
        style={{
          /*
           * ── Fond identique Skills.jsx ──
           * Transparent → laisse GlobalBackground (canvas fixed) visible
           * Légère couche sombre pour lisibilité du contenu
           */
          background: 'linear-gradient(180deg,rgba(2,8,23,0) 0%,rgba(2,8,23,.55) 40%,rgba(2,8,23,.62) 100%)',
        }}
      >
        {/* ── Dot grid — identique Skills.jsx ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle,rgba(148,163,184,.038) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* ── Vignette — identique Skills.jsx ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse 82% 68% at 50% 50%,transparent 38%,rgba(2,8,23,.52) 100%)',
          }}
        />

        {/* ── Ambient orbs — pattern identique Skills.jsx ── */}
        <div
          className={`ab-orb-a absolute -top-32 -left-32 w-[380px] h-[380px]
                      rounded-full blur-[88px] opacity-[0.06] pointer-events-none`}
          style={{ background: 'radial-gradient(circle,#1e40af,#6d28d9)' }}
          aria-hidden="true"
        />
        <div
          className={`ab-orb-b absolute -bottom-32 -right-32 w-[320px] h-[320px]
                      rounded-full blur-[88px] opacity-[0.05] pointer-events-none`}
          style={{ background: 'radial-gradient(circle,#7c3aed,#0891b2)' }}
          aria-hidden="true"
        />

        <div className="container relative mx-auto px-4 md:px-10 z-10 max-w-[1400px]">

          {/* ── HEADER ── */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.13 } } }}
            className="text-center mb-24"
          >
            {/* Badge — Sparkles avec classes CSS (pattern identique Skills sk-spin/sk-spin-r) */}
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10
                         border border-blue-500/18 bg-blue-500/[0.055] backdrop-blur-xl
                         text-blue-400 text-[10px] font-black uppercase tracking-[0.24em]
                         shadow-xl shadow-blue-900/20"
            >
              <Sparkles size={11} className={reduced ? '' : 'ab-spin'} />
              Qui suis-je
              <Sparkles size={11} className={reduced ? '' : 'ab-spin-r'} />
            </motion.div>

            {/* Title — classe ab-gt (pattern identique sk-gt) */}
            <motion.h2 variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-[88px] font-black tracking-tight mb-6 leading-[1.01]"
            >
              <span className="text-white">À </span>
              <span className="relative inline-block">
                <span
                  className={reduced ? 'text-transparent bg-clip-text' : 'ab-gt'}
                  style={{
                    backgroundImage: 'linear-gradient(90deg,#60a5fa 0%,#a78bfa 30%,#f472b6 60%,#60a5fa 100%)',
                  }}
                >
                  Propos
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
              <span className="text-white"> de Moi</span>
            </motion.h2>

            <motion.p variants={fadeUp}
              className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Passionné par la création de{' '}
              <span className="text-white font-semibold">solutions innovantes</span> et l'exploration des{' '}
              <span className="font-semibold"
                style={{ background: 'linear-gradient(90deg,#a78bfa,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                technologies émergentes
              </span>
            </motion.p>

            {/* Divider — pattern identique Skills footer divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 1.1, ease: EASE_EXPO }}
              className="mt-12 mx-auto flex items-center gap-4 max-w-[200px]"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/28 to-transparent" />
              {/* Star avec classe CSS (pattern identique sk-spin) */}
              <Star size={13} className={`text-blue-400/52 flex-shrink-0 ${reduced ? '' : 'ab-spin-slow'}`} />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/28 to-transparent" />
            </motion.div>
          </motion.div>

          {/* ── STATS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {stats.map((s, i) => (
              <StatBadge key={i} {...s} delay={i * 0.09} reduced={reduced} />
            ))}
          </div>

          {/* ── MAIN GRID ── */}
          <div className="grid xl:grid-cols-3 gap-8">

            {/* Colonne 1 */}
            <div className="xl:col-span-1 space-y-8">
              <motion.div
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={stagger(0.1, 0.15)}
                className="space-y-3"
              >
                <SectionTitle
                  icon={GraduationCap} title="Parcours Académique" sub="Formation & Diplômes"
                  gradient="from-blue-400 to-purple-500" iconGradient="from-blue-500 to-purple-600"
                />
                {EDUCATION.map((item, i) => (
                  <EducationCard key={i} item={item} index={i} reduced={reduced} />
                ))}
                <motion.div variants={fadeUp}
                  whileHover={reduced ? {} : { x: 4 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border
                             border-white/[0.07] transition-all duration-300 cursor-default"
                  style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}
                >
                  <MapPin size={14} className="text-red-400" />
                  <span className="text-gray-300 text-sm">Bouargoub, Nabeul, Tunisie</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={stagger(0.1, 0.12)}
                className="relative p-6 rounded-2xl border border-white/[0.06] space-y-4"
                style={{
                  background: 'linear-gradient(145deg,rgba(13,20,42,0.92) 0%,rgba(8,10,20,0.96) 100%)',
                  backdropFilter: 'blur(24px)',
                }}
              >
                <SectionTitle
                  icon={Target} title="Compétences Transversales" sub="Soft skills & mindset"
                  gradient="from-amber-400 to-orange-400" iconGradient="from-amber-500 to-orange-500"
                />
                {SOFT_SKILLS.map((s, i) => (
                  <SoftSkillBar key={i} skill={s} index={i} reduced={reduced} />
                ))}
              </motion.div>
            </div>

            {/* Colonne 2 */}
            <div className="xl:col-span-2 space-y-8">
              <motion.div
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={stagger(0.1, 0.12)}
              >
                <SectionTitle
                  icon={Globe} title="Langues Maîtrisées" sub="Compétences linguistiques"
                  gradient="from-emerald-400 to-cyan-400" iconGradient="from-emerald-500 to-cyan-500"
                />
                <div className="grid sm:grid-cols-3 gap-4">
                  {LANGUAGES.map((lang, i) => (
                    <LanguageCard key={i} lang={lang} index={i} reduced={reduced} />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={stagger(0.1, 0.1)}
              >
                <SectionTitle
                  icon={Code2} title="Centres d'Intérêt & Spécialisations" sub="Domaines de passion technique"
                  gradient="from-purple-400 to-pink-400" iconGradient="from-purple-500 to-pink-500"
                />
                <div className="grid sm:grid-cols-1 gap-3">
                  {INTERESTS.map((item, i) => (
                    <InterestCard key={i} item={item} index={i} reduced={reduced} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Footer divider — identique Skills.jsx ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.82, ease: EASE_EXPO }}
            className="mt-16 mx-auto flex items-center gap-3 max-w-[130px]"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/22 to-transparent" />
            <Star size={9} className={`text-indigo-400/32 flex-shrink-0 ${reduced ? '' : 'ab-spin'}`} />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/22 to-transparent" />
          </motion.div>
        </div>
      </section>
    </>
  )
}