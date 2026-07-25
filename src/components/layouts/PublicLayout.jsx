import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background-base text-foreground antialiased">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
