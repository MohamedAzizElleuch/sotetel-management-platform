import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import { Link } from 'react-router-dom';

function TechnicianCompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const res = await api.get('/tasks/completed'); // ✅ Corrected endpoint
        setCompletedTasks(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des tâches complétées :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tâches Complétées</h1>

      <Link
        to="/technician/dashboard"
        className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-6"
      >
        ← Retour au tableau de bord
      </Link>

      {loading ? (
        <p>Chargement...</p>
      ) : completedTasks.length === 0 ? (
        <p>Vous n’avez pas encore de tâches complétées.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedTasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded shadow border">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm mt-1">
                <span className="font-medium">Client :</span> {task.client?.name} ({task.client?.email})
              </p>
              <p className="text-sm text-green-600 font-medium mt-1">✅ Tâche complétée</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TechnicianCompletedTasks;
