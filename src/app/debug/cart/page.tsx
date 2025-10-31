'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/contexts/CartContext'

interface DebugData {
  currentUser: {
    id: string
    email: string
  }
  userCartItems: any[]
  allCartItemsInDb: any[]
  userCartItemCount: number
  totalCartItemsInDb: number
}

export default function CartDebugPage() {
  const { items: frontendItems } = useCart()
  const [debugData, setDebugData] = useState<DebugData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDebugData()
  }, [])

  const fetchDebugData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/debug/cart')
      if (response.ok) {
        const data = await response.json()
        setDebugData(data)
      } else {
        setError(`Failed to fetch debug data: ${response.status}`)
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="container mx-auto px-4 py-8">Loading debug data...</div>
  if (error) return <div className="container mx-auto px-4 py-8 text-red-600">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cart Debug Information</h1>
      
      <button 
        onClick={fetchDebugData}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Refresh Debug Data
      </button>

      {debugData && (
        <div className="space-y-8">
          {/* Current User Info */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current User</h2>
            <p><strong>ID:</strong> {debugData.currentUser.id}</p>
            <p><strong>Email:</strong> {debugData.currentUser.email}</p>
          </div>

          {/* Frontend vs Database Comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend Cart State */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">
                Frontend Cart State ({frontendItems.length} items)
              </h2>
              {frontendItems.length > 0 ? (
                <div className="space-y-3">
                  {frontendItems.map((item, index) => (
                    <div key={item.id} className="bg-white p-3 rounded border">
                      <p><strong>Item {index + 1}:</strong></p>
                      <p><strong>ID:</strong> {item.id}</p>
                      <p><strong>Product:</strong> {item.product.name}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> ${item.product.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No items in frontend cart</p>
              )}
            </div>

            {/* Database Cart State */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-green-800">
                Database Cart State ({debugData.userCartItemCount} items)
              </h2>
              {debugData.userCartItems.length > 0 ? (
                <div className="space-y-3">
                  {debugData.userCartItems.map((item, index) => (
                    <div key={item.id} className="bg-white p-3 rounded border">
                      <p><strong>Item {index + 1}:</strong></p>
                      <p><strong>ID:</strong> {item.id}</p>
                      <p><strong>Product:</strong> {item.product.name}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> ${item.product.price}</p>
                      <p><strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No items in database cart</p>
              )}
            </div>
          </div>

          {/* Item ID Comparison */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800">ID Comparison</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Frontend Item IDs:</h3>
                <ul className="list-disc list-inside">
                  {frontendItems.map(item => (
                    <li key={item.id} className="font-mono text-sm">{item.id}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Database Item IDs:</h3>
                <ul className="list-disc list-inside">
                  {debugData.userCartItems.map(item => (
                    <li key={item.id} className="font-mono text-sm">{item.id}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* All Cart Items in Database (for debugging) */}
          <div className="bg-red-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-red-800">
              All Cart Items in Database ({debugData.totalCartItemsInDb} total)
            </h2>
            {debugData.allCartItemsInDb.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {debugData.allCartItemsInDb.map((item, index) => (
                  <div key={item.id} className="bg-white p-3 rounded border">
                    <p><strong>Item {index + 1}:</strong></p>
                    <p><strong>ID:</strong> {item.id}</p>
                    <p><strong>User:</strong> {item.user.email} (ID: {item.user.id})</p>
                    <p><strong>Product:</strong> {item.product.name}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No cart items in database</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}