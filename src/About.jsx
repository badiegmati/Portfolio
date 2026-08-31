import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen, Globe, Code2, Sparkles, Target,
  GraduationCap, MapPin, Calendar, Award,
  ChevronRight, Cpu, Database, Smartphone,
  Wifi, Brain, ExternalLink
} from 'lucide-react';
import { motion, useReducedMotion, useInView } from 'framer-motion';

/* ─────────────────────── constants ─────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1];

const LANGUAGES = [
  {
    name: 'Arabe',
    flag: '🇹🇳',
    level: 'Langue maternelle',
    pct: 100,
    color: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/30',
    badge: 'Natif',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    name: 'Français',
    flag: '🇫🇷',
    level: 'Intermédiaire',
    pct: 55,
    color: 'from-blue-500 to-indigo-500',
    glow: 'shadow-blue-500/30',
    badge: 'B1',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    name: 'Anglais',
    flag: '🇬🇧',
    level: 'Intermédiaire',
    pct: 55,
    color: 'from-purple-500 to-pink-500',
    glow: 'shadow-purple-500/30',
    badge: 'B1',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
];

const EDUCATION = [
  {
    degree: 'Licence en Informatique',
    school: 'ISIGK — Kairouan',
    period: 'Sept. 2023 – Juin 2026',
    mention: 'Mention Très Bien · 17/20',
    color: 'from-blue-500 to-purple-600',
    icon: GraduationCap,
    active: true,
  },
  {
    degree: 'Baccalauréat Sciences Informatiques',
    school: 'Lycée Bouargoub',
    period: 'Juin 2023',
    mention: 'Sciences de l\'Informatique',
    color: 'from-purple-500 to-pink-500',
    icon: BookOpen,
    active: false,
  },
];

const INTERESTS = [
  {
    icon: Globe,
    emoji: '🌐',
    title: 'Développement Web & Mobile',
    desc: 'Applications modernes Full-Stack avec Next.js, React, Flutter',
    color: 'from-blue-500/10 to-cyan-500/10',
    border: 'hover:border-blue-500/50',
    accent: 'text-blue-400',
    tags: ['Next.js', 'React', 'Flutter'],
  },
  {
    icon: Cpu,
    emoji: '🤖',
    title: 'IA Embarquée & Edge AI',
    desc: 'Vision par ordinateur temps réel sur Raspberry Pi',
    color: 'from-purple-500/10 to-pink-500/10',
    border: 'hover:border-purple-500/50',
    accent: 'text-purple-400',
    tags: ['YOLOv8', 'TFLite', 'OpenCV'],
  },
  {
    icon: Brain,
    emoji: '🧠',
    title: 'Machine Learning',
    desc: 'Algorithmes prédictifs, traitement d\'image et analyse de données',
    color: 'from-pink-500/10 to-rose-500/10',
    border: 'hover:border-pink-500/50',
    accent: 'text-pink-400',
    tags: ['Python', 'NumPy', 'TensorFlow'],
  },
  {
    icon: Database,
    emoji: '🗄️',
    title: 'Architecture & Bases de Données',
    desc: 'Conception microservices, optimisation SQL/NoSQL',
    color: 'from-amber-500/10 to-orange-500/10',
    border: 'hover:border-amber-500/50',
    accent: 'text-amber-400',
    tags: ['PostgreSQL', 'MongoDB', 'Supabase'],
  },
  {
    icon: Wifi,
    emoji: '📡',
    title: 'Internet des Objets (IoT)',
    desc: 'Systèmes connectés, GPIO, capteurs et automatisation',
    color: 'from-cyan-500/10 to-teal-500/10',
    border: 'hover:border-cyan-500/50',
    accent: 'text-cyan-400',
    tags: ['RPi.GPIO', 'IoT', 'C++'],
  },
];

const SOFT_SKILLS = [
  {
    label: 'Résolution de problèmes',
    icon: '🎯',
    desc: 'Analyse critique & solutions créatives',
    color: 'from-yellow-500 to-orange-500',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/25',
    bgColor: 'bg-yellow-500/10',
    
  },
  {
    label: 'Autonomie & Rigueur',
    icon: '⚡',
    desc: 'Travail indépendant avec précision technique',
    color: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/25',
    bgColor: 'bg-blue-500/10',
    
  },
  {
    label: 'Travail en équipe',
    icon: '🤝',
    desc: 'Collaboration Agile & communication fluide',
    color: 'from-emerald-500 to-teal-500',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/25',
    bgColor: 'bg-emerald-500/10',
    
  },
  {
    label: 'Communication',
    icon: '💬',
    desc: 'Expression claire & présentations techniques',
    color: 'from-purple-500 to-pink-500',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500/25',
    bgColor: 'bg-purple-500/10',
    
  },
];

/* ─────────────────────── animation variants ─────────────────────── */
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

