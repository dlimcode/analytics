"use client"

import { useState, useRef } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const MultiSelectFilter = ({ options, value = [], onChange, placeholder = "Select options" }) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)

  const selectedItems = options.filter((option) => value.includes(option.id))

  const handleSelect = (id) => {
    const isSelected = value.includes(id)
    const newValue = isSelected ? value.filter((item) => item !== id) : [...value, id]
    onChange(newValue)
  }

  const handleRemove = (e, id) => {
    e.stopPropagation()
    onChange(value.filter((item) => item !== id))
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange([])
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size="sm"
          className={cn("w-full justify-between", value.length === 0 && "text-gray-400")}
        >
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-1 max-w-[90%] overflow-hidden">
              {selectedItems.map((item) => (
                <Badge key={item.id} variant="secondary" className="text-xs py-0 px-1">
                  {item.name}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={(e) => handleRemove(e, item.id)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {item.name}</span>
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
          <div className="flex">
            {value.length > 0 && (
              <button
                className="mr-1"
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={handleClear}
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                <span className="sr-only">Clear</span>
              </button>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem key={option.id} value={option.name} onSelect={() => handleSelect(option.id)}>
                  <Check className={cn("mr-2 h-4 w-4", value.includes(option.id) ? "opacity-100" : "opacity-0")} />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default MultiSelectFilter

