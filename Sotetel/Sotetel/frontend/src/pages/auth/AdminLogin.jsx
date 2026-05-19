import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    console.log('🧩 AdminLogin component mounted');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('📤 Submitting login with:', { email, password });

    try {
      const { token, user } = await loginUser(email, password);
      console.log('✅ Login success:', user);

      if (!['admin', 'technician'].includes(user.role)) {
        console.warn('⛔ Access denied for role:', user.role);
        setError('Access denied. Only internal users can log in here.');
        return;
      }

      login({ ...user, token });
      console.log('🔐 User stored in auth context');

      if (user.role === 'admin') {
        console.log('➡️ Navigating to /admin/dashboard');
        navigate('/admin/dashboard');
      } else if (user.role === 'technician') {
        console.log('➡️ Navigating to /technician/dashboard');
        navigate('/technician/dashboard');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h2 className="text-2xl font-bold mb-4">Internal Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => {
            console.log('✏️ Email changed:', e.target.value);
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => {
            console.log('🔐 Password input changed');
            setPassword(e.target.value);
          }}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
