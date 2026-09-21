import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import {
  motion, useMotionValue, useSpring,
  useReducedMotion, useInView, AnimatePresence
} from "framer-motion";
import {
  SiTailwindcss, SiPhp, SiMongodb, SiOracle, SiSqlite,
  SiMysql, SiExpress, SiHtml5, SiCss3, SiTypescript,
  SiJavascript, SiFirebase, SiVuedotjs, SiSupabase,
  SiReact, SiDocker, SiNextdotjs, SiOpencv,
  SiRaspberrypi, SiNumpy, SiSpringboot, SiFastapi, SiDart,
} from "react-icons/si";
import { FaNodeJs, FaReact, FaGitAlt, FaGithub, FaTools } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbApi } from "react-icons/tb";
import {
  Code, Database, Smartphone, Brain, Cpu,
  Sparkles, ChevronDown, Layers, Server,
  Settings, Star, TrendingUp, Zap, Globe, Award,
} from "lucide-react";

import pythonImg  from "./assets/images/python.png";
import cppImg     from "./assets/images/c-.png";
import flutterImg from "./assets/images/flutter.png";
import vscodeImg  from "./assets/images/vscode.png";
import linuxImg   from "./assets/images/linux.png";
import javaImg    from "./assets/images/java.png";

/* ══════════════════════════════════════════════════════
   SVG ICONS
══════════════════════════════════════════════════════ */
const YOLOv8Icon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#FF6B35" fillOpacity="0.15"/>
    <rect x="6" y="10" width="36" height="28" rx="3" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <path d="M6 18L6 10L14 10" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M34 10L42 10L42 18" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M6 30L6 38L14 38" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M34 38L42 38L42 30" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round"/>
    <text x="24" y="22" textAnchor="middle" fontSize="7" fontWeight="800" fill="#FF6B35" fontFamily="monospace">YOLO</text>
    <text x="24" y="33" textAnchor="middle" fontSize="8" fontWeight="900" fill="#FF8C55" fontFamily="monospace">v8</text>
  </svg>
);
const TFLiteIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#FF6F00" fillOpacity="0.15"/>
    <polygon points="24,5 40,14 40,32 24,41 8,32 8,14" stroke="#FF6F00" strokeWidth="2" fill="#FF6F00" fillOpacity="0.1"/>
    <path d="M26 11L18 26L23 26L20 38L30 21L25 21Z" fill="#FF6F00" stroke="#FF8F20" strokeWidth="0.5"/>
    <text x="11" y="45" fontSize="6" fontWeight="800" fill="#FF6F00" fontFamily="monospace">TF</text>
    <text x="22" y="45" fontSize="6" fontWeight="800" fill="#FF8F20" fontFamily="monospace">Lite</text>
  </svg>
);
const IoTIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#00BCD4" fillOpacity="0.12"/>
    <rect x="10" y="14" width="28" height="20" rx="3" stroke="#00BCD4" strokeWidth="1.8" fill="#00BCD4" fillOpacity="0.1"/>
    <rect x="18" y="20" width="12" height="8" rx="2" stroke="#00BCD4" strokeWidth="1.5" fill="#00BCD4" fillOpacity="0.2"/>
    {[16,20,24,28,32].map(x => (
      <g key={x}>
        <line x1={x} y1="14" x2={x} y2="8" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round"/>
        <line x1={x} y1="34" x2={x} y2="40" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round"/>
      </g>
    ))}
    <path d="M8 22Q5 24 8 26" stroke="#00BCD4" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 19Q1 24 6 29" stroke="#00BCD4" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <path d="M40 22Q43 24 40 26" stroke="#00BCD4" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M42 19Q47 24 42 29" stroke="#00BCD4" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
  </svg>
);
const MediaPipeIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#00BFA5" fillOpacity="0.15"/>
    <circle cx="24" cy="24" r="10" stroke="#00BFA5" strokeWidth="1.8" fill="none"/>
    {[[24,14],[24,34],[14,24],[34,24],[17,17],[31,17],[17,31],[31,31]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r={i < 4 ? 2.5 : 2} fill="#00BFA5" opacity={i < 4 ? 1 : 0.7}/>
    ))}
    <circle cx="24" cy="24" r="3" fill="#00BFA5" opacity="0.5"/>
  </svg>
);
const UARTIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#F59E0B" fillOpacity="0.12"/>
    <rect x="4" y="19" width="10" height="10" rx="2" stroke="#F59E0B" strokeWidth="1.8" fill="#F59E0B" fillOpacity="0.15"/>
    <rect x="34" y="19" width="10" height="10" rx="2" stroke="#F59E0B" strokeWidth="1.8" fill="#F59E0B" fillOpacity="0.15"/>
    <path d="M14 22L20 22M14 26L20 26" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M28 22L34 22M28 26L34 26" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="20" y="17" width="8" height="14" rx="2" stroke="#F59E0B" strokeWidth="1.5" fill="#F59E0B" fillOpacity="0.1"/>
    <text x="24" y="14" textAnchor="middle" fontSize="5.5" fontWeight="800" fill="#F59E0B" fontFamily="monospace">UART</text>
    <text x="24" y="36" textAnchor="middle" fontSize="4" fontWeight="700" fill="#F59E0B" opacity="0.8" fontFamily="monospace">GSM/GPRS</text>
  </svg>
);
const JWTIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#E11D48" fillOpacity="0.12"/>
    <path d="M24 5L39 14L39 32L24 41L9 32L9 14Z" stroke="#E11D48" strokeWidth="1.8" fill="none"/>
    <circle cx="24" cy="24" r="5" fill="#E11D48" fillOpacity="0.2" stroke="#E11D48" strokeWidth="1.5"/>
    <text x="24" y="27" textAnchor="middle" fontSize="5" fontWeight="900" fill="#E11D48" fontFamily="monospace">JWT</text>
  </svg>
);
const AgileIcon = ({ className = "" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect width="48" height="48" rx="12" fill="#8B5CF6" fillOpacity="0.12"/>
    <circle cx="24" cy="24" r="14" stroke="#8B5CF6" strokeWidth="1.5" fill="none" strokeDasharray="4 3"/>
    <path d="M24 10A14 14 0 0 1 38 24" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M35 21L38 24L35 27" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="18" y="20" width="12" height="8" rx="2" stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.1"/>
    <text x="24" y="26.5" textAnchor="middle" fontSize="4" fontWeight="800" fill="#8B5CF6" fontFamily="monospace">AGILE</text>
  </svg>
);

/* ══════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════ */
const EASE_EXPO = [0.16, 1, 0.3, 1];
const EASE_BACK = [0.34, 1.56, 0.64, 1];

const fadeUp = {
  hidden:  { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_EXPO } },
};
const fadeDown = {
  hidden:  { opacity: 0, y: -24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0,   filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_EXPO } },
};
const staggerContainer = (delay = 0.05) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: delay } },
});
const cardAnim = {
  hidden:  { opacity: 0, y: 36, scale: 0.80, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0,  scale: 1,    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_BACK } },
};

/* ══════════════════════════════════════════════════════
   NEURAL CANVAS
══════════════════════════════════════════════════════ */
function NeuralBackground({ reduced }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ nodes: [], raf: null });
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const S   = stateRef.current;
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      S.nodes = Array.from({ length: 65 }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r:  Math.random() * 1.6 + 0.5,
        hue: Math.random() > 0.5 ? 220 + Math.random()*40 : 260 + Math.random()*40,
        pulse: Math.random() * Math.PI * 2,
      }));
    };
    const draw = () => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < S.nodes.length; i++) {
        for (let j = i+1; j < S.nodes.length; j++) {
          const a = S.nodes[i], b = S.nodes[j];
          const dist = Math.hypot(a.x-b.x, a.y-b.y);
          if (dist < 135) {
            const alpha = (1 - dist/135) * 0.13;
            const g = ctx.createLinearGradient(a.x,a.y,b.x,b.y);
            g.addColorStop(0, `hsla(${a.hue},85%,68%,${alpha})`);
            g.addColorStop(1, `hsla(${b.hue},85%,68%,${alpha})`);
            ctx.strokeStyle = g; ctx.lineWidth = 0.65;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }
      S.nodes.forEach(n => {
        n.pulse += 0.02; n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
        const p = 0.5 + 0.5*Math.sin(n.pulse);
        const grd = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*6);
        grd.addColorStop(0, `hsla(${n.hue},90%,72%,${0.65*p})`);
        grd.addColorStop(1, `hsla(${n.hue},90%,72%,0)`);
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*6,0,Math.PI*2); ctx.fill();
      });
      S.raf = requestAnimationFrame(draw);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas); resize(); S.raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(S.raf); ro.disconnect(); };
  }, [reduced]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.45 }}/>;
}

/* ══════════════════════════════════════════════════════
   FLOATING PARTICLES
══════════════════════════════════════════════════════ */
function FloatingParticles({ reduced }) {
  const pts = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i, x: Math.random()*100, y: Math.random()*100,
      size: Math.random()*2.5+0.8, dur: Math.random()*12+9,
      del: Math.random()*7, hue: [220,260,280,200][i%4],
    })), []);
  if (reduced) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pts.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{
            left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size,
            background:`hsla(${p.hue},80%,65%,0.55)`,
            boxShadow:`0 0 ${p.size*3}px hsla(${p.hue},80%,65%,0.35)`,
          }}
          animate={{ y:[0,-55,0], x:[0,Math.sin(p.id)*28,0], opacity:[0,0.75,0], scale:[0.5,1.15,0.5] }}
          transition={{ duration:p.dur, delay:p.del, repeat:Infinity, ease:"easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCAN LINE
══════════════════════════════════════════════════════ */
function ScanLine({ reduced }) {
  if (reduced) return null;
  return (
    <motion.div className="absolute left-0 right-0 h-px pointer-events-none z-0"
      style={{ background:"linear-gradient(90deg,transparent,rgba(96,165,250,0.12),rgba(167,139,250,0.18),rgba(96,165,250,0.12),transparent)" }}
      animate={{ top:["0%","100%"] }}
      transition={{ duration:20, repeat:Infinity, ease:"linear" }}
    />
  );
}

/* ══════════════════════════════════════════════════════
   COUNTUP
══════════════════════════════════════════════════════ */
function CountUp({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const tick = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 2000, 1);
      setVal(Math.floor((1 - Math.pow(1-p,4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════
   STAT CARD — redesigné
══════════════════════════════════════════════════════ */
function StatCard({ value, suffix = "", label, sublabel, gradient, gradientRaw, icon: Icon, delay = 0, isText = false }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:40, scale:0.82, filter:"blur(12px)" }}
      whileInView={{ opacity:1, y:0, scale:1, filter:"blur(0px)" }}
      viewport={{ once:true }}
      transition={{ delay, duration:0.75, ease:EASE_BACK }}
      whileHover={reduced ? {} : { y:-8, scale:1.03 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group cursor-default overflow-hidden rounded-[24px]
                 border border-white/[0.07] shadow-2xl shadow-black/50"
      style={{
        background: "linear-gradient(145deg,rgba(13,20,42,0.95) 0%,rgba(8,10,20,0.98) 100%)",
        backdropFilter: "blur(28px)",
      }}
    >
      {/* animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-[24px] pointer-events-none"
        style={{ padding: 1 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 rounded-[24px]"
          style={{ background: `linear-gradient(135deg, ${gradientRaw})`, opacity: 0.35 }}
        />
      </motion.div>

      {/* top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: delay + 0.3, duration: 0.9, ease: EASE_EXPO }}
        style={{ originX: 0.5 }}
        className={`absolute top-0 left-6 right-6 h-[1.5px] rounded-full bg-gradient-to-r ${gradient}`}
      />

      {/* glow blob */}
      <motion.div
        animate={{ opacity: hovered ? 0.18 : 0.06, scale: hovered ? 1.2 : 1 }}
        transition={{ duration: 0.6 }}
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${gradientRaw})` }}
      />

      {/* bottom glow */}
      <motion.div
        animate={{ opacity: hovered ? 0.12 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full blur-2xl pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${gradientRaw})` }}
      />

      <div className="relative z-10 p-6 flex flex-col items-center gap-3">

        {/* icon ring */}
        <motion.div
          animate={hovered && !reduced ? { rotate: 15, scale: 1.18 } : { rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-2xl blur-md opacity-40"
            style={{ background: `linear-gradient(135deg, ${gradientRaw})` }}
          />
          <div className="relative p-3.5 rounded-2xl border border-white/[0.08]"
            style={{ background: `linear-gradient(135deg, ${gradientRaw}22, ${gradientRaw}11)` }}
          >
            <Icon size={20} className="text-white/90" />
          </div>
          {/* pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay }}
            className="absolute inset-0 rounded-2xl border border-white/20"
          />
        </motion.div>

        {/* value */}
        <div className="text-center">
          {isText ? (
            <div className="relative">
              <motion.div
                className="text-2xl md:text-3xl font-black tracking-tight leading-none"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${gradientRaw})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={hovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {value}
                {suffix && (
                  <span className="text-lg font-bold opacity-80">{suffix}</span>
                )}
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="text-3xl md:text-4xl font-black tracking-tight tabular-nums leading-none"
              style={{
                backgroundImage: `linear-gradient(135deg, ${gradientRaw})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={hovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CountUp target={value} suffix={suffix} />
            </motion.div>
          )}

          {/* label */}
          <motion.div
            className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500"
            animate={hovered ? { color: "#94a3b8" } : { color: "#6b7280" }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.div>

          {/* sublabel */}
          {sublabel && (
            <div className="mt-1 text-[9px] font-medium text-gray-600 tracking-wide">
              {sublabel}
            </div>
          )}
        </div>

        {/* bottom shimmer bar */}
        <motion.div
          animate={{ width: hovered ? "70%" : "30%", opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.45, ease: EASE_EXPO }}
          className={`h-px rounded-full bg-gradient-to-r ${gradient}`}
        />
      </div>

      {/* corner dots deco */}
      <div className="absolute top-3 right-3 flex gap-1 opacity-20">
        {[0,1,2].map(i => (
          <motion.div key={i}
            animate={{ opacity: hovered ? [0.4,1,0.4] : 0.3 }}
            transition={{ duration: 1.5, delay: i*0.2, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-white"
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   COLLAPSIBLE — Pure CSS, no AnimatePresence height bug
══════════════════════════════════════════════════════ */
function Collapsible({ open, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      el.style.height = "auto";
      const h = el.scrollHeight;
      el.style.height = "0px";
      el.getBoundingClientRect();
      el.style.height = `${h}px`;
      el.style.opacity = "1";
      const onEnd = () => { el.style.height = "auto"; el.removeEventListener("transitionend", onEnd); };
      el.addEventListener("transitionend", onEnd);
    } else {
      el.style.height = `${el.scrollHeight}px`;
      el.getBoundingClientRect();
      el.style.height = "0px";
      el.style.opacity = "0";
    }
  }, [open]);

  return (
    <div ref={ref}
      style={{
        overflow: "hidden",
        transition: "height 0.48s cubic-bezier(0.16,1,0.3,1), opacity 0.38s cubic-bezier(0.16,1,0.3,1)",
        height: "auto", opacity: 1,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SKILL CARD
══════════════════════════════════════════════════════ */
function SkillCard({ icon: Icon, label, color, gradient, isAI = false, index = 0, level }) {
  const reduced = useReducedMotion();
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [spot, setSpot]       = useState({ x: 50, y: 50 });
  const [ripple, setRipple]   = useState(null);

  const rotX = useMotionValue(0), rotY = useMotionValue(0);
  const glow = useMotionValue(0);
  const sX = useSpring(rotX, { stiffness: 340, damping: 27 });
  const sY = useSpring(rotY, { stiffness: 340, damping: 27 });
  const sG = useSpring(glow, { stiffness: 210, damping: 23 });

  const onMove = useCallback(e => {
    if (reduced || !cardRef.current) return;
    const r  = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    rotY.set((px - 0.5) * 20); rotX.set((py - 0.5) * -20); glow.set(1);
    setSpot({ x: px * 100, y: py * 100 });
  }, [reduced, rotX, rotY, glow]);

  const onLeave = useCallback(() => {
    rotX.set(0); rotY.set(0); glow.set(0); setHovered(false);
  }, [rotX, rotY, glow]);

  const onTap = useCallback(e => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const id = Date.now();
    setRipple({ x: e.clientX - r.left, y: e.clientY - r.top, id });
    setTimeout(() => setRipple(null), 700);
  }, []);

  return (
    <motion.div variants={cardAnim} className="group relative" style={{ perspective: 1000 }}
      onMouseEnter={() => setHovered(true)}
    >
      <motion.div style={{ opacity: sG }}
        className={`absolute -inset-[3px] rounded-[22px] pointer-events-none blur-xl bg-gradient-to-br ${gradient}`}
      />
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        className="absolute -inset-px rounded-[20px] pointer-events-none"
        style={{
          background: isAI
            ? "linear-gradient(135deg,rgba(139,92,246,0.55),rgba(99,102,241,0.35),rgba(139,92,246,0.08))"
            : "linear-gradient(135deg,rgba(96,165,250,0.32),rgba(167,139,250,0.22),rgba(255,255,255,0.04))",
        }}
      />
      <motion.div
        ref={cardRef}
        onMouseMove={onMove} onMouseLeave={onLeave} onTap={onTap}
        style={reduced ? undefined : { rotateX: sX, rotateY: sY, transformStyle: "preserve-3d" }}
        whileHover={reduced ? {} : { scale: 1.08, y: -10,
          transition: { type: "spring", stiffness: 330, damping: 23 } }}
        whileTap={{ scale: 0.93 }}
        className={`relative flex flex-col items-center gap-3 p-5 rounded-[20px]
                    border cursor-default overflow-hidden select-none
                    shadow-2xl backdrop-blur-2xl transition-colors duration-300
                    ${isAI
                      ? "bg-gradient-to-br from-violet-950/90 via-indigo-950/85 to-purple-950/80 border-violet-500/15 hover:border-violet-400/38 shadow-violet-950/50"
                      : "bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-slate-950/95 border-white/[0.06] hover:border-white/[0.15] shadow-black/40"
                    }`}
      >
        <AnimatePresence>
          {ripple && (
            <motion.div key={ripple.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ripple.x, top: ripple.y, width: 8, height: 8,
                marginLeft: -4, marginTop: -4,
                background: isAI ? "rgba(167,139,250,0.38)" : "rgba(96,165,250,0.28)",
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 18, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 pointer-events-none rounded-[20px] transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.08) 0%, transparent 58%)`,
          }}
        />
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 + index * 0.03, duration: 0.7, ease: EASE_EXPO }}
          style={{ originX: 0.5 }}
          className={`absolute top-0 left-6 right-6 h-px rounded-full
            ${isAI ? "bg-gradient-to-r from-transparent via-violet-400/65 to-transparent"
                   : "bg-gradient-to-r from-transparent via-blue-400/42 to-transparent"}`}
        />
        <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
          className={`absolute bottom-0 left-6 right-6 h-px rounded-full
            ${isAI ? "bg-gradient-to-r from-transparent via-violet-400/38 to-transparent"
                   : "bg-gradient-to-r from-transparent via-slate-400/28 to-transparent"}`}
        />
        <motion.div
          style={reduced ? undefined : { translateZ: 34 }}
          className={`relative p-3.5 rounded-[14px] transition-all duration-300 shadow-xl ${color}
            ${isAI
              ? "bg-gradient-to-br from-violet-900/70 to-indigo-900/60 group-hover:from-violet-800/80 group-hover:to-indigo-800/70"
              : "bg-gradient-to-br from-white/[0.07] to-white/[0.03] group-hover:from-white/[0.12] group-hover:to-white/[0.06]"
            }`}
        >
          <Icon className="size-7" />
          <AnimatePresence>
            {hovered && !reduced && (
              <motion.div
                initial={{ scale: 0.7, opacity: 0.8 }} animate={{ scale: 2.8, opacity: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}
                className={`absolute inset-0 rounded-[14px] border-2
                  ${isAI ? "border-violet-400/55" : "border-blue-400/45"}`}
              />
            )}
          </AnimatePresence>
          {isAI && !reduced && (
            <motion.div
              animate={{ opacity: [0.28, 0.75, 0.28] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-[14px] border border-violet-400/22"
            />
          )}
        </motion.div>
        <motion.span
          style={reduced ? undefined : { translateZ: 20 }}
          className="text-white/90 font-semibold text-[11px] tracking-wide text-center leading-tight"
        >
          {label}
        </motion.span>
        <motion.div
          initial={{ width: 0, opacity: 0 }} whileInView={{ width: "50%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.09 + index * 0.025, duration: 0.72, ease: EASE_EXPO }}
          className={`h-px rounded-full
            ${isAI ? "bg-gradient-to-r from-transparent via-violet-400/85 to-transparent"
                   : "bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"}`}
        />
        {level && (
          <motion.span style={reduced ? undefined : { translateZ: 14 }}
            className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border
              ${isAI ? "bg-violet-500/20 text-violet-300 border-violet-500/32"
                     : "bg-white/[0.06] text-gray-300 border-white/10"}`}
          >
            {level}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   SKILL CATEGORY
══════════════════════════════════════════════════════ */
function SkillCategory({ title, children, icon: Icon, color, accentGradient, isAI = false, badge, count }) {
  const [open, setOpen] = useState(true);
  const reduced         = useReducedMotion();
  return (
    <motion.section
      initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, ease: EASE_EXPO }}
      className={`relative rounded-[28px] border overflow-hidden
        ${isAI ? "border-violet-500/20 shadow-2xl shadow-violet-950/50"
               : "border-white/[0.055] shadow-xl shadow-black/40"}`}
      style={{
        background: isAI
          ? "linear-gradient(145deg,rgba(46,16,101,.58) 0%,rgba(29,14,80,.48) 45%,rgba(12,10,30,.62) 100%)"
          : "linear-gradient(145deg,rgba(15,23,45,.88) 0%,rgba(10,10,22,.93) 100%)",
        backdropFilter: "blur(24px)",
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 1.1, ease: EASE_EXPO }} style={{ originX: 0 }}
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentGradient}`}
      />
      {!reduced && (
        <div className={`absolute top-0 right-0 w-44 h-44 rounded-full pointer-events-none blur-3xl opacity-[0.06]
          ${isAI ? "bg-violet-400" : "bg-blue-400"}`}
          style={{ transform: "translate(30%,-30%)" }}
        />
      )}
      {isAI && !reduced && (
        <>
          <motion.div
            animate={{ opacity:[0.06,0.16,0.06], scale:[1,1.1,1] }}
            transition={{ duration: 7, repeat:Infinity, ease:"easeInOut" }}
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-500/18 blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{ opacity:[0.04,0.10,0.04], scale:[1,1.12,1] }}
            transition={{ duration: 9, repeat:Infinity, ease:"easeInOut", delay:2.5 }}
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo-500/14 blur-3xl pointer-events-none"
          />
        </>
      )}
      {/* HEADER */}
      <div className="flex items-center gap-4 px-8 pt-8 pb-5 flex-wrap">
        <motion.div
          whileHover={reduced ? {} : { rotate: 15, scale: 1.16 }}
          transition={{ type:"spring", stiffness:300, damping:16 }}
          className={`relative p-4 rounded-2xl shadow-2xl flex-shrink-0
            ${isAI
              ? "bg-gradient-to-br from-violet-700/90 to-indigo-800/90 border border-violet-400/28 shadow-violet-900/55"
              : "bg-gradient-to-br from-slate-700/65 to-slate-800/65 border border-white/[0.07] shadow-black/38"}`}
        >
          <Icon className={`size-6 ${color}`} />
          {isAI && !reduced && (
            <motion.div
              animate={{ scale:[1,1.5,1], opacity:[0.38,0,0.38] }}
              transition={{ duration: 2.8, repeat:Infinity, ease:"easeOut" }}
              className="absolute inset-0 rounded-2xl border-2 border-violet-400/48"
            />
          )}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
            <h3 className="text-lg font-black text-white tracking-tight">{title}</h3>
            {badge && (
              <motion.span
                initial={{ opacity:0, scale:0.75 }} animate={{ opacity:1, scale:1 }}
                transition={{ delay:0.4, duration:0.5, ease:EASE_BACK }}
                className="relative px-3 py-0.5 rounded-full text-[9px] font-black
                           text-violet-200 border border-violet-400/38
                           uppercase tracking-[0.2em] overflow-hidden"
              >
                <span className="relative z-10">✦ {badge}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/28 to-indigo-500/28"
                  animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:2.5, repeat:Infinity }}
                />
              </motion.span>
            )}
            {count !== undefined && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold
                               bg-white/[0.04] text-gray-500 border border-white/[0.06] tracking-wide">
                {count} outils
              </span>
            )}
          </div>
          <motion.div
            initial={{ width:0, opacity:0 }} whileInView={{ width:54, opacity:1 }}
            viewport={{ once:true }} transition={{ delay:0.3, duration:0.8, ease:EASE_EXPO }}
            className={`h-0.5 rounded-full bg-gradient-to-r ${accentGradient}`}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.14 }} whileTap={{ scale: 0.88 }}
          onClick={() => setOpen(v => !v)}
          className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07]
                     text-gray-500 hover:text-white hover:bg-white/[0.09]
                     hover:border-white/[0.14] transition-all duration-200 flex-shrink-0"
        >
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.42, ease: EASE_EXPO }}>
            <ChevronDown size={15} />
          </motion.div>
        </motion.button>
      </div>
      {/* GRID */}
      <Collapsible open={open}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer(0.05)}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                     lg:grid-cols-5 xl:grid-cols-6 gap-3.5 px-8 pb-9 pt-1"
        >
          {children}
        </motion.div>
      </Collapsible>
    </motion.section>
  );
}

/* ══════════════════════════════════════════════════════
   FILTER BAR
══════════════════════════════════════════════════════ */
const FILTERS = [
  { id:"all",      label:"Tout voir",  icon:Layers,     active:"text-white"      },
  { id:"lang",     label:"Langages",   icon:Code,       active:"text-blue-400"   },
  { id:"frontend", label:"Frontend",   icon:Smartphone, active:"text-cyan-400"   },
  { id:"backend",  label:"Backend",    icon:Server,     active:"text-green-400"  },
  { id:"embedded", label:"Embarqué",   icon:Cpu,        active:"text-orange-400" },
  { id:"ai",       label:"IA / ML",    icon:Brain,      active:"text-violet-400" },
  { id:"db",       label:"Databases",  icon:Database,   active:"text-sky-400"    },
  { id:"tools",    label:"DevOps",     icon:Settings,   active:"text-yellow-400" },
];
function FilterBar({ active, onChange }) {
  return (
    <motion.div
      initial={{ opacity:0, y:22, filter:"blur(8px)" }}
      whileInView={{ opacity:1, y:0, filter:"blur(0px)" }}
      viewport={{ once:true }} transition={{ duration:0.68, ease:EASE_EXPO }}
      className="flex flex-wrap justify-center gap-2 mb-14"
    >
      {FILTERS.map((f, i) => {
        const on = active === f.id;
        const Ico = f.icon;
        return (
          <motion.button key={f.id}
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i*0.055, duration:0.48, ease:EASE_EXPO }}
            whileHover={{ scale:1.07, y:-2 }} whileTap={{ scale:0.93 }}
            onClick={() => onChange(f.id)}
            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full
                        text-[11px] font-semibold border transition-all duration-220
                        overflow-hidden backdrop-blur-md
                        ${on
                          ? "border-white/15 text-white shadow-lg shadow-black/28"
                          : "border-white/[0.05] bg-white/[0.015] text-gray-500 hover:text-gray-200 hover:border-white/10"}`}
          >
            {on && (
              <motion.div layoutId="fpill"
                className="absolute inset-0 rounded-full -z-10"
                style={{ background:"linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))" }}
                transition={{ type:"spring", stiffness:380, damping:32 }}
              />
            )}
            <Ico size={11} className={on ? f.active : ""}/>
            <span className={on ? f.active : ""}>{f.label}</span>
            {on && (
              <motion.div layoutId="fdot" className="w-1 h-1 rounded-full bg-white/55"
                transition={{ type:"spring", stiffness:380, damping:32 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION DIVIDER
══════════════════════════════════════════════════════ */
function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity:0, scaleX:0 }} whileInView={{ opacity:1, scaleX:1 }}
      viewport={{ once:true }} transition={{ duration:1.2, ease:EASE_EXPO }}
      className="flex items-center gap-4 my-14 mx-auto max-w-[200px]"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/28 to-transparent"/>
      <motion.div animate={{ rotate:360 }} transition={{ duration:12, repeat:Infinity, ease:"linear" }}>
        <Star size={12} className="text-blue-400/48"/>
      </motion.div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/28 to-transparent"/>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════ */
export default function Skills() {
  const reduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = useMemo(() => [
    {
      id:"lang", title:"Langages de Programmation",
      icon:Code, color:"text-blue-400",
      accentGradient:"from-blue-500 via-indigo-500 to-cyan-400",
      skills:[
        { icon:()=><img src={javaImg}   alt="Java"   className="size-7 object-contain"/>, label:"Java",       color:"text-red-400",    gradient:"from-red-500/30 to-orange-400/30"   },
        { icon:()=><img src={pythonImg} alt="Python" className="size-7 object-contain"/>, label:"Python",     color:"text-yellow-400", gradient:"from-yellow-400/30 to-blue-500/30"  },
        { icon:SiJavascript, label:"JavaScript", color:"text-yellow-400", gradient:"from-yellow-400/30 to-amber-400/30"  },
        { icon:SiTypescript, label:"TypeScript",  color:"text-blue-400",   gradient:"from-blue-500/30 to-cyan-400/30"    },
        { icon:SiPhp,        label:"PHP",         color:"text-purple-400", gradient:"from-purple-500/30 to-pink-400/30"  },
        { icon:SiDart,       label:"Dart",        color:"text-cyan-400",   gradient:"from-cyan-400/30 to-blue-400/30"    },
        { icon:()=><img src={cppImg}    alt="C/C++"  className="size-7 object-contain"/>, label:"C / C++",    color:"text-blue-500",   gradient:"from-blue-600/30 to-indigo-500/30" },
      ],
    },
    {
      id:"frontend", title:"Frontend & Mobile",
      icon:Smartphone, color:"text-cyan-400",
      accentGradient:"from-cyan-400 via-teal-400 to-blue-500",
      skills:[
        { icon:SiReact,       label:"React",        color:"text-cyan-400",   gradient:"from-cyan-400/30 to-blue-500/30"   },
        { icon:SiNextdotjs,   label:"Next.js",      color:"text-white",      gradient:"from-gray-400/20 to-slate-600/20"  },
        { icon:SiTailwindcss, label:"Tailwind CSS", color:"text-cyan-400",   gradient:"from-cyan-500/30 to-blue-500/30"   },
        { icon:SiVuedotjs,    label:"Vue.js",       color:"text-green-400",  gradient:"from-green-400/30 to-teal-500/30"  },
        { icon:FaReact,       label:"React Native", color:"text-blue-400",   gradient:"from-blue-400/30 to-cyan-400/30"   },
        { icon:()=><img src={flutterImg} alt="Flutter" className="size-7 object-contain"/>, label:"Flutter", color:"text-blue-300", gradient:"from-blue-300/30 to-indigo-400/30" },
        { icon:SiHtml5,       label:"HTML5",        color:"text-orange-500", gradient:"from-orange-500/30 to-red-400/30"  },
        { icon:SiCss3,        label:"CSS3",         color:"text-blue-500",   gradient:"from-blue-500/30 to-indigo-400/30" },
      ],
    },
    {
      id:"backend", title:"Backend & API",
      icon:Server, color:"text-green-400",
      accentGradient:"from-green-400 via-emerald-400 to-teal-400",
      skills:[
        { icon:FaNodeJs,     label:"Node.js",     color:"text-green-500", gradient:"from-green-500/30 to-emerald-400/30" },
        { icon:SiExpress,    label:"Express.js",  color:"text-gray-300",  gradient:"from-gray-400/20 to-slate-600/20"   },
        { icon:SiSpringboot, label:"Spring Boot", color:"text-green-400", gradient:"from-green-500/30 to-lime-400/30"   },
        { icon:SiFastapi,    label:"FastAPI",     color:"text-teal-400",  gradient:"from-teal-400/30 to-green-400/30"   },
        { icon:TbApi,        label:"REST API",    color:"text-gray-300",  gradient:"from-gray-400/20 to-slate-500/20"   },
        { icon:({className})=><JWTIcon className={className}/>, label:"JWT", color:"text-rose-400", gradient:"from-rose-500/30 to-pink-400/30" },
      ],
    },
    {
      id:"embedded", title:"Embarqué & IoT",
      icon:Cpu, color:"text-orange-400",
      accentGradient:"from-orange-400 via-amber-400 to-yellow-400",
      skills:[
        { icon:({className})=><SiRaspberrypi className={className}/>, label:"Raspberry Pi 4", color:"text-red-400",   gradient:"from-red-500/30 to-orange-400/30"   },
        { icon:({className})=><UARTIcon className={className}/>,      label:"UART / PPP",     color:"text-amber-400", gradient:"from-amber-400/30 to-yellow-400/30" },
        { icon:({className})=><IoTIcon className={className}/>,       label:"GSM / GPRS",     color:"text-cyan-300",  gradient:"from-cyan-300/30 to-blue-400/30"    },
      ],
    },
    {
      id:"ai", title:"Intelligence Artificielle & ML",
      icon:Brain, color:"text-violet-300",
      accentGradient:"from-violet-500 via-purple-400 to-fuchsia-500",
      isAI:true, badge:"PFE",
      skills:[
        { icon:()=><img src={pythonImg} alt="Python" className="size-7 object-contain"/>, label:"Python",    color:"text-blue-400",   gradient:"from-blue-400/30 to-cyan-500/30"    },
        { icon:({className})=><YOLOv8Icon className={className}/>,    label:"YOLOv8",    color:"text-orange-400", gradient:"from-orange-500/30 to-red-400/30"    },
        { icon:({className})=><SiOpencv className={className}/>,      label:"OpenCV",    color:"text-green-400",  gradient:"from-green-400/30 to-emerald-400/30" },
        { icon:({className})=><TFLiteIcon className={className}/>,    label:"TFLite",    color:"text-amber-400",  gradient:"from-amber-400/30 to-orange-400/30"  },
        { icon:SiNumpy,                                                label:"NumPy",     color:"text-blue-400",   gradient:"from-blue-400/30 to-indigo-400/30"   },
        { icon:({className})=><MediaPipeIcon className={className}/>, label:"MediaPipe", color:"text-teal-400",   gradient:"from-teal-400/30 to-green-400/30"    },
      ],
    },
    {
      id:"db", title:"Bases de Données",
      icon:Database, color:"text-sky-400",
      accentGradient:"from-sky-400 via-blue-400 to-indigo-500",
      skills:[
        { icon:BiLogoPostgresql, label:"PostgreSQL", color:"text-blue-400",   gradient:"from-blue-600/30 to-indigo-400/30"   },
        { icon:SiMongodb,        label:"MongoDB",    color:"text-green-500",  gradient:"from-green-500/30 to-emerald-400/30" },
        { icon:SiMysql,          label:"MySQL",      color:"text-blue-400",   gradient:"from-blue-500/30 to-cyan-400/30"     },
        { icon:SiSqlite,         label:"SQLite",     color:"text-blue-300",   gradient:"from-blue-400/30 to-cyan-300/30"     },
        { icon:SiFirebase,       label:"Firebase",   color:"text-yellow-500", gradient:"from-yellow-500/30 to-orange-400/30" },
        { icon:SiSupabase,       label:"Supabase",   color:"text-green-400",  gradient:"from-green-400/30 to-teal-400/30"    },
        { icon:SiOracle,         label:"Oracle",     color:"text-red-500",    gradient:"from-red-500/30 to-orange-400/30"    },
      ],
    },
    {
      id:"tools", title:"DevOps, Outils & Méthodes Agile",
      icon:FaTools, color:"text-yellow-400",
      accentGradient:"from-yellow-400 via-amber-400 to-orange-400",
      skills:[
        { icon:FaGitAlt,  label:"Git",          color:"text-orange-500", gradient:"from-orange-500/30 to-red-400/30"    },
        { icon:FaGithub,  label:"GitHub",       color:"text-gray-300",   gradient:"from-gray-500/20 to-gray-700/20"     },
        { icon:SiDocker,  label:"Docker",       color:"text-blue-400",   gradient:"from-blue-400/30 to-cyan-500/30"     },
        { icon:()=><img src={linuxImg}  alt="Linux"   className="size-7 rounded object-contain"/>, label:"Linux/Ubuntu",  color:"text-yellow-400", gradient:"from-yellow-500/30 to-orange-400/30" },
        { icon:()=><img src={vscodeImg} alt="VS Code" className="size-7 rounded object-contain"/>, label:"VS Code",       color:"text-blue-400",   gradient:"from-blue-500/30 to-cyan-400/30"     },
        { icon:SiOracle,  label:"Oracle DB",   color:"text-red-400",    gradient:"from-red-400/30 to-orange-300/30"    },
        { icon:({className})=><AgileIcon className={className}/>, label:"Méth. Agile", color:"text-purple-400", gradient:"from-purple-400/30 to-indigo-400/30" },
      ],
    },
  ], []);

  const visible = activeFilter === "all"
    ? categories
    : categories.filter(c => c.id === activeFilter);
  const total = categories.reduce((s, c) => s + c.skills.length, 0);

  /* stat cards data */
  const stats = useMemo(() => [
    {
      value: total, suffix: "+", label: "Technologies", sublabel: "maîtrisées",
      gradient: "from-blue-400 via-cyan-400 to-blue-500",
      gradientRaw: "#60a5fa, #22d3ee, #3b82f6",
      icon: Code, delay: 0.08, isText: false,
    },
    {
      value: 7, suffix: "", label: "Catégories", sublabel: "de compétences",
      gradient: "from-purple-400 via-fuchsia-400 to-pink-500",
      gradientRaw: "#c084fc, #e879f9, #ec4899",
      icon: Layers, delay: 0.16, isText: false,
    },
    {
      value: "Full", suffix: "-Stack", label: "Expertise", sublabel: "frontend · backend",
      gradient: "from-emerald-400 via-green-400 to-teal-500",
      gradientRaw: "#34d399, #4ade80, #14b8a6",
      icon: Globe, delay: 0.24, isText: true,
    },
    {
      value: "Edge", suffix: " AI", label: "Spécialité PFE", sublabel: "Raspberry Pi · ML",
      gradient: "from-violet-400 via-purple-400 to-indigo-500",
      gradientRaw: "#a78bfa, #c084fc, #6366f1",
      icon: Brain, delay: 0.32, isText: true,
    },
  ], [total]);

  return (
    <section id="skills" className="relative py-36 overflow-hidden"
      style={{ background:"linear-gradient(180deg,#020817 0%,#030d20 35%,#040b1a 65%,#020810 100%)" }}
    >
      <NeuralBackground reduced={reduced}/>
      <FloatingParticles reduced={reduced}/>
      <ScanLine reduced={reduced}/>

      {/* dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:"radial-gradient(circle,rgba(148,163,184,0.048) 1px,transparent 1px)", backgroundSize:"32px 32px" }}
      />
      {/* vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 85% 85% at 50% 50%,transparent 35%,rgba(2,8,23,0.72) 100%)" }}
      />

      {/* ambient orbs */}
      {!reduced && [
        { pos:"-top-48 -left-48",    size:"w-[800px] h-[800px]", c:["#1d4ed8","#6d28d9"], dur:26, dx:90,  dy:55  },
        { pos:"-bottom-48 -right-48",size:"w-[700px] h-[700px]", c:["#7c3aed","#be185d"], dur:32, dx:-70, dy:-50 },
        { pos:"top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", size:"w-[500px] h-[500px]", c:["#0e7490","#4f46e5"], dur:22, dx:45, dy:-35 },
        { pos:"top-1/4 right-1/4",   size:"w-[260px] h-[260px]", c:["#059669","#0891b2"], dur:18, dx:-30, dy:40  },
        { pos:"bottom-1/3 left-1/4", size:"w-[180px] h-[180px]", c:["#f59e0b","#ef4444"], dur:14, dx:25,  dy:-20 },
      ].map((o,i) => (
        <motion.div key={i}
          animate={{ x:[0,o.dx,0], y:[0,o.dy,0], scale:[1,1.18,1] }}
          transition={{ duration:o.dur, repeat:Infinity, ease:"easeInOut", repeatType:"mirror" }}
          className={`absolute ${o.pos} ${o.size} rounded-full pointer-events-none opacity-[0.042] blur-[110px]`}
          style={{ background:`radial-gradient(circle,${o.c[0]},${o.c[1]})` }}
        />
      ))}

      <div className="container relative mx-auto px-4 md:px-10 z-10 max-w-[1400px]">

        {/* ══ HEADER ══ */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once:true, margin:"-60px" }}
          variants={{ hidden:{opacity:0}, visible:{opacity:1, transition:{staggerChildren:0.13}} }}
          className="text-center mb-24"
        >
          <motion.div variants={fadeDown}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10
                       border border-blue-500/18 bg-blue-500/[0.055] backdrop-blur-xl
                       text-blue-400 text-[10px] font-black uppercase tracking-[0.24em]
                       shadow-xl shadow-blue-900/20"
          >
            <motion.div animate={reduced?{}:{rotate:360}} transition={{duration:10,repeat:Infinity,ease:"linear"}}>
              <Sparkles size={11}/>
            </motion.div>
            Stack Technique
            <motion.div animate={reduced?{}:{rotate:-360}} transition={{duration:10,repeat:Infinity,ease:"linear"}}>
              <Sparkles size={11}/>
            </motion.div>
          </motion.div>

          <motion.h2 variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-[88px] font-black tracking-tight mb-6 leading-[1.01]"
          >
            <span className="text-white">Mes </span>
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:"linear-gradient(90deg,#60a5fa 0%,#a78bfa 30%,#f472b6 60%,#60a5fa 100%)",
                  backgroundSize:"300% 100%", animation:"gradient-x 6s ease infinite",
                }}
              >
                Compétences
              </span>
              <motion.div
                initial={{scaleX:0,opacity:0}} whileInView={{scaleX:1,opacity:1}}
                viewport={{once:true}} transition={{delay:0.7,duration:1.2,ease:EASE_EXPO}} style={{originX:0.5}}
                className="absolute -bottom-3 left-0 right-0 h-[2px] rounded-full
                           bg-gradient-to-r from-transparent via-violet-400/75 to-transparent blur-sm"
              />
            </span>
          </motion.h2>

          <motion.p variants={fadeUp}
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Du développement <span className="text-white font-semibold">Full-Stack</span> à l'
            <span className="font-semibold" style={{
              background:"linear-gradient(90deg,#a78bfa,#818cf8)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>
              IA embarquée sur Raspberry Pi
            </span>{" "}
            — une palette complète de technologies modernes.
          </motion.p>

          <motion.div
            initial={{opacity:0,scaleX:0}} whileInView={{opacity:1,scaleX:1}}
            viewport={{once:true}} transition={{delay:0.55,duration:1.1,ease:EASE_EXPO}}
            className="mt-12 mx-auto flex items-center gap-4 max-w-[200px]"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500/32"/>
            <motion.div animate={reduced?{}:{rotate:360}} transition={{duration:14,repeat:Infinity,ease:"linear"}}>
              <Star size={13} className="text-blue-400/52"/>
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/32 to-transparent"/>
          </motion.div>
        </motion.div>

        {/* ══ STAT CARDS ══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((s, i) => <StatCard key={i} {...s}/>)}
        </div>

        {/* ══ FILTER ══ */}
        <FilterBar active={activeFilter} onChange={setActiveFilter}/>

        {/* ══ CATEGORIES ══ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity:0, y:26, filter:"blur(12px)" }}
            animate={{ opacity:1, y:0,  filter:"blur(0px)"  }}
            exit={{   opacity:0, y:-16, filter:"blur(8px)"  }}
            transition={{ duration:0.42, ease:EASE_EXPO }}
            className="space-y-6"
          >
            {visible.map((cat) => (
              <SkillCategory
                key={cat.id}
                title={cat.title} icon={cat.icon} color={cat.color}
                accentGradient={cat.accentGradient} isAI={cat.isAI}
                badge={cat.badge} count={cat.skills.length}
              >
                {cat.skills.map((sk, si) => (
                  <SkillCard
                    key={`${cat.id}-${si}`} index={si}
                    icon={sk.icon} label={sk.label} color={sk.color}
                    gradient={sk.gradient} isAI={cat.isAI} level={sk.level}
                  />
                ))}
              </SkillCategory>
            ))}
          </motion.div>
        </AnimatePresence>

        <SectionDivider/>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%,100% { background-position:0% 50%; }
          50%      { background-position:200% 50%; }
        }
      `}</style>
    </section>
  );
}