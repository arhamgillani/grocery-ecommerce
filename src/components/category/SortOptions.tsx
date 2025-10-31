'use client'

import { ChevronDown } from 'lucide-react'

interface SortOptionsProps {
  value: string
  onChange: (value: string) => void
}

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' }
]

export default function SortOptions({ value, onChange }: SortOptionsProps) {
  const currentOption = sortOptions.find(option => option.value === value)

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Sort by
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none block w-full px-3 py-2 pr-8 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-black" />
        </div>
      </div>
    </div>
  )
}