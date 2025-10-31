import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if item already exists in wishlist
    const existingWishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        userId: user.id,
        productId: productId,
      },
    })

    if (existingWishlistItem) {
      // Remove from wishlist
      await prisma.wishlistItem.delete({
        where: { id: existingWishlistItem.id },
      })

      return NextResponse.json({
        success: true,
        added: false,
        message: 'Item removed from wishlist',
      })
    } else {
      // Add to wishlist
      const newWishlistItem = await prisma.wishlistItem.create({
        data: {
          userId: user.id,
          productId: productId,
        },
        include: {
          product: true,
        },
      })

      return NextResponse.json({
        success: true,
        added: true,
        data: newWishlistItem,
        message: 'Item added to wishlist',
      })
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update wishlist' },
      { status: 500 }
    )
  }
}