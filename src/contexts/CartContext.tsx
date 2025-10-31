'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface CartItem {
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

interface CartContextType {
  items: CartItem[]
  itemCount: number
  total: number
  isLoading: boolean
  addToCart: (productId: string, quantity: number) => Promise<boolean>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  // Fetch cart items when user is authenticated
  const refreshCart = useCallback(async () => {
    if (status === 'authenticated') {
      try {
        setIsLoading(true)
        const response = await fetch('/api/cart', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        if (response.ok) {
          const data = await response.json()
          setItems(data.items || [])
        }
      } catch (error) {
        console.error('Error fetching cart:', error)
      } finally {
        setIsLoading(false)
      }
    } else if (status === 'unauthenticated') {
      setItems([])
    }
  }, [status])

  // Refresh cart when authentication status changes
  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addToCart = useCallback(async (productId: string, quantity: number): Promise<boolean> => {
    console.log('CartContext addToCart called with:', { productId, quantity, status })
    
    if (status !== 'authenticated') {
      console.log('User not authenticated in context')
      return false // Not authenticated
    }

    try {
      setIsLoading(true)
      console.log('Making API call to /api/cart/add')
      
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      })

      console.log('API response status:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        console.log('API response data:', result)
        await refreshCart()
        return true
      } else {
        const errorData = await response.text()
        console.error('API error:', response.status, errorData)
        return false
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [status, refreshCart])

  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      // Optimistically remove item from UI immediately
      setItems(currentItems => currentItems.filter(item => item.id !== itemId))
      
      setIsLoading(true)
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        // If delete failed, refresh cart to restore the item if it still exists
        await refreshCart()
        
        if (response.status === 404) {
          // Item was already deleted or doesn't exist - this is actually fine
          // The optimistic removal already worked
          return
        } else {
          // Other error - show user feedback
          console.error('Failed to delete item from server:', response.status, response.statusText)
        }
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
      // If there was an error, refresh cart to restore the item if it still exists
      await refreshCart()
    } finally {
      setIsLoading(false)
    }
  }, [refreshCart])

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      })

      if (response.ok) {
        await refreshCart()
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error)
    } finally {
      setIsLoading(false)
    }
  }, [refreshCart])

  const clearCart = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/cart/clear', {
        method: 'DELETE',
      })

      if (response.ok) {
        setItems([])
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      total,
      isLoading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  )
}