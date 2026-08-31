// ─── Footer.jsx ─────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Heart, Github, Linkedin, Mail,
  ArrowUp, Sparkles, Cpu, Terminal,
  Zap, Globe, Coffee, Rocket,
  Code, MapPin, Phone, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ─────────────────────── constants ─────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1];

const SOCIAL = [
  { icon: Github,   href: 'https://github.com/badiegmati',
    label: 'GitHub',   tip: 'Voir mes projets',
    color: 'hover:text-white',        glow: 'from-gray-600/30 to-gray-800/30'   },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/badie-gmati-3168b535b/',
    label: 'LinkedIn', tip: 'Connectons-nous',
    color: 'hover:text-blue-400',     glow: 'from-blue-600/20 to-blue-800/20'   },
  { icon: Mail,     href: 'mailto:badiegmati11@gmail.com',
    label: 'Email',    tip: 'Envoyer un email',
    color: 'hover:text-emerald-400',  glow: 'from-emerald-600/20 to-emerald-800/20' },
];

const NAV_LINKS = [
  { label: 'Accueil',      href: '#home'     },
  { label: 'À propos',     href: '#about'    },
  { label: 'Compétences',  href: '#skills'   },
  { label: 'Projets',      href: '#projects' },
  { label: 'Contact',      href: '#contact'  },
];

const STATS = [
  { icon: Code,    value: '30+',       label: 'Technologies', color: 'text-blue-400',   grad: 'from-blue-400 to-cyan-400'    },
  { icon: Globe,   value: '5+',        label: 'Projets',      color: 'text-purple-400', grad: 'from-purple-400 to-pink-400'  },
  { icon: Cpu,     value: 'Edge AI',   label: 'Spécialité',   color: 'text-violet-400', grad: 'from-violet-400 to-indigo-400'},
  { icon: Coffee,  value: '∞',         label: 'Cafés',        color: 'text-amber-400',  grad: 'from-amber-400 to-orange-400' },
];

