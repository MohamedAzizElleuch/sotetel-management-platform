import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ActualiteDetail = () => {
  const { id } = useParams();
  const [actu, setActu] = useState(null);

  useEffect(() => {
    const fetchActu = async () => {
      try {
        const { data } = await api.get(`/actualites/${id}`);
        setActu(data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'actualité :", error);
      }
    };
    fetchActu();
  }, [id]);

  if (!actu) return <p className="p-6">Chargement...</p>;

  return (
    <div className="p-6 md:p-10 bg-muted min-h-screen">
      <Card className="max-w-3xl mx-auto p-6 space-y-4">
        {actu.imageUrl && (
          <img
            src={`${API_BASE_URL}${actu.imageUrl}`}
            alt={actu.title}
            className="w-full max-h-[400px] object-cover rounded-xl"
          />
        )}
        <CardContent className="space-y-4">
          <h1 className="text-3xl font-bold">{actu.title}</h1>
          <p className="text-base text-muted-foreground whitespace-pre-line">
            {actu.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActualiteDetail;
