"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight } from "lucide-react"

const DateRangeSelector = ({ value, onChange }) => {
  const [date, setDate] = useState({
    from: value?.start ? new Date(value.start) : undefined,
    to: value?.end ? new Date(value.end) : undefined,
  })

  // Update local state when value changes
  useEffect(() => {
    // Only update local state if the value is different from current date
    // to prevent infinite loops
    const newFrom = value?.start ? new Date(value.start) : undefined
    const newTo = value?.end ? new Date(value.end) : undefined

    // Check if dates are different before updating state
    const isDifferent =
      (newFrom && !date.from) ||
      (!newFrom && date.from) ||
      (newTo && !date.to) ||
      (!newTo && date.to) ||
      (newFrom && date.from && newFrom.getTime() !== date.from.getTime()) ||
      (newTo && date.to && newTo.getTime() !== date.to.getTime())

    if (isDifferent) {
      setDate({
        from: newFrom,
        to: newTo,
      })
    }
  }, [value])

  // Predefined date ranges
  const selectLastWeek = () => {
    const today = new Date()
    const lastWeek = new Date(today)
    lastWeek.setDate(today.getDate() - 7)
    const newDate = { from: lastWeek, to: today }
    setDate(newDate)
    onChange({
      start: newDate.from,
      end: newDate.to,
    })
  }

  const selectLastMonth = () => {
    const today = new Date()
    const lastMonth = new Date(today)
    lastMonth.setMonth(today.getMonth() - 1)
    const newDate = { from: lastMonth, to: today }
    setDate(newDate)
    onChange({
      start: newDate.from,
      end: newDate.to,
    })
  }

  const selectLastQuarter = () => {
    const today = new Date()
    const lastQuarter = new Date(today)
    lastQuarter.setMonth(today.getMonth() - 3)
    const newDate = { from: lastQuarter, to: today }
    setDate(newDate)
    onChange({
      start: newDate.from,
      end: newDate.to,
    })
  }

  const selectYTD = () => {
    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 1)
    const newDate = { from: startOfYear, to: today }
    setDate(newDate)
    onChange({
      start: newDate.from,
      end: newDate.to,
    })
  }

  // Handle date selection - only call onChange when user selects a date
  const handleDateSelect = (newDate) => {
    setDate(newDate)

    // Only call onChange if we have both dates
    if (newDate.from && newDate.to) {
      onChange({
        start: newDate.from,
        end: newDate.to,
      })
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        <Button size="sm" variant="outline" onClick={selectLastWeek} className="text-xs px-2 py-1 h-7">
          Last Week
        </Button>
        <Button size="sm" variant="outline" onClick={selectLastMonth} className="text-xs px-2 py-1 h-7">
          Last Month
        </Button>
        <Button size="sm" variant="outline" onClick={selectLastQuarter} className="text-xs px-2 py-1 h-7">
          Last Quarter
        </Button>
        <Button size="sm" variant="outline" onClick={selectYTD} className="text-xs px-2 py-1 h-7">
          Year to Date
        </Button>
      </div>

      <div className="rounded-md border">
        <Calendar
          mode="range"
          selected={date}
          onSelect={handleDateSelect}
          numberOfMonths={1}
          className="w-full"
          components={{
            IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
            IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
          }}
          classNames={{
            months: "flex flex-col space-y-2",
            month: "space-y-2",
            caption: "flex justify-center pt-1 relative items-center text-sm",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.7rem]",
            row: "flex w-full mt-1",
            cell: "h-7 w-7 text-center text-xs p-0 relative",
            day: "h-7 w-7 p-0 font-normal aria-selected:opacity-100",
            day_range_end: "day-range-end",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
      </div>

      {(date.from || date.to) && (
        <div className="rounded-md border p-2 text-xs">
          <div className="font-medium">Selected Range:</div>
          <div className="mt-1 text-gray-500">
            {date.from && date.to ? (
              <>
                {format(date.from, "MMM d, yyyy")} - {format(date.to, "MMM d, yyyy")}
              </>
            ) : date.from ? (
              <>From: {format(date.from, "MMM d, yyyy")}</>
            ) : date.to ? (
              <>To: {format(date.to, "MMM d, yyyy")}</>
            ) : (
              "No date range selected"
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DateRangeSelector

