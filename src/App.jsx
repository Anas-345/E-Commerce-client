import { Toaster } from "sonner";
import PageRouter from "./routes/PageRouter";
import { useAuth } from "./context/AuthContext";
import AppLoader from "./components/ui/AppLoader";

export default function App() {
  const { isAppLoading } = useAuth();
  return (
    <>
      <Toaster />
      {isAppLoading ? <AppLoader /> : <PageRouter />}
    </>
  );
}
