import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactPlayer from 'react-player';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';   

function DateEtHistorique({ showUI }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const timeline = [
    { year: '1981', text: 'Création de SOTETEL' },
    { year: '1995', text: 'Signature de la convention collective spécifique de l’entreprise' },
    { year: '1996', text: 'Transfert du siège social à Charguia 2. Création du centre de formation Sadok Ghannouchi – SOTETEL-NEC.' },
    { year: '1998', text: 'Introduction en Bourse de Tunis (BVMT).' },
    { year: '1999', text: 'Refonte du logo, Certification ISO 9001, ouverture de pôles régionaux à Sousse et Sfax. Prix international du développement des communications par l’IIPP-Genève.' },
    { year: '2001', text: 'Ouverture du pôle régional de Médenine. Prix National du Progrès Social.' },
    { year: '2003', text: 'Certification GASP-ERICSSON pour la coopération triangulaire internationale.' },
    { year: '2004', text: 'Ouverture de la filiale SOTETEL-Libye.' },
    { year: '2007', text: 'Nouvelle gouvernance, mise en place d’un ERP, première révision de la convention collective.' },
    { year: '2009', text: 'Première restructuration. Certification CISCO et partenariat SILVER.' },
    { year: '2011', text: 'Deuxième révision de la convention collective. Élection des administrateurs représentant les petits porteurs.' },
    { year: '2012', text: 'Renouvellement du partenariat SILVER CISCO. Accord avec DB Algeria Tech.' },
    { year: '2013', text: 'Accord de partenariat avec SIAE-Italie.' },
    { year: '2015', text: 'Deuxième restructuration.' },
    { year: '2016', text: 'Étude de marché et mission de positionnement. Accréditation du centre de formation.' },
    { year: '2017', text: 'Certification HP Business Partner. Ouverture de la filiale SOTETEL-MALTE. Mise en place d’un système de gestion de flotte.' },
    { year: '2018', text: 'Certification HUAWEI et partenariat SILVER. Création de SPA SOTETEL-Algérie. ISO 9001:2015. Partenariat avec TMI. Mise en place du système de contrôle d’accès et outil PPM.' },
    { year: '2019', text: 'Digitalisation des processus internes et lancement de nouveaux services IoT.' },
    { year: '2020', text: 'Adaptation des services aux besoins post-COVID. Déploiement de solutions cloud et cybersécurité.' },
    { year: '2025', text: 'Expansion en Afrique subsaharienne. Partenariats stratégiques pour la 5G et l’intelligence artificielle.' },
  ];

  const colorPairs = [
    { text: 'text-red-600', border: 'border-red-600' },
    { text: 'text-blue-600', border: 'border-blue-600' },
    { text: 'text-green-600', border: 'border-green-600' },
    { text: 'text-yellow-500', border: 'border-yellow-500' },
    { text: 'text-indigo-600', border: 'border-indigo-600' },
    { text: 'text-purple-600', border: 'border-purple-600' },
  ];

  const animations = ['fade-up', 'fade-right', 'fade-left', 'zoom-in', 'flip-left', 'flip-right'];

  return (
    <>
      <Navbar showUI={showUI} />

      {/* Hero banner */}
      <section
        className="relative h-60 flex items-center justify-start px-10 mt-16"
        style={{
          backgroundImage: "url('/assets/about-banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white/70 p-4 rounded-lg ml-32">
          <h1 className="text-3xl font-extrabold text-red-600 mb-2">Date clé et historique</h1>
          <nav className="text-sm text-black space-x-2">
            <a href="/client" className="underline hover:text-red-600">Accueil</a>
            <span>›</span>
            <a href="/client" className="underline hover:text-red-600">Sotetel</a>
            <span>›</span>
            <a href="/DateEtHistorique" className="underline hover:text-red-600">Historique</a>
          </nav>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-20">
            Un acteur majeur dans le <span className="text-red-600">domaine</span> des télécommunications
          </h2>

          <div className="flex flex-col relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 z-0"></div>

            {timeline.map((event, index) => {
              const isLeft = index % 2 === 0;
              const colorPair = colorPairs[index % colorPairs.length];
              const animation = animations[index % animations.length];

              return (
                <div
                  key={index}
                  className="flex items-center justify-between w-full mb-12 relative"
                  data-aos={animation}
                  data-aos-delay={index * 80}
                >
                  {/* Left text */}
                  <div className={`w-5/12 ${isLeft ? 'text-right' : ''}`}>
                    {isLeft && (
                      <div className="p-4 rounded-lg bg-gray-50 shadow-md inline-block">
                        <h3 className={`text-xl font-bold ${colorPair.text}`}>{event.year}</h3>
                        <p className="text-gray-700 mt-2">{event.text}</p>
                      </div>
                    )}
                  </div>

                  {/* Center Dot */}
                  <div className="relative z-10">
                    <div className={`w-4 h-4 rounded-full bg-gray-50 border-4 shadow-md mx-auto ${colorPair.border}`}></div>
                  </div>

                  {/* Right text */}
                  <div className={`w-5/12 ${!isLeft ? 'text-left' : ''}`}>
                    {!isLeft && (
                      <div className="p-4 rounded-lg bg-gray-50 shadow-md inline-block">
                        <h3 className={`text-xl font-bold ${colorPair.text}`}>{event.year}</h3>
                        <p className="text-gray-700 mt-2">{event.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg"> {/* fixed height */}
      <ReactPlayer
        url="https://www.youtube.com/watch?v=8ZFIegiZRq0"
        width="100%"
        height="100%"
        controls
        light="/assets/sotetel-cover.png"
        style={{ position: 'absolute', top: 0, left: 0 }}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              controls: 1,
            },
          },
        }}
      />
    </div>
  </div>
</section>
  <Footer />

    </>
  );
}

export default DateEtHistorique;
