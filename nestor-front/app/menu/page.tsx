'use client';

import { useEffect, useState } from 'react';
import PizzaCard from '@/components/PizzaCard';
import DrinkCard from '@/components/DrinkCard';
import DessertCard from '@/components/DessertCard';
import { useCart } from '@/contexts/CartContext';
import { getPizzas, getDrinks, getDesserts } from '@/lib/api';
import { Pizza, Drink, Dessert } from '@/types';
import { Loader2, Search, Filter, X } from 'lucide-react';

export default function MenuPage() {
  const { setPizzas, setDrinks, setDesserts } = useCart();
  const [pizzas, setPizzasState] = useState<Pizza[]>([]);
  const [drinks, setDrinksState] = useState<Drink[]>([]);
  const [desserts, setDessertsState] = useState<Dessert[]>([]);
  const [loading, setLoading] = useState(true);
  
  // États pour la recherche et les filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pizza' | 'drink' | 'dessert'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  useEffect(() => {
    async function loadData() {
      try {
        const [pizzasData, drinksData, dessertsData] = await Promise.all([
          getPizzas(),
          getDrinks(),
          getDesserts(),
        ]);
        
        setPizzasState(pizzasData);
        setDrinksState(drinksData);
        setDessertsState(dessertsData);
        
        setPizzas(pizzasData);
        setDrinks(drinksData);
        setDesserts(dessertsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [setPizzas, setDrinks, setDesserts]);

  // Fonction de filtrage
  const filterProducts = () => {
    const allProducts = [
      ...pizzas.map(p => ({ ...p, type: 'pizza' as const, available: true })),
      ...drinks.map(d => ({ ...d, type: 'drink' as const })),
      ...desserts.map(d => ({ ...d, type: 'dessert' as const })),
    ];

    return allProducts.filter(product => {
      // Filtre par catégorie
      if (selectedCategory !== 'all' && product.type !== selectedCategory) {
        return false;
      }

      // Filtre par recherche
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(query);
        const ingredientsMatch = 'ingredients' in product && product.ingredients 
          ? product.ingredients.some((ing: string) => ing.toLowerCase().includes(query))
          : false;
        
        if (!nameMatch && !ingredientsMatch) {
          return false;
        }
      }

      // Filtre par prix
      if (priceFilter !== 'all' && product.price) {
        if (priceFilter === 'low' && product.price > 5) return false;
        if (priceFilter === 'medium' && (product.price <= 5 || product.price > 10)) return false;
        if (priceFilter === 'high' && product.price <= 10) return false;
      }

      return true;
    });
  };

  const filteredProducts = filterProducts();
  const filteredPizzas = filteredProducts.filter(p => p.type === 'pizza') as Pizza[];
  const filteredDrinks = filteredProducts.filter(p => p.type === 'drink') as Drink[];
  const filteredDesserts = filteredProducts.filter(p => p.type === 'dessert') as Dessert[];

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#c72027] animate-spin mx-auto mb-4" />
          <p className="text-stone-600 text-lg font-medium">Chargement du menu...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header de la page Menu */}
      <section className="bg-gradient-to-br from-[#c72027] to-[#a01a20] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-4">
            Notre Menu
          </h1>
          <p className="text-white/90 text-center text-lg mb-8">
            Découvrez nos délicieuses pizzas, boissons et desserts
          </p>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Rechercher un produit, ingrédient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-white/20 bg-white/95 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#fef08a] text-stone-800 placeholder:text-stone-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="bg-white border-b border-stone-200 sticky top-20 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-stone-600" />
              <span className="font-semibold text-stone-700">Filtres :</span>
            </div>

            {/* Filtre par catégorie */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#c72027] text-white shadow-md'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setSelectedCategory('pizza')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === 'pizza'
                    ? 'bg-[#c72027] text-white shadow-md'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                🍕 Pizzas
              </button>
              <button
                onClick={() => setSelectedCategory('drink')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === 'drink'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                🥤 Boissons
              </button>
              <button
                onClick={() => setSelectedCategory('dessert')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === 'dessert'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                🍰 Desserts
              </button>
            </div>

            {/* Filtre par prix */}
            <div className="flex gap-2 ml-auto">
              <span className="text-sm text-stone-600 self-center">Prix :</span>
              <button
                onClick={() => setPriceFilter('all')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  priceFilter === 'all'
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setPriceFilter('low')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  priceFilter === 'low'
                    ? 'bg-green-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {'<'} 5€
              </button>
              <button
                onClick={() => setPriceFilter('medium')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  priceFilter === 'medium'
                    ? 'bg-orange-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                5-10€
              </button>
              <button
                onClick={() => setPriceFilter('high')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  priceFilter === 'high'
                    ? 'bg-red-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {'>'} 10€
              </button>
            </div>
          </div>

          {/* Résultats */}
          <div className="mt-3 text-sm text-stone-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Produits */}
      <div className="container mx-auto px-4 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-stone-500 mb-2">Aucun produit trouvé</p>
            <p className="text-stone-400">Essayez de modifier vos filtres ou votre recherche</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Section Pizzas */}
            {(selectedCategory === 'all' || selectedCategory === 'pizza') && filteredPizzas.length > 0 && (
              <section>
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-2">
                    Nos Pizzas
                  </h2>
                  <p className="text-stone-600">
                    {filteredPizzas.length} pizza{filteredPizzas.length > 1 ? 's' : ''} disponible{filteredPizzas.length > 1 ? 's' : ''}
                  </p>
                  <div className="w-20 h-1 bg-[#c72027] mt-3 rounded-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredPizzas.map((pizza) => (
                    <PizzaCard key={pizza.id} pizza={pizza} />
                  ))}
                </div>
              </section>
            )}

            {/* Section Boissons */}
            {(selectedCategory === 'all' || selectedCategory === 'drink') && filteredDrinks.length > 0 && (
              <section>
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-2">
                    Boissons
                  </h2>
                  <p className="text-stone-600">
                    {filteredDrinks.length} boisson{filteredDrinks.length > 1 ? 's' : ''} disponible{filteredDrinks.length > 1 ? 's' : ''}
                  </p>
                  <div className="w-20 h-1 bg-blue-500 mt-3 rounded-full" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
                  {filteredDrinks.map((drink) => (
                    <DrinkCard key={drink.id} drink={drink} />
                  ))}
                </div>
              </section>
            )}

            {/* Section Desserts */}
            {(selectedCategory === 'all' || selectedCategory === 'dessert') && filteredDesserts.length > 0 && (
              <section>
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-2">
                    Desserts
                  </h2>
                  <p className="text-stone-600">
                    {filteredDesserts.length} dessert{filteredDesserts.length > 1 ? 's' : ''} disponible{filteredDesserts.length > 1 ? 's' : ''}
                  </p>
                  <div className="w-20 h-1 bg-pink-500 mt-3 rounded-full" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {filteredDesserts.map((dessert) => (
                    <DessertCard key={dessert.id} dessert={dessert} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
