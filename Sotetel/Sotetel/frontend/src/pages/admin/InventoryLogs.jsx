import { useEffect, useState } from "react";
import api from "../../services/api";

function InventoryLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get("/inventory/logs");
        setLogs(res.data);
      } catch (err) {
        console.error("Error fetching inventory logs:", err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📋 Inventory Usage Logs</h2>
      {logs.length === 0 ? (
        <p>No usage logs available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Item</th>
                <th className="p-2">Quantity Used</th>
                <th className="p-2">Used By</th>
                <th className="p-2">Task</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="text-center border-t">
                  <td className="p-2">{log.item?.name}</td>
                  <td className="p-2">{log.quantity}</td>
                  <td className="p-2">{log.usedBy?.name} <br /> <span className="text-xs text-gray-500">{log.usedBy?.email}</span></td>
                  <td className="p-2">{log.task?.title}</td>
                  <td className="p-2">{new Date(log.usedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InventoryLogs;
