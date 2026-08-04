import { Loader2, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { handleLogin } from "@/services/auth";
import { useState } from "react";
import InputField from "../InputField";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const { readProfile } = useAuth();

  function handleChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleClick(e) {
    e.preventDefault();
    let { email, password } = user;

    email = email.trim();
    if (!email || !password) return toast.error("Please fill all fields");
    setIsLoading(true);

    const token = await handleLogin({ email, password });
    setIsLoading(false);

    if (!token) return;
    localStorage.setItem("token", token);
    await readProfile(token);
  }
  return (
    <Card className="border-amber-500/40 bg-amber-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Lock className="h-4 w-4 text-amber-500" /> Account Authentication
        </CardTitle>
        <CardDescription className="text-xs">
          Please log in to your account to enable the checkout form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleClick} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                name: "Email",
                id: "email",
                type: "email",
                value: user.email,
                placeholder: "user@example.com",
              },
              {
                name: "Password",
                id: "password",
                type: "password",
                value: user.password,
                placeholder: "••••••••",
              },
            ].map((o, i) => (
              <InputField
                key={i}
                name={o.name}
                id={o.id}
                type={o.type}
                value={o.value}
                placeholder={o.placeholder}
                handleChange={handleChange}
              />
            ))}
          </div>
          <Button
            type="submit"
            size="sm"
            className="w-full sm:w-auto mt-2"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" />}
            Log In to Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
