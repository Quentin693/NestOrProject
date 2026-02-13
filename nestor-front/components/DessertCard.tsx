'use client';

import Image from 'next/image';
import { Dessert } from '@/types';
import { Plus, Cake } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface DessertCardProps {
  dessert: Dessert;
}

const DESSERT_IMAGES: Record<string, string> = {
  tiramisu: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&q=80',
  panna: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80',
  'panna cotta': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80',
  brownie: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=300&q=80',
  cheesecake: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=300&q=80',
  cookie: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&q=80',
  'ice cream': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&q=80',
  glace: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&q=80',
  tarte: 'https://images.unsplash.com/photo-1464347744102-11db6282f854?w=300&q=80',
  cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&q=80',
  gâteau: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&q=80',
  mousse: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300&q=80',
  muffin: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&q=80',
  default: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80',
};

function getImageUrl(dessertName: string): string {
  const lower = dessertName.toLowerCase();
  for (const [key, url] of Object.entries(DESSERT_IMAGES)) {
    if (key !== 'default' && lower.includes(key)) return url;
  }
  return DESSERT_IMAGES.default;
}

export default function DessertCard({ dessert }: DessertCardProps) {
  const { addDessert } = useCart();
  const imgUrl = getImageUrl(dessert.name);

  return (
    <article className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-stone-100">
      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-pink-50 to-yellow-50">
        <Image
          src={imgUrl}
          alt={dessert.name}
          width={200}
          height={144}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-[#fef08a] text-[#c72027] px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow">
          <Cake className="w-3 h-3" />
          Dessert
        </div>
        {!dessert.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-red-600 px-3 py-1 rounded-full">
              Indisponible
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-bold text-stone-800 mb-2">{dessert.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-pink-600">{dessert.price.toFixed(2)} €</span>
          <button
            onClick={() => addDessert(dessert.id)}
            disabled={!dessert.available}
            className={`${
              dessert.available
                ? 'bg-pink-600 hover:bg-pink-700 text-white'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            } p-2 rounded-lg transition-all hover:scale-105`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
