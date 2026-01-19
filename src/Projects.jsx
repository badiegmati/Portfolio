import React, { useState } from 'react';
import { 
  ExternalLink, Github, Code, Database, Globe, 
  GamepadIcon, Brain, Cpu, Download, Sparkles, 
  Zap, Rocket, Terminal, Layers, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from './assets/image1.png';
import image3 from './assets/image4.png';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [showTicTacToeModal, setShowTicTacToeModal] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Projet de Fin d'Année",
      description: "Projet académique complet réalisé en fin de cycle, démontrant l'intégration de multiples technologies et concepts appris en génie logiciel.",
      detailedDescription: "Ce projet représente l'aboutissement de mon parcours académique, intégrant des concepts avancés de développement web, gestion de base de données et architecture logicielle.",
      technologies: ['HTML/Tailwind CSS', 'React', 'MongoDB', 'JavaScript', 'Node.js', 'Express'],
      icon: Globe,
      gradient: 'from-blue-500 via-cyan-500 to-purple-600',
      accentColor: 'text-blue-400',
      demoUrl: 'https://badiegmati.github.io/Chi5a/',
      code: 'https://github.com/badiegmati/Chi5a',
      features: ['Responsive Design', 'REST API', 'Authentication', 'Real-time Updates'],
      status: 'Complet'
    },
    {
      id: 2,
      title: '🎮 Tic-Tac-Toe AI - Jeu Python',
      description: 'Jeu de morpion avec intelligence artificielle avancée. Interface Kivy professionnelle avec 3 niveaux de difficulté et algorithme Minimax.',
      detailedDescription: 'Un projet Python complet mettant en œuvre des algorithmes d\'IA avancés avec une interface utilisateur moderne développée avec Kivy.',
      technologies: ['Python', 'Kivy', 'IA Minimax', 'Algorithmes', 'OOP', 'AI/ML'],
      icon: GamepadIcon,
      gradient: 'from-green-500 via-emerald-500 to-cyan-600',
      accentColor: 'text-green-400',
      code: 'https://github.com/badiegmati/TicTacToe-AI',
      isPythonGame: true,
      features: [
        'Interface Kivy moderne',
        '3 niveaux d\'IA (Facile à Très Difficile)',
        'Algorithme Minimax optimisé',
        'Système de score persistant',
        'Choix symbole X/O',
        'Animation fluide'
      ],
      status: 'Actif'
    },
    {
      id: 3,
      title: 'Application Mobile Angular',
      description: 'Application mobile cross-platform développée en Angular avec fonctionnalités avancées et design responsive.',
      detailedDescription: 'Développement d\'une application mobile complète avec Angular, mettant l\'accent sur l\'expérience utilisateur et les performances.',
      technologies: ['Angular', 'TypeScript', 'CSS3', 'API REST', 'RxJS', 'NgRx'],
      icon: Layers,
      gradient: 'from-purple-500 via-pink-500 to-rose-600',
      accentColor: 'text-purple-400',
      features: ['PWA', 'Offline Support', 'Push Notifications', 'Material Design'],
      status: 'En développement'
    },
    {
      id: 4,
      title: 'Plateforme Web Python',
      description: 'Solution web complète en Python avec intégration MongoDB pour l\'analyse et visualisation de données.',
      detailedDescription: 'Plateforme d\'analyse de données avec visualisation interactive et traitement en temps réel.',
      technologies: ['Python', 'MongoDB', 'Flask', 'HTML/CSS', 'D3.js', 'Pandas'],
      icon: Database,
      gradient: 'from-orange-500 via-red-500 to-amber-600',
      accentColor: 'text-orange-400',
      features: ['Dashboard interactif', 'Analyse en temps réel', 'Export de données', 'Visualisations'],
      status: 'Complet'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -15,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const techTagVariants = {
    hover: {
      scale: 1.1,
      y: -2,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  const TicTacToeModal = () => (
    <AnimatePresence>
      {showTicTacToeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          onClick={() => setShowTicTacToeModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 p-6 bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-lg border-b border-emerald-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                    <GamepadIcon className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    🎮 Tic-Tac-Toe AI - Démonstration
                  </h3>
                </div>
                <button
                  onClick={() => setShowTicTacToeModal(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span className="text-gray-400 hover:text-white text-xl">×</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 text-lg mb-8 text-center"
              >
                Ce jeu Python nécessite une installation locale. Voici comment le tester :
              </motion.p>

              {/* Images Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative overflow-hidden rounded-xl border border-gray-700">
                    <img 
                      src={image1} 
                      alt="Interface du jeu"
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-gray-200 font-medium">Interface du jeu</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative overflow-hidden rounded-xl border border-gray-700">
                    <img 
                      src={image3} 
                      alt="Victoire"
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-gray-200 font-medium">Écran de victoire</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Code Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="text-green-400" size={20} />
                  <span className="text-white font-medium">Installation</span>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                    <code>
{`# Cloner le repository
git clone https://github.com/badiegmati/TicTacToe-AI.git

# Accéder au dossier
cd TicTacToe-AI

# Installer les dépendances
pip install kivy

# Lancer le jeu
python main.py`}
                    </code>
                  </pre>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="text-yellow-400" size={20} />
                  <span className="text-white font-medium">Fonctionnalités Principales</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projects[1].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="https://github.com/badiegmati/TicTacToe-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Github size={20} />
                  <span>Voir le Code Source</span>
                </a>
                <a
                  href="https://github.com/badiegmati/TicTacToe-AI/archive/refs/heads/main.zip"
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Download size={20} />
                  <span>Télécharger le Projet</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-blue-400" size={32} />
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Mes Projets
              </span>
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Rocket className="text-purple-400" size={32} />
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
          >
            Une sélection de projets qui démontrent mes compétences en développement et ma passion pour l'innovation
          </motion.p>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Card Background Glow */}
              <div className={`absolute -inset-2 bg-gradient-to-br ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden shadow-2xl">
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Complet' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'Actif' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${project.gradient} shadow-lg`}
                    >
                      <project.icon className="text-white" size={28} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400">{project.description}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        variants={techTagVariants}
                        whileHover="hover"
                        className="px-3 py-1.5 bg-gray-800/50 text-gray-300 rounded-full text-sm font-medium backdrop-blur-sm border border-gray-700/50"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className={project.accentColor} size={18} />
                      <span className="text-gray-300 font-medium">Fonctionnalités</span>
                    </div>
                    <ul className="space-y-2">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2 text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 group/btn"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </motion.a>
                    
                    {project.isPythonGame ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowTicTacToeModal(true)}
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl transition-all duration-300"
                      >
                        <Cpu size={18} />
                        <span>Voir Démo</span>
                      </motion.button>
                    ) : project.demoUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all duration-300"
                      >
                        <Eye size={18} />
                        <span>Démo Live</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <TicTacToeModal />
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

export default Projects;