import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  ExternalLink, Github, Code, Database, Globe,
  GamepadIcon, Brain, Cpu, Download, Sparkles,
  Zap, Rocket, Terminal, Layers, Eye,
  Camera, Activity, Shield, Wifi, ChevronRight, X,
  Car, Server, Smartphone, MapPin, Users, Gauge,
  Star, ArrowUpRight, Filter, Clock, CheckCircle2,
  AlertCircle, Play, Lock
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import image1 from './assets/image1.png';
import image3 from './assets/image4.png';

/* ─────────────────────── constants ─────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1];

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

/* ─────────────────────── Particles ─────────────────────── */
function Particles({ reduced }) {
  const ref = useRef(null);
  const cnt = useRef(0);

  const spawn = useCallback(() => {
    if (!ref.current || cnt.current > 22) return;
    const el  = document.createElement('div');
    const sz  = Math.random() * 2.5 + 1;
    const dur = Math.random() * 4500 + 3000;
    const hue = Math.random() > 0.5 ? '59,130,246' : '139,92,246';

    Object.assign(el.style, {
      position: 'absolute', width: `${sz}px`, height: `${sz}px`,
      borderRadius: '50%', left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`, opacity: '0',
      pointerEvents: 'none',
      background: `rgba(${hue},0.65)`,
      boxShadow: `0 0 ${sz * 3}px rgba(${hue},0.5)`,
    });

    const anim = el.animate([
      { opacity: 0, transform: 'translateY(0) scale(0)' },
      { opacity: 0.8, transform: `translateY(-${Math.random() * 70 + 30}px) scale(1)`, offset: 0.4 },
      { opacity: 0,  transform: `translateY(-${Math.random() * 140 + 80}px) scale(0.3)` },
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

/* ─────────────────────── StatusBadge ───────────────────── */
function StatusBadge({ status, isPFE }) {
  const cfg = isPFE
    ? { icon: Star,         cls: 'bg-violet-500/15 text-violet-300 border-violet-500/30', dot: 'bg-violet-400' }
    : status === 'Complet'
    ? { icon: CheckCircle2, cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400' }
    : status === 'Actif'
    ? { icon: Play,         cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30', dot: 'bg-blue-400' }
    : { icon: Clock,        cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30', dot: 'bg-amber-400' };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                      text-xs font-semibold border ${cfg.cls} whitespace-nowrap`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
      {status}
    </span>
  );
}

/* ─────────────────────── TechTag ───────────────────────── */
function TechTag({ tech, reduced }) {
  return (
    <motion.span
      whileHover={reduced ? {} : { scale: 1.08, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className="px-2.5 py-1 bg-gray-800/70 text-gray-300 rounded-lg text-xs
                 font-medium border border-gray-700/50 hover:border-gray-600/70
                 hover:text-white transition-colors duration-200 cursor-default"
    >
      {tech}
    </motion.span>
  );
}

/* ─────────────────────── ProjectCard ───────────────────── */
function ProjectCard({ project, index, reduced, onPFE, onGame }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE_EXPO }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col h-full
                  ${project.isPFE ? 'lg:col-span-2' : ''}`}
      style={{ perspective: 800 }}
    >
      {/* ambient glow */}
      <motion.div
        animate={hovered && !reduced
          ? { opacity: 0.35, scale: 1.02 }
          : { opacity: 0,    scale: 1    }}
        transition={{ duration: 0.5 }}
        className={`absolute -inset-3 bg-gradient-to-br ${project.gradient}
                    rounded-3xl blur-2xl pointer-events-none`}
      />

      {/* card */}
      <motion.div
        whileHover={reduced ? {} : { y: -8 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className={`relative flex flex-col h-full rounded-2xl border overflow-hidden
                    backdrop-blur-xl shadow-2xl transition-colors duration-300
                    ${project.isPFE
                      ? 'bg-gradient-to-br from-violet-950/60 via-gray-900/80 to-indigo-950/50 border-violet-500/30 hover:border-violet-400/50'
                      : 'bg-gradient-to-br from-gray-900/90 to-gray-800/80 border-gray-800/60 hover:border-gray-700/80'
                    }`}
      >
        {/* top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-px
                         bg-gradient-to-r ${project.gradient} opacity-80`} />

        {/* featured ribbon */}
        {project.isPFE && (
          <div className="absolute top-5 left-0 z-10">
            <div className="flex items-center gap-1.5 pl-4 pr-3 py-1
                            bg-gradient-to-r from-violet-600 to-indigo-600
                            rounded-r-full text-white text-xs font-bold shadow-lg">
              <Star size={11} fill="white" />
              Projet PFE
            </div>
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
              whileHover={reduced ? {} : { rotate: 12, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${project.gradient}
                          shadow-xl ring-1 ring-white/10`}
            >
              <Icon className="text-white" size={26} />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className={`text-xl font-bold text-white mb-1.5 leading-tight
                              group-hover:text-blue-100 transition-colors duration-300`}>
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>

          {/* PFE layout — two-column on large */}
          {project.isPFE ? (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* tech stack */}
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-3">
                  Stack technique
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t, i) => (
                    <TechTag key={i} tech={t} reduced={reduced} />
                  ))}
                </div>
              </div>
              {/* features */}
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-3">
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
              {/* tech */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.map((t, i) => (
                  <TechTag key={i} tech={t} reduced={reduced} />
                ))}
              </div>

              {/* features */}
              <div className="flex-1 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={14} className={project.accentColor} />
                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                    Fonctionnalités
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {project.features.slice(0, 4).map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.07 + 0.3, ease: EASE_EXPO }}
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
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                           bg-gray-800/80 hover:bg-gray-700/80 text-white text-sm font-medium
                           border border-gray-700/50 hover:border-gray-600/60
                           transition-all duration-200"
              >
                <Github size={16} />
                <span>Code</span>
              </motion.a>
            )}

            {project.demoUrl && project.demoUrl !== '#' && (
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
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
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={onPFE}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                           bg-gradient-to-r from-violet-600 to-indigo-600
                           hover:from-violet-500 hover:to-indigo-500
                           text-white text-sm font-medium shadow-lg
                           transition-all duration-200"
              >
                <Cpu size={16} />
                <span>Architecture</span>
              </motion.button>
            )}

            {project.isPythonGame && (
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
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
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── PFEModal ──────────────────────── */
function PFEModal({ open, onClose, reduced }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else       document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const layers = [
    { icon: Camera, label: 'Couche 1 — Embarquée',       color: '#a78bfa',
      desc: 'Raspberry Pi 4 · CAM DMS + ADAS · YOLOv8n · MediaPipe FaceMesh · SQLite (store-and-forward)' },
    { icon: Server, label: 'Couche 2 — Backend & Scoring', color: '#60a5fa',
      desc: 'Spring Boot (auth JWT, lecture API) · Fonction Edge Supabase (score-drivers, pg_cron 02h00)' },
    { icon: Smartphone, label: 'Couche 3 — Applications', color: '#34d399',
      desc: 'Dashboard gestionnaire React 18 · Application conducteur Flutter 3.22+' },
  ];

  const features = [
    { icon: Eye,     title: 'DMS — Fatigue & distraction', color: '#a78bfa',
      desc: 'EAR/MAR adaptatifs, pose de tête, session téléphone, ceinture (HSV + Hough)' },
    { icon: Car,     title: 'ADAS — Collision & voie',     color: '#fbbf24',
      desc: 'FCW (distance monoculaire + taux de rapprochement) et LDW (Canny + Hough)' },
    { icon: Gauge,   title: 'Scoring comportemental',      color: '#34d399',
      desc: 'Décroissance exponentielle (0,9), 4 niveaux de risque, calcul nocturne' },
    { icon: MapPin,  title: 'Géolocalisation & flotte',    color: '#60a5fa',
      desc: 'Boîtier VEGEO (GSM/GPRS, SIM868E), carte Leaflet, messagerie temps réel' },
  ];

  const metrics = [
    { value: '91,6 %', label: 'Détection (190 scénarios)', color: '#a78bfa' },
    { value: '≤130 ms', label: 'Latence embarquée',        color: '#34d399' },
    { value: '52/52',  label: 'Endpoints API validés',     color: '#60a5fa' },
    { value: '74/74',  label: 'Événements test C10',       color: '#fbbf24' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={modalBackdrop}
          initial="hidden" animate="visible" exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4
                     bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            variants={modalPanel}
            className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800
                       rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto
                       border border-violet-500/30 shadow-2xl shadow-violet-900/30"
            onClick={e => e.stopPropagation()}
          >
            {/* header */}
            <div className="sticky top-0 z-10 p-6 bg-gradient-to-r from-violet-950/90
                            to-indigo-950/90 backdrop-blur-lg border-b border-violet-500/25">
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
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-gray-800/60 hover:bg-gray-700/70
                             text-gray-400 hover:text-white border border-gray-700/40
                             transition-all duration-200"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* context */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-300 text-sm leading-relaxed"
              >
                Réalisé en binôme (avec <span className="text-violet-300 font-medium">Ahmed Arfaoui</span>)
                au sein d'<span className="text-violet-300 font-medium">Alpha Technology</span> (Ben Arous).
                Architecture à trois couches : détection embarquée, scoring backend et applications clientes.
              </motion.p>

              {/* 3-layer architecture */}
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
                        transition={{ delay: 0.15 + i * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-xl"
                        style={{
                          border: `1px solid ${l.color}30`,
                          background: `${l.color}0a`,
                        }}
                      >
                        <l.icon size={16} style={{ color: l.color }} className="mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-bold mb-1" style={{ color: l.color }}>
                            {l.label}
                          </div>
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
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
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
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.45 + i * 0.07, type: 'spring', stiffness: 200 }}
                      className="p-4 rounded-xl text-center border border-gray-800/60 bg-gray-900/60"
                    >
                      <div className="text-lg font-black mb-1" style={{ color: m.color }}>
                        {m.value}
                      </div>
                      <div className="text-[11px] text-gray-500 leading-tight">{m.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* footer */}
              <div className="flex items-start gap-2 text-xs text-gray-500
                              border-t border-gray-800/60 pt-5">
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
    else       document.body.style.overflow = '';
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
          variants={modalBackdrop}
          initial="hidden" animate="visible" exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4
                     bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            variants={modalPanel}
            className="relative bg-gradient-to-br from-gray-900 to-gray-800
                       rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto
                       border border-gray-700/60 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* header */}
            <div className="sticky top-0 z-10 p-6 bg-gradient-to-r from-green-950/80
                            to-emerald-950/80 backdrop-blur-lg border-b border-emerald-500/25">
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
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-gray-800/60 hover:bg-gray-700/70
                             text-gray-400 hover:text-white border border-gray-700/40
                             transition-all duration-200"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-gray-300 text-sm text-center leading-relaxed"
              >
                Ce jeu Python nécessite une installation locale.
                Voici comment le tester :
              </motion.p>

              {/* screenshots */}
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { src: image1, label: 'Interface du jeu',  grad: 'from-green-500 to-emerald-600' },
                  { src: image3, label: 'Écran de victoire', grad: 'from-cyan-500 to-blue-600'     },
                ].map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i === 0 ? -16 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="group relative overflow-hidden rounded-xl border border-gray-700/50"
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${img.grad}
                                    blur opacity-0 group-hover:opacity-25 transition-opacity duration-500`} />
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-56 object-cover group-hover:scale-105
                                 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3
                                    bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm font-medium">{img.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* install */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="text-green-400" size={16} />
                  <span className="text-white font-semibold text-sm">Installation</span>
                </div>
                <div className="bg-gray-950/80 rounded-xl p-5 border border-gray-800/60 font-mono">
                  {steps.map((line, i) => (
                    <div key={i} className={`text-xs leading-6 ${
                      line.startsWith('#') ? 'text-gray-500' : 'text-green-400'
                    } ${line === '' ? 'h-3' : ''}`}>
                      {line !== '' && (
                        <>
                          <span className="text-gray-600 select-none mr-2">$</span>
                          {line}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="text-yellow-400" size={16} />
                  <span className="text-white font-semibold text-sm">Fonctionnalités</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {features.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + i * 0.07 }}
                      className="flex items-center gap-2.5 p-3 rounded-xl
                                 bg-gray-800/50 border border-gray-700/40"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* actions */}
              <div className="flex flex-wrap gap-3">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://github.com/badiegmati/TicTacToe-AI"
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2
                             px-5 py-3 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-xl
                             border border-gray-700/50 text-sm font-medium transition-all duration-200"
                >
                  <Github size={17} /> Code Source
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
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
      technologies: ['Python','YOLOv8n','MediaPipe','OpenCV','Raspberry Pi 4',
                     'Spring Boot','Java 17','Supabase','PostgreSQL','React 18','Flutter'],
      icon: Car,
      gradient: 'from-violet-600 via-purple-500 to-indigo-600',
      accentColor: 'text-violet-400',
      isPFE: true,
      // ✅ URLs ajoutées ici
      demoUrl: 'https://badiegmati.github.io/Chi5a/',
      code: 'https://github.com/badiegmati/Chi5a',
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
      description: "Jeu de morpion avec IA avancée (Minimax). Interface Kivy professionnelle, 3 niveaux de difficulté.",
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
      id: 4,
      title: 'Plateforme Data Python',
      description: "Dashboard d'analyse de données Flask + MongoDB + D3.js. Visualisations interactives et export multi-format.",
      technologies: ['Python','MongoDB','Flask','HTML/CSS','D3.js','Pandas'],
      icon: Database,
      gradient: 'from-orange-500 via-red-500 to-amber-600',
      accentColor: 'text-orange-400',
      features: ['Dashboard interactif','Analyse temps réel','Export données','Visualisations'],
      status: 'Complet',
      featured: false,
    },
  ];

  const FILTERS = [
    { key: 'phares', label: `Projets phares (${projects.filter(p => p.featured).length})` },
    { key: 'tous',   label: `Tous (${projects.length})` },
  ];

  const visible = filter === 'tous'
    ? projects
    : projects.filter(p => p.featured);

  return (
    <section
      id="projects"
      className="relative py-28 bg-gray-950 overflow-hidden"
    >
      {/* ── background ── */}
      <Particles reduced={reduced} />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {[
        { cls: 'top-[-8%] left-[-8%] w-[500px] h-[500px]', from: '#2563eb', to: '#7c3aed', dur: 22, dx: 70, dy: 40  },
        { cls: 'bottom-[-8%] right-[-8%] w-[450px] h-[450px]', from: '#7c3aed', to: '#db2777', dur: 28, dx: -60, dy: -40 },
        { cls: 'top-[40%] left-[45%] w-[300px] h-[300px]', from: '#6d28d9', to: '#2563eb', dur: 18, dx: 30, dy: -30 },
      ].map((o, i) => (
        <motion.div
          key={i}
          animate={reduced ? {} : { x: [0, o.dx, 0], y: [0, o.dy, 0] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          className={`absolute ${o.cls} rounded-full opacity-[0.06] blur-[80px] pointer-events-none`}
          style={{ background: `radial-gradient(circle, ${o.from}, ${o.to})` }}
        />
      ))}

      <div className="container relative mx-auto px-4 md:px-8 z-10">

        {/* ── header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0, 0.1)}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       border border-blue-500/25 bg-blue-500/8 text-blue-400
                       text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles size={13} className="animate-pulse" />
            Portfolio
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-none"
          >
            <span className="text-white">Mes </span>
            <span className="text-transparent bg-clip-text
                             bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
                             animate-gradient-x">
              Projets
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Une sélection de projets qui démontrent mes compétences
            en développement et ma passion pour l'innovation
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

        {/* ── filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1.5 bg-gray-900/70 border border-gray-800/60
                          rounded-full backdrop-blur-sm gap-1">
            {FILTERS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`relative px-5 py-2 text-sm font-semibold rounded-full
                            transition-colors duration-200
                            ${filter === tab.key ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
              >
                {filter === tab.key && (
                  <motion.div
                    layoutId="proj-filter"
                    className="absolute inset-0 rounded-full
                               bg-gradient-to-r from-blue-600 to-purple-600"
                    transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── grid ── */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                reduced={reduced}
                onPFE={() => setShowPFE(true)}
                onGame={() => setShowGame(true)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── bottom stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: EASE_EXPO }}
          className="mt-16 pt-10 border-t border-gray-800/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: `${projects.length}+`, l: 'Projets réalisés',       g: 'from-blue-400 to-cyan-400'     },
              { v: '3+',                  l: 'Technologies maîtrisées', g: 'from-purple-400 to-pink-400'   },
              { v: 'Edge AI',             l: 'Spécialité PFE',          g: 'from-violet-400 to-indigo-400' },
              { v: '17/20',               l: 'Mention Très Bien',        g: 'from-amber-400 to-orange-400'  },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: EASE_EXPO }}
                whileHover={reduced ? {} : { y: -4, scale: 1.04 }}
                className="group p-5 rounded-2xl text-center border border-gray-800/50
                           bg-gray-900/40 backdrop-blur-sm hover:border-gray-700/60
                           transition-all duration-300 cursor-default overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.g}
                                 opacity-0 group-hover:opacity-8 transition-opacity duration-500`} />
                <div className={`text-2xl font-black bg-gradient-to-r ${s.g}
                                 bg-clip-text text-transparent mb-1`}>
                  {s.v}
                </div>
                <div className="text-gray-400 text-xs font-medium">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── modals ── */}
      <PFEModal
        open={showPFE}
        onClose={() => setShowPFE(false)}
        reduced={reduced}
      />
      <TicTacToeModal
        open={showGame}
        onClose={() => setShowGame(false)}
        features={projects[2].features}
        reduced={reduced}
      />

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