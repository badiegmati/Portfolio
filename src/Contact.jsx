import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [result, setResult] = useState(""); // Add this line to define setResult

  
const onSubmit = async (event) => {
  event.preventDefault();
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
      setFormData({ name: "", email: "", message: "" });
    } else {
      setResult(`Erreur: ${data.message}`);
      console.error("Erreur Web3Forms:", data);
    }
  } catch (error) {
    setResult("Une erreur réseau est survenue");
    console.error("Erreur fetch:", error);
  }
};
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'badie.gmati11@email.com',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+216 58 294 838',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Localisation',
      value: 'Nabeul,Bou argoub Tunisie',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Contactez-Moi
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            Intéressé par une collaboration ? N'hésitez pas à me contacter pour discuter de vos projets ou opportunités.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-8">Informations de Contact</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${info.gradient} transform group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{info.title}</h4>
                      <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Card Effect */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                 style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)' }}>
              <h3 className="text-2xl font-bold text-white mb-4">Disponible pour des opportunités</h3>
              <p className="text-blue-100 leading-relaxed">
                Je suis actuellement à la recherche d'opportunités de stage et de projets collaboratifs 
                dans le domaine du développement logiciel et des technologies web.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <MessageCircle className="mr-3 text-blue-400" size={28} />
              Envoyez-moi un message
            </h3>
            
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <MessageCircle className="absolute left-3 top-4 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" size={20} />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message"
                  required
                  rows={6}
                  className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-purple-700"
              >
                <Send size={20} />
                <span>Envoyer le message</span>
              </button>
            </form>
            {result && (
              <div className="mt-4 text-center text-white">
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;