import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar"; // Ensure this is the correct path
import Footer from '../components/Footer';  
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Actualite = () => {
  const [actualites, setActualites] = useState([]);
  const navigate = useNavigate();
  const showUI = true;

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
  }, []);

  return (
    <div className="bg-muted min-h-screen">
      {/* Navbar */}
        <Navbar showUI={false} />

      {/* Secondary Navbar */}
      <section
        className="relative h-60 flex items-center justify-start px-10 mt-16"
        style={{
          backgroundImage: "url('/assets/about-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/70 p-4 rounded-lg ml-32">
          <h1 className="text-3xl font-extrabold text-red-600 mb-2">À propos</h1>
          <nav className="text-sm text-black space-x-2">
            <a href="/client" className="underline text-black hover:text-red-600">Accueil</a>
            <span className="text-black">›</span>
            <a href="/client" className="underline text-black hover:text-red-600">Sotetel</a>
            <span className="text-black">›</span>
            <a href="/actualites" className="underline text-black hover:text-red-600">Actualités</a>
          </nav>
        </div>
      </section>

      {/* Actualités grid */}
      <div className="p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Actualités</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actualites.map((actu) => (
            <Card
              key={actu._id}
              className="rounded-2xl border shadow-sm cursor-pointer hover:shadow-md transition"
              onClick={() => navigate(`/actualites/${actu._id}`)}
            >
              <CardContent className="p-4">
                {actu.imageUrl && (
                  <img
                    src={`${API_BASE_URL}${actu.imageUrl}`}
                    alt={actu.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <h2 className="font-bold text-lg">{actu.title}</h2>
                <p className="text-sm text-muted-foreground">{actu.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
         <Footer />
    </div>
  );
};

export default Actualite;
