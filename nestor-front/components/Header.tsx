'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Phone } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center h-20 gap-4">
          {/* Gauche - Menu + Téléphone */}
          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href="/menu"
              className="text-stone-700 hover:text-[#c72027] font-bold text-lg transition-colors"
            >
              Menu
            </Link>

            <Link
              href="/api-explorer"
              className="text-stone-600 hover:text-[#c72027] font-medium text-sm transition-colors border border-stone-300 px-3 py-1.5 rounded-lg hover:border-[#c72027] hover:shadow-md"
            >
              API
            </Link>
            <a
              href="tel:0180222000"
              className="hidden lg:flex items-center gap-2 text-stone-700 hover:text-[#c72027] font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+ 1 800 222 000</span>
            </a>
          </div>

          {/* Centre - Logo */}
          <Link href="/" className="flex items-center justify-center group">
            <div className="relative w-16 h-16 overflow-hidden rounded-full">
              <Image
                src="/nestorlogo.jpeg"
                alt="Nest-or Logo"
                width={64}
                height={64}
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Droite - Bouton Commander */}
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-[#c72027] hover:bg-[#a01a20] text-white px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg flex items-center gap-2 font-bold"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Commander</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fef08a] text-[#c72027] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
            <Link
              href="/admin"
              className="text-stone-600 hover:text-[#c72027] font-medium text-sm transition-colors border border-stone-300 px-3 py-1.5 rounded-lg hover:border-[#c72027] hover:shadow-md"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
