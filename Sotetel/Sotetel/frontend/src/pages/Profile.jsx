import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setFormData({ name: res.data.name, email: res.data.email, password: '' });
      } catch (err) {
        console.error('❌ Erreur lors du chargement du profil:', err);
        setMessage("Impossible de charger le profil.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

      await api.put('/users/me', payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setMessage('✅ Profil mis à jour avec succès');
    } catch (err) {
      console.error('❌ Erreur de mise à jour:', err);
      setMessage('❌ Erreur lors de la mise à jour');
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) return <div className="p-4">Chargement du profil...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Mon Profil</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Nouveau mot de passe (optionnel)"
          className="w-full p-2 border rounded"
        />
        {message && (
          <p className="text-sm text-center text-blue-600 font-medium">{message}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Mettre à jour
        </button>
      </form>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Se déconnecter
      </button>
    </div>
  );
}

export default Profile;
