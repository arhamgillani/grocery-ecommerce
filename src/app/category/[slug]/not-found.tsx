import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Category Not Found</h1>
          <p className="text-black mb-8 font-medium">
            The category you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-sm text-black font-medium">
            Or browse our <Link href="/categories" className="text-primary-600 hover:text-primary-700 font-medium">categories</Link>
          </div>
        </div>
      </div>
    </div>
  )
}