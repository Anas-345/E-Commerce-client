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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { handleRegister } from "@/services/auth";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cnfrmPassword: "",
    role: "Customer",
  });
  const [isLoading, setIsLoading] = useState(false);

  const naivgate = useNavigate();

  function handleChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleClick() {
    let { name, email, password, cnfrmPassword, role } = user;

    name = name.trim();
    email = email.trim();
    if (!name || !email || !password || !cnfrmPassword)
      return toast.error("Please fill all fields");
    if (password !== cnfrmPassword)
      return toast.error("Passwords are not matching");

    setIsLoading(true);

    const success = await handleRegister({ name, email, password, role });

    setIsLoading(false);
    if (success) naivgate("/auth/login");
  }

  return (
    <Card className="w-full shadow-lg border-border/40">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create an Account
        </CardTitle>
        <CardDescription>
          Enter your details below to set up your store account
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

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
          <Label htmlFor="role">Account Type</Label>
          <Select
            value={user.role}
            onValueChange={(e) => setUser((prev) => ({ ...prev, role: e }))}
          >
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Customer">Customer</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
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

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
              onChange={handleChange}
              name="cnfrmPassword"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent hover:text-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
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
              Creating Account
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
        <div>
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
