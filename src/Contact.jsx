// Contact.jsx
// ── Suppressions :
//    - NeuralBackground → GlobalBackground dans App.jsx
//    - FloatingParticles → supprimé
//    - ScanLine → supprimé
//    - Background pattern aligné sur Skills.jsx
//    - Orbes CSS alignés sur Skills.jsx (taille, couleur, opacité, blur)
//    - ContactCard corner dots : motion.div → CSS animate-pulse
//    - ContactCard icon pulse ring : motion.div → CSS animate-ping

import React, { useState, useRef, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Send, User, MessageCircle,
  Sparkles, Clock, CheckCircle, AlertCircle,
  Zap, ArrowRight, Shield, Star
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';

/* ─────────────────────── CSS injection (même pattern que Skills) ── */
const CONTACT_STYLES = `
  @keyframes ct-orb-drift-a {
    0%,100% { transform: translate(0,0) scale(1) }
    33%     { transform: translate(28px,-18px) scale(1.06) }
    66%     { transform: translate(-14px,22px) scale(0.97) }
  }
  @keyframes ct-orb-drift-b {
    0%,100% { transform: translate(0,0) scale(1) }
    40%     { transform: translate(-22px,16px) scale(1.05) }
    75%     { transform: translate(18px,-12px) scale(0.96) }
  }
  @keyframes gradient-x {
    0%,100% { background-position: 0% 50% }
    50%     { background-position: 100% 50% }
  }
  .ct-orb-a { animation: ct-orb-drift-a 12s ease-in-out infinite }
  .ct-orb-b { animation: ct-orb-drift-b 15s ease-in-out infinite }

  @media (prefers-reduced-motion: reduce) {
    .ct-orb-a, .ct-orb-b { animation: none !important }
  }
`;

function StyleInject() {
  useEffect(() => {
    const ID = 'ct-bg-v1';
    if (document.getElementById(ID)) return;
    const el = document.createElement('style');
    el.id = ID;
    el.textContent = CONTACT_STYLES;
    document.head.appendChild(el);
    return () => document.getElementById(ID)?.remove();
  }, []);
  return null;
}

/* ─────────────────────── constants ─────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1];
const EASE_BACK = [0.34, 1.56, 0.64, 1];

const CONTACT_INFO = [
  {
    id: 'email', icon: Mail, title: 'Email',
    value: 'badiegmati11@gmail.com', href: 'mailto:badiegmati11@gmail.com',
    gradient: 'from-blue-500 to-cyan-500', gradientRaw: '#3b82f6,#06b6d4',
    border: 'hover:border-blue-500/50', glow: 'from-blue-500/20 to-cyan-500/20',
    desc: 'Réponse sous 24h', color: 'text-blue-400',
  },
  {
    id: 'phone', icon: Phone, title: 'Téléphone',
    value: '+216 58 294 838', href: 'tel:+21658294838',
    gradient: 'from-emerald-500 to-teal-500', gradientRaw: '#10b981,#14b8a6',
    border: 'hover:border-emerald-500/50', glow: 'from-emerald-500/20 to-teal-500/20',
    desc: 'Disponible 9h – 18h', color: 'text-emerald-400',
  },
  {
    id: 'location', icon: MapPin, title: 'Localisation',
    value: 'Bouargoub, Nabeul, Tunisie', href: null,
    gradient: 'from-purple-500 to-pink-500', gradientRaw: '#a855f7,#ec4899',
    border: 'hover:border-purple-500/50', glow: 'from-purple-500/20 to-pink-500/20',
    desc: 'Ouvert au télétravail', color: 'text-purple-400',
  },
];

const AVAILABILITY = [
  {
    day: 'Lun – Ven', time: '9h – 18h', status: 'Disponible',
    cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', dot: 'bg-emerald-400',
  },
  {
    day: 'Samedi', time: '10h – 14h', status: 'Sur rendez-vous',
    cls: 'bg-blue-500/15 text-blue-400 border-blue-500/25', dot: 'bg-blue-400',
  },
  {
    day: 'Dimanche', time: 'Repos', status: 'Non disponible',
    cls: 'bg-gray-500/15 text-gray-400 border-gray-500/25', dot: 'bg-gray-500',
  },
];

/* ─────────────────────── variants ──────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE_EXPO },
  },
};

const stagger = (delay = 0.08, ch = 0.1) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: ch, delayChildren: delay } },
});

/* ─────────────────────── ContactCard ─────────────────────── */
function ContactCard({ info, reduced, index }) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const Icon   = info.icon;
  const Tag    = info.href ? motion.a : motion.div;
  const extra  = info.href ? { href: info.href } : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.92, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: EASE_BACK }}
    >
      <Tag
        {...extra}
        whileHover={reduced ? {} : { y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group relative block cursor-${info.href ? 'pointer' : 'default'}`}
      >
        {/* Ambient glow CSS */}
        <div
          className={`absolute -inset-3 bg-gradient-to-br ${info.glow}
                      rounded-[28px] blur-2xl pointer-events-none transition-opacity duration-450`}
          style={{ opacity: hovered && !reduced ? 0.45 : 0 }}
          aria-hidden="true"
        />

        <div
          className="relative flex items-center gap-4 p-5 rounded-2xl border overflow-hidden
                     transition-all duration-300"
          style={{
            background: hovered
              ? 'linear-gradient(145deg,rgba(13,20,42,0.97) 0%,rgba(8,10,20,0.99) 100%)'
              : 'linear-gradient(145deg,rgba(13,20,42,0.92) 0%,rgba(8,10,20,0.96) 100%)',
            backdropFilter: 'blur(24px)',
            borderColor: hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
          }}
        >
          {/* top accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.9, ease: EASE_EXPO }}
            style={{ originX: 0 }}
            className={`absolute top-0 left-0 right-0 h-px
                        bg-gradient-to-r ${info.gradient} opacity-0
                        group-hover:opacity-90 transition-opacity duration-300`}
          />

          {/* animated left border */}
          <motion.div
            animate={hovered && !reduced ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
            className={`absolute left-0 top-0 bottom-0 w-[2px] origin-top rounded-r-full
                        bg-gradient-to-b ${info.gradient}`}
          />

          {/* icon */}
          <motion.div
            animate={hovered && !reduced ? { rotate: 12, scale: 1.12 } : { rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 14 }}
            className="relative flex-shrink-0"
          >
            <div className={`absolute inset-0 rounded-xl blur-md opacity-40
                             bg-gradient-to-br ${info.gradient}`} />
            <div className={`relative p-3 rounded-xl bg-gradient-to-br ${info.gradient}
                             shadow-lg ring-1 ring-white/15`}>
              <Icon className="text-white" size={20} />
            </div>

            {/* Pulse ring CSS — même pattern que Skills sk-ping */}
            <div
              className="absolute inset-0 rounded-xl border border-white/25 animate-ping"
              style={{
                animationDelay: `${index * 0.4}s`,
                animationDuration: '3s',
              }}
            />
          </motion.div>

          {/* text */}
          <div className="flex-1 min-w-0">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">
              {info.title}
            </p>
            <p className="text-white font-semibold text-sm truncate mb-1
                          group-hover:text-blue-100 transition-colors duration-300">
              {info.value}
            </p>
            <div className="flex items-center gap-1.5">
              <Clock size={11} className={info.color} />
              <span className="text-gray-500 text-xs">{info.desc}</span>
            </div>
          </div>

          {/* arrow */}
          {info.href && (
            <motion.div
              animate={hovered && !reduced ? { x: 0, opacity: 1 } : { x: -8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ArrowRight size={16} className={info.color} />
            </motion.div>
          )}

          {/* Corner dots CSS — identique Skills */}
          <div className="absolute bottom-2 right-2 flex gap-1 opacity-15">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-white animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </Tag>
    </motion.div>
  );
}

/* ─────────────────────── FormField ─────────────────────── */
function FormField({ icon: Icon, label, error, children }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          {label}
        </label>
      )}
      <div className="relative group/field">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none
                        group-focus-within/field:text-blue-400 text-gray-600
                        transition-colors duration-200">
          <Icon size={17} />
        </div>
        {children}
        <div className="absolute inset-0 rounded-xl border-2 border-blue-500/0
                        group-focus-within/field:border-blue-500/45
                        pointer-events-none transition-all duration-250" />
      </div>
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1.5">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────── AvailabilityRow ─────────────────── */
function AvailabilityRow({ s, i, reduced }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.09 + 0.2, ease: EASE_EXPO }}
      whileHover={reduced ? {} : { x: 4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between p-3 rounded-xl border
                 transition-all duration-300 cursor-default"
      style={{
        background:   hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        borderColor:  hovered ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)',
      }}
    >
      <div className="flex items-center gap-2.5">
        <motion.div
          animate={{ scale: hovered && !reduced ? 1.3 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 14 }}
          className={`w-1.5 h-1.5 rounded-full ${s.dot} flex-shrink-0`}
        />
        <span className="text-gray-300 text-sm font-medium">{s.day}</span>
        <span className="text-gray-600 text-xs">• {s.time}</span>
      </div>
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${s.cls}`}>
        {s.status}
      </span>
    </motion.div>
  );
}

