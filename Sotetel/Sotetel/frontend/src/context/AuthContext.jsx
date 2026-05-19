import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export { AuthContext };


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (error) {
        console.error('❌ Error parsing stored user:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    try {
      sessionStorage.setItem('user', JSON.stringify(userData));
      if (userData.token) {
        sessionStorage.setItem('token', userData.token);
      }
    } catch (error) {
      console.error('❌ Error saving to sessionStorage:', error);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
