import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function ClientTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks/client');
        setTasks(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des tâches :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes Tâches</h1>

      <Link
        to="/client/dashboard"
        className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
      >
        ← Retour au tableau de bord
      </Link>

      {loading ? (
        <p>Chargement...</p>
      ) : tasks.length === 0 ? (
        <p>Vous n’avez pas encore créé de tâches.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="border rounded p-4 shadow">
              <h2 className="font-semibold text-lg">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">Statut : <strong>{task.status}</strong></p>
              {task.technician && (
                <p className="text-sm mt-1">
                  <span className="font-medium">Technicien :</span> {task.technician.name} ({task.technician.email})
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientTasks;
