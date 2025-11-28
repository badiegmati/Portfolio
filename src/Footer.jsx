import React from 'react';
import { Heart, Github, Linkedin, Mail, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Brand */}
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
              Badie Gmati
            </div>
            <p className="text-gray-400">
              Étudiant en Informatique passionné par l'innovation technologique
            </p>
          </div>

          <div className="flex justify-center items-center space-x-2 text-gray-400 mt-6">
            <span>Conçu avec</span>
            <Heart className="text-red-500" size={16} />
            <span>et</span>
            <Code className="text-red-500" size={16} />
            <span>par Badie Gmati</span>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm text-center">
              © {currentYear} Badie Gmati. Tous droits réservés.
            </p>
          </div>

          {/* Back to top button */}
          <div className="text-center mt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Retour en haut
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
