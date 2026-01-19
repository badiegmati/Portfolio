import React, { useEffect, useRef, useState } from 'react';
import { 
  ChevronDown, Github, Linkedin, Mail, Phone, 
  Download, Sparkles, Cpu, Code2, Terminal,
  ArrowRight, FileText, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './logo1.png';

export default function Hero() {
  const particlesRef = useRef(null);
  const textRef = useRef(null);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particleCount, setParticleCount] = useState(0);

  // Télécharger le CV
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = 'src/images/cv badie gmati.pdf'; // Chemin vers votre fichier PDF
    link.download = 'CV-Badie-Gmati.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current || particleCount > 50) return;
      
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 4 + 3;
      
      particle.className = 'absolute rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.background = `radial-gradient(circle, 
        rgba(59, 130, 246, ${Math.random() * 0.5 + 0.3}) 0%, 
        rgba(147, 51, 234, ${Math.random() * 0.3 + 0.2}) 100%)`;
      particle.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
      particle.style.opacity = '0';
      const animation = particle.animate([
        { 
          opacity: 0,
          transform: 'translateY(0px) scale(0)',
          boxShadow: '0 0 0px rgba(59, 130, 246, 0)'
        },
        { 
          opacity: 1,
          transform: `translateY(${Math.random() * -100 - 50}px) scale(1)`,
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)'
        },
        { 
          opacity: 0,
          transform: `translateY(${Math.random() * -200 - 150}px) scale(0.5)`,
          boxShadow: '0 0 0px rgba(59, 130, 246, 0)'
        }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });
      
      particlesRef.current.appendChild(particle);
      setParticleCount(prev => prev + 1);
      
      animation.onfinish = () => {
        if (particlesRef.current && particlesRef.current.contains(particle)) {
          particlesRef.current.removeChild(particle);
          setParticleCount(prev => prev - 1);
        }
      };
    };

    const interval = setInterval(createParticle, 100);
    return () => clearInterval(interval);
  }, [particleCount]);

  // Animation de texte
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsTextVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const floatingElements = [
    { icon: Code2, text: 'Full-Stack', color: 'text-blue-400' },
    { icon: Cpu, text: 'AI/ML', color: 'text-purple-400' },
    { icon: Terminal, text: 'DevOps', color: 'text-cyan-400' },
  ];

  return (
    <section id="home" className="mt-15 min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black ">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Elements */}
      <AnimatePresence>
        {floatingElements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0 }}
            animate={{ 
              opacity: 1, 
              y: [0, -30, 0],
              scale: 1,
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{
              delay: index * 0.5,
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className={`absolute hidden lg:flex items-center gap-2 p-3 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-700/50 ${item.color}`}
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + index * 15}%`
            }}
          >
            <item.icon size={16} />
            <span className="text-sm font-medium">{item.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-16"
          >
            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 180 }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <img 
                  src={logo} 
                  alt="Badie Gmati" 
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Online Status */}
              <div className="absolute bottom-6 right-6 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-gray-900 shadow-lg" />
            </motion.div>

            {/* Text Content */}
            <motion.div 
              ref={textRef}
              initial={{ opacity: 0, x: 50 }}
              animate={isTextVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
      

              {/* Main Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient"
              >
                Badie Gmati
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 mb-8"
              >
                <p className="text-xl md:text-2xl text-gray-300">
                  Stagiaire PFE en <span className="text-blue-400 font-semibold">Développement Logiciel</span>
                </p>
                <p className="text-lg text-gray-400 max-w-2xl">
                  Passionné par le <span className="text-purple-400">Génie Logiciel</span> & 
                  les <span className="text-cyan-400">Sciences Informatiques</span>
                </p>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="text-blue-400" size={18} />
                  <span>badiegmati11@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="text-green-400" size={18} />
                  <span>+216 58 294 838</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16"
          >
            {/* Download CV Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={downloadCV}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
            >
              <motion.div
                animate={isHovering ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Download className="text-white" size={20} />
              </motion.div>
              <span>Télécharger mon CV</span>
              <motion.div
                animate={isHovering ? { x: 5 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={20} />
              </motion.div>
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.button>

            {/* Explore Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-gray-300 rounded-xl font-semibold text-lg border border-gray-700/50 transition-all duration-300 group"
            >
              <User size={20} />
              <span>Découvrir mon parcours</span>
              <ChevronDown className="group-hover:translate-y-1 transition-transform duration-300" size={20} />
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center items-center gap-8 mb-12"
          >
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/badiegmati"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-gray-700/50 transition-all duration-300 group relative"
              aria-label="GitHub"
            >
              <Github size={24} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                GitHub
              </span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/badie-gmati-3168b535b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-gray-700/50 transition-all duration-300 group relative"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                LinkedIn
              </span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="#contact"
              className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-gray-700/50 transition-all duration-300 group relative"
              aria-label="Contact"
            >
              <Mail size={24} className="text-gray-300 group-hover:text-green-400 transition-colors duration-300" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Contact
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400">Défiler</span>
            <ChevronDown size={32} className="text-gray-500 animate-bounce" />
          </div>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}