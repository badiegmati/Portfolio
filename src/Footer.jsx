// Footer.jsx
// ── Alignements background :
//    - bg-gray-950 → linear-gradient transparent (cohérent GlobalBackground)
//    - border-t Tailwind → accent gradient CSS top
//    - Dot grid : opacity .038 / 28px (= Skills/Contact)
//    - Vignette ajoutée : 82% 68% / rgba(2,8,23,.52)
//    - Orb A : #1e40af,#6d28d9 / 380px / blur-[88px] / opacity-[0.06] + animation
//    - Orb B : #7c3aed,#0891b2 / 320px / blur-[88px] / opacity-[0.05] + animation
//    - StyleInject ajouté (ft-orb-drift-a/b)
//    - Cards/socials bg : pattern rgba(9,13,30) identique Skills panels

import React, { useState, useEffect } from 'react';
import {
  Heart, Github, Linkedin, Mail,
  ArrowUp, Sparkles, Cpu, Terminal,
  Zap, Globe, Coffee, Rocket,
  Code, MapPin, Phone,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ─────────────────────── CSS injection ─────────────────── */
const FOOTER_STYLES = `
  @keyframes ft-orb-drift-a {
    0%,100% { transform: translate(0,0) scale(1) }
    33%     { transform: translate(28px,-18px) scale(1.06) }
    66%     { transform: translate(-14px,22px) scale(0.97) }
  }
  @keyframes ft-orb-drift-b {
    0%,100% { transform: translate(0,0) scale(1) }
    40%     { transform: translate(-22px,16px) scale(1.05) }
    75%     { transform: translate(18px,-12px) scale(0.96) }
  }
  .ft-orb-a { animation: ft-orb-drift-a 12s ease-in-out infinite }
  .ft-orb-b { animation: ft-orb-drift-b 15s ease-in-out infinite }

  @media (prefers-reduced-motion: reduce) {
    .ft-orb-a, .ft-orb-b { animation: none !important }
  }
`;

function StyleInject() {
  useEffect(() => {
    const ID = 'ft-bg-v1';
    if (document.getElementById(ID)) return;
    const el = document.createElement('style');
    el.id = ID;
    el.textContent = FOOTER_STYLES;
    document.head.appendChild(el);
    return () => document.getElementById(ID)?.remove();
  }, []);
  return null;
}

/* ─────────────────────── constants ─────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1];

const SOCIAL = [
  {
    icon: Github, href: 'https://github.com/badiegmati',
    label: 'GitHub', tip: 'Voir mes projets',
    color: 'hover:text-white',
    glow: 'from-gray-600/30 to-gray-800/30',
  },
  {
    icon: Linkedin, href: 'https://www.linkedin.com/in/badie-gmati-3168b535b/',
    label: 'LinkedIn', tip: 'Connectons-nous',
    color: 'hover:text-blue-400',
    glow: 'from-blue-600/20 to-blue-800/20',
  },
  {
    icon: Mail, href: 'mailto:badiegmati11@gmail.com',
    label: 'Email', tip: 'Envoyer un email',
    color: 'hover:text-emerald-400',
    glow: 'from-emerald-600/20 to-emerald-800/20',
  },
];

const NAV_LINKS = [
  { label: 'Accueil',     href: '#home'     },
  { label: 'À propos',    href: '#about'    },
  { label: 'Compétences', href: '#skills'   },
  { label: 'Projets',     href: '#projects' },
  { label: 'Contact',     href: '#contact'  },
];

const STATS = [
  {
    icon: Code,   value: '44+',     label: 'Technologies',
    color: 'text-blue-400',
    grad: 'from-blue-400 to-cyan-400',
    gradRaw: '#60a5fa,#22d3ee',
  },
  {
    icon: Globe,  value: '6+',      label: 'Projets',
    color: 'text-purple-400',
    grad: 'from-purple-400 to-pink-400',
    gradRaw: '#c084fc,#f472b6',
  },
  {
    icon: Cpu,    value: 'Edge AI', label: 'Spécialité',
    color: 'text-violet-400',
    grad: 'from-violet-400 to-indigo-400',
    gradRaw: '#a78bfa,#818cf8',
  },
  {
    icon: Coffee, value: '∞',       label: 'Cafés',
    color: 'text-amber-400',
    grad: 'from-amber-400 to-orange-400',
    gradRaw: '#fbbf24,#fb923c',
  },
];

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
          <div
            className="absolute -inset-3 rounded-full blur-lg opacity-0
                       group-hover:opacity-40 transition-opacity duration-400"
            style={{
              background: 'linear-gradient(135deg,#2563eb,#6366f1)',
            }}
          />
          <div
            className="relative p-3.5 rounded-full text-white shadow-2xl
                       transition-shadow duration-300"
            style={{
              background: 'linear-gradient(135deg,#2563eb,#6366f1)',
              boxShadow: '0 8px 32px rgba(99,102,241,0.30)',
            }}
          >
            <motion.div
              animate={reduced ? {} : { y: [0, -3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowUp size={20} />
            </motion.div>
          </div>

          {/* tooltip */}
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap
                       text-white text-xs py-1 px-2.5 rounded-lg
                       opacity-0 group-hover:opacity-100
                       transition-opacity duration-200 pointer-events-none shadow-xl
                       border border-white/[0.07]"
            style={{
              background: 'linear-gradient(145deg,rgba(9,13,30,0.97),rgba(6,7,15,0.99))',
            }}
          >
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
      <StyleInject />

      <footer
        className="relative overflow-hidden"
        style={{
          /*
           * ── ALIGNEMENT Skills.jsx / Contact.jsx ──
           * Transparent en haut → semi-opaque en bas
           * GlobalBackground canvas (fixed) transparaît → cohérence totale
           * Remplace : bg-gray-950 (solide, bloquait le canvas)
           */
          background:
            'linear-gradient(180deg,rgba(2,8,23,0) 0%,rgba(2,8,23,0.55) 40%,rgba(2,8,23,0.85) 100%)',
        }}
      >
        {/*
         * ── Top border accent — gradient CSS ──
         * Remplace : border-t border-gray-800/50 (Tailwind)
         * Identique Contact.jsx top border glow
         */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg,transparent,rgba(99,102,241,0.40),rgba(96,165,250,0.25),transparent)',
          }}
          aria-hidden="true"
        />

        {/*
         * ── Dot grid — aligné Skills.jsx / Contact.jsx ──
         * opacity .038 / 28px (était .02 / 24px)
         */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle,rgba(148,163,184,0.038) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/*
         * ── Vignette — ajoutée (absente avant) ──
         * Identique Skills.jsx / Contact.jsx
         */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 82% 68% at 50% 50%,transparent 38%,rgba(2,8,23,0.52) 100%)',
          }}
        />

        {/*
         * ── Orb A — aligné Skills.jsx / Contact.jsx ──
         * #1e40af,#6d28d9 / 380px / blur-[88px] / opacity-[0.06]
         * + animation ft-orb-drift-a (12s)
         * Remplace : bg-blue-500/4 blur-[60px] w-64 h-64 (trop petit, statique)
         */}
        <div
          className="ft-orb-a absolute -top-32 -left-32 w-[380px] h-[380px]
                     rounded-full blur-[88px] opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#1e40af,#6d28d9)' }}
          aria-hidden="true"
        />

        {/*
         * ── Orb B — aligné Skills.jsx / Contact.jsx ──
         * #7c3aed,#0891b2 / 320px / blur-[88px] / opacity-[0.05]
         * + animation ft-orb-drift-b (15s)
         * Remplace : bg-purple-500/4 blur-[60px] w-64 h-64 (trop petit, statique)
         */}
        <div
          className="ft-orb-b absolute -bottom-32 -right-32 w-[320px] h-[320px]
                     rounded-full blur-[88px] opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#7c3aed,#0891b2)' }}
          aria-hidden="true"
        />

        <div className="container relative mx-auto px-4 md:px-8 py-16 z-10">
          <div className="max-w-6xl mx-auto">

            {/* ── Brand + tagline ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_EXPO }}
              className="text-center mb-14"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                    animation: reduced ? 'none' : 'spin 18s linear infinite',
                  }}
                />
                <h2
                  className="text-4xl md:text-5xl font-black text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg,#60a5fa 0%,#818cf8 35%,#a78bfa 60%,#22d3ee 100%)',
                    backgroundSize: '200% 200%',
                    animation: reduced ? 'none' : 'gradient-x 4s ease infinite',
                  }}
                >
                  Badie Gmati
                </h2>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg,#06b6d4,#3b82f6)',
                    animation: reduced ? 'none' : 'spin 18s linear infinite reverse',
                  }}
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

            {/* ── Stats row ── */}
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
                  className="group relative flex flex-col items-center p-5 rounded-2xl
                             overflow-hidden cursor-default
                             border border-white/[0.058]
                             transition-all duration-300
                             hover:border-indigo-500/[0.18]"
                  style={{
                    /*
                     * ── Aligné Skills StatCard ──
                     * Remplace : bg-gray-800/40 (Tailwind)
                     */
                    background:
                      'linear-gradient(150deg,rgba(11,17,40,0.97),rgba(6,8,18,0.99))',
                    boxShadow:
                      '0 4px 20px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.022)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Top accent — identique StatCard Skills */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.2, duration: 0.72, ease: EASE_EXPO }}
                    style={{ originX: 0.5 }}
                    className={`absolute top-0 left-4 right-4 h-[1.5px] rounded-full
                                bg-gradient-to-r ${s.grad}`}
                  />

                  {/* Corner glow */}
                  <div
                    className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl
                               pointer-events-none opacity-[0.06] group-hover:opacity-[0.16]
                               transition-opacity duration-400"
                    style={{ background: `linear-gradient(135deg,${s.gradRaw})` }}
                  />

                  <s.icon size={20} className={`${s.color} mb-2 relative z-10`} />
                  <span
                    className={`text-2xl font-black bg-gradient-to-r ${s.grad}
                                bg-clip-text text-transparent mb-1 relative z-10`}
                  >
                    {s.value}
                  </span>
                  <span className="text-gray-500 text-xs font-medium relative z-10">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* ── Main grid : socials + nav ── */}
            <div className="grid md:grid-cols-2 gap-10 mb-14">

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.6, ease: EASE_EXPO }}
              >
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.22em] mb-5
                              flex items-center gap-2">
                  <span className="flex-1 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
                  Réseaux & Contact
                  <span className="flex-1 h-px bg-gradient-to-r from-transparent to-violet-500/30" />
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
                        <div
                          className={`absolute -inset-2 bg-gradient-to-br ${s.glow}
                                     rounded-full blur opacity-0 group-hover:opacity-40
                                     transition-opacity duration-400`}
                        />
                        <div
                          className={`relative p-3.5 rounded-full border
                                     text-gray-400 ${s.color}
                                     transition-all duration-300
                                     hover:border-white/[0.12]`}
                          style={{
                            /*
                             * ── Aligné Skills sk-ico / SkillCategory ──
                             * Remplace : bg-gray-800/60 border-gray-700/40
                             */
                            background:
                              'linear-gradient(150deg,rgba(11,17,40,0.97),rgba(6,8,18,0.99))',
                            borderColor: 'rgba(255,255,255,0.058)',
                            backdropFilter: 'blur(12px)',
                          }}
                        >
                          <s.icon size={22} />
                        </div>
                      </motion.a>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {hovSocial === i && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="absolute -top-11 left-1/2 -translate-x-1/2 z-20"
                          >
                            <div
                              className="text-white text-xs py-1.5 px-3 rounded-lg
                                         shadow-xl whitespace-nowrap relative
                                         border border-white/[0.07]"
                              style={{
                                background:
                                  'linear-gradient(145deg,rgba(9,13,30,0.97),rgba(6,7,15,0.99))',
                              }}
                            >
                              {s.tip}
                              <div
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2
                                           w-2 h-2 rotate-45 border-b border-r border-white/[0.07]"
                                style={{
                                  background:
                                    'linear-gradient(145deg,rgba(9,13,30,0.97),rgba(6,7,15,0.99))',
                                }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Nav */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE_EXPO }}
              >
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.22em] mb-5
                              flex items-center gap-2">
                  <span className="flex-1 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
                  Navigation
                  <span className="flex-1 h-px bg-gradient-to-r from-transparent to-violet-500/30" />
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
                      {/* dot — indigo au hover (= palette GlobalBackground) */}
                      <div
                        className="w-1 h-1 rounded-full transition-colors duration-200"
                        style={{
                          background: 'rgba(99,102,241,0.35)',
                        }}
                        ref={el => {
                          if (!el) return;
                          const a = el.closest('a');
                          if (!a || a._ft) return;
                          a._ft = true;
                          a.addEventListener('mouseenter', () => {
                            el.style.background = '#6366f1';
                          });
                          a.addEventListener('mouseleave', () => {
                            el.style.background = 'rgba(99,102,241,0.35)';
                          });
                        }}
                      />
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Made with ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6, ease: EASE_EXPO }}
              className="flex justify-center mb-10"
            >
              <div
                className="inline-flex items-center gap-2.5 px-5 py-2.5
                           rounded-full text-sm border border-white/[0.058]"
                style={{
                  background:
                    'linear-gradient(150deg,rgba(11,17,40,0.97),rgba(6,8,18,0.99))',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.32)',
                }}
              >
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
                  <Code size={16} className="text-indigo-400" />
                </motion.div>
                <span className="text-gray-400">par</span>
                <span
                  className="font-bold text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg,#60a5fa,#818cf8,#a78bfa)',
                  }}
                >
                  Badie Gmati
                </span>
              </div>
            </motion.div>

            {/* ── Bottom bar ── */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div
                className="flex flex-col md:flex-row justify-between items-center gap-3
                           text-xs text-gray-600"
              >
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

        {/* Corner icons décoratifs */}
        <div className="absolute bottom-5 left-5 opacity-[0.06] pointer-events-none">
          <Terminal size={36} className="text-indigo-400" />
        </div>
        <div className="absolute bottom-5 right-5 opacity-[0.06] pointer-events-none">
          <Rocket size={36} className="text-violet-400" />
        </div>
      </footer>

      <ScrollTopBtn reduced={reduced} />
    </>
  );
}