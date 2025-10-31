'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import ProductGrid from '@/components/category/ProductGrid'
import ProductFilters from '@/components/category/ProductFilters'
import SearchBar from '@/components/category/SearchBar'
import SortOptions from '@/components/category/SortOptions'
import { ToastProvider, useToast } from '@/components/ui/Toast'
import { ChevronDown, Filter, Grid, List } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  comparePrice?: number
  images: string
  slug: string
  stock: number
  category: {
    name: string
  }
}

interface Category {
  id: string
  name: string
  description: string
  slug: string
}

export default function CategoryPage() {
  return (
    <ToastProvider>
      <CategoryPageContent />
    </ToastProvider>
  )
}

function CategoryPageContent() {
  const { showToast } = useToast()
  const params = useParams()
  const searchParams = useSearchParams()
  const categorySlug = params.slug as string

  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [selectedFilters, setSelectedFilters] = useState({
    inStock: false,
    onSale: false,
    priceRange: [0, 100] as [number, number]
  })

  // Fetch category and products
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true)
        
        // Fetch category info
        const categoryResponse = await fetch(`/api/categories/${categorySlug}`)
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json()
          setCategory(categoryData.data)
        }

        // Fetch products for this category
        const productsResponse = await fetch(`/api/products?category=${categorySlug}&limit=50`)
        if (productsResponse.ok) {
          const productsData = await productsResponse.json()
          setProducts(productsData.data)
          setFilteredProducts(productsData.data)
        }
      } catch (error) {
        console.error('Error fetching category data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (categorySlug) {
      fetchCategoryData()
    }
  }, [categorySlug])

  // Apply filters and search
  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Stock filter
    if (selectedFilters.inStock) {
      filtered = filtered.filter(product => product.stock > 0)
    }

    // Sale filter
    if (selectedFilters.onSale) {
      filtered = filtered.filter(product => product.comparePrice && product.comparePrice > product.price)
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= selectedFilters.priceRange[0] && 
      product.price <= selectedFilters.priceRange[1]
    )

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedFilters, sortBy])

  // Handler functions
  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      })

      const data = await response.json()

      if (response.ok) {
        showToast(data.message || `Added ${quantity} item(s) to cart!`, 'success')
      } else if (response.status === 401) {
        // Authentication required - redirect to login
        showToast('Please sign in to add items to cart', 'error')
        window.location.href = '/auth/signin'
      } else {
        showToast(data.error || 'Failed to add item to cart', 'error')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      showToast('Failed to add item to cart', 'error')
    }
  }

  const handleToggleWishlist = async (productId: string) => {
    try {
      const response = await fetch('/api/wishlist/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      })

      const data = await response.json()

      if (response.ok) {
        showToast(data.message || 'Wishlist updated!', 'success')
      } else if (response.status === 401) {
        // Authentication required - redirect to login
        showToast('Please sign in to manage your wishlist', 'error')
        window.location.href = '/auth/signin'
      } else {
        showToast(data.error || 'Failed to update wishlist', 'error')
      }
    } catch (error) {
      console.error('Error updating wishlist:', error)
      showToast('Failed to update wishlist', 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Category Not Found</h1>
          <p className="text-black font-medium">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <section className="bg-white border-b">
        <div className="container-custom py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-xl text-gray-800 mb-6">{category.description}</p>
            <div className="text-sm text-gray-900 font-medium">
              {filteredProducts.length} products found
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              {/* Search Bar */}
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={`Search in ${category.name}...`}
              />

              {/* Filters */}
              <ProductFilters
                filters={selectedFilters}
                onFiltersChange={setSelectedFilters}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>

                  {/* View Mode Toggle */}
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-black hover:bg-gray-50 font-medium'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-black hover:bg-gray-50 font-medium'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sort Options */}
                <SortOptions
                  value={sortBy}
                  onChange={setSortBy}
                />
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                viewMode={viewMode}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-black mb-4">
                  <Grid className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                <p className="text-black font-medium">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}