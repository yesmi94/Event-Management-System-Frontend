import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  RefreshCw,
  X,
  Calendar,
  MapPin,
  Tag,
} from "lucide-react";
import type { FilterOptions, EventSearchProps } from "../types/types";

export default function EventSearch({
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
  onApplyFilters,
  onClearFilters,
  onRefresh,
  loading,
  eventTypes,
  uniqueLocations,
}: EventSearchProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    Object.values(filters).some((v) => v !== "" && v !== "All") ||
    searchTerm !== "";

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/40">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search events by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onApplyFilters();
              }
            }}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/50"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${
              hasActiveFilters ? "ring-2 ring-blue-400/50" : ""
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {Object.values(filters).filter((v) => v !== "" && v !== "All")
                  .length + (searchTerm !== "" ? 1 : 0)}
              </span>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Advanced Filters
            </h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 text-sm focus:border-blue-400 focus:ring-blue-400/50 cursor-pointer"
              >
                <option value="" className="bg-gray-800">
                  All Locations
                </option>
                {uniqueLocations.map((location) => (
                  <option
                    key={location}
                    value={location}
                    className="bg-gray-800"
                  >
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Event Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 text-sm focus:border-blue-400 focus:ring-blue-400/50 cursor-pointer"
              >
                <option value="" className="bg-gray-800">
                  All Types
                </option>
                {eventTypes.map((type) => (
                  <option
                    key={type.value}
                    value={type.value}
                    className="bg-gray-800 cursor-pointer"
                  >
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 text-sm focus:border-blue-400 focus:ring-blue-400/50"
              >
                {["All", "Upcoming", "Past", "Today"].map((status) => (
                  <option
                    key={status}
                    value={status === "All" ? "" : status}
                    className="bg-gray-800"
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Date From */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                From Date
              </label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                className="bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/50"
              />
            </div>

            {/* Date To */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                To Date
              </label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                className="bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/50"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={onApplyFilters} disabled={loading}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
