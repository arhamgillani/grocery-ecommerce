'use client'

import React, { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'
import { Truck, Shield, CreditCard, Tag } from 'lucide-react'
import Link from 'next/link'

const CartSummary: React.FC = () => {
  const { items, total, itemCount } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  // Calculate summary values
  const subtotal = total
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const discount = 0 // Would be calculated based on promo code
  const finalTotal = subtotal + shipping + tax - discount

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return
    
    setIsApplyingPromo(true)
    // Simulate API call
    setTimeout(() => {
      setIsApplyingPromo(false)
      // Handle promo code result
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8"
    >
      {/* Order Summary Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
      </div>

      {/* Promo Code */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Promo Code
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            onClick={handleApplyPromo}
            disabled={isApplyingPromo || !promoCode.trim()}
            className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isApplyingPromo ? 'Applying...' : 'Apply'}
          </button>
        </div>
      </div>

      {/* Summary Details */}
      <div className="p-6 border-b border-gray-200 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            <Truck className="w-4 h-4" />
            Shipping
          </span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        
        {shipping > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
            <p className="text-sm text-green-700">
              Add ${(50 - subtotal).toFixed(2)} more to get <strong>free shipping!</strong>
            </p>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="p-6">
        <Link
          href="/checkout"
          className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          Proceed to Checkout
        </Link>
        
        {/* Security Info */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>Secure checkout with 256-bit SSL encryption</span>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="p-6 pt-0">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Delivery Information
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Same-day delivery available</li>
            <li>• Free delivery on orders over $50</li>
            <li>• Fresh guarantee on all products</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default CartSummary