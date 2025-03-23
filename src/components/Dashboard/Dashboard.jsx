"use client"

import { useState } from "react"
import StatusBadge from "./StatusBadge"

const Dashboard = ({
  title = "Analytics Dashboard",
  subtitle,
  timeFilterOptions = ["24 hours", "7 days", "30 days", "Custom"],
  statusItems = [],
  children,
}) => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState(timeFilterOptions[0])

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3">
            {statusItems.length > 0 && (
              <div className="flex items-center gap-2">
                {statusItems.map((item, index) => (
                  <StatusBadge key={index} label={item.label} type={item.type} icon={item.icon} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">{children}</div>
      </div>
    </div>
  )
}

export default Dashboard

