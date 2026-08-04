import { TableHead, TableHeader, TableRow } from "../ui/table";

export default function UserHeader() {
  return (
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
  );
}
