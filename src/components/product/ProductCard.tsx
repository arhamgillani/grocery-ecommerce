'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number
  images: string[]
  brand?: string
  rating?: number
  reviewCount?: number
  isOrganic?: boolean
  stock: number
  weight?: number
  description?: string
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string, quantity: number) => void
  onToggleWishlist?: (productId: string) => void
  isInWishlist?: boolean
  className?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
  className = ''
}) => {
  const [quantity, setQuantity] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const handleAddToCart = () => {
    console.log('Add to cart clicked for product:', product.id, 'quantity:', quantity)
    if (onAddToCart && product.stock > 0) {
      console.log('Calling onAddToCart function')
      onAddToCart(product.id, quantity)
    } else {
      console.log('onAddToCart not available or product out of stock')
    }
  }

  const handleToggleWishlist = () => {
    if (onToggleWishlist) {
      onToggleWishlist(product.id)
    }
  }

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`}>
          <div className="aspect-square relative">
            <Image
              src={product.images[0] || 'https://images.unsplash.com/photo-1586417969310-579b90fc210a?w=400&h=400&fit=crop'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isOrganic && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
              Organic
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <motion.button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isInWishlist
              ? 'bg-red-500 text-white'
              : 'bg-white text-black hover:bg-red-50 hover:text-red-500'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Quick add button - appears on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-3 left-3 right-3"
        >
          {product.stock > 0 ? (
            <motion.button
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Quick Add</span>
            </motion.button>
          ) : (
            <div className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium text-center">
              Out of Stock
            </div>
          )}
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-700 uppercase tracking-wide mb-1 font-medium">
            {product.brand}
          </p>
        )}

        {/* Product Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Weight */}
        {product.weight && (
          <p className="text-sm text-gray-700 mb-2 font-medium">{product.weight} kg</p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-700 font-medium">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-black line-through font-medium">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center space-x-3">
          {/* Quantity selector */}
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>
            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={quantity >= product.stock}
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              product.stock > 0
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-800 cursor-not-allowed font-medium'
            }`}
            whileHover={product.stock > 0 ? { scale: 1.02 } : {}}
            whileTap={product.stock > 0 ? { scale: 0.98 } : {}}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>

        {/* Stock indicator */}
        {product.stock > 0 && product.stock <= 10 && (
          <p className="text-xs text-orange-600 mt-2">
            Only {product.stock} left in stock
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default ProductCard