"use client"

import { useMemo } from "react"
import { Grid, GridItem } from "../Dashboard/Grid"
import MetricCard from "../Dashboard/MetricCard"
import BarChartComponent from "../Charts/BarChartComponent"
import LineChartComponent from "../Charts/LineChartComponent"
import PieChartComponent from "../Charts/PieChartComponent"
import DataTable from "../Tables/DataTable"
import ExportButton from "../Exports/ExportButton"
import { BriefcaseIcon, UserIcon, ChartBarIcon, DatabaseIcon } from "../Dashboard/icons"

// Sample data - would be replaced with real data from the database
const bdActivityData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 19 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 25 },
  { name: "Fri", value: 18 },
  { name: "Sat", value: 10 },
  { name: "Sun", value: 5 },
]

const candidateEngagementData = [
  { name: "Mon", value: 22 },
  { name: "Tue", value: 28 },
  { name: "Wed", value: 35 },
  { name: "Thu", value: 30 },
  { name: "Fri", value: 25 },
  { name: "Sat", value: 12 },
  { name: "Sun", value: 8 },
]

const pipelineData = [
  { name: "New", value: 45 },
  { name: "Contacted", value: 35 },
  { name: "Interview", value: 20 },
  { name: "Offer", value: 10 },
  { name: "Hired", value: 5 },
]

const roleData = [
  { name: "Active Roles", value: 24 },
  { name: "Filled Roles", value: 12 },
  { name: "New Roles", value: 8 },
]

const recruiterData = [
  {
    id: "1",
    name: "Sarah Johnson",
    meetings: 32,
    interactions: 45,
    candidates: 28,
    roles: 12,
  },
  {
    id: "2",
    name: "Michael Chen",
    meetings: 28,
    interactions: 38,
    candidates: 22,
    roles: 10,
  },
  {
    id: "3",
    name: "Jessica Lee",
    meetings: 35,
    interactions: 52,
    candidates: 30,
    roles: 15,
  },
  {
    id: "4",
    name: "David Wilson",
    meetings: 25,
    interactions: 30,
    candidates: 18,
    roles: 8,
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    meetings: 30,
    interactions: 42,
    candidates: 25,
    roles: 11,
  },
]

const columns = [
  {
    accessorKey: "name",
    header: "Recruiter",
    cell: ({ row }) => <div className="font-medium text-sm">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "meetings",
    header: "BD Meetings",
    cell: ({ row }) => <div className="text-right">{row.getValue("meetings")}</div>,
  },
  {
    accessorKey: "interactions",
    header: "Candidate Interactions",
    cell: ({ row }) => <div className="text-right">{row.getValue("interactions")}</div>,
  },
  {
    accessorKey: "candidates",
    header: "Active Candidates",
    cell: ({ row }) => <div className="text-right">{row.getValue("candidates")}</div>,
  },
  {
    accessorKey: "roles",
    header: "Active Roles",
    cell: ({ row }) => <div className="text-right">{row.getValue("roles")}</div>,
  },
]

