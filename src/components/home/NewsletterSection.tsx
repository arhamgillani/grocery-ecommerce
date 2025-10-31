'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, Gift, Zap, Heart } from 'lucide-react'

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  const benefits = [
    {
      icon: Gift,
      title: 'Exclusive Offers',
      description: 'Get access to member-only deals and early bird discounts'
    },
    {
      icon: Zap,
      title: 'Flash Sale Alerts',
      description: 'Be the first to know about lightning deals and limited-time offers'
    },
    {
      icon: Heart,
      title: 'Personalized Tips',
      description: 'Receive recipe ideas and nutrition tips tailored to your preferences'
    }
  ]

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-primary-500" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">Welcome to the Family! 🎉</h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Thank you for subscribing! Check your inbox for a special welcome offer and start saving on your next grocery order.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-xl"></div>
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <Mail className="w-5 h-5" />
              <span className="font-semibold">Newsletter</span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Stay Fresh with Our Newsletter
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Join over 50,000 happy customers who get the inside scoop on new products, 
              exclusive deals, and healthy living tips delivered straight to their inbox.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-primary-100">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-8"
            >
              <div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-primary-200">Subscribers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-primary-200">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold">$25</div>
                <div className="text-sm text-primary-200">Avg. Savings</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get Your Welcome Offer
              </h3>
              <p className="text-black font-medium">
                Subscribe now and receive a <span className="font-semibold text-primary-600">$10 discount</span> on your first order over $50!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-lg"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                  isLoading
                    ? 'bg-gray-300 text-black cursor-not-allowed font-medium'
                    : 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  'Get My $10 Discount'
                )}
              </motion.button>
            </form>

            <p className="text-center text-xs text-black mt-4 font-medium">
              By subscribing, you agree to receive marketing emails from FreshMart. 
              You can unsubscribe at any time. <br />
              <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>
            </p>

            {/* Social proof */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-sm text-black font-medium">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span>Join thousands of happy subscribers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection