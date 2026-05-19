import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchMessages, sendReplyEmail } from "@/services/api";
import { toast } from "react-toastify";

export default function AdminMessageDetail() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [showPrevious, setShowPrevious] = useState(false);

  const loadMessage = async () => {
    try {
      const res = await fetchMessages();
      const found = res.data.find((m) => m._id === id);
      if (found) {
        setMessage(found);
      }
      const related = res.data.filter((m) => m.email === found?.email);
      setAllMessages(related);
    } catch (error) {
      console.error("Error loading message:", error);
    }
  };

  useEffect(() => {
    loadMessage();
  }, [id]);

  const handleSend = async () => {
    try {
      await sendReplyEmail({
  messageId: message._id, // send the ID
  to: message.email,
  subject: "Réponse à votre message",
  text: reply,
});

      setReply("");
      setStatus("Réponse envoyée !");
      toast.success(`La réponse a été envoyée à ${message.email} 🎉`);
      await loadMessage();
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      toast.error("Échec de l'envoi de l'email.");
      setStatus("Échec de l'envoi.");
    }
  };

  const renderReplies = (replies) => {
    if (!Array.isArray(replies) || replies.length === 0) return null;
    return (
      <div className="mt-2 ml-4 p-2 bg-gray-100 rounded">
        <p className="text-xs text-gray-500 font-semibold">Réponses admin :</p>
        {replies.map((r, idx) => (
          <div key={idx} className="border-t pt-1 mt-1">
            <p className="whitespace-pre-line text-sm text-gray-700">{r.text}</p>
            {r.date && (
              <p className="text-xs text-gray-400 mt-1">
                {new Date(r.date).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (!message) {
    return <div className="p-6 text-center text-gray-500">Chargement…</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-indigo-700 mb-2">
          Message de {message.name}
        </h1>
        <p className="mb-1">
          <strong>Email:</strong> {message.email}
        </p>
        <p className="whitespace-pre-line mb-4">
          <strong>Message:</strong> {message.message}
        </p>
        {renderReplies(message.replies)}
      </div>

      <div>
        <Textarea
          placeholder="Écrire votre réponse ici..."
          className="mb-4"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <Button onClick={handleSend}>Envoyer</Button>
        {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
      </div>

      <div>
        <Button
          variant="outline"
          onClick={() => setShowPrevious(!showPrevious)}
          className="mt-6"
        >
          {showPrevious
            ? "Cacher les interactions"
            : "Afficher les interactions précédentes"}
        </Button>

        {showPrevious && (
          <div className="mt-4 space-y-4 bg-gray-50 rounded-lg p-4 border">
            <h2 className="text-lg font-semibold text-gray-700">
              Messages précédents de {message.email} :
            </h2>
            {allMessages
              .filter((m) => m._id !== id)
              .map((m) => (
                <div key={m._id} className="border-b pb-2 mb-2">
                  <p className="text-sm text-gray-600">
                    <strong>De :</strong> {m.name}
                  </p>
                  <p className="whitespace-pre-line text-gray-800">
                    {m.message}
                  </p>
                  {renderReplies(m.replies)}
                </div>
              ))}
            {allMessages.filter((m) => m._id !== id).length === 0 && (
              <p className="text-sm text-gray-500">
                Aucune interaction précédente trouvée.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
