'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, ArrowRight, Zap } from 'lucide-react'

const DealsSection: React.FC = () => {
  // Mock deals data
  const deals = [
    {
      id: '1',
      title: 'Fresh Produce Sale',
      description: 'Up to 40% off on all fruits and vegetables',
      discount: '40%',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop',
      color: 'from-green-500 to-green-600',
      textColor: 'text-white',
      cta: 'Shop Produce'
    },
    {
      id: '2',
      title: 'Organic Essentials',
      description: 'Buy 2 Get 1 Free on organic products',
      discount: 'Buy 2 Get 1',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
      color: 'from-emerald-500 to-emerald-600',
      textColor: 'text-white',
      cta: 'Shop Organic'
    }
  ]

  const flashDeals = [
    {
      id: '1',
      name: 'Premium Olive Oil',
      originalPrice: 24.99,
      dealPrice: 14.99,
      discount: 40,
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
      timeLeft: '2h 15m',
      sold: 45,
      total: 100
    },
    {
      id: '2',
      name: 'Organic Quinoa',
      originalPrice: 12.99,
      dealPrice: 8.99,
      discount: 31,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
      timeLeft: '5h 30m',
      sold: 23,
      total: 50
    },
    {
      id: '3',
      name: 'Fresh Salmon Fillet',
      originalPrice: 18.99,
      dealPrice: 13.99,
      discount: 26,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop',
      timeLeft: '1h 45m',
      sold: 67,
      total: 80
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Today's Best Deals
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto font-medium">
            Don't miss out on these amazing offers! Limited time deals on your favorite products.
          </p>
        </motion.div>

        {/* Main Deals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${deal.color} p-8 h-64 flex flex-col justify-between relative`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full"></div>
                </div>

                <div className="relative z-10">
                  <div className={`inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold ${deal.textColor} mb-4`}>
                    SPECIAL OFFER
                  </div>
                  <h3 className={`text-3xl font-bold ${deal.textColor} mb-2`}>
                    {deal.title}
                  </h3>
                  <p className={`${deal.textColor} opacity-90 mb-4`}>
                    {deal.description}
                  </p>
                </div>

                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <div className={`text-4xl font-bold ${deal.textColor}`}>
                      {deal.discount}
                    </div>
                    <div className={`text-sm ${deal.textColor} opacity-75`}>
                      OFF
                    </div>
                  </div>
                  <Link
                    href="/deals"
                    className="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors group-hover:scale-105"
                  >
                    <span>{deal.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Flash Deals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Flash Deals</h3>
                <p className="text-black font-medium">Limited time offers ending soon!</p>
              </div>
            </div>
            <Link
              href="/flash-deals"
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {flashDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
              >
                <div className="relative mb-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-4xl">🫒</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{deal.discount}%
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-2">{deal.name}</h4>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-red-600">
                    ${deal.dealPrice}
                  </span>
                  <span className="text-sm text-black line-through font-medium">
                    ${deal.originalPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-black mb-3 font-medium">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{deal.timeLeft}</span>
                  </div>
                  <span>{deal.sold}/{deal.total} sold</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all"
                    style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                  ></div>
                </div>

                <button className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                  Grab Deal Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter subscription for deals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 bg-primary-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Never Miss a Deal!
          </h3>
          <p className="text-black mb-6 max-w-md mx-auto font-medium">
            Subscribe to our newsletter and be the first to know about exclusive offers and flash sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DealsSection