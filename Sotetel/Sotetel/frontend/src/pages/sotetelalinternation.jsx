import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '../components/Footer';  
import 'aos/dist/aos.css';
import AOS from 'aos';

const SotetelALInternational = ({ showUI }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      {/* Navbar */}
       <Navbar showUI={false} />

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

      {/* Bloc 1 */}
      <section className="bg-white py-16 px-6 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Sotetel à l'étranger</h2>
        <h3 className="text-xl font-bold text-black mb-2">Pays d’intervention et présence internationale</h3>
        <p className="max-w-4xl mx-auto text-gray-800 text-lg leading-relaxed">
          Après quelques années de positionnement sur le marché local, SOTETEL a pu franchir un pas géant à l’international grâce à ses expatriés
          qui ont opéré dans un cadre GASP "Global Agreement Services Provider" avec des équipementiers mondiaux, notamment ERICSSON et SIEMENS. 
          Les compétences et l’expertise de ses ingénieurs et techniciens ont permis à SOTETEL de s’inscrire dans un autre contexte international
          et de gagner en notoriété en intégrant les marchés mondiaux.
        </p>
      </section>

      {/* Bloc 2 */}
      <section className="w-full" data-aos="fade-left">
        <img
          src="/assets/image-internationale.png"
          alt="Image internationale"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Bloc 3 */}
      <section className="bg-white py-16 px-6 text-center" data-aos="fade-right">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Sotetel à l'étranger</h2>
        <h3 className="text-xl font-bold text-black mb-2">Présence internationale</h3>
        <p className="max-w-4xl mx-auto text-gray-800 text-lg leading-relaxed">
          En forgeant son nom et son label, SOTETEL est aujourd’hui confirmée par sa présence à l’international.
        </p>
      </section>

      {/* Bloc 4 - Carte interactive */}
      <section className="relative w-full h-[350px]" data-aos="zoom-in">
  <img
    src="/assets/map.jpg"
    alt="Carte des interventions"
    className="w-full h-full object-cover"
  />

  {/* Glowing point with styled tooltip */}
  <div className="absolute top-[60%] left-[40%] group">
    {/* Glowing animation */}
    <div className="w-4 h-4 bg-red-600 rounded-full animate-ping absolute"></div>
    {/* Solid dot */}
    <div className="w-4 h-4 bg-red-600 rounded-full relative z-10"></div>

    {/* Styled tooltip */}
    <div className="absolute left-8 -top-2 group-hover:block hidden bg-white text-black text-sm px-4 py-3 rounded shadow-lg border border-gray-200 whitespace-nowrap w-64">
      <p className="font-bold text-blue-900 mb-1">Sotetel Libye <span className="inline-block w-2 h-2 bg-blue-900 rounded-full ml-2 align-middle"></span></p>
      <p><span className="font-semibold">Adresse :</span> Cité El Andalous Tripoli, Libye</p>
    </div>
  </div>
</section>
               <Footer />
    </div>
  );
};

export default SotetelALInternational;
