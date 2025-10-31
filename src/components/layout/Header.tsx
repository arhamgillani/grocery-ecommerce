'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { data: session } = useSession()
  const { itemCount } = useCart()
  const router = useRouter()

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }

  const categories = [
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Meat & Seafood',
    'Bakery',
    'Beverages',
    'Household',
    'Organic'
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Top banner */}
      <div className="bg-primary-600 text-white py-2 px-4 text-center text-sm">
        🚚 Free delivery on orders over $50 | Same-day delivery available
      </div>

      {/* Main header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🥬</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">FreshMart</span>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands, and more..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none transition-colors"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
            </form>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            {/* Search button - Mobile */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-6 h-6 text-green-600" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden sm:flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart className="w-6 h-6 text-green-600" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-green-600" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </motion.span>
              )}
            </Link>

            {/* User menu */}
            <div className="relative">
              {session ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/account"
                    className="hidden sm:flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <User className="w-6 h-6 text-green-600" />
                    <span className="text-sm text-gray-700">
                      Hi, {session.user.name?.split(' ')[0]}
                    </span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="hidden sm:block text-sm text-green-600 hover:text-green-700 transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Link
                    href="/auth/signin"
                    className="text-sm text-green-600 hover:text-green-700 transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link
                    href="/auth/signup"
                    className="text-sm bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-green-600" />
              ) : (
                <Menu className="w-6 h-6 text-green-600" />
              )}
            </button>
          </div>
        </div>

        {/* Categories navigation - Desktop */}
        <nav className="hidden lg:flex mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="text-green-600 hover:text-green-700 transition-colors text-sm font-medium"
              >
                {category}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-b border-gray-200 p-4"
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="lg:hidden fixed top-20 right-0 bottom-0 w-80 bg-white shadow-xl z-40 overflow-y-auto"
          >
            <div className="p-6">
              {/* User section */}
              <div className="pb-6 border-b border-gray-200">
                {session ? (
                  <div className="space-y-3">
                    <p className="text-lg font-semibold">Hi, {session.user.name}</p>
                    <div className="space-y-2">
                      <Link
                        href="/account"
                        className="block text-green-600 hover:text-green-700 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      <Link
                        href="/orders"
                        className="block text-green-600 hover:text-green-700 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          signOut()
                          setIsMenuOpen(false)
                        }}
                        className="block text-green-600 hover:text-green-700 font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/auth/signin"
                      className="block w-full text-center py-3 border border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block w-full text-center py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              {/* Categories */}
              <div className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="block text-green-600 hover:text-green-700 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="pt-6 border-t border-gray-200 mt-6">
                <div className="space-y-3">
                  <Link
                    href="/wishlist"
                    className="flex items-center space-x-3 text-green-600 hover:text-green-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    href="/deals"
                    className="block text-green-600 hover:text-green-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Today's Deals
                  </Link>
                  <Link
                    href="/help"
                    className="block text-green-600 hover:text-green-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Help & Support
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {(isMenuOpen || isSearchOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => {
              setIsMenuOpen(false)
              setIsSearchOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header