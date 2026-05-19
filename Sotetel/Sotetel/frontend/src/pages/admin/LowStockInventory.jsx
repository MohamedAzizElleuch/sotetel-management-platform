import { useEffect, useState } from "react";
import api from "../../services/api";

function LowStockInventory() {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await api.get("/inventory/low-stock");
        setLowStockItems(res.data);
      } catch (err) {
        console.error("Error fetching low stock items:", err);
      }
    };

    fetchLowStock();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-red-600">⚠️ Low Stock Items</h2>
      {lowStockItems.length === 0 ? (
        <p className="text-gray-600">All inventory is sufficiently stocked.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Threshold</th>
              <th className="p-2">Unit</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((item) => (
              <tr key={item._id} className="text-center border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-red-600 font-semibold">{item.quantity}</td>
                <td className="p-2">{item.threshold}</td>
                <td className="p-2">{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LowStockInventory;
