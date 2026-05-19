import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function OffresDePrix() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [quoteInputs, setQuoteInputs] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await api.get('/tasks?status=pending_quote');
        setTasks(res.data);
      } catch (err) {
        console.error('❌ Erreur lors du chargement des tâches :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleInputChange = (taskId, field, value) => {
    setQuoteInputs((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value,
      },
    }));
  };

  const sendQuote = async (taskId) => {
    const quote = quoteInputs[taskId];
    if (!quote?.quotePrice) {
      alert('Veuillez entrer un montant.');
      return;
    }

    try {
      await api.put(`/tasks/${taskId}/send-quote`, {
        quotePrice: quote.quotePrice,
        quoteComment: quote.quoteComment || '',
      });
      alert('Offre envoyée avec succès !');
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("❌ Erreur lors de l'envoi de l'offre :", err);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Offres de Prix à Traiter
      </h1>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-600">
          Aucune demande d'offre en attente.
        </p>
      ) : (
        <div className="space-y-8">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-6 rounded-xl shadow-md space-y-4"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
                <p className="text-gray-700 mt-1">{task.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Montant proposé (DT)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 350"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleInputChange(task._id, 'quotePrice', e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commentaire facultatif
                </label>
                <textarea
                  rows={4}
                  placeholder="Ajouter un commentaire (facultatif)"
                  className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleInputChange(task._id, 'quoteComment', e.target.value)
                  }
                />
              </div>

              <div className="text-right">
                <Button onClick={() => sendQuote(task._id)}>
                  Envoyer l&apos;Offre
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OffresDePrix;
