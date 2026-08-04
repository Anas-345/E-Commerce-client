import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";

export default function RecentUsers({ adminStats }) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base font-bold">
            Recently Registered Users
          </CardTitle>
          <CardDescription className="text-xs">
            Newest user platform signups
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs gap-1"
          onClick={() => navigate("/dashboard/users")}
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {adminStats.recentUsers.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">
            No recent users found.
          </p>
        ) : (
          adminStats.recentUsers.map((u) => (
            <div
              key={u._id || u.id}
              className="flex items-center justify-between text-xs border-b pb-2.5 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                  {(u.fullName || u.email || "U")[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{u.fullName || "N/A"}</p>
                  <p className="text-[11px] text-muted-foreground">{u.email}</p>
                </div>
              </div>
              <Badge
                variant={u.role === "admin" ? "default" : "secondary"}
                className="text-[10px] capitalize"
              >
                {u.role || "customer"}
              </Badge>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
