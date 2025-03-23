"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const DateRangeFilter = ({ value, onChange }) => {
  const [date, setDate] = useState({
    from: value?.start ? new Date(value.start) : undefined,
    to: value?.end ? new Date(value.end) : undefined,
  })

  useEffect(() => {
    if (date.from && date.to) {
      onChange({
        start: date.from,
        end: date.to,
      })
    }
  }, [date, onChange])

  // Predefined date ranges
  const selectLastWeek = () => {
    const today = new Date()
    const lastWeek = new Date(today)
    lastWeek.setDate(today.getDate() - 7)
    setDate({ from: lastWeek, to: today })
  }

  const selectLastMonth = () => {
    const today = new Date()
    const lastMonth = new Date(today)
    lastMonth.setMonth(today.getMonth() - 1)
    setDate({ from: lastMonth, to: today })
  }

  const selectLastQuarter = () => {
    const today = new Date()
    const lastQuarter = new Date(today)
    lastQuarter.setMonth(today.getMonth() - 3)
    setDate({ from: lastQuarter, to: today })
  }

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn("w-full justify-start text-left font-normal", !date.from && "text-gray-400")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b border-gray-100">
            <div className="flex gap-2 mb-2">
              <Button size="sm" variant="outline" className="text-xs" onClick={selectLastWeek}>
                Last Week
              </Button>
              <Button size="sm" variant="outline" className="text-xs" onClick={selectLastMonth}>
                Last Month
              </Button>
              <Button size="sm" variant="outline" className="text-xs" onClick={selectLastQuarter}>
                Last Quarter
              </Button>
            </div>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateRangeFilter

