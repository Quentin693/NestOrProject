import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nest-or | Pizzeria Italienne',
  icons: {
    icon: '/nestorlogo.jpeg',
  },
  description: 'Délicieuses pizzas italiennes faites maison avec des ingrédients frais',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <div className="pt-20">
            {children}
          </div>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
