import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/services/handleWishlist";
import { useEffect, useState } from "react";

export default function useWishlist() {
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
    if (isLiked(id)) {
      await removeFromWishlist(id);
    } else {
      await addToWishlist(id);
    }
    fetchData();
  }
  return {
    isLiked,
    handleToggle,
  };
}
