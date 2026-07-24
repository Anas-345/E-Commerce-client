import { Store } from "lucide-react";

export default function AppLoader() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 bg-background-base">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(79, 70, 229, 0.18), transparent 70%)",
        }}
      />

      <div className="relative flex items-center gap-2 text-2xl font-bold tracking-tight text-text-primary">
        <Store className="h-7 w-7 text-primary" />
        StoreApp
      </div>

      <div className="relative h-9 w-9">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
      </div>

      <p className="relative text-sm text-text-tertiary animate-pulse-slow">
        Loading your store...
      </p>
    </div>
  );
}
