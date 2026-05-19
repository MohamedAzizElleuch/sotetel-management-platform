import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditInventoryItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    unit: "pcs",
    unitPrice: 0,
    threshold: 5,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/inventory/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching item:", err);
        alert("Item not found");
        navigate("/admin/inventory");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "unitPrice" || name === "threshold"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/inventory/${id}`, formData);
      alert("Item updated!");
      navigate("/admin/inventory");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating item");
    }
  };

  if (loading) return <p className="p-4">Loading item...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Inventory Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          placeholder="Unit"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleChange}
          placeholder="Unit Price"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="threshold"
          value={formData.threshold}
          onChange={handleChange}
          placeholder="Threshold"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditInventoryItem;
