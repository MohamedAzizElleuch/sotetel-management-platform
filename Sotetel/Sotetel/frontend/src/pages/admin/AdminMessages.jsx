import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchMessages } from "@/services/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filter, setFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchMessages()
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Failed to fetch messages", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const matchesFilter = (msg) => {
    const term = filter.toLowerCase();
    if (filterType === "name") return msg.name?.toLowerCase().startsWith(term);
    if (filterType === "email") return msg.email?.toLowerCase().startsWith(term);
    if (filterType === "subject") return msg.subject?.toLowerCase().startsWith(term);
    if (filterType === "message") return msg.message?.toLowerCase().startsWith(term);
    return [msg.name, msg.email, msg.subject, msg.message]
      .join(" ")
      .toLowerCase()
      .includes(term);
  };

  const filteredMessages = messages.filter(matchesFilter);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">📥 Messages reçus</h1>

      <div className="flex gap-4 mb-6 relative">
        <div ref={dropdownRef} className="relative">
          <Button
            variant="outline"
            className="w-[160px]"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {filterType === "all"
              ? "Tous les champs"
              : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </Button>

          {showDropdown && (
            <div className="absolute z-10 mt-2 w-[160px] rounded-md border bg-white shadow">
              {[
                { label: "Tous les champs", value: "all" },
                { label: "Nom", value: "name" },
                { label: "Email", value: "email" },
                { label: "Sujet", value: "subject" },
                { label: "Message", value: "message" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setFilterType(opt.value);
                    setShowDropdown(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    filterType === opt.value ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Input
          type="text"
          placeholder={`Rechercher par ${
            filterType === "all" ? "n'importe quel champ" : filterType
          }...`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1"
        />
      </div>

      {filteredMessages.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">Aucun message trouvé.</div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => {
            const isExpanded = expandedId === msg._id;
            return (
              <div
                key={msg._id}
                className="p-5 rounded-2xl border shadow-sm bg-white transition hover:shadow-md cursor-pointer"
                onClick={() =>
                  setExpandedId((prev) => (prev === msg._id ? null : msg._id))
                }
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-indigo-600 truncate max-w-[75%]">
                    {msg.subject || "Sans sujet"}
                  </h2>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1 truncate">
                  <strong>De:</strong> {msg.name || "Anonyme"}
                </p>
                {isExpanded && (
                  <>
                    <p className="text-sm text-gray-500 mb-2">
                      <strong>Email:</strong> {msg.email || "Email inconnu"}
                    </p>
                    <p className="text-gray-800 whitespace-pre-line">{msg.message}</p>
<a
  href={`/admin/messages/${msg._id}`}
  className="inline-block mt-2 text-sm text-indigo-600 underline hover:text-indigo-800"
>
  Voir plus →
</a>

                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
