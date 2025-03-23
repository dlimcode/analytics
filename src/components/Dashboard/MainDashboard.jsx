"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Dashboard from "./Dashboard"
import OverviewPanel from "../Analytics/OverviewPanel"
import RecruiterProductivity from "../Analytics/RecruiterProductivity"
import RevenueAnalytics from "../Analytics/RevenueAnalytics"
import DataInputTracking from "../Analytics/DataInputTracking"
import TeamPerformance from "../Analytics/TeamPerformance"
import GlobalFilterButton from "../Filters/GlobalFilterButton"
import FilterBadges from "../Filters/FilterBadges"
import { CheckCircleIcon, DatabaseIcon } from "./icons"

const MainDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  // Tab-specific filters
  const [filters, setFilters] = useState({
    overview: {
      dateRange: { start: null, end: null },
    },
    recruiter: {
      dateRange: { start: null, end: null },
      recruiters: [],
      clients: [],
      metrics: ["meetings", "interactions", "candidates"],
    },
    revenue: {
      dateRange: { start: null, end: null },
      clients: [],
      industries: [],
      recruiters: [],
    },
    data: {
      dateRange: { start: null, end: null },
      recruiters: [],
      dataTypes: ["profiles", "activities", "notes"],
    },
    team: {
      dateRange: { start: null, end: null },
      teams: [],
      metrics: ["revenue", "placements", "activities"],
    },
  })

  // Status items for the dashboard
  const statusItems = [
    { label: "Database Status", type: "success", icon: DatabaseIcon },
    { label: "System Status", type: "success", icon: CheckCircleIcon },
  ]

  // Generate subtitle based on active tab filters
  const getFilterSubtitle = () => {
    const activeFilters = filters[activeTab]
    const parts = []

    if (activeFilters?.dateRange?.start && activeFilters?.dateRange?.end) {
      const startDate = new Date(activeFilters.dateRange.start)
      const endDate = new Date(activeFilters.dateRange.end)
      parts.push(`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`)
    }

    // Add tab-specific filter descriptions
    switch (activeTab) {
      case "recruiter":
        if (activeFilters.recruiters?.length > 0) {
          parts.push(`${activeFilters.recruiters.length} recruiter${activeFilters.recruiters.length > 1 ? "s" : ""}`)
        }
        if (activeFilters.clients?.length > 0) {
          parts.push(`${activeFilters.clients.length} client${activeFilters.clients.length > 1 ? "s" : ""}`)
        }
        break
      case "revenue":
        if (activeFilters.clients?.length > 0) {
          parts.push(`${activeFilters.clients.length} client${activeFilters.clients.length > 1 ? "s" : ""}`)
        }
        if (activeFilters.industries?.length > 0) {
          parts.push(`${activeFilters.industries.length} industr${activeFilters.industries.length > 1 ? "ies" : "y"}`)
        }
        break
      case "data":
        if (activeFilters.recruiters?.length > 0) {
          parts.push(`${activeFilters.recruiters.length} recruiter${activeFilters.recruiters.length > 1 ? "s" : ""}`)
        }
        if (activeFilters.dataTypes?.length > 0) {
          parts.push(`${activeFilters.dataTypes.length} data type${activeFilters.dataTypes.length > 1 ? "s" : ""}`)
        }
        break
      case "team":
        if (activeFilters.teams?.length > 0) {
          parts.push(`${activeFilters.teams.length} team${activeFilters.teams.length > 1 ? "s" : ""}`)
        }
        break
    }

    return parts.length > 0 ? `Filtered by ${parts.join(", ")}` : "All data"
  }

  // Handle filter changes for the active tab
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        ...newFilters,
      },
    }))
  }

  // Clear all filters for the active tab
  const handleClearFilters = () => {
    // Reset to default filters for the active tab
    const defaultFilters = {
      dateRange: { start: null, end: null },
    }

    // Add tab-specific default filters
    switch (activeTab) {
      case "recruiter":
        defaultFilters.recruiters = []
        defaultFilters.clients = []
        defaultFilters.metrics = ["meetings", "interactions", "candidates"]
        break
      case "revenue":
        defaultFilters.clients = []
        defaultFilters.industries = []
        defaultFilters.recruiters = []
        break
      case "data":
        defaultFilters.recruiters = []
        defaultFilters.dataTypes = ["profiles", "activities", "notes"]
        break
      case "team":
        defaultFilters.teams = []
        defaultFilters.metrics = ["revenue", "placements", "activities"]
        break
    }

    setFilters((prev) => ({
      ...prev,
      [activeTab]: defaultFilters,
    }))
  }

  // Check if any filters are active for the current tab
  const hasActiveFilters = () => {
    const activeFilters = filters[activeTab]
    if (!activeFilters) return false

    // Check date range
    const hasDateFilter = activeFilters.dateRange?.start && activeFilters.dateRange?.end

    // Check tab-specific filters
    switch (activeTab) {
      case "recruiter":
        return hasDateFilter || activeFilters.recruiters?.length > 0 || activeFilters.clients?.length > 0
      case "revenue":
        return (
          hasDateFilter ||
          activeFilters.clients?.length > 0 ||
          activeFilters.industries?.length > 0 ||
          activeFilters.recruiters?.length > 0
        )
      case "data":
        return (
          hasDateFilter ||
          activeFilters.recruiters?.length > 0 ||
          (activeFilters.dataTypes?.length > 0 && activeFilters.dataTypes.length < 3)
        ) // Only if not all data types are selected
      case "team":
        return (
          hasDateFilter ||
          activeFilters.teams?.length > 0 ||
          (activeFilters.metrics?.length > 0 && activeFilters.metrics.length < 3)
        ) // Only if not all metrics are selected
      default:
        return hasDateFilter
    }
  }

  // Handle removing a specific filter
  const handleRemoveFilter = (type, value) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev }

      if (type === "dateRange") {
        updatedFilters[activeTab].dateRange = { start: null, end: null }
      } else if (Array.isArray(updatedFilters[activeTab][type])) {
        updatedFilters[activeTab][type] = updatedFilters[activeTab][type].filter((item) => item !== value)
      }

      return updatedFilters
    })
  }

  // Get available filter types for the current tab
  const getAvailableFilterTypes = () => {
    switch (activeTab) {
      case "recruiter":
        return ["date", "recruiter", "client", "metric"]
      case "revenue":
        return ["date", "client", "industry", "recruiter"]
      case "data":
        return ["date", "recruiter", "dataType"]
      case "team":
        return ["date", "team", "metric"]
      default:
        return ["date"]
    }
  }

  // Get tab-specific filter title
  const getFilterTitle = () => {
    switch (activeTab) {
      case "recruiter":
        return "Filter Recruiter Productivity"
      case "revenue":
        return "Filter Revenue Analytics"
      case "data":
        return "Filter Data Quality"
      case "team":
        return "Filter Team Performance"
      default:
        return "Filter Dashboard"
    }
  }

  return (
    <Dashboard title="PullmanMorrison Management Dashboard" subtitle={getFilterSubtitle()} statusItems={statusItems}>
      <div className="flex flex-col space-y-4">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <TabsList className="flex-shrink-0">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter Productivity</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
              <TabsTrigger value="data">Data Quality</TabsTrigger>
              <TabsTrigger value="team">Team Performance</TabsTrigger>
            </TabsList>

            {activeTab !== "overview" && (
              <GlobalFilterButton
                onFilterChange={handleFilterChange}
                activeFilters={filters[activeTab]}
                filterTypes={getAvailableFilterTypes()}
                title={getFilterTitle()}
                currentTab={activeTab}
              />
            )}
          </div>

          {/* Show filter badges if filters are active */}
          {hasActiveFilters() && activeTab !== "overview" && (
            <FilterBadges
              filters={filters[activeTab]}
              onClearAll={handleClearFilters}
              onRemoveFilter={handleRemoveFilter}
              currentTab={activeTab}
            />
          )}

          <TabsContent value="overview" className="mt-4">
            <OverviewPanel />
          </TabsContent>

          <TabsContent value="recruiter" className="mt-4">
            <RecruiterProductivity filters={filters.recruiter} />
          </TabsContent>

          <TabsContent value="revenue" className="mt-4">
            <RevenueAnalytics filters={filters.revenue} />
          </TabsContent>

          <TabsContent value="data" className="mt-4">
            <DataInputTracking filters={filters.data} />
          </TabsContent>

          <TabsContent value="team" className="mt-4">
            <TeamPerformance filters={filters.team} />
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  )
}

export default MainDashboard

