import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Send, User, MessageCircle, 
  Sparkles, Target, Clock, CheckCircle, AlertCircle,
  Globe, Briefcase, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoveredContact, setHoveredContact] = useState(null);

  const contactInfo = [
    {
      id: 1,
      icon: Mail,
      title: 'Email',
      value: 'badiegmati11@gmail.com',
      href: 'mailto:badiegmati11@gmail.com',
      gradient: 'from-blue-500 via-cyan-500 to-blue-600',
      description: 'Réponse sous 24h',
      color: 'text-blue-400'
    },
    {
      id: 2,
      icon: Phone,
      title: 'Téléphone',
      value: '+216 58 294 838',
      href: 'tel:+21658294838',
      gradient: 'from-green-500 via-emerald-500 to-green-600',
      description: 'Disponible de 9h à 18h',
      color: 'text-green-400'
    },
    {
      id: 3,
      icon: MapPin,
      title: 'Localisation',
      value: 'Nabeul, Bouargoub, Tunisie',
      gradient: 'from-purple-500 via-pink-500 to-purple-600',
      description: 'Ouvert au télétravail',
      color: 'text-purple-400'
    }
  ];

  const availability = [
    { day: 'Lun-Ven', time: '9h - 18h', status: 'Disponible' },
    { day: 'Samedi', time: '10h - 14h', status: 'Sur rendez-vous' },
    { day: 'Dimanche', time: 'Repos', status: 'Non disponible' }
  ];

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Envoi en cours...");

    try {
      const formPayload = new FormData();
      formPayload.append("access_key", "9576e73c-52be-44a8-936a-038a1163937a");
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("message", formData.message);
      formPayload.append("from_name", "Portfolio Contact");
      formPayload.append("subject", "Nouveau message depuis votre portfolio");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message envoyé avec succès !");
        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
          setResult("");
        }, 5000);
      } else {
        setResult(`Erreur: ${data.message}`);
        console.error("Erreur Web3Forms:", data);
      }
    } catch (error) {
      setResult("Une erreur réseau est survenue");
      console.error("Erreur fetch:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
    hidden: { y: 30, opacity: 0 },
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

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const inputFocusVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="container relative mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Contact
              </span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
          >
            Discutons de votre projet, opportunité de collaboration ou simplement échangeons autour des technologies
          </motion.p>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.id}
                  variants={itemVariants}
                  whileHover="hover"
                  variants={cardHoverVariants}
                  onMouseEnter={() => setHoveredContact(info.id)}
                  onMouseLeave={() => setHoveredContact(null)}
                  href={info.href}
                  className="group relative block"
                >
                  <div className={`absolute -inset-2 bg-gradient-to-br ${info.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800/50 shadow-2xl">
                    <div className="flex items-start gap-4">
                      <motion.div
                        animate={hoveredContact === info.id ? { rotate: 360 } : {}}
                        transition={{ duration: 0.6 }}
                        className={`p-3 rounded-xl bg-gradient-to-br ${info.gradient} shadow-lg`}
                      >
                        <info.icon className="text-white" size={24} />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{info.title}</h3>
                        <p className="text-gray-300 mb-2">{info.value}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={14} className={info.color} />
                          <span className="text-gray-400">{info.description}</span>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ x: hoveredContact === info.id ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Send size={18} className={info.color} />
                      </motion.div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability Card */}
            <motion.div 
              variants={itemVariants}
              whileHover="hover"
              variants={cardHoverVariants}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                    <Clock className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Disponibilités</h3>
                </div>
                
                <div className="space-y-3">
                  {availability.map((slot, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <span className="text-white font-medium">{slot.day}</span>
                        <span className="text-gray-400 text-sm ml-2">• {slot.time}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        slot.status === 'Disponible' ? 'bg-green-500/20 text-green-400' :
                        slot.status === 'Sur rendez-vous' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {slot.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Info Card */}
            <motion.div 
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl p-6 rounded-2xl border border-purple-800/20">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="text-purple-400" size={20} />
                  <h3 className="text-lg font-bold text-white">Statut actuel</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Actuellement à la recherche d'opportunités de stage PFE et de projets collaboratifs 
                  en développement full-stack et intelligence artificielle.
                </p>
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-cyan-400" />
                  <span className="text-sm text-gray-400">Ouvert au télétravail et présentiel</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-800/50 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Envoyer un message</h3>
                  <p className="text-gray-400 text-sm">Je vous répondrai dans les plus brefs délais</p>
                </div>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div 
                  whileFocus="focus"
                  variants={inputFocusVariants}
                  className="relative group/input"
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <User className="text-gray-400 group-focus-within/input:text-blue-400 transition-colors duration-300" size={20} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom complet"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div 
                  whileFocus="focus"
                  variants={inputFocusVariants}
                  className="relative group/input"
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Mail className="text-gray-400 group-focus-within/input:text-blue-400 transition-colors duration-300" size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div 
                  whileFocus="focus"
                  variants={inputFocusVariants}
                  className="relative group/input"
                >
                  <div className="absolute left-4 top-4">
                    <MessageCircle className="text-gray-400 group-focus-within/input:text-blue-400 transition-colors duration-300" size={20} />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet, opportunité ou question..."
                    required
                    rows={6}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 resize-none backdrop-blur-sm"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-purple-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock size={20} />
                      </motion.div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Result Message */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                      result.includes('succès') || showSuccess
                        ? 'bg-green-500/10 border border-green-500/20'
                        : 'bg-red-500/10 border border-red-500/20'
                    }`}
                  >
                    {result.includes('succès') || showSuccess ? (
                      <CheckCircle className="text-green-400" size={20} />
                    ) : (
                      <AlertCircle className="text-red-400" size={20} />
                    )}
                    <span className={`font-medium ${
                      result.includes('succès') || showSuccess ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {result}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-6 border-t border-gray-800/50"
              >
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Zap size={14} className="text-yellow-400" />
                  <span>Les messages sont traités dans un délai maximum de 24 heures</span>
                </div>
              </motion.div>
            </div>
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

export default Contact;