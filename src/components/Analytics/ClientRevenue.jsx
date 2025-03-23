"use client"

import { useMemo } from "react"
import { Grid, GridItem } from "../Dashboard/Grid"
import MetricCard from "../Dashboard/MetricCard"
import DataTable from "../Tables/DataTable"
import ExportButton from "../Exports/ExportButton"
import BarChartComponent from "../Charts/BarChartComponent"
import PieChartComponent from "../Charts/PieChartComponent"
import { Building2, TrendingUp, Users, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample data - would be replaced with real data from the database
const clientRevenueData = [
  {
    id: "1",
    name: "Acme Corp",
    industry: "Technology",
    revenue: 250000,
    placements: 8,
    openRoles: 5,
    avgFee: 31250,
    growth: 15,
  },
  {
    id: "2",
    name: "TechGiant Inc",
    industry: "Technology",
    revenue: 320000,
    placements: 10,
    openRoles: 7,
    avgFee: 32000,
    growth: 22,
  },
  {
    id: "3",
    name: "Global Finance",
    industry: "Finance",
    revenue: 180000,
    placements: 6,
    openRoles: 4,
    avgFee: 30000,
    growth: 8,
  },
  {
    id: "4",
    name: "Healthcare Partners",
    industry: "Healthcare",
    revenue: 210000,
    placements: 7,
    openRoles: 6,
    avgFee: 30000,
    growth: 12,
  },
  {
    id: "5",
    name: "Manufacturing Solutions",
    industry: "Manufacturing",
    revenue: 150000,
    placements: 5,
    openRoles: 3,
    avgFee: 30000,
    growth: 5,
  },
  {
    id: "6",
    name: "Retail Innovations",
    industry: "Retail",
    revenue: 120000,
    placements: 4,
    openRoles: 2,
    avgFee: 30000,
    growth: -3,
  },
  {
    id: "7",
    name: "Energy Dynamics",
    industry: "Energy",
    revenue: 190000,
    placements: 6,
    openRoles: 4,
    avgFee: 31667,
    growth: 10,
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
  {
    accessorKey: "growth",
    header: "YoY Growth",
    cell: ({ row }) => {
      const growth = row.getValue("growth")
      const color = growth >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"

      return (
        <div className="text-right">
          <Badge className={`${color} font-medium`}>
            {growth >= 0 ? "+" : ""}
            {growth}%
          </Badge>
        </div>
      )
    },
  },
]

const ClientRevenue = ({ filters = {} }) => {
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
    const avgGrowth = filteredData.length ? filteredData.reduce((sum, c) => sum + c.growth, 0) / filteredData.length : 0

    return {
      totalRevenue,
      totalPlacements,
      totalOpenRoles,
      avgGrowth,
    }
  }, [filteredData])

  // Prepare chart data
  const revenueByClientData = useMemo(() => {
    return filteredData
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((client) => ({
        name: client.name,
        value: client.revenue,
      }))
  }, [filteredData])

  const revenueByIndustryData = useMemo(() => {
    const industryMap = filteredData.reduce((acc, client) => {
      if (!acc[client.industry]) {
        acc[client.industry] = 0
      }
      acc[client.industry] += client.revenue
      return acc
    }, {})

    return Object.entries(industryMap).map(([name, value]) => ({
      name,
      value,
    }))
  }, [filteredData])

  // Dynamic subtitles based on filters
  const getClientSubtitle = (filters) => {
    if (filters.clients && filters.clients.length > 0) {
      return `From ${filters.clients.length} selected client${filters.clients.length > 1 ? "s" : ""}`
    }
    return "From all clients"
  }

  const getPlacementsSubtitle = (filters) => {
    if (filters.clients && filters.clients.length > 0) {
      return `For ${filters.clients.length} selected client${filters.clients.length > 1 ? "s" : ""}`
    }
    return "Across all clients"
  }

  const getRolesSubtitle = (filters) => {
    if (filters.clients && filters.clients.length > 0) {
      return `For ${filters.clients.length} selected client${filters.clients.length > 1 ? "s" : ""}`
    }
    return "Currently active"
  }

  const getGrowthSubtitle = (filters) => {
    if (filters.clients && filters.clients.length > 0) {
      return `For ${filters.clients.length} selected client${filters.clients.length > 1 ? "s" : ""}`
    }
    return "Revenue growth rate"
  }

  return (
    <div className="space-y-4">
      <Grid columns={4} gap={3}>
        <GridItem>
          <MetricCard
            title="Total Revenue"
            value={`$${summaryMetrics.totalRevenue.toLocaleString()}`}
            dynamicSubtitle={getClientSubtitle}
            icon={Building2}
            filters={filters}
          />
        </GridItem>

        <GridItem>
          <MetricCard
            title="Total Placements"
            value={summaryMetrics.totalPlacements.toString()}
            dynamicSubtitle={getPlacementsSubtitle}
            icon={Users}
            filters={filters}
          />
        </GridItem>

        <GridItem>
          <MetricCard
            title="Open Roles"
            value={summaryMetrics.totalOpenRoles.toString()}
            dynamicSubtitle={getRolesSubtitle}
            icon={Briefcase}
            filters={filters}
          />
        </GridItem>

        <GridItem>
          <MetricCard
            title="Avg. YoY Growth"
            value={`${Math.round(summaryMetrics.avgGrowth)}%`}
            dynamicSubtitle={getGrowthSubtitle}
            icon={TrendingUp}
            trend={summaryMetrics.avgGrowth >= 0 ? "up" : "down"}
            trendValue={`${Math.abs(Math.round(summaryMetrics.avgGrowth))}%`}
            filters={filters}
          />
        </GridItem>
      </Grid>

      <Grid columns={2} gap={3}>
        <GridItem>
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
            <h2 className="text-base font-semibold mb-3 text-gray-800">Top Clients by Revenue</h2>
            <div className="h-64">
              <BarChartComponent
                data={revenueByClientData}
                height={250}
                showXAxis={true}
                showYAxis={true}
                barColor="#60a5fa"
                barSize={30}
                showGrid={true}
              />
            </div>
          </div>
        </GridItem>

        <GridItem>
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
            <h2 className="text-base font-semibold mb-3 text-gray-800">Revenue by Industry</h2>
            <div className="h-64">
              <PieChartComponent
                data={revenueByIndustryData}
                height={250}
                innerRadius="50%"
                colors={["#4ade80", "#60a5fa", "#f97316", "#a78bfa", "#f43f5e", "#facc15"]}
              />
            </div>
          </div>
        </GridItem>
      </Grid>

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
    </div>
  )
}

export default ClientRevenue

