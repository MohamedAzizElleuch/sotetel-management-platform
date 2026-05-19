import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TechnicianTaskUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');
  const [inventoryItems, setInventoryItems] = useState([]);
  const [materialsUsed, setMaterialsUsed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskRes = await api.get(`/tasks/my`);
        const foundTask = taskRes.data.find((t) => t._id === id);
        if (foundTask) {
          setTask(foundTask);
          setStatus(foundTask.status || '');

          // Prefill existing materials if already used
          if (foundTask.materialsUsed && foundTask.materialsUsed.length > 0) {
            setMaterialsUsed(
              foundTask.materialsUsed.map((m) => ({
                itemId: m.item,
                quantity: m.quantity,
              }))
            );
          }
        } else {
          toast.error('Tâche non trouvée ou non autorisée');
        }

        const inventoryRes = await api.get(`/inventory`);
        setInventoryItems(inventoryRes.data);
      } catch (err) {
        toast.error('Erreur lors du chargement des données');
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleAddMaterial = () => {
    setMaterialsUsed([...materialsUsed, { itemId: '', quantity: 1 }]);
  };

  const handleMaterialChange = (index, field, value) => {
    const updated = [...materialsUsed];
    updated[index][field] = value;
    setMaterialsUsed(updated);
  };

  const handleRemoveMaterial = (index) => {
    const updated = [...materialsUsed];
    updated.splice(index, 1);
    setMaterialsUsed(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) {
      return toast.warning('Veuillez sélectionner un statut');
    }

    for (const material of materialsUsed) {
      if (!material.itemId || material.quantity < 1) {
        return toast.warning('Veuillez remplir correctement tous les matériaux');
      }
    }

    try {
      const formattedMaterials = materialsUsed.map((m) => ({
        item: m.itemId,
        quantity: Number(m.quantity),
      }));

      await api.put(`/tasks/${id}/status`, {
        status,
        materialsUsed: formattedMaterials,
      });

      toast.success('Tâche mise à jour avec succès !');
      setTimeout(() => navigate('/technician/dashboard'), 1500);
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement");
      console.error(err);
    }
  };

  if (!task) return <div className="p-6">Chargement de la tâche...</div>;

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Mettre à jour la tâche</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block font-semibold">Titre</label>
          <p className="border p-2 rounded bg-gray-100">{task.title}</p>
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <p className="border p-2 rounded bg-gray-100">{task.description}</p>
        </div>

        <div>
          <label className="block font-semibold">Statut</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">-- Choisir un statut --</option>
            <option value="in-progress">En cours</option>
            <option value="completed">Terminée</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Matériaux utilisés</label>
          {materialsUsed.map((material, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <select
                className="border rounded px-2 py-1 w-full"
                value={material.itemId}
                onChange={(e) => handleMaterialChange(index, 'itemId', e.target.value)}
              >
                <option value="">-- Sélectionner un item --</option>
                {inventoryItems.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name} ({item.quantity} {item.unit})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={1}
                className="border rounded px-2 py-1 w-24"
                value={material.quantity}
                onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemoveMaterial(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMaterial}
            className="text-blue-600 hover:underline text-sm"
          >
            + Ajouter un matériau
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default TechnicianTaskUpdate;
