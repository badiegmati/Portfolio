import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Globe, Code2, Sparkles, Target, GraduationCap } from 'lucide-react';
import { motion } from "framer-motion";

const About = () => {
  const particlesRef = useRef(null);
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current || particleCount > 30) return;
      
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 4 + 3;
      
      particle.className = 'absolute rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.background = `radial-gradient(circle, 
        rgba(59, 130, 246, ${Math.random() * 0.3 + 0.2}) 0%, 
        rgba(147, 51, 234, ${Math.random() * 0.2 + 0.1}) 100%)`;
      particle.style.boxShadow = '0 0 8px rgba(59, 130, 246, 0.4)';
      particle.style.opacity = '0';
      
      const animation = particle.animate([
        { 
          opacity: 0,
          transform: 'translateY(0px) scale(0)',
          boxShadow: '0 0 0px rgba(59, 130, 246, 0)'
        },
        { 
          opacity: 0.7,
          transform: `translateY(${Math.random() * -80 - 40}px) scale(1)`,
          boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)'
        },
        { 
          opacity: 0,
          transform: `translateY(${Math.random() * -150 - 100}px) scale(0.5)`,
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

    const interval = setInterval(createParticle, 150);
    return () => clearInterval(interval);
  }, [particleCount]);

  const languages = [
    { name: 'Français', level: 'Intermédiaire', color: 'from-blue-500 to-cyan-500' },
    { name: 'Anglais', level: 'Intermédiaire', color: 'from-purple-500 to-pink-500' },
    { name: 'Arabe', level: 'Natif', color: 'from-green-500 to-emerald-500' },
    { name: 'Italien', level: 'Intermédiaire', color: 'from-orange-500 to-red-500' },
  ];
  
  const interests = [
    { 
      title: 'Développement Web & Mobile', 
      icon: '🌐',
      description: 'Applications modernes et responsive'
    },
    { 
      title: 'Intelligence Artificielle', 
      icon: '🤖',
      description: 'Machine Learning et Deep Learning'
    },
    { 
      title: 'Machine Learning', 
      icon: '🧠',
      description: 'Algorithmes prédictifs et analyse de données'
    },
    { 
      title: 'Bases de Données', 
      icon: '🗄️',
      description: 'Architecture et optimisation'
    },
    { 
      title: 'Internet des objets (IoT)', 
      icon: '📡',
      description: 'Systèmes connectés et automatisation'
    },
  ];

  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardHover = {
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      {/* Background Elements */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      
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

      {/* Subtle orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="container relative mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mr-4"
              >
                <Sparkles className="text-blue-400" size={32} />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  À Propos de Moi
                </span>
              </h2>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="ml-4"
              >
                <Target className="text-purple-400" size={32} />
              </motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto mt-6"
            >
              Passionné par la création de solutions innovantes et l'exploration des technologies émergentes
            </motion.p>
            <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "200px" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-10 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"
                      />
          </motion.div>

          {/* Main Content - reste identique */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Left Column */}
            <div className="space-y-12">
              {/* Education Card */}
              <motion.div 
                variants={fadeInUp}
                whileHover="hover"
                variants={cardHover}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 group-hover:border-blue-500/50 transition-all duration-500">
                  <div className="flex items-start mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4">
                      <GraduationCap className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Mon Parcours Académique</h3>
                      <div className="flex items-center text-blue-300">
                        <BookOpen size={18} className="mr-2" />
                        <span className="text-sm">Étudiant en Génie Logiciel</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                      <p className="text-gray-300">
                        Actuellement en spécialisation en <span className="text-blue-300 font-medium">Génie Logiciel et Sciences Informatiques</span> à l'Institut Supérieur d'Informatique et de Gestion de Kairouan
                      </p>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <p className="text-gray-300">
                        Passionné par la création de <span className="text-purple-300 font-medium">solutions innovantes</span> qui résolvent des problèmes complexes tout en adoptant les dernières avancées technologiques
                      </p>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                      <p className="text-gray-300">
                        Objectif : Maîtriser l'<span className="text-green-300 font-medium">architecture logicielle moderne</span> et contribuer à des projets ayant un impact réel
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Languages Card */}
              <motion.div 
                variants={fadeInUp}
                whileHover="hover"
                variants={cardHover}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 group-hover:border-green-500/50 transition-all duration-500">
                  <div className="flex items-center mb-8">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-cyan-600 rounded-xl mr-4">
                      <Globe className="text-white" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Langues Maîtrisées</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {languages.map((lang, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className="group"
                      >
                        <div className={`p-4 bg-gradient-to-br ${lang.color} rounded-xl shadow-lg transform transition-all duration-300 group-hover:shadow-xl`}>
                          <div className="flex justify-between items-center">
                            <span className="text-white font-bold text-lg">{lang.name}</span>
                            <span className="text-white/90 text-sm px-2 py-1 bg-white/20 rounded-full">
                              {lang.level}
                            </span>
                          </div>
                          <div className="mt-2 h-1.5 bg-white/30 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: lang.level === 'Natif' ? '100%' : lang.level === 'Avancé' ? '85%' : '65%' }}
                              transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                              className={`h-full bg-white rounded-full`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Interests */}
            <motion.div 
              variants={fadeInUp}
              whileHover="hover"
              variants={cardHover}
              className="group relative h-full"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 group-hover:border-purple-500/50 transition-all duration-500 h-full">
                <div className="flex items-center mb-10">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mr-4">
                    <Code2 className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Centres d'Intérêt & Spécialisations</h3>
                </div>
                
                <div className="space-y-6">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ x: 10 }}
                      className="group/item relative"
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/0 to-purple-500/10 rounded-xl opacity-0 group-hover/item:opacity-100 transition duration-300" />
                      <div className="relative bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 group-hover/item:border-purple-500/50 transition-all duration-300">
                        <div className="flex items-start">
                          <motion.span 
                            className="text-2xl mr-4"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {interest.icon}
                          </motion.span>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-2 group-hover/item:text-purple-300 transition-colors duration-300">
                              {interest.title}
                            </h4>
                            <p className="text-gray-400 group-hover/item:text-gray-300 transition-colors duration-300">
                              {interest.description}
                            </p>
                          </div>
                          <motion.div
                            className="opacity-0 group-hover/item:opacity-100"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
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
    </section>
  );
};

export default About;