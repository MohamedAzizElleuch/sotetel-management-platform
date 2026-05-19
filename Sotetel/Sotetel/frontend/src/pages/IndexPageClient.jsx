import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'swiper/css';
import 'swiper/css/pagination';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';   
import api from "@/services/api"; // API helper import
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import { Link } from 'react-router-dom';
import React from 'react';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';



function IndexPageClient() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [prevScrollY, setPrevScrollY] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [actualites, setActualites] = useState([]);
  
  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const { data } = await api.get("/actualites");
        setActualites(data);
      } catch (error) {
        console.error("Erreur lors du chargement des actualités :", error);
      }
    };
    fetchActualites();
  }, []); // 👈 And this useEffect here


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowUI(currentScrollY < prevScrollY || currentScrollY <= 80);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  const faqs = [
    {
      question: "Comment puis-je créer un compte client ?",
      answer: "Vous pouvez créer un compte en cliquant sur le bouton 'S'inscrire' dans le coin supérieur droit et en remplissant le formulaire requis.",
    },
    {
      question: "Comment suivre mes tâches en cours ?",
      answer: "Connectez-vous à votre tableau de bord client pour voir l'état de vos demandes de service.",
    },
    {
      question: "Comment puis-je contacter le support ?",
      answer: "Vous pouvez nous contacter à contact@sotetel.com.tn ou appeler +216 71 135 100.",
    },
    {
      question: "Est-ce que mes informations sont sécurisées ?",
      answer: "Oui, nous utilisons des protocoles de sécurité modernes pour protéger toutes les données personnelles.",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted!");
  };

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const stats = [
  { icon: 'bi-people', count: 429, label: 'Collaborateurs' },
  { icon: 'bi-diagram-3', count: 30000, label: 'Km de fibre optique' },
  { icon: 'bi-broadcast-pin', count: 4200, label: 'Sites GSM maintenus' },
  { icon: 'bi-building', count: 3800, label: 'Tours installées' },
  { icon: 'bi-currency-dollar', count: 50000, label: 'Chiffre d’affaires (en MD)' },
  { icon: 'bi-cash-stack', count: 25000, label: 'Capital social (en MD)' },
];


  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Subscription request submitted!");
  };

  return (
    <div
      className="min-h-screen font-sans bg-cover bg-center relative"
      style={{ backgroundImage: "url('/assets/sotetel-bg.webp')" }}
    >
      

      <header className="fixed top-0 left-0 w-full z-50">
        

        {/* Navbar */}
        <Navbar showUI={showUI} />

      </header>

      <div className={`transition-all duration-300 ${showUI ? 'pt-[104px]' : 'pt-[40px]'}`}>
    {/* Hero Section */}

{/* Hero Section */}

<section
  id="hero"
  className="scroll-mt-[136px] relative z-10 min-h-screen flex items-center bg-[url('/assets/hero-illustration.jpg')] bg-no-repeat bg-center bg-cover"
>
  {/* Dark overlay to improve text visibility */}
  <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

  <div className="container mx-auto px-4 relative z-10">
    <div className="flex flex-col items-start justify-center min-h-screen">
      <div className="w-full lg:w-2/3 lg:ml-[5%] text-center lg:text-left" data-aos="zoom-out">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Sotetel, <span className="text-blue-300">bâtisseur de réseaux et solutions haut débit</span>
        </h1>
        <p className="text-lg mb-6 text-slate-100">
          Nous sommes une équipe d’experts en télécommunications vous apportant des solutions innovantes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start lg:ml-6">
          <Link
            to="/auth/clientregister"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition"
          >
            Commencer
          </Link>
          <button
            onClick={() => setShowVideo(true)}
            className="flex items-center justify-center gap-2 text-blue-300 hover:text-blue-100 font-semibold"
          >
            <i className="bi bi-play-circle text-2xl"></i>
            <span>Voir la vidéo</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>



{showVideo && (
 <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 animate-fade-in">
 <div className="relative w-full max-w-6xl rounded-xl overflow-hidden bg-black aspect-video shadow-2xl animate-zoom-in border border-white/10">
   <button
     onClick={() => setShowVideo(false)}
     className="absolute top-3 right-3 z-10 bg-white/10 hover:bg-white/20 p-1.5 rounded-full text-white"
   >
     <X className="w-5 h-5" />
   </button>
      <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
  <ReactPlayer
    url="https://www.youtube.com/watch?v=-fjPSYjMOO4"
    width="100%"
    height="100%"
    style={{ position: 'absolute', top: 0, left: 0 }}
    controls
    playing
  />
</div>


    </div>
  </div>
)}
{/* Section Statistiques */}
<section id="stats" className=" bg-white-100 py-16">
  <div className="container mx-auto px-4" data-aos="fade-up" data-aos-delay="100">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center text-gray-800">
      {stats.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <i className={`${item.icon} text-blue-600 text-5xl mb-4`} />
          <CountUp end={item.count} duration={2} separator=" ">
            {({ countUpRef }) => (
              <div ref={countUpRef} className="text-3xl font-bold mb-1" />
            )}
          </CountUp>
          <p className="text-lg">{item.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>


 {/* Actualités */}
{actualites.length > 0 && (
  <section className="relative bg-gray-100 py-16" data-aos="fade-up">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nos Actualités</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={true}
        speed={800}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {actualites.map((actu, index) => (
          <SwiperSlide key={index}>
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl cursor-pointer h-full flex flex-col">
    {actu.imageUrl && (
      <img
        src={`${API_BASE_URL}${actu.imageUrl}`}
        alt={actu.title}
        className="w-full h-48 object-cover"
      />
    )}
    <div className="p-6 flex flex-col flex-grow justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{actu.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-4">{actu.description}</p>
      </div>
      <div className="mt-4">
        <Link
          to={`/actualites/${actu._id}`}
          className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Voir détails
        </Link>
      </div>
    </div>
  </div>
</SwiperSlide>

        ))}
      </Swiper>
    </div>
  </section>
)}




 {/* FAQ Section */}
 <section id="faq" className="bg-white-100 py-20">
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Foire Aux Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-left">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <h3 className="text-lg font-semibold text-blue-700 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      

        {/* Scroll to Top */}
        <a
          href="#"
          id="scroll-top"
          className="fixed right-4 bottom-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all"
        >
          <i className="bi bi-arrow-up-short text-xl" />
        </a>
      
    </div>
      <Footer grayBackground />
    </div> 
  );
}


export default IndexPageClient
