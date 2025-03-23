"use client"

import { useState, useMemo } from "react"
import { Grid, GridItem } from "../Dashboard/Grid"
import MetricCard from "../Dashboard/MetricCard"
import FilterPanel from "../Filters/FilterPanel"
import DataTable from "../Tables/DataTable"
import ExportButton from "../Exports/ExportButton"
import { BriefcaseIcon, UserIcon, ClockIcon, StarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample data - would be replaced with real data from the database
const recruiterPerformanceData = [
  {
    id: "1",
    name: "Sarah Johnson",
    hires: 12,
    timeToHire: 28,
    candidateQuality: 4.8,
    activeRoles: 15,
    interviews: 45,
    placements: 12,
    revenue: 144000,
  },
  {
    id: "2",
    name: "Michael Chen",
    hires: 9,
    timeToHire: 32,
    candidateQuality: 4.5,
    activeRoles: 12,
    interviews: 38,
    placements: 9,
    revenue: 108000,
  },
  {
    id: "3",
    name: "Jessica Lee",
    hires: 15,
    timeToHire: 25,
    candidateQuality: 4.9,
    activeRoles: 18,
    interviews: 52,
    placements: 15,
    revenue: 180000,
  },
  {
    id: "4",
    name: "David Wilson",
    hires: 7,
    timeToHire: 35,
    candidateQuality: 4.2,
    activeRoles: 10,
    interviews: 30,
    placements: 7,
    revenue: 84000,
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    hires: 11,
    timeToHire: 30,
    candidateQuality: 4.6,
    activeRoles: 14,
    interviews: 42,
    placements: 11,
    revenue: 132000,
  },
]

const columns = [
  {
    accessorKey: "name",
    header: "Recruiter",
    cell: ({ row }) => <div className="font-medium text-sm">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "hires",
    header: "Hires",
    cell: ({ row }) => <div className="text-right font-medium">{row.getValue("hires")}</div>,
  },
  {
    accessorKey: "timeToHire",
    header: "Avg. Time to Hire (days)",
    cell: ({ row }) => <div className="text-right">{row.getValue("timeToHire")}</div>,
  },
  {
    accessorKey: "candidateQuality",
    header: "Candidate Quality",
    cell: ({ row }) => {
      const quality = row.getValue("candidateQuality")
      let color = "bg-gray-100 text-gray-800"

      if (quality >= 4.5) color = "bg-green-100 text-green-800"
      else if (quality >= 4.0) color = "bg-blue-100 text-blue-800"
      else if (quality >= 3.5) color = "bg-yellow-100 text-yellow-800"

      return (
        <div className="text-right">
          <Badge className={`${color} font-medium`}>{quality.toFixed(1)}</Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "activeRoles",
    header: "Active Roles",
    cell: ({ row }) => <div className="text-right">{row.getValue("activeRoles")}</div>,
  },
  {
    accessorKey: "interviews",
    header: "Interviews",
    cell: ({ row }) => <div className="text-right">{row.getValue("interviews")}</div>,
  },
  {
    accessorKey: "placements",
    header: "Placements",
    cell: ({ row }) => <div className="text-right">{row.getValue("placements")}</div>,
  },
  {
    accessorKey: "revenue",
    header: "Revenue Generated",
    cell: ({ row }) => <div className="text-right font-medium">${row.getValue("revenue").toLocaleString()}</div>,
  },
]

const RecruiterPerformance = () => {
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    recruiters: [],
    clients: [],
  })

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    let result = [...recruiterPerformanceData]

    if (filters.recruiters.length > 0) {
      result = result.filter((recruiter) => filters.recruiters.includes(recruiter.id))
    }

    // In a real application, you would also filter by date range and clients
    // This would typically be done on the server side with API calls

    return result
  }, [filters])

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalHires = filteredData.reduce((sum, r) => sum + r.hires, 0)
    const avgTimeToHire = filteredData.length
      ? filteredData.reduce((sum, r) => sum + r.timeToHire, 0) / filteredData.length
      : 0
    const avgQuality = filteredData.length
      ? filteredData.reduce((sum, r) => sum + r.candidateQuality, 0) / filteredData.length
      : 0
    const totalRevenue = filteredData.reduce((sum, r) => sum + r.revenue, 0)

    return {
      totalHires,
      avgTimeToHire,
      avgQuality,
      totalRevenue,
    }
  }, [filteredData])

  return (
    <div className="space-y-4">
      <FilterPanel onFilterChange={setFilters} availableFilters={["date", "recruiter"]} />

      <Grid columns={4} gap={3}>
        <GridItem>
          <MetricCard
            title="Total Hires"
            value={summaryMetrics.totalHires.toString()}
            subtitle="Across all recruiters"
            icon={UserIcon}
          />
        </GridItem>

        <GridItem>
          <MetricCard
            title="Avg. Time to Hire"
            value={`${Math.round(summaryMetrics.avgTimeToHire)} days`}
            subtitle="From initial contact to placement"
            icon={ClockIcon}
          />
        </GridItem>

        <GridItem>
          <MetricCard
            title="Avg. Candidate Quality"
            value={summaryMetrics.avgQuality.toFixed(1)}
            subtitle="Based on client feedback (1-5)"
            icon={StarIcon}
          />
        </GridItem>

        <GridItem>
          <MetricCard
            title="Total Revenue"
            value={`$${summaryMetrics.totalRevenue.toLocaleString()}`}
            subtitle="From all placements"
            icon={BriefcaseIcon}
          />
        </GridItem>
      </Grid>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-800">Recruiter Performance Metrics</h2>
          <ExportButton data={filteredData} filename="recruiter_performance" />
        </div>

        <DataTable
          data={filteredData}
          columns={columns}
          emptyMessage="No recruiter data available for the selected filters"
        />
      </div>
    </div>
  )
}

export default RecruiterPerformance

