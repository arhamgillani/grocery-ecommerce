import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '10')

    let whereClause: any = {
      isActive: true,
    }

    if (category) {
      whereClause.category = {
        slug: category,
      }
    }

    if (featured === 'true') {
      whereClause.isFeatured = true
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data: products,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    )
  }
}