import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '@/components/Navbar';

const services = [
  {
    icon: 'bi-diagram-3',
    title: 'Câblage & Infrastructure',
    desc: 'Installation RJ45, fibre optique, baies de brassage, certification réseau.',
  },
  {
    icon: 'bi-wifi',
    title: 'Wi-Fi Professionnel',
    desc: 'Étude de couverture, points d’accès, sécurité WPA3, roaming optimisé.',
  },
  {
    icon: 'bi-tools',
    title: 'Maintenance & Dépannage',
    desc: 'Diagnostic matériel, intervention sur site, remplacement d’équipements.',
  },
  {
    icon: 'bi-hdd-network',
    title: 'Intégration Réseau',
    desc: 'Switchs, VLAN, routage, QoS, configuration complète de votre LAN/WAN.',
  },
  {
    icon: 'bi-shield-lock',
    title: 'Sécurité & Pare-feu',
    desc: 'Firewall, contrôle d’accès, surveillance réseau, protection des données.',
  },
  {
    icon: 'bi-fiber',
    title: 'Raccordement Fibre',
    desc: 'FTTx, tests optiques, maintenance fibre, déploiement entreprises.',
  },
  {
    icon: 'bi-phone-vibrate',
    title: 'Téléphonie IP',
    desc: 'Installation de systèmes VoIP, configuration SIP, gestion des appels.',
  },
  {
    icon: 'bi-camera-video',
    title: 'Vidéosurveillance IP',
    desc: 'Caméras haute résolution, enregistrement, accès distant sécurisé.',
  },
  {
    icon: 'bi-door-closed',
    title: 'Contrôle d’Accès',
    desc: 'Lecteurs biométriques, badges RFID, gestion des autorisations.',
  },
  {
    icon: 'bi-house',
    title: 'Domotique & Smart Office',
    desc: 'Automatisation, capteurs IoT, scénarios intelligents pour bureaux.',
  },
  {
    icon: 'bi-file-earmark-check',
    title: 'Études & Devis',
    desc: 'Analyse de besoins, propositions personnalisées, plans & chiffrage.',
  },
  {
    icon: 'bi-person-video2',
    title: 'Assistance & Formation',
    desc: 'Formation utilisateurs, accompagnement IT, support à distance.',
  },
];

function ServicesPageClient({ showUI }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar showUI={showUI} />

      {/* Hero Section */}
      <section
        className="relative h-60 flex items-center justify-start px-10 mt-16"
        style={{
          backgroundImage: "url('/assets/about-banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white/70 p-4 rounded-lg ml-32">
          <h1 className="text-3xl font-extrabold text-red-600 mb-2">Services</h1>
          <nav className="text-sm text-black space-x-2">
            <a href="/client" className="underline text-black hover:text-red-600">Accueil</a>
            <span className="text-black">›</span>
            <a href="/client" className="underline text-black hover:text-red-600">Sotetel</a>
            <span className="text-black">›</span>
            <a href="/client/services" className="underline text-black hover:text-red-600">Services</a>
          </nav>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Nos Services</h2>
            <p className="text-lg text-gray-600">
              <span className="font-medium">Découvrez nos</span>{' '}
              <span className="text-blue-600 font-semibold">services professionnels adaptés à vos besoins</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                data-aos="fade-up"
                data-aos-delay={100 * (idx + 1)}
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl shadow mb-4">
                  <i className={`bi ${service.icon}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicesPageClient;