/* ─────────────────────── Contact (main) ─────────────────── */
export default function Contact() {
  const reduced = useReducedMotion();
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Nom requis';
    if (!form.email.trim())   e.email   = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.message.trim()) e.message = 'Message requis';
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    try {
      const fd = new FormData();
      fd.append('access_key', '9576e73c-52be-44a8-936a-038a1163937a');
      fd.append('name',       form.name);
      fd.append('email',      form.email);
      fd.append('message',    form.message);
      fd.append('from_name',  'Portfolio Contact');
      fd.append('subject',    'Nouveau message depuis le portfolio');
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus('ok');
        setResult('Message envoyé avec succès !');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => { setStatus(null); setResult(''); }, 5000);
      } else {
        setStatus('error'); setResult(`Erreur : ${data.message}`);
      }
    } catch {
      setStatus('error'); setResult('Erreur réseau. Réessayez.');
    }
  };

  const inputCls = `w-full pl-11 pr-4 py-3.5 border rounded-xl text-white
                    placeholder-gray-600 text-sm focus:outline-none
                    transition-all duration-200 backdrop-blur-sm`;

  return (
    <>
      {/*
       * StyleInject : keyframes ct-orb-drift-a/b + gradient-x
       * Même pattern d'injection que Skills.jsx (StyleInject)
       */}
      <StyleInject />

      <section
        id="contact"
        className="relative py-36 overflow-hidden"
        style={{
          /*
           * ── ALIGNEMENT Skills.jsx ──
           * Skills : linear-gradient(180deg, rgba(2,8,23,0) 0%, rgba(2,8,23,.55) 40%, rgba(2,8,23,.62) 100%)
           * Contact : même logique transparent → semi-opaque
           * GlobalBackground (canvas fixed) transparaît → cohérence totale
           */
          background: 'linear-gradient(180deg,rgba(2,8,23,0) 0%,rgba(2,8,23,0.55) 40%,rgba(2,8,23,0.62) 100%)',
        }}
      >
        {/*
         * ── Dot grid — aligné Skills.jsx ──
         * Skills : opacity .038 / 28px
         * Contact : idem (était .048 / 32px → corrigé)
         */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle,rgba(148,163,184,0.038) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/*
         * ── Vignette — alignée Skills.jsx ──
         * Skills : ellipse 82% 68% / rgba(2,8,23,.52)
         * Contact : idem (était 85% 85% / .72 → corrigé)
         */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse 82% 68% at 50% 50%,transparent 38%,rgba(2,8,23,0.52) 100%)',
          }}
        />

        {/*
         * ── Orb A — aligné Skills.jsx ──
         * Skills  : #1e40af,#6d28d9 / -top-32 -left-32 / 380px / blur-[88px] / opacity-[0.06]
         * Contact : idem (était #1d4ed8 / 700px / classes App.css → corrigé)
         * Animation : ct-orb-drift-a (12s) = sk-orb-drift-a
         */}
        <div
          className="ct-orb-a absolute -top-32 -left-32 w-[380px] h-[380px]
                     rounded-full blur-[88px] opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#1e40af,#6d28d9)' }}
          aria-hidden="true"
        />

        {/*
         * ── Orb B — aligné Skills.jsx ──
         * Skills  : #7c3aed,#0891b2 / -bottom-32 -right-32 / 320px / blur-[88px] / opacity-[0.05]
         * Contact : idem (était #be185d / 600px → corrigé, couleur cyan alignée GlobalBackground)
         * Animation : ct-orb-drift-b (15s) = sk-orb-drift-b
         */}
        <div
          className="ct-orb-b absolute -bottom-32 -right-32 w-[320px] h-[320px]
                     rounded-full blur-[88px] opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#7c3aed,#0891b2)' }}
          aria-hidden="true"
        />

        <div className="container relative mx-auto px-4 md:px-10 z-10 max-w-[1400px]">

          {/* ── HEADER ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden:  { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
            }}
            className="text-center mb-24"
          >
            {/* Badge — identique Skills : indigo-500 border + bg */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10
                         border border-indigo-500/[0.14] bg-indigo-500/[0.045] backdrop-blur-xl
                         text-indigo-300/90 text-[10px] font-black uppercase tracking-[0.24em]"
              style={{
                boxShadow: '0 0 18px rgba(99,102,241,.08), inset 0 1px 0 rgba(255,255,255,.04)',
              }}
            >
              <Sparkles
                size={11}
                style={{ animation: reduced ? 'none' : 'spin 10s linear infinite' }}
              />
              Contact
              <Sparkles
                size={11}
                style={{ animation: reduced ? 'none' : 'spin 10s linear infinite reverse' }}
              />
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-[88px] font-black tracking-tight mb-6 leading-[1.01]"
            >
              <span className="text-white">Me </span>
              <span className="relative inline-block">
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg,#60a5fa 0%,#818cf8 28%,#a78bfa 50%,#f472b6 72%,#60a5fa 100%)',
                    backgroundSize: '300% 100%',
                    animation: 'gradient-x 6s ease infinite',
                  }}
                >
                  Contacter
                </span>

                {/* Underline holographique — identique Skills */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 1.2, ease: EASE_EXPO }}
                  style={{ originX: 0.5 }}
                  className="absolute -bottom-3 left-0 right-0 h-[1.5px] rounded-full
                             bg-gradient-to-r from-transparent via-indigo-400/55 to-transparent blur-sm"
                />
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Discutons de votre{' '}
              <span className="text-white font-semibold">projet</span>
              , d'une opportunité de{' '}
              <span
                className="font-semibold"
                style={{
                  background: 'linear-gradient(90deg,#a78bfa,#818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                collaboration
              </span>{' '}
              ou simplement échangeons autour des technologies
            </motion.p>

            {/* Divider — identique Skills (indigo + violet, Zap icon) */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 1.1, ease: EASE_EXPO }}
              className="mt-12 mx-auto flex items-center gap-3 max-w-[120px]"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/28 to-transparent" />
              <Zap
                size={9}
                className="text-indigo-400/38 flex-shrink-0"
                style={{ animation: reduced ? 'none' : undefined }}
              />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/28 to-transparent" />
            </motion.div>
          </motion.div>

          {/* ── TWO COLUMNS ── */}
          <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

            {/* ── LEFT COL ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={stagger(0.1, 0.12)}
              className="lg:col-span-2 space-y-5"
            >
              {/* Contact cards */}
              <motion.div variants={fadeUp} className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE_EXPO }}
                  className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.22em] mb-5
                             flex items-center gap-2"
                >
                  <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
                  Coordonnées
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-violet-500/30" />
                </motion.div>

                {CONTACT_INFO.map((info, i) => (
                  <ContactCard key={info.id} info={info} reduced={reduced} index={i} />
                ))}
              </motion.div>

              {/* Availability panel */}
              <motion.div
                variants={fadeUp}
                className="relative p-6 rounded-2xl border border-white/[0.06] space-y-3 overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg,rgba(13,20,42,0.92) 0%,rgba(8,10,20,0.96) 100%)',
                  backdropFilter: 'blur(24px)',
                }}
              >
                {/* Top accent — indigo→cyan comme Skills */}
                <div
                  className="absolute top-0 left-4 right-4 h-px rounded-full
                              bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
                />

                {/* Corner ambient — identique SkillCategory */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none
                              blur-3xl opacity-[0.038] bg-indigo-400"
                  style={{ transform: 'translate(36%,-36%)' }}
                  aria-hidden="true"
                />

                <div className="flex items-center gap-3 mb-5">
                  <div className="relative flex-shrink-0">
                    <div
                      className="absolute inset-0 rounded-xl blur-md opacity-40
                                 bg-gradient-to-br from-cyan-500 to-indigo-600"
                    />
                    <div
                      className="relative p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600
                                 shadow-lg ring-1 ring-white/15"
                    >
                      <Clock className="text-white" size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Disponibilités</h3>
                    <p className="text-gray-600 text-[10px]">Horaires de contact</p>
                  </div>
                </div>

                {AVAILABILITY.map((s, i) => (
                  <AvailabilityRow key={i} s={s} i={i} reduced={reduced} />
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT COL — form ── */}
            <motion.div
              initial={{ opacity: 0, x: 36, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, ease: EASE_EXPO }}
              className="lg:col-span-3"
            >
              <div
                className="relative p-8 rounded-2xl border border-white/[0.07] shadow-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(150deg,rgba(9,13,30,0.97),rgba(6,7,15,0.99))',
                  backdropFilter: 'blur(28px)',
                  boxShadow: '0 40px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,.018)',
                }}
              >
                {/* Top accent — indigo→violet→cyan (identique Skills accentGradient) */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 1.1, ease: EASE_EXPO }}
                  style={{ originX: 0.5 }}
                  className="absolute top-0 left-0 right-0 h-[1.5px] rounded-full
                             bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-90"
                />

                {/* Corner ambient glow — identique SkillCategory */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none
                              blur-3xl opacity-[0.038] bg-indigo-400"
                  style={{ transform: 'translate(36%,-36%)' }}
                  aria-hidden="true"
                />

                {/* Inner glow top */}
                <div
                  className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.06) 0%,transparent 70%)',
                  }}
                />

                {/* Form header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="relative flex-shrink-0">
                    <div
                      className="absolute inset-0 rounded-xl blur-md opacity-40
                                 bg-gradient-to-br from-blue-500 to-indigo-600"
                    />
                    <div
                      className="relative p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600
                                 shadow-lg ring-1 ring-white/15"
                    >
                      <MessageCircle className="text-white" size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">
                      Envoyer un message
                    </h3>
                    <p className="text-gray-600 text-xs mt-0.5">
                      Réponse dans les plus brefs délais
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400
                               bg-emerald-500/10 border border-emerald-500/20
                               px-2.5 py-1 rounded-full cursor-default"
                  >
                    <Shield size={11} />
                    Sécurisé
                  </motion.div>
                </div>

                <form onSubmit={onSubmit} noValidate className="space-y-5">

                  {/* name + email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField icon={User} label="Nom complet" error={errors.name}>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Votre nom"
                        className={inputCls}
                        style={{
                          paddingLeft: '2.75rem',
                          background: 'rgba(255,255,255,0.04)',
                          borderColor: errors.name
                            ? 'rgba(248,113,113,0.5)'
                            : 'rgba(255,255,255,0.08)',
                        }}
                      />
                    </FormField>
                    <FormField icon={Mail} label="Email" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="votre@email.com"
                        className={inputCls}
                        style={{
                          paddingLeft: '2.75rem',
                          background: 'rgba(255,255,255,0.04)',
                          borderColor: errors.email
                            ? 'rgba(248,113,113,0.5)'
                            : 'rgba(255,255,255,0.08)',
                        }}
                      />
                    </FormField>
                  </div>

                  {/* message */}
                  <FormField icon={MessageCircle} label="Message" error={errors.message}>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Décrivez votre projet, opportunité ou question…"
                      rows={6}
                      className={`${inputCls} resize-none`}
                      style={{
                        paddingLeft: '2.75rem',
                        paddingTop: '1rem',
                        background: 'rgba(255,255,255,0.04)',
                        borderColor: errors.message
                          ? 'rgba(248,113,113,0.5)'
                          : 'rgba(255,255,255,0.08)',
                      }}
                    />
                  </FormField>

                  {/* char count */}
                  <div className="flex justify-end">
                    <span
                      className={`text-xs ${
                        form.message.length > 500 ? 'text-amber-400' : 'text-gray-700'
                      }`}
                    >
                      {form.message.length}/500
                    </span>
                  </div>

                  {/* submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={status === 'sending' ? {} : { scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide
                                flex items-center justify-center gap-3 overflow-hidden
                                relative transition-all duration-300
                                ${status === 'sending'
                                  ? 'cursor-not-allowed'
                                  : 'shadow-xl hover:shadow-indigo-500/30'
                                }`}
                    style={{
                      background: status === 'sending'
                        ? 'rgba(255,255,255,0.05)'
                        : 'linear-gradient(135deg,#2563eb,#6366f1,#0891b2)',
                      color: status === 'sending' ? 'rgba(255,255,255,0.3)' : 'white',
                      boxShadow: status === 'sending'
                        ? 'none'
                        : '0 20px 60px rgba(99,102,241,0.28)',
                    }}
                  >
                    {/* Shimmer — identique StatCard */}
                    {status !== 'sending' && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(90deg,transparent,rgba(255,255,255,0.10),transparent)',
                        }}
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          repeatDelay: 1,
                        }}
                      />
                    )}

                    <AnimatePresence mode="wait">
                      {status === 'sending' ? (
                        <motion.div
                          key="spin"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 text-gray-400"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-gray-600 border-t-gray-400 rounded-full"
                          />
                          <span>Envoi en cours…</span>
                        </motion.div>
                      ) : status === 'ok' ? (
                        <motion.div
                          key="ok"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-green-300"
                        >
                          <CheckCircle size={18} />
                          <span>Message envoyé !</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="send"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Send size={18} />
                          <span>Envoyer le message</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <ArrowRight size={16} />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>

                {/* Result toast */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: EASE_EXPO }}
                      className={`mt-5 p-4 rounded-xl flex items-center gap-3 text-sm border
                                  ${status === 'ok'
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                                    : 'bg-red-500/10 border-red-500/20 text-red-300'
                                  }`}
                    >
                      {status === 'ok'
                        ? <CheckCircle size={18} className="flex-shrink-0" />
                        : <AlertCircle size={18} className="flex-shrink-0" />
                      }
                      {result}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer note */}
                <div
                  className="mt-6 pt-5 border-t border-white/[0.05] flex items-center gap-2.5
                             text-gray-600 text-xs"
                >
                  <Zap size={13} className="text-yellow-400 flex-shrink-0" />
                  <span>Traitement sous 24h maximum · Données protégées Web3Forms</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}