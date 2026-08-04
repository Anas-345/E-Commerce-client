import { useEffect, useState } from "react";
import { ShieldCheck, UserCheck, Users as UsersIcon } from "lucide-react";
import { Table, TableBody } from "@/components/ui/table";
import { deleteUser, getUsers, updateUser } from "@/services/handleUsers";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import DialogBox from "@/components/DialogBox";
import { toast } from "sonner";
import PagesHeader from "@/components/PagesHeader";
import PagesCards from "@/components/PagesCards";
import UserFilters from "@/components/users/UserFilters";
import UserHeader from "@/components/users/UserHeader";
import UserDataDisplay from "@/components/users/UserDataDisplay";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
      <PagesHeader
        header={"User Management"}
        content={"Manage user roles, access privileges, and account details."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            header: "Total Accounts",
            icon: <UsersIcon className="h-4 w-4 text-muted-foreground" />,
            count: totalUsersCount,
          },
          {
            header: "Administrators",
            icon: <ShieldCheck className="h-4 w-4 text-primary" />,
            count: adminCount,
          },
          {
            header: "Customers",
            icon: <UserCheck className="h-4 w-4 text-muted-foreground" />,
            count: customerCount,
          },
        ].map((c, i) => (
          <PagesCards header={c.header} icon={c.icon} count={c.count} key={i} />
        ))}
      </div>

      <UserFilters />

      {loading ? (
        <Loader content={"Loading user accounts..."} />
      ) : users.length === 0 ? (
        <EmptyState Icon={UsersIcon} content={"users"} />
      ) : (
        <div className="border rounded-xl bg-card overflow-x-auto">
          <Table className="w-full min-w-162.5 sm:min-w-full">
            <UserHeader />
            <TableBody>
              {users.map((u) => (
                <UserDataDisplay
                  u={u}
                  handleOpenRoleModal={handleOpenRoleModal}
                  setDeletingUser={setDeletingUser}
                />
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
