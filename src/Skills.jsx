// Skills.jsx — Ultra Professional · Cohérent GlobalBackground · Zero Lag
import { useRef, useState, useEffect, useMemo, memo, useCallback } from "react"
import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion"
import {
  SiTailwindcss, SiPhp, SiMongodb, SiOracle, SiSqlite,
  SiMysql, SiExpress, SiHtml5, SiCss3, SiTypescript,
  SiJavascript, SiFirebase, SiVuedotjs, SiSupabase,
  SiReact, SiDocker, SiNextdotjs, SiOpencv,
  SiRaspberrypi, SiNumpy, SiSpringboot, SiFastapi, SiDart,
} from "react-icons/si"
import { FaNodeJs, FaReact, FaGitAlt, FaGithub, FaTools } from "react-icons/fa"
import { BiLogoPostgresql } from "react-icons/bi"
import { TbApi } from "react-icons/tb"
import {
  Code, Database, Smartphone, Brain, Cpu,
  Sparkles, ChevronDown, Layers, Server,
  Settings, Star, Globe, Zap,
} from "lucide-react"

import pythonImg  from "./assets/images/python.png"
import cppImg     from "./assets/images/c-.png"
import flutterImg from "./assets/images/flutter.png"
import vscodeImg  from "./assets/images/vscode.png"
import linuxImg   from "./assets/images/linux.png"
import javaImg    from "./assets/images/java.png"

