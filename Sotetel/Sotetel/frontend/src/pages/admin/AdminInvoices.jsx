import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';
import { Button } from '@/components/ui/button';

export default function AdminInvoices() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await axios.get('/invoices/drafts');
        setDrafts(res.data);
      } catch (err) {
        console.error('Error fetching draft invoices:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrafts();
  }, []);

  const handleFinalize = async (id) => {
    if (!window.confirm('Finalize and send this invoice to the client?')) return;
    try {
      await axios.put(`/invoices/${id}/finalize`);
      setDrafts((prev) => prev.filter((inv) => inv._id !== id));
      alert('Invoice finalized and emailed to client.');
    } catch (err) {
      console.error(err);
      alert('Failed to finalize invoice.');
    }
  };

  const handleEditClick = (invoiceId) => {
    navigate(`/admin/invoices/edit/${invoiceId}`);
  };

  if (loading) return <p>Chargement des factures...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Factures en brouillon</h2>

      {drafts.length === 0 ? (
        <p>Aucune facture en brouillon.</p>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Client</th>
              <th className="p-2">Montant</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drafts.map((invoice) => (
              <tr key={invoice._id} className="border-t">
                <td className="p-2">{invoice._id.slice(-6)}</td>
                <td className="p-2">
                  {invoice.overriddenClientName || invoice.client?.name}
                </td>
                <td className="p-2">${invoice.amount?.toFixed(2)}</td>
                <td className="p-2">{invoice.status}</td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <Button variant="outline" onClick={() => handleEditClick(invoice._id)}>
                    Modifier
                  </Button>
                  <Button
                    onClick={() => handleFinalize(invoice._id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Finaliser
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
