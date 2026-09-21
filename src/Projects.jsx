import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Github, Database, Globe,
  GamepadIcon, Cpu, Download, Sparkles,
  Zap, Terminal, Eye,
  Camera, Activity, Shield, ChevronRight, X,
  Car, Server, Smartphone, MapPin, Users, Gauge,
  Star, ArrowUpRight, Clock,
  Play, Trophy
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import image1 from './assets/image1.png';
import image3 from './assets/image4.png';

/* ─────────────────────── constants ─────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1];
const EASE_BACK = [0.34, 1.56, 0.64, 1];

/* ─────────────────────── variants ──────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE_EXPO }
  },
};

const stagger = (delay = 0.08, children = 0.1) => ({
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: children, delayChildren: delay }
  },
});

const modalBackdrop = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2  } },
};

const modalPanel = {
  hidden:  { scale: 0.93, opacity: 0, y: 28 },
  visible: {
    scale: 1, opacity: 1, y: 0,
    transition: { type: 'spring', damping: 26, stiffness: 300 }
  },
  exit: { scale: 0.96, opacity: 0, y: 12, transition: { duration: 0.18 } },
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
    const ctx = canvas.getContext('2d');
    const S   = stateRef.current;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      S.nodes = Array.from({ length: 65 }, () => ({
        x:     Math.random() * canvas.offsetWidth,
        y:     Math.random() * canvas.offsetHeight,
        vx:    (Math.random() - 0.5) * 0.28,
        vy:    (Math.random() - 0.5) * 0.28,
        r:     Math.random() * 1.6 + 0.5,
        hue:   Math.random() > 0.5 ? 220 + Math.random() * 40 : 260 + Math.random() * 40,
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
          if (dist < 135) {
            const alpha = (1 - dist / 135) * 0.13;
            const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            g.addColorStop(0, `hsla(${a.hue},85%,68%,${alpha})`);
            g.addColorStop(1, `hsla(${b.hue},85%,68%,${alpha})`);
            ctx.strokeStyle = g;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      S.nodes.forEach(n => {
        n.pulse += 0.02; n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
        const p = 0.5 + 0.5 * Math.sin(n.pulse);
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        grd.addColorStop(0, `hsla(${n.hue},90%,72%,${0.65 * p})`);
        grd.addColorStop(1, `hsla(${n.hue},90%,72%,0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();
      });

      S.raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    S.raf = requestAnimationFrame(draw);
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
      id:   i,
      x:    Math.random() * 100,
      y:    Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      dur:  Math.random() * 12 + 9,
      del:  Math.random() * 7,
      hue:  [220, 260, 280, 200][i % 4],
    })), []);

  if (reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pts.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left:       `${p.x}%`,
            top:        `${p.y}%`,
            width:      p.size,
            height:     p.size,
            background: `hsla(${p.hue},80%,65%,0.55)`,
            boxShadow:  `0 0 ${p.size * 3}px hsla(${p.hue},80%,65%,0.35)`,
          }}
          animate={{
            y:       [0, -55, 0],
            x:       [0, Math.sin(p.id) * 28, 0],
            opacity: [0, 0.75, 0],
            scale:   [0.5, 1.15, 0.5],
          }}
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
        background:
          'linear-gradient(90deg,transparent,rgba(96,165,250,0.12),rgba(167,139,250,0.18),rgba(96,165,250,0.12),transparent)',
      }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />
  );
}

/* ─────────────────────── StatusBadge ─────────────────────── */
function StatusBadge({ status, isPFE }) {
  const cfg = isPFE
    ? { cls: 'bg-violet-500/15 text-violet-300 border-violet-500/30', dot: 'bg-violet-400' }
    : status === 'Complet'
    ? { cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400' }
    : status === 'Actif'
    ? { cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30', dot: 'bg-blue-400' }
    : { cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30', dot: 'bg-amber-400' };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                      text-xs font-semibold border ${cfg.cls} whitespace-nowrap`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
      {status}
    </span>
  );
}

/* ─────────────────────── TechTag ─────────────────────────── */
function TechTag({ tech, reduced }) {
  return (
    <motion.span
      whileHover={reduced ? {} : { scale: 1.08, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className="px-2.5 py-1 bg-white/[0.05] text-gray-300 rounded-lg text-xs
                 font-medium border border-white/[0.08] hover:border-white/20
                 hover:text-white transition-colors duration-200 cursor-default
                 backdrop-blur-sm"
    >
      {tech}
    </motion.span>
  );
}

/* ─────────────────────── ProjectCard ─────────────────────── */
function ProjectCard({ project, index, reduced, onPFE, onGame }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.92, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: index * 0.11, ease: EASE_BACK }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col h-full
                  ${project.isPFE ? 'lg:col-span-2' : ''}`}
      style={{ perspective: 800 }}
    >
      {/* ambient glow */}
      <motion.div
        animate={hovered && !reduced
          ? { opacity: 0.4, scale: 1.03 }
          : { opacity: 0,   scale: 1   }}
        transition={{ duration: 0.55 }}
        className={`absolute -inset-4 bg-gradient-to-br ${project.gradient}
                    rounded-3xl blur-3xl pointer-events-none`}
      />

      {/* card */}
      <motion.div
        whileHover={reduced ? {} : { y: -10 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={`relative flex flex-col h-full rounded-2xl border overflow-hidden
                    shadow-2xl transition-all duration-300
                    ${project.isPFE
                      ? 'border-violet-500/25 hover:border-violet-400/50'
                      : 'border-white/[0.07] hover:border-white/[0.14]'
                    }`}
        style={{
          background: project.isPFE
            ? 'linear-gradient(145deg,rgba(46,16,101,0.55) 0%,rgba(13,20,42,0.92) 50%,rgba(29,14,80,0.45) 100%)'
            : 'linear-gradient(145deg,rgba(13,20,42,0.95) 0%,rgba(8,10,20,0.98) 100%)',
          backdropFilter: 'blur(28px)',
        }}
      >
        {/* top accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.11 + 0.3, duration: 0.9, ease: EASE_EXPO }}
          style={{ originX: 0.5 }}
          className={`absolute top-0 left-0 right-0 h-px
                       bg-gradient-to-r ${project.gradient} opacity-90`}
        />

        {/* inner glow on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 50% 0%,${
              project.isPFE ? 'rgba(139,92,246,0.08)' : 'rgba(96,165,250,0.06)'
            } 0%,transparent 65%)`,
          }}
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
                          rounded-r-full text-white text-xs font-bold shadow-lg
                          shadow-violet-900/40"
            >
              <Star size={11} fill="white" />
              Projet PFE
            </motion.div>
          </div>
        )}

        {/* status */}
        <div className="absolute top-4 right-4 z-10">
          <StatusBadge status={project.status} isPFE={project.isPFE} />
        </div>

        <div className={`p-7 flex flex-col flex-1 ${project.isPFE ? 'pt-12' : 'pt-8'}`}>

          {/* icon + title */}
          <div className="flex items-start gap-4 mb-5 pr-24">
            <motion.div
              whileHover={reduced ? {} : { rotate: 12, scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              className="relative flex-shrink-0"
            >
              <div className={`absolute inset-0 rounded-2xl blur-md opacity-50
                               bg-gradient-to-br ${project.gradient}`} />
              <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${project.gradient}
                               shadow-xl ring-1 ring-white/15`}>
                <Icon className="text-white" size={26} />
              </div>
              <motion.div
                animate={{ scale: [1, 1.55, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: index * 0.3 }}
                className="absolute inset-0 rounded-2xl border border-white/25"
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

          {/* PFE layout */}
          {project.isPFE ? (
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
                      initial={{ opacity: 0, x: -14 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.07 + 0.35, ease: EASE_EXPO }}
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

          {/* action buttons */}
          <div className="flex flex-wrap gap-2.5 mt-auto">
            {project.code && project.code !== '#' && (
              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href={project.code}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                           bg-white/[0.05] hover:bg-white/[0.09] text-white text-sm font-medium
                           border border-white/[0.08] hover:border-white/[0.18]
                           transition-all duration-200 backdrop-blur-sm"
              >
                <Github size={16} />
                <span>Code</span>
              </motion.a>
            )}

            {project.demoUrl && project.demoUrl !== '#' && (
              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href={project.demoUrl}
                target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
                            bg-gradient-to-r ${project.gradient} text-white text-sm font-medium
                            shadow-lg hover:shadow-xl transition-all duration-200`}
              >
                <Eye size={16} />
                <span>Démo Live</span>
                <ArrowUpRight size={14} />
              </motion.a>
            )}

            {project.isPFE && (
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPFE}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                           bg-gradient-to-r from-violet-600 to-indigo-600
                           hover:from-violet-500 hover:to-indigo-500
                           text-white text-sm font-medium shadow-lg transition-all duration-200"
              >
                <Cpu size={16} />
                <span>Architecture</span>
              </motion.button>
            )}

            {project.isPythonGame && (
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGame}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
                            bg-gradient-to-r ${project.gradient} text-white text-sm font-medium
                            shadow-lg transition-all duration-200`}
              >
                <Play size={16} />
                <span>Voir Démo</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* corner dots */}
        <div className="absolute bottom-3 right-3 flex gap-1 opacity-20">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: hovered ? [0.4, 1, 0.4] : 0.3 }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-white"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── PFEModal ──────────────────────── */
function PFEModal({ open, onClose, reduced }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else      document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const layers = [
    { icon: Camera,     label: 'Couche 1 — Embarquée',        color: '#a78bfa',
      desc: 'Raspberry Pi 4 · CAM DMS + ADAS · YOLOv8n · MediaPipe FaceMesh · SQLite (store-and-forward)' },
    { icon: Server,     label: 'Couche 2 — Backend & Scoring', color: '#60a5fa',
      desc: 'Spring Boot (auth JWT, lecture API) · Fonction Edge Supabase (score-drivers, pg_cron 02h00)' },
    { icon: Smartphone, label: 'Couche 3 — Applications',      color: '#34d399',
      desc: 'Dashboard gestionnaire React 18 · Application conducteur Flutter 3.22+' },
  ];

  const features = [
    { icon: Eye,    title: 'DMS — Fatigue & distraction', color: '#a78bfa',
      desc: 'EAR/MAR adaptatifs, pose de tête, session téléphone, ceinture (HSV + Hough)' },
    { icon: Car,    title: 'ADAS — Collision & voie',     color: '#fbbf24',
      desc: 'FCW (distance monoculaire + taux de rapprochement) et LDW (Canny + Hough)' },
    { icon: Gauge,  title: 'Scoring comportemental',      color: '#34d399',
      desc: 'Décroissance exponentielle (0,9), 4 niveaux de risque, calcul nocturne' },
    { icon: MapPin, title: 'Géolocalisation & flotte',    color: '#60a5fa',
      desc: 'Boîtier VEGEO (GSM/GPRS, SIM868E), carte Leaflet, messagerie temps réel' },
  ];

  const metrics = [
    { value: '91,6 %', label: 'Détection (190 scénarios)', color: '#a78bfa' },
    { value: '≤130 ms', label: 'Latence embarquée',        color: '#34d399' },
    { value: '52/52',   label: 'Endpoints API validés',    color: '#60a5fa' },
    { value: '74/74',   label: 'Événements test C10',      color: '#fbbf24' },
  ];

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
            {/* header */}
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
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }} className="text-gray-300 text-sm leading-relaxed">
                Réalisé en binôme (avec{' '}
                <span className="text-violet-300 font-medium">Ahmed Arfaoui</span>)
                au sein d'<span className="text-violet-300 font-medium">Alpha Technology</span> (Ben Arous).
                Architecture à trois couches : détection embarquée, scoring backend et applications clientes.
              </motion.p>

              {/* architecture */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="text-violet-400" size={16} />
                  <span className="text-white font-semibold text-sm">Architecture Edge-to-Cloud</span>
                </div>
                <div className="space-y-2">
                  {layers.map((l, i) => (
                    <React.Fragment key={i}>
                      <motion.div
                        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.1 }}
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

              {/* modules */}
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.07 }}
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

              {/* metrics */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="text-violet-400" size={16} />
                  <span className="text-white font-semibold text-sm">Résultats de validation</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {metrics.map((m, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.45 + i * 0.07, type: 'spring', stiffness: 200 }}
                      className="p-4 rounded-xl text-center border border-white/[0.06]"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div className="text-lg font-black mb-1" style={{ color: m.color }}>{m.value}</div>
                      <div className="text-[11px] text-gray-500 leading-tight">{m.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* footer */}
              <div className="flex items-start gap-2 text-xs text-gray-500
                              border-t border-white/[0.06] pt-5">
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
  );
}

/* ─────────────────────── TicTacToeModal ────────────────── */
function TicTacToeModal({ open, onClose, features, reduced }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else      document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const steps = [
    '# Cloner le repository',
    'git clone https://github.com/badiegmati/TicTacToe-AI.git',
    '',
    '# Installer les dépendances',
    'pip install kivy',
    '',
    '# Lancer le jeu',
    'python main.py',
  ];

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
            {/* header */}
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
                transition={{ delay: 0.15 }}
                className="text-gray-300 text-sm text-center leading-relaxed">
                Ce jeu Python nécessite une installation locale. Voici comment le tester :
              </motion.p>

              {/* screenshots */}
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { src: image1, label: 'Interface du jeu',  grad: 'from-green-500 to-emerald-600' },
                  { src: image3, label: 'Écran de victoire', grad: 'from-cyan-500 to-blue-600'     },
                ].map((img, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: i === 0 ? -16 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="group relative overflow-hidden rounded-xl border border-white/[0.07]"
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${img.grad}
                                    blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    <img src={img.src} alt={img.label}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-3
                                    bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm font-medium">{img.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* install */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}>
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

              {/* features */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="text-yellow-400" size={16} />
                  <span className="text-white font-semibold text-sm">Fonctionnalités</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {features.map((f, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + i * 0.07 }}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-white/[0.06]"
                      style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* actions */}
              <div className="flex flex-wrap gap-3">
                <motion.a whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  href="https://github.com/badiegmati/TicTacToe-AI"
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2
                             px-5 py-3 text-white rounded-xl border border-white/[0.08]
                             text-sm font-medium transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <Github size={17} /> Code Source
                </motion.a>
                <motion.a whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  href="https://github.com/badiegmati/TicTacToe-AI/archive/refs/heads/main.zip"
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2
                             px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600
                             hover:from-green-500 hover:to-emerald-500 text-white rounded-xl
                             text-sm font-medium shadow-lg transition-all duration-200">
                  <Download size={17} /> Télécharger
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────── Projects (main) ───────────────── */
export default function Projects() {
  const reduced = useReducedMotion();
  const [showPFE,  setShowPFE]  = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [filter,   setFilter]   = useState('phares');

  const projects = [
    {
      id: 0,
      title: 'Système ADAS/DMS Embarqué — PFE',
      description:
        'Plateforme embarquée Edge AI sur Raspberry Pi 4 : détection temps réel de 12 comportements dangereux (fatigue, distraction, FCW, LDW), scoring comportemental ML et supervision flotte via web React et mobile Flutter.',
      technologies: [
        'Python','YOLOv8n','MediaPipe','OpenCV','Raspberry Pi 4',
        'Spring Boot','Java 17','Supabase','PostgreSQL','React 18','Flutter',
      ],
      icon: Car,
      gradient: 'from-violet-600 via-purple-500 to-indigo-600',
      accentColor: 'text-violet-400',
      isPFE: true,
      demoUrl: 'https://badiegmati.github.io/Chi5a/',
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
      description:
        "Plateforme web complète de réservation d'hôtels — interface SSR/SSG moderne, auth, PostgreSQL et score Lighthouse > 90.",
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
      description:
        'Jeu de morpion avec IA avancée (Minimax). Interface Kivy professionnelle, 3 niveaux de difficulté.',
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
      title: 'Quiz Interactif — Corsair',
      description:
        'Application de quiz gamifiée sur la marque Corsair : inscription utilisateur, timer 11s par question, scoring en temps réel, résultats détaillés et persistance via Supabase.',
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
      id: 4,
      title: 'Application Mobile Angular',
      description:
        'Application mobile cross-platform Angular avec fonctionnalités avancées et design responsive.',
      technologies: ['Angular','TypeScript','CSS3','API REST','RxJS','NgRx'],
      icon: Smartphone,
      gradient: 'from-purple-500 via-pink-500 to-rose-600',
      accentColor: 'text-purple-400',
      features: ['PWA','Offline Support','Push Notifications','Material Design'],
      status: 'En développement',
      featured: false,
    },
    {
      id: 5,
      title: 'Plateforme Data Python',
      description:
        "Dashboard d'analyse de données Flask + MongoDB + D3.js. Visualisations interactives et export multi-format.",
      technologies: ['Python','MongoDB','Flask','HTML/CSS','D3.js','Pandas'],
      icon: Database,
      gradient: 'from-orange-500 via-red-500 to-amber-600',
      accentColor: 'text-orange-400',
      features: ['Dashboard interactif','Analyse temps réel','Export données','Visualisations'],
      status: 'En développement',
      featured: false,
    },
  ];

  const FILTERS = [
    { key: 'phares', label: `Projets phares (${projects.filter(p => p.featured).length})` },
    { key: 'tous',   label: `Tous (${projects.length})` },
  ];

  const visible = filter === 'tous' ? projects : projects.filter(p => p.featured);

  return (
    <section
      id="projects"
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
          background:
            'radial-gradient(ellipse 85% 85% at 50% 50%,transparent 35%,rgba(2,8,23,0.72) 100%)',
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
        <motion.div key={i}
          animate={{ x: [0, o.dx, 0], y: [0, o.dy, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          className={`absolute ${o.pos} ${o.size} rounded-full pointer-events-none opacity-[0.042] blur-[110px]`}
          style={{ background: `radial-gradient(circle,${o.c[0]},${o.c[1]})` }}
        />
      ))}

      <div className="container relative mx-auto px-4 md:px-10 z-10 max-w-[1400px]">

        {/* ── HEADER ── */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0, 0.1)}
          className="text-center mb-24"
        >
          {/* badge */}
          <motion.div variants={fadeUp}
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
            Portfolio
            <motion.div
              animate={reduced ? {} : { rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={11} />
            </motion.div>
          </motion.div>

          {/* title */}
          <motion.h2 variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-[88px] font-black tracking-tight mb-6 leading-[1.01]"
          >
            <span className="text-white">Mes </span>
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg,#60a5fa 0%,#a78bfa 30%,#f472b6 60%,#60a5fa 100%)',
                  backgroundSize: '300% 100%',
                  animation: 'gradient-x 6s ease infinite',
                }}>
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

          {/* subtitle */}
          <motion.p variants={fadeUp}
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Une sélection de projets qui démontrent mes compétences en{' '}
            <span className="text-white font-semibold">développement Full-Stack</span> et ma passion pour l'
            <span className="font-semibold"
              style={{ background: 'linear-gradient(90deg,#a78bfa,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              innovation
            </span>
          </motion.p>

          {/* divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
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

        {/* ── FILTER ── */}
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
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: EASE_EXPO }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(tab.key)}
                className={`relative px-6 py-2.5 text-sm font-semibold rounded-full
                            transition-colors duration-200
                            ${filter === tab.key ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {filter === tab.key && (
                  <motion.div layoutId="proj-filter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
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
            initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)'  }}
            exit={{   opacity: 0, y: -14, filter: 'blur(8px)'  }}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id} project={project} index={i} reduced={reduced}
                onPFE={() => setShowPFE(true)}
                onGame={() => setShowGame(true)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── BOTTOM STATS ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.75, ease: EASE_EXPO }}
          className="mt-20 pt-12 border-t border-white/[0.05]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { v: `${projects.length}+`, l: 'Projets réalisés',       g: 'from-blue-400 to-cyan-400',     gr: '#60a5fa,#22d3ee' },
              { v: '10+',                 l: 'Technologies maîtrisées', g: 'from-purple-400 to-pink-400',   gr: '#c084fc,#f472b6' },
              { v: 'Edge AI',             l: 'Spécialité PFE',          g: 'from-violet-400 to-indigo-400', gr: '#a78bfa,#6366f1' },
              { v: '17/20',               l: 'Mention Très Bien',       g: 'from-amber-400 to-orange-400',  gr: '#fbbf24,#f97316' },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20, scale: 0.88, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_BACK }}
                whileHover={reduced ? {} : { y: -7, scale: 1.04 }}
                className="group relative p-6 rounded-[22px] text-center border border-white/[0.06]
                           cursor-default overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg,rgba(13,20,42,0.95) 0%,rgba(8,10,20,0.98) 100%)',
                  backdropFilter: 'blur(24px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                {/* top accent */}
                <motion.div
                  initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.9, ease: EASE_EXPO }}
                  style={{ originX: 0.5 }}
                  className={`absolute top-0 left-6 right-6 h-px rounded-full bg-gradient-to-r ${s.g}`}
                />

                {/* hover glow */}
                <motion.div
                  animate={{ opacity: 0, scale: 1 }}
                  whileHover={{ opacity: 0.12, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-[22px] pointer-events-none blur-2xl"
                  style={{ background: `linear-gradient(135deg,${s.gr})` }}
                />

                <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${s.g}
                                 bg-clip-text text-transparent mb-2 tabular-nums`}>
                  {s.v}
                </div>
                <div className="text-gray-500 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  {s.l}
                </div>

                {/* shimmer bar */}
                <motion.div
                  animate={{ width: '30%' }}
                  whileHover={{ width: '65%' }}
                  transition={{ duration: 0.45, ease: EASE_EXPO }}
                  className={`h-px mx-auto mt-3 rounded-full bg-gradient-to-r ${s.g} opacity-50`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── MODALS ── */}
      <PFEModal  open={showPFE}  onClose={() => setShowPFE(false)}  reduced={reduced} />
      <TicTacToeModal
        open={showGame} onClose={() => setShowGame(false)}
        features={projects[2].features} reduced={reduced}
      />

      <style>{`
        @keyframes gradient-x {
          0%,100% { background-position: 0%   50%; }
          50%      { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  );
}