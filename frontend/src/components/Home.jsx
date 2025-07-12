import React, { useState, useEffect } from 'react';
import { Menu, X, Users, Building, FileText, BarChart3, Shield, Phone, Mail, MapPin, ChevronRight, Star, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SyndicateHomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
   const Navigate=useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Hero slider images and content
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "إدارة نقابية حديثة ومبسطة",
      subtitle: "منصة شاملة لإدارة النقابات في المغرب",
      slogan: "نحو مستقبل رقمي للنقابات المغربية"
    },
    {
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      title: "تسيير فعال للأعضاء والممتلكات",
      subtitle: "أدوات متطورة لإدارة شؤون النقابة",
      slogan: "الحل الأمثل للإدارة النقابية العصرية"
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "شفافية وأمان في التسيير",
      subtitle: "تقنيات حديثة لضمان الشفافية والأمان",
      slogan: "ثقة وأمان في كل عملية"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Gestion des Adhérents",
      description: "Gérez efficacement vos membres et leurs cotisations"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Gestion Immobilière",
      description: "Supervisez vos biens et propriétés syndiquées"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Documentation",
      description: "Centralisez tous vos documents administratifs"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Rapports & Analytics",
      description: "Analysez vos performances avec des rapports détaillés"
    }
  ];

  const stats = [
    { number: "500+", label: "Syndicats Actifs" },
    { number: "50K+", label: "Membres Gérés" },
    { number: "99.9%", label: "Disponibilité" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero Section with Photo Background */}
      <section id="accueil" className="relative h-screen overflow-hidden">
        {/* Background Images Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav className={`fixed z-50 transition-all px-4 duration-300 ${
  isScrolled
    ? 'fixed top-0 left-0 w-full text-slate-900 bg-white/95 backdrop-blur-md shadow-lg'
    : 'text-white   backdrop-blur-md'
}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold ">
                  SyndiPro
                </span>
              </div>

              <div className="hidden md:flex px-50 items-center space-x-8">
                <a href="#accueil" className=" hover:text-emerald-400 transition-colors font-medium">Accueil</a>
                <a href="#services" className=" hover:text-emerald-400 transition-colors font-medium">Services</a>
                <a href="#fonctionnalites" className=" hover:text-emerald-400 transition-colors font-medium">Fonctionnalités</a>
                <a href="#contact" className="hover:text-emerald-400 transition-colors font-medium">Contact</a>
                <button
                  onClick={() => Navigate("/auth/login")}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105"
                >
                  Connexion
                </button>
              </div>

              <button
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden bg-black/90 backdrop-blur-md`}>
            <div className="px-4 py-2 space-y-2">
              <a href="#accueil" className="block py-2 text-white hover:text-emerald-400">Accueil</a>
              <a href="#services" className="block py-2 text-white hover:text-emerald-400">Services</a>
              <a href="#fonctionnalites" className="block py-2 text-white hover:text-emerald-400">Fonctionnalités</a>
              <a href="#contact" className="block py-2 text-white hover:text-emerald-400">Contact</a>
              <button
                onClick={() => Navigate("/auth/login")}
                className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105"
              >
                Connexion
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-40 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in" style={{fontFamily: 'Arial, sans-serif'}}>
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4 animate-fade-in-delay">
                {heroSlides[currentSlide].subtitle}
              </p>
              <p className="text-lg md:text-xl text-emerald-400 font-semibold mb-8 animate-fade-in-delay-2">
                {heroSlides[currentSlide].slogan}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
                <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105 font-semibold">
                  ابدأ مجاناً
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-slate-900 transition-all font-semibold">
                  اكتشف العرض التوضيحي
                </button>
              </div>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in-up bg-white/10 backdrop-blur-sm rounded-lg p-4" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-emerald-400' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Fonctionnalités Principales
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Découvrez les outils qui vous permettront de gérer votre syndicat efficacement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl transition-all duration-500 cursor-pointer ${
                  activeFeature === index
                    ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg scale-105'
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 transition-all ${
                  activeFeature === index
                    ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white'
                    : 'bg-white text-emerald-600'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Une gamme complète de services adaptés aux besoins des syndicats marocains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Gestion Administrative",
                description: "Simplifiez la gestion quotidienne de votre syndicat avec nos outils intuitifs.",
                features: ["Registres numériques", "Convocations automatisées", "Archivage sécurisé"]
              },
              {
                title: "Gestion Financière",
                description: "Suivez vos finances et cotisations avec transparence et précision.",
                features: ["Comptabilité intégrée", "Facturation automatique", "Rapports financiers"]
              },
              {
                title: "Communication",
                description: "Maintenez une communication fluide avec tous vos membres.",
                features: ["Notifications SMS", "Emails groupés", "Espace membre"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-700">
                      <ChevronRight className="w-4 h-4 text-emerald-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Contactez-Nous
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Notre équipe est là pour vous accompagner dans votre transformation digitale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
              <p className="text-slate-300">+212 5 22 XX XX XX</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-slate-300">contact@syndipro.ma</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adresse</h3>
              <p className="text-slate-300">Casablanca, Maroc</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SyndiPro</span>
              </div>
              <p className="text-slate-400">
                La solution moderne pour la gestion syndicale au Maroc.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Sécurité</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Formation</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Partenaires</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 SyndiPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default SyndicateHomePage;
