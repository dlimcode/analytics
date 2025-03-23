import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts"

const COLORS = ["#4ade80", "#60a5fa", "#f97316", "#a78bfa", "#f43f5e"]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-sm rounded-md text-xs">
        <p className="font-medium text-gray-700 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const StackedBarChartComponent = ({
  data,
  bars = [], // Array of { dataKey, color, name } objects
  xAxisDataKey = "name",
  height = 300,
  showXAxis = true,
  showYAxis = false,
  showTooltip = true,
  showLegend = true,
  showGrid = false,
  barSize = 16,
  barRadius = 0,
  margin = { top: 10, right: 10, left: 10, bottom: 10 },
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={margin}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}

        {showXAxis && (
          <XAxis
            dataKey={xAxisDataKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            dy={5}
          />
        )}

        {showYAxis && (
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            dx={-5}
            tickFormatter={(value) => value.toLocaleString()}
          />
        )}

        {showTooltip && (
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            wrapperStyle={{ outline: "none" }}
          />
        )}

        {showLegend && (
          <Legend wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }} iconSize={8} iconType="circle" />
        )}

        {bars.map((bar, index) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name || bar.dataKey}
            fill={bar.color || COLORS[index % COLORS.length]}
            stackId="stack"
            barSize={barSize}
            radius={barRadius}
            animationDuration={1000}
            isAnimationActive={true}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StackedBarChartComponent

