import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from '@/components/providers/Providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FreshMart - Fresh Groceries Delivered",
  description: "Your trusted partner for fresh, quality groceries delivered right to your doorstep. Shop organic produce, daily essentials, and more with same-day delivery.",
  keywords: "grocery delivery, fresh produce, organic food, online grocery shopping, food delivery",
  authors: [{ name: "FreshMart Team" }],
  openGraph: {
    title: "FreshMart - Fresh Groceries Delivered",
    description: "Shop fresh, quality groceries with same-day delivery. Organic produce, daily essentials, and more.",
    type: "website",
    locale: "en_US",
    siteName: "FreshMart",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreshMart - Fresh Groceries Delivered",
    description: "Shop fresh, quality groceries with same-day delivery.",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#22c55e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
