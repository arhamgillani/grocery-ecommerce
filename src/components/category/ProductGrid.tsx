'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart, Heart, Star } from 'lucide-react'

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

interface ProductGridProps {
  products: Product[]
  viewMode: 'grid' | 'list'
  onAddToCart?: (productId: string, quantity: number) => void
  onToggleWishlist?: (productId: string) => void
}

export default function ProductGrid({ 
  products, 
  viewMode, 
  onAddToCart,
  onToggleWishlist 
}: ProductGridProps) {
  const parseImages = (images: string): string[] => {
    try {
      return JSON.parse(images)
    } catch {
      return []
    }
  }

  const getDiscountPercentage = (price: number, comparePrice?: number) => {
    if (!comparePrice || comparePrice <= price) return 0
    return Math.round(((comparePrice - price) / comparePrice) * 100)
  }

  const handleAddToCart = (productId: string, quantity: number) => {
    if (onAddToCart) {
      onAddToCart(productId, quantity)
    } else {
      // Fallback: show a better visual feedback
      console.log(`Add to cart: Product ${productId}, Quantity: ${quantity}`)
    }
  }

  const handleToggleWishlist = (productId: string) => {
    if (onToggleWishlist) {
      onToggleWishlist(productId)
    } else {
      // Fallback: show a better visual feedback
      console.log(`Toggle wishlist: Product ${productId}`)
    }
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product, index) => {
          const images = parseImages(product.images)
          const discount = getDiscountPercentage(product.price, product.comparePrice)
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex">
                {/* Product Image */}
                <div className="w-48 h-48 flex-shrink-0 relative">
                  {images.length > 0 ? (
                    <img
                      src={images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-black text-sm font-medium">No Image</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                      -{discount}%
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-sm text-primary-600 font-medium mb-1">{product.category.name}</div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                    >
                      {product.name}
                    </Link>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-800 ml-2 font-medium">(4.0)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.comparePrice && (
                        <span className="text-sm text-gray-700 line-through">
                          ${product.comparePrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleToggleWishlist(product.id)}
                        className="p-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product.id, 1)}
                        disabled={product.stock === 0}
                        className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="font-medium">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    )
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => {
        const images = parseImages(product.images)
        const discount = getDiscountPercentage(product.price, product.comparePrice)
        
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
          >
            {/* Product Image */}
            <div className="aspect-square relative overflow-hidden">
              {images.length > 0 ? (
                <img
                  src={images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-black text-sm font-medium">No Image</span>
                </div>
              )}
              
              {discount > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                  -{discount}%
                </div>
              )}
              
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold">Out of Stock</span>
                </div>
              )}

              {/* Hover Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleToggleWishlist(product.id)}
                  className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="text-xs text-primary-600 font-medium mb-1">{product.category.name}</div>
              <Link
                href={`/product/${product.slug}`}
                className="text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 mb-2"
              >
                {product.name}
              </Link>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-800 ml-1 font-medium">(4.0)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-xs text-gray-700 line-through">
                      ${product.comparePrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(product.id, 1)}
                  disabled={product.stock === 0}
                  className="p-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>

              {product.stock > 0 && product.stock <= 5 && (
                <div className="text-xs text-orange-600 font-medium mt-2">
                  Only {product.stock} left in stock
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}