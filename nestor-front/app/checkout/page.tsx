'use client';

import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { detectMenus } from '@/lib/menuLogic';
import { createOrder } from '@/lib/api';
import { ArrowLeft, ShoppingBag, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, subtotal, menuDiscount, menusCount, clearCart } = useCart();
  const { menus, remainingItems } = detectMenus(items);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Préparer les données de commande
      const pizzaIds = items.filter(item => item.type === 'pizza').flatMap(item => 
        Array(item.quantity).fill(item.id)
      );
      const drinkIds = items.filter(item => item.type === 'drink').flatMap(item => 
        Array(item.quantity).fill(item.id)
      );
      const dessertIds = items.filter(item => item.type === 'dessert').flatMap(item => 
        Array(item.quantity).fill(item.id)
      );

      // Créer la commande via l'API
      const order = await createOrder(pizzaIds, drinkIds, dessertIds);
      
      if (order) {
        setOrderId(order.id);
        setOrderSuccess(true);
        
        // Vider le panier après 2 secondes
        setTimeout(() => {
          clearCart();
        }, 2000);
      } else {
        alert('Erreur lors de la création de la commande. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur de commande:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // Si le panier est vide
  if (items.length === 0 && !orderSuccess) {
    return (
      <main className="min-h-screen bg-stone-50 pt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <ShoppingBag className="w-20 h-20 text-stone-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-stone-800 mb-4">Votre panier est vide</h1>
            <p className="text-stone-600 mb-8">Ajoutez des produits pour passer commande</p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-[#c72027] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#a01a20] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voir le menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Page de succès
  if (orderSuccess) {
    return (
      <main className="min-h-screen bg-stone-50 pt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <CheckCircle2 className="w-24 h-24 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-stone-800 mb-4">Commande confirmée !</h1>
            <p className="text-xl text-stone-600 mb-2">Merci pour votre commande</p>
            <p className="text-stone-500 mb-8">Numéro de commande : <span className="font-bold">#{orderId}</span></p>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-stone-800 mb-4">Récapitulatif</h2>
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-stone-600">
                  <span>Sous-total</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} €</span>
                </div>
                {menusCount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Réduction Menu{menusCount > 1 ? 's' : ''} (-10%)</span>
                    <span className="font-bold">-{menuDiscount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Livraison</span>
                  <span className="font-semibold text-green-600">Gratuite</span>
                </div>
                <div className="h-px bg-stone-300 my-4" />
                <div className="flex justify-between text-2xl font-bold text-stone-800">
                  <span>Total</span>
                  <span className="text-[#c72027]">{totalPrice.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            <p className="text-stone-600 mb-8">
              Votre commande sera livrée dans <span className="font-bold text-[#c72027]">30 minutes</span>
            </p>
            
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#c72027] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#a01a20] transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 pt-8 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-stone-600 hover:text-[#c72027] font-semibold mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour au menu
            </Link>
            <h1 className="text-4xl font-bold text-stone-800">Finaliser la commande</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Informations de livraison</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-[#c72027] focus:outline-none transition-colors"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-stone-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-[#c72027] focus:outline-none transition-colors"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-[#c72027] focus:outline-none transition-colors"
                      placeholder="jean@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-stone-700 mb-2">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-[#c72027] focus:outline-none transition-colors"
                    placeholder="123 Rue de la Pizza"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-semibold text-stone-700 mb-2">
                      Code postal *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-[#c72027] focus:outline-none transition-colors"
                      placeholder="75001"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-stone-700 mb-2">
                      Ville *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-[#c72027] focus:outline-none transition-colors"
                      placeholder="Paris"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-stone-700 mb-2">
                    Instructions de livraison (optionnel)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-[#c72027] focus:outline-none transition-colors resize-none"
                    placeholder="Bâtiment B, 3ème étage..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#c72027] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#a01a20] transition-colors shadow-lg hover:shadow-xl disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      Confirmer la commande
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Récapitulatif */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
                <h2 className="text-2xl font-bold text-stone-800 mb-6">Récapitulatif</h2>
                
                {/* Menus */}
                {menus.map((menu, index) => (
                  <div
                    key={`menu-${index}`}
                    className="bg-gradient-to-br from-[#fef08a] to-[#fde047] rounded-xl p-4 mb-4 border-2 border-[#c72027]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-[#c72027]">Menu #{index + 1}</h3>
                      <span className="bg-[#c72027] text-white text-xs font-bold px-2 py-1 rounded-full">
                        -10%
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-stone-700">
                      <p>• {menu.pizza.name}</p>
                      <p>• {menu.drink.name}</p>
                      <p>• {menu.dessert.name}</p>
                    </div>
                    <div className="mt-2 text-right">
                      <p className="text-xs text-stone-500 line-through">{menu.originalPrice.toFixed(2)} €</p>
                      <p className="text-lg font-bold text-[#c72027]">{menu.discountedPrice.toFixed(2)} €</p>
                    </div>
                  </div>
                ))}

                {/* Articles restants */}
                {remainingItems.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="flex justify-between items-center py-3 border-b border-stone-200">
                    <div>
                      <p className="font-semibold text-stone-800">{item.name}</p>
                      <p className="text-sm text-stone-500">Quantité: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-stone-800">{(item.price * item.quantity).toFixed(2)} €</p>
                  </div>
                ))}

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-stone-600">
                    <span>Sous-total</span>
                    <span className="font-semibold">{subtotal.toFixed(2)} €</span>
                  </div>
                  
                  {menusCount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="font-semibold">Réduction Menu{menusCount > 1 ? 's' : ''} (-10%)</span>
                      <span className="font-bold">-{menuDiscount.toFixed(2)} €</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-stone-600">
                    <span>Livraison</span>
                    <span className="font-semibold text-green-600">Gratuite</span>
                  </div>
                  
                  <div className="h-px bg-stone-300" />
                  
                  <div className="flex justify-between text-2xl font-bold text-stone-800">
                    <span>Total</span>
                    <span className="text-[#c72027]">{totalPrice.toFixed(2)} €</span>
                  </div>

                  {menusCount > 0 && (
                    <p className="text-xs text-center text-green-600 font-semibold bg-green-50 py-2 rounded-lg">
                      🎉 Vous économisez {menuDiscount.toFixed(2)} € avec {menusCount} menu{menusCount > 1 ? 's' : ''} !
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
