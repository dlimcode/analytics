"use client"

import { useMemo } from "react"
import { Grid, GridItem } from "../Dashboard/Grid"
import MetricCard from "../Dashboard/MetricCard"
import BarChartComponent from "../Charts/BarChartComponent"
import PieChartComponent from "../Charts/PieChartComponent"
import LineChartComponent from "../Charts/LineChartComponent"
import DataTable from "../Tables/DataTable"
import ExportButton from "../Exports/ExportButton"
import { DatabaseIcon, ChartBarIcon, UserIcon } from "../Dashboard/icons"

// Sample data - would be replaced with real data from the database
const weeklyInputData = [
  { name: "Mon", value: 45 },
  { name: "Tue", value: 52 },
  { name: "Wed", value: 38 },
  { name: "Thu", value: 41 },
  { name: "Fri", value: 35 },
]

const profileQualityData = [
  { name: "Complete", value: 65 },
  { name: "Partial", value: 25 },
  { name: "Minimal", value: 10 },
]

const monthlyInputTrendData = [
  { name: "Jan", value: 420 },
  { name: "Feb", value: 480 },
  { name: "Mar", value: 520 },
  { name: "Apr", value: 490 },
  { name: "May", value: 550 },
  { name: "Jun", value: 580 },
]

const recruiterInputData = [
  {
    id: "1",
    name: "Sarah Johnson",
    inputs: 78,
    profileQuality: 92,
    newProfiles: 24,
    improvement: 15,
  },
  {
    id: "2",
    name: "Michael Chen",
    inputs: 65,
    profileQuality: 95,
    newProfiles: 18,
    improvement: 8,
  },
  {
    id: "3",
    name: "Jessica Lee",
    inputs: 82,
    profileQuality: 88,
    newProfiles: 28,
    improvement: 12,
  },
  {
    id: "4",
    name: "David Wilson",
    inputs: 58,
    profileQuality: 85,
    newProfiles: 15,
    improvement: 45,
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    inputs: 70,
    profileQuality: 90,
    newProfiles: 20,
    improvement: 10,
  },
]

const columns = [
  {
    accessorKey: "name",
    header: "Recruiter",
    cell: ({ row }) => <div className="font-medium text-sm">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "inputs",
    header: "System Inputs",
    cell: ({ row }) => <div className="text-right">{row.getValue("inputs")}</div>,
  },
  {
    accessorKey: "profileQuality",
    header: "Profile Quality (%)",
    cell: ({ row }) => <div className="text-right">{row.getValue("profileQuality")}%</div>,
  },
  {
    accessorKey: "newProfiles",
    header: "New Profiles",
    cell: ({ row }) => <div className="text-right">{row.getValue("newProfiles")}</div>,
  },
  {
    accessorKey: "improvement",
    header: "Improvement (%)",
    cell: ({ row }) => <div className="text-right">{row.getValue("improvement")}%</div>,
  },
]

const DataInputTracking = ({ filters = {} }) => {
  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    let result = [...recruiterInputData]

    if (filters.recruiters && filters.recruiters.length > 0) {
      result = result.filter((recruiter) => filters.recruiters.includes(recruiter.id))
    }

    // In a real application, you would also filter by date range and clients
    // This would typically be done on the server side with API calls

    return result
  }, [filters])

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalInputs = filteredData.reduce((sum, r) => sum + r.inputs, 0)
    const avgQuality = filteredData.length
      ? filteredData.reduce((sum, r) => sum + r.profileQuality, 0) / filteredData.length
      : 0
    const totalNewProfiles = filteredData.reduce((sum, r) => sum + r.newProfiles, 0)

    return {
      totalInputs,
      avgQuality,
      totalNewProfiles,
    }
  }, [filteredData])

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Data Input Overview</h2>

        <Grid columns={3} gap={3}>
          <GridItem>
            <MetricCard
              title="Weekly System Inputs"
              value={summaryMetrics.totalInputs.toString()}
              dynamicSubtitle={(filters) => {
                if (filters.recruiters && filters.recruiters.length > 0) {
                  return `From ${filters.recruiters.length} selected recruiter${filters.recruiters.length > 1 ? "s" : ""}`
                }
                return "This week"
              }}
              icon={DatabaseIcon}
              trend="up"
              trendValue="8%"
              filters={filters}
              chart={() => (
                <BarChartComponent data={weeklyInputData} height={120} showXAxis={true} barColor="#f97316" />
              )}
            />
          </GridItem>

          <GridItem>
            <MetricCard
              title="Profile Completeness"
              value={`${Math.round(summaryMetrics.avgQuality)}%`}
              dynamicSubtitle={(filters) => {
                if (filters.recruiters && filters.recruiters.length > 0) {
                  return `For ${filters.recruiters.length} selected recruiter${filters.recruiters.length > 1 ? "s" : ""}`
                }
                return "Average across all profiles"
              }}
              icon={ChartBarIcon}
              trend="up"
              trendValue="5%"
              filters={filters}
              chart={() => (
                <PieChartComponent
                  data={profileQualityData}
                  height={120}
                  innerRadius="60%"
                  colors={["#4ade80", "#facc15", "#f43f5e"]}
                />
              )}
            />
          </GridItem>

          <GridItem>
            <MetricCard
              title="New Profiles Added"
              value={summaryMetrics.totalNewProfiles.toString()}
              dynamicSubtitle={(filters) => {
                if (filters.recruiters && filters.recruiters.length > 0) {
                  return `By ${filters.recruiters.length} selected recruiter${filters.recruiters.length > 1 ? "s" : ""}`
                }
                return "This month"
              }}
              icon={UserIcon}
              trend="up"
              trendValue="12%"
              filters={filters}
              chart={() => (
                <LineChartComponent
                  data={[
                    { name: "Week 1", value: 18 },
                    { name: "Week 2", value: 24 },
                    { name: "Week 3", value: 28 },
                    { name: "Week 4", value: 17 },
                  ]}
                  height={120}
                  showXAxis={true}
                  lineColor="#a78bfa"
                />
              )}
            />
          </GridItem>
        </Grid>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-800">Recruiter Data Input Details</h2>
          <ExportButton data={filteredData} filename="recruiter_data_input" />
        </div>

        <DataTable
          data={filteredData}
          columns={columns}
          emptyMessage="No recruiter data available for the selected filters"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Data Quality Metrics</h2>

        <Grid columns={2} gap={3}>
          <GridItem>
            <MetricCard
              title="Monthly Input Trend"
              value="3,040"
              dynamicSubtitle={(filters) => {
                if (filters.recruiters && filters.recruiters.length > 0) {
                  return `For ${filters.recruiters.length} selected recruiter${filters.recruiters.length > 1 ? "s" : ""}`
                }
                return "Total inputs YTD"
              }}
              icon={DatabaseIcon}
              filters={filters}
              chart={() => (
                <LineChartComponent
                  data={monthlyInputTrendData}
                  height={200}
                  showXAxis={true}
                  showYAxis={true}
                  lineColor="#60a5fa"
                />
              )}
            />
          </GridItem>

          <GridItem>
            <MetricCard
              title="Profile Quality Distribution"
              value="65%"
              dynamicSubtitle={(filters) => {
                if (filters.recruiters && filters.recruiters.length > 0) {
                  return `For ${filters.recruiters.length} selected recruiter${filters.recruiters.length > 1 ? "s" : ""}`
                }
                return "Complete profiles"
              }}
              icon={ChartBarIcon}
              filters={filters}
              chart={() => (
                <PieChartComponent
                  data={[
                    { name: "High Quality", value: 45 },
                    { name: "Medium Quality", value: 35 },
                    { name: "Low Quality", value: 20 },
                  ]}
                  height={200}
                  colors={["#4ade80", "#facc15", "#f43f5e"]}
                />
              )}
            />
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}

export default DataInputTracking

