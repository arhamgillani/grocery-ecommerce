'use client'

import React from 'react'
import { useCart } from '@/contexts/CartContext'
import CartItem from './CartItem'
import { motion } from 'framer-motion'

const CartItems: React.FC = () => {
  const { items } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CartItem item={item} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default CartItems