import { Link } from 'react-router-dom';

function ClientDashboard() {
  const actions = [
    {
      label: 'Mon Profil',
      to: '/profile',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      label: 'Demander une offre de prix',
      to: '/client/task/create',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      label: 'Voir les tâches',
      to: '/client/tasks',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      label: 'Voir les factures',
      to: '/client/invoices',
      color: 'bg-yellow-500 hover:bg-yellow-600',
    },
    {
      label: 'Voir les Offres de Prix',
      to: '/client/quotes',
      color: 'bg-indigo-500 hover:bg-indigo-600',
    },
  ];

  return (
    <div className="p-6 md:p-10 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-10 text-gray-800">
        Tableau de bord (Client)
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
    </div>
  );
}

export default ClientDashboard;
