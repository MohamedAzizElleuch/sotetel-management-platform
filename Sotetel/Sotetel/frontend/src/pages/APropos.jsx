import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CountUp from 'react-countup';


function APropos({ showUI }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const stats = [
    { icon: 'bi-people', count: 429, label: 'Collaborateurs' },
    { icon: 'bi-diagram-3', count: 30000, label: 'Km de fibre optique' },
    { icon: 'bi-broadcast-pin', count: 4200, label: 'Sites GSM maintenus' },
    { icon: 'bi-building', count: 3800, label: 'Tours installées' },
    { icon: 'bi-currency-dollar', count: 50000, label: 'Chiffre d’affaires (en MD)' },
    { icon: 'bi-cash-stack', count: 25000, label: 'Capital social (en MD)' },
  ];

  return (
    
    <>
      {/* Navbar */}
      <Navbar showUI={showUI} />
     {/* Secondary Navbar */}
     <section
  className="relative h-60 flex items-center justify-start px-10 mt-16"

  style={{
    backgroundImage: "url('/assets/about-banner.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="bg-white/70 p-4 rounded-lg ml-32">
    <h1 className="text-3xl font-extrabold text-red-600 mb-2">À propos</h1>
    <nav className="text-sm text-black space-x-2">
      <a href="/client" className="underline text-black hover:text-red-600">Accueil</a>
      <span className="text-black">›</span>
      <a href="/client" className="underline text-black hover:text-red-600">Sotetel</a>
      <span className="text-black">›</span>
      <a href="/APropos" className="underline text-black hover:text-red-600">À propos</a>
    </nav>
  </div>
</section>



      {/* Section A Propos */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texte */}
            <div className="lg:col-span-6" data-aos="fade-up">
              <h3 className="text-lg font-semibold text-red-600 mb-2">Qui sommes-nous ?</h3>
              <h2 className="text-4xl font-extrabold text-gray-900 leading-snug mb-6">
                Pionnier dans la mise en œuvre et la maintenance des réseaux télécoms.
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Depuis 1981, SOTETEL est un acteur clé du secteur des télécommunications en Tunisie et à l’international.
              </p>

              <div className="space-y-6 text-gray-700 text-base leading-relaxed">
                <div>
                  <h4 className="text-lg font-semibold text-red-600 mb-2">Constructeur de réseaux</h4>
                  <p>
                    SOTETEL couvre les infrastructures réseau fixes, mobiles et sans fil, les solutions de communication unifiées, et les accès intelligents.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-red-600 mb-2">Intégrateur de solutions numériques</h4>
                  <p>
                    Des solutions à forte valeur ajoutée, axées sur l’innovation technologique, l’agilité et l’amélioration continue.
                  </p>
                </div>

                <p>
                  Fort de partenariats technologiques solides, SOTETEL accompagne la transformation numérique des entreprises avec une approche qualité rigoureuse et des certifications de haut niveau.
                </p>

                <p>
                  Nous avons su fidéliser un portefeuille prestigieux de clients en Tunisie et à l’étranger, issus de divers secteurs : opérateurs télécoms, grandes entreprises, administrations et industries.
                </p>

                <p>
                  Notre rayonnement international s’inscrit dans une dynamique d’ouverture vers les marchés mondiaux.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-6 flex justify-center" data-aos="fade-left">
              <div className="w-full max-w-[600px] h-[360px] rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/assets/about.jpg"
                  alt="Photo de l'entreprise SOTETEL"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

     {/* Section Statistiques */}
<section id="stats" className="py-20 bg-red-600">
  <div className="container mx-auto px-4" data-aos="fade-up" data-aos-delay="100">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center text-white">
      {stats.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <i className={`${item.icon} bi text-5xl mb-2 animate-bounce`} />
          <div className="text-3xl font-bold mb-1">
          <CountUp
  end={item.count}
  duration={2}
  separator=" "
>
  {({ countUpRef }) => (
    <div ref={countUpRef} className="text-3xl font-bold mb-1" />
  )}
</CountUp>

          </div>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Footer */}
  <Footer />
</>


  );
}

export default APropos;
