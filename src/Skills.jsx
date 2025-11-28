import React from 'react';
import { Code, Database, Wrench, Smartphone } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Langages de Programmation',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Java', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'SQL', level: 80 },
        { name: 'Php', level: 75 },
        { name: 'C & C++', level: 70 }
      ]
    },
    {
      title: 'Frameworks & Librairies',
      icon: Smartphone,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'React.js', level: 85 },
        { name: 'Node.js', level: 75 },
        { name: 'Angular', level: 75 },
        { name: 'Express', level: 60 },
      ]
    },
    {
      title: 'Bases de Données',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'MySQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'OracleDB', level: 80 }
      ]
    },
    {
      title: 'Outils & Technologies',
      icon: Wrench,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Visual Studio Code', level: 95 },
        { name: 'Git', level: 85 },
        { name: 'Oracle', level: 75 },
        { name: 'WordPress', level: 70 },
        { name: 'Linux', level: 60 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Compétences Techniques
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-all duration-500 group"
              style={{
                transform: `perspective(1000px) rotateY(${categoryIndex % 2 === 0 ? '5deg' : '-5deg'})`,
              }}
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-full bg-gradient-to-r ${category.color} mr-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group/skill">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium group-hover/skill:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full transform origin-left transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${skill.level}%`,
                          animation: `slideIn 1s ease-out ${skillIndex * 0.1}s forwards`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;