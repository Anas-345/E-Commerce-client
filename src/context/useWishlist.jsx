import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/services/handleWishlist";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const Wishlist = createContext();

export default function WishlistContext({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  async function fetchData() {
    const userId = user?.uid;
    if (!userId) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const res = await getWishlist();
    if (res) {
      setWishlist(res);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [user]);

  function isLiked(id) {
    return wishlist.includes(id);
  }

  async function handleToggle(id) {
    const userId = user?.uid;
    if (!userId) return;

    const exists = isLiked(id);

    setWishlist((prev) =>
      exists ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );

    const success = exists
      ? await removeFromWishlist(id)
      : await addToWishlist(id);

    if (!success) {
      fetchData();
    }
  }

  return (
    <Wishlist.Provider
      value={{
        wishlist,
        isLiked,
        handleToggle,
        loading,
        fetchData,
      }}
    >
      {children}
    </Wishlist.Provider>
  );
}

export const useWishlist = () => useContext(Wishlist);