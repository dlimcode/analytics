"use client"

import { useMemo } from "react"
import { Grid, GridItem } from "../Dashboard/Grid"
import MetricCard from "../Dashboard/MetricCard"
import BarChartComponent from "../Charts/BarChartComponent"
import StackedBarChartComponent from "../Charts/StackedBarChartComponent"
import PieChartComponent from "../Charts/PieChartComponent"
import DataTable from "../Tables/DataTable"
import ExportButton from "../Exports/ExportButton"
import { BriefcaseIcon, CurrencyDollarIcon } from "../Dashboard/icons"

// Sample data - would be replaced with real data from the database
const teamRevenueData = [
  { name: "Team A", value: 120000 },
  { name: "Team B", value: 145000 },
  { name: "Team C", value: 95000 },
  { name: "Team D", value: 110000 },
]

const teamActivityData = [
  { name: "Team A", bd: 45, candidates: 78, placements: 12 },
  { name: "Team B", bd: 52, candidates: 92, placements: 15 },
  { name: "Team C", bd: 38, candidates: 65, placements: 8 },
  { name: "Team D", bd: 41, candidates: 72, placements: 10 },
]

const industryData = [
  { name: "Technology", value: 35 },
  { name: "Finance", value: 25 },
  { name: "Healthcare", value: 20 },
  { name: "Manufacturing", value: 15 },
  { name: "Retail", value: 5 },
]

const teamMemberData = [
  {
    id: "1",
    name: "Team A",
    revenue: 120000,
    meetings: 45,
    placements: 12,
    growth: 15,
  },
  {
    id: "2",
    name: "Team B",
    revenue: 145000,
    meetings: 52,
    placements: 15,
    growth: 22,
  },
  {
    id: "3",
    name: "Team C",
    revenue: 95000,
    meetings: 38,
    placements: 8,
    growth: 5,
  },
  {
    id: "4",
    name: "Team D",
    revenue: 110000,
    meetings: 41,
    placements: 10,
    growth: 12,
  },
]

const columns = [
  {
    accessorKey: "name",
    header: "Team",
    cell: ({ row }) => <div className="font-medium text-sm">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => <div className="text-right font-medium">${row.getValue("revenue").toLocaleString()}</div>,
  },
  {
    accessorKey: "meetings",
    header: "BD Meetings",
    cell: ({ row }) => <div className="text-right">{row.getValue("meetings")}</div>,
  },
  {
    accessorKey: "placements",
    header: "Placements",
    cell: ({ row }) => <div className="text-right">{row.getValue("placements")}</div>,
  },
  {
    accessorKey: "growth",
    header: "Growth (%)",
    cell: ({ row }) => <div className="text-right">{row.getValue("growth")}%</div>,
  },
]

const TeamPerformance = ({ filters = {} }) => {
  // In a real application, you would filter the data based on the filters
  // For this example, we'll just use the full dataset
  const filteredData = teamMemberData

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalRevenue = filteredData.reduce((sum, t) => sum + t.revenue, 0)
    const totalPlacements = filteredData.reduce((sum, t) => sum + t.placements, 0)
    const avgGrowth = filteredData.length ? filteredData.reduce((sum, t) => sum + t.growth, 0) / filteredData.length : 0

    return {
      totalRevenue,
      totalPlacements,
      avgGrowth,
    }
  }, [filteredData])

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Team Revenue Performance</h2>

        <Grid columns={2} gap={3}>
          <GridItem>
            <MetricCard
              title="Revenue by Team"
              value={`$${summaryMetrics.totalRevenue.toLocaleString()}`}
              dynamicSubtitle={(filters) => {
                if (filters.clients && filters.clients.length > 0) {
                  return `For ${filters.clients.length} selected client${filters.clients.length > 1 ? "s" : ""}`
                }
                return "Total revenue across all teams"
              }}
              icon={CurrencyDollarIcon}
              filters={filters}
              chart={() => (
                <BarChartComponent
                  data={teamRevenueData}
                  height={200}
                  showXAxis={true}
                  showYAxis={true}
                  barColor="#60a5fa"
                  barSize={30}
                />
              )}
            />
          </GridItem>

          <GridItem>
            <MetricCard
              title="Industry Distribution"
              value="5 Industries"
              dynamicSubtitle={(filters) => {
                if (filters.clients && filters.clients.length > 0) {
                  return `For ${filters.clients.length} selected client${filters.clients.length > 1 ? "s" : ""}`
                }
                return "Across all teams"
              }}
              icon={BriefcaseIcon}
              filters={filters}
              chart={() => (
                <PieChartComponent
                  data={industryData}
                  height={200}
                  innerRadius="50%"
                  colors={["#4ade80", "#60a5fa", "#f97316", "#a78bfa", "#f43f5e"]}
                />
              )}
            />
          </GridItem>
        </Grid>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-800">Team Performance Details</h2>
          <ExportButton data={filteredData} filename="team_performance" />
        </div>

        <DataTable
          data={filteredData}
          columns={columns}
          emptyMessage="No team data available for the selected filters"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Team Activity Breakdown</h2>

        <div className="h-64">
          <StackedBarChartComponent
            data={teamActivityData}
            height={250}
            showXAxis={true}
            showYAxis={true}
            barSize={40}
            bars={[
              { dataKey: "bd", name: "Business Development", color: "#4ade80" },
              { dataKey: "candidates", name: "Candidate Engagement", color: "#60a5fa" },
              { dataKey: "placements", name: "Placements", color: "#f97316" },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default TeamPerformance

