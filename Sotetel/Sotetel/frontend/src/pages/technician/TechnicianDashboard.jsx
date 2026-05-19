import { useEffect, useState } from 'react'
import api from '../../services/api.js'
import { Link } from 'react-router-dom'

function TechnicianDashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const res = await api.get('/tasks/my')
        setTasks(res.data)
      } catch (err) {
        console.error('Échec de récupération des tâches :', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMyTasks()
  }, [])

  const actions = [
    {
      label: 'Mon Profil',
      to: '/profile',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      label: 'Voir les tâches complétées',
      to: '/technician/completed',
      color: 'bg-green-600 hover:bg-green-700',
    },
  ]

  return (
    <div className="p-6 md:p-10 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-10 text-gray-800">
        Tableau de bord - Technicien
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {actions.map((action, index) => (
          <div key={index}>
            <Link
              to={action.to}
              className={`block text-center text-white px-6 py-4 rounded-2xl shadow-md transition font-semibold text-lg ${action.color}`}
            >
              {action.label}
            </Link>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Mes Interventions</h2>

        {loading ? (
          <p>Chargement des tâches...</p>
        ) : tasks.length === 0 ? (
          <p>Aucune tâche assignée pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white shadow-md rounded-lg p-4 border"
              >
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Client :</span>{' '}
                  {task.client?.name} ({task.client?.email})
                </p>
                <p className="text-sm">
                  <span className="font-medium">Statut :</span>{' '}
                  <span
                    className={`font-semibold ${
                      task.status === 'completed'
                        ? 'text-green-600'
                        : 'text-orange-600'
                    }`}
                  >
                    {task.status === 'completed' ? 'Complétée' : 'En cours'}
                  </span>
                </p>
                <Link
                  to={`/technician/task/${task._id}`}
                  className="inline-block mt-3 text-blue-600 hover:underline"
                >
                  ➤ Mettre à jour la tâche
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TechnicianDashboard
