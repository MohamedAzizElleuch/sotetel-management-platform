import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminInvoiceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [lineItems, setLineItems] = useState([]);
  const [materialItems, setMaterialItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [laborCost, setLaborCost] = useState(0);
  const [markup, setMarkup] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/invoices/${id}`);
        const inv = await API.get("/inventory");
        const current = res.data;
        if (!current) return toast.error("Facture introuvable");
        setInvoice(current);
        setLineItems(current.lineItems || []);
        setMaterialItems(current.materialItems || []);
        setLaborCost(current.laborCost || 0);
        setMarkup(current.markup || 0);
        setInventory(inv.data || []);
      } catch (err) {
        toast.error("Erreur lors du chargement");
      }
    };
    fetchData();
  }, [id]);

  const handleChangeItem = (index, field, value) => {
    const updated = [...lineItems];
    updated[index][field] = field === "name" ? value : parseFloat(value);
    updated[index].total = updated[index].quantity * updated[index].unitPrice;
    setLineItems(updated);
  };

  const handleAddItem = () => {
    setLineItems([...lineItems, { name: "", quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const updated = [...lineItems];
    updated.splice(index, 1);
    setLineItems(updated);
  };

  const handleAddMaterialItem = () => {
    setMaterialItems([
      ...materialItems,
      { name: "", quantity: 1, unitPrice: 0, unit: "", total: 0 },
    ]);
  };

  const handleMaterialChange = (index, field, value) => {
    const updated = [...materialItems];
    if (field === "name" || field === "unit") {
      updated[index][field] = value;
    } else {
      updated[index][field] = parseFloat(value) || 0;
    }
    const item = updated[index];
    item.total = (item.quantity || 0) * (item.unitPrice || 0);
    setMaterialItems(updated);
  };

  const handleRemoveMaterialItem = (index) => {
    const updated = [...materialItems];
    updated.splice(index, 1);
    setMaterialItems(updated);
  };

  const validateInputs = () => {
    const err = {};
    lineItems.forEach((item, i) => {
      if (!item.name) err[`name-${i}`] = "Nom requis";
      if (item.quantity <= 0) err[`qty-${i}`] = "Min 1";
      if (item.unitPrice < 0) err[`price-${i}`] = "Min 0";
    });
    materialItems.forEach((item, i) => {
      if (!item.name) err[`mname-${i}`] = "Nom requis";
      if (item.quantity <= 0) err[`mqty-${i}`] = "Min 1";
      if (item.unitPrice < 0) err[`mprice-${i}`] = "Min 0";
    });
    if (laborCost < 0) err.laborCost = "Min 0";
    if (markup < 0) err.markup = "Min 0";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = async () => {
    if (!validateInputs()) {
      toast.warn("Corrigez les erreurs avant de sauvegarder.");
      return;
    }

    try {
      await API.put(`/invoices/${id}/edit`, {
        lineItems,
        laborCost,
        markup,
        materialItems,
      });
      toast.success("Modifications enregistrées !");
    } catch (err) {
      toast.error("Erreur lors de la sauvegarde.");
    }
  };

  const handleFinalize = async () => {
    try {
      await API.put(`/invoices/${id}/finalize`);
      toast.success("Facture finalisée et envoyée !");
      navigate("/clientseeinvoices");
    } catch (err) {
      toast.error("Erreur lors de la finalisation.");
    }
  };

  if (!invoice) return <p className="text-center mt-10 text-gray-600">Chargement…</p>;

  const totalManual = lineItems.reduce((sum, item) => sum + item.total, 0);
  const totalMaterials = materialItems.reduce((sum, item) => sum + item.total, 0);
  const finalTotal = totalManual + totalMaterials + Number(laborCost) + Number(markup);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Modifier la facture</h2>

      <div className="bg-white shadow-md p-4 rounded-lg mb-6 border">
        <p><strong>Client:</strong> {invoice.overriddenClientName || invoice.client?.name || "N/A"}</p>
        <p><strong>Email:</strong> {invoice.overriddenClientEmail || invoice.client?.email || "N/A"}</p>
        <p><strong>Tâche:</strong> {invoice.task?.title || "N/A"}</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">Achats consommés</h3>
      {lineItems.map((item, index) => (
        <div key={index} className="grid grid-cols-6 gap-2 items-center mb-2">
          <input
            type="text"
            className="col-span-2 input input-bordered"
            placeholder="Nom"
            value={item.name}
            onChange={(e) => handleChangeItem(index, "name", e.target.value)}
          />
          <input
            type="number"
            min="1"
            className="input input-bordered"
            placeholder="Quantité"
            value={item.quantity}
            onChange={(e) => handleChangeItem(index, "quantity", e.target.value)}
          />
          <input
            type="number"
            min="0"
            className="input input-bordered"
            placeholder="Prix unitaire"
            value={item.unitPrice}
            onChange={(e) => handleChangeItem(index, "unitPrice", e.target.value)}
          />
          <span>{item.total.toFixed(2)} €</span>
          <button className="btn btn-sm btn-error" onClick={() => handleRemoveItem(index)}>🗑</button>
        </div>
      ))}
      <button className="btn btn-outline mb-6" onClick={handleAddItem}>➕ Ajouter une ligne</button>

      <h3 className="text-lg font-semibold mb-2">Prestations personnalisées</h3>
      {materialItems.map((item, index) => (
        <div key={index} className="grid grid-cols-6 gap-2 items-center mb-2">
          <input
            type="text"
            className="input input-bordered"
            placeholder="Nom"
            value={item.name}
            onChange={(e) => handleMaterialChange(index, "name", e.target.value)}
          />
          <input
            type="number"
            min="1"
            className="input input-bordered"
            placeholder="Quantité"
            value={item.quantity}
            onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
          />
          <input
            type="number"
            min="0"
            className="input input-bordered"
            placeholder="Prix unitaire"
            value={item.unitPrice}
            onChange={(e) => handleMaterialChange(index, "unitPrice", e.target.value)}
          />
          <input
            type="text"
            className="input input-bordered"
            placeholder="Unité (ex: km, m²)"
            value={item.unit}
            onChange={(e) => handleMaterialChange(index, "unit", e.target.value)}
          />
          <span>{item.total?.toFixed(2) || "0.00"} €</span>
          <button className="btn btn-sm btn-error" onClick={() => handleRemoveMaterialItem(index)}>🗑</button>
        </div>
      ))}
      <button className="btn btn-outline mb-6" onClick={handleAddMaterialItem}>➕ Ajouter une ligne</button>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Prestation (€)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={laborCost}
            onChange={(e) => setLaborCost(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Majoration (€)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={markup}
            onChange={(e) => setMarkup(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-6 text-right text-lg font-bold">
        Total: {finalTotal.toFixed(2)} €
      </div>

      <div className="flex justify-between mt-4">
        <button className="btn btn-success" onClick={handleSave}>💾 Enregistrer</button>
        <button className="btn btn-warning" onClick={() => setShowConfirm(true)}>✅ Finaliser</button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Confirmer la finalisation ?</h3>
            <p className="mb-4">Cette action enverra la facture au client et la rendra non modifiable.</p>
            <div className="flex justify-end gap-4">
              <button className="btn btn-outline" onClick={() => setShowConfirm(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={handleFinalize}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInvoiceEdit;
