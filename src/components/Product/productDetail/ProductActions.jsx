import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Pencil, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function ProductActions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Product link copied to clipboard!");
  };
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-muted-foreground hover:text-foreground"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          onClick={handleShare}
          title="Share Product"
        >
          <Share2 className="h-4 w-4" />
        </Button>

        {isAdmin && (
          <Button
            className="gap-2"
            onClick={() => navigate(`/dashboard/products/edit/${id}`)}
          >
            <Pencil className="h-4 w-4" /> Edit Product
          </Button>
        )}
      </div>
    </div>
  );
}
