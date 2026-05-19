import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '../components/Footer';   
import ReactPlayer from 'react-player';
import 'aos/dist/aos.css';
import AOS from 'aos';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MissionVisionValeurs = ({ showUI }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
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
            <span>›</span>
            <a href="/client" className="underline text-black hover:text-red-600">Sotetel</a>
            <span>›</span>
            <a href="/missions-valeurs" className="underline text-black hover:text-red-600">Missions,visions et valeurs</a>
          </nav>
        </div>
      </section>

      {/* Block 1 - Mission */}
      <section className="bg-white py-16 px-6 text-center" data-aos="fade-right">
        <i className="bi bi-bullseye text-red-600 text-4xl mb-4"></i>
        <h2 className="text-3xl font-bold text-red-600 mb-4">Notre mission</h2>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
          <span className="block text-xl font-bold mb-2">SOTETEL, acteur régional majeur pour le :</span>
          Conseil, l’ingénierie et la mise en œuvre d’infrastructures numériques de télécommunications et d’énergie. SOTETEL offre des services professionnels de qualité centrés sur les besoins et la satisfaction des clients, opérateurs, équipementiers et entreprises.
        </p>
      </section>

      {/* Block 2 - Vision */}
      <section className="bg-red-600 text-white py-16 px-6 text-center" data-aos="fade-left">
        <i className="bi bi-eye text-white text-4xl mb-4"></i>
        <h2 className="text-3xl font-bold mb-4">Notre vision</h2>
        <p className="max-w-3xl mx-auto text-lg">
          SOTETEL est un activateur d’intelligence publique, de durabilité et de bien-être grâce à la construction d’infrastructures intelligentes.
        </p>
      </section>

      {/* Block 3 - Valeurs */}
      <section className="bg-gray-100 py-16 px-6 text-center" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-red-600 mb-8">Nos valeurs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: 'bi-people', text: 'Culture organisationnelle & sentiment d’appartenance' },
            { icon: 'bi-sliders', text: 'Égalité des chances' },
            { icon: 'bi-globe', text: 'Préservation de l’environnement' },
            { icon: 'bi-hand-thumbs-up', text: 'Respect mutuel' },
            { icon: 'bi-emoji-smile', text: 'Satisfaction client' },
            { icon: 'bi-search', text: 'Transparence' },
            { icon: 'bi-cpu', text: 'Intelligence technologique' },
            { icon: 'bi-lightbulb', text: 'Reconnaissance de l’initiative' },
            { icon: 'bi-award', text: 'Professionnalisme & excellence' },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <i className={`bi ${item.icon} text-red-600 text-5xl`}></i>
              <p className="text-center text-base text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Block 4 - Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=-fjPSYjMOO4&embeds_referring_euri=https%3A%2F%2Fwww.sotetel.tn%2Fen%2Fsotetel-2%2Fmission-vision-values%2F&source_ve_path=MjM4NTE"
              width="100%"
              height="100%"
              controls
              light="/assets/video-thumbnail-new.png"
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
    </div>
  );
};

export default MissionVisionValeurs;