/* ═══════════════════════════════════════════════════════════
   CSS INJECTION — Palette identique à GlobalBackground
   Bleu #3b82f6 · Violet #8b5cf6 · Cyan #06b6d4 · Indigo #6366f1
═══════════════════════════════════════════════════════════ */
const STYLES = `
  /* ── Keyframes ── */
  @keyframes sk-grad {
    0%,100% { background-position: 0% 50% }
    50%      { background-position: 100% 50% }
  }
  @keyframes sk-orb-drift-a {
    0%,100% { transform: translate(0,0) scale(1) }
    33%     { transform: translate(28px,-18px) scale(1.06) }
    66%     { transform: translate(-14px,22px) scale(0.97) }
  }
  @keyframes sk-orb-drift-b {
    0%,100% { transform: translate(0,0) scale(1) }
    40%     { transform: translate(-22px,16px) scale(1.05) }
    75%     { transform: translate(18px,-12px) scale(0.96) }
  }
  @keyframes sk-spin-cw  { to { transform: rotate(360deg) } }
  @keyframes sk-spin-ccw { to { transform: rotate(-360deg) } }
  @keyframes sk-ping-ring {
    0%   { transform: scale(1); opacity: .55 }
    100% { transform: scale(2.1); opacity: 0 }
  }
  @keyframes sk-sweep {
    0%   { left: -80% }
    100% { left: 130% }
  }
  @keyframes sk-float {
    0%,100% { transform: translateY(0) }
    50%     { transform: translateY(-5px) }
  }
  @keyframes sk-holo-border {
    0%,100% { opacity: .25 }
    50%     { opacity: .65 }
  }
  @keyframes sk-scan {
    0%   { transform: translateY(-100%) }
    100% { transform: translateY(100vh) }
  }

  /* ── Gradient animated text ── */
  .sk-gt {
    background-size: 280% 280%;
    animation: sk-grad 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Orbs ── */
  .sk-orb-a { animation: sk-orb-drift-a 12s ease-in-out infinite }
  .sk-orb-b { animation: sk-orb-drift-b 15s ease-in-out infinite }

  /* ── Spin ── */
  .sk-spin   { animation: sk-spin-cw  18s linear infinite }
  .sk-spin-r { animation: sk-spin-ccw 18s linear infinite }
  .sk-float  { animation: sk-float 4s ease-in-out infinite }

  /* ── Ping ── */
  .sk-ping { animation: sk-ping-ring 2.6s ease-out infinite }

  /* ── Holo border pulse ── */
  .sk-holo { animation: sk-holo-border 3s ease-in-out infinite }

  /* ══════════════════════════════════════════
     SKILL CARD — compact, GPU-only hover
  ══════════════════════════════════════════ */
  .sk-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 11px 8px 10px;
    gap: 7px;
    border-radius: 13px;
    border: 1px solid rgba(255,255,255,.052);
    cursor: default;
    user-select: none;
    overflow: hidden;
    /* GPU-only transitions */
    transition:
      transform .26s cubic-bezier(.34,1.56,.64,1),
      box-shadow .26s ease,
      border-color .22s ease;
    will-change: transform;
    background: linear-gradient(
      150deg,
      rgba(10,16,35,.97) 0%,
      rgba(6,8,18,.99)  100%
    );
    box-shadow:
      0 2px 10px rgba(0,0,0,.38),
      inset 0 1px 0 rgba(255,255,255,.022);
  }
  .sk-card:hover {
    transform: translateY(-6px) scale(1.055);
    border-color: rgba(99,102,241,.28);
    box-shadow:
      0 16px 36px rgba(0,0,0,.52),
      0  0   20px rgba(99,102,241,.08),
      inset 0 1px 0 rgba(255,255,255,.04);
  }
  .sk-card:active {
    transform: translateY(-1px) scale(.95);
    transition-duration: .1s;
  }

  /* AI variant */
  .sk-card-ai {
    background: linear-gradient(
      150deg,
      rgba(18,9,48,.96) 0%,
      rgba(12,6,34,.99) 100%
    );
    border-color: rgba(139,92,246,.13);
    box-shadow:
      0 2px 12px rgba(109,40,217,.13),
      inset 0 1px 0 rgba(167,139,250,.04);
  }
  .sk-card-ai:hover {
    border-color: rgba(139,92,246,.32);
    box-shadow:
      0 16px 36px rgba(109,40,217,.22),
      0  0   24px rgba(139,92,246,.1),
      inset 0 1px 0 rgba(167,139,250,.06);
  }

  /* Sweep shimmer */
  .sk-card::before {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 38%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,.062),
      transparent
    );
    transform: skewX(-14deg);
    left: -80%;
    pointer-events: none;
  }
  .sk-card:hover::before {
    animation: sk-sweep .5s ease forwards;
  }

  /* Top holographic accent */
  .sk-card::after {
    content: '';
    position: absolute;
    top: 0; left: 18%; right: 18%;
    height: 1px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(99,102,241,.55),
      transparent
    );
    opacity: 0;
    transition: opacity .24s ease;
  }
  .sk-card:hover::after { opacity: 1 }
  .sk-card-ai::after {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(167,139,250,.65),
      transparent
    );
  }

  /* Icon box */
  .sk-ico {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,255,255,.055);
    border: 1px solid rgba(255,255,255,.058);
    transition:
      background .24s ease,
      transform  .26s cubic-bezier(.34,1.56,.64,1),
      box-shadow .24s ease;
    flex-shrink: 0;
  }
  .sk-card:hover .sk-ico {
    background: rgba(99,102,241,.14);
    transform: rotate(7deg) scale(1.14);
    box-shadow: 0 0 12px rgba(99,102,241,.2);
  }
  .sk-ico-ai {
    background: rgba(139,92,246,.17);
    border-color: rgba(139,92,246,.22);
  }
  .sk-card-ai:hover .sk-ico-ai {
    background: rgba(139,92,246,.3);
    box-shadow: 0 0 14px rgba(139,92,246,.25);
  }

  /* Label */
  .sk-lbl {
    font-size: 9.5px;
    font-weight: 600;
    color: rgba(255,255,255,.68);
    text-align: center;
    line-height: 1.2;
    letter-spacing: .025em;
    transition: color .22s ease;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 2px;
  }
  .sk-card:hover .sk-lbl { color: rgba(255,255,255,.96) }

  /* Bottom indicator */
  .sk-bar {
    height: 2px;
    border-radius: 999px;
    background: rgba(99,102,241,.35);
    width: 14px;
    transition:
      width   .38s cubic-bezier(.16,1,.3,1),
      background .26s ease,
      opacity .26s ease;
  }
  .sk-card:hover .sk-bar {
    width: 26px;
    background: rgba(99,102,241,.75);
  }
  .sk-card-ai .sk-bar  { background: rgba(139,92,246,.42) }
  .sk-card-ai:hover .sk-bar { background: rgba(167,139,250,.8) }

  /* ══════════════════════════════════════════
     STAT CARD
  ══════════════════════════════════════════ */
  .sk-stat {
    transition:
      transform .3s cubic-bezier(.34,1.56,.64,1),
      box-shadow .3s ease;
    will-change: transform;
  }
  .sk-stat:hover {
    transform: translateY(-7px) scale(1.038);
  }

  /* ══════════════════════════════════════════
     FILTER BUTTON
  ══════════════════════════════════════════ */
  .sk-flt {
    transition:
      transform .22s cubic-bezier(.34,1.56,.64,1),
      background .18s ease,
      border-color .18s ease,
      color .18s ease;
    will-change: transform;
  }
  .sk-flt:hover  { transform: translateY(-2px) scale(1.06) }
  .sk-flt:active { transform: scale(.92); transition-duration: .08s }

  /* ══════════════════════════════════════════
     CATEGORY
  ══════════════════════════════════════════ */
  .sk-cat-ico {
    transition: transform .3s cubic-bezier(.34,1.56,.64,1);
    will-change: transform;
  }
  .sk-cat-ico:hover { transform: rotate(10deg) scale(1.14) }

  /* ══════════════════════════════════════════
     COLLAPSE
  ══════════════════════════════════════════ */
  .sk-collapse {
    overflow: hidden;
    will-change: height;
    transition:
      height  .46s cubic-bezier(.16,1,.3,1),
      opacity .36s cubic-bezier(.16,1,.3,1);
  }

  .sk-chev {
    display: block;
    transition: transform .4s cubic-bezier(.16,1,.3,1);
  }

  /* ── Bottom bar expand ── */
  .sk-expand-bar {
    transition: width .44s cubic-bezier(.16,1,.3,1), opacity .3s ease;
  }

  /* ══════════════════════════════════════════
     Reduced motion
  ══════════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .sk-gt, .sk-orb-a, .sk-orb-b, .sk-spin, .sk-spin-r,
    .sk-float, .sk-ping, .sk-holo, .sk-card, .sk-stat,
    .sk-flt, .sk-cat-ico {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`

function StyleInject() {
  useEffect(() => {
    const ID = "sk-pro-v5"
    if (document.getElementById(ID)) return
    const el = document.createElement("style")
    el.id = ID
    el.textContent = STYLES
    document.head.appendChild(el)
    return () => document.getElementById(ID)?.remove()
  }, [])
  return null
}

/* ═══════════════════════════════════════════════════════════
   SVG ICONS
═══════════════════════════════════════════════════════════ */
const YOLOv8Icon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="10" fill="#FF6B35" fillOpacity=".15"/>
    <rect x="6" y="10" width="36" height="28" rx="3" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <path d="M6 18V10H14M34 10H42V18M6 30V38H14M34 38H42V30"
      stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round"/>
    <text x="24" y="22" textAnchor="middle" fontSize="7" fontWeight="800"
      fill="#FF6B35" fontFamily="monospace">YOLO</text>
    <text x="24" y="33" textAnchor="middle" fontSize="8" fontWeight="900"
      fill="#FF8C55" fontFamily="monospace">v8</text>
  </svg>
)
const TFLiteIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="10" fill="#FF6F00" fillOpacity=".15"/>
    <polygon points="24,5 40,14 40,32 24,41 8,32 8,14"
      stroke="#FF6F00" strokeWidth="2" fill="#FF6F00" fillOpacity=".07"/>
    <path d="M26 11L18 26H23L20 38L30 21H25Z" fill="#FF6F00"/>
    <text x="14" y="46" fontSize="6" fontWeight="800"
      fill="#FF6F00" fontFamily="monospace">TFLite</text>
  </svg>
)
const IoTIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="10" fill="#00BCD4" fillOpacity=".12"/>
    <rect x="10" y="15" width="28" height="18" rx="3"
      stroke="#00BCD4" strokeWidth="1.8" fill="#00BCD4" fillOpacity=".07"/>
    <rect x="18" y="21" width="12" height="7" rx="2"
      stroke="#00BCD4" strokeWidth="1.4" fill="#00BCD4" fillOpacity=".18"/>
    {[14,19,24,29,34].map(x => (
      <g key={x}>
        <line x1={x} y1="15" x2={x} y2="9"  stroke="#00BCD4" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1={x} y1="33" x2={x} y2="39" stroke="#00BCD4" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    ))}
  </svg>
)
const MediaPipeIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="10" fill="#00BFA5" fillOpacity=".15"/>
    <circle cx="24" cy="24" r="10" stroke="#00BFA5" strokeWidth="1.8" fill="none"/>
    {[[24,14],[24,34],[14,24],[34,24],[17,17],[31,17],[17,31],[31,31]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r={i<4?2.5:2}
        fill="#00BFA5" opacity={i<4?1:.7}/>
    ))}
    <circle cx="24" cy="24" r="3" fill="#00BFA5" opacity=".4"/>
  </svg>
)
const UARTIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="10" fill="#F59E0B" fillOpacity=".12"/>
    <rect x="4"  y="20" width="9" height="8" rx="2"
      stroke="#F59E0B" strokeWidth="1.8" fill="#F59E0B" fillOpacity=".1"/>
    <rect x="35" y="20" width="9" height="8" rx="2"
      stroke="#F59E0B" strokeWidth="1.8" fill="#F59E0B" fillOpacity=".1"/>
    <path d="M13 22H20M13 26H20M28 22H35M28 26H35"
      stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round"/>
    <rect x="20" y="18" width="8" height="12" rx="2"
      stroke="#F59E0B" strokeWidth="1.4" fill="#F59E0B" fillOpacity=".07"/>
    <text x="24" y="44" textAnchor="middle" fontSize="5" fontWeight="800"
      fill="#F59E0B" fontFamily="monospace">UART</text>
  </svg>
)
const JWTIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="10" fill="#E11D48" fillOpacity=".12"/>
    <path d="M24 5L38 13.5V31.5L24 40L10 31.5V13.5Z"
      stroke="#E11D48" strokeWidth="1.8" fill="none"/>
    <circle cx="24" cy="23" r="5"
      fill="#E11D48" fillOpacity=".2" stroke="#E11D48" strokeWidth="1.4"/>
    <text x="24" y="26" textAnchor="middle" fontSize="5" fontWeight="900"
      fill="#E11D48" fontFamily="monospace">JWT</text>
  </svg>
)
const AgileIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="10" fill="#8B5CF6" fillOpacity=".12"/>
    <circle cx="24" cy="24" r="13"
      stroke="#8B5CF6" strokeWidth="1.5" fill="none" strokeDasharray="4 3"/>
    <path d="M24 11A13 13 0 0 1 37 24"
      stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M34 21L37 24L34 27"
      stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="24" y="26" textAnchor="middle" fontSize="4.5" fontWeight="800"
      fill="#8B5CF6" fontFamily="monospace">AGILE</text>
  </svg>
)

/* ═══════════════════════════════════════════════════════════
   STABLE ICONS
═══════════════════════════════════════════════════════════ */
const JavaIcon    = () => <img src={javaImg}    alt="Java"    className="w-5 h-5 object-contain" loading="lazy"/>
const PythonIcon  = () => <img src={pythonImg}  alt="Python"  className="w-5 h-5 object-contain" loading="lazy"/>
const CppIcon     = () => <img src={cppImg}     alt="C/C++"   className="w-5 h-5 object-contain" loading="lazy"/>
const FlutterIcon = () => <img src={flutterImg} alt="Flutter" className="w-5 h-5 object-contain" loading="lazy"/>
const LinuxIcon   = () => <img src={linuxImg}   alt="Linux"   className="w-5 h-5 rounded object-contain" loading="lazy"/>
const VscodeIcon  = () => <img src={vscodeImg}  alt="VS Code" className="w-5 h-5 rounded object-contain" loading="lazy"/>
const RpiIcon     = ({ className }) => <SiRaspberrypi className={className}/>
const UARTWrap    = ({ className }) => <UARTIcon   className={className}/>
const IoTWrap     = ({ className }) => <IoTIcon    className={className}/>
const YOLOWrap    = ({ className }) => <YOLOv8Icon className={className}/>
const OpenCVWrap  = ({ className }) => <SiOpencv   className={className}/>
const TFLiteWrap  = ({ className }) => <TFLiteIcon className={className}/>
const MediaWrap   = ({ className }) => <MediaPipeIcon className={className}/>
const JWTWrap     = ({ className }) => <JWTIcon    className={className}/>
const AgileWrap   = ({ className }) => <AgileIcon  className={className}/>

/* ═══════════════════════════════════════════════════════════
   MOTION — GPU only (opacity + translateY + scale)
   Palette: indigo/violet/cyan (= GlobalBackground)
═══════════════════════════════════════════════════════════ */
const EXPO = [0.16, 1, 0.3, 1]
const BACK = [0.34, 1.56, 0.64, 1]

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EXPO } },
}
const fadeDown = {
  hidden:  { opacity: 0, y: -14 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.52, ease: EXPO } },
}
const stagger = (d = 0.04) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.042, delayChildren: d } },
})
const cardVar = {
  hidden:  { opacity: 0, y: 12, scale: 0.93 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.36, ease: BACK } },
}

/* ═══════════════════════════════════════════════════════════
   COUNT UP
═══════════════════════════════════════════════════════════ */
function CountUp({ target, suffix = "" }) {
  const [val, setVal] = useState(0)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-20px" })
  const raf    = useRef(null)

  useEffect(() => {
    if (!inView) return
    const t0 = performance.now(), dur = 1600
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 4)) * target))
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [inView, target])

  return <span ref={ref}>{val}{suffix}</span>
}

/* ═══════════════════════════════════════════════════════════
   STAT CARD — Horizontal compact · Holographic
═══════════════════════════════════════════════════════════ */
const StatCard = memo(function StatCard({
  value, suffix = "", label, sublabel,
  gradient, gradientRaw, icon: Icon, delay = 0, isText = false
}) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-20px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26, scale: 0.88 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.55, ease: BACK }}
      className="sk-stat group relative overflow-hidden rounded-2xl
                 border border-white/[0.058] cursor-default"
      style={{
        background: "linear-gradient(150deg,rgba(11,17,40,.97),rgba(6,8,18,.99))",
        boxShadow:  "0 4px 20px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.032)",
      }}
    >
      {/* Animated top accent — identique palette GlobalBackground */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.2, duration: 0.72, ease: EXPO }}
        style={{ originX: 0.5 }}
        className={`absolute top-0 left-4 right-4 h-[1.5px] rounded-full
                    bg-gradient-to-r ${gradient}`}
      />

      {/* Holographic corner glow */}
      <div
        className="absolute -top-7 -right-7 w-24 h-24 rounded-full blur-2xl
                   pointer-events-none opacity-[0.065] group-hover:opacity-[0.18]
                   transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg,${gradientRaw})` }}
      />

      {/* Ping ring */}
      <div
        className="sk-ping absolute inset-0 rounded-2xl border border-white/[0.065] pointer-events-none"
        style={{ animationDelay: `${delay + 0.4}s` }}
      />

      {/* Content */}
      <div className="relative z-10 p-4 flex items-center gap-3">

        {/* Icon — holographic box */}
        <div className="relative flex-shrink-0">
          <div
            className="absolute inset-0 rounded-xl blur-md opacity-0
                       group-hover:opacity-45 transition-opacity duration-400"
            style={{ background: `linear-gradient(135deg,${gradientRaw})` }}
          />
          <div
            className="relative p-2.5 rounded-xl border border-white/[0.068]
                       group-hover:border-white/[0.14] transition-colors duration-300"
            style={{
              background: `linear-gradient(135deg,
                ${gradientRaw.split(",")[0]}14,
                ${gradientRaw.split(",").pop().trim()}09)`,
            }}
          >
            <Icon size={17} className="text-white/78 group-hover:text-white/95
                                       transition-colors duration-300"/>
          </div>
        </div>

        {/* Value + label */}
        <div className="flex-1 min-w-0">
          <div
            className="font-black tracking-tight leading-none tabular-nums
                       group-hover:scale-[1.04] transition-transform duration-280 origin-left"
            style={{
              fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)",
              backgroundImage: `linear-gradient(135deg,${gradientRaw})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {isText
              ? <>{value}<span style={{ fontSize: ".82rem", opacity: .78 }}>{suffix}</span></>
              : <CountUp target={value} suffix={suffix}/>
            }
          </div>
          <p className="mt-0.5 text-[8.5px] font-bold uppercase tracking-[0.18em]
                        text-gray-500 group-hover:text-gray-400
                        transition-colors duration-280 leading-none">
            {label}
          </p>
          {sublabel && (
            <p className="mt-0.5 text-[7.5px] text-gray-700 tracking-wide leading-none">
              {sublabel}
            </p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-4 pb-3">
        <div
          className={`sk-expand-bar h-px rounded-full bg-gradient-to-r ${gradient}
                      opacity-28 group-hover:opacity-72`}
          style={{ width: "20%" }}
          ref={el => {
            if (!el) return
            const card = el.closest(".sk-stat")
            if (!card || card._sk) return
            card._sk = true
            card.addEventListener("mouseenter", () => { el.style.width = "62%" })
            card.addEventListener("mouseleave", () => { el.style.width = "20%" })
          }}
        />
      </div>
    </motion.div>
  )
})

