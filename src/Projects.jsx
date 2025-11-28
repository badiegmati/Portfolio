import React from 'react';
import { ExternalLink, Github, Code, Database, Globe } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Projet de Fin d'Année",
      description: "Projet académique complet réalisé en fin de cycle, démontrant l'intégration de multiples technologies et concepts appris.",
      technologies: ['HTML/CSS', 'PHP', 'MySQL', 'JavaScript'],
      icon: Globe,
      gradient: 'from-blue-500 to-purple-600',
      demoUrl: 'https://badiegmati.github.io/projet_FAC/'
    },
    {
      title: 'Système de Gestion de Base de Données',
      description: 'Application desktop Java pour la gestion optimisée des données avec interface intuitive et requêtes SQL avancées.',
      technologies: ['Java', 'SQL', 'Oracle'],
      icon: Database,
      gradient: 'from-green-500 to-blue-500'
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
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 transform hover:scale-105">
                    <Github size={18} />
                    <span>Code</span>
                  </button>
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300 transform hover:scale-105"
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