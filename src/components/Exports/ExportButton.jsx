"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const ExportButton = ({ data, filename = "export", onExport }) => {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format) => {
    setIsExporting(true)

    try {
      // In a real application, you might want to use a library like 'xlsx' for Excel exports
      // or a server endpoint for generating PDFs
      if (onExport) {
        await onExport(data, format, filename)
      } else {
        // Default CSV export
        exportToCsv(data, filename)
      }
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const exportToCsv = (data, filename) => {
    if (!data || !data.length) return

    // Convert data to CSV format
    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(","), // Header row
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            // Handle values that need to be quoted (contain commas, quotes, or newlines)
            const cell = value === null || value === undefined ? "" : String(value)
            if (cell.includes(",") || cell.includes('"') || cell.includes("\n")) {
              return `"${cell.replace(/"/g, '""')}"`
            }
            return cell
          })
          .join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" disabled={isExporting} className="text-xs">
          {isExporting ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-1 h-3 w-3" />
              Export
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("excel")}>Export as Excel</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ExportButton