/* ═══════════════════════════════════════════════════════════
   COLLAPSIBLE
═══════════════════════════════════════════════════════════ */
function Collapsible({ open, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open) {
      el.style.height  = "0px"
      el.style.opacity = "0"
      el.getBoundingClientRect()
      el.style.height  = `${el.scrollHeight}px`
      el.style.opacity = "1"
      const done = () => {
        el.style.height = "auto"
        el.removeEventListener("transitionend", done)
      }
      el.addEventListener("transitionend", done)
    } else {
      el.style.height  = `${el.scrollHeight}px`
      el.getBoundingClientRect()
      el.style.height  = "0px"
      el.style.opacity = "0"
    }
  }, [open])
  return (
    <div ref={ref} className="sk-collapse" style={{ height: "auto", opacity: 1 }}>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   SKILL CARD — Pure CSS, compact & holographic
═══════════════════════════════════════════════════════════ */
const SkillCard = memo(function SkillCard({ icon: Icon, label, color, isAI = false }) {
  return (
    <motion.div variants={cardVar}>
      <div className={`sk-card${isAI ? " sk-card-ai" : ""}`}>
        <div className={`sk-ico${isAI ? " sk-ico-ai" : ""} ${color}`}>
          <Icon className="w-[18px] h-[18px]"/>
        </div>
        <span className="sk-lbl">{label}</span>
        <div className="sk-bar"/>
      </div>
    </motion.div>
  )
})

/* ═══════════════════════════════════════════════════════════
   SKILL CATEGORY — Holographic panel
═══════════════════════════════════════════════════════════ */
const SkillCategory = memo(function SkillCategory({
  title, children, icon: Icon, color,
  accentGradient, isAI = false, badge, count
}) {
  const [open, setOpen] = useState(true)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EXPO }}
      className={`relative rounded-xl overflow-hidden border
        ${isAI ? "border-violet-500/[0.14]" : "border-white/[0.042]"}`}
      style={{
        background: isAI
          ? "linear-gradient(150deg,rgba(28,9,68,.64),rgba(16,6,44,.56),rgba(7,4,18,.7))"
          : "linear-gradient(150deg,rgba(9,13,30,.95),rgba(6,7,15,.97))",
        boxShadow: isAI
          ? "0 6px 28px rgba(88,28,163,.14), inset 0 1px 0 rgba(167,139,250,.048)"
          : "0 4px 18px rgba(0,0,0,.32), inset 0 1px 0 rgba(255,255,255,.018)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Top holographic accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.07, duration: 0.78, ease: EXPO }}
        style={{ originX: 0 }}
        className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r ${accentGradient}`}
      />

      {/* Corner ambient */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none
                    blur-3xl opacity-[0.038]
                    ${isAI ? "bg-violet-400" : "bg-indigo-400"}`}
        style={{ transform: "translate(36%,-36%)" }}
        aria-hidden
      />

      {/* AI orbs — palette GlobalBackground */}
      {isAI && (
        <>
          <div className="sk-orb-a absolute -top-10 -right-10 w-48 h-48 rounded-full
                          bg-violet-500/[0.1] blur-3xl pointer-events-none" aria-hidden/>
          <div className="sk-orb-b absolute -bottom-8 -left-8 w-36 h-36 rounded-full
                          bg-indigo-500/[0.08] blur-3xl pointer-events-none" aria-hidden/>
        </>
      )}

      {/* ── Header — compact */}
      <div className="flex items-center gap-3 px-4 py-3">

        {/* Category icon */}
        <div
          className={`sk-cat-ico relative p-2.5 rounded-xl flex-shrink-0 cursor-default
            ${isAI
              ? "bg-gradient-to-br from-violet-700/82 to-indigo-800/82 border border-violet-400/16"
              : "bg-gradient-to-br from-slate-700/52 to-slate-800/48 border border-white/[0.052]"
            }`}
          style={{
            boxShadow: isAI
              ? "0 2px 12px rgba(109,40,217,.22)"
              : "0 2px 8px rgba(0,0,0,.28)",
          }}
        >
          <Icon className={`w-4 h-4 ${color}`}/>
          {isAI && (
            <div className="sk-ping sk-holo absolute inset-0 rounded-xl
                            border border-violet-400/26" aria-hidden/>
          )}
        </div>

        {/* Title + badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[12px] font-black text-white/92 tracking-tight leading-none">
              {title}
            </h3>

            {badge && (
              <span className="relative overflow-hidden px-2 py-[3px] rounded-full
                               text-[7px] font-black text-violet-200/90 uppercase
                               tracking-[0.18em] border border-violet-400/26">
                <span className="relative z-10">✦ {badge}</span>
                <span className="absolute inset-0 bg-gradient-to-r
                                 from-violet-500/16 to-indigo-500/16"/>
              </span>
            )}

            {count !== undefined && (
              <span className="text-[7px] font-medium text-gray-600
                               border border-white/[0.04] bg-white/[0.022]
                               px-1.5 py-[2px] rounded-full">
                {count}
              </span>
            )}
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ delay: 0.2, duration: 0.58, ease: EXPO }}
            className={`mt-1.5 h-[1.5px] rounded-full bg-gradient-to-r ${accentGradient}`}
          />
        </div>

        {/* Toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          className="flex-shrink-0 p-1.5 rounded-lg
                     border border-white/[0.048] text-gray-600
                     hover:text-white hover:bg-white/[0.052]
                     hover:border-white/[0.09] active:scale-90
                     transition-all duration-180"
          style={{ background: "rgba(255,255,255,.016)" }}
          aria-label={open ? "Réduire" : "Développer"}
        >
          <ChevronDown
            size={13}
            className="sk-chev"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </div>

      {/* Grid */}
      <Collapsible open={open}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          variants={stagger(0.028)}
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6
                     lg:grid-cols-8 xl:grid-cols-10 gap-2 px-4 pb-4 pt-1"
        >
          {children}
        </motion.div>
      </Collapsible>
    </motion.section>
  )
})

