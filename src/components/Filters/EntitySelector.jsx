"use client"

import { useState } from "react"
import { Check, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const EntitySelector = ({
  entities = [],
  selectedIds = [],
  onChange,
  placeholder = "Search...",
  emptyMessage = "No results found",
}) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEntities = entities.filter((entity) => entity.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleToggleEntity = (id) => {
    const isSelected = selectedIds.includes(id)
    const newSelectedIds = isSelected ? selectedIds.filter((selectedId) => selectedId !== id) : [...selectedIds, id]
    onChange(newSelectedIds)
  }

  const handleRemoveEntity = (id) => {
    onChange(selectedIds.filter((selectedId) => selectedId !== id))
  }

  const selectedEntities = entities.filter((entity) => selectedIds.includes(entity.id))

  return (
    <div className="space-y-3">
      {selectedEntities.length > 0 && (
        <div className="flex flex-wrap gap-1.5 max-h-[60px] overflow-y-auto custom-scrollbar entity-selector-selected">
          {selectedEntities.map((entity) => (
            <Badge key={entity.id} variant="secondary" className="flex items-center gap-1 px-1.5 py-0.5 text-xs">
              {entity.name}
              <button
                onClick={() => handleRemoveEntity(entity.id)}
                className="ml-0.5 rounded-full hover:bg-gray-200 p-0.5"
              >
                <X className="h-2.5 w-2.5" />
                <span className="sr-only">Remove {entity.name}</span>
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-7 h-8 text-xs"
        />
      </div>

      <ScrollArea className="h-[150px] rounded-md border">
        {filteredEntities.length > 0 ? (
          <div className="p-1">
            {filteredEntities.map((entity) => (
              <div
                key={entity.id}
                className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-1 text-xs hover:bg-gray-100 ${
                  selectedIds.includes(entity.id) ? "bg-gray-50" : ""
                }`}
                onClick={() => handleToggleEntity(entity.id)}
              >
                <span>{entity.name}</span>
                {selectedIds.includes(entity.id) && <Check className="h-3.5 w-3.5 text-blue-600" />}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-xs text-gray-500">{emptyMessage}</div>
        )}
      </ScrollArea>
    </div>
  )
}

export default EntitySelector

