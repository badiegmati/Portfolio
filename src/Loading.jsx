// ─── Loading.jsx ────────────────────────────────────────────────────
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Cpu, Code2, Sparkles, Zap } from 'lucide-react';

/* ─────────────────────── constants ─────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1];

const STEPS = [
  { label: 'Initialisation…',    icon: Cpu,      color: '#3b82f6', pct: 20  },
  { label: 'Chargement stack…',  icon: Code2,    color: '#8b5cf6', pct: 50  },
  { label: 'Optimisation IA…',   icon: Sparkles, color: '#06b6d4', pct: 75  },
  { label: 'Prêt !',             icon: Zap,      color: '#10b981', pct: 100 },
];

/* ─────────────────────── OrbitRing ─────────────────────── */
function OrbitRing({ radius, duration, dotCount, color, reduced }) {
  return (
    <motion.div
      animate={reduced ? {} : { rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0"
      style={{
        width: radius * 2, height: radius * 2,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (i / dotCount) * 360;
        return (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 8px ${color}80`,
              top: '50%', left: '50%',
              transform: `rotate(${angle}deg) translateX(${radius}px) translateY(-50%)`,
              opacity: 0.4 + (i / dotCount) * 0.6,
            }}
          />
        );
      })}
    </motion.div>
  );
}

/* ─────────────────────── GlowPulse ─────────────────────── */
function GlowPulse({ reduced }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={reduced ? {} : {
            scale: [1, 2.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeOut',
          }}
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────── CodeRain ──────────────────────── */
function CodeRain({ reduced }) {
  const chars = ['0','1','<','>','{','}','/',';','=','→','∞','λ','π'];
  const drops = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    char: chars[Math.floor(Math.random() * chars.length)],
    left: `${(i / 12) * 100 + Math.random() * 6}%`,
    delay: Math.random() * 3,
    dur: Math.random() * 2 + 2,
    color: ['#3b82f6','#8b5cf6','#06b6d4'][i % 3],
  }));

  if (reduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {drops.map(d => (
        <motion.div
          key={d.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: '100vh', opacity: [0, 0.8, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'linear' }}
          className="absolute text-xs font-mono font-bold"
          style={{ left: d.left, color: d.color }}
        >
          {d.char}
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────── Loading (main) ────────────────── */
export default function Loading() {
  const reduced      = useReducedMotion();
  const [step,   setStep]   = useState(0);
  const [pct,    setPct]    = useState(0);
  const [done,   setDone]   = useState(false);
  const stepRef  = useRef(0);

  /* progress simulation */
  useEffect(() => {
    const target = STEPS[step]?.pct ?? 100;

    const id = setInterval(() => {
      setPct(cur => {
        const next = cur + Math.random() * 3 + 1;
        if (next >= target) {
          clearInterval(id);
          if (step < STEPS.length - 1) {
            setTimeout(() => setStep(s => s + 1), 350);
          } else {
            setTimeout(() => setDone(true), 600);
          }
          return target;
        }
        return next;
      });
    }, 40);

    return () => clearInterval(id);
  }, [step]);

  const cur      = STEPS[step] ?? STEPS[STEPS.length - 1];
  const StepIcon = cur.icon;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center
                     bg-gray-950 overflow-hidden"
        >
          {/* ── background layers ── */}
          <CodeRain reduced={reduced} />
          <GlowPulse reduced={reduced} />

          {/* dot grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* corner orbs */}
          {[
            { cls: '-top-20 -left-20', from: '#2563eb', to: '#7c3aed' },
            { cls: '-bottom-20 -right-20', from: '#7c3aed', to: '#db2777' },
          ].map((o, i) => (
            <motion.div
              key={i}
              animate={reduced ? {} : {
                scale: [1, 1.15, 1],
                opacity: [0.08, 0.12, 0.08],
              }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute ${o.cls} w-80 h-80 rounded-full blur-[80px] pointer-events-none`}
              style={{ background: `radial-gradient(circle, ${o.from}, ${o.to})` }}
            />
          ))}

          {/* ── main orb ── */}
          <div className="relative flex items-center justify-center mb-12">
            {/* orbit rings */}
            <div className="relative w-72 h-72">
              <OrbitRing radius={110} duration={12}  dotCount={8} color="#3b82f6" reduced={reduced} />
              <OrbitRing radius={88}  duration={8}   dotCount={6} color="#8b5cf6" reduced={reduced} />
              <OrbitRing radius={66}  duration={5.5} dotCount={4} color="#06b6d4" reduced={reduced} />

              {/* spinning conic ring */}
              <motion.div
                animate={reduced ? {} : { rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, transparent)',
                  opacity: 0.3,
                  filter: 'blur(6px)',
                }}
              />

              {/* counter-spin ring */}
              <motion.div
                animate={reduced ? {} : { rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 rounded-full border border-dashed border-blue-500/25"
              />

              {/* center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  key={step}
                  initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                  animate={{ scale: 1,   opacity: 1, rotate: 0    }}
                  exit={{ scale: 1.5,   opacity: 0, rotate: 180   }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="relative"
                >
                  {/* icon glow */}
                  <div
                    className="absolute -inset-6 rounded-full blur-xl opacity-40"
                    style={{ background: cur.color }}
                  />
                  {/* icon bg */}
                  <div
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${cur.color}33, ${cur.color}11)`,
                      border: `1px solid ${cur.color}40`,
                    }}
                  >
                    <StepIcon size={32} style={{ color: cur.color }} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ── brand ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE_EXPO }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2
                           text-transparent bg-clip-text
                           bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400
                           animate-gradient-x">
              Badie Gmati
            </h1>
            <p className="text-gray-400 text-sm">
              Ingénieur Full-Stack &amp; Développeur IA Embarquée
            </p>
          </motion.div>

          {/* ── progress bar ── */}
          <div className="w-72 md:w-80 mb-5">
            <div className="flex justify-between items-center mb-2">
              {/* step label */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={step}
                  initial={{ opacity: 0, y: 6  }}
                  animate={{ opacity: 1, y: 0  }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-medium"
                  style={{ color: cur.color }}
                >
                  {cur.label}
                </motion.span>
              </AnimatePresence>
              <span className="text-gray-500 text-xs font-mono">
                {Math.round(pct)}%
              </span>
            </div>

            {/* track */}
            <div className="h-1.5 bg-gray-800/80 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, #3b82f6, ${cur.color})`,
                  transition: 'width 0.15s ease',
                }}
              >
                {/* shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent
                                via-white/30 to-transparent animate-shimmer rounded-full" />
              </motion.div>
            </div>

            {/* step dots */}
            <div className="flex justify-between mt-3">
              {STEPS.map((s, i) => (
                <motion.div
                  key={i}
                  animate={i <= step
                    ? { scale: i === step ? 1.2 : 1, opacity: 1 }
                    : { scale: 0.7, opacity: 0.3 }
                  }
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: i <= step ? s.color : '#374151' }}
                />
              ))}
            </div>
          </div>

          {/* ── tech pills ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 max-w-xs"
          >
            {['React','Next.js','Python','Edge AI','Tailwind','Framer'].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.08, ease: EASE_EXPO }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold
                           bg-gray-800/60 border border-gray-700/50 text-gray-400
                           cursor-default select-none"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

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
              100% { transform: translateX(300%);  }
            }
            .animate-shimmer {
              animation: shimmer 2s ease-in-out infinite;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}