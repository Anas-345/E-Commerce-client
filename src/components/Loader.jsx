import { Loader2 } from "lucide-react";

export default function Loader({ content }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-87.5 space-y-3 bg-card/50 border rounded-xl p-8">
      <Loader2 className="h-9 w-9 animate-spin text-primary" />
      <p className="text-sm font-medium text-muted-foreground">{content}</p>
    </div>
  );
}
