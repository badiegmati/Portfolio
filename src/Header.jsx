import { useState, useEffect, useRef } from 'react';
import { 
  Home, User, Code, Briefcase, Mail, Menu, X, 
  Sparkles, ChevronDown, Globe, Terminal, Cpu 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);
  const headerRef = useRef(null);

  const navItems = [
    { icon: Home, label: 'Accueil', href: '#home', color: 'text-blue-400' },
    { icon: User, label: 'À propos', href: '#about', color: 'text-purple-400' },
    { icon: Code, label: 'Compétences', href: '#skills', color: 'text-cyan-400' },
    { icon: Briefcase, label: 'Projets', href: '#projects', color: 'text-green-400' },
    { icon: Mail, label: 'Contact', href: '#contact', color: 'text-pink-400' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      
      // Active section detection
      const sections = navItems.map(item => item.href.substring(1));
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (href, label) => {
    setIsMenuOpen(false);
    const element = document.getElementById(href.substring(1));
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const mobileItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-gray-900/90 backdrop-blur-xl shadow-2xl shadow-black/30 border-b border-gray-800/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        <nav className="container relative mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <a 
                href="#home"
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 backdrop-blur-sm"
              >
                <Sparkles className="text-blue-400" size={20} />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  BG
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                />
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center space-x-1"
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                    className="relative"
                  >
                    <motion.div
                      animate={isActive ? { 
                        scale: 1,
                        opacity: 1
                      } : {
                        scale: 0.8,
                        opacity: 0
                      }}
                      className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20"
                    />
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href, item.label);
                      }}
                      className={`relative flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50' 
                          : 'hover:bg-gray-800/50'
                      }`}
                    >
                      <item.icon 
                        size={18} 
                        className={`transition-colors duration-300 ${isActive ? item.color : 'text-gray-400'}`} 
                      />
                      <span className={`font-medium transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                      }`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        />
                      )}
                    </a>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative p-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="text-white" size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="text-white" size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Menu Button Indicator */}
              {!isMenuOpen && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 to-gray-800 border-l border-gray-700/50 shadow-2xl"
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Sparkles className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Navigation</h3>
                      <p className="text-sm text-gray-400">Menu principal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-6 space-y-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.a
                      key={index}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href, item.label);
                      }}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20' 
                          : 'hover:bg-gray-800/50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        isActive 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                          : 'bg-gray-800'
                      }`}>
                        <item.icon 
                          size={20} 
                          className={isActive ? 'text-white' : 'text-gray-400'} 
                        />
                      </div>
                      <div className="flex-1">
                        <span className={`font-medium ${
                          isActive ? 'text-white' : 'text-gray-300'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                      {isActive && (
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ChevronDown className="text-blue-400 rotate-90" size={16} />
                        </motion.div>
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollY / (document.body.scrollHeight - window.innerHeight) }}
        transition={{ duration: 0.1 }}
      />

      <motion.a
        href="#contact"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollY > 300 ? 1 : 0,
          scale: scrollY > 300 ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 z-40 md:hidden"
      >
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          <button className="relative p-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/25 transition-all duration-300">
            <Mail size={24} />
          </button>
        </div>
      </motion.a>

      <style jsx>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
}