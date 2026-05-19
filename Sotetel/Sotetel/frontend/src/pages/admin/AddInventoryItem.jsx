import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";


function AddInventoryItem() {
  const [form, setForm] = useState({
    name: '',
    quantity: '',
    unit: '',
    unitPrice: '',
    threshold: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      name: form.name.trim(),
      quantity: Number(form.quantity),
      unit: form.unit || 'pcs',
      unitPrice: Number(form.unitPrice),
      threshold: Number(form.threshold),
    };

    try {
      await api.post('/inventory', payload);
      navigate('/admin/inventory');
    } catch (err) {
      console.error('Error adding item:', err);
      setError(err.response?.data?.message || 'Failed to add item');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">➕ Add New Inventory Item</h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Item Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Unit (e.g., pcs, liters)</label>
            <input
              type="text"
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Unit Price ($)</label>
            <input
              type="number"
              name="unitPrice"
              value={form.unitPrice}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              step="0.01"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Threshold (Low Stock Alert)</label>
            <input
              type="number"
              name="threshold"
              value={form.threshold}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Item
        </button>
      </form>
    </div>
  );
}

export default AddInventoryItem;
