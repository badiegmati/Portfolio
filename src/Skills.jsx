import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion, useMotionValue, useSpring,
  useReducedMotion, useInView, AnimatePresence
} from "framer-motion";
import {
  SiTailwindcss, SiPhp, SiMongodb, SiOracle, SiSqlite,
  SiMysql, SiExpress, SiHtml5, SiCss3, SiTypescript,
  SiJavascript, SiFirebase, SiVuedotjs, SiSupabase,
  SiReact, SiDocker, SiFigma, SiNextdotjs, SiOpencv,
  SiRaspberrypi, SiTensorflow,
} from "react-icons/si";
import {
  FaNodeJs, FaReact, FaGitAlt, FaGithub, FaTools, FaGlobe
} from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbApi } from "react-icons/tb";
import {
  Code, Database, Smartphone, Brain, Cpu,
  Sparkles, Zap, ChevronDown, ChevronUp, Filter
} from "lucide-react";

import javaImg    from "./assets/images/java.png";
import pythonImg  from "./assets/images/python.png";
import cppImg     from "./assets/images/c-.png";
import flutterImg from "./assets/images/flutter.png";
import figmaImg   from "./assets/images/figma.png";
import vscodeImg  from "./assets/images/vscode.png";
import linuxImg   from "./assets/images/linux.png";

/* ─────────────────────── Custom SVG Icons ─────────────────────── */

const YOLOv8Icon = ({ className = "" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* fond arrondi */}
    <rect width="48" height="48" rx="10" fill="#FF6B35" opacity="0.15" />

    {/* bounding box principale */}
    <rect x="6" y="10" width="36" height="28" rx="2"
      stroke="#FF6B35" strokeWidth="2" fill="none" />

    {/* coins de détection - haut gauche */}
    <path d="M6 18 L6 10 L14 10" stroke="#FF6B35" strokeWidth="2.5"
      strokeLinecap="round" fill="none" />
    {/* coins de détection - haut droit */}
    <path d="M34 10 L42 10 L42 18" stroke="#FF6B35" strokeWidth="2.5"
      strokeLinecap="round" fill="none" />
    {/* coins de détection - bas gauche */}
    <path d="M6 30 L6 38 L14 38" stroke="#FF6B35" strokeWidth="2.5"
      strokeLinecap="round" fill="none" />
    {/* coins de détection - bas droit */}
    <path d="M34 38 L42 38 L42 30" stroke="#FF6B35" strokeWidth="2.5"
      strokeLinecap="round" fill="none" />

    {/* texte YOLO */}
    <text x="24" y="22" textAnchor="middle" fontSize="7"
      fontWeight="800" fill="#FF6B35" fontFamily="monospace">
      YOLO
    </text>
    {/* texte v8 */}
    <text x="24" y="32" textAnchor="middle" fontSize="7"
      fontWeight="800" fill="#FF8C55" fontFamily="monospace">
      v8
    </text>
  </svg>
);

const TFLiteIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* fond */}
    <rect width="48" height="48" rx="10" fill="#FF6F00" opacity="0.15" />

    {/* hexagone TF */}
    <polygon
      points="24,4 40,13 40,31 24,40 8,31 8,13"
      stroke="#FF6F00" strokeWidth="2"
      fill="#FF6F00" fillOpacity="0.12"
    />

    {/* éclair "Lite" */}
    <path
      d="M26 10 L18 26 L23 26 L20 38 L30 20 L25 20 Z"
      fill="#FF6F00" stroke="#FF8F20" strokeWidth="0.5"
    />

    {/* label TF */}
    <text x="10" y="44" fontSize="6" fontWeight="800"
      fill="#FF6F00" fontFamily="monospace">
      TF
    </text>
    {/* label Lite */}
    <text x="22" y="44" fontSize="6" fontWeight="800"
      fill="#FF8F20" fontFamily="monospace">
      Lite
    </text>
  </svg>
);

const IoTGPIOIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* fond */}
    <rect width="48" height="48" rx="10" fill="#00BCD4" opacity="0.12" />

    {/* circuit board base */}
    <rect x="10" y="14" width="28" height="20" rx="3"
      stroke="#00BCD4" strokeWidth="1.8" fill="#00BCD4" fillOpacity="0.1" />

    {/* chip central */}
    <rect x="18" y="20" width="12" height="8" rx="1.5"
      stroke="#00BCD4" strokeWidth="1.5" fill="#00BCD4" fillOpacity="0.2" />

    {/* GPIO pins - haut */}
    <line x1="16" y1="14" x2="16" y2="8"  stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="14" x2="20" y2="8"  stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="14" x2="24" y2="8"  stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="14" x2="28" y2="8"  stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="14" x2="32" y2="8"  stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />

    {/* GPIO pins - bas */}
    <line x1="16" y1="34" x2="16" y2="40" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="34" x2="20" y2="40" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="34" x2="24" y2="40" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="34" x2="28" y2="40" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="34" x2="32" y2="40" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />

    {/* signal IoT - ondes wifi à gauche */}
    <path d="M8 22 Q5 24 8 26"  stroke="#00BCD4" strokeWidth="1.5"
      strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M6 19 Q1 24 6 29"  stroke="#00BCD4" strokeWidth="1.5"
      strokeLinecap="round" fill="none" opacity="0.4" />

    {/* signal IoT - ondes wifi à droite */}
    <path d="M40 22 Q43 24 40 26" stroke="#00BCD4" strokeWidth="1.5"
      strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M42 19 Q47 24 42 29" stroke="#00BCD4" strokeWidth="1.5"
      strokeLinecap="round" fill="none" opacity="0.4" />
  </svg>
);

/* ─────────────────────── constants ─────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1];

/* ─────────────────────── variants ──────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_EXPO }
  },
};

const stagger = (delay = 0.08, children = 0.06) => ({
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: children, delayChildren: delay }
  },
});

const cardVariant = {
  hidden:  { opacity: 0, y: 24, scale: 0.88 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: EASE_EXPO }
  },
};

/* ─────────────────────── Particles ─────────────────────── */
function Particles({ reduced }) {
  const ref = useRef(null);
  const cnt = useRef(0);

  const spawn = useCallback(() => {
    if (!ref.current || cnt.current > 25) return;
    const el  = document.createElement("div");
    const sz  = Math.random() * 2.5 + 1;
    const dur = Math.random() * 4500 + 3000;
    const hue = Math.random() > 0.5 ? "59,130,246" : "139,92,246";

    Object.assign(el.style, {
      position: "absolute", width: `${sz}px`, height: `${sz}px`,
      borderRadius: "50%", left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`, opacity: "0",
      pointerEvents: "none",
      background: `rgba(${hue},0.7)`,
      boxShadow: `0 0 ${sz * 3}px rgba(${hue},0.5)`,
    });

    const anim = el.animate([
      { opacity: 0, transform: "translateY(0) scale(0)" },
      { opacity: 0.8, transform: `translateY(-${Math.random() * 70 + 30}px) scale(1)`, offset: 0.4 },
      { opacity: 0,  transform: `translateY(-${Math.random() * 140 + 80}px) scale(0.3)` },
    ], { duration: dur, easing: "cubic-bezier(0.4,0,0.2,1)" });

    ref.current.appendChild(el);
    cnt.current++;
    anim.onfinish = () => { el.remove(); cnt.current--; };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(spawn, 160);
    return () => clearInterval(id);
  }, [reduced, spawn]);

  return <div ref={ref} className="absolute inset-0 pointer-events-none z-0" />;
}

/* ─────────────────────── CountUp ───────────────────────── */
function CountUp({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / 1400, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setVal(Math.floor(ease * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────────── SkillCard ─────────────────────── */
function SkillCard({ icon: Icon, label, color, gradient, isAI = false, index = 0, level }) {
  const reduced = useReducedMotion();
  const cardRef = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glow    = useMotionValue(0);

  const springX    = useSpring(rotateX, { stiffness: 280, damping: 22 });
  const springY    = useSpring(rotateY, { stiffness: 280, damping: 22 });
  const springGlow = useSpring(glow,    { stiffness: 200, damping: 20 });

  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    if (reduced || !cardRef.current) return;
    const r  = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width  - 0.5;
    const py = (e.clientY - r.top)  / r.height - 0.5;
    rotateY.set(px * 16);
    rotateX.set(py * -16);
    glow.set(1);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glow.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      variants={cardVariant}
      className="group relative"
      style={{ perspective: 700 }}
      onMouseEnter={() => setHovered(true)}
    >
      {/* ambient glow */}
      <motion.div
        style={{ opacity: springGlow }}
        className={`absolute -inset-2 bg-gradient-to-br ${gradient}
                    rounded-3xl blur-xl pointer-events-none`}
      />

      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={reduced ? undefined : {
          rotateX: springX, rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        whileHover={reduced ? {} : { scale: 1.07, y: -8 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl
                    border shadow-xl backdrop-blur-xl cursor-default
                    transition-colors duration-300
                    ${isAI
                      ? "bg-gradient-to-br from-violet-950/70 to-indigo-950/60 border-violet-500/25 hover:border-violet-400/60"
                      : "bg-gradient-to-br from-gray-800/90 to-gray-900/80 border-gray-700/50 hover:border-gray-500/70"
                    }`}
      >
        {/* icon wrapper */}
        <motion.div
          style={reduced ? undefined : { translateZ: 28 }}
          className={`relative p-3 rounded-xl shadow-inner
                      ${isAI ? "bg-violet-900/50" : "bg-gray-800/80"}
                      group-hover:shadow-lg transition-shadow duration-300 ${color}`}
        >
          <Icon className="size-7" />

          {/* ping on hover */}
          <AnimatePresence>
            {hovered && !reduced && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`absolute inset-0 rounded-xl border
                            ${isAI ? "border-violet-400/40" : "border-blue-400/30"}`}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* label */}
        <span
          style={reduced ? undefined : { translateZ: 16 }}
          className="text-white font-semibold text-xs tracking-wide text-center leading-tight"
        >
          {label}
        </span>

        {/* animated underline */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "55%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 + index * 0.025, ease: EASE_EXPO }}
          className={`h-0.5 rounded-full
                      ${isAI
                        ? "bg-gradient-to-r from-violet-500/70 to-indigo-500/70"
                        : "bg-gradient-to-r from-blue-500/60 to-purple-500/60"
                      }`}
        />

        {/* optional level badge */}
        {level && (
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full
                            ${isAI
                              ? "bg-violet-500/15 text-violet-300 border border-violet-500/25"
                              : "bg-blue-500/15 text-blue-300 border border-blue-500/25"
                            }`}>
            {level}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── SkillCategory ─────────────────── */
function SkillCategory({ title, children, icon: Icon, color,
  accentGradient, isAI = false, badge, count }) {
  const reduced  = useReducedMotion();
  const [open, setOpen] = useState(true);

  return (
    <motion.div
      variants={stagger(0.05, 0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`relative rounded-3xl border overflow-hidden
                  transition-colors duration-300
                  ${isAI
                    ? "border-violet-500/30 bg-gradient-to-br from-violet-950/40 via-indigo-950/30 to-gray-950/50"
                    : "border-gray-800/60 bg-gray-900/25"
                  }`}
    >
      {/* top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-px
                       bg-gradient-to-r ${accentGradient} opacity-70`} />

      {/* corner glow for AI section */}
      {isAI && (
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full
                        bg-violet-500/8 blur-3xl pointer-events-none" />
      )}

      {/* header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-4 p-8 pb-0 flex-wrap"
      >
        <motion.div
          whileHover={reduced ? {} : { rotate: 14, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 280, damping: 14 }}
          className={`p-3 rounded-xl shadow-lg
                      ${isAI
                        ? "bg-gradient-to-br from-violet-700/60 to-indigo-800/60 border border-violet-500/30"
                        : "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40"
                      }`}
        >
          <Icon className={`size-7 ${color}`} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            {badge && (
              <span className="px-3 py-0.5 rounded-full text-xs font-bold
                               bg-violet-500/15 text-violet-300 border border-violet-500/30">
                {badge}
              </span>
            )}
            {count && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold
                               bg-gray-700/50 text-gray-400 border border-gray-700/50">
                {count} outils
              </span>
            )}
          </div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "56px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE_EXPO }}
            className={`mt-2 h-0.5 bg-gradient-to-r ${accentGradient} rounded-full`}
          />
        </div>

        {/* collapse toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(o => !o)}
          className="p-2 rounded-xl bg-gray-800/50 border border-gray-700/40
                     text-gray-400 hover:text-white hover:border-gray-600/60
                     transition-colors duration-200"
        >
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </motion.button>
      </motion.div>

      {/* skills grid */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
            className="overflow-hidden"
          >
            <motion.div
              variants={stagger(0.08, 0.05)}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                         lg:grid-cols-5 xl:grid-cols-6 gap-4 p-8 pt-6"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────── StatCard ──────────────────────── */
function StatCard({ value, suffix = "", label, gradient, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: EASE_EXPO }}
      whileHover={{ y: -6, scale: 1.04 }}
      className="relative group text-center p-6 rounded-2xl border
                 border-gray-800/60 bg-gray-900/40 backdrop-blur-sm
                 overflow-hidden cursor-default"
    >
      {/* bg sweep on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}
                       opacity-0 group-hover:opacity-10
                       transition-opacity duration-500`} />

      {Icon && (
        <div className={`inline-flex p-2.5 rounded-xl mb-3
                         bg-gradient-to-br ${gradient} bg-opacity-10`}>
          <Icon size={20} className="text-white opacity-80" />
        </div>
      )}

      <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r
                       ${gradient} bg-clip-text text-transparent mb-1.5`}>
        {typeof value === "number"
          ? <CountUp target={value} suffix={suffix} />
          : value
        }
      </div>
      <div className="text-gray-400 text-sm font-medium">{label}</div>

      {/* bottom glow line */}
      <div className={`absolute bottom-0 left-0 right-0 h-px
                       bg-gradient-to-r ${gradient} opacity-0
                       group-hover:opacity-60 transition-opacity duration-500`} />
    </motion.div>
  );
}

/* ─────────────────────── FilterBar ─────────────────────── */
const FILTER_OPTIONS = [
  { id: "all",      label: "Tout voir",    color: "text-white"       },
  { id: "ai",       label: "Edge AI",      color: "text-violet-400"  },
  { id: "lang",     label: "Langages",     color: "text-blue-400"    },
  { id: "frontend", label: "Frontend",     color: "text-cyan-400"    },
  { id: "backend",  label: "Backend & DB", color: "text-green-400"   },
  { id: "tools",    label: "Outils",       color: "text-yellow-400"  },
];

function FilterBar({ active, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE_EXPO }}
      className="flex flex-wrap justify-center gap-2 mb-12"
    >
      {FILTER_OPTIONS.map((opt) => (
        <motion.button
          key={opt.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange(opt.id)}
          className={`relative px-4 py-2 rounded-full text-sm font-semibold
                      border transition-all duration-200
                      ${active === opt.id
                        ? "bg-gray-700/80 border-gray-500/60 text-white"
                        : "bg-gray-900/40 border-gray-700/40 text-gray-400 hover:border-gray-600/60"
                      }`}
        >
          {active === opt.id && (
            <motion.div
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full bg-gray-700/60 -z-10"
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            />
          )}
          <span className={active === opt.id ? opt.color : ""}>{opt.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}

/* ─────────────────────── Skills (main) ─────────────────── */
export default function Skills() {
  const reduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    {
      id: "ai",
      title: "IA Embarquée & Edge AI",
      icon: Brain,
      color: "text-violet-400",
      accentGradient: "from-violet-500 via-purple-500 to-indigo-500",
      isAI: true,
      badge: "Projet PFE",
      skills: [
        {
          icon: () => <img src={pythonImg} alt="Python" className="size-7" />,
          label: "Python",
          color: "text-blue-400",
          gradient: "from-blue-500/25 to-cyan-500/25",
          
        },
        {
          // ✅ SVG custom YOLOv8
          icon: ({ className }) => <YOLOv8Icon className={className} />,
          label: "YOLOv8",
          color: "text-orange-400",
          gradient: "from-orange-500/25 to-red-500/25",
          
        },
        {
          // ✅ react-icons/si SiOpencv
          icon: ({ className }) => <SiOpencv className={className} />,
          label: "OpenCV",
          color: "text-green-400",
          gradient: "from-green-500/25 to-emerald-500/25",
        },
        {
          // ✅ SVG custom TFLite
          icon: ({ className }) => <TFLiteIcon className={className} />,
          label: "TFLite",
          color: "text-amber-400",
          gradient: "from-amber-500/25 to-orange-500/25",
          
        },
        {
          // ✅ react-icons/si SiRaspberrypi
          icon: ({ className }) => <SiRaspberrypi className={className} />,
          label: "Raspberry Pi 4",
          color: "text-red-400",
          gradient: "from-red-500/25 to-orange-500/25",
          
        },
        {
          // ✅ SVG custom IoT/GPIO
          icon: ({ className }) => <IoTGPIOIcon className={className} />,
          label: "IoT / GPIO",
          color: "text-cyan-300",
          gradient: "from-cyan-300/25 to-blue-400/25",
          
        },
      ],
    },
    {
      id: "lang",
      title: "Langages de Programmation",
      icon: Code,
      color: "text-blue-400",
      accentGradient: "from-blue-500 to-cyan-500",
      skills: [
        { icon: () => <img src={javaImg}   alt="Java"   className="size-7" />, label: "Java",       color: "text-red-400",    gradient: "from-red-500/20 to-orange-500/20"  },
        { icon: () => <img src={pythonImg} alt="Python" className="size-7" />, label: "Python",     color: "text-blue-400",   gradient: "from-blue-500/20 to-cyan-500/20"   },
        { icon: () => <img src={cppImg}    alt="C++"    className="size-7" />, label: "C / C++",    color: "text-blue-500",   gradient: "from-blue-600/20 to-indigo-500/20" },
        { icon: SiJavascript,                                                   label: "JavaScript", color: "text-yellow-400", gradient: "from-yellow-500/20 to-amber-500/20"},
        { icon: SiTypescript,                                                   label: "TypeScript", color: "text-blue-500",   gradient: "from-blue-600/20 to-cyan-500/20"  },
        { icon: SiPhp,                                                          label: "PHP",        color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20" },
      ],
    },
    {
      id: "frontend",
      title: "Frontend & Mobile",
      icon: Smartphone,
      color: "text-cyan-400",
      accentGradient: "from-cyan-500 to-teal-500",
      skills: [
        { icon: SiReact,                                                                label: "React",        color: "text-cyan-400",   gradient: "from-cyan-400/20 to-blue-400/20"   },
        { icon: SiNextdotjs,                                                            label: "Next.js",      color: "text-white",      gradient: "from-gray-500/20 to-gray-700/20"   },
        { icon: SiTailwindcss,                                                          label: "Tailwind CSS", color: "text-cyan-400",   gradient: "from-cyan-500/20 to-blue-500/20"   },
        { icon: SiVuedotjs,                                                             label: "Vue.js",       color: "text-green-400",  gradient: "from-green-400/20 to-teal-500/20"  },
        { icon: FaReact,                                                                label: "React Native", color: "text-blue-400",   gradient: "from-blue-400/20 to-cyan-400/20"   },
        { icon: () => <img src={flutterImg} alt="Flutter" className="size-7" />,       label: "Flutter",      color: "text-blue-300",   gradient: "from-blue-300/20 to-indigo-400/20" },
        { icon: SiHtml5,                                                                label: "HTML5",        color: "text-orange-500", gradient: "from-orange-500/20 to-red-500/20"  },
        { icon: SiCss3,                                                                 label: "CSS3",         color: "text-blue-500",   gradient: "from-blue-500/20 to-indigo-500/20" },
      ],
    },
    {
      id: "backend",
      title: "Backend & API",
      icon: FaGlobe,
      color: "text-green-400",
      accentGradient: "from-green-500 to-emerald-500",
      skills: [
        { icon: FaNodeJs,  label: "Node.js",  color: "text-green-500", gradient: "from-green-500/20 to-emerald-500/20" },
        { icon: SiExpress, label: "Express",  color: "text-gray-300",  gradient: "from-gray-500/20 to-gray-700/20"     },
        { icon: TbApi,     label: "REST API", color: "text-gray-300",  gradient: "from-gray-500/20 to-gray-700/20"     },
      ],
    },
    {
      id: "backend",
      title: "Bases de Données",
      icon: Database,
      color: "text-blue-400",
      accentGradient: "from-blue-500 to-indigo-600",
      skills: [
        { icon: BiLogoPostgresql, label: "PostgreSQL", color: "text-blue-500",   gradient: "from-blue-600/20 to-indigo-500/20"  },
        { icon: SiMongodb,        label: "MongoDB",    color: "text-green-500",  gradient: "from-green-500/20 to-emerald-500/20"},
        { icon: SiMysql,          label: "MySQL",      color: "text-blue-400",   gradient: "from-blue-500/20 to-cyan-500/20"    },
        { icon: SiSqlite,         label: "SQLite",     color: "text-blue-400",   gradient: "from-blue-400/20 to-cyan-400/20"    },
        { icon: SiOracle,         label: "Oracle",     color: "text-red-500",    gradient: "from-red-500/20 to-orange-500/20"   },
        { icon: SiFirebase,       label: "Firebase",   color: "text-yellow-500", gradient: "from-yellow-500/20 to-orange-500/20"},
        { icon: SiSupabase,       label: "Supabase",   color: "text-green-400",  gradient: "from-green-400/20 to-emerald-500/20"},
      ],
    },
    {
      id: "tools",
      title: "DevOps, Cloud & Outils",
      icon: FaTools,
      color: "text-yellow-400",
      accentGradient: "from-yellow-500 to-orange-500",
      skills: [
        { icon: FaGitAlt,                                                              label: "Git",          color: "text-orange-500", gradient: "from-orange-500/20 to-red-500/20"    },
        { icon: FaGithub,                                                              label: "GitHub",       color: "text-gray-300",   gradient: "from-gray-600/20 to-gray-800/20"     },
        { icon: SiDocker,                                                              label: "Docker",       color: "text-blue-400",   gradient: "from-blue-400/20 to-cyan-500/20"     },
        { icon: () => <img src={linuxImg}  alt="Linux"   className="size-7" />,       label: "Linux/Ubuntu", color: "text-yellow-500", gradient: "from-yellow-500/20 to-orange-500/20" },
        { icon: () => <img src={vscodeImg} alt="VS Code" className="size-7" />,       label: "VS Code",      color: "text-blue-500",   gradient: "from-blue-500/20 to-cyan-500/20"     },
        { icon: () => <img src={figmaImg}  alt="Figma"   className="size-7" />,       label: "Figma",        color: "text-purple-400", gradient: "from-purple-400/20 to-pink-500/20"   },
      ],
    },
  ];

  const visible = activeFilter === "all"
    ? categories
    : categories.filter(c => c.id === activeFilter);

  const totalSkills = categories.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <section
      id="skills"
      className="relative py-28 bg-gray-950 overflow-hidden"
    >
      {/* ── background ── */}
      <Particles reduced={reduced} />

      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { cls: "top-[-8%] left-[-8%] w-[500px] h-[500px]",   from: "#2563eb", to: "#7c3aed", dur: 22, dx: 70,  dy: 40  },
          { cls: "bottom-[-8%] right-[-8%] w-[450px] h-[450px]",from: "#7c3aed", to: "#db2777", dur: 28, dx: -60, dy: -40 },
          { cls: "top-[35%] right-[15%] w-[250px] h-[250px]",  from: "#0891b2", to: "#6d28d9", dur: 18, dx: 30,  dy: -30 },
        ].map((o, i) => (
          <motion.div
            key={i}
            animate={reduced ? {} : { x: [0, o.dx, 0], y: [0, o.dy, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
            className={`absolute ${o.cls} rounded-full opacity-[0.06] blur-[80px]`}
            style={{ background: `radial-gradient(circle, ${o.from}, ${o.to})` }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 md:px-8 z-10">

        {/* ── header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger(0, 0.1)}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       border border-blue-500/25 bg-blue-500/8
                       text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles size={13} className="animate-pulse" />
            Stack Technique
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-none"
          >
            <span className="text-white">Mes </span>
            <span className="text-transparent bg-clip-text
                             bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
                             animate-gradient-x">
              Compétences
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Une palette complète de technologies modernes — du développement
            Full-Stack à{" "}
            <span className="text-violet-400 font-semibold">
              l'IA embarquée sur Raspberry Pi
            </span>
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.9, ease: EASE_EXPO }}
            className="mt-8 mx-auto h-px w-48 rounded-full origin-left
                       bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          />
        </motion.div>

        {/* ── quick stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { value: totalSkills, suffix: "+", label: "Technologies",   gradient: "from-blue-400 to-cyan-400",     icon: Code,   delay: 0.10 },
            { value: 6,           suffix: "",  label: "Catégories",     gradient: "from-purple-400 to-pink-400",   icon: Filter, delay: 0.18 },
            { value: "Full-Stack",suffix: "",  label: "Expertise",      gradient: "from-green-400 to-emerald-400", icon: Zap,    delay: 0.26 },
            { value: "Edge AI",   suffix: "",  label: "Spécialité PFE", gradient: "from-violet-400 to-indigo-400", icon: Brain,  delay: 0.34 },
          ].map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* ── filter bar ── */}
        <FilterBar active={activeFilter} onChange={setActiveFilter} />

        {/* ── categories ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
            className="space-y-5"
          >
            {visible.map((cat, i) => (
              <SkillCategory
                key={`${cat.title}-${i}`}
                title={cat.title}
                icon={cat.icon}
                color={cat.color}
                accentGradient={cat.accentGradient}
                isAI={cat.isAI}
                badge={cat.badge}
                count={cat.skills.length}
              >
                {cat.skills.map((skill, si) => (
                  <SkillCard
                    key={si}
                    index={si}
                    icon={skill.icon}
                    label={skill.label}
                    color={skill.color}
                    gradient={skill.gradient}
                    isAI={cat.isAI}
                    level={skill.level}
                  />
                ))}
              </SkillCategory>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* global CSS */}
      <style>{`
        @keyframes gradient-x {
          0%,100% { background-position: 0%   50%; }
          50%      { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
      `}</style>
    </section>
  );
}