/* ═══════════════════════════════════════════════════════════
   FILTER BAR — Spring pill animation
═══════════════════════════════════════════════════════════ */
const FILTERS = [
  { id: "all",      label: "Tout",      icon: Layers,     col: "text-white"        },
  { id: "lang",     label: "Langages",  icon: Code,       col: "text-blue-400"     },
  { id: "frontend", label: "Frontend",  icon: Smartphone, col: "text-cyan-400"     },
  { id: "backend",  label: "Backend",   icon: Server,     col: "text-emerald-400"  },
  { id: "embedded", label: "Embarqué",  icon: Cpu,        col: "text-orange-400"   },
  { id: "ai",       label: "IA / ML",   icon: Brain,      col: "text-violet-400"   },
  { id: "db",       label: "Databases", icon: Database,   col: "text-sky-400"      },
  { id: "tools",    label: "DevOps",    icon: Settings,   col: "text-yellow-400"   },
]

const FilterBar = memo(function FilterBar({ active, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: EXPO }}
      className="flex flex-wrap justify-center gap-1.5 mb-7"
    >
      {FILTERS.map((f, i) => {
        const on  = active === f.id
        const Ico = f.icon
        return (
          <motion.button
            key={f.id}
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.032, duration: 0.33, ease: EXPO }}
            onClick={() => onChange(f.id)}
            className={`sk-flt relative flex items-center gap-1.5 px-3 py-1.5
                        rounded-full text-[9.5px] font-semibold border
                        outline-none overflow-hidden
                        ${on
                          ? "border-indigo-400/18 text-white"
                          : "border-white/[0.038] text-gray-500 hover:text-gray-300 hover:border-white/[0.07]"
                        }`}
            style={on ? {
              background: "linear-gradient(135deg,rgba(99,102,241,.1),rgba(99,102,241,.04))",
              boxShadow: "0 2px 10px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.045)",
            } : { background: "rgba(255,255,255,.009)" }}
          >
            {on && (
              <motion.span
                layoutId="sk-pill"
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  background: "linear-gradient(135deg,rgba(99,102,241,.09),rgba(99,102,241,.025))",
                }}
                transition={{ type: "spring", stiffness: 460, damping: 38 }}
              />
            )}
            <Ico size={10} className={on ? f.col : ""}/>
            <span className={on ? f.col : ""}>{f.label}</span>
            {on && (
              <motion.span
                layoutId="sk-dot"
                className="w-1 h-1 rounded-full bg-indigo-400/55"
                transition={{ type: "spring", stiffness: 460, damping: 38 }}
              />
            )}
          </motion.button>
        )
      })}
    </motion.div>
  )
})

/* ═══════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════ */
export default function Skills() {
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState("all")

  const categories = useMemo(() => [
    {
      id: "lang", title: "Langages de Programmation",
      icon: Code, color: "text-blue-400",
      accentGradient: "from-blue-500 via-indigo-500 to-cyan-400",
      skills: [
        { icon: JavaIcon,     label: "Java",       color: "text-red-400"    },
        { icon: PythonIcon,   label: "Python",     color: "text-yellow-400" },
        { icon: SiJavascript, label: "JavaScript", color: "text-yellow-400" },
        { icon: SiTypescript, label: "TypeScript", color: "text-blue-400"   },
        { icon: SiPhp,        label: "PHP",        color: "text-purple-400" },
        { icon: SiDart,       label: "Dart",       color: "text-cyan-400"   },
        { icon: CppIcon,      label: "C / C++",    color: "text-blue-500"   },
      ],
    },
    {
      id: "frontend", title: "Frontend & Mobile",
      icon: Smartphone, color: "text-cyan-400",
      accentGradient: "from-cyan-400 via-teal-400 to-blue-500",
      skills: [
        { icon: SiReact,       label: "React",     color: "text-cyan-400"   },
        { icon: SiNextdotjs,   label: "Next.js",   color: "text-white"      },
        { icon: SiTailwindcss, label: "Tailwind",  color: "text-cyan-400"   },
        { icon: SiVuedotjs,    label: "Vue.js",    color: "text-green-400"  },
        { icon: FaReact,       label: "RN",        color: "text-blue-400"   },
        { icon: FlutterIcon,   label: "Flutter",   color: "text-blue-300"   },
        { icon: SiHtml5,       label: "HTML5",     color: "text-orange-500" },
        { icon: SiCss3,        label: "CSS3",      color: "text-blue-500"   },
      ],
    },
    {
      id: "backend", title: "Backend & API",
      icon: Server, color: "text-emerald-400",
      accentGradient: "from-emerald-400 via-green-400 to-teal-400",
      skills: [
        { icon: FaNodeJs,     label: "Node.js",  color: "text-green-500"  },
        { icon: SiExpress,    label: "Express",  color: "text-gray-300"   },
        { icon: SiSpringboot, label: "Spring",   color: "text-green-400"  },
        { icon: SiFastapi,    label: "FastAPI",  color: "text-teal-400"   },
        { icon: TbApi,        label: "REST API", color: "text-gray-300"   },
        { icon: JWTWrap,      label: "JWT",      color: "text-rose-400"   },
      ],
    },
    {
      id: "embedded", title: "Embarqué & IoT",
      icon: Cpu, color: "text-orange-400",
      accentGradient: "from-orange-400 via-amber-400 to-yellow-400",
      skills: [
        { icon: RpiIcon,  label: "Raspberry Pi", color: "text-red-400"   },
        { icon: UARTWrap, label: "UART/PPP",     color: "text-amber-400" },
        { icon: IoTWrap,  label: "GSM/GPRS",     color: "text-cyan-300"  },
      ],
    },
    {
      id: "ai", title: "Intelligence Artificielle & ML",
      icon: Brain, color: "text-violet-300",
      accentGradient: "from-violet-500 via-purple-400 to-fuchsia-500",
      isAI: true, badge: "PFE",
      skills: [
        { icon: PythonIcon,  label: "Python",    color: "text-blue-400"   },
        { icon: YOLOWrap,    label: "YOLOv8",   color: "text-orange-400" },
        { icon: OpenCVWrap,  label: "OpenCV",   color: "text-green-400"  },
        { icon: TFLiteWrap,  label: "TFLite",   color: "text-amber-400"  },
        { icon: SiNumpy,     label: "NumPy",    color: "text-blue-400"   },
        { icon: MediaWrap,   label: "MediaPipe",color: "text-teal-400"   },
      ],
    },
    {
      id: "db", title: "Bases de Données",
      icon: Database, color: "text-sky-400",
      accentGradient: "from-sky-400 via-blue-400 to-indigo-500",
      skills: [
        { icon: BiLogoPostgresql, label: "PostgreSQL", color: "text-blue-400"   },
        { icon: SiMongodb,        label: "MongoDB",    color: "text-green-500"  },
        { icon: SiMysql,          label: "MySQL",      color: "text-blue-400"   },
        { icon: SiSqlite,         label: "SQLite",     color: "text-blue-300"   },
        { icon: SiFirebase,       label: "Firebase",   color: "text-yellow-500" },
        { icon: SiSupabase,       label: "Supabase",   color: "text-green-400"  },
        { icon: SiOracle,         label: "Oracle",     color: "text-red-500"    },
      ],
    },
    {
      id: "tools", title: "DevOps & Outils",
      icon: FaTools, color: "text-yellow-400",
      accentGradient: "from-yellow-400 via-amber-400 to-orange-400",
      skills: [
        { icon: FaGitAlt,  label: "Git",       color: "text-orange-500" },
        { icon: FaGithub,  label: "GitHub",    color: "text-gray-300"   },
        { icon: SiDocker,  label: "Docker",    color: "text-blue-400"   },
        { icon: LinuxIcon, label: "Linux",     color: "text-yellow-400" },
        { icon: VscodeIcon,label: "VS Code",   color: "text-blue-400"   },
        { icon: SiOracle,  label: "Oracle DB", color: "text-red-400"    },
        { icon: AgileWrap, label: "Agile",     color: "text-purple-400" },
      ],
    },
  ], [])

  const visible = filter === "all" ? categories : categories.filter(c => c.id === filter)
  const total   = useMemo(() => categories.reduce((s, c) => s + c.skills.length, 0), [categories])

  const stats = useMemo(() => [
    {
      value: total, suffix: "+", label: "Technologies", sublabel: "maîtrisées",
      gradient: "from-blue-400 via-cyan-400 to-blue-500",
      gradientRaw: "#60a5fa, #22d3ee, #3b82f6",
      icon: Code, delay: 0.05, isText: false,
    },
    {
      value: 7, suffix: "", label: "Catégories", sublabel: "de compétences",
      gradient: "from-violet-400 via-purple-400 to-indigo-500",
      gradientRaw: "#a78bfa, #c084fc, #6366f1",
      icon: Layers, delay: 0.11, isText: false,
    },
    {
      value: "Full", suffix: "-Stack", label: "Expertise", sublabel: "front · back",
      gradient: "from-emerald-400 via-teal-400 to-cyan-500",
      gradientRaw: "#34d399, #2dd4bf, #06b6d4",
      icon: Globe, delay: 0.17, isText: true,
    },
    {
      value: "Edge", suffix: " AI", label: "Spécialité PFE", sublabel: "RPi · ML",
      gradient: "from-fuchsia-400 via-violet-400 to-indigo-500",
      gradientRaw: "#e879f9, #a78bfa, #6366f1",
      icon: Brain, delay: 0.23, isText: true,
    },
  ], [total])

  return (
    <>
      <StyleInject/>

      <section
        id="skills"
        className="relative py-24 overflow-hidden"
        style={{
          /* Fond cohérent avec GlobalBackground (#020817) */
          background: "linear-gradient(180deg,rgba(2,8,23,0) 0%,rgba(2,8,23,.55) 40%,rgba(2,8,23,.62) 100%)",
        }}
      >
        {/* Dot grid — même taille que GlobalBackground node grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage: "radial-gradient(circle,rgba(148,163,184,.038) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Vignette — cohérente GlobalBackground */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background: "radial-gradient(ellipse 82% 68% at 50% 50%,transparent 38%,rgba(2,8,23,.52) 100%)",
          }}
        />

        {/* Ambient orbs — palette GlobalBackground */}
        <div
          className="sk-orb-a absolute -top-32 -left-32 w-[380px] h-[380px]
                     rounded-full blur-[88px] opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(circle,#1e40af,#6d28d9)" }}
          aria-hidden
        />
        <div
          className="sk-orb-b absolute -bottom-32 -right-32 w-[320px] h-[320px]
                     rounded-full blur-[88px] opacity-[0.05] pointer-events-none"
          style={{ background: "radial-gradient(circle,#7c3aed,#0891b2)" }}
          aria-hidden
        />

        <div className="container relative mx-auto px-4 md:px-8 z-10 max-w-[1280px]">

          {/* ── HEADER ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger(0.08)}
            className="text-center mb-12"
          >
            {/* Badge holographique */}
            <motion.div
              variants={fadeDown}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
                         border border-indigo-500/[0.14] bg-indigo-500/[0.045]
                         backdrop-blur-xl text-indigo-300/90
                         text-[8.5px] font-black uppercase tracking-[0.28em]"
              style={{
                boxShadow: "0 0 18px rgba(99,102,241,.08), inset 0 1px 0 rgba(255,255,255,.04)",
              }}
            >
              <Sparkles size={9} className={reduced ? "" : "sk-spin"}/>
              Stack Technique
              <Sparkles size={9} className={reduced ? "" : "sk-spin-r"}/>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-[70px] font-black
                         tracking-tight mb-4 leading-[1.04]"
            >
              <span className="text-white">Mes </span>
              <span className="relative inline-block">
                <span
                  className="sk-gt"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg,#60a5fa 0%,#818cf8 28%,#a78bfa 50%,#f472b6 72%,#60a5fa 100%)",
                  }}
                >
                  Compétences
                </span>
                {/* Underline holographique */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55, duration: 0.95, ease: EXPO }}
                  style={{ originX: 0.5 }}
                  className="absolute -bottom-2 left-0 right-0 h-[1.5px] rounded-full block
                             bg-gradient-to-r from-transparent via-indigo-400/55 to-transparent"
                />
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-[13px] text-gray-400/90 max-w-md mx-auto leading-relaxed"
            >
              Du{" "}
              <span className="text-white font-semibold">Full‑Stack</span>
              {" "}à l'{" "}
              <span
                className="font-semibold"
                style={{
                  backgroundImage: "linear-gradient(90deg,#a78bfa,#6366f1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                IA embarquée Raspberry Pi
              </span>.
            </motion.p>

            {/* Divider décoratif */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.85, ease: EXPO }}
              className="mt-8 mx-auto flex items-center gap-3 max-w-[120px]"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/28 to-transparent"/>
              <Zap size={9} className={`text-indigo-400/38 flex-shrink-0 ${reduced ? "" : "sk-float"}`}/>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/28 to-transparent"/>
            </motion.div>
          </motion.div>

          {/* ── STATS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-9">
            {stats.map((s, i) => <StatCard key={i} {...s}/>)}
          </div>

          {/* ── FILTER ── */}
          <FilterBar active={filter} onChange={setFilter}/>

          {/* ── CATEGORIES ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EXPO }}
              className="space-y-2"
            >
              {visible.map(cat => (
                <SkillCategory
                  key={cat.id}
                  title={cat.title} icon={cat.icon}
                  color={cat.color} accentGradient={cat.accentGradient}
                  isAI={cat.isAI} badge={cat.badge} count={cat.skills.length}
                >
                  {cat.skills.map((sk, si) => (
                    <SkillCard
                      key={`${cat.id}-${si}`}
                      icon={sk.icon}
                      label={sk.label}
                      color={sk.color}
                      isAI={cat.isAI}
                    />
                  ))}
                </SkillCategory>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.82, ease: EXPO }}
            className="mt-10 mx-auto flex items-center gap-3 max-w-[130px]"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/22 to-transparent"/>
            <Star
              size={9}
              className={`text-indigo-400/32 flex-shrink-0 ${reduced ? "" : "sk-spin"}`}
            />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/22 to-transparent"/>
          </motion.div>
        </div>
      </section>
    </>
  )
}