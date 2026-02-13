import { CartItem, Menu } from '@/types';

/**
 * Détecte automatiquement les menus dans le panier
 * Un menu = 1 pizza + 1 boisson SANS alcool + 1 dessert
 * Réduction de 10% sur le prix du menu
 */
export function detectMenus(items: CartItem[]): {
  menus: Menu[];
  remainingItems: CartItem[];
  totalDiscount: number;
} {
  const menus: Menu[] = [];
  const remainingItems: CartItem[] = [];

  // Séparer les items par type
  // Note: Les pizzas personnalisées ne sont pas éligibles aux menus
  const pizzas = items.filter(item => item.type === 'pizza' && !item.customization).flatMap(item => 
    Array(item.quantity).fill(null).map(() => ({ ...item, quantity: 1 }))
  );
  
  const drinksNoAlcohol = items.filter(item => 
    item.type === 'drink' && !item.withAlcohol
  ).flatMap(item => 
    Array(item.quantity).fill(null).map(() => ({ ...item, quantity: 1 }))
  );
  
  const drinksWithAlcohol = items.filter(item => 
    item.type === 'drink' && item.withAlcohol
  ).flatMap(item => 
    Array(item.quantity).fill(null).map(() => ({ ...item, quantity: 1 }))
  );
  
  const desserts = items.filter(item => item.type === 'dessert').flatMap(item => 
    Array(item.quantity).fill(null).map(() => ({ ...item, quantity: 1 }))
  );

  // Créer des menus tant qu'on a les 3 éléments
  const maxMenus = Math.min(pizzas.length, drinksNoAlcohol.length, desserts.length);
  
  for (let i = 0; i < maxMenus; i++) {
    const pizza = pizzas[i];
    const drink = drinksNoAlcohol[i];
    const dessert = desserts[i];
    
    const originalPrice = pizza.price + drink.price + dessert.price;
    const discount = originalPrice * 0.10; // 10% de réduction
    const discountedPrice = originalPrice - discount;
    
    menus.push({
      pizza,
      drink,
      dessert,
      originalPrice,
      discountedPrice,
      discount,
    });
  }

  // Regrouper les items restants
  const usedPizzas = maxMenus;
  const usedDrinks = maxMenus;
  const usedDesserts = maxMenus;

  // Ajouter les items restants (non utilisés dans les menus)
  const groupItems = (itemsArray: CartItem[], usedCount: number): CartItem[] => {
    const remaining = itemsArray.slice(usedCount);
    const grouped: Record<string, CartItem> = {};
    
    remaining.forEach(item => {
      const key = `${item.type}-${item.id}`;
      if (grouped[key]) {
        grouped[key].quantity += 1;
      } else {
        grouped[key] = { ...item };
      }
    });
    
    return Object.values(grouped);
  };

  remainingItems.push(
    ...groupItems(pizzas, usedPizzas),
    ...groupItems(drinksNoAlcohol, usedDrinks),
    ...groupItems(desserts, usedDesserts),
    ...drinksWithAlcohol.reduce((acc, item) => {
      const existing = acc.find(i => i.id === item.id && i.type === item.type);
      if (existing) {
        existing.quantity += 1;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, [] as CartItem[])
  );

  const totalDiscount = menus.reduce((sum, menu) => sum + menu.discount, 0);

  return { menus, remainingItems, totalDiscount };
}

/**
 * Calcule le prix total du panier avec les réductions de menu
 */
export function calculateTotalWithMenus(items: CartItem[]): {
  subtotal: number;
  menuDiscount: number;
  total: number;
  menusCount: number;
} {
  const { menus, remainingItems, totalDiscount } = detectMenus(items);
  
  const menusPrice = menus.reduce((sum, menu) => sum + menu.discountedPrice, 0);
  const remainingPrice = remainingItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const subtotal = menus.reduce((sum, menu) => sum + menu.originalPrice, 0) + remainingPrice;
  const total = menusPrice + remainingPrice;
  
  return {
    subtotal,
    menuDiscount: totalDiscount,
    total,
    menusCount: menus.length,
  };
}