/* ─────────────────────── Particles ─────────────────────── */
function FooterParticles({ reduced }) {
  const ref = useRef(null);
  const cnt = useRef(0);
  const spawn = useCallback(() => {
    if (!ref.current || cnt.current > 12) return;
    const el  = document.createElement('div');
    const sz  = Math.random() * 1.5 + 0.8;
    const dur = Math.random() * 3500 + 2500;
    const hue = Math.random() > 0.5 ? '59,130,246' : '139,92,246';
    Object.assign(el.style, {
      position: 'absolute', width: `${sz}px`, height: `${sz}px`,
      borderRadius: '50%', left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`, opacity: '0', pointerEvents: 'none',
      background: `rgba(${hue},0.5)`,
    });
    const anim = el.animate([
      { opacity: 0, transform: 'translateY(0) scale(0)' },
      { opacity: 0.6, transform: `translateY(-${Math.random() * 50 + 20}px) scale(1)`, offset: 0.4 },
      { opacity: 0,  transform: `translateY(-${Math.random() * 100 + 60}px) scale(0.3)` },
    ], { duration: dur, easing: 'cubic-bezier(0.4,0,0.2,1)' });
    ref.current.appendChild(el);
    cnt.current++;
    anim.onfinish = () => { el.remove(); cnt.current--; };
  }, []);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(spawn, 220);
    return () => clearInterval(id);
  }, [reduced, spawn]);
  return <div ref={ref} className="absolute inset-0 pointer-events-none z-0" />;
}

/* ─────────────────────── ScrollTopBtn ──────────────────── */
function ScrollTopBtn({ reduced }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0  }}
          exit={{ opacity: 0, scale: 0, y: 20    }}
          whileHover={reduced ? {} : { scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Retour en haut"
        >
          {/* glow */}
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 to-purple-600
                          rounded-full blur-lg opacity-0 group-hover:opacity-40
                          transition-opacity duration-400" />

          <div className="relative p-3.5 rounded-full
                          bg-gradient-to-br from-blue-600 to-purple-600
                          text-white shadow-2xl shadow-blue-500/30
                          group-hover:shadow-purple-500/40 transition-shadow duration-300">
            <motion.div
              animate={reduced ? {} : { y: [0, -3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowUp size={20} />
            </motion.div>
          </div>

          {/* tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap
                          bg-gray-900 border border-gray-700/60 text-white text-xs
                          py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100
                          transition-opacity duration-200 pointer-events-none shadow-xl">
            Retour en haut
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────── Footer (main) ─────────────────── */
export default function Footer() {
  const reduced = useReducedMotion();
  const [hovSocial, setHovSocial] = useState(null);
  const [heartAnim, setHeartAnim] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="relative bg-gray-950 border-t border-gray-800/50 overflow-hidden">

        <FooterParticles reduced={reduced} />

        {/* top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px
                        bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        {/* dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* corner orb */}
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full
                        bg-blue-500/4 blur-[60px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full
                        bg-purple-500/4 blur-[60px] pointer-events-none" />

        <div className="container relative mx-auto px-4 md:px-8 py-16 z-10">
          <div className="max-w-6xl mx-auto">

            {/* ── brand + tagline ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_EXPO }}
              className="text-center mb-14"
            >
              {/* name */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={reduced ? {} : { rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text
                               bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400
                               animate-gradient-x">
                  Badie Gmati
                </h2>
                <motion.div
                  animate={reduced ? {} : { rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                />
              </div>

              <p className="text-gray-400 text-base max-w-xl mx-auto mb-2">
                Ingénieur Logiciel Full-Stack & Développeur IA Embarquée
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                <MapPin size={13} className="text-red-400" />
                <span>Bouargoub, Nabeul, Tunisie</span>
                <span>·</span>
                <Phone size={13} className="text-green-400" />
                <span>+216 58 294 838</span>
              </div>
            </motion.div>

            {/* ── stats row ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: EASE_EXPO }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={reduced ? {} : { y: -5, scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group flex flex-col items-center p-5 rounded-2xl
                             bg-gray-800/40 border border-gray-700/40
                             hover:border-gray-600/60 backdrop-blur-sm
                             transition-colors duration-300 cursor-default"
                >
                  <s.icon size={20} className={`${s.color} mb-2`} />
                  <span className={`text-2xl font-black bg-gradient-to-r ${s.grad}
                                    bg-clip-text text-transparent mb-1`}>
                    {s.value}
                  </span>
                  <span className="text-gray-500 text-xs font-medium">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* ── main grid : socials + nav ── */}
            <div className="grid md:grid-cols-2 gap-10 mb-14">

              {/* socials */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.6, ease: EASE_EXPO }}
              >
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-5">
                  Réseaux & Contact
                </p>
                <div className="flex gap-3">
                  {SOCIAL.map((s, i) => (
                    <div key={i} className="relative">
                      <motion.a
                        whileHover={reduced ? {} : { scale: 1.12, y: -4 }}
                        whileTap={{ scale: 0.92 }}
                        onMouseEnter={() => setHovSocial(i)}
                        onMouseLeave={() => setHovSocial(null)}
                        href={s.href}
                        target={s.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="relative block group"
                      >
                        {/* glow */}
                        <div className={`absolute -inset-2 bg-gradient-to-br ${s.glow}
                                         rounded-full blur opacity-0 group-hover:opacity-40
                                         transition-opacity duration-400`} />
                        <div className={`relative p-3.5 rounded-full
                                         bg-gray-800/60 border border-gray-700/40
                                         group-hover:border-gray-600/60 backdrop-blur-sm
                                         text-gray-400 ${s.color} transition-all duration-300`}>
                          <s.icon size={22} />
                        </div>
                      </motion.a>

                      {/* tooltip */}
                      <AnimatePresence>
                        {hovSocial === i && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="absolute -top-11 left-1/2 -translate-x-1/2 z-20"
                          >
                            <div className="bg-gray-900 border border-gray-700/60 text-white
                                            text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap
                                            relative">
                              {s.tip}
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2
                                              w-2 h-2 bg-gray-900 rotate-45
                                              border-b border-r border-gray-700/60" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* nav */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE_EXPO }}
              >
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-5">
                  Navigation
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={i}
                      whileHover={reduced ? {} : { x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      href={link.href}
                      className="group flex items-center gap-2 text-gray-400
                                 hover:text-white text-sm transition-colors duration-200"
                    >
                      <div className="w-1 h-1 rounded-full bg-gray-600
                                      group-hover:bg-blue-500 transition-colors duration-200" />
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── made with ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6, ease: EASE_EXPO }}
              className="flex justify-center mb-10"
            >
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5
                              bg-gray-800/40 backdrop-blur-sm border border-gray-700/40
                              rounded-full text-sm">
                <span className="text-gray-400">Conçu avec</span>
                <motion.div
                  animate={heartAnim && !reduced ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  onMouseEnter={() => setHeartAnim(true)}
                  onMouseLeave={() => setHeartAnim(false)}
                  className="cursor-default"
                >
                  <Heart size={16} className="text-red-500 fill-red-500" />
                </motion.div>
                <span className="text-gray-400">et</span>
                <motion.div
                  whileHover={reduced ? {} : { rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Code size={16} className="text-blue-400" />
                </motion.div>
                <span className="text-gray-400">par</span>
                <span className="text-transparent bg-clip-text
                                 bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
                  Badie Gmati
                </span>
              </div>
            </motion.div>

            {/* ── bottom bar ── */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="pt-6 border-t border-gray-800/50"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
                <span>© {year} Badie Gmati. Tous droits réservés.</span>
                <span className="hidden md:block">
                  ISIGK · Licence Informatique · Mention Très Bien 17/20
                </span>
                <div className="flex items-center gap-1.5">
                  <Zap size={11} className="text-yellow-500" />
                  <span>React · Tailwind · Framer Motion · Vite</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* corner icons */}
        <div className="absolute bottom-5 left-5 opacity-[0.06] pointer-events-none">
          <Terminal size={36} className="text-blue-400" />
        </div>
        <div className="absolute bottom-5 right-5 opacity-[0.06] pointer-events-none">
          <Rocket size={36} className="text-purple-400" />
        </div>

        <style>{`
          @keyframes gradient-x {
            0%,100% { background-position: 0% 50%; }
            50%      { background-position: 100% 50%; }
          }
          .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 4s ease infinite; }
        `}</style>
      </footer>

      <ScrollTopBtn reduced={reduced} />
    </>
  );
}