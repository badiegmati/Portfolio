import React, { useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Phone } from 'lucide-react';
import logo from './logo1.png'; 
export default function Hero() {
  const particlesRef = useRef(null);

  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      
      particlesRef.current.appendChild(particle);
      
      setTimeout(() => {
        if (particlesRef.current && particlesRef.current.contains(particle)) {
          particlesRef.current.removeChild(particle);
        }
      }, 5000);
    };

    const interval = setInterval(createParticle, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="transform hover:scale-105 transition-transform duration-500">
          {/* Profile Image Placeholder */}
          <div className="mx-auto mb-8 w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 p-1 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-6xl font-bold text-white">
              <img src={logo} alt="Profile" className="w-full h-full rounded-full object-cover" /> 
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            Badie Gmati
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-8 space-y-2">
            <p className="transform hover:scale-105 transition-transform duration-300">
              Étudiant en Informatique
            </p>
            <p className="text-lg text-gray-400 transform hover:scale-105 transition-transform duration-300">
              Passionné par le Génie Logiciel & Sciences Informatiques
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            {[
              { icon: Github, href: 'https://github.com/badiegmati', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/badie-gmati-3168b535b/', label: 'LinkedIn' },
              { icon: Phone, href: '#contact', label: 'Phone' },
              { icon: Mail, href: '#contact', label: 'Email' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="p-4 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12 group"
                aria-label={social.label}
              >
                <social.icon size={24} className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
          >
            Découvrir mon parcours
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </div>
    </section>
  );
}