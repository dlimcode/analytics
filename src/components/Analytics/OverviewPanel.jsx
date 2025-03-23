"use client"

import { useMemo } from "react"
import { Grid, GridItem } from "../Dashboard/Grid"
import MetricCard from "../Dashboard/MetricCard"
import BarChartComponent from "../Charts/BarChartComponent"
import LineChartComponent from "../Charts/LineChartComponent"
import PieChartComponent from "../Charts/PieChartComponent"
import MultiLineChartComponent from "../Charts/MultiLineChartComponent"
import { BriefcaseIcon, UserIcon, ChartBarIcon, CurrencyDollarIcon, KeyIcon, LightningIcon } from "../Dashboard/icons"

// Sample data - would be replaced with real data from the database
const revenueData = [
  { name: "Jan", value: 125000 },
  { name: "Feb", value: 145000 },
  { name: "Mar", value: 160000 },
  { name: "Apr", value: 175000 },
  { name: "May", value: 190000 },
  { name: "Jun", value: 210000 },
]

const pipelineData = [
  { name: "Current", value: 450000 },
  { name: "Projected", value: 650000 },
  { name: "Invoiced", value: 320000 },
  { name: "Collected", value: 280000 },
]

const candidateStatusData = [
  { name: "New", value: 45 },
  { name: "Contacted", value: 78 },
  { name: "Interviewing", value: 32 },
  { name: "Offer", value: 15 },
  { name: "Hired", value: 8 },
]

const activityData = [
  { name: "Mon", value: 42 },
  { name: "Tue", value: 58 },
  { name: "Wed", value: 65 },
  { name: "Thu", value: 49 },
  { name: "Fri", value: 38 },
  { name: "Sat", value: 12 },
  { name: "Sun", value: 8 },
]

const teamComparisonData = [
  { name: "Team A", bd: 28, candidates: 45, placements: 12 },
  { name: "Team B", bd: 35, candidates: 52, placements: 15 },
  { name: "Team C", bd: 22, candidates: 38, placements: 9 },
  { name: "Team D", bd: 31, candidates: 41, placements: 11 },
]

// Overview panel doesn't use filters - it shows aggregate data
const OverviewPanel = () => {
  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0)
    const totalPlacements = candidateStatusData.find((item) => item.name === "Hired")?.value || 0
    const totalCandidates = candidateStatusData.reduce((sum, item) => sum + item.value, 0)
    const totalActivity = activityData.reduce((sum, item) => sum + item.value, 0)

    return {
      totalRevenue,
      totalPlacements,
      totalCandidates,
      totalActivity,
    }
  }, [])

  return (
    <div className="space-y-4">
      {/* Top KPIs Row */}
      <Grid columns={4} gap={3}>
        <GridItem>
          <MetricCard
            title="Active Roles"
            value="87"
            subtitle="24 new this month"
            icon={BriefcaseIcon}
            trend="up"
            trendValue="12%"
          />
        </GridItem>

        <GridItem>
          <MetricCard
            title="Revenue MTD"
            value={`$${revenueData[revenueData.length - 1].value.toLocaleString()}`}
            subtitle={`vs $${revenueData[revenueData.length - 2].value.toLocaleString()} last month`}
            icon={CurrencyDollarIcon}
            trend="up"
            trendValue="10.5%"
          />
        </GridItem>

        <GridItem>
          <MetricCard
            title="Candidates in Pipeline"
            value={summaryMetrics.totalCandidates.toString()}
            subtitle={`${candidateStatusData.find((item) => item.name === "Interviewing")?.value || 0} at interview stage`}
            icon={UserIcon}
            trend="up"
            trendValue="8%"
          />
        </GridItem>

        <GridItem>
          <MetricCard
            title="Placements MTD"
            value={summaryMetrics.totalPlacements.toString()}
            subtitle="$96,000 in placement fees"
            icon={KeyIcon}
            trend="down"
            trendValue="5%"
          />
        </GridItem>
      </Grid>

      {/* Revenue and Pipeline */}
      <Grid columns={2} gap={3}>
        <GridItem>
          <MetricCard
            title="Revenue Trend"
            value={`$${summaryMetrics.totalRevenue.toLocaleString()}`}
            subtitle="YTD Revenue"
            icon={CurrencyDollarIcon}
            chart={() => (
              <LineChartComponent
                data={revenueData}
                height={180}
                showXAxis={true}
                showYAxis={true}
                showGrid={true}
                lineColor="#60a5fa"
                margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
                dot={true}
              />
            )}
          />
        </GridItem>

        <GridItem>
          <MetricCard
            title="Revenue Pipeline"
            value={`$${pipelineData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}`}
            subtitle="Total pipeline value"
            icon={ChartBarIcon}
            chart={() => (
              <PieChartComponent
                data={pipelineData}
                height={180}
                innerRadius="50%"
                colors={["#4ade80", "#60a5fa", "#f97316", "#a78bfa"]}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              />
            )}
          />
        </GridItem>
      </Grid>

      {/* Activity and Candidate Status */}
      <Grid columns={2} gap={3}>
        <GridItem>
          <MetricCard
            title="Weekly Activity"
            value={summaryMetrics.totalActivity.toString()}
            subtitle="Total activities this week"
            icon={LightningIcon}
            chart={() => (
              <BarChartComponent
                data={activityData}
                height={180}
                showXAxis={true}
                showGrid={true}
                barColor="#4ade80"
                barSize={20}
                margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
              />
            )}
          />
        </GridItem>

        <GridItem>
          <MetricCard
            title="Candidate Pipeline"
            value={summaryMetrics.totalCandidates.toString()}
            subtitle="Total candidates in pipeline"
            icon={UserIcon}
            chart={() => (
              <PieChartComponent
                data={candidateStatusData}
                height={180}
                colors={["#60a5fa", "#4ade80", "#a78bfa", "#f97316", "#f43f5e"]}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              />
            )}
          />
        </GridItem>
      </Grid>

      {/* Team Performance Comparison */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 sm:p-4">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Team Performance Comparison</h2>

        <div className="h-64">
          <MultiLineChartComponent
            data={teamComparisonData}
            height={250}
            showXAxis={true}
            showYAxis={true}
            showGrid={true}
            lines={[
              { dataKey: "bd", name: "Business Development", color: "#4ade80" },
              { dataKey: "candidates", name: "Candidate Engagement", color: "#60a5fa" },
              { dataKey: "placements", name: "Placements", color: "#f97316" },
            ]}
            margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
          />
        </div>
      </div>
    </div>
  )
}

export default OverviewPanel

