"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FilterModal from "./FilterModal"

const GlobalFilterButton = ({
  onFilterChange,
  activeFilters = {},
  filterTypes = ["date", "recruiter", "client"],
  title = "Filter Dashboard",
  currentTab = "",
}) => {
  const [open, setOpen] = useState(false)

  const handleFilterChange = (filters) => {
    onFilterChange(filters)
    setOpen(false)
  }

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0

    // Count date range as one filter if set
    if (activeFilters.dateRange?.start && activeFilters.dateRange?.end) {
      count += 1
    }

    // Count array filters
    for (const key in activeFilters) {
      if (Array.isArray(activeFilters[key]) && activeFilters[key].length > 0) {
        // For metrics/dataTypes, only count if not all options are selected
        if (key === "metrics" && currentTab === "recruiter" && activeFilters[key].length < 3) {
          count += 1
        } else if (key === "metrics" && currentTab === "team" && activeFilters[key].length < 3) {
          count += 1
        } else if (key === "dataTypes" && activeFilters[key].length < 3) {
          count += 1
        } else if (key !== "metrics" && key !== "dataTypes") {
          count += 1
        }
      }
    }

    return count
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto flex items-center gap-1.5 text-xs">
          <Filter className="h-3.5 w-3.5" />
          Filter
          {activeFilterCount > 0 && (
            <span className="ml-1 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-[80vh] overflow-hidden p-4 filter-modal-content">
        <DialogHeader className="pb-2">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="overflow-hidden">
          <FilterModal
            initialFilters={activeFilters}
            onApply={handleFilterChange}
            filterTypes={filterTypes}
            currentTab={currentTab}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GlobalFilterButton

