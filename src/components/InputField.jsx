import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputField({
  type,
  id,
  name,
  value,
  handleChange,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{name}</Label>
      <Input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
}
