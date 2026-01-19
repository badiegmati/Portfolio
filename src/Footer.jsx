import React, { useState, useEffect } from 'react';
import { 
  Heart, Github, Linkedin, Mail, Code, 
  ArrowUp, Sparkles, Cpu, Terminal, Zap,
  Globe, Coffee, Rocket, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heartBeat, setHeartBeat] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/badiegmati',
      label: 'GitHub',
      color: 'text-gray-300',
      hoverColor: 'text-white',
      gradient: 'from-gray-800 to-gray-900',
      tooltip: 'Voir mes projets'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/badie-gmati-3168b535b/',
      label: 'LinkedIn',
      color: 'text-blue-400',
      hoverColor: 'text-blue-300',
      gradient: 'from-blue-900/30 to-blue-800/30',
      tooltip: 'Connectons-nous'
    },
    {
      icon: Mail,
      href: 'mailto:badiegmati11@gmail.com',
      label: 'Email',
      color: 'text-red-400',
      hoverColor: 'text-red-300',
      gradient: 'from-red-900/30 to-red-800/30',
      tooltip: 'Envoyer un email'
    },
    {
      icon: Terminal,
      href: '#projects',
      label: 'Projets',
      color: 'text-green-400',
      hoverColor: 'text-green-300',
      gradient: 'from-green-900/30 to-green-800/30',
      tooltip: 'Voir mes réalisations'
    }
  ];

  const quickLinks = [
    { label: 'Accueil', href: '#home' },
    { label: 'À propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const stats = [
    { icon: Code, value: '25+', label: 'Technologies', color: 'text-blue-400' },
    { icon: Globe, value: '4', label: 'Projets', color: 'text-purple-400' },
    { icon: Cpu, value: 'Full-Stack', label: 'Expertise', color: 'text-green-400' },
    { icon: Coffee, value: '∞', label: 'Cafés', color: 'text-amber-400' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const heartBeatAnimation = {
    scale: [1, 1.3, 1],
    transition: { duration: 0.5 }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-t border-gray-800/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      
      <div className="container relative mx-auto px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Brand */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  Badie Gmati
                </h2>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                />
              </div>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Étudiant en Informatique passionné par l'innovation technologique et le développement full-stack
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50"
                >
                  <stat.icon className={`inline-block mb-2 ${stat.color}`} size={24} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center gap-4 mb-8"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="relative group"
                  aria-label={social.label}
                >
                  <div className={`absolute -inset-2 bg-gradient-to-br ${social.gradient} rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  <div className="relative p-4 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <social.icon 
                      size={24} 
                      className={`transition-colors duration-300 ${social.color} group-hover:${social.hoverColor}`} 
                    />
                  </div>
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredSocial === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      >
                        <div className="bg-gray-900 text-white text-sm py-1 px-3 rounded-lg border border-gray-700 shadow-lg">
                          {social.tooltip}
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-b border-r border-gray-700" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-6 mb-8"
            >
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Middle Section - Made with */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800/50">
              <span className="text-gray-400">Conçu avec</span>
              
              <motion.div
                animate={heartBeat ? heartBeatAnimation : {}}
                onMouseEnter={() => setHeartBeat(true)}
                onMouseLeave={() => setHeartBeat(false)}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-30" />
                <Heart className="text-red-500" size={20} />
              </motion.div>
              
              <span className="text-gray-400">et</span>
              
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-0 group-hover:opacity-30" />
                <Code className="text-blue-400" size={20} />
              </motion.div>
              
              <span className="text-gray-400">par</span>
              
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-white font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              >
                Badie Gmati
              </motion.span>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-gray-800/50"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-gray-500 text-sm">
                © {currentYear} Badie Gmati. Tous droits réservés.
              </div>

              {/* Credits */}
              <div className="text-gray-500 text-sm text-center">
                <span>Inspiré par les dernières tendances du design web</span>
                <span className="mx-2">•</span>
                <span>Optimisé pour les performances</span>
              </div>

              {/* Version */}
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Zap size={14} className="text-yellow-400" />
                <span>v2.0 • React • Tailwind CSS • Framer Motion</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative flex flex-col items-center">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-2xl shadow-blue-500/25 group-hover:shadow-purple-500/25 transition-all duration-300">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowUp size={24} />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -top-8 bg-gray-900 text-white text-xs py-1 px-2 rounded border border-gray-700 whitespace-nowrap"
              >
                Retour en haut
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <div className="absolute bottom-4 left-4 opacity-10">
        <Terminal size={40} className="text-blue-400" />
      </div>
      <div className="absolute bottom-4 right-4 opacity-10">
        <Rocket size={40} className="text-purple-400" />
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;