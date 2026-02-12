'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, CheckCircle, X, Pizza as PizzaIcon, Wine, IceCream, ChevronRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

const API_URL = 'http://localhost:3009';

// Mapping des images
const PIZZA_IMAGES: { [key: string]: string } = {
  'Margherita': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop',
  'Pepperoni': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop',
  '4 Fromages': 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&h=400&fit=crop',
  'Savoyarde': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop',
  'Végétarienne': 'https://images.unsplash.com/photo-1564128442383-9201fcc740eb?w=600&h=400&fit=crop',
  'default': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop'
};

const DRINK_IMAGES: { [key: string]: string } = {
  'Coca-Cola': 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop',
  'Orangina': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop',
  'Eau minérale': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop',
  'Bière': 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop',
  'Vin rouge': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop',
  'Café': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
  'Thé': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
  'default': 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&h=400&fit=crop'
};

const DESSERT_IMAGES: { [key: string]: string } = {
  'Tiramisu': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop',
  'Panna Cotta': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
  'Mousse au chocolat': 'https://images.unsplash.com/photo-1541599468348-e96984315921?w=400&h=400&fit=crop',
  'Tarte aux pommes': 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=400&h=400&fit=crop',
  'Crème brûlée': 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=400&fit=crop',
  'default': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop'
};

interface Pizza {
  id: string;
  name: string;
  ingredients: string[];
  price: number;
}

interface Drink {
  id: number;
  name: string;
  price: number;
  size: string;
  withAlcohol: boolean;
  available: boolean;
}

interface Dessert {
  id: number;
  name: string;
  price: number;
  available: boolean;
}

