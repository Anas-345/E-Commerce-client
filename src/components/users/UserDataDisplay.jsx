import { Calendar, Mail, Shield, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export default function UserDataDisplay({
  u,
  handleOpenRoleModal,
  setDeletingUser,
}) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm uppercase">
            {u.name ? u.name.charAt(0) : "U"}
          </div>
          <span className="font-medium text-sm">{u.name}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-3.5 w-3.5" />
          {u.email}
        </div>
      </TableCell>

      <TableCell>
        {u.role === "Admin" ? (
          <Badge
            variant="default"
            className="gap-1 bg-primary/20 text-primary hover:bg-primary/30 border-primary/30"
          >
            <Shield className="h-3 w-3" /> Admin
          </Badge>
        ) : (
          <Badge variant="outline" className="capitalize">
            Customer
          </Badge>
        )}
      </TableCell>

      <TableCell className="text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}
        </div>
      </TableCell>

      <TableCell className="text-center">
        <Select
          value={u.role}
          onValueChange={(newRole) => handleOpenRoleModal(u, newRole)}
        >
          <SelectTrigger className="w-28 mx-auto h-8 text-xs cursor-pointer">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent align="center">
            <SelectItem value="Customer">Customer</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
          onClick={() => setDeletingUser(u)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
