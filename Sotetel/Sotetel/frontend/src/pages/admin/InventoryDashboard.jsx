import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function InventoryDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await api.get('/inventory');
      setItems(res.data);
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
      window.alert('❌ Failed to load inventory items.');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await api.delete(`/inventory/${id}`);
      setItems(items.filter((item) => item._id !== id));
      window.alert('✅ Item deleted successfully.');
    } catch (err) {
      console.error('Failed to delete item:', err);
      window.alert('❌ Failed to delete item.');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Gestion d'inventaire</h1>

        <div className="flex gap-2 flex-wrap">
          <Link to="/admin/inventory/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            ➕ Ajouter un article
          </Link>
          <Link to="/admin/inventory/logs" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            📄 Voir les logs
          </Link>
          <Link to="/admin/inventory/low-stock" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            ⚠️ Stocks faibles
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2">Nom</th>
              <th className="p-2">Quantité</th>
              <th className="p-2">Unité</th>
              <th className="p-2">Prix Unitaire</th>
              <th className="p-2">Seuil</th>
              <th className="p-2">Dernière maj</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.unit}</td>
                <td className="p-2">${item.unitPrice?.toFixed(2)}</td>
                <td className="p-2">{item.threshold}</td>
                <td className="p-2">{new Date(item.lastUpdated).toLocaleString()}</td>
                <td className="p-2 space-x-2">
                  <Link
                    to={`/admin/inventory/edit/${item._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className={`text-red-600 hover:underline ${deletingId === item._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={deletingId === item._id}
                  >
                    {deletingId === item._id ? 'Suppression...' : 'Supprimer'}
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  Aucun article trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryDashboard;
