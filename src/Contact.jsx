// ─── Contact.jsx ────────────────────────────────────────────────────
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Send, User, MessageCircle,
  Sparkles, Target, Clock, CheckCircle, AlertCircle,
  Globe, Zap, ArrowRight, ChevronRight, Shield,
  Briefcase, ExternalLink, Wifi
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';

/* ─────────────────────── constants ─────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1];

const CONTACT_INFO = [
  {
    id: 'email',
    icon: Mail,
    title: 'Email',
    value: 'badiegmati11@gmail.com',
    href: 'mailto:badiegmati11@gmail.com',
    gradient: 'from-blue-500 to-cyan-500',
    border: 'hover:border-blue-500/50',
    glow: 'from-blue-500/20 to-cyan-500/20',
    desc: 'Réponse sous 24h',
    color: 'text-blue-400',
  },
  {
    id: 'phone',
    icon: Phone,
    title: 'Téléphone',
    value: '+216 58 294 838',
    href: 'tel:+21658294838',
    gradient: 'from-emerald-500 to-teal-500',
    border: 'hover:border-emerald-500/50',
    glow: 'from-emerald-500/20 to-teal-500/20',
    desc: 'Disponible 9h – 18h',
    color: 'text-emerald-400',
  },
  {
    id: 'location',
    icon: MapPin,
    title: 'Localisation',
    value: 'Bouargoub, Nabeul, Tunisie',
    href: null,
    gradient: 'from-purple-500 to-pink-500',
    border: 'hover:border-purple-500/50',
    glow: 'from-purple-500/20 to-pink-500/20',
    desc: 'Ouvert au télétravail',
    color: 'text-purple-400',
  },
];

const AVAILABILITY = [
  { day: 'Lun – Ven', time: '9h – 18h',  status: 'Disponible',       cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', dot: 'bg-emerald-400' },
  { day: 'Samedi',    time: '10h – 14h', status: 'Sur rendez-vous',  cls: 'bg-blue-500/15 text-blue-400 border-blue-500/25',         dot: 'bg-blue-400'    },
  { day: 'Dimanche',  time: 'Repos',     status: 'Non disponible',   cls: 'bg-gray-500/15 text-gray-400 border-gray-500/25',         dot: 'bg-gray-500'    },
];

/* ─────────────────────── variants ──────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE_EXPO } },
};

const stagger = (delay = 0.08, ch = 0.1) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { staggerChildren: ch, delayChildren: delay } },
});

/* ─────────────────────── Particles ─────────────────────── */
function Particles({ reduced }) {
  const ref = useRef(null);
  const cnt = useRef(0);
  const spawn = useCallback(() => {
    if (!ref.current || cnt.current > 18) return;
    const el  = document.createElement('div');
    const sz  = Math.random() * 2 + 1;
    const dur = Math.random() * 4000 + 3000;
    const hue = Math.random() > 0.5 ? '59,130,246' : '139,92,246';
    Object.assign(el.style, {
      position: 'absolute', width: `${sz}px`, height: `${sz}px`,
      borderRadius: '50%', left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`, opacity: '0', pointerEvents: 'none',
      background: `rgba(${hue},0.65)`,
      boxShadow: `0 0 ${sz * 3}px rgba(${hue},0.5)`,
    });
    const anim = el.animate([
      { opacity: 0, transform: 'translateY(0) scale(0)' },
      { opacity: 0.8, transform: `translateY(-${Math.random() * 60 + 25}px) scale(1)`, offset: 0.4 },
      { opacity: 0,  transform: `translateY(-${Math.random() * 130 + 70}px) scale(0.3)` },
    ], { duration: dur, easing: 'cubic-bezier(0.4,0,0.2,1)' });
    ref.current.appendChild(el);
    cnt.current++;
    anim.onfinish = () => { el.remove(); cnt.current--; };
  }, []);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(spawn, 180);
    return () => clearInterval(id);
  }, [reduced, spawn]);
  return <div ref={ref} className="absolute inset-0 pointer-events-none z-0" />;
}

/* ─────────────────────── ContactCard ───────────────────── */
function ContactCard({ info, reduced }) {
  const [hovered, setHovered] = useState(false);
  const Icon = info.icon;
  const Tag  = info.href ? motion.a : motion.div;
  const extra = info.href ? { href: info.href } : {};

  return (
    <Tag
      {...extra}
      whileHover={reduced ? {} : { y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative block cursor-${info.href ? 'pointer' : 'default'}`}
    >
      {/* glow */}
      <motion.div
        animate={hovered && !reduced ? { opacity: 0.4 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`absolute -inset-2 bg-gradient-to-br ${info.glow}
                    rounded-2xl blur-xl pointer-events-none`}
      />

      <div className={`relative flex items-center gap-4 p-5 rounded-2xl
                       bg-gray-800/50 backdrop-blur-sm border border-gray-700/40
                       ${info.border} transition-colors duration-300 overflow-hidden`}>
        {/* top accent */}
        <div className={`absolute top-0 left-0 right-0 h-px
                         bg-gradient-to-r ${info.gradient} opacity-0
                         group-hover:opacity-80 transition-opacity duration-300`} />

        {/* icon */}
        <motion.div
          animate={hovered && !reduced ? { rotate: 12, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 14 }}
          className={`flex-shrink-0 p-3 rounded-xl
                      bg-gradient-to-br ${info.gradient} shadow-lg`}
        >
          <Icon className="text-white" size={20} />
        </motion.div>

        {/* text */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-0.5">
            {info.title}
          </p>
          <p className="text-white font-semibold text-sm truncate mb-1">{info.value}</p>
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
      </div>
    </Tag>
  );
}

/* ─────────────────────── FormField ─────────────────────── */
function FormField({ icon: Icon, label, error, children }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
          {label}
        </label>
      )}
      <div className="relative group/field">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none
                        group-focus-within/field:text-blue-400 text-gray-500
                        transition-colors duration-200">
          <Icon size={17} />
        </div>
        {children}
        {/* focus ring */}
        <div className="absolute inset-0 rounded-xl border-2 border-blue-500/0
                        group-focus-within/field:border-blue-500/50
                        pointer-events-none transition-all duration-200" />
      </div>
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────── Contact (main) ────────────────── */
export default function Contact() {
  const reduced = useReducedMotion();
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState(null); // null | 'sending' | 'ok' | 'error'
  const [result, setResult]   = useState('');

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
      fd.append('access_key',  '9576e73c-52be-44a8-936a-038a1163937a');
      fd.append('name',        form.name);
      fd.append('email',       form.email);
      fd.append('message',     form.message);
      fd.append('from_name',   'Portfolio Contact');
      fd.append('subject',     'Nouveau message depuis le portfolio');

      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();

      if (data.success) {
        setStatus('ok');
        setResult('Message envoyé avec succès !');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => { setStatus(null); setResult(''); }, 5000);
      } else {
        setStatus('error');
        setResult(`Erreur : ${data.message}`);
      }
    } catch {
      setStatus('error');
      setResult('Erreur réseau. Réessayez.');
    }
  };

  const inputCls = `w-full pl-11 pr-4 py-3.5 bg-gray-800/60 border border-gray-700/50
                    rounded-xl text-white placeholder-gray-500 text-sm
                    focus:outline-none focus:bg-gray-800/80
                    transition-all duration-200 backdrop-blur-sm`;

  return (
    <section id="contact" className="relative py-28 bg-gray-950 overflow-hidden">

      <Particles reduced={reduced} />

      {/* grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* orbs */}
      {[
        { cls: 'top-[-8%] left-[-8%] w-[480px] h-[480px]', from: '#2563eb', to: '#7c3aed', dur: 22, dx: 60, dy: 40 },
        { cls: 'bottom-[-8%] right-[-8%] w-[420px] h-[420px]', from: '#7c3aed', to: '#db2777', dur: 26, dx: -50, dy: -40 },
      ].map((o, i) => (
        <motion.div key={i}
          animate={reduced ? {} : { x: [0, o.dx, 0], y: [0, o.dy, 0] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          className={`absolute ${o.cls} rounded-full opacity-[0.06] blur-[80px] pointer-events-none`}
          style={{ background: `radial-gradient(circle, ${o.from}, ${o.to})` }} />
      ))}

      <div className="container relative mx-auto px-4 md:px-8 z-10">

        {/* header */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0, 0.1)}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       border border-blue-500/25 bg-blue-500/8 text-blue-400
                       text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles size={13} className="animate-pulse" />
            Contact
          </motion.div>

          <motion.h2 variants={fadeUp}
            className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-none">
            <span className="text-white">Me </span>
            <span className="text-transparent bg-clip-text
                             bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400
                             animate-gradient-x">
              Contacter
            </span>
          </motion.h2>

          <motion.p variants={fadeUp}
            className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discutons de votre projet, d'une opportunité de collaboration
            ou simplement échangeons autour des technologies
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.9, ease: EASE_EXPO }}
            className="mt-8 mx-auto h-px w-48 rounded-full origin-left
                       bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
          />
        </motion.div>

        {/* two columns */}
        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

          {/* ── left col ── */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger(0.1, 0.12)}
            className="lg:col-span-2 space-y-5"
          >
            {/* contact cards */}
            <motion.div variants={fadeUp} className="space-y-3">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-4">
                Coordonnées
              </p>
              {CONTACT_INFO.map(info => (
                <ContactCard key={info.id} info={info} reduced={reduced} />
              ))}
            </motion.div>

            {/* availability */}
            <motion.div
              variants={fadeUp}
              className="p-5 rounded-2xl bg-gray-800/40 backdrop-blur-sm
                         border border-gray-700/40 space-y-3"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                  <Clock className="text-white" size={16} />
                </div>
                <h3 className="text-white font-bold text-sm">Disponibilités</h3>
              </div>
              {AVAILABILITY.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2, ease: EASE_EXPO }}
                  className="flex items-center justify-between p-3
                             bg-gray-900/50 rounded-xl border border-gray-800/40"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    <span className="text-gray-300 text-sm font-medium">{s.day}</span>
                    <span className="text-gray-500 text-xs">• {s.time}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${s.cls}`}>
                    {s.status}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            
          </motion.div>

          {/* ── right col — form ── */}
          <motion.div
            initial={{ opacity: 0, x: 32, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="lg:col-span-3"
          >
            <div className="relative p-7 rounded-2xl bg-gray-800/40 backdrop-blur-sm
                            border border-gray-700/40 shadow-2xl overflow-hidden">
              {/* top accent */}
              <div className="absolute top-0 left-0 right-0 h-px
                              bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-80" />

              {/* form header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Envoyer un message</h3>
                  <p className="text-gray-500 text-xs">Réponse dans les plus brefs délais</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400
                                bg-emerald-500/10 border border-emerald-500/20
                                px-2.5 py-1 rounded-full">
                  <Shield size={11} />
                  Sécurisé
                </div>
              </div>

              <form onSubmit={onSubmit} noValidate className="space-y-5">
                {/* name + email row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField icon={User} label="Nom complet" error={errors.name}>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Votre nom"
                      className={inputCls}
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </FormField>
                  <FormField icon={Mail} label="Email" error={errors.email}>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="votre@email.com"
                      className={inputCls}
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </FormField>
                </div>

                {/* message */}
                <FormField icon={MessageCircle} label="Message" error={errors.message}>
                  <textarea
                    name="message" value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre projet, opportunité ou question…"
                    rows={6}
                    className={`${inputCls} resize-none`}
                    style={{ paddingLeft: '2.75rem', paddingTop: '1rem' }}
                  />
                </FormField>

                {/* char count */}
                <div className="flex justify-end">
                  <span className={`text-xs ${form.message.length > 500 ? 'text-amber-400' : 'text-gray-600'}`}>
                    {form.message.length}/500
                  </span>
                </div>

                {/* submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={status === 'sending' ? {} : { scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide
                              flex items-center justify-center gap-3 overflow-hidden
                              relative transition-shadow duration-300
                              ${status === 'sending'
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/25 hover:shadow-purple-500/30'
                              }`}
                >
                  {/* shimmer */}
                  {status !== 'sending' && (
                    <div className="absolute inset-0 -translate-x-full hover:translate-x-full
                                    bg-gradient-to-r from-transparent via-white/15 to-transparent
                                    transition-transform duration-700 pointer-events-none" />
                  )}

                  <AnimatePresence mode="wait">
                    {status === 'sending' ? (
                      <motion.div key="spin"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-3">
                        <motion.div animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-gray-500 border-t-gray-300 rounded-full" />
                        <span>Envoi en cours…</span>
                      </motion.div>
                    ) : status === 'ok' ? (
                      <motion.div key="ok"
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-green-300">
                        <CheckCircle size={18} />
                        <span>Message envoyé !</span>
                      </motion.div>
                    ) : (
                      <motion.div key="send"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2">
                        <Send size={18} />
                        <span>Envoyer le message</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              {/* result toast */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: EASE_EXPO }}
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
              <div className="mt-6 pt-5 border-t border-gray-700/40 flex items-center gap-2 text-gray-500 text-xs">
                <Zap size={13} className="text-yellow-400" />
                <span>Traitement sous 24h maximum · Données protégées Web3Forms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 4s ease infinite; }
      `}</style>
    </section>
  );
}