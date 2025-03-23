import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

const COLORS = ["#4ade80", "#60a5fa", "#f97316", "#a78bfa", "#f43f5e", "#facc15"]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-sm rounded-md text-xs">
        <p
          className="font-medium"
          style={{ color: payload[0].color }}
        >{`${payload[0].name}: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    )
  }
  return null
}

const PieChartComponent = ({
  data,
  dataKey = "value",
  nameKey = "name",
  height = 300,
  showTooltip = true,
  showLegend = true,
  innerRadius = 0,
  outerRadius = "70%",
  colors = COLORS,
  margin = { top: 10, right: 10, left: 10, bottom: 10 },
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart margin={margin}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          dataKey={dataKey}
          nameKey={nameKey}
          animationDuration={1000}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="none" />
          ))}
        </Pie>
        {showTooltip && (
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none", zIndex: 100 }} cursor={false} />
        )}
        {showLegend && (
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconSize={8}
            iconType="circle"
            wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent

