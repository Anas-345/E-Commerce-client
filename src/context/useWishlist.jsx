import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/services/handleWishlist";
import { createContext, useContext, useEffect, useState } from "react";

const Wishlist = createContext();

export default function WishlistContext({ children }) {
  const [wishlist, setWishlist] = useState([]);

  async function fetchData() {
    const res = await getWishlist();
    if (!res) return;
    setWishlist(res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function isLiked(id) {
    return wishlist.includes(id);
  }

  async function handleToggle(id) {
    const exists = isLiked(id);

    setWishlist((prev) =>
      exists ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );

    let success = false;
    if (exists) {
      success = await removeFromWishlist(id);
    } else {
      success = await addToWishlist(id);
    }

    if (!success) {
      fetchData();
    }
  }

  return (
    <Wishlist.Provider value={{ wishlist, isLiked, handleToggle, fetchData }}>
      {children}
    </Wishlist.Provider>
  );
}

export const useWishlist = () => useContext(Wishlist);
