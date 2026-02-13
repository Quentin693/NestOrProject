'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import MenuPromotion from '@/components/MenuPromotion';
import { useCart } from '@/contexts/CartContext';
import { getPizzas, getDrinks, getDesserts } from '@/lib/api';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { setPizzas, setDrinks, setDesserts } = useCart();

  useEffect(() => {
    async function loadData() {
      try {
        const [pizzasData, drinksData, dessertsData] = await Promise.all([
          getPizzas(),
          getDrinks(),
          getDesserts(),
        ]);
        
        // Stocker dans le CartContext pour que les cartes puissent les utiliser
        setPizzas(pizzasData);
        setDrinks(drinksData);
        setDesserts(dessertsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
    loadData();
  }, [setPizzas, setDrinks, setDesserts]);

  return (
    <main className="min-h-screen bg-stone-50">
      <Hero />
      
      {/* Section Promotion Menu */}
      <MenuPromotion />
      
      {/* Section Call-to-Action vers le menu */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Prêt à commander ?
          </h2>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto mb-10">
            Découvrez notre large sélection de pizzas, boissons et desserts. 
            Composez votre menu idéal et profitez de -10% de réduction !
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 bg-[#c72027] text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-[#a01a20] transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Voir le menu complet
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
      
      {/* Section Valeurs */}
      <section className="py-20 bg-gradient-to-br from-stone-100 to-stone-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🍕</div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">Recettes Authentiques</h3>
              <p className="text-stone-600">
                Pizzas préparées selon les traditions italiennes avec des ingrédients d'exception
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">Livraison Rapide</h3>
              <p className="text-stone-600">
                Votre commande livrée chaude et fraîche en moins de 30 minutes
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">Fait avec Amour</h3>
              <p className="text-stone-600">
                Chaque pizza est préparée avec passion par nos chefs expérimentés
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#c72027] text-white py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Nest-or</h3>
              <p className="text-white/80">
                La meilleure pizzeria italienne de votre quartier. Des pizzas authentiques préparées avec passion.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-white/80 mb-2">
                📞 <a href="tel:0102030405" className="hover:text-[#fef08a] transition-colors">01 02 03 04 05</a>
              </p>
              <p className="text-white/80 mb-2">
                📧 contact@nest-or.fr
              </p>
              <p className="text-white/80">
                📍 123 Rue de la Pizza, 75001 Paris
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horaires</h3>
              <p className="text-white/80 mb-2">Lundi - Vendredi: 11h - 23h</p>
              <p className="text-white/80 mb-2">Samedi - Dimanche: 12h - 00h</p>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-white/90">
              © 2026 Nest-or Italian Pizza — Tous droits réservés
            </p>
            <p className="text-sm text-white/70 mt-4">
              Pizzeria authentique • Ingrédients frais • Livraison rapide
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
