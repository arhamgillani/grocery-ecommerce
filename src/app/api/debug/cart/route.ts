import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get all cart items for this user from database
    const dbCartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Get all cart items in the entire database (for debugging)
    const allCartItems = await prisma.cartItem.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true
          }
        }
      }
    })

    return NextResponse.json({
      currentUser: {
        id: user.id,
        email: user.email
      },
      userCartItems: dbCartItems,
      allCartItemsInDb: allCartItems,
      userCartItemCount: dbCartItems.length,
      totalCartItemsInDb: allCartItems.length
    })
  } catch (error) {
    console.error('Error in debug cart route:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}