import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create categories
  console.log('📂 Creating categories...')
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Fruits & Vegetables',
        slug: 'fruits-vegetables',
        description: 'Fresh organic fruits and vegetables',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Dairy & Eggs',
        slug: 'dairy-eggs',
        description: 'Fresh dairy products and farm eggs',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Meat & Seafood',
        slug: 'meat-seafood',
        description: 'Premium quality meat and fresh seafood',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Pantry Staples',
        slug: 'pantry-staples',
        description: 'Essential pantry items and dry goods',
        image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Beverages',
        slug: 'beverages',
        description: 'Refreshing drinks and beverages',
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Snacks',
        slug: 'snacks',
        description: 'Delicious snacks and treats',
        image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop',
        isActive: true,
      },
    }),
  ])

  // Create products
  console.log('🛒 Creating products...')
  const products = await Promise.all([
    // Fruits & Vegetables
    prisma.product.create({
      data: {
        name: 'Organic Spinach',
        description: 'Fresh organic baby spinach leaves, perfect for salads and cooking',
        slug: 'organic-spinach',
        sku: 'VEG-SPN-001',
        price: 3.99,
        comparePrice: 4.99,
        categoryId: categories[0].id,
        stock: 50,
        weight: 0.5,
        isActive: true,
        isFeatured: true,
        images: '["https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400"]',
        tags: '["organic", "leafy greens", "healthy"]',
        nutritionInfo: {
          calories: 23,
          protein: 2.9,
          carbs: 3.6,
          fat: 0.4,
          fiber: 2.2,
          vitamins: ['A', 'C', 'K', 'Folate']
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Fresh Avocados',
        description: 'Ripe and creamy Hass avocados, perfect for toast or guacamole',
        slug: 'fresh-avocados',
        sku: 'FRT-AVO-001',
        price: 2.99,
        categoryId: categories[0].id,
        stock: 75,
        weight: 0.2,
        isActive: true,
        isFeatured: true,
        images: '["https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400"]',
        tags: '["healthy fats", "fruit", "superfood"]',
        nutritionInfo: {
          calories: 234,
          protein: 4,
          carbs: 12,
          fat: 21,
          fiber: 10,
          vitamins: ['K', 'C', 'E']
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Organic Blueberries',
        description: 'Sweet and juicy organic blueberries packed with antioxidants',
        slug: 'organic-blueberries',
        sku: 'FRT-BLU-001',
        price: 5.99,
        comparePrice: 6.99,
        categoryId: categories[0].id,
        stock: 30,
        weight: 0.5,
        isActive: true,
        isFeatured: true,
        images: '["https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400"]',
        tags: '["organic", "berries", "antioxidants", "superfood"]',
        nutritionInfo: {
          calories: 84,
          protein: 1.1,
          carbs: 21,
          fat: 0.3,
          fiber: 3.6,
          vitamins: ['C', 'K']
        },
      },
    }),

    // Dairy & Eggs
    prisma.product.create({
      data: {
        name: 'Farm Fresh Eggs',
        description: 'Grade A large eggs from free-range chickens',
        slug: 'farm-fresh-eggs',
        sku: 'DAI-EGG-001',
        price: 4.99,
        categoryId: categories[1].id,
        stock: 60,
        weight: 1.5,
        isActive: true,
        isFeatured: true,
        images: '["https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400"]',
        tags: '["protein", "free-range", "farm fresh"]',
        nutritionInfo: {
          calories: 70,
          protein: 6,
          carbs: 0.6,
          fat: 5,
          cholesterol: 186,
          vitamins: ['B12', 'D', 'Choline']
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Organic Almond Milk',
        description: 'Creamy unsweetened organic almond milk, dairy-free',
        slug: 'organic-almond-milk',
        sku: 'DAI-ALM-001',
        price: 3.49,
        categoryId: categories[1].id,
        stock: 40,
        weight: 1.8,
        isActive: true,
        isFeatured: false,
        images: '["https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"]',
        tags: '["dairy-free", "organic", "plant-based", "unsweetened"]',
        nutritionInfo: {
          calories: 40,
          protein: 1,
          carbs: 2,
          fat: 3,
          calcium: 450,
          vitamins: ['E', 'D']
        },
      },
    }),

    // Meat & Seafood
    prisma.product.create({
      data: {
        name: 'Ground Beef 85/15',
        description: 'Premium lean ground beef, 85% lean, 15% fat',
        slug: 'ground-beef-85-15',
        sku: 'MEA-BEF-001',
        price: 8.99,
        categoryId: categories[2].id,
        stock: 25,
        weight: 1.0,
        isActive: true,
        isFeatured: true,
        images: '["https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400"]',
        tags: '["protein", "beef", "lean", "fresh"]',
        nutritionInfo: {
          calories: 215,
          protein: 22,
          carbs: 0,
          fat: 13,
          iron: 2.3,
          vitamins: ['B12', 'B6', 'Niacin']
        },
      },
    }),

    // Pantry Staples
    prisma.product.create({
      data: {
        name: 'Artisan Sourdough Bread',
        description: 'Freshly baked artisan sourdough bread with crispy crust',
        slug: 'artisan-sourdough-bread',
        sku: 'PAN-BRD-001',
        price: 5.49,
        categoryId: categories[3].id,
        stock: 20,
        weight: 0.8,
        isActive: true,
        isFeatured: true,
        images: '["https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400"]',
        tags: '["artisan", "sourdough", "fresh baked", "bread"]',
        nutritionInfo: {
          calories: 160,
          protein: 6,
          carbs: 30,
          fat: 2,
          fiber: 2,
          sodium: 310
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Raw Honey',
        description: 'Pure raw wildflower honey, unprocessed and natural',
        slug: 'raw-honey',
        sku: 'PAN-HON-001',
        price: 7.99,
        categoryId: categories[3].id,
        stock: 35,
        weight: 0.5,
        isActive: true,
        isFeatured: false,
        images: '["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400"]',
        tags: '["raw", "natural", "unprocessed", "wildflower"]',
        nutritionInfo: {
          calories: 60,
          protein: 0,
          carbs: 17,
          fat: 0,
          sugars: 16,
          antioxidants: true
        },
      },
    }),
  ])

  // Create a test user
  console.log('👤 Creating test user...')
  const hashedPassword = await bcrypt.hash('testpassword123', 12)
  
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: hashedPassword,
      emailVerified: new Date(),
      role: 'USER',
    },
  })

  // Create a test address for the user
  console.log('🏠 Creating test address...')
  await prisma.address.create({
    data: {
      userId: testUser.id,
      type: 'HOME',
      firstName: 'Test',
      lastName: 'User',
      phone: '+1-555-0123',
      street: '123 Main Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'USA',
      isDefault: true,
    },
  })

  // Create some cart items for the test user
  console.log('🛒 Creating test cart items...')
  await Promise.all([
    prisma.cartItem.create({
      data: {
        userId: testUser.id,
        productId: products[0].id, // Organic Spinach
        quantity: 2,
      },
    }),
    prisma.cartItem.create({
      data: {
        userId: testUser.id,
        productId: products[3].id, // Farm Fresh Eggs
        quantity: 1,
      },
    }),
  ])

  console.log('✅ Database seeding completed successfully!')
  console.log(`📊 Created:`)
  console.log(`   • ${categories.length} categories`)
  console.log(`   • ${products.length} products`)
  console.log(`   • 1 test user (test@example.com / testpassword123)`)
  console.log(`   • 1 address`)
  console.log(`   • 2 cart items`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })