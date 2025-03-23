import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-sm rounded-md text-xs">
        <p className="font-medium text-gray-700">{`${label}: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    )
  }
  return null
}

const BarChartComponent = ({
  data,
  dataKey = "value",
  xAxisDataKey = "name",
  barColor = "#4ade80",
  height = 300,
  showXAxis = true,
  showYAxis = false,
  showTooltip = true,
  showGrid = false,
  barSize = 8,
  barRadius = 2,
  margin = { top: 10, right: 10, left: 10, bottom: 30 },
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
            dy={10}
            padding={{ left: 10, right: 10 }}
            interval="preserveStartEnd"
            minTickGap={5}
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
            wrapperStyle={{ outline: "none", zIndex: 100 }}
          />
        )}

        <Bar
          dataKey={dataKey}
          fill={barColor}
          barSize={barSize}
          radius={barRadius}
          animationDuration={1000}
          isAnimationActive={true}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent

