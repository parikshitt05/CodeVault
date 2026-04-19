import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const register = async (formData) => {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    return data;
  };

  const login = async (formData) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchMe = async () => {
    try {
      const data = await apiFetch("/auth/me");
      setUser(data.user);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthLoading(false);
      return;
    }

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        register,
        login,
        logout,
        fetchMe,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);