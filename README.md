# 🛒 FreshMart - eCommerce Grocery Website

A modern, full-stack eCommerce grocery website built with React.js, Next.js, and MySQL. Features include user authentication, product management, shopping cart, checkout process, and responsive design.

## 🚀 Features

### 🔐 Authentication & User Management
- User registration and login with email/password
- Social login integration (Google, Facebook, Apple)
- Password reset and email verification
- JWT-based authentication
- User profiles and account management
- Guest checkout option

### 🛍️ Shopping Experience
- **Homepage**: Hero banner, search bar, featured categories, product carousel
- **Product Catalog**: Grid/card layout with filtering and sorting
- **Product Details**: Image galleries, descriptions, reviews, nutrition facts
- **Shopping Cart**: Easy-to-edit cart with quantity controls
- **Multi-step Checkout**: Address, delivery, payment options
- **Order Management**: Order tracking and history

### 🏪 Product Management
- Categories and subcategories
- Product search and filtering
- Inventory management
- Product reviews and ratings
- Wishlist functionality
- Deal and promotion system

### 📱 User Interface
- **Responsive Design**: Mobile-first approach
- **Modern Styling**: Clean, fresh design with Tailwind CSS
- **Color Scheme**: Fresh greens, whites, and neutrals
- **Animations**: Smooth transitions with Framer Motion
- **Typography**: Modern fonts (Inter, Poppins)

### 🚚 Additional Features
- Newsletter subscription
- Order tracking
- Address book management
- Customer support integration
- SEO optimization

## 🛠️ Tech Stack

- **Frontend**: React 19, Next.js 16, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MySQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MySQL database
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd grocery-ecommerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Update the `.env` file with your database and service credentials:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/grocery_ecommerce"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Social OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push
```

### 5. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
grocery-ecommerce/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── layout/           # Layout components (Header, Footer)
│   │   ├── home/             # Homepage components
│   │   └── product/          # Product-related components
│   ├── lib/                  # Utility libraries
│   │   ├── prisma.ts         # Prisma client
│   │   └── auth.ts           # NextAuth configuration
│   └── types/                # TypeScript type definitions
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## 🎨 Design Features

- **Fresh Green Color Scheme**: Primary green (#22c55e) with orange accents
- **Modern Typography**: Inter and Poppins fonts
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion for interactions
- **Clean UI**: Rounded corners, shadows, and hover effects

## 📝 Next Steps

To complete the project, implement:

1. **Product Management**: CRUD operations for products and categories
2. **Shopping Cart**: Add to cart, quantity updates, checkout process
3. **Order Management**: Order creation, tracking, and history
4. **User Dashboard**: Profile management, addresses, order history
5. **Search & Filtering**: Product search and category filtering
6. **Payment Integration**: Stripe or other payment processors
7. **Admin Panel**: Product and order management for administrators

## 🚀 Deployment

The project is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service. Make sure to:

1. Set up your production database
2. Configure environment variables
3. Set up social OAuth if using
4. Configure email services for notifications

---

**Built with ❤️ for fresh food lovers**
