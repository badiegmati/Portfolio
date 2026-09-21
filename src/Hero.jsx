import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ChevronDown, Github, Linkedin, Mail, Phone,
  Download, Cpu, Code2, Terminal, ArrowRight,
  MapPin, Award, Zap, Globe, Star, Layers
} from 'lucide-react';
import {
  motion, AnimatePresence, useReducedMotion,
  useMotionValue, useSpring, useTransform
} from 'framer-motion';
import logo from './logo1.png';
import cvPdf from '../public/pdf/CV_Badie_Gmati_final.pdf';

/* ─────────────────────────── constants ─────────────────────────── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const FLOATING_BADGES = [
  { icon: Code2,    label: 'Full-Stack',  color: 'from-blue-500/20 to-blue-600/10',   border: 'border-blue-500/30',   text: 'text-blue-400',   glow: 'shadow-blue-500/20',   pos: { top: '18%', left: '4%'  } },
  { icon: Cpu,      label: 'Edge AI',     color: 'from-purple-500/20 to-purple-600/10',border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20', pos: { top: '55%', left: '2%'  } },
  { icon: Terminal, label: 'DevOps',      color: 'from-cyan-500/20 to-cyan-600/10',    border: 'border-cyan-500/30',   text: 'text-cyan-400',   glow: 'shadow-cyan-500/20',   pos: { top: '18%', right: '4%' } },
  { icon: Layers,   label: 'Microservices', color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20', pos: { top: '55%', right: '2%' } },
];

const STATS = [
  { value: '17/20',  label: 'Mention Très Bien', icon: Award,  color: 'text-yellow-400' },
  { value: '3+',     label: 'Projets majeurs',    icon: Star,   color: 'text-blue-400'   },
  { value: 'Edge AI',label: 'Raspberry Pi',       icon: Cpu,    color: 'text-purple-400' },
  { value: 'B1+',    label: 'EN · FR',            icon: Globe,  color: 'text-cyan-400'   },
];

const SOCIAL_LINKS = [
  { href: 'https://github.com/badiegmati',                    icon: Github,   label: 'GitHub',   hover: 'group-hover:text-white'      },
  { href: 'https://www.linkedin.com/in/badie-gmati-3168b535b/', icon: Linkedin, label: 'LinkedIn', hover: 'group-hover:text-blue-400'   },
  { href: 'mailto:badiegmati11@gmail.com',                    icon: Mail,     label: 'Email',    hover: 'group-hover:text-emerald-400' },
];

/* ─────────────────────────── variants ──────────────────────────── */
const containerVariants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};
const itemVariants = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_OUT_EXPO }
  }
};

/* ─────────────────────────── cursor glow ───────────────────────── */
function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      className="pointer-events-none fixed top-0 left-0 z-0 w-[500px] h-[500px] rounded-full
                 bg-gradient-radial from-blue-500/8 via-purple-500/4 to-transparent blur-3xl"
    />
  );
}

