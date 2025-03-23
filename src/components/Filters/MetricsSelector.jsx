"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const MetricsSelector = ({
  metrics = [],
  selectedIds = [],
  onChange,
  title = "Metrics",
  description = "Select which metrics to display",
}) => {
  const handleToggleMetric = (id) => {
    const isSelected = selectedIds.includes(id)
    const newSelectedIds = isSelected ? selectedIds.filter((selectedId) => selectedId !== id) : [...selectedIds, id]

    onChange(newSelectedIds)
  }

  const handleSelectAll = () => {
    onChange(metrics.map((metric) => metric.id))
  }

  const handleSelectNone = () => {
    onChange([])
  }

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>

      <div className="flex gap-3 mb-1">
        <button onClick={handleSelectAll} className="text-xs text-blue-600 hover:text-blue-800 hover:underline">
          Select All
        </button>
        <button onClick={handleSelectNone} className="text-xs text-blue-600 hover:text-blue-800 hover:underline">
          Select None
        </button>
      </div>

      <div className="space-y-2 border rounded-md p-3">
        {metrics.map((metric) => (
          <div key={metric.id} className="flex items-center space-x-2">
            <Checkbox
              id={`metric-${metric.id}`}
              checked={selectedIds.includes(metric.id)}
              onCheckedChange={() => handleToggleMetric(metric.id)}
              className="h-3.5 w-3.5"
            />
            <Label htmlFor={`metric-${metric.id}`} className="text-xs font-normal cursor-pointer">
              {metric.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MetricsSelector

