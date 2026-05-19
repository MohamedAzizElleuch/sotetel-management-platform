import { useEffect, useState } from 'react';
import API from '@/services/api';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

export default function MarkPaidInvoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchUnpaid = async () => {
      try {
        const res = await API.get('/invoices/unpaid');
        setInvoices(res.data);
      } catch {
        toast.error('Erreur lors du chargement des factures non payées');
      }
    };
    fetchUnpaid();
  }, []);

  const markAsPaid = async (id) => {
    try {
      await API.put(`/invoices/${id}/mark-paid`);
      toast.success('Facture marquée comme payée et renvoyée');
      setInvoices((prev) => prev.filter((inv) => inv._id !== id));
    } catch {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Factures non payées</h2>
      {invoices.length === 0 ? (
        <p>Aucune facture à marquer comme payée.</p>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Client</th>
              <th className="p-2">Montant</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id} className="border-t">
                <td className="p-2">{invoice._id.slice(-6)}</td>
                <td className="p-2">{invoice.overriddenClientName || invoice.client?.name}</td>
                <td className="p-2">{invoice.amount?.toFixed(2)} TND</td>
                <td className="p-2">
                  <Button onClick={() => markAsPaid(invoice._id)} className="bg-blue-600 text-white">
                    Marquer comme payée
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
