'use client';

import Image from 'next/image';
import { Drink } from '@/types';
import { Plus, Wine, Droplets } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface DrinkCardProps {
  drink: Drink;
}

const DRINK_IMAGES: Record<string, string> = {
  coca: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&q=80',
  'coca-cola': 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&q=80',
  sprite: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=300&q=80',
  fanta: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=300&q=80',
  orangina: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&q=80',
  eau: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80',
  water: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80',
  perrier: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f0d?w=300&q=80',
  'san pellegrino': 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f0d?w=300&q=80',
  limonade: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f0d?w=300&q=80',
  vin: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&q=80',
  wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&q=80',
  beer: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&q=80',
  bière: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&q=80',
  jus: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&q=80',
  juice: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&q=80',
  default: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=300&q=80',
};

function getImageUrl(drinkName: string): string {
  const lower = drinkName.toLowerCase();
  for (const [key, url] of Object.entries(DRINK_IMAGES)) {
    if (key !== 'default' && lower.includes(key)) return url;
  }
  return DRINK_IMAGES.default;
}

export default function DrinkCard({ drink }: DrinkCardProps) {
  const { addDrink } = useCart();
  const imgUrl = getImageUrl(drink.name);

  return (
    <article className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-stone-100">
      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        <Image
          src={imgUrl}
          alt={drink.name}
          width={200}
          height={144}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {drink.withAlcohol ? (
          <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow">
            <Wine className="w-3 h-3" />
            Avec alcool
          </div>
        ) : (
          <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow">
            ✓ Idéal pour menu
          </div>
        )}
        {!drink.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-red-600 px-3 py-1 rounded-full">
              Indisponible
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-bold text-stone-800">{drink.name}</h3>
          <div className="flex items-center gap-1 text-blue-600">
            <Droplets className="w-3 h-3" />
            <span className="text-xs font-medium">{drink.size}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">{drink.price.toFixed(2)} €</span>
          <button
            onClick={() => addDrink(drink.id)}
            disabled={!drink.available}
            className={`${
              drink.available
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
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
