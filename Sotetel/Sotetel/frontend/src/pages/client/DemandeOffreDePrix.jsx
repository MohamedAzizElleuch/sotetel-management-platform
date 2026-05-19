import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function DemandeOffreDePrix() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description, type: 'quote_request' });
      alert('Demande envoyée avec succès !');
      navigate('/client/dashboard');
    } catch (err) {
      console.error("Erreur lors de l'envoi de la demande :", err);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Demander une Offre de Prix
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
               Titre de la demande
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Réparation du système électrique"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Détails de la demande
          </label>
          <textarea
            rows={12}
            className="w-full border border-gray-300 rounded px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Décrivez le besoin ou la tâche souhaitée..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Envoyer la Demande
          </button>
        </div>
      </form>
    </div>
  );
}

export default DemandeOffreDePrix;
