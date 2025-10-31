'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FilterOptions {
  inStock: boolean
  onSale: boolean
  priceRange: [number, number]
}

interface ProductFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

export default function ProductFilters({
  filters,
  onFiltersChange,
  priceRange,
  onPriceRangeChange
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    availability: true,
    price: true,
    offers: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.priceRange]
    newRange[index] = value
    handleFilterChange('priceRange', newRange)
    onPriceRangeChange(newRange)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      inStock: false,
      onSale: false,
      priceRange: [0, 100]
    })
    onPriceRangeChange([0, 100])
  }

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Availability Filter */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('availability')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium text-gray-900">Availability</span>
          {expandedSections.availability ? (
            <ChevronUp className="h-4 w-4 text-gray-700" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-700" />
          )}
        </button>
        
        {expandedSections.availability && (
          <div className="mt-3 space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm text-gray-800 font-medium">In Stock</span>
            </label>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium text-gray-900">Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4 text-gray-700" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-700" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-800 font-medium mb-1">Min</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="text-gray-800 font-medium">-</div>
              <div className="flex-1">
                <label className="block text-xs text-gray-800 font-medium mb-1">Max</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            {/* Price Range Slider */}
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-800 font-medium mt-1">
                <span>$0</span>
                <span>$100+</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Offers Filter */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('offers')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium text-gray-900">Special Offers</span>
          {expandedSections.offers ? (
            <ChevronUp className="h-4 w-4 text-gray-700" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-700" />
          )}
        </button>
        
        {expandedSections.offers && (
          <div className="mt-3 space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.onSale}
                onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm text-gray-800 font-medium">On Sale</span>
            </label>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {(filters.inStock || filters.onSale || filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
        <div className="bg-gray-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Active Filters:</h4>
          <div className="space-y-1 text-sm text-gray-800 font-medium">
            {filters.inStock && <div>• In Stock Only</div>}
            {filters.onSale && <div>• On Sale</div>}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
              <div>• Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}</div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #22c55e;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #22c55e;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}