interface CartItem {
  type: 'pizza' | 'drink' | 'dessert';
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pizzas' | 'drinks' | 'desserts'>('all');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const [pizzasRes, drinksRes, dessertsRes] = await Promise.all([
        fetch(`${API_URL}/pizzas`),
        fetch(`${API_URL}/drinks`),
        fetch(`${API_URL}/desserts`)
      ]);
      
      setPizzas(await pizzasRes.json());
      setDrinks(await drinksRes.json());
      setDesserts(await dessertsRes.json());
      setLoading(false);
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
    }
  };

  const addToCart = (type: 'pizza' | 'drink' | 'dessert', id: string | number, name: string, price: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.type === type && item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.type === type && item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { type, id, name, price, quantity: 1 }];
    });
  };

  const updateQuantity = (type: string, id: string | number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.type === type && item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (type: string, id: string | number) => {
    setCart((prev) => prev.filter((item) => !(item.type === type && item.id === id)));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const hasPromotionalMenu = () => {
    const hasPizza = cart.some(c => c.type === 'pizza');
    const hasNonAlcoholicDrink = cart.some(c => {
      if (c.type !== 'drink') return false;
      const drink = drinks.find(d => d.id === Number(c.id));
      return drink && !drink.withAlcohol;
    });
    const hasDessert = cart.some(c => c.type === 'dessert');
    return hasPizza && hasNonAlcoholicDrink && hasDessert;
  };

  const placeOrder = async () => {
    try {
      const orderData = {
        pizzas: cart.filter(c => c.type === 'pizza').map(c => c.id.toString()),
        drinks: cart.filter(c => c.type === 'drink').map(c => Number(c.id)),
        desserts: cart.filter(c => c.type === 'dessert').map(c => Number(c.id)),
      };

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setOrderSuccess(true);
        setCart([]);
        setShowCart(false);
        setTimeout(() => setOrderSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Erreur commande:', error);
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = calculateTotal();
  const hasPromo = hasPromotionalMenu();
  const finalTotal = hasPromo ? total * 0.9 : total;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Chargement du menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <PizzaIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NestOr</h1>
                <p className="text-xs text-gray-500">Authentic Italian Food</p>
              </div>
            </div>

            <button
              onClick={() => setShowCart(true)}
              className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Panier</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-red-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 lg:py-20">
            {/* Text Content */}
            <div className="z-10 text-center lg:text-left">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeIn leading-tight">
                Satisfy Your Pizza<br />Cravings Today
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-orange-100 animate-slideUp">
                Discover our authentic Italian pizzas, fresh drinks, and delicious desserts
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  Voir le Menu
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Pizza Image */}
            <div className="relative z-10 animate-fadeIn">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                <Image
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=800&fit=crop"
                  alt="Delicious Pizza"
                  width={600}
                  height={600}
                  className="relative z-10 rounded-full shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Top Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 'all', name: 'Tout', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
              { id: 'pizzas', name: 'Pizzas', icon: PizzaIcon, color: 'from-orange-500 to-red-500' },
              { id: 'drinks', name: 'Boissons', icon: Wine, color: 'from-blue-500 to-cyan-500' },
              { id: 'desserts', name: 'Desserts', icon: IceCream, color: 'from-pink-500 to-rose-500' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`flex flex-col items-center gap-4 p-6 rounded-2xl transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-white shadow-xl scale-105'
                    : 'bg-white shadow-md hover:shadow-lg hover:scale-102'
                }`}
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}>
                  <cat.icon className="w-10 h-10 text-white" />
                </div>
                <span className="font-semibold text-gray-900">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pizzas */}
          {(selectedCategory === 'all' || selectedCategory === 'pizzas') && (
            <div className="mb-16 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <PizzaIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Nos Pizzas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pizzas.map((pizza) => (
                  <div key={pizza.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={PIZZA_IMAGES[pizza.name] || PIZZA_IMAGES.default}
                        alt={pizza.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{pizza.name}</h4>
                      <p className="text-sm text-gray-600 mb-4">{pizza.ingredients.join(', ')}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-orange-600">{pizza.price}€</span>
                        <button
                          onClick={() => addToCart('pizza', pizza.id, pizza.name, pizza.price)}
                          className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drinks */}
          {(selectedCategory === 'all' || selectedCategory === 'drinks') && (
            <div className="mb-16 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Wine className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Boissons</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {drinks.map((drink) => (
                  <div key={drink.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={DRINK_IMAGES[drink.name] || DRINK_IMAGES.default}
                        alt={drink.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-1">{drink.name}</h4>
                      <p className="text-xs text-gray-500 mb-3">{drink.size}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">{drink.price}€</span>
                        <button
                          onClick={() => addToCart('drink', drink.id, drink.name, drink.price)}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Desserts */}
          {(selectedCategory === 'all' || selectedCategory === 'desserts') && (
            <div className="animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <IceCream className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Desserts</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {desserts.map((dessert) => (
                  <div key={dessert.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={DESSERT_IMAGES[dessert.name] || DESSERT_IMAGES.default}
                        alt={dessert.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-3">{dessert.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-pink-600">{dessert.price}€</span>
                        <button
                          onClick={() => addToCart('dessert', dessert.id, dessert.name, dessert.price)}
                          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <PizzaIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold">NestOr</h3>
          </div>
          <p className="text-gray-400">© 2026 NestOr - Authentic Italian Food</p>
        </div>
      </footer>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
            {/* Cart Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Votre Panier</h3>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.type}-${item.id}`} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.price}€ × {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.type, item.id, -1)}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.type, item.id, 1)}
                          className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.type, item.id)}
                          className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t p-6 bg-gray-50">
                {hasPromo && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">Menu Promo -10% appliqué!</span>
                  </div>
                )}
                <div className="space-y-2 mb-4">
                  {hasPromo && (
                    <div className="flex justify-between text-gray-600">
                      <span>Sous-total:</span>
                      <span className="line-through">{total.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-2xl font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-orange-600">{finalTotal.toFixed(2)}€</span>
                  </div>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300"
                >
                  Commander
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Message */}
      {orderSuccess && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-2xl p-6 z-50 animate-scaleIn border-2 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">Commande confirmée!</p>
              <p className="text-sm text-gray-600">Votre commande est en préparation</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
