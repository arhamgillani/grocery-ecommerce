'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { Minus, Plus, Trash2, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface CartItemProps {
  item: {
    id: string
    productId: string
    quantity: number
    product: {
      id: string
      name: string
      price: number
      images: string[]
    }
  }
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return
    
    setIsUpdating(true)
    try {
      await updateQuantity(item.id, newQuantity)
    } catch (error) {
      toast.error('Failed to update quantity')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    setIsRemoving(true)
    try {
      await removeFromCart(item.id)
      toast.success('Item removed from cart')
    } catch (error) {
      toast.error('Failed to remove item')
      setIsRemoving(false)
    }
  }

  const subtotal = item.product.price * item.quantity

  return (
    <div className={`p-6 transition-opacity ${isRemoving ? 'opacity-50' : ''}`}>
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Image
            src={item.product.images[0] || 'https://images.unsplash.com/photo-1586417969310-579b90fc210a?w=400&h=400&fit=crop'}
            alt={item.product.name}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {item.product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            ${item.product.price.toFixed(2)} each
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                {item.quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRemove}
                disabled={isRemoving}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex-shrink-0 text-right">
          <p className="text-lg font-bold text-gray-900">
            ${subtotal.toFixed(2)}
          </p>
          {item.quantity > 1 && (
            <p className="text-sm text-gray-600">
              ${item.product.price.toFixed(2)} × {item.quantity}
            </p>
          )}
        </div>
      </div>

      {isUpdating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-sm text-blue-600"
        >
          Updating quantity...
        </motion.div>
      )}
    </div>
  )
}

export default CartItem