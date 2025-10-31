'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, ArrowRight, Sparkles, Heart, Star } from 'lucide-react'

const EmptyCart: React.FC = () => {
  const suggestedCategories = [
    {
      name: 'Fruits & Vegetables',
      slug: 'fruits-vegetables',
      emoji: '🥬',
      color: 'bg-green-100 text-green-700'
    },
    {
      name: 'Dairy & Eggs',
      slug: 'dairy-eggs',
      emoji: '🥛',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Meat & Seafood',
      slug: 'meat-seafood',
      emoji: '🥩',
      color: 'bg-red-100 text-red-700'
    },
    {
      name: 'Organic',
      slug: 'organic',
      emoji: '🌱',
      color: 'bg-emerald-100 text-emerald-700'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      {/* Empty Cart Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-16 h-16 text-gray-400" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-4 h-4 text-yellow-800" />
        </motion.div>
      </motion.div>

      {/* Main Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added any items to your cart yet. 
          Start shopping to fill it up with fresh groceries!
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          Start Shopping
          <ArrowRight className="w-5 h-5" />
        </Link>
        
        <Link
          href="/deals"
          className="inline-flex items-center gap-2 border-2 border-green-600 text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
        >
          <Star className="w-5 h-5" />
          View Deals
        </Link>
      </motion.div>

      {/* Suggested Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Popular Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {suggestedCategories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className={`block p-4 rounded-lg border-2 border-transparent hover:border-green-300 transition-all ${category.color} hover:shadow-md`}
              >
                <div className="text-3xl mb-2">{category.emoji}</div>
                <div className="font-medium text-sm">{category.name}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Fresh Quality</h4>
          <p className="text-sm text-gray-600">
            Hand-picked fresh produce delivered to your doorstep
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Easy Shopping</h4>
          <p className="text-sm text-gray-600">
            Browse thousands of products with just a few clicks
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Great Deals</h4>
          <p className="text-sm text-gray-600">
            Save money with our daily deals and special offers
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default EmptyCart