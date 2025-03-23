"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import DateRangeFilter from "./DateRangeFilter"
import MultiSelectFilter from "./MultiSelectFilter"
import { cn } from "@/lib/utils"

const FilterPanel = ({
  onFilterChange,
  availableFilters = ["date", "recruiter", "client"],
  className,
  initialExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(initialExpanded)
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    recruiters: [],
    clients: [],
  })

  // Sample data - would be fetched from API in a real application
  const recruiters = [
    { id: "1", name: "Sarah Johnson" },
    { id: "2", name: "Michael Chen" },
    { id: "3", name: "Jessica Lee" },
    { id: "4", name: "David Wilson" },
    { id: "5", name: "Emily Rodriguez" },
  ]

  const clients = [
    { id: "1", name: "Acme Corp" },
    { id: "2", name: "TechGiant Inc" },
    { id: "3", name: "Global Finance" },
    { id: "4", name: "Healthcare Partners" },
    { id: "5", name: "Manufacturing Solutions" },
  ]

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const resetFilters = {
      dateRange: { start: null, end: null },
      recruiters: [],
      clients: [],
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const hasActiveFilters = () => {
    return (
      (filters.dateRange.start && filters.dateRange.end) || filters.recruiters.length > 0 || filters.clients.length > 0
    )
  }

  return (
    <div className={cn("bg-white rounded-lg border border-gray-100 shadow-sm mb-4", className)}>
      <div className="p-3 flex justify-between items-center">
        <div className="flex items-center">
          <Filter className="w-4 h-4 mr-2 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Filters</h3>
          {hasActiveFilters() && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
              {(filters.dateRange.start ? 1 : 0) + filters.recruiters.length + filters.clients.length} active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-500 hover:text-gray-700"
              onClick={clearFilters}
            >
              <X className="w-3 h-3 mr-1" />
              Clear all
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse filters" : "Expand filters"}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="p-3 pt-0 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableFilters.includes("date") && (
              <div>
                <h4 className="text-xs font-medium text-gray-500 mb-1">Date Range</h4>
                <DateRangeFilter
                  value={filters.dateRange}
                  onChange={(value) => handleFilterChange("dateRange", value)}
                />
              </div>
            )}

            {availableFilters.includes("recruiter") && (
              <div>
                <h4 className="text-xs font-medium text-gray-500 mb-1">Recruiters</h4>
                <MultiSelectFilter
                  options={recruiters}
                  value={filters.recruiters}
                  onChange={(value) => handleFilterChange("recruiters", value)}
                  placeholder="Select recruiters"
                />
              </div>
            )}

            {availableFilters.includes("client") && (
              <div>
                <h4 className="text-xs font-medium text-gray-500 mb-1">Clients</h4>
                <MultiSelectFilter
                  options={clients}
                  value={filters.clients}
                  onChange={(value) => handleFilterChange("clients", value)}
                  placeholder="Select clients"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPanel

