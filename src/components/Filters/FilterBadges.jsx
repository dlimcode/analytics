"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const FilterBadges = ({
  filters,
  onClearAll,
  onRemoveFilter,
  currentTab = "",
  recruiterNames = {
    1: "Sarah Johnson",
    2: "Michael Chen",
    3: "Jessica Lee",
    4: "David Wilson",
    5: "Emily Rodriguez",
  },
  clientNames = {
    1: "Acme Corp",
    2: "TechGiant Inc",
    3: "Global Finance",
    4: "Healthcare Partners",
    5: "Manufacturing Solutions",
    6: "Retail Innovations",
    7: "Energy Dynamics",
  },
  industryNames = {
    tech: "Technology",
    finance: "Finance",
    healthcare: "Healthcare",
    manufacturing: "Manufacturing",
    retail: "Retail",
    energy: "Energy",
  },
  teamNames = {
    teamA: "Team A",
    teamB: "Team B",
    teamC: "Team C",
    teamD: "Team D",
  },
  metricNames = {
    // Recruiter metrics
    meetings: "BD Meetings",
    interactions: "Candidate Interactions",
    candidates: "Active Candidates",
    // Team metrics
    revenue: "Revenue",
    placements: "Placements",
    activities: "Activities",
    // Data types
    profiles: "Profiles",
    activities: "Activities",
    notes: "Notes",
  },
}) => {
  // Format date for display
  const formatDate = (date) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Get badge color based on filter type
  const getBadgeColor = (type) => {
    switch (type) {
      case "dateRange":
        return "filter-badge filter-badge-date"
      case "recruiters":
        return "filter-badge filter-badge-recruiter"
      case "clients":
        return "filter-badge filter-badge-client"
      case "industries":
        return "filter-badge filter-badge-industry"
      case "teams":
        return "filter-badge filter-badge-team"
      case "metrics":
      case "dataTypes":
        return "filter-badge filter-badge-metric"
      default:
        return "filter-badge"
    }
  }

  // Get entity name based on type and id
  const getEntityName = (type, id) => {
    switch (type) {
      case "recruiters":
        return recruiterNames[id] || `Recruiter ${id}`
      case "clients":
        return clientNames[id] || `Client ${id}`
      case "industries":
        return industryNames[id] || `Industry ${id}`
      case "teams":
        return teamNames[id] || `Team ${id}`
      case "metrics":
      case "dataTypes":
        return metricNames[id] || `Metric ${id}`
      default:
        return id
    }
  }

  // Get all active filters as an array of objects
  const getActiveFilters = () => {
    const activeFilters = []

    // Add date range filter
    if (filters.dateRange?.start && filters.dateRange?.end) {
      activeFilters.push({
        type: "dateRange",
        label: `${formatDate(filters.dateRange.start)} - ${formatDate(filters.dateRange.end)}`,
      })
    }

    // Add entity filters
    const entityTypes = ["recruiters", "clients", "industries", "teams"]
    entityTypes.forEach((type) => {
      if (filters[type] && Array.isArray(filters[type]) && filters[type].length > 0) {
        filters[type].forEach((id) => {
          activeFilters.push({
            type,
            id,
            label: getEntityName(type, id),
          })
        })
      }
    })

    // Add metric filters - only if not all metrics are selected
    if (currentTab === "recruiter" && filters.metrics && filters.metrics.length > 0 && filters.metrics.length < 3) {
      filters.metrics.forEach((id) => {
        activeFilters.push({
          type: "metrics",
          id,
          label: getEntityName("metrics", id),
        })
      })
    }

    // Add team metric filters - only if not all metrics are selected
    if (currentTab === "team" && filters.metrics && filters.metrics.length > 0 && filters.metrics.length < 3) {
      filters.metrics.forEach((id) => {
        activeFilters.push({
          type: "metrics",
          id,
          label: getEntityName("metrics", id),
        })
      })
    }

    // Add data type filters - only if not all data types are selected
    if (currentTab === "data" && filters.dataTypes && filters.dataTypes.length > 0 && filters.dataTypes.length < 3) {
      filters.dataTypes.forEach((id) => {
        activeFilters.push({
          type: "dataTypes",
          id,
          label: getEntityName("dataTypes", id),
        })
      })
    }

    return activeFilters
  }

  const activeFilters = getActiveFilters()

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-xs text-gray-500 mr-1">Active filters:</span>

      {activeFilters.map((filter, index) => (
        <Badge
          key={`${filter.type}-${filter.id || index}`}
          variant="outline"
          className={`flex items-center gap-1 px-2 py-1 ${getBadgeColor(filter.type)}`}
        >
          <span className="text-xs">{filter.label}</span>
          <button
            onClick={() => onRemoveFilter(filter.type, filter.id)}
            className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove filter</span>
          </button>
        </Badge>
      ))}

      {/* Clear All Button */}
      {activeFilters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700 ml-auto"
        >
          Clear all
        </Button>
      )}
    </div>
  )
}

export default FilterBadges

