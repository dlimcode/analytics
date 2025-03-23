"use client"

import { useMemo } from "react"
import { Grid, GridItem } from "../Dashboard/Grid"
import MetricCard from "../Dashboard/MetricCard"
import BarChartComponent from "../Charts/BarChartComponent"
import StackedBarChartComponent from "../Charts/StackedBarChartComponent"
import PieChartComponent from "../Charts/PieChartComponent"
import DataTable from "../Tables/DataTable"
import ExportButton from "../Exports/ExportButton"
import { CurrencyDollarIcon } from "../Dashboard/icons"

// Sample data - would be replaced with real data from the database
const monthlyRevenueData = [
  { name: "Jan", value: 125000 },
  { name: "Feb", value: 145000 },
  { name: "Mar", value: 160000 },
  { name: "Apr", value: 175000 },
  { name: "May", value: 190000 },
  { name: "Jun", value: 210000 },
]

const clientValueData = [
  { name: "Tech", current: 85000, projected: 120000 },
  { name: "Finance", current: 65000, projected: 95000 },
  { name: "Healthcare", current: 55000, projected: 75000 },
  { name: "Manufacturing", current: 45000, projected: 60000 },
  { name: "Retail", current: 30000, projected: 40000 },
]

const clientRevenueData = [
  {
    id: "1",
    name: "Acme Corp",
    industry: "Technology",
    revenue: 250000,
    placements: 8,
    openRoles: 5,
    avgFee: 31250,
  },
  {
    id: "2",
    name: "TechGiant Inc",
    industry: "Technology",
    revenue: 320000,
    placements: 10,
    openRoles: 7,
    avgFee: 32000,
  },
  {
    id: "3",
    name: "Global Finance",
    industry: "Finance",
    revenue: 180000,
    placements: 6,
    openRoles: 4,
    avgFee: 30000,
  },
  {
    id: "4",
    name: "Healthcare Partners",
    industry: "Healthcare",
    revenue: 210000,
    placements: 7,
    openRoles: 6,
    avgFee: 30000,
  },
  {
    id: "5",
    name: "Manufacturing Solutions",
    industry: "Manufacturing",
    revenue: 150000,
    placements: 5,
    openRoles: 3,
    avgFee: 30000,
  },
]

const columns = [
  {
    accessorKey: "name",
    header: "Client",
    cell: ({ row }) => <div className="font-medium text-sm">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "industry",
    header: "Industry",
    cell: ({ row }) => <div>{row.getValue("industry")}</div>,
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => <div className="text-right font-medium">${row.getValue("revenue").toLocaleString()}</div>,
  },
  {
    accessorKey: "placements",
    header: "Placements",
    cell: ({ row }) => <div className="text-right">{row.getValue("placements")}</div>,
  },
  {
    accessorKey: "openRoles",
    header: "Open Roles",
    cell: ({ row }) => <div className="text-right">{row.getValue("openRoles")}</div>,
  },
  {
    accessorKey: "avgFee",
    header: "Avg. Fee",
    cell: ({ row }) => <div className="text-right">${row.getValue("avgFee").toLocaleString()}</div>,
  },
]

const pipelineStageData = [
  { name: "Current", value: 450000 },
  { name: "Projected", value: 650000 },
  { name: "Invoiced", value: 320000 },
  { name: "Collected", value: 280000 },
]

const RevenueAnalytics = ({ filters = {} }) => {
  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    let result = [...clientRevenueData]

    if (filters.clients && filters.clients.length > 0) {
      result = result.filter((client) => filters.clients.includes(client.id))
    }

    // In a real application, you would also filter by date range and recruiters
    // This would typically be done on the server side with API calls

    return result
  }, [filters])

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalRevenue = filteredData.reduce((sum, c) => sum + c.revenue, 0)
    const totalPlacements = filteredData.reduce((sum, c) => sum + c.placements, 0)
    const totalOpenRoles = filteredData.reduce((sum, c) => sum + c.openRoles, 0)

    return {
      totalRevenue,
      totalPlacements,
      totalOpenRoles,
    }
  }, [filteredData])

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Revenue Overview</h2>

        <Grid columns={2} gap={3}>
          <GridItem>
            <MetricCard
              title="Monthly Revenue"
              value={`$${summaryMetrics.totalRevenue.toLocaleString()}`}
              dynamicSubtitle={(filters) => {
                if (filters.clients && filters.clients.length > 0) {
                  return `From ${filters.clients.length} selected client${filters.clients.length > 1 ? "s" : ""}`
                }
                return "June 2023"
              }}
              icon={CurrencyDollarIcon}
              trend="up"
              trendValue="10.5%"
              filters={filters}
              chart={() => (
                <BarChartComponent
                  data={monthlyRevenueData}
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
              title="Revenue Pipeline"
              value="$1,700,000"
              dynamicSubtitle={(filters) => {
                if (filters.clients && filters.clients.length > 0) {
                  return `For ${filters.clients.length} selected client${filters.clients.length > 1 ? "s" : ""}`
                }
                return "Total pipeline value"
              }}
              icon={CurrencyDollarIcon}
              filters={filters}
              chart={() => (
                <PieChartComponent
                  data={pipelineStageData}
                  height={200}
                  innerRadius="50%"
                  colors={["#4ade80", "#60a5fa", "#f97316", "#a78bfa"]}
                />
              )}
            />
          </GridItem>
        </Grid>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-800">Client Revenue Details</h2>
          <ExportButton data={filteredData} filename="client_revenue" />
        </div>

        <DataTable
          data={filteredData}
          columns={columns}
          emptyMessage="No client data available for the selected filters"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Client Value Analysis</h2>

        <div className="h-64">
          <StackedBarChartComponent
            data={clientValueData}
            height={250}
            showXAxis={true}
            showYAxis={true}
            barSize={40}
            bars={[
              { dataKey: "current", name: "Current Revenue", color: "#4ade80" },
              { dataKey: "projected", name: "Projected Revenue", color: "#60a5fa" },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default RevenueAnalytics