/* ─────────────────────── AnimatedBar ───────────────────────────── */
function AnimatedBar({ pct, color, delay = 0 }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="h-2 bg-gray-700/60 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.1, delay, ease: EASE_EXPO }}
        className={`h-full bg-gradient-to-r ${color} rounded-full relative`}
      >
        {/* shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                        animate-shimmer rounded-full" />
      </motion.div>
    </div>
  );
}

/* ─────────────────────── CountUp ───────────────────────────────── */
function CountUp({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / 1200, 1);
      setVal(Math.floor(prog * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────────── Particles ─────────────────────────────── */
function Particles({ reduced }) {
  const ref = useRef(null);
  const cnt = useRef(0);

  const spawn = React.useCallback(() => {
    if (!ref.current || cnt.current > 20) return;
    const el  = document.createElement('div');
    const sz  = Math.random() * 2.5 + 1;
    const dur = Math.random() * 4000 + 3000;
    const hue = Math.random() > 0.5 ? '59,130,246' : '147,51,234';

    Object.assign(el.style, {
      position: 'absolute', width: `${sz}px`, height: `${sz}px`,
      borderRadius: '50%', left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`, opacity: '0', pointerEvents: 'none',
      background: `rgba(${hue},0.6)`,
      boxShadow: `0 0 ${sz * 3}px rgba(${hue},0.5)`,
    });

    const anim = el.animate([
      { opacity: 0, transform: 'translateY(0) scale(0)' },
      { opacity: 0.8, transform: `translateY(-${Math.random() * 70 + 30}px) scale(1)`, offset: 0.4 },
      { opacity: 0,  transform: `translateY(-${Math.random() * 150 + 80}px) scale(0.3)` },
    ], { duration: dur, easing: 'cubic-bezier(0.4,0,0.2,1)' });

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

/* ─────────────────────── EducationCard ─────────────────────────── */
function EducationCard({ item, index, reduced }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`relative flex gap-5 p-5 rounded-2xl border transition-all duration-300
                  ${item.active
                    ? 'bg-gray-800/60 border-blue-500/30 hover:border-blue-500/60'
                    : 'bg-gray-800/30 border-gray-700/40 hover:border-gray-600/60'
                  } backdrop-blur-sm group`}
    >
      {/* left accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl
                       bg-gradient-to-b ${item.color} opacity-70`} />

      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color}
                       flex items-center justify-center shadow-lg
                       group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={22} className="text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h4 className="text-white font-bold text-base leading-tight">{item.degree}</h4>
          {item.active && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full
                             bg-green-500/15 text-green-400 border border-green-500/25">
              En cours
            </span>
          )}
        </div>
        <p className="text-blue-300 text-sm font-medium mb-1">{item.school}</p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar size={11} /> {item.period}
          </span>
          <span className="flex items-center gap-1">
            <Award size={11} className="text-yellow-400" />
            <span className="text-yellow-400 font-medium">{item.mention}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── LanguageCard ──────────────────────────── */
function LanguageCard({ lang, index, reduced }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative p-5 rounded-2xl bg-gray-800/50 backdrop-blur-sm
                  border border-gray-700/40 hover:border-gray-600/60
                  shadow-lg ${lang.glow} hover:shadow-xl
                  transition-all duration-300 group overflow-hidden`}
    >
      {/* bg glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${lang.color}
                       opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{lang.flag}</span>
          <span className="text-white font-bold">{lang.name}</span>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full border ${lang.badgeColor}`}>
          {lang.badge}
        </span>
      </div>

      <p className="text-gray-400 text-xs mb-3">{lang.level}</p>

      <AnimatedBar pct={lang.pct} color={lang.color} delay={index * 0.15 + 0.3} />

      <div className="flex justify-between mt-1.5">
        <span className="text-gray-500 text-[10px]">Niveau</span>
        <span className={`text-[10px] font-bold bg-gradient-to-r ${lang.color}
                          bg-clip-text text-transparent`}>
          {lang.pct}%
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── InterestCard ──────────────────────────── */
function InterestCard({ item, index, reduced }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { x: 6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-start gap-4 p-5 rounded-2xl
                  bg-gradient-to-br ${item.color} border border-gray-700/40
                  ${item.border} transition-all duration-300
                  backdrop-blur-sm group cursor-default overflow-hidden`}
    >
      {/* animated bg */}
      <motion.div
        animate={hovered && !reduced ? { scale: 1.5, opacity: 0.15 } : { scale: 1, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full
                    bg-gradient-to-br ${item.color.replace('/10', '/30')}`}
      />

      {/* icon */}
      <motion.div
        animate={hovered && !reduced ? { rotate: -8, scale: 1.15 } : { rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gray-800/80
                    flex items-center justify-center border border-gray-700/60
                    group-hover:border-gray-600/80 transition-colors duration-300`}
      >
        <Icon size={20} className={item.accent} />
      </motion.div>

      {/* text */}
      <div className="flex-1 min-w-0">
        <h4 className={`font-bold text-white mb-1 text-sm
                        group-hover:${item.accent} transition-colors duration-300`}>
          {item.title}
        </h4>
        <p className="text-gray-400 text-xs leading-relaxed mb-2 group-hover:text-gray-300
                      transition-colors duration-300">
          {item.desc}
        </p>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag, i) => (
            <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                                      bg-gray-800/70 ${item.accent} border border-gray-700/50`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* arrow */}
      <motion.div
        animate={hovered && !reduced ? { x: 0, opacity: 1 } : { x: -8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 self-center"
      >
        <ChevronRight size={16} className={item.accent} />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── SoftSkillBar ──────────────────────────── */
function SoftSkillBar({ skill, index, reduced }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduced ? {} : { x: 4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-start gap-4 p-4 rounded-2xl
                  border ${skill.borderColor} ${skill.bgColor}
                  hover:border-opacity-60 transition-all duration-300
                  group cursor-default overflow-hidden`}
    >
      {/* animated left accent */}
      <motion.div
        animate={hovered && !reduced
          ? { scaleY: 1, opacity: 1 }
          : { scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_EXPO }}
        className={`absolute left-0 top-0 bottom-0 w-0.5 origin-top
                    bg-gradient-to-b ${skill.color} rounded-r-full`}
      />

      {/* icon */}
      <motion.div
        animate={hovered && !reduced
          ? { scale: 1.2, rotate: -8 }
          : { scale: 1,   rotate: 0  }}
        transition={{ type: 'spring', stiffness: 400, damping: 14 }}
        className={`flex-shrink-0 w-10 h-10 rounded-xl ${skill.bgColor}
                    border ${skill.borderColor} flex items-center justify-center
                    text-xl select-none`}
      >
        {skill.icon}
      </motion.div>

      {/* text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <h4 className={`font-bold text-sm text-white
                          group-hover:${skill.textColor}
                          transition-colors duration-300`}>
            {skill.label}
          </h4>
          {/* animated check on hover */}
          <motion.div
            animate={hovered && !reduced
              ? { scale: 1, opacity: 1 }
              : { scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex-shrink-0 text-xs font-bold px-2 py-0.5
                        rounded-full ${skill.bgColor} ${skill.textColor}
                        border ${skill.borderColor}`}
          >
            ✓
          </motion.div>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed mb-2.5
                      group-hover:text-gray-400 transition-colors duration-300">
          {skill.desc}
        </p>

        
      </div>

      {/* arrow */}
      <motion.div
        animate={hovered && !reduced
          ? { x: 0, opacity: 1 }
          : { x: -6, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`flex-shrink-0 self-center ${skill.textColor}`}
      >
        <ChevronRight size={15} />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── StatBadge ─────────────────────────────── */
function StatBadge({ value, label, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -4, scale: 1.05 }}
      className="flex flex-col items-center p-4 rounded-2xl bg-gray-800/50
                 border border-gray-700/40 hover:border-gray-600/60
                 backdrop-blur-sm transition-all duration-300 cursor-default"
    >
      <span className={`text-2xl font-black ${color} mb-1`}>{value}</span>
      <span className="text-gray-400 text-xs text-center leading-tight">{label}</span>
    </motion.div>
  );
}

/* ─────────────────────── About (main) ──────────────────────────── */
export default function About() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden bg-gray-950"
    >
      {/* ── background ── */}
      <Particles reduced={reduced} />

      {/* grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { cls: 'top-[-5%] left-[-5%] w-[500px] h-[500px]', from: '#2563eb', to: '#7c3aed', dur: 22, dx: 60, dy: 40 },
          { cls: 'bottom-[-5%] right-[-5%] w-[400px] h-[400px]', from: '#7c3aed', to: '#db2777', dur: 28, dx: -60, dy: -40 },
        ].map((o, i) => (
          <motion.div
            key={i}
            animate={reduced ? {} : { x: [0, o.dx, 0], y: [0, o.dy, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
            className={`absolute ${o.cls} rounded-full opacity-[0.06] blur-[90px]`}
            style={{ background: `radial-gradient(circle, ${o.from}, ${o.to})` }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 md:px-8 z-10">
        <div className="max-w-7xl mx-auto">

          {/* ── section header ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger(0, 0.12)}
            className="text-center mb-20"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2
              rounded-full border border-blue-500/25 bg-blue-500/8 text-blue-400
              text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles size={13} className="animate-pulse" />
              Qui suis-je
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight"
            >
              <span className="text-white">À </span>
              <span className="text-transparent bg-clip-text
                               bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
                               animate-gradient-x">
                Propos
              </span>
              <span className="text-white"> de Moi</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-400 max-w-2xl mx-auto"
            >
              Passionné par la création de solutions innovantes et
              l'exploration des technologies émergentes
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.9, ease: EASE_EXPO }}
              className="mt-8 mx-auto h-1 w-48 rounded-full origin-left
                         bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            />
          </motion.div>

          {/* ── quick stats row ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger(0.1, 0.1)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
          >
            {[
              { value: '17/20',   label: 'Mention Très Bien',    color: 'text-yellow-400' },
              { value: '3+',      label: 'Projets majeurs',      color: 'text-blue-400'   },
              { value: '2023',    label: 'Début de formation',   color: 'text-purple-400' },
              { value: '3',       label: 'Langues pratiquées',   color: 'text-emerald-400'},
            ].map((s, i) => (
              <StatBadge key={i} {...s} delay={i * 0.1} />
            ))}
          </motion.div>

          {/* ── main grid ── */}
          <div className="grid xl:grid-cols-3 gap-8">

            {/* ── column 1 : education + soft skills ── */}
            <div className="xl:col-span-1 space-y-8">

              {/* Education */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={stagger(0.1, 0.15)}
                className="space-y-3"
              >
                {/* card header */}
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg
                                  shadow-blue-500/30">
                    <GraduationCap size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Parcours Académique</h3>
                    <p className="text-gray-400 text-xs">Formation & Diplômes</p>
                  </div>
                </motion.div>

                {EDUCATION.map((item, i) => (
                  <EducationCard key={i} item={item} index={i} reduced={reduced} />
                ))}

                {/* location pill */}
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                             bg-gray-800/40 border border-gray-700/40 w-fit"
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
                className="p-6 rounded-2xl bg-gray-800/40 backdrop-blur-sm
                           border border-gray-700/40 space-y-5"
              >
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500
                                  shadow-lg shadow-amber-500/20">
                    <Target size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Compétences Transversales</h3>
                    <p className="text-gray-400 text-xs">Soft skills & mindset</p>
                  </div>
                </motion.div>
                {SOFT_SKILLS.map((s, i) => (
                  <SoftSkillBar key={i} skill={s} index={i} reduced={reduced} />
                ))}
              </motion.div>
            </div>

            {/* ── column 2 : languages + interests ── */}
            <div className="xl:col-span-2 space-y-8">

              {/* Languages */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={stagger(0.1, 0.12)}
              >
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500
                                  shadow-lg shadow-emerald-500/20">
                    <Globe size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Langues Maîtrisées</h3>
                    <p className="text-gray-400 text-xs">Compétences linguistiques</p>
                  </div>
                </motion.div>

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
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500
                                  shadow-lg shadow-purple-500/20">
                    <Code2 size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Centres d'Intérêt & Spécialisations</h3>
                    <p className="text-gray-400 text-xs">Domaines de passion technique</p>
                  </div>
                </motion.div>

                <div className="grid sm:grid-cols-1 gap-3">
                  {INTERESTS.map((item, i) => (
                    <InterestCard key={i} item={item} index={i} reduced={reduced} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          
        </div>
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