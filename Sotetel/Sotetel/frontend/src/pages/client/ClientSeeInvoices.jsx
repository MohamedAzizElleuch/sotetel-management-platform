import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../services/api";
import { format } from "date-fns";

const ClientSeeInvoices = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    const fetchInvoices = async () => {
      try {
        const res = await axios.get(`/invoices/my`);
        setInvoices(res.data);
      } catch (err) {
        console.error("❌ Error fetching invoices:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchInvoices();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const downloadPdf = async (invoiceId) => {
    try {
      const res = await axios.get(`/invoices/${invoiceId}/pdf`, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `facture-${invoiceId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Only show error if response status is not 200-range (e.g., 404 or 500)
      if (!err?.response || err.response.status >= 400) {
        console.error("❌ Error downloading PDF:", err);
        alert("Erreur lors du téléchargement de la facture.");
      }
    }
  };

  if (authLoading) {
    return <p>Chargement du profil utilisateur...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Mes Factures</h1>

      {loading ? (
        <p>Chargement des factures...</p>
      ) : invoices.length === 0 ? (
        <p>Aucune facture trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {invoices.map((invoice) => (
            <div
              key={invoice._id}
              className="border rounded-xl p-4 shadow bg-white"
            >
              <h3 className="text-lg font-semibold">
                {invoice.client?.name || "Nom du client inconnu"}
              </h3>
              <p className="text-sm text-gray-500">
                Date:{" "}
                {invoice.issuedAt
                  ? format(new Date(invoice.issuedAt), "dd/MM/yyyy")
                  : "Date inconnue"}
              </p>
              <p
                className={`text-sm mt-2 font-medium ${
                  invoice.status === "paid"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                Statut: {invoice.status}
              </p>
              <p className="text-sm mt-2">
                Total: {invoice.amount} {invoice.currency || "TND"}
              </p>

              <button
                onClick={() => downloadPdf(invoice._id)}
                className="mt-3 text-blue-600 underline"
              >
                Télécharger la facture PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientSeeInvoices;
