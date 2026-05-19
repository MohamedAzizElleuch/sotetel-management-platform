import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '@/components/Navbar';
import Footer from '../components/Footer';

function Contact({ showUI }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’envoi du message.');
      }

      alert('Message envoyé avec succès !');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <>
      <Navbar showUI={showUI} />

      {/* Bloc 1 : Map */}
      <section className="w-full h-[500px] relative cursor-pointer group mb-24">
        <a
          href="https://maps.app.goo.gl/aUn99VH86te4Kit59"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full relative"
        >
          <img
            src="/assets/sotetel-map-thumbnail.jpg"
            alt="Sotetel Map Thumbnail"
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <span className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded shadow">
              Voir sur Google Maps
            </span>
          </div>
        </a>
      </section>

      {/* Bloc 2 : Nos agences régionales */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-20">
            Nos agences <span className="text-indigo-600">régionales</span>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            <div className="border rounded-2xl p-8 shadow-md hover:shadow-lg transition bg-gray-50 space-y-6">
              <h3 className="text-2xl font-semibold text-indigo-600">Sotetel Sousse</h3>
              <p className="leading-relaxed">
                <span className="font-semibold">Adresse :</span><br />ZI Sidi Abdelhamid, 4 rue de la physique 4061 Sousse
              </p>
              <p className="leading-relaxed"><span className="font-semibold">Tél :</span> (+216) 73 321 360</p>
              <p className="leading-relaxed"><span className="font-semibold">Fax :</span> (+216) 73 321 361</p>
            </div>

            <div className="border rounded-2xl p-8 shadow-md hover:shadow-lg transition bg-gray-50 space-y-6">
              <h3 className="text-2xl font-semibold text-indigo-600">Sotetel Sfax</h3>
              <p className="leading-relaxed">
                <span className="font-semibold">Adresse :</span><br />ZI Poudrière II, Rue de l'acier Sfax 3000
              </p>
              <p className="leading-relaxed"><span className="font-semibold">Tél :</span> (+216) 74 257 457</p>
              <p className="leading-relaxed"><span className="font-semibold">Fax :</span> (+216) 74 257 457</p>
            </div>

            <div className="border rounded-2xl p-8 shadow-md hover:shadow-lg transition bg-gray-50 space-y-6">
              <h3 className="text-2xl font-semibold text-indigo-600">Sotetel Médenine</h3>
              <p className="leading-relaxed">
                <span className="font-semibold">Adresse :</span><br />Route de Gabès, Km 3.5 – BP 51 Médenine 4130
              </p>
              <p className="leading-relaxed"><span className="font-semibold">Tél :</span> (+216) 75 60 07 00</p>
              <p className="leading-relaxed"><span className="font-semibold">Fax :</span> (+216) 75 60 08 91</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc 3 : Section Contact – 40% gauche (infos) / 60% droite (formulaire) */}
      <section className="py-16">
        <div className="grid grid-cols-5 h-full">
          {/* Colonne gauche : Infos de contact */}
          <div className="col-span-2 bg-indigo-900 text-white p-12 flex flex-col justify-between">
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Siège Social</h2>
                <p className="leading-relaxed">
                  Rue des Entrepreneurs, Z.I Charguia II<br />
                  Aéroport 1080 Tunis
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Contactez-nous</h2>
                <p className="leading-relaxed">
                  T +216 71 135 100<br />
                  F +216 71 940 584<br />
                  Email : contact@sotetel.tn
                </p>
              </div>
            </div>

            <div className="flex space-x-6 mt-12">
              <a href="https://www.facebook.com/SotetelSmartEnabler/" className="hover:text-indigo-300 text-2xl"><i className="bi bi-facebook"></i></a>
              <a href="https://tn.linkedin.com/company/sotetel" className="hover:text-indigo-300 text-2xl"><i className="bi bi-linkedin"></i></a>
              <a href="https://www.youtube.com/@sotetel890" className="hover:text-indigo-300 text-2xl"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          {/* Colonne droite : Formulaire de contact */}
          <form onSubmit={handleSubmit} className="col-span-3 bg-white p-12 space-y-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Envoyez-nous votre message</h2>
            <p className="text-gray-600 mb-8">
              N’hésitez pas à nous contacter pour toute question ou remarque. Nous sommes à votre écoute.
            </p>

            <input
              type="text"
              name="name"
              placeholder="Nom & Prénom *"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail *"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3"
            />
            <input
              type="text"
              name="subject"
              placeholder="Numéro de téléphone"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
            />
            <textarea
              name="message"
              placeholder="Votre message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md"
            >
              Envoyer
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