/* ─────────────────────────── animated grid ─────────────────────── */
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(45deg, #3b82f6 0.5px, transparent 0.5px),
                            linear-gradient(-45deg, #8b5cf6 0.5px, transparent 0.5px)`,
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
}

/* ─────────────────────────── orbs ──────────────────────────────── */
function AnimatedOrbs({ reduced }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[
        { class: 'top-[-10%] left-[-10%]  w-[600px] h-[600px]', from: 'blue-600', to: 'purple-600', dur: 20, dx: 80,  dy: 60  },
        { class: 'bottom-[-10%] right-[-10%] w-[500px] h-[500px]', from: 'purple-600', to: 'pink-600',   dur: 25, dx: -80, dy: -60 },
        { class: 'top-[40%] left-[40%]   w-[300px] h-[300px]', from: 'cyan-600', to: 'blue-600',   dur: 15, dx: 40,  dy: -40 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          animate={reduced ? {} : { x: [0, orb.dx, 0], y: [0, orb.dy, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          className={`absolute ${orb.class} rounded-full opacity-[0.07] blur-[80px]
                      bg-gradient-to-br from-${orb.from} to-${orb.to}`}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── particles ─────────────────────────── */
function Particles({ reduced }) {
  const ref  = useRef(null);
  const cnt  = useRef(0);

  const spawn = useCallback(() => {
    if (!ref.current || cnt.current > 35) return;
    const el  = document.createElement('div');
    const sz  = Math.random() * 3 + 1.5;
    const dur = Math.random() * 5000 + 3000;
    const hue = Math.random() > 0.5 ? '59,130,246' : '147,51,234';

    Object.assign(el.style, {
      position:   'absolute',
      width:      `${sz}px`,
      height:     `${sz}px`,
      borderRadius: '50%',
      left:       `${Math.random() * 100}%`,
      top:        `${Math.random() * 100}%`,
      background: `rgba(${hue}, 0.7)`,
      boxShadow:  `0 0 ${sz * 3}px rgba(${hue}, 0.6)`,
      opacity:    '0',
      pointerEvents: 'none',
    });

    const anim = el.animate([
      { opacity: 0, transform: 'translateY(0) scale(0)' },
      { opacity: 1, transform: `translateY(${-(Math.random() * 80 + 40)}px) scale(1)`, offset: 0.4 },
      { opacity: 0, transform: `translateY(${-(Math.random() * 180 + 100)}px) scale(0.4)` },
    ], { duration: dur, easing: 'cubic-bezier(0.4,0,0.2,1)' });

    ref.current.appendChild(el);
    cnt.current++;
    anim.onfinish = () => {
      el.remove();
      cnt.current--;
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(spawn, 100);
    return () => clearInterval(id);
  }, [reduced, spawn]);

  return <div ref={ref} className="absolute inset-0 pointer-events-none z-0" />;
}

/* ─────────────────────────── floating badges ───────────────────── */
function FloatingBadges({ reduced }) {
  return (
    <AnimatePresence>
      {FLOATING_BADGES.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={reduced ? { opacity: 1, scale: 1 } : {
            opacity: 1, scale: 1,
            y: [0, i % 2 === 0 ? -18 : -22, 0],
            rotate: [0, i % 2 === 0 ? 3 : -3, 0],
          }}
          transition={{
            opacity:  { delay: i * 0.2 + 0.8, duration: 0.5 },
            scale:    { delay: i * 0.2 + 0.8, duration: 0.5, type: 'spring', stiffness: 200 },
            y:        { delay: i * 0.2 + 0.8, duration: 4 + i * 0.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
            rotate:   { delay: i * 0.2 + 0.8, duration: 4 + i * 0.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
          }}
          style={b.pos}
          className={`hidden xl:flex absolute items-center gap-2 px-4 py-2
                      bg-gradient-to-br ${b.color} backdrop-blur-md
                      border ${b.border} rounded-2xl shadow-lg ${b.glow} ${b.text}
                      cursor-default select-none`}
        >
          <b.icon size={15} />
          <span className="text-xs font-semibold tracking-wide">{b.label}</span>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

/* ─────────────────────────── profile image ─────────────────────── */
function ProfileImage({ reduced }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="relative flex-shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* outer rotating ring */}
      <motion.div
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-6 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
          opacity: 0.25,
          filter: 'blur(18px)',
        }}
      />

      {/* inner counter-rotating ring */}
      <motion.div
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-3 rounded-full border-2 border-dashed border-blue-500/30"
      />

      {/* Dashed orbit dots */}
      {!reduced && [0, 72, 144, 216, 288].map((deg, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 0 }}
          className="absolute inset-0 rounded-full"
          style={{ originX: '50%', originY: '50%' }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-blue-400/60"
            style={{
              top: '50%', left: '50%',
              transform: `rotate(${deg}deg) translateX(calc(50% + 128px + 12px)) translateY(-50%)`,
            }}
          />
        </motion.div>
      ))}

      {/* image wrapper */}
      <motion.div
        whileHover={reduced ? {} : { scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className="relative w-56 h-56 md:w-64 md:h-64 rounded-full p-[3px]
                   bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500
                   shadow-2xl shadow-purple-500/30"
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
          <img
            src={logo}
            alt="Badie Gmati — Ingénieur Logiciel"
            className="w-full h-full object-cover transition-transform duration-700
                       group-hover:scale-110"
          />
          {/* hover overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent
                           flex items-end justify-center pb-4"
              >
                <span className="text-white text-xs font-medium tracking-widest uppercase">
                  Badie Gmati
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* online badge */}
      <motion.div
        animate={reduced ? {} : { scale: [1, 1.2, 1], boxShadow: ['0 0 0 0 rgba(34,197,94,0.4)', '0 0 0 8px rgba(34,197,94,0)', '0 0 0 0 rgba(34,197,94,0)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-4 right-4 w-6 h-6 rounded-full
                   bg-gradient-to-br from-green-400 to-emerald-500
                   border-[3px] border-gray-950 shadow-xl"
      />

      {/* availability label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute -right-4 top-6 bg-gray-900/90 backdrop-blur-sm
                   border border-green-500/30 rounded-xl px-3 py-1.5 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium whitespace-nowrap">
            Disponible
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────── stats bar ─────────────────────────── */
function StatsBar() {
  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
    >
      {STATS.map(({ value, label, icon: Icon, color }, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -4, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="group flex flex-col items-center gap-1 p-4 rounded-2xl
                     bg-gray-800/40 backdrop-blur-sm border border-gray-700/40
                     hover:border-gray-600/60 transition-colors duration-300
                     hover:bg-gray-800/60 cursor-default"
        >
          <Icon size={18} className={`${color} mb-1 transition-transform duration-300 group-hover:scale-110`} />
          <span className={`text-xl font-bold ${color}`}>{value}</span>
          <span className="text-gray-400 text-[11px] text-center leading-tight">{label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────── type writer ───────────────────────── */
const ROLES = [
  'Ingénieur Full-Stack',
  'Développeur IA Embarquée',
  'Architecte Microservices',
  'Expert Edge AI · Raspberry Pi',
];

function TypeWriter() {
  const [roleIdx, setRoleIdx]   = useState(0);
  const [display, setDisplay]   = useState('');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused]     = useState(false);

  useEffect(() => {
    const full = ROLES[roleIdx];
    if (paused) {
      const t = setTimeout(() => { setDeleting(true); setPaused(false); }, 1800);
      return () => clearTimeout(t);
    }
    if (!deleting && display.length < full.length) {
      const t = setTimeout(() => setDisplay(full.slice(0, display.length + 1)), 55);
      return () => clearTimeout(t);
    }
    if (!deleting && display.length === full.length) {
      setPaused(true);
      return;
    }
    if (deleting && display.length > 0) {
      const t = setTimeout(() => setDisplay(display.slice(0, -1)), 30);
      return () => clearTimeout(t);
    }
    if (deleting && display.length === 0) {
      setDeleting(false);
      setRoleIdx((prev) => (prev + 1) % ROLES.length);
    }
  }, [display, deleting, paused, roleIdx]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
      {display}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-6 md:h-8 bg-blue-400 ml-1 align-middle"
      />
    </span>
  );
}

/* ─────────────────────────── download button ───────────────────── */
function DownloadButton({ onDownload }) {
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  const handle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    onDownload();
    setLoading(false);
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.96 }}
      onClick={handle}
      disabled={loading}
      className="group relative flex items-center gap-3 px-8 py-4
                 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600
                 text-white rounded-2xl font-semibold text-base
                 shadow-2xl shadow-blue-500/30 hover:shadow-purple-500/40
                 transition-shadow duration-500 overflow-hidden
                 border border-white/10 disabled:opacity-70"
    >
      {/* shimmer */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                      bg-gradient-to-r from-transparent via-white/15 to-transparent
                      transition-transform duration-700 ease-in-out" />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity:0, rotate:-90 }} animate={{ opacity:1, rotate:0 }}
            exit={{ opacity:0 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : done ? (
          <motion.span key="done" initial={{ opacity:0, scale:0.5 }} animate={{ opacity:1, scale:1 }}
            exit={{ opacity:0 }} className="text-green-300 text-lg">✓</motion.span>
        ) : (
          <motion.div key="icon" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <Download size={19} />
          </motion.div>
        )}
      </AnimatePresence>

      <span>{done ? 'Téléchargé !' : 'Télécharger mon CV'}</span>
      <ArrowRight size={17} className="opacity-70 group-hover:translate-x-1 transition-transform duration-300" />
    </motion.button>
  );
}

/* ─────────────────────────── main component ────────────────────── */
export default function Hero() {
  const reduced = useReducedMotion();

  const downloadCV = () => {
    const a = document.createElement('a');
    a.href     = cvPdf;
    a.download = 'CV-Badie-Gmati.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center
                 overflow-hidden bg-gray-950 mt-16"
    >
      {/* ── background layers ── */}
      <GridBackground />
      <AnimatedOrbs reduced={reduced} />
      <Particles     reduced={reduced} />
      <CursorGlow />

      {/* ── floating corner badges ── */}
      <FloatingBadges reduced={reduced} />

      {/* ── main content ── */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          

          {/* ── profile + text ── */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-12">
            <ProfileImage reduced={reduced} />

            {/* text block */}
            <motion.div
              variants={containerVariants}
              className="flex-1 text-center lg:text-left"
            >
              {/* name */}
              <motion.div variants={itemVariants} className="mb-3">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight
                               text-white leading-none">
                  
                  <span className="text-transparent bg-clip-text
                                   bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400
                                   animate-gradient-x">
                    Badie Gmati
                  </span>
                </h1>
              </motion.div>

              {/* typewriter role */}
              <motion.div variants={itemVariants} className="h-9 md:h-10 mb-5 text-xl md:text-2xl font-semibold">
                <TypeWriter />
              </motion.div>

              {/* description */}
              <motion.p
                variants={itemVariants}
                className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mb-6
                           mx-auto lg:mx-0"
              >
                Diplômé <span className="text-purple-400">Génie Logiciel Sciences Informatiques</span> avec mention{' '}
                <span className="text-yellow-400 font-bold">Très Bien (17/20)</span>. Spécialisé en
                développement Full-Stack 
                et IA embarquée .
              </motion.p>

              {/* location + contact */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 text-sm"
              >
                {[
                  { icon: MapPin, text: 'Bouargoub, Nabeul, Tunisie', color: 'text-red-400'   },
                  { icon: Mail,   text: 'badiegmati11@gmail.com',     color: 'text-blue-400'  },
                  { icon: Phone,  text: '+216 58 294 838',            color: 'text-green-400' },
                ].map(({ icon: Icon, text, color }, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-400
                                          bg-gray-800/40 backdrop-blur-sm px-3 py-1.5
                                          rounded-full border border-gray-700/40">
                    <Icon size={14} className={color} />
                    <span>{text}</span>
                  </div>
                ))}
              </motion.div>

            

              {/* CTA buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8"
              >
                <DownloadButton onDownload={downloadCV} />

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group flex items-center justify-center gap-3 px-8 py-4
                             bg-gray-800/50 hover:bg-gray-700/60 backdrop-blur-sm
                             text-gray-200 rounded-2xl font-semibold text-base
                             border border-gray-700/50 hover:border-gray-600/60
                             transition-all duration-300"
                >
                  <span>Découvrir mon profil</span>
                  <ChevronDown size={18}
                    className="group-hover:translate-y-1 transition-transform duration-300" />
                </motion.button>
              </motion.div>

              {/* social links */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center lg:justify-start items-center gap-3"
              >
                <span className="text-gray-500 text-sm mr-1">Me retrouver sur</span>
                {SOCIAL_LINKS.map(({ href, icon: Icon, label, hover }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={label}
                    className={`group relative p-3 rounded-xl
                                bg-gray-800/50 backdrop-blur-sm
                                border border-gray-700/40 hover:border-gray-600/60
                                transition-all duration-300`}
                  >
                    <Icon size={20} className={`text-gray-400 transition-colors duration-300 ${hover}`} />
                    {/* tooltip */}
                    <span className="absolute -top-9 left-1/2 -translate-x-1/2
                                     bg-gray-900 border border-gray-700/60 text-white
                                     text-xs py-1 px-2.5 rounded-lg opacity-0
                                     group-hover:opacity-100 transition-opacity duration-200
                                     whitespace-nowrap shadow-xl pointer-events-none">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {/* scroll mouse */}
          <div className="w-6 h-10 border-2 border-gray-600 group-hover:border-blue-500/60
                          rounded-full flex items-start justify-center pt-2
                          transition-colors duration-300">
            <motion.div
              animate={reduced ? {} : { y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 bg-blue-400 rounded-full"
            />
          </div>
          <span className="text-gray-500 text-[11px] tracking-widest uppercase
                           group-hover:text-gray-400 transition-colors duration-300">
            Scroll
          </span>
        </motion.div>
      </motion.div>

      {/* ── global CSS ── */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0%   50%; }
          50%       { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}