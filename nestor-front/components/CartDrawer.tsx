'use client';

import { useCart } from '@/contexts/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2, Tag, Pizza as PizzaIcon, Wine, Cake } from 'lucide-react';
import { useEffect } from 'react';
import { detectMenus } from '@/lib/menuLogic';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, totalPrice, subtotal, menuDiscount, menusCount, totalItems, isCartOpen, setIsCartOpen, updateQuantity, removeItem } = useCart();
  
  const { menus, remainingItems } = detectMenus(items);

  // Bloquer le scroll quand le drawer est ouvert
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-[#c72027] text-white px-6 py-5 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">Mon Panier</h2>
                <p className="text-white/80 text-sm">{totalItems} article{totalItems > 1 ? 's' : ''}</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-20 h-20 text-stone-300 mb-4" />
                <p className="text-xl font-semibold text-stone-800 mb-2">Votre panier est vide</p>
                <p className="text-stone-500">Ajoutez des produits pour commencer</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Affichage des menus détectés */}
                {menus.map((menu, index) => (
                  <div
                    key={`menu-${index}`}
                    className="bg-gradient-to-br from-[#fef08a] to-[#fde047] rounded-xl p-4 border-2 border-[#c72027] shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-[#c72027]" />
                        <h3 className="font-black text-[#c72027] text-lg">Menu #{index + 1}</h3>
                        <span className="bg-[#c72027] text-white text-xs font-bold px-2 py-1 rounded-full">
                          -10%
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-stone-600 line-through">{menu.originalPrice.toFixed(2)} €</p>
                        <p className="text-[#c72027] font-black text-xl">{menu.discountedPrice.toFixed(2)} €</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 bg-white/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <PizzaIcon className="w-4 h-4 text-[#c72027]" />
                        <span className="font-semibold">{menu.pizza.name}</span>
                        <span className="text-stone-500 ml-auto">{menu.pizza.price.toFixed(2)} €</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Wine className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">{menu.drink.name}</span>
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Sans alcool</span>
                        <span className="text-stone-500 ml-auto">{menu.drink.price.toFixed(2)} €</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Cake className="w-4 h-4 text-pink-600" />
                        <span className="font-semibold">{menu.dessert.name}</span>
                        <span className="text-stone-500 ml-auto">{menu.dessert.price.toFixed(2)} €</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-[#c72027] font-bold mt-2 text-center">
                      Économie : {menu.discount.toFixed(2)} €
                    </p>
                  </div>
                ))}
                
                {/* Affichage des articles restants (non inclus dans un menu) */}
                {remainingItems.map((item, index) => (
                  <div
                    key={`${item.type}-${item.id}-${index}`}
                    className="bg-stone-50 rounded-xl p-4 border border-stone-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-stone-800 mb-1">{item.name}</h3>
                        
                        {/* Badges et personnalisations */}
                        <div className="space-y-1 mb-2">
                          {item.withAlcohol && (
                            <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full inline-block">
                              Avec alcool
                            </span>
                          )}
                          
                          {item.customization && (
                            <div className="text-xs space-y-1 mt-2">
                              {item.customization.removedIngredients.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {item.customization.removedIngredients.map((ing) => (
                                    <span key={ing} className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                      Sans {ing}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {item.customization.addedIngredients.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {item.customization.addedIngredients.map((ing) => (
                                    <span key={ing.id} className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                      +{ing.name}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <p className="text-[#c72027] font-bold text-lg">{item.price.toFixed(2)} €</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.type, item.id, item.customization)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Quantité */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-600 font-medium">Quantité</span>
                      <div className="flex items-center gap-2 bg-white border-2 border-stone-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.type, item.id, item.quantity - 1, item.customization)}
                          className="p-2 hover:bg-stone-100 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-stone-600" />
                        </button>
                        <span className="font-bold text-stone-800 min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.type, item.id, item.quantity + 1, item.customization)}
                          className="p-2 hover:bg-stone-100 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-stone-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 px-6 py-5 bg-stone-50">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-stone-600">
                  <span>Sous-total</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} €</span>
                </div>
                
                {menusCount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span className="font-semibold">Réduction Menu{menusCount > 1 ? 's' : ''} (-10%)</span>
                    </div>
                    <span className="font-bold">-{menuDiscount.toFixed(2)} €</span>
                  </div>
                )}
                
                <div className="flex justify-between text-stone-600">
                  <span>Livraison</span>
                  <span className="font-semibold text-green-600">Gratuite</span>
                </div>
                <div className="h-px bg-stone-300" />
                <div className="flex justify-between text-xl font-bold text-stone-800">
                  <span>Total</span>
                  <span className="text-[#c72027]">{totalPrice.toFixed(2)} €</span>
                </div>
                
                {menusCount > 0 && (
                  <p className="text-xs text-center text-green-600 font-semibold bg-green-50 py-2 rounded-lg">
                    🎉 Vous économisez {menuDiscount.toFixed(2)} € avec {menusCount} menu{menusCount > 1 ? 's' : ''} !
                  </p>
                )}
              </div>
              
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="block w-full bg-[#c72027] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#a01a20] transition-colors shadow-lg hover:shadow-xl text-center"
              >
                Commander maintenant
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