const RecruiterProductivity = ({ filters = {} }) => {
  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    let result = [...recruiterData]

    if (filters.recruiters && filters.recruiters.length > 0) {
      result = result.filter((recruiter) => filters.recruiters.includes(recruiter.id))
    }

    // In a real application, you would also filter by date range and clients
    // This would typically be done on the server side with API calls

    return result
  }, [filters])

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalMeetings = filteredData.reduce((sum, r) => sum + r.meetings, 0)
    const totalInteractions = filteredData.reduce((sum, r) => sum + r.interactions, 0)
    const totalCandidates = filteredData.reduce((sum, r) => sum + r.candidates, 0)

    return {
      totalMeetings,
      totalInteractions,
      totalCandidates,
    }
  }, [filteredData])

  // Get date range description for subtitles
  const getDateRangeDescription = () => {
    if (filters.dateRange?.start && filters.dateRange?.end) {
      const start = new Date(filters.dateRange.start)
      const end = new Date(filters.dateRange.end)

      // Check if it's a standard period
      const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24))

      if (diffDays <= 7) return "this week"
      if (diffDays <= 31) return "this month"
      if (diffDays <= 92) return "this quarter"
      if (diffDays <= 366) return "this year"

      return `from ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`
    }

    return "this week" // Default
  }

  // Dynamic subtitles based on filters
  const getRecruiterSubtitle = (filters) => {
    const parts = []

    if (filters.recruiters && filters.recruiters.length > 0) {
      parts.push(`For ${filters.recruiters.length} selected recruiter${filters.recruiters.length > 1 ? "s" : ""}`)
    }

    parts.push(getDateRangeDescription())

    return parts.join(", ")
  }

  const getCandidateSubtitle = (filters) => {
    const parts = []

    if (filters.recruiters && filters.recruiters.length > 0) {
      parts.push(`For ${filters.recruiters.length} selected recruiter${filters.recruiters.length > 1 ? "s" : ""}`)
    }

    parts.push(getDateRangeDescription())

    return parts.join(", ")
  }

  const getPipelineSubtitle = (filters) => {
    const parts = []

    if (filters.recruiters && filters.recruiters.length > 0) {
      parts.push(`For ${filters.recruiters.length} selected recruiter${filters.recruiters.length > 1 ? "s" : ""}`)
    }

    parts.push("Active candidates")

    return parts.join(", ")
  }

  // Check if a metric should be displayed based on filters
  const shouldShowMetric = (metricId) => {
    if (!filters.metrics || filters.metrics.length === 0) return true
    return filters.metrics.includes(metricId)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Activity Metrics</h2>

        <Grid columns={3} gap={3}>
          {shouldShowMetric("meetings") && (
            <GridItem>
              <MetricCard
                title="Business Development"
                value={summaryMetrics.totalMeetings.toString()}
                dynamicSubtitle={getRecruiterSubtitle}
                icon={BriefcaseIcon}
                trend="up"
                trendValue="8%"
                filters={filters}
                chart={() => (
                  <BarChartComponent
                    data={bdActivityData}
                    height={120}
                    showXAxis={true}
                    barColor="#4ade80"
                    barSize={16}
                  />
                )}
              />
            </GridItem>
          )}

          {shouldShowMetric("interactions") && (
            <GridItem>
              <MetricCard
                title="Candidate Engagement"
                value={summaryMetrics.totalInteractions.toString()}
                dynamicSubtitle={getCandidateSubtitle}
                icon={UserIcon}
                trend="up"
                trendValue="12%"
                filters={filters}
                chart={() => (
                  <LineChartComponent
                    data={candidateEngagementData}
                    height={120}
                    showXAxis={true}
                    lineColor="#60a5fa"
                    dot={true}
                  />
                )}
              />
            </GridItem>
          )}

          {shouldShowMetric("candidates") && (
            <GridItem>
              <MetricCard
                title="Pipeline Management"
                value={summaryMetrics.totalCandidates.toString()}
                dynamicSubtitle={getPipelineSubtitle}
                icon={ChartBarIcon}
                trend="up"
                trendValue="5%"
                filters={filters}
                chart={() => (
                  <PieChartComponent data={pipelineData} height={120} innerRadius="50%" showLegend={false} />
                )}
              />
            </GridItem>
          )}
        </Grid>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-800">Recruiter Activity Details</h2>
          <ExportButton data={filteredData} filename="recruiter_activity" />
        </div>

        <DataTable
          data={filteredData}
          columns={columns}
          emptyMessage="No recruiter data available for the selected filters"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Role Management</h2>

        <Grid columns={2} gap={3}>
          <GridItem>
            <MetricCard
              title="Role Status"
              value="44"
              dynamicSubtitle={(filters) => {
                const parts = []

                if (filters.recruiters && filters.recruiters.length > 0) {
                  parts.push(
                    `For ${filters.recruiters.length} selected recruiter${filters.recruiters.length > 1 ? "s" : ""}`,
                  )
                }

                parts.push("Total roles")

                return parts.join(", ")
              }}
              icon={BriefcaseIcon}
              filters={filters}
              chart={() => (
                <PieChartComponent data={roleData} height={200} colors={["#60a5fa", "#4ade80", "#f97316"]} />
              )}
            />
          </GridItem>

          <GridItem>
            <MetricCard
              title="Database Management"
              value="287"
              dynamicSubtitle={(filters) => {
                const parts = []

                if (filters.recruiters && filters.recruiters.length > 0) {
                  parts.push(
                    `For ${filters.recruiters.length} selected recruiter${filters.recruiters.length > 1 ? "s" : ""}`,
                  )
                }

                parts.push(`Profiles updated ${getDateRangeDescription()}`)

                return parts.join(", ")
              }}
              icon={DatabaseIcon}
              trend="up"
              trendValue="15%"
              filters={filters}
              chart={() => (
                <BarChartComponent
                  data={[
                    { name: "Week 1", value: 65 },
                    { name: "Week 2", value: 78 },
                    { name: "Week 3", value: 82 },
                    { name: "Week 4", value: 62 },
                  ]}
                  height={200}
                  showXAxis={true}
                  barColor="#a78bfa"
                  barSize={30}
                />
              )}
            />
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}

export default RecruiterProductivity

