import { useEffect, useState } from 'react';
import api from '../../services/api';

function ClientQuoteResponses() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await api.get('/tasks?status=quote_sent');
        setTasks(res.data);
      } catch (err) {
        console.error('Erreur chargement des offres envoyées:', err);
      }
    };

    fetchQuotes();
  }, []);

  const respondToQuote = async (taskId, isAccepted) => {
    try {
      await api.put(`/tasks/${taskId}/respond-quote`, { accepted: isAccepted });
      alert(`Offre ${isAccepted ? 'acceptée' : 'refusée'} !`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Erreur lors de la réponse à l'offre:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Vos Offres Reçues</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600">Aucune offre en attente de réponse.</p>
      ) : (
        <div className="space-y-6">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <p className="mb-1">Prix proposé: <strong>{task.quotePrice} DT</strong></p>
              {task.quoteComment && (
                <p className="mb-2 italic text-sm text-gray-500">
                  « {task.quoteComment} »
                </p>
              )}
              <div className="flex gap-4">
                <button
                  onClick={() => respondToQuote(task._id, true)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Accepter
                </button>
                <button
                  onClick={() => respondToQuote(task._id, false)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Refuser
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientQuoteResponses;
