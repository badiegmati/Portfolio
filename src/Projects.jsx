import React from 'react';
import { ExternalLink, Github, Code, Database, Globe, GamepadIcon, Brain, Cpu, Download  } from 'lucide-react';
import image1 from './assets/image1.png';
import image3 from './assets/image4.png';
const Projects = () => {
  const projects = [
    {
      title: "Projet de Fin d'Année",
      description: "Projet académique complet réalisé en fin de cycle, démontrant l'intégration de multiples technologies et concepts appris.",
      technologies: ['HTML/Tailwind CSS', 'React', 'MongoDB', 'JavaScript'],
      icon: Globe,
      gradient: 'from-blue-500 to-purple-600',
      demoUrl: 'https://badiegmati.github.io/Chi5a/',
      code:'https://github.com/badiegmati/Chi5a'
    },
    {
      title: '🎮 Tic-Tac-Toe AI - Jeu Python',
      description: 'Jeu de morpion avec intelligence artificielle avancée. Interface Kivy professionnelle avec 3 niveaux de difficulté et algorithme Minimax.',
      technologies: ['Python', 'Kivy', 'IA Minimax', 'Algorithmes', 'OOP'],
      icon: GamepadIcon,
      gradient: 'from-green-500 to-emerald-600',
      demoUrl: '#tic-tac-toe-demo', // Ancre vers la section démo
      code: 'https://github.com/badiegmati/TicTacToe-AI',
      isPythonGame: true,
      pythonFeatures: [
        'Interface Kivy moderne',
        '3 niveaux d\'IA (Facile à Très Difficile)',
        'Algorithme Minimax optimisé',
        'Système de score persistant',
        'Choix symbole X/O'
      ]
    },
    {
      title: 'Application Mobile Angular',
      description: 'Application mobile cross-platform développée en Angular avec fonctionnalités avancées et design responsive.',
      technologies: ['Angular', 'TypeScript', 'CSS3', 'API REST'],
      icon: Code,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Plateforme Web Python',
      description: 'Solution web complète en Python avec intégration MongoDB pour l\'analyse et visualisation de données.',
      technologies: ['Python', 'MongoDB', 'Flask', 'HTML/CSS'],
      icon: Code,
      gradient: 'from-orange-500 to-red-500'
    }
  ];
  
    const showTicTacToeDemo = () => {
      // Créer une modale
      const modal = document.createElement('div');
      modal.id = 'tic-tac-toe-modal';
      modal.innerHTML = `
        <div style="
          position: fixed; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%; 
          background: rgba(0,0,0,0.9); 
          z-index: 9999; 
          display: flex; 
          justify-content: center; 
          align-items: center;
          padding: 20px;
        ">
          <div style="
            background: #1f2937; 
            padding: 2rem; 
            border-radius: 1rem; 
            max-width: 900px; 
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
          ">
            
            <h3 style="color: white; font-size: 1.8rem; margin-bottom: 1rem; text-align: center;">
              🎮 Tic-Tac-Toe AI - Démonstration
            </h3>
            
            <p style="color: #9ca3af; margin-bottom: 1.5rem; text-align: center;">
              Ce jeu Python nécessite une installation locale. Voici comment le tester :
            </p>
            
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 1rem;
              margin: 2rem 0;
            ">
              <div style="text-align: center;">
                <img 
                  src="${image1}" 
                  alt="Interface du jeu"
                  style="
                    width: 100%; 
                    max-width: 400px;
                    border-radius: 10px; 
                    border: 2px solid #334155;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                  "
                />
                <p style="color: #9ca3af; margin-top: 0.5rem; font-size: 0.9rem;">
                  Interface du jeu
                </p>
              </div>
              
              <div style="text-align: center;">
                <img 
                  src="${image3}" 
                  alt="Victoire"
                  style="
                    width: 100%; 
                    max-width: 400px;
                    border-radius: 10px; 
                    border: 2px solid #334155;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                  "
                />
                <p style="color: #9ca3af; margin-top: 0.5rem; font-size: 0.9rem;">
                  Écran de victoire
                </p>
              </div>
            </div>
            <div style="background: #111827; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
            <code style="color: #10b981; font-family: monospace;">
              # Installation :<br>
              git clone https://github.com/badiegmati/TicTacToe-AI.git<br>
              cd TicTacToe-AI<br>
              pip install kivy<br>
              python main.py
            </code>
          </div>
          <button onclick="document.getElementById('tic-tac-toe-modal').remove()" style="background: #ef4444; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; cursor: pointer;">
             Fermer
          </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
  };

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Projets Réalisés
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-700 transform hover:scale-105 transition-all duration-500"
              style={{
                transform: `perspective(1000px) rotateY(${index % 2 === 0 ? '3deg' : '-3deg'}) rotateX(2deg)`,
              }}
            >
              {/* Card Header */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
              
              <div className="p-8">
                {/* Project Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${project.gradient} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <project.icon size={32} className="text-white" />
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium transform hover:scale-110 transition-transform duration-300 hover:bg-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 transform hover:scale-105"
                  >
                    <Github size={18} />
                    <span>Code</span>
                  </a>
                  
                  {project.isPythonGame ? (
                    <button
                      onClick={showTicTacToeDemo}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-300 transform hover:scale-105"
                    >
                      <Cpu size={18} />
                      <span>Voir Démo</span>
                    </button>
                  ) : project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300 transform hover:scale-105"
                    >
                      <ExternalLink size={18} />
                      <span>Demo</span>
                    </a>
                  ) : (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300 transform hover:scale-105">
                      <ExternalLink size={18} />
                      <span>Demo</span>
                    </button>
                  )}
                  {project.isPythonGame && (
                    <a
                      href="https://github.com/badiegmati/TicTacToe-AI/archive/refs/heads/main.zip"
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 transform hover:scale-105"
                    >
                      <Download size={18} />
                      <span>Télécharger</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Projects;