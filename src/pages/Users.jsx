import { useEffect, useState } from "react";
import {
  Search,
  Shield,
  ShieldCheck,
  UserCheck,
  Users as UsersIcon,
  SlidersHorizontal,
  Mail,
  Calendar,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteUser, getUsers, updateUser } from "@/services/handleUsers";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import DialogBox from "@/components/DialogBox";
import { toast } from "sonner";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [selectedUser, setSelectedUser] = useState(null);
  const [targetRole, setTargetRole] = useState("");

  const [deletingUser, setDeletingUser] = useState(null);

  const totalUsersCount = users.length;
  const adminCount = users.filter((u) => u.role === "Admin").length;
  const customerCount = users.filter((u) => u.role === "Customer").length;

  async function fetchUsers() {
    setLoading(true);
    const data = await getUsers();
    if (!data) {
      setLoading(false);
      return;
    }
    setUsers(data);
    setLoading(false);
  }

  function handleOpenRoleModal(user, newRole) {
    if (user.role === newRole) return;
    setSelectedUser(user);
    setTargetRole(newRole);
  }

  async function handleConfirmRoleChange() {
    if (!selectedUser || !targetRole) return;
    const { uid } = selectedUser;

    setUpdating(true);

    const res = await updateUser(uid, targetRole);

    if (!res) {
      setUpdating(false);
      setSelectedUser(null);
      return;
    }

    fetchUsers();
    setUpdating(false);
    setSelectedUser(null);
    setTargetRole("");
  }

  async function handleConfirmDelete() {
    if (!deletingUser) return;
    const { uid } = deletingUser;

    setDeleting(true);

    const res = await deleteUser(uid);

    if (!res) {
      setDeleting(false);
      setDeletingUser(null);
      return;
    }
    toast.success("User deleted successfully");
    fetchUsers();

    setDeleting(false);
    setDeletingUser(null);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage user roles, access privileges, and account details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Accounts
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsersCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Administrators
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{adminCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customers
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card p-3 rounded-xl border">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <SelectValue placeholder="Role Filter" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <Loader content={"Loading user accounts..."} />
      ) : users.length === 0 ? (
        <EmptyState Icon={UsersIcon} content={"users"} />
      ) : (
        <div className="border rounded-xl bg-card overflow-x-auto">
          <Table className="w-full min-w-162.5 sm:min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-center">Role Action</TableHead>
                <TableHead className="text-right">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.uid}>
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
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <Select
                      value={u.role}
                      onValueChange={(newRole) =>
                        handleOpenRoleModal(u, newRole)
                      }
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
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <DialogBox
        content={
          <>
            Are you sure you want to change{" "}
            <strong className="text-foreground">{selectedUser?.name}</strong>
            's role to <strong className="text-primary">{targetRole}</strong>?
          </>
        }
        state={selectedUser}
        setState={setSelectedUser}
        loader={updating}
        handler={handleConfirmRoleChange}
        header={"Update Access Role?"}
        btnContent={"Confirm Change"}
        variant=""
        titleVariant=""
      />

      <DialogBox
        content={
          <>
            Are you sure you want to delete
            <strong className="text-foreground">{deletingUser?.name}</strong>?
            This action cannot be undone and will permanently remove their
            access.
          </>
        }
        state={deletingUser}
        setState={setDeletingUser}
        loader={deleting}
        handler={handleConfirmDelete}
        header={"Delete User Account?"}
        btnContent={"Delete Account"}
      />
    </div>
  );
}
