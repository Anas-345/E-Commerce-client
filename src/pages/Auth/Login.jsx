import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { handleLogin } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cnfrmPassword: "",
    role: "Customer",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { readProfile } = useAuth();

  const naivgate = useNavigate();

  function handleChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleClick() {
    let { email, password } = user;

    email = email.trim();
    if (!email || !password) return toast.error("Please fill all fields");
    setIsLoading(true);

    const token = await handleLogin({ email, password });
    setIsLoading(false);

    if (!token) return;
    localStorage.setItem("token", token);
    await readProfile(token);
    naivgate("/");
  }

  return (
    <Card className="w-full shadow-lg border-border/40">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Welcome Back
        </CardTitle>
        <CardDescription>
          Enter your details below to login your store account
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            onChange={handleChange}
            name="email"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
              onChange={handleChange}
              name="password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Button
          className="w-full mt-2 py-5 cursor-pointer"
          type="submit"
          disabled={isLoading}
          onClick={handleClick}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in
            </>
          ) : (
            "Login"
          )}
        </Button>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
        <div>
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
