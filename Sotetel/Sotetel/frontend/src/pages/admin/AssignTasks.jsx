import { useEffect, useState } from 'react';
import api from '../../services/api';

function AssignTasks() {
  const [view, setView] = useState('unassigned'); // 'unassigned' or 'assigned'
  const [tasks, setTasks] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [assigningTaskId, setAssigningTaskId] = useState(null);
  const [selections, setSelections] = useState({});

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async () => {
    try {
      const taskUrl =
        view === 'unassigned'
          ? '/tasks?status=quote_accepted'
          : '/tasks?assigned=true'; // fetch all assigned tasks

      const [taskRes, techRes] = await Promise.all([
        api.get(taskUrl),
        api.get('/users?role=technician'),
      ]);

      setTasks(taskRes.data);
      setTechnicians(
        techRes.data.sort((a, b) => a.name.localeCompare(b.name))
      );
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
    }
  };

  const handleSelectionChange = (taskId, field, value) => {
    setSelections((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value,
      },
    }));
  };

  const handleAssign = async (taskId) => {
    const selection = selections[taskId];
    if (!selection?.technicianId || !selection?.date) {
      alert('Veuillez sélectionner un technicien et une date.');
      return;
    }

    setAssigningTaskId(taskId);

    try {
      await api.put(`/tasks/${taskId}/assign`, {
        technicianId: selection.technicianId,
        scheduledDate: selection.date,
      });

      alert('✅ Tâche assignée avec succès.');

      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      setSelections((prev) => {
        const updated = { ...prev };
        delete updated[taskId];
        return updated;
      });
    } catch (err) {
      console.error("Erreur lors de l’assignation de la tâche:", err);
      alert("❌ Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setAssigningTaskId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {view === 'unassigned' ? 'Assigner des Tâches' : 'Tâches Déjà Assignées'}
        </h1>
        <button
          className="text-blue-600 hover:underline"
          onClick={() =>
            setView((prev) => (prev === 'unassigned' ? 'assigned' : 'unassigned'))
          }
        >
          {view === 'unassigned'
            ? 'Voir les tâches déjà assignées'
            : 'Voir les tâches non assignées'}
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-600">Aucune tâche à afficher.</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => (
            <li key={task._id} className="border p-4 rounded shadow">
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{task.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Client: {task.client?.name || 'Inconnu'} | Statut: {task.status}
              </p>

              {view === 'unassigned' ? (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <select
                    className="border p-2 rounded"
                    onChange={(e) =>
                      handleSelectionChange(task._id, 'technicianId', e.target.value)
                    }
                    value={selections[task._id]?.technicianId || ''}
                  >
                    <option value="" disabled>
                      Sélectionner un technicien
                    </option>
                    {technicians.map((tech) => (
                      <option key={tech._id} value={tech._id}>
                        {tech.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="date"
                    className="border p-2 rounded"
                    value={selections[task._id]?.date || ''}
                    onChange={(e) =>
                      handleSelectionChange(task._id, 'date', e.target.value)
                    }
                  />

                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    onClick={() => handleAssign(task._id)}
                    disabled={assigningTaskId === task._id}
                  >
                    {assigningTaskId === task._id ? 'Assignation...' : 'Confirmer'}
                  </button>
                </div>
              ) : (
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Technicien :</span>{' '}
                    {task.technician?.name || 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium">Email :</span>{' '}
                    {task.technician?.email || 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium">Prévu le :</span>{' '}
                    {task.scheduledDate
                      ? new Date(task.scheduledDate).toLocaleDateString()
                      : 'Non spécifié'}
                  </p>
                  <p>
                    <span className="font-medium">Statut :</span>{' '}
                    {task.status}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AssignTasks;
