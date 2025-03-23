const MetricCard = ({
  title,
  value,
  subtitle,
  dynamicSubtitle,
  icon: Icon,
  chart: Chart,
  className = "",
  loading = false,
  trend,
  trendValue,
  filters = {},
}) => {
  const getTrendColor = () => {
    if (!trend) return ""
    return trend === "up" ? "text-green-500" : "text-red-500"
  }

  const getTrendIcon = () => {
    if (!trend) return null
    return trend === "up" ? (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ) : (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    )
  }

  // Generate dynamic subtitle based on filters
  const getSubtitle = () => {
    if (dynamicSubtitle) {
      // If a dynamic subtitle function is provided, use it
      return dynamicSubtitle(filters)
    }

    // Otherwise, use the static subtitle
    return subtitle
  }

  return (
    <div
      className={`bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-center mb-2">
          {Icon && (
            <div className="mr-2 p-1.5 bg-gray-50 rounded-md">
              <Icon className="w-4 h-4 text-gray-500" />
            </div>
          )}
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        </div>

        <div className="flex items-end">
          {loading ? (
            <div className="h-7 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <div className="text-xl font-bold text-gray-900">{value}</div>
          )}

          {trend && trendValue && (
            <div className={`ml-2 flex items-center text-xs ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="ml-0.5">{trendValue}</span>
            </div>
          )}
        </div>

        {getSubtitle() && <div className="text-xs text-gray-500 mt-0.5">{getSubtitle()}</div>}
      </div>

      {Chart && (
        <div className="chart-wrapper w-full">
          {loading ? (
            <div className="h-full w-full bg-gray-50 animate-pulse"></div>
          ) : (
            <div className="chart-container">
              <Chart />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MetricCard

