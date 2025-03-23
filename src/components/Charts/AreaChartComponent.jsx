import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-sm rounded-md text-xs">
        <p className="font-medium text-gray-700">{`${label}: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

const AreaChartComponent = ({
  data,
  dataKey = "value",
  xAxisDataKey = "name",
  areaColor = "#4ade80",
  height = 300,
  showXAxis = true,
  showYAxis = false,
  showTooltip = true,
  showGrid = false,
  strokeWidth = 1.5,
  fillOpacity = 0.2,
  margin = { top: 0, right: 0, left: 0, bottom: 0 },
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={margin}>
        {showXAxis && (
          <XAxis
            dataKey={xAxisDataKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            dy={5}
          />
        )}

        {showYAxis && <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9ca3af" }} dx={-5} />}

        {showTooltip && (
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(0, 0, 0, 0.05)", strokeWidth: 1 }} />
        )}

        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={areaColor}
          fill={areaColor}
          strokeWidth={strokeWidth}
          fillOpacity={fillOpacity}
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent

