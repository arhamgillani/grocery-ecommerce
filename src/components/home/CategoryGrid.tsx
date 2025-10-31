'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Category {
  id: string
  name: string
  slug: string
  image: string
  emoji: string
  productCount: number
  color: string
}

const CategoryGrid: React.FC = () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Fruits & Vegetables',
      slug: 'fruits-vegetables',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop',
      emoji: '🥬',
      productCount: 150,
      color: 'from-green-400 to-green-600'
    },
    {
      id: '2',
      name: 'Dairy & Eggs',
      slug: 'dairy-eggs',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
      emoji: '🥛',
      productCount: 85,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: '3',
      name: 'Meat & Seafood',
      slug: 'meat-seafood',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop',
      emoji: '🥩',
      productCount: 120,
      color: 'from-red-400 to-red-600'
    },
    {
      id: '4',
      name: 'Bakery',
      slug: 'bakery',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop',
      emoji: '🍞',
      productCount: 95,
      color: 'from-amber-400 to-amber-600'
    },
    {
      id: '5',
      name: 'Beverages',
      slug: 'beverages',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop',
      emoji: '🧃',
      productCount: 200,
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: '6',
      name: 'Household',
      slug: 'household',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
      emoji: '🧽',
      productCount: 300,
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: '7',
      name: 'Organic',
      slug: 'organic',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
      emoji: '🌱',
      productCount: 180,
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      id: '8',
      name: 'Snacks',
      slug: 'snacks',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop',
      emoji: '🍪',
      productCount: 120,
      color: 'from-orange-400 to-orange-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Browse through our carefully curated categories to find exactly what you need for your kitchen and home.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
                    
                    {/* Category Image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl filter drop-shadow-lg">
                        {category.emoji}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-700 font-medium">
                      {category.productCount} products
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/categories"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-200 text-primary-600 font-semibold rounded-full hover:bg-primary-50 hover:border-primary-300 transition-all duration-300"
          >
            View All Categories
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CategoryGrid