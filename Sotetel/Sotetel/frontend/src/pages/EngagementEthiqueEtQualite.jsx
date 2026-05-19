import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaArrowRight } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EngagementEthiqueEtQualite = ({ showUI }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleDownload = (fileName) => {
    const lienPDF = `/assets/${fileName}`;
    const link = document.createElement('a');
    link.href = lienPDF;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar showUI={false} />

      {/* Bloc 1 : Politique qualité */}
      <div className="flex flex-row justify-center items-start pt-32 px-10 gap-10" data-aos="fade-up">
        <div className="w-[966px] flex flex-col justify-between">
          <h1 className="text-red-600 text-3xl font-bold">Engagements</h1>
          <h2 className="text-5xl font-semibold mt-4">
            Politique de <span className="text-red-600">qualité</span>
          </h2>

          <div className="text-lg mt-4 leading-7 space-y-4">
            <p>
              Chez SOTETEL, nous avons mis en place une approche qui incarne notre vision et reflète notre engagement constant à répondre aux exigences de nos services et à améliorer continuellement notre système de gestion de la qualité. Cet élan de progrès s’organise autour des principaux axes stratégiques suivants :
            </p>

            <ul className="pl-4 space-y-1 text-sm mt-2">
              <li className="flex items-start"><span className="text-red-600 mr-2">›</span>Améliorer la performance de nos processus et le contrôle de nos opérations</li>
              <li className="flex items-start"><span className="text-red-600 mr-2">›</span>Améliorer notre positionnement concurrentiel et notre performance commerciale</li>
              <li className="flex items-start"><span className="text-red-600 mr-2">›</span>Étendre notre portefeuille de solutions en fonction des besoins des clients</li>
              <li className="flex items-start"><span className="text-red-600 mr-2">›</span>Développer notre présence internationale</li>
            </ul>

            <p className="mt-4">
              Nous nous engageons à appliquer régulièrement les dispositions mises en place pour garantir l'efficacité de notre système de gestion de la qualité et à fournir les moyens nécessaires pour atteindre les objectifs attendus.
            </p>
          </div>

          <div className="group mt-6 flex items-center cursor-pointer w-fit" onClick={() => handleDownload('SOTETEL-quality-policy.pdf')}>
            <span className="text-lg font-medium text-black transition-all duration-300 group-hover:translate-x-2">Politique de qualité</span>
            <FaArrowRight className="ml-2 text-red-600 transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </div>

        <div className="w-[966px] h-[1457px]" data-aos="fade-left">
          <img src="assets/quality-photo.jpg" alt="Qualité SOTETEL" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Bloc 2 : Santé et Sécurité au travail */}
      <div className="flex flex-row justify-center items-start pt-32 px-10 gap-10">
        <div className="w-[966px] h-[1457px]" data-aos="fade-right">
          <img src="assets/hse-photo.jpg" alt="Santé et sécurité SOTETEL" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>

        <div className="w-[966px] flex flex-col justify-between" data-aos="fade-up">
          <h2 className="text-5xl font-semibold">
            Politique de <span className="text-red-600">santé et sécurité</span> au travail
          </h2>

          <div className="text-lg mt-4 leading-7 space-y-4">
            <p>
              SOTETEL considère ses ressources humaines comme son principal atout. Nous sommes conscients que la santé et la sécurité de notre personnel sont une priorité pour le bon fonctionnement de nos activités.
            </p>

            <p>
              Les employés à tous les niveaux, y compris la direction, sont responsables des initiatives globales de l’entreprise en matière de sécurité.
            </p>

            <p className="font-semibold">Nos objectifs :</p>
            <ul className="pl-4 space-y-1 text-sm mt-2">
              <li className="flex items-start"><span className="text-red-600 mr-2">›</span>Développer une culture de prévention et intégrer la santé et la sécurité dans les différents processus de gestion de l’organisation.</li>
              <li className="flex items-start"><span className="text-red-600 mr-2">›</span>Respecter les lois et réglementations en vigueur sur les chantiers.</li>
              <li className="flex items-start"><span className="text-red-600 mr-2">›</span>Promouvoir la sécurité dans la mise en œuvre des projets.</li>
              <li className="flex items-start"><span className="text-red-600 mr-2">›</span>Offrir des programmes de formation et de contrôle aux travailleurs.</li>
              <li className="flex items-start"><span className="text-red-600 mr-2">›</span>Impliquer et responsabiliser les employés en matière de santé et sécurité.</li>
            </ul>
          </div>

          <div className="group mt-6 flex items-center cursor-pointer w-fit" onClick={() => handleDownload('SOTETEL-hse-policy.pdf')}>
            <span className="text-lg font-medium text-black transition-all duration-300 group-hover:translate-x-2">Manuel de santé et sécurité</span>
            <FaArrowRight className="ml-2 text-red-600 transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </div>
      </div>

      {/* Bloc 3 : Code d'éthique et de conduite */}
      <div className="flex flex-row justify-center items-start pt-32 px-10 gap-10">
        <div className="w-[966px] flex flex-col justify-between" data-aos="fade-up">
          <h2 className="text-5xl font-semibold">
            Code d'<span className="text-red-600">éthique</span> et de conduite
          </h2>

          <div className="text-lg mt-4 leading-7 space-y-4">
            <p>
              Convaincue, depuis sa création, de sa pérennité et du maintien de sa position de leader, SOTETEL ne peut se limiter aux seuls défis liés à l’obtention de contrats. Son Code d’éthique et de conduite s’inscrit dans un climat de confiance, de transparence et d’intégrité.
            </p>
            <p>
              Ce code s’adresse aux membres de l’entreprise entre eux et vis-à-vis de leurs clients, partenaires et fournisseurs.
            </p>
          </div>

          <div className="group mt-6 flex items-center cursor-pointer w-fit" onClick={() => handleDownload('SOTETEL-ethics-code.pdf')}>
            <span className="text-lg font-medium text-black transition-all duration-300 group-hover:translate-x-2">Code d'éthique et de conduite</span>
            <FaArrowRight className="ml-2 text-red-600 transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </div>

        <div className="w-[966px] h-[1457px]" data-aos="fade-left">
          <img src="assets/ethics-photo.jpg" alt="Code d'éthique SOTETEL" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default EngagementEthiqueEtQualite;
