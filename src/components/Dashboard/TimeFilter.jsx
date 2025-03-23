"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "./icons"

const TimeFilter = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-between w-32 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 border border-gray-100">
          <ul className="py-1 max-h-60 overflow-auto text-xs">
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors ${
                  option === selected ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TimeFilter

