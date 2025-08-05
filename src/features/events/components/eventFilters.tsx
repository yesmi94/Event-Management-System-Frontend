// components/EventFilters.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export function EventFilters({
  onFilter,
}: {
  onFilter: (filters: any) => void;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const handleApply = () => {
    onFilter({
      search,
      category,
      dateFrom: dateFrom?.toISOString(),
      dateTo: dateTo?.toISOString(),
    });
  };

  return (
    <div className="grid gap-4 p-4 bg-gray-100 rounded-xl">
      <Input
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <div className="flex gap-4">
        <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} />
        <Calendar mode="single" selected={dateTo} onSelect={setDateTo} />
      </div>
      <Button onClick={handleApply}>Apply Filters</Button>
    </div>
  );
}
