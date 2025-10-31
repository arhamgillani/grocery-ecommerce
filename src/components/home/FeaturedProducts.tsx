'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ProductCard from '@/components/product/ProductCard'
import { ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number
  images: string[]
  rating?: number
  reviewCount?: number
  isOrganic?: boolean
  stock: number
  weight: number
  description: string
}

const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('featured')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const { addToCart } = useCart()
  const router = useRouter()

  const tabs = [
    { id: 'featured', label: 'Featured' },
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'organic', label: 'Organic' }
  ]

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products?featured=true&limit=8')
        if (response.ok) {
          const data = await response.json()
          console.log('Fetched products:', data)
          
          // Transform the products to match our interface
          const transformedProducts = (data.data || []).map((product: any) => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            comparePrice: product.comparePrice,
            images: product.images ? JSON.parse(product.images) : [],
            rating: 4.5 + Math.random() * 0.5, // Mock rating
            reviewCount: Math.floor(Math.random() * 200) + 50, // Mock review count  
            isOrganic: product.tags ? JSON.parse(product.tags).includes('organic') : false,
            stock: product.stock,
            weight: product.weight,
            description: product.description
          }))
          console.log('Transformed products:', transformedProducts)
          setProducts(transformedProducts)
        } else {
          console.error('Failed to fetch products:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getFilteredProducts = () => {
    if (products.length === 0) return []
    
    switch (activeTab) {
      case 'bestsellers':
        return products.filter(p => (p.rating || 0) >= 4.8)
      case 'new':
        return products.slice(4, 8)
      case 'organic':
        return products.filter(p => p.isOrganic || p.name.toLowerCase().includes('organic'))
      default:
        return products.slice(0, 8)
    }
  }

  const handleAddToCart = async (productId: string, quantity: number) => {
    console.log('FeaturedProducts handleAddToCart called with:', { productId, quantity, session })
    
    if (!session) {
      // Not authenticated - redirect to login
      console.log('User not authenticated, showing error and redirecting')
      toast.error('Please sign in to add items to cart')
      router.push('/auth/signin')
      return
    }

    console.log('User authenticated, attempting to add to cart via context')
    try {
      const success = await addToCart(productId, quantity)
      console.log('Add to cart result:', success)
      if (success) {
        toast.success('Item added to cart!')
      } else {
        toast.error('Failed to add item to cart')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add item to cart')
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

      if (response.ok) {
        console.log(`Toggled wishlist for product ${productId}`)
        // TODO: Show success toast notification
      } else if (response.status === 401) {
        // Authentication required - redirect to login
        console.log('Authentication required, redirecting to login')
        window.location.href = '/auth/signin'
      } else {
        console.error('Failed to update wishlist')
      }
    } catch (error) {
      console.error('Error updating wishlist:', error)
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-6 lg:mb-0"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-800">
              Discover our hand-picked selection of premium quality products
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8 border-b border-gray-200"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-800 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {getFilteredProducts().map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isInWishlist={false}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="btn-secondary px-8 py-3">
            Load More Products
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts