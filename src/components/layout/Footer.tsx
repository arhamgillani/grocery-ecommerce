'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, CreditCard, Truck, Shield, Clock } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Features section */}
      <div className="bg-gray-800 py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Free Delivery</h3>
                <p className="text-sm text-gray-300">On orders over $50</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Same Day Delivery</h3>
                <p className="text-sm text-gray-300">Order by 2 PM</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">100% Fresh</h3>
                <p className="text-sm text-gray-300">Quality guaranteed</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-sm text-gray-300">Multiple payment options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🥬</span>
              </div>
              <span className="text-2xl font-bold">FreshMart</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for fresh, quality groceries delivered right to your doorstep. 
              We source the finest organic and locally-grown produce for your family.
            </p>
            
            {/* Social media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-primary-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Today's Deals
                </Link>
              </li>
              <li>
                <Link href="/organic" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Organic Products
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Recipe Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-primary-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    123 Fresh Street,<br />
                    Organic District,<br />
                    Green City, GC 12345
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-sm text-black font-medium">Mon-Sun: 6AM - 11PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-300">support@freshmart.com</p>
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:border-primary-500 text-white placeholder-gray-400"
                />
                <button className="px-6 py-2 bg-primary-500 text-white rounded-r-lg hover:bg-primary-600 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-black mt-2 font-medium">
                Get updates on deals and fresh arrivals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment methods and legal */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Payment methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-black font-medium">We Accept:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
                  <span className="text-xs text-white">💳</span>
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
                  <span className="text-xs text-white">📱</span>
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
                  <span className="text-xs text-white">🏪</span>
                </div>
              </div>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap items-center space-x-6 text-sm text-black font-medium">
              <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-black text-sm font-medium">
              © {currentYear} FreshMart. All rights reserved. Made with 💚 for fresh food lovers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer