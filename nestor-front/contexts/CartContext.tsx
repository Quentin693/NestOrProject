'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Pizza, Drink, Dessert, PizzaCustomization } from '@/types';
import { calculateTotalWithMenus, detectMenus } from '@/lib/menuLogic';

interface CartContextType {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  menuDiscount: number;
  menusCount: number;
  subtotal: number;
  addPizza: (pizzaId: number) => void;
  addCustomPizza: (pizzaId: number, customization: PizzaCustomization, finalPrice: number) => void;
  addDrink: (drinkId: number) => void;
  addDessert: (dessertId: number) => void;
  removeItem: (type: 'pizza' | 'drink' | 'dessert', id: number, customization?: PizzaCustomization) => void;
  updateQuantity: (type: 'pizza' | 'drink' | 'dessert', id: number, quantity: number, customization?: PizzaCustomization) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  // Fonctions pour stocker les données des produits
  setPizzas: (pizzas: Pizza[]) => void;
  setDrinks: (drinks: Drink[]) => void;
  setDesserts: (desserts: Dessert[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Stocker les données des produits pour pouvoir les retrouver
  const [pizzas, setPizzasData] = useState<Pizza[]>([]);
  const [drinks, setDrinksData] = useState<Drink[]>([]);
  const [desserts, setDessertsData] = useState<Dessert[]>([]);

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage:', e);
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, mounted]);

  const setPizzas = (data: Pizza[]) => setPizzasData(data);
  const setDrinks = (data: Drink[]) => setDrinksData(data);
  const setDesserts = (data: Dessert[]) => setDessertsData(data);

  const addPizza = (pizzaId: number) => {
    const pizza = pizzas.find(p => p.id === pizzaId.toString());
    if (!pizza || !pizza.price) return;

    setItems(prev => {
      const existing = prev.find(item => 
        item.type === 'pizza' && 
        item.id === pizzaId && 
        !item.customization
      );
      if (existing) {
        return prev.map(item =>
          item.type === 'pizza' && item.id === pizzaId && !item.customization
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { type: 'pizza', id: pizzaId, name: pizza.name, price: pizza.price, quantity: 1 }];
    });
  };

  const addCustomPizza = (pizzaId: number, customization: PizzaCustomization, finalPrice: number) => {
    const pizza = pizzas.find(p => p.id === pizzaId.toString());
    if (!pizza) return;

    const customName = pizza.name + ' (personnalisée)';
    
    setItems(prev => {
      // Les pizzas personnalisées ne sont jamais groupées, chacune est unique
      return [...prev, { 
        type: 'pizza', 
        id: pizzaId, 
        name: customName, 
        price: finalPrice, 
        quantity: 1,
        customization
      }];
    });
  };

  const addDrink = (drinkId: number) => {
    const drink = drinks.find(d => d.id === drinkId);
    if (!drink || !drink.available) return;

    setItems(prev => {
      const existing = prev.find(item => item.type === 'drink' && item.id === drinkId);
      if (existing) {
        return prev.map(item =>
          item.type === 'drink' && item.id === drinkId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        type: 'drink', 
        id: drinkId, 
        name: drink.name, 
        price: drink.price, 
        quantity: 1,
        withAlcohol: drink.withAlcohol // Important pour la logique des menus
      }];
    });
  };

  const addDessert = (dessertId: number) => {
    const dessert = desserts.find(d => d.id === dessertId);
    if (!dessert || !dessert.available) return;

    setItems(prev => {
      const existing = prev.find(item => item.type === 'dessert' && item.id === dessertId);
      if (existing) {
        return prev.map(item =>
          item.type === 'dessert' && item.id === dessertId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { type: 'dessert', id: dessertId, name: dessert.name, price: dessert.price, quantity: 1 }];
    });
  };

  const removeItem = (type: 'pizza' | 'drink' | 'dessert', id: number, customization?: PizzaCustomization) => {
    setItems(prev => prev.filter(item => {
      if (item.type !== type || item.id !== id) return true;
      // Si on cherche une pizza personnalisée, comparer les customizations
      if (customization && item.customization) {
        return JSON.stringify(item.customization) !== JSON.stringify(customization);
      }
      // Si on cherche une pizza normale, exclure celles avec customization
      if (!customization && item.customization) return true;
      return false;
    }));
  };

  const updateQuantity = (type: 'pizza' | 'drink' | 'dessert', id: number, quantity: number, customization?: PizzaCustomization) => {
    if (quantity <= 0) {
      removeItem(type, id, customization);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        if (item.type !== type || item.id !== id) return item;
        // Vérifier la correspondance de customization
        if (customization && item.customization) {
          if (JSON.stringify(item.customization) === JSON.stringify(customization)) {
            return { ...item, quantity };
          }
        } else if (!customization && !item.customization) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calcul avec la logique des menus
  const { subtotal, menuDiscount, total, menusCount } = calculateTotalWithMenus(items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice: total,
        subtotal,
        menuDiscount,
        menusCount,
        totalItems,
        addPizza,
        addCustomPizza,
        addDrink,
        addDessert,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        setPizzas,
        setDrinks,
        setDesserts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
