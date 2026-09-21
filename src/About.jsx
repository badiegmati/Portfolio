import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import {
  BookOpen, Globe, Code2, Sparkles, Target,
  GraduationCap, MapPin, Calendar, Award,
  ChevronRight, Cpu, Database, Smartphone,
  Wifi, Brain, ExternalLink, Star
} from 'lucide-react';
import { motion, useReducedMotion, useInView } from 'framer-motion';

/* ─────────────────────── constants ─────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1];
const EASE_BACK = [0.34, 1.56, 0.64, 1];

const LANGUAGES = [
  {
    name: 'Arabe', flag: '🇹🇳', level: 'Langue maternelle', pct: 100,
    color: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/30',
    badge: 'Natif', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    name: 'Français', flag: '🇫🇷', level: 'Intermédiaire', pct: 55,
    color: 'from-blue-500 to-indigo-500', glow: 'shadow-blue-500/30',
    badge: 'B1', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    name: 'Anglais', flag: '🇬🇧', level: 'Intermédiaire', pct: 55,
    color: 'from-purple-500 to-pink-500', glow: 'shadow-purple-500/30',
    badge: 'B1', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
];

const EDUCATION = [
  {
    degree: 'Licence en Informatique', school: 'ISIGK — Kairouan',
    period: 'Sept. 2023 – Juin 2026', mention: 'Mention Très Bien · 17/20',
    color: 'from-blue-500 to-purple-600', icon: GraduationCap, active: true,
  },
  {
    degree: 'Baccalauréat Sciences Informatiques', school: 'Lycée Bouargoub',
    period: 'Juin 2023', mention: "Sciences de l'Informatique",
    color: 'from-purple-500 to-pink-500', icon: BookOpen, active: false,
  },
];

const INTERESTS = [
  {
    icon: Globe, emoji: '🌐', title: 'Développement Web & Mobile',
    desc: 'Applications modernes Full-Stack avec Next.js, React, Flutter',
    color: 'from-blue-500/10 to-cyan-500/10', border: 'hover:border-blue-500/50',
    accent: 'text-blue-400', tags: ['Next.js', 'React', 'Flutter'],
  },
  {
    icon: Cpu, emoji: '🤖', title: 'IA Embarquée & Edge AI',
    desc: 'Vision par ordinateur temps réel sur Raspberry Pi',
    color: 'from-purple-500/10 to-pink-500/10', border: 'hover:border-purple-500/50',
    accent: 'text-purple-400', tags: ['YOLOv8', 'TFLite', 'OpenCV'],
  },
  {
    icon: Brain, emoji: '🧠', title: 'Machine Learning',
    desc: "Algorithmes prédictifs, traitement d'image et analyse de données",
    color: 'from-pink-500/10 to-rose-500/10', border: 'hover:border-pink-500/50',
    accent: 'text-pink-400', tags: ['Python', 'NumPy', 'TensorFlow'],
  },
  {
    icon: Database, emoji: '🗄️', title: 'Architecture & Bases de Données',
    desc: 'Conception microservices, optimisation SQL/NoSQL',
    color: 'from-amber-500/10 to-orange-500/10', border: 'hover:border-amber-500/50',
    accent: 'text-amber-400', tags: ['PostgreSQL', 'MongoDB', 'Supabase'],
  },
  {
    icon: Wifi, emoji: '📡', title: 'Internet des Objets (IoT)',
    desc: 'Systèmes connectés, GPIO, capteurs et automatisation',
    color: 'from-cyan-500/10 to-teal-500/10', border: 'hover:border-cyan-500/50',
    accent: 'text-cyan-400', tags: ['RPi.GPIO', 'IoT', 'C++'],
  },
];

const SOFT_SKILLS = [
  {
    label: 'Résolution de problèmes', icon: '🎯',
    desc: 'Analyse critique & solutions créatives',
    color: 'from-yellow-500 to-orange-500', textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/25', bgColor: 'bg-yellow-500/10',
  },
  {
    label: 'Autonomie & Rigueur', icon: '⚡',
    desc: 'Travail indépendant avec précision technique',
    color: 'from-blue-500 to-cyan-500', textColor: 'text-blue-400',
    borderColor: 'border-blue-500/25', bgColor: 'bg-blue-500/10',
  },
  {
    label: 'Travail en équipe', icon: '🤝',
    desc: 'Collaboration Agile & communication fluide',
    color: 'from-emerald-500 to-teal-500', textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/25', bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Communication', icon: '💬',
    desc: 'Expression claire & présentations techniques',
    color: 'from-purple-500 to-pink-500', textColor: 'text-purple-400',
    borderColor: 'border-purple-500/25', bgColor: 'bg-purple-500/10',
  },
];

/* ─────────────────────── variants ─────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
};

const stagger = (delay = 0.1, children = 0.15) => ({
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: children, delayChildren: delay },
  },
});

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
    const ctx = canvas.getContext('2d');
    const S   = stateRef.current;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      S.nodes = Array.from({ length: 60 }, () => ({
        x:    Math.random() * canvas.offsetWidth,
        y:    Math.random() * canvas.offsetHeight,
        vx:   (Math.random() - 0.5) * 0.26,
        vy:   (Math.random() - 0.5) * 0.26,
        r:    Math.random() * 1.6 + 0.5,
        hue:  Math.random() > 0.5 ? 220 + Math.random() * 40 : 260 + Math.random() * 40,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < S.nodes.length; i++) {
        for (let j = i + 1; j < S.nodes.length; j++) {
          const a = S.nodes[i], b = S.nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            g.addColorStop(0, `hsla(${a.hue},85%,68%,${alpha})`);
            g.addColorStop(1, `hsla(${b.hue},85%,68%,${alpha})`);
            ctx.strokeStyle = g; ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      S.nodes.forEach(n => {
        n.pulse += 0.02; n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
        const p = 0.5 + 0.5 * Math.sin(n.pulse);
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        grd.addColorStop(0, `hsla(${n.hue},90%,72%,${0.6 * p})`);
        grd.addColorStop(1, `hsla(${n.hue},90%,72%,0)`);
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2); ctx.fill();
      });

      S.raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas); resize(); S.raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(S.raf); ro.disconnect(); };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.38 }}
    />
  );
}

/* ══════════════════════════════════════════════════════
   FLOATING PARTICLES
══════════════════════════════════════════════════════ */
function FloatingParticles({ reduced }) {
  const pts = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8, dur: Math.random() * 12 + 9,
      del: Math.random() * 7, hue: [220, 260, 280, 200][i % 4],
    })), []);

  if (reduced) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pts.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: `hsla(${p.hue},80%,65%,0.55)`,
            boxShadow: `0 0 ${p.size * 3}px hsla(${p.hue},80%,65%,0.35)`,
          }}
          animate={{ y: [0,-55,0], x: [0, Math.sin(p.id)*28, 0], opacity: [0,0.75,0], scale: [0.5,1.15,0.5] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: 'easeInOut' }}
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
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-0"
      style={{
        background: 'linear-gradient(90deg,transparent,rgba(96,165,250,0.12),rgba(167,139,250,0.18),rgba(96,165,250,0.12),transparent)',
      }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />
  );
}

/* ─────────────────────── AnimatedBar ─────────────────────── */
function AnimatedBar({ pct, color, delay = 0 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="h-2 rounded-full overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.06)' }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.1, delay, ease: EASE_EXPO }}
        className={`h-full bg-gradient-to-r ${color} rounded-full relative`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30
                        to-transparent animate-shimmer rounded-full" />
      </motion.div>
    </div>
  );
}

/* ─────────────────────── CountUp ─────────────────────────── */
function CountUp({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / 1200, 1);
      setVal(Math.floor(prog * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────────── EducationCard ─────────────────────── */
function EducationCard({ item, index, reduced }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { y: -5 }}
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
      {/* left accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.7, ease: EASE_EXPO }}
        style={{ originY: 0 }}
        className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full
                    bg-gradient-to-b ${item.color}`}
      />

      {/* inner glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 30% 50%,${
            item.active ? 'rgba(96,165,250,0.06)' : 'rgba(167,139,250,0.04)'
          } 0%,transparent 70%)`,
        }}
      />

      <motion.div
        whileHover={reduced ? {} : { rotate: 12, scale: 1.12 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14 }}
        className="relative flex-shrink-0"
      >
        <div className={`absolute inset-0 rounded-xl blur-md opacity-40
                         bg-gradient-to-br ${item.color}`} />
        <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${item.color}
                         flex items-center justify-center shadow-lg ring-1 ring-white/15`}>
          <Icon size={22} className="text-white" />
        </div>
        <motion.div
          animate={{ scale: [1,1.5,1], opacity: [0.3,0,0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: index * 0.4 }}
          className="absolute inset-0 rounded-xl border border-white/25"
        />
      </motion.div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h4 className="text-white font-bold text-base leading-tight
                         group-hover:text-blue-100 transition-colors duration-300">
            {item.degree}
          </h4>
          {item.active && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, ease: EASE_BACK }}
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full
                         bg-green-500/15 text-green-400 border border-green-500/28
                         flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              En cours
            </motion.span>
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

      {/* corner dots */}
      <div className="absolute top-3 right-3 flex gap-1 opacity-20">
        {[0,1,2].map(i => (
          <motion.div key={i}
            animate={{ opacity: hovered ? [0.4,1,0.4] : 0.3 }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-white"
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────── LanguageCard ─────────────────────── */
function LanguageCard({ lang, index, reduced }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { y: -8, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-5 rounded-2xl border transition-all duration-300 group overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(145deg,rgba(13,20,42,0.95) 0%,rgba(8,10,20,0.98) 100%)',
        backdropFilter: 'blur(24px)',
        borderColor: hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.5)` : '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* top accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12 + 0.3, duration: 0.9, ease: EASE_EXPO }}
        style={{ originX: 0.5 }}
        className={`absolute top-0 left-4 right-4 h-px rounded-full bg-gradient-to-r ${lang.color}`}
      />

      {/* glow blob */}
      <motion.div
        animate={{ opacity: hovered ? 0.12 : 0.05, scale: hovered ? 1.2 : 1 }}
        transition={{ duration: 0.5 }}
        className={`absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl pointer-events-none
                    bg-gradient-to-br ${lang.color}`}
      />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.span
            animate={hovered && !reduced ? { scale: 1.2, rotate: -5 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
            className="text-2xl"
          >
            {lang.flag}
          </motion.span>
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
        <motion.span
          animate={hovered ? { scale: 1.1 } : { scale: 1 }}
          className={`text-[10px] font-black bg-gradient-to-r ${lang.color}
                      bg-clip-text text-transparent`}
        >
          {lang.pct}%
        </motion.span>
      </div>

      {/* shimmer bar */}
      <motion.div
        animate={{ width: hovered ? '65%' : '30%', opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.45, ease: EASE_EXPO }}
        className={`h-px mx-auto mt-3 rounded-full bg-gradient-to-r ${lang.color}`}
      />
    </motion.div>
  );
}

/* ─────────────────────── InterestCard ─────────────────────── */
function InterestCard({ item, index, reduced }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { x: 8, scale: 1.01 }}
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
      {/* animated bg glow */}
      <motion.div
        animate={hovered && !reduced ? { scale: 1.5, opacity: 0.18 } : { scale: 1, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute -right-10 -bottom-10 w-36 h-36 rounded-full pointer-events-none
                    bg-gradient-to-br ${item.color.replace('/10', '/40')} blur-2xl`}
      />

      {/* left accent */}
      <motion.div
        animate={hovered && !reduced ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_EXPO }}
        className={`absolute left-0 top-0 bottom-0 w-[2px] origin-top rounded-r-full
                    bg-gradient-to-b ${item.color.replace('/10', '')}`}
      />

      {/* icon */}
      <motion.div
        animate={hovered && !reduced ? { rotate: -8, scale: 1.15 } : { rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="flex-shrink-0 relative"
      >
        <div className={`absolute inset-0 rounded-xl blur-md opacity-0
                         group-hover:opacity-30 transition-opacity duration-300
                         bg-gradient-to-br ${item.color.replace('/10', '')}`} />
        <div className="relative w-11 h-11 rounded-xl flex items-center justify-center
                        border border-white/[0.08] group-hover:border-white/[0.15]
                        transition-colors duration-300"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <Icon size={20} className={item.accent} />
        </div>
      </motion.div>

      {/* text */}
      <div className="flex-1 min-w-0">
        <h4 className={`font-bold text-white mb-1 text-sm
                        group-hover:text-blue-100 transition-colors duration-300`}>
          {item.title}
        </h4>
        <p className="text-gray-500 text-xs leading-relaxed mb-2.5
                      group-hover:text-gray-400 transition-colors duration-300">
          {item.desc}
        </p>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag, i) => (
            <motion.span
              key={i}
              whileHover={reduced ? {} : { scale: 1.08, y: -2 }}
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                          border border-white/[0.08] ${item.accent} cursor-default`}
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* arrow */}
      <motion.div
        animate={hovered && !reduced ? { x: 0, opacity: 1 } : { x: -8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`flex-shrink-0 self-center ${item.accent}`}
      >
        <ChevronRight size={16} />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── SoftSkillBar ─────────────────────── */
function SoftSkillBar({ skill, index, reduced }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { x: 5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-4 p-4 rounded-2xl border
                 transition-all duration-300 group cursor-default overflow-hidden"
      style={{
        background: hovered
          ? 'rgba(255,255,255,0.04)'
          : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        borderColor: hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
      }}
    >
      {/* left accent */}
      <motion.div
        animate={hovered && !reduced ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_EXPO }}
        className={`absolute left-0 top-0 bottom-0 w-0.5 origin-top rounded-r-full
                    bg-gradient-to-b ${skill.color}`}
      />

      {/* icon */}
      <motion.div
        animate={hovered && !reduced ? { scale: 1.2, rotate: -8 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 14 }}
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                   text-xl select-none border border-white/[0.07]"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        {skill.icon}
      </motion.div>

      {/* text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className={`font-bold text-sm text-white
                          group-hover:${skill.textColor} transition-colors duration-300`}>
            {skill.label}
          </h4>
          <motion.div
            animate={hovered && !reduced ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full
                        ${skill.textColor} border ${skill.borderColor}`}
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            ✓
          </motion.div>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed
                      group-hover:text-gray-400 transition-colors duration-300">
          {skill.desc}
        </p>
      </div>

      {/* arrow */}
      <motion.div
        animate={hovered && !reduced ? { x: 0, opacity: 1 } : { x: -6, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`flex-shrink-0 self-center ${skill.textColor}`}
      >
        <ChevronRight size={15} />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── StatBadge ─────────────────────────── */
function StatBadge({ value, label, color, gradient, gradientRaw, delay = 0, reduced }) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.88, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: EASE_BACK }}
      whileHover={reduced ? {} : { y: -7, scale: 1.04 }}
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
      {/* top accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.3, duration: 0.9, ease: EASE_EXPO }}
        style={{ originX: 0.5 }}
        className={`absolute top-0 left-4 right-4 h-px rounded-full bg-gradient-to-r ${gradient}`}
      />

      {/* glow blob */}
      <motion.div
        animate={{ opacity: hovered ? 0.15 : 0.05, scale: hovered ? 1.2 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none"
        style={{ background: `linear-gradient(135deg,${gradientRaw})` }}
      />

      <div
        className={`text-2xl font-black bg-gradient-to-r ${gradient}
                     bg-clip-text text-transparent mb-1.5 tabular-nums`}
      >
        {value}
      </div>
      <div className="text-gray-500 text-[11px] font-semibold uppercase tracking-[0.18em]">
        {label}
      </div>

      {/* shimmer bar */}
      <motion.div
        animate={{ width: hovered ? '60%' : '28%', opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.45, ease: EASE_EXPO }}
        className={`h-px mx-auto mt-3 rounded-full bg-gradient-to-r ${gradient}`}
      />
    </motion.div>
  );
}

/* ─────────────────────── SectionTitle ─────────────────────── */
function SectionTitle({ icon: Icon, title, sub, gradient, iconGradient }) {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
      <div className="relative flex-shrink-0">
        <div className={`absolute inset-0 rounded-xl blur-md opacity-40
                         bg-gradient-to-br ${iconGradient}`} />
        <div className={`relative p-2.5 rounded-xl bg-gradient-to-br ${iconGradient}
                         shadow-lg ring-1 ring-white/15`}>
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
  );
}

/* ─────────────────────── About (main) ─────────────────────── */
export default function About() {
  const reduced = useReducedMotion();

  const stats = [
    { value: '17/20', label: 'Mention Très Bien',  gradient: 'from-yellow-400 to-orange-400', gradientRaw: '#fbbf24,#f97316' },
    { value: '3+',    label: 'Projets majeurs',     gradient: 'from-blue-400 to-cyan-400',    gradientRaw: '#60a5fa,#22d3ee' },
    { value: '2023',  label: 'Début de formation',  gradient: 'from-purple-400 to-pink-400',  gradientRaw: '#c084fc,#f472b6' },
    { value: '3',     label: 'Langues pratiquées',  gradient: 'from-emerald-400 to-teal-400', gradientRaw: '#34d399,#14b8a6' },
  ];

  return (
    <section
      id="about"
      className="relative py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg,#020817 0%,#030d20 35%,#040b1a 65%,#020810 100%)',
      }}
    >
      {/* ── Neural canvas ── */}
      <NeuralBackground reduced={reduced} />

      {/* ── Floating particles ── */}
      <FloatingParticles reduced={reduced} />

      {/* ── Scan line ── */}
      <ScanLine reduced={reduced} />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle,rgba(148,163,184,0.048) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 85% 85% at 50% 50%,transparent 35%,rgba(2,8,23,0.72) 100%)',
        }}
      />

      {/* ── Ambient orbs ── */}
      {!reduced && [
        { pos: '-top-48 -left-48',     size: 'w-[800px] h-[800px]', c: ['#1d4ed8','#6d28d9'], dur: 26, dx: 90,  dy: 55  },
        { pos: '-bottom-48 -right-48', size: 'w-[700px] h-[700px]', c: ['#7c3aed','#be185d'], dur: 32, dx: -70, dy: -50 },
        { pos: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          size: 'w-[500px] h-[500px]', c: ['#0e7490','#4f46e5'], dur: 22, dx: 45,  dy: -35 },
        { pos: 'top-1/4 right-1/4',   size: 'w-[260px] h-[260px]', c: ['#059669','#0891b2'], dur: 18, dx: -30, dy: 40  },
        { pos: 'bottom-1/3 left-1/4', size: 'w-[180px] h-[180px]', c: ['#f59e0b','#ef4444'], dur: 14, dx: 25,  dy: -20 },
      ].map((o, i) => (
        <motion.div
          key={i}
          animate={{ x: [0,o.dx,0], y: [0,o.dy,0], scale: [1,1.18,1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          className={`absolute ${o.pos} ${o.size} rounded-full pointer-events-none opacity-[0.042] blur-[110px]`}
          style={{ background: `radial-gradient(circle,${o.c[0]},${o.c[1]})` }}
        />
      ))}

      <div className="container relative mx-auto px-4 md:px-10 z-10 max-w-[1400px]">

        {/* ── HEADER ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.13 } } }}
          className="text-center mb-24"
        >
          {/* badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10
                       border border-blue-500/18 bg-blue-500/[0.055] backdrop-blur-xl
                       text-blue-400 text-[10px] font-black uppercase tracking-[0.24em]
                       shadow-xl shadow-blue-900/20"
          >
            <motion.div
              animate={reduced ? {} : { rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={11} />
            </motion.div>
            Qui suis-je
            <motion.div
              animate={reduced ? {} : { rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={11} />
            </motion.div>
          </motion.div>

          {/* title */}
          <motion.h2
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-[88px] font-black tracking-tight mb-6 leading-[1.01]"
          >
            <span className="text-white">À </span>
            <span className="relative inline-block">
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg,#60a5fa 0%,#a78bfa 30%,#f472b6 60%,#60a5fa 100%)',
                  backgroundSize: '300% 100%',
                  animation: 'gradient-x 6s ease infinite',
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

          {/* subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Passionné par la création de{' '}
            <span className="text-white font-semibold">solutions innovantes</span> et l'exploration des{' '}
            <span
              className="font-semibold"
              style={{
                background: 'linear-gradient(90deg,#a78bfa,#818cf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}
            >
              technologies émergentes
            </span>
          </motion.p>

          {/* divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 1.1, ease: EASE_EXPO }}
            className="mt-12 mx-auto flex items-center gap-4 max-w-[200px]"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500/32" />
            <motion.div
              animate={reduced ? {} : { rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            >
              <Star size={13} className="text-blue-400/52" />
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/32 to-transparent" />
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

          {/* ── COLUMN 1 : Education + Soft Skills ── */}
          <div className="xl:col-span-1 space-y-8">

            {/* Education */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={stagger(0.1, 0.15)}
              className="space-y-3"
            >
              <SectionTitle
                icon={GraduationCap} title="Parcours Académique"
                sub="Formation & Diplômes"
                gradient="from-blue-400 to-purple-500"
                iconGradient="from-blue-500 to-purple-600"
              />
              {EDUCATION.map((item, i) => (
                <EducationCard key={i} item={item} index={i} reduced={reduced} />
              ))}

              {/* location */}
              <motion.div
                variants={fadeUp}
                whileHover={reduced ? {} : { x: 4 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border
                           border-white/[0.07] transition-all duration-300 cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}
              >
                <MapPin size={14} className="text-red-400" />
                <span className="text-gray-300 text-sm">Bouargoub, Nabeul, Tunisie</span>
              </motion.div>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={stagger(0.1, 0.12)}
              className="p-6 rounded-2xl border border-white/[0.06] space-y-4"
              style={{
                background: 'linear-gradient(145deg,rgba(13,20,42,0.92) 0%,rgba(8,10,20,0.96) 100%)',
                backdropFilter: 'blur(24px)',
              }}
            >
              {/* section top accent */}
              <div className="absolute top-0 left-6 right-6 h-px rounded-full
                              bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

              <SectionTitle
                icon={Target} title="Compétences Transversales"
                sub="Soft skills & mindset"
                gradient="from-amber-400 to-orange-400"
                iconGradient="from-amber-500 to-orange-500"
              />
              {SOFT_SKILLS.map((s, i) => (
                <SoftSkillBar key={i} skill={s} index={i} reduced={reduced} />
              ))}
            </motion.div>
          </div>

          {/* ── COLUMN 2 : Languages + Interests ── */}
          <div className="xl:col-span-2 space-y-8">

            {/* Languages */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={stagger(0.1, 0.12)}
            >
              <SectionTitle
                icon={Globe} title="Langues Maîtrisées"
                sub="Compétences linguistiques"
                gradient="from-emerald-400 to-cyan-400"
                iconGradient="from-emerald-500 to-cyan-500"
              />
              <div className="grid sm:grid-cols-3 gap-4">
                {LANGUAGES.map((lang, i) => (
                  <LanguageCard key={i} lang={lang} index={i} reduced={reduced} />
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={stagger(0.1, 0.1)}
            >
              <SectionTitle
                icon={Code2} title="Centres d'Intérêt & Spécialisations"
                sub="Domaines de passion technique"
                gradient="from-purple-400 to-pink-400"
                iconGradient="from-purple-500 to-pink-500"
              />
              <div className="grid sm:grid-cols-1 gap-3">
                {INTERESTS.map((item, i) => (
                  <InterestCard key={i} item={item} index={i} reduced={reduced} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%,100% { background-position: 0%   50%; }
          50%      { background-position: 200% 50%; }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%);  }
        }
        .animate-shimmer {
          animation: shimmer 2.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}