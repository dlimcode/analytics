"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DateRangeSelector from "./DateRangeSelector"
import EntitySelector from "./EntitySelector"
import MetricsSelector from "./MetricsSelector"

const FilterModal = ({
  initialFilters = {},
  onApply,
  filterTypes = ["date", "recruiter", "client"],
  currentTab = "",
}) => {
  const [filters, setFilters] = useState({
    dateRange: initialFilters.dateRange || { start: null, end: null },
    recruiters: initialFilters.recruiters || [],
    clients: initialFilters.clients || [],
    industries: initialFilters.industries || [],
    teams: initialFilters.teams || [],
    metrics: initialFilters.metrics || [],
    dataTypes: initialFilters.dataTypes || [],
  })

  // Update local state when initialFilters change
  useEffect(() => {
    setFilters({
      dateRange: initialFilters.dateRange || { start: null, end: null },
      recruiters: initialFilters.recruiters || [],
      clients: initialFilters.clients || [],
      industries: initialFilters.industries || [],
      teams: initialFilters.teams || [],
      metrics: initialFilters.metrics || [],
      dataTypes: initialFilters.dataTypes || [],
    })
  }, [initialFilters])

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
    { id: "6", name: "Retail Innovations" },
    { id: "7", name: "Energy Dynamics" },
  ]

  const industries = [
    { id: "tech", name: "Technology" },
    { id: "finance", name: "Finance" },
    { id: "healthcare", name: "Healthcare" },
    { id: "manufacturing", name: "Manufacturing" },
    { id: "retail", name: "Retail" },
    { id: "energy", name: "Energy" },
  ]

  const teams = [
    { id: "teamA", name: "Team A" },
    { id: "teamB", name: "Team B" },
    { id: "teamC", name: "Team C" },
    { id: "teamD", name: "Team D" },
  ]

  // Tab-specific metrics
  const getMetricsOptions = () => {
    switch (currentTab) {
      case "recruiter":
        return [
          { id: "meetings", name: "BD Meetings" },
          { id: "interactions", name: "Candidate Interactions" },
          { id: "candidates", name: "Active Candidates" },
        ]
      case "team":
        return [
          { id: "revenue", name: "Revenue" },
          { id: "placements", name: "Placements" },
          { id: "activities", name: "Activities" },
        ]
      case "data":
        return [
          { id: "profiles", name: "Profiles" },
          { id: "activities", name: "Activities" },
          { id: "notes", name: "Notes" },
        ]
      default:
        return []
    }
  }

  const handleDateRangeChange = (dateRange) => {
    setFilters((prev) => ({ ...prev, dateRange }))
  }

  const handleEntityChange = (type, values) => {
    setFilters((prev) => ({ ...prev, [type]: values }))
  }

  const handleApply = () => {
    onApply(filters)
  }

  const handleClear = () => {
    // Create default empty filters
    const defaultFilters = {
      dateRange: { start: null, end: null },
      recruiters: [],
      clients: [],
      industries: [],
      teams: [],
    }

    // Add tab-specific default metrics
    switch (currentTab) {
      case "recruiter":
        defaultFilters.metrics = ["meetings", "interactions", "candidates"]
        break
      case "team":
        defaultFilters.metrics = ["revenue", "placements", "activities"]
        break
      case "data":
        defaultFilters.dataTypes = ["profiles", "activities", "notes"]
        break
    }

    setFilters(defaultFilters)
  }

  const hasActiveFilters = () => {
    return (
      (filters.dateRange.start && filters.dateRange.end) ||
      filters.recruiters.length > 0 ||
      filters.clients.length > 0 ||
      filters.industries.length > 0 ||
      filters.teams.length > 0 ||
      (filters.metrics.length > 0 &&
        ((currentTab === "recruiter" && filters.metrics.length < 3) ||
          (currentTab === "team" && filters.metrics.length < 3))) ||
      (filters.dataTypes.length > 0 && filters.dataTypes.length < 3)
    )
  }

  // Get the default tab based on available filter types
  const getDefaultTab = () => {
    if (filterTypes.includes("date")) return "date"
    if (filterTypes.includes("recruiter")) return "recruiters"
    if (filterTypes.includes("client")) return "clients"
    if (filterTypes.includes("team")) return "teams"
    if (filterTypes.includes("industry")) return "industries"
    if (filterTypes.includes("metric")) return "metrics"
    if (filterTypes.includes("dataType")) return "dataTypes"
    return "date"
  }

  return (
    <div className="py-2">
      <Tabs defaultValue={getDefaultTab()} className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-3">
          {filterTypes.includes("date") && <TabsTrigger value="date">Date Range</TabsTrigger>}
          {filterTypes.includes("recruiter") && <TabsTrigger value="recruiters">Recruiters</TabsTrigger>}
          {filterTypes.includes("client") && <TabsTrigger value="clients">Clients</TabsTrigger>}
          {filterTypes.includes("industry") && <TabsTrigger value="industries">Industries</TabsTrigger>}
          {filterTypes.includes("team") && <TabsTrigger value="teams">Teams</TabsTrigger>}
          {filterTypes.includes("metric") && <TabsTrigger value="metrics">Metrics</TabsTrigger>}
          {filterTypes.includes("dataType") && <TabsTrigger value="dataTypes">Data Types</TabsTrigger>}
        </TabsList>

        <div className="max-h-[350px] overflow-y-auto pr-1 custom-scrollbar filter-content-container">
          {filterTypes.includes("date") && (
            <TabsContent value="date" className="mt-0">
              <DateRangeSelector value={filters.dateRange} onChange={handleDateRangeChange} />
            </TabsContent>
          )}

          {filterTypes.includes("recruiter") && (
            <TabsContent value="recruiters" className="mt-0">
              <EntitySelector
                entities={recruiters}
                selectedIds={filters.recruiters}
                onChange={(values) => handleEntityChange("recruiters", values)}
                placeholder="Search recruiters..."
                emptyMessage="No recruiters found"
              />
            </TabsContent>
          )}

          {filterTypes.includes("client") && (
            <TabsContent value="clients" className="mt-0">
              <EntitySelector
                entities={clients}
                selectedIds={filters.clients}
                onChange={(values) => handleEntityChange("clients", values)}
                placeholder="Search clients..."
                emptyMessage="No clients found"
              />
            </TabsContent>
          )}

          {filterTypes.includes("industry") && (
            <TabsContent value="industries" className="mt-0">
              <EntitySelector
                entities={industries}
                selectedIds={filters.industries}
                onChange={(values) => handleEntityChange("industries", values)}
                placeholder="Search industries..."
                emptyMessage="No industries found"
              />
            </TabsContent>
          )}

          {filterTypes.includes("team") && (
            <TabsContent value="teams" className="mt-0">
              <EntitySelector
                entities={teams}
                selectedIds={filters.teams}
                onChange={(values) => handleEntityChange("teams", values)}
                placeholder="Search teams..."
                emptyMessage="No teams found"
              />
            </TabsContent>
          )}

          {filterTypes.includes("metric") && (
            <TabsContent value="metrics" className="mt-0">
              <MetricsSelector
                metrics={getMetricsOptions()}
                selectedIds={filters.metrics}
                onChange={(values) => handleEntityChange("metrics", values)}
                title={currentTab === "recruiter" ? "Recruiter Metrics" : "Team Metrics"}
                description={`Select which metrics to display in the ${currentTab === "recruiter" ? "recruiter" : "team"} dashboard`}
              />
            </TabsContent>
          )}

          {filterTypes.includes("dataType") && (
            <TabsContent value="dataTypes" className="mt-0">
              <MetricsSelector
                metrics={getMetricsOptions()}
                selectedIds={filters.dataTypes}
                onChange={(values) => handleEntityChange("dataTypes", values)}
                title="Data Types"
                description="Select which data types to include in the analysis"
              />
            </TabsContent>
          )}
        </div>
      </Tabs>

      <div className="mt-4 flex justify-between border-t pt-3">
        {hasActiveFilters() ? (
          <Button variant="outline" size="sm" onClick={handleClear} className="text-xs h-8">
            Clear Filters
          </Button>
        ) : (
          <div></div>
        )}
        <Button onClick={handleApply} size="sm" className="h-8">
          Apply Filters
        </Button>
      </div>
    </div>
  )
}

export default FilterModal

