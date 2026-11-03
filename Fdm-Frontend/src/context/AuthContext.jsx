import { createContext, useContext, useState, useEffect } from 'react';
import {
  registerApi,
  loginApi,
  logoutApi,
  getMeApi,
  refreshApi,
} from '../api/authApi.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, try to silently restore the session using the httpOnly
  // refresh cookie (if the user closed the tab but the cookie is still valid).
  useEffect(() => {
    async function restoreSession() {
      try {
        await refreshApi();
        const me = await getMeApi();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function login({ email, password }) {
    const loggedInUser = await loginApi({ email, password });
    setUser(loggedInUser);
    return loggedInUser;
  }

  async function register({ name, email, password, role }) {
    const newUser = await registerApi({ name, email, password, role });
    setUser(newUser);
    return newUser;
  }

  async function logout() {
    await logoutApi();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}