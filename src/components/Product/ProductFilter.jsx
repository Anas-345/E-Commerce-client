import { LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export default function ProductFilter({ viewMode, setViewMode }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card p-3 rounded-xl border">
      <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-8" />
        </div>

        <Select>
          <SelectTrigger className="w-40">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <SelectValue placeholder="Category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="home">Home & Kitchen</SelectItem>
            <SelectItem value="beauty">Beauty & Care</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1 border rounded-lg p-1 bg-muted/40 self-end sm:self-auto">
        <Button
          variant={viewMode === "grid" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => setViewMode("grid")}
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "table" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => setViewMode("table")}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
