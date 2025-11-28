import React from 'react';
import { BookOpen, Globe, Code2 } from 'lucide-react';

const About = () => {
  const languages = ['Français', 'Anglais', 'Arabe'];
  const interests = [
    'Développement Web & Mobile',
    'Intelligence Artificielle',
    'Architecture Logicielle',
    'Bases de Données',
    'Gestion de Projets'
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            À Propos de Moi
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <BookOpen className="mr-3 text-blue-400" size={28} />
                Mon Parcours
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Étudiant passionné par l’informatique, je me spécialise dans le génie logiciel et les sciences informatiques
                 à l’Institut Supérieur d’Informatique et de Gestion de Kairouan .
                Mon objectif est de créer des solutions innovantes qui résolvent des problèmes réels tout en continuant 
                à apprendre les dernières technologies.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Globe className="mr-3 text-green-400" size={28} />
                Langues
              </h3>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full text-sm font-medium transform hover:scale-110 transition-transform duration-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Code2 className="mr-3 text-purple-400" size={28} />
              Centres d'Intérêt
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-700/50 rounded-lg border-l-4 border-purple-500 transform hover:translate-x-2 transition-transform duration-300 group"
                >
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                    {interest}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;