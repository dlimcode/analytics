import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

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

const LineChartComponent = ({
  data,
  dataKey = "value",
  xAxisDataKey = "name",
  lineColor = "#4ade80",
  height = 300,
  showXAxis = true,
  showYAxis = false,
  showTooltip = true,
  showGrid = false,
  strokeWidth = 2,
  dot = { r: 2, strokeWidth: 1, stroke: "white", fill: "#60a5fa" },
  margin = { top: 10, right: 10, left: 10, bottom: 30 },
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={margin}>
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
            cursor={{ stroke: "rgba(0, 0, 0, 0.05)", strokeWidth: 1 }}
            wrapperStyle={{ outline: "none", zIndex: 100 }}
          />
        )}

        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={lineColor}
          strokeWidth={strokeWidth}
          dot={dot}
          activeDot={{ r: 4, stroke: "white", strokeWidth: 1 }}
          animationDuration={1000}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineChartComponent

