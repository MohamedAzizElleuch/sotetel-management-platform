import { useState, useEffect, useRef } from "react";
import api from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ManageActualites = () => {
  const [actualites, setActualites] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [localImage, setLocalImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const dropRef = useRef(null);

  const fetchActualites = async () => {
    try {
      const { data } = await api.get("/actualites");
      setActualites(data);
    } catch (err) {
      console.error("Erreur de récupération des actualités:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setLocalImage(file);
      setImageUrl("");
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (localImage) {
      formData.append("image", localImage);
    } else {
      formData.append("imageUrl", imageUrl);
    }

    try {
      if (editingId) {
        await api.put(`/actualites/${editingId}`, formData);
      } else {
        await api.post("/actualites", formData);
      }

      setTitle("");
      setDescription("");
      setImageUrl("");
      setLocalImage(null);
      setPreviewUrl("");
      setEditingId(null);
      fetchActualites();
    } catch (err) {
      console.error("Erreur d'ajout/mise à jour de l’actualité:", err);
    }
  };

  const handleEdit = (actu) => {
    setEditingId(actu._id);
    setTitle(actu.title);
    setDescription(actu.description);
    setImageUrl(actu.imageUrl || "");
    setLocalImage(null);
    setPreviewUrl(
      actu.imageUrl?.startsWith("http")
        ? actu.imageUrl
        : `${API_BASE_URL}${actu.imageUrl}`
    );
  };

  const handleDelete = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer cette actualité ?")) {
      try {
        await api.delete(`/actualites/${id}`);
        fetchActualites();
      } catch (err) {
        console.error("Erreur de suppression:", err);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  useEffect(() => {
    fetchActualites();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gérer les Actualités</h1>

      <form onSubmit={handleAddOrUpdate} className="space-y-4">
        <Input
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          placeholder="URL de l'image (optionnel si importée)"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setLocalImage(null);
            setPreviewUrl(e.target.value);
          }}
        />
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border border-dashed border-gray-400 rounded p-4 text-center"
        >
          <p className="text-sm mb-2">Glissez une image ici ou importez-la</p>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Aperçu"
              className="mt-4 w-full max-h-60 object-contain rounded"
            />
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit">
            {editingId ? "Mettre à jour l’actualité" : "Ajouter l’actualité"}
          </Button>
          {editingId && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setDescription("");
                setImageUrl("");
                setLocalImage(null);
                setPreviewUrl("");
              }}
            >
              Annuler
            </Button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {actualites.map((actu) => (
          <Card key={actu._id}>
            <CardContent className="p-4 space-y-2">
              {actu.imageUrl && (
                <img
                  src={
                    actu.imageUrl.startsWith("http")
                      ? actu.imageUrl
                      : `${API_BASE_URL}${actu.imageUrl}`
                  }
                  alt={actu.title}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h2 className="font-bold">{actu.title}</h2>
              <p>{actu.description}</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={() => handleEdit(actu)}>
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(actu._id)}
                >
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageActualites;
