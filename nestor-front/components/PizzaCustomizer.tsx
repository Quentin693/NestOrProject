'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { Pizza, Ingredient, PizzaCustomization } from '@/types';
import { AVAILABLE_INGREDIENTS, INGREDIENT_CATEGORIES } from '@/lib/ingredients';
import { useCart } from '@/contexts/CartContext';

interface PizzaCustomizerProps {
  pizza: Pizza;
  isOpen: boolean;
  onClose: () => void;
}

export default function PizzaCustomizer({ pizza, isOpen, onClose }: PizzaCustomizerProps) {
  const { addCustomPizza } = useCart();
  const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);

  const basePrice = pizza.price || 0;
  const extraPrice = addedIngredients.reduce((sum, ing) => sum + ing.price, 0);
  const totalPrice = basePrice + extraPrice;

  const originalIngredients = pizza.ingredients || [];

  // Bloquer le scroll quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isIngredientAdded = (ingredientId: string) => {
    return addedIngredients.some(ing => ing.id === ingredientId);
  };

  const isIngredientRemoved = (ingredientName: string) => {
    return removedIngredients.includes(ingredientName);
  };

  const toggleAddIngredient = (ingredient: Ingredient) => {
    if (isIngredientAdded(ingredient.id)) {
      setAddedIngredients(addedIngredients.filter(ing => ing.id !== ingredient.id));
    } else {
      setAddedIngredients([...addedIngredients, ingredient]);
    }
  };

  const toggleRemoveIngredient = (ingredientName: string) => {
    if (isIngredientRemoved(ingredientName)) {
      setRemovedIngredients(removedIngredients.filter(name => name !== ingredientName));
    } else {
      setRemovedIngredients([...removedIngredients, ingredientName]);
    }
  };

  const handleAddToCart = () => {
    const customization: PizzaCustomization = {
      addedIngredients,
      removedIngredients,
      extraPrice,
    };
    addCustomPizza(parseInt(pizza.id), customization, totalPrice);
    onClose();
    // Réinitialiser les sélections
    setAddedIngredients([]);
    setRemovedIngredients([]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-[#c72027] text-white p-6 flex items-center justify-between rounded-t-2xl z-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-black">{pizza.name}</h2>
              <p className="text-white/90 text-sm md:text-base">Personnalisez votre pizza</p>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Ingrédients de base */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-stone-800 mb-4">
                Ingrédients de base
              </h3>
              <div className="flex flex-wrap gap-2">
                {originalIngredients.map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => toggleRemoveIngredient(ingredient)}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      isIngredientRemoved(ingredient)
                        ? 'bg-red-100 border-red-500 text-red-700 line-through'
                        : 'bg-green-50 border-green-500 text-green-700'
                    }`}
                  >
                    {isIngredientRemoved(ingredient) ? (
                      <span className="flex items-center gap-2">
                        <X className="w-4 h-4" />
                        {ingredient}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        {ingredient}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-stone-500 mt-2">
                Cliquez pour retirer un ingrédient
              </p>
            </div>

            {/* Ajouter des ingrédients */}
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">
                Ajouter des ingrédients
              </h3>

              {Object.entries(INGREDIENT_CATEGORIES).map(([category, info]) => {
                const categoryIngredients = AVAILABLE_INGREDIENTS.filter(
                  ing => ing.category === category
                );

                return (
                  <div key={category} className="mb-6">
                    <h4 className="text-lg font-semibold text-stone-700 mb-3 flex items-center gap-2">
                      <span className="text-2xl">{info.icon}</span>
                      {info.name}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {categoryIngredients.map((ingredient) => (
                        <button
                          key={ingredient.id}
                          onClick={() => toggleAddIngredient(ingredient)}
                          className={`p-3 rounded-xl border-2 transition-all text-left ${
                            isIngredientAdded(ingredient.id)
                              ? 'bg-[#c72027] border-[#c72027] text-white shadow-lg scale-105'
                              : 'bg-white border-stone-200 text-stone-700 hover:border-[#c72027] hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">
                                {ingredient.name}
                              </p>
                              <p className={`text-xs font-bold ${
                                isIngredientAdded(ingredient.id) ? 'text-white/90' : 'text-[#c72027]'
                              }`}>
                                +{ingredient.price.toFixed(2)} €
                              </p>
                            </div>
                            {isIngredientAdded(ingredient.id) ? (
                              <Check className="w-5 h-5 flex-shrink-0" />
                            ) : (
                              <Plus className="w-5 h-5 flex-shrink-0 text-stone-400" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-stone-50 p-6 border-t border-stone-200 rounded-b-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-stone-600">Prix de base</p>
                <p className="text-lg font-bold text-stone-800">{basePrice.toFixed(2)} €</p>
              </div>
              {extraPrice > 0 && (
                <div>
                  <p className="text-sm text-stone-600">Suppléments</p>
                  <p className="text-lg font-bold text-[#c72027]">+{extraPrice.toFixed(2)} €</p>
                </div>
              )}
              <div>
                <p className="text-sm text-stone-600">Total</p>
                <p className="text-2xl font-black text-[#c72027]">{totalPrice.toFixed(2)} €</p>
              </div>
            </div>

            {(addedIngredients.length > 0 || removedIngredients.length > 0) && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-blue-900 mb-1">Modifications :</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {removedIngredients.length > 0 && (
                    <span className="text-red-700">
                      -{removedIngredients.length} ingrédient{removedIngredients.length > 1 ? 's' : ''}
                    </span>
                  )}
                  {addedIngredients.length > 0 && (
                    <span className="text-green-700">
                      +{addedIngredients.length} ingrédient{addedIngredients.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="w-full bg-[#c72027] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#a01a20] transition-colors shadow-lg hover:shadow-xl"
            >
              Ajouter au panier • {totalPrice.toFixed(2)} €
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
