import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  Mail, Phone, MapPin, Send, User, MessageCircle,
  Sparkles, Target, Clock, CheckCircle, AlertCircle,
  Globe, Zap, ArrowRight, ChevronRight, Shield,
  Briefcase, ExternalLink, Wifi, Star
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';

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
  { day: 'Lun – Ven', time: '9h – 18h',  status: 'Disponible',
    cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', dot: 'bg-emerald-400' },
  { day: 'Samedi',    time: '10h – 14h', status: 'Sur rendez-vous',
    cls: 'bg-blue-500/15 text-blue-400 border-blue-500/25',         dot: 'bg-blue-400'    },
  { day: 'Dimanche',  time: 'Repos',     status: 'Non disponible',
    cls: 'bg-gray-500/15 text-gray-400 border-gray-500/25',         dot: 'bg-gray-500'    },
];

/* ─────────────────────── variants ──────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE_EXPO } },
};

const stagger = (delay = 0.08, ch = 0.1) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { staggerChildren: ch, delayChildren: delay } },
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
        {/* ambient glow */}
        <motion.div
          animate={hovered && !reduced ? { opacity: 0.45, scale: 1.05 } : { opacity: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className={`absolute -inset-3 bg-gradient-to-br ${info.glow}
                      rounded-[28px] blur-2xl pointer-events-none`}
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
            <motion.div
              animate={{ scale: [1,1.55,1], opacity: [0.3,0,0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: index * 0.4 }}
              className="absolute inset-0 rounded-xl border border-white/25"
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

          {/* corner dots */}
          <div className="absolute bottom-2 right-2 flex gap-1 opacity-15">
            {[0,1,2].map(i => (
              <motion.div key={i}
                animate={{ opacity: hovered ? [0.4,1,0.4] : 0.3 }}
                transition={{ duration: 1.5, delay: i*0.2, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-white"
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
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        borderColor: hovered ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)',
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
    <section
      id="contact"
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
        <motion.div key={i}
          animate={{ x: [0,o.dx,0], y: [0,o.dy,0], scale: [1,1.18,1] }}
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
            Contact
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
            <span className="text-white">Me </span>
            <span className="relative inline-block">
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg,#60a5fa 0%,#a78bfa 30%,#f472b6 60%,#60a5fa 100%)',
                  backgroundSize: '300% 100%',
                  animation: 'gradient-x 6s ease infinite',
                }}
              >
                Contacter
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
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Discutons de votre{' '}
            <span className="text-white font-semibold">projet</span>, d'une opportunité de{' '}
            <span
              className="font-semibold"
              style={{
                background: 'linear-gradient(90deg,#a78bfa,#818cf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}
            >
              collaboration
            </span>{' '}
            ou simplement échangeons autour des technologies
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

        {/* ── TWO COLUMNS ── */}
        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

          {/* ── LEFT COL ── */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger(0.1, 0.12)}
            className="lg:col-span-2 space-y-5"
          >
            {/* contact cards */}
            <motion.div variants={fadeUp} className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_EXPO }}
                className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.22em] mb-5
                           flex items-center gap-2"
              >
                <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
                Coordonnées
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-500/30" />
              </motion.div>

              {CONTACT_INFO.map((info, i) => (
                <ContactCard key={info.id} info={info} reduced={reduced} index={i} />
              ))}
            </motion.div>

            {/* availability */}
            <motion.div
              variants={fadeUp}
              className="relative p-6 rounded-2xl border border-white/[0.06] space-y-3 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg,rgba(13,20,42,0.92) 0%,rgba(8,10,20,0.96) 100%)',
                backdropFilter: 'blur(24px)',
              }}
            >
              {/* top accent */}
              <div className="absolute top-0 left-4 right-4 h-px rounded-full
                              bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

              <div className="flex items-center gap-3 mb-5">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-xl blur-md opacity-40
                                   bg-gradient-to-br from-cyan-500 to-blue-600" />
                  <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600
                                   shadow-lg ring-1 ring-white/15">
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
                background: 'linear-gradient(145deg,rgba(13,20,42,0.95) 0%,rgba(8,10,20,0.98) 100%)',
                backdropFilter: 'blur(28px)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
              }}
            >
              {/* top accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1.1, ease: EASE_EXPO }}
                style={{ originX: 0.5 }}
                className="absolute top-0 left-0 right-0 h-px
                           bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-90"
              />

              {/* inner glow top */}
              <div
                className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%,rgba(96,165,250,0.06) 0%,transparent 70%)',
                }}
              />

              {/* form header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-xl blur-md opacity-40
                                   bg-gradient-to-br from-blue-500 to-purple-600" />
                  <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600
                                   shadow-lg ring-1 ring-white/15">
                    <MessageCircle className="text-white" size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">Envoyer un message</h3>
                  <p className="text-gray-600 text-xs mt-0.5">Réponse dans les plus brefs délais</p>
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
                      type="text" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Votre nom"
                      className={inputCls}
                      style={{
                        paddingLeft: '2.75rem',
                        background: 'rgba(255,255,255,0.04)',
                        borderColor: errors.name ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.08)',
                      }}
                    />
                  </FormField>
                  <FormField icon={Mail} label="Email" error={errors.email}>
                    <input
                      type="email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="votre@email.com"
                      className={inputCls}
                      style={{
                        paddingLeft: '2.75rem',
                        background: 'rgba(255,255,255,0.04)',
                        borderColor: errors.email ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.08)',
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
                      paddingLeft: '2.75rem', paddingTop: '1rem',
                      background: 'rgba(255,255,255,0.04)',
                      borderColor: errors.message ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.08)',
                    }}
                  />
                </FormField>

                {/* char count */}
                <div className="flex justify-end">
                  <span className={`text-xs ${form.message.length > 500 ? 'text-amber-400' : 'text-gray-700'}`}>
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
                                : 'shadow-xl hover:shadow-purple-500/30'
                              }`}
                  style={{
                    background: status === 'sending'
                      ? 'rgba(255,255,255,0.05)'
                      : 'linear-gradient(135deg,#2563eb,#7c3aed,#0891b2)',
                    color: status === 'sending' ? 'rgba(255,255,255,0.3)' : 'white',
                    boxShadow: status === 'sending' ? 'none' : '0 20px 60px rgba(37,99,235,0.3)',
                  }}
                >
                  {/* shimmer */}
                  {status !== 'sending' && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)',
                      }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {status === 'sending' ? (
                      <motion.div key="spin"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                      <motion.div key="ok"
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-green-300"
                      >
                        <CheckCircle size={18} />
                        <span>Message envoyé !</span>
                      </motion.div>
                    ) : (
                      <motion.div key="send"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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

              {/* result toast */}
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

              {/* footer note */}
              <div className="mt-6 pt-5 border-t border-white/[0.05] flex items-center gap-2.5
                              text-gray-600 text-xs">
                <Zap size={13} className="text-yellow-400 flex-shrink-0" />
                <span>Traitement sous 24h maximum · Données protégées Web3Forms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%,100% { background-position: 0%   50%; }
          50%      { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  );
}