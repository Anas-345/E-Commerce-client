import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/useWishlist";
import { Eye, Heart } from "lucide-react";
import { useNavigate } from "react-router";

export default function CardImg({ product }) {
  const { isAdmin } = useAuth();
  const { handleToggle, isLiked } = useWishlist();
  const navigate = useNavigate();

  const like = isLiked(product.id);

  return (
    <div className="relative aspect-square bg-muted overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/600x600?text=No+Image";
        }}
      />
      <Badge
        variant="secondary"
        className="absolute top-2.5 left-2.5 capitalize backdrop-blur-md bg-background/80"
      >
        {product.category}
      </Badge>

      <div className="absolute top-2.5 right-2.5 flex flex-col gap-2">
        {!isAdmin && (
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full shadow backdrop-blur-md bg-background/80 hover:bg-background"
            onClick={() => handleToggle(product.id)}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                like
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground hover:text-red-500"
              }`}
            />
          </Button>
        )}

        {!isAdmin && (
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full shadow backdrop-blur-md bg-background/80 hover:bg-background"
            title="View Details"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </Button>
        )}
      </div>
    </div>
  );
}
