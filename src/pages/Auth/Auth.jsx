import { Outlet } from "react-router";

export default function Auth() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
