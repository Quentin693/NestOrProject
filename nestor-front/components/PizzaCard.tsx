'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Pizza } from '@/types';
import { Plus, Wrench } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import PizzaCustomizer from '@/components/PizzaCustomizer';

interface PizzaCardProps {
  pizza: Pizza;
}

const PIZZA_IMAGES: Record<string, string> = {
  margherita: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=85',
  pepperoni: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=85',
  fromages: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&q=85',
  savoyarde: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=85',
  végétarienne: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=500&q=85',
  vegetarienne: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=500&q=85',
  default: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=85',
};

function getImageUrl(pizzaName: string): string {
  const lower = pizzaName.toLowerCase();
  for (const [key, url] of Object.entries(PIZZA_IMAGES)) {
    if (key !== 'default' && lower.includes(key)) return url;
  }
  return PIZZA_IMAGES.default;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const { addPizza } = useCart();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const imgUrl = getImageUrl(pizza.name);

  return (
    <>
      <PizzaCustomizer 
        pizza={pizza} 
        isOpen={isCustomizing} 
        onClose={() => setIsCustomizing(false)} 
      />
      
      <article className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-stone-100">
      <div className="relative h-52 overflow-hidden bg-stone-100">
        <Image
          src={imgUrl}
          alt={pizza.name}
          width={400}
          height={208}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-[#fef08a] text-[#c72027] px-3 py-1.5 rounded-full font-bold text-sm shadow">
          {pizza.price?.toFixed(2)} €
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-stone-800 mb-2">{pizza.name}</h3>
        {pizza.ingredients && pizza.ingredients.length > 0 && (
          <p className="text-sm text-stone-600 mb-4 line-clamp-2">
            {pizza.ingredients.join(', ')}
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => setIsCustomizing(true)}
            className="flex-1 bg-stone-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors"
            title="Personnaliser"
          >
            <Wrench className="w-5 h-5" />
            <span className="hidden sm:inline">Personnaliser</span>
          </button>
          <button
            onClick={() => addPizza(parseInt(pizza.id))}
            className="flex-1 bg-[#c72027] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#a01a20] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>
      </article>
    </>
  );
}
