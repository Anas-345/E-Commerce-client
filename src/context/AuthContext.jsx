import { handleProfile } from "@/services/auth";
import { createContext, useContext, useEffect, useState } from "react";

const Auth = createContext();

export default function AuthContext({ children }) {
  const [user, setUser] = useState({});
  const [isAppLoading, setIsAppLoading] = useState(false);

  const isAdmin = user?.role === "Admin";

  async function readProfile(token) {
    if (!token) return;
    setIsAppLoading(true);
    const data = await handleProfile(token);
    if (!data) {
      setUser({});
      setIsAppLoading(false);
      return;
    }
    setUser(data);
    setIsAppLoading(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    readProfile(token);
  }, []);
  return (
    <Auth.Provider value={{ user, setUser, readProfile, isAppLoading , isAdmin}}>
      {children}
    </Auth.Provider>
  );
}

export const useAuth = () => useContext(Auth);
