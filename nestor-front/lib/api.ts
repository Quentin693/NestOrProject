import { Pizza, Drink, Dessert, Order } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ============================================
// PIZZAS
// ============================================

export async function getPizzas(): Promise<Pizza[]> {
  try {
    const res = await fetch(`${API_URL}/pizzas`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch pizzas');
    return res.json();
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    return [];
  }
}

export async function getPizza(id: string): Promise<Pizza | null> {
  try {
    const res = await fetch(`${API_URL}/pizzas/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch pizza');
    return res.json();
  } catch (error) {
    console.error('Error fetching pizza:', error);
    return null;
  }
}

export async function searchPizzas(maxPrice?: number, ingredient?: string): Promise<Pizza[]> {
  try {
    const params = new URLSearchParams();
    if (maxPrice) params.append('maxPrice', maxPrice.toString());
    if (ingredient) params.append('ingredient', ingredient);
    
    const res = await fetch(`${API_URL}/pizzas/search?${params.toString()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to search pizzas');
    return res.json();
  } catch (error) {
    console.error('Error searching pizzas:', error);
    return [];
  }
}

export async function createPizza(data: Omit<Pizza, 'id'>): Promise<Pizza | null> {
  try {
    const res = await fetch(`${API_URL}/pizzas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create pizza');
    return res.json();
  } catch (error) {
    console.error('Error creating pizza:', error);
    return null;
  }
}

export async function updatePizza(id: string, data: Partial<Pizza>): Promise<Pizza | null> {
  try {
    const res = await fetch(`${API_URL}/pizzas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update pizza');
    return res.json();
  } catch (error) {
    console.error('Error updating pizza:', error);
    return null;
  }
}

export async function deletePizza(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/pizzas/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (error) {
    console.error('Error deleting pizza:', error);
    return false;
  }
}

// ============================================
// DRINKS
// ============================================

export async function getDrinks(): Promise<Drink[]> {
  try {
    const res = await fetch(`${API_URL}/drinks`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch drinks');
    return res.json();
  } catch (error) {
    console.error('Error fetching drinks:', error);
    return [];
  }
}

export async function getDrink(id: number): Promise<Drink | null> {
  try {
    const res = await fetch(`${API_URL}/drinks/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch drink');
    return res.json();
  } catch (error) {
    console.error('Error fetching drink:', error);
    return null;
  }
}

export async function createDrink(data: Omit<Drink, 'id'>): Promise<Drink | null> {
  try {
    const res = await fetch(`${API_URL}/drinks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create drink');
    return res.json();
  } catch (error) {
    console.error('Error creating drink:', error);
    return null;
  }
}

export async function updateDrink(id: number, data: Partial<Drink>): Promise<Drink | null> {
  try {
    const res = await fetch(`${API_URL}/drinks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update drink');
    return res.json();
  } catch (error) {
    console.error('Error updating drink:', error);
    return null;
  }
}

export async function deleteDrink(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/drinks/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (error) {
    console.error('Error deleting drink:', error);
    return false;
  }
}

// ============================================
// DESSERTS
// ============================================

export async function getDesserts(): Promise<Dessert[]> {
  try {
    const res = await fetch(`${API_URL}/desserts`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch desserts');
    return res.json();
  } catch (error) {
    console.error('Error fetching desserts:', error);
    return [];
  }
}

export async function getDessert(id: number): Promise<Dessert | null> {
  try {
    const res = await fetch(`${API_URL}/desserts/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch dessert');
    return res.json();
  } catch (error) {
    console.error('Error fetching dessert:', error);
    return null;
  }
}

export async function createDessert(data: Omit<Dessert, 'id'>): Promise<Dessert | null> {
  try {
    const res = await fetch(`${API_URL}/desserts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create dessert');
    return res.json();
  } catch (error) {
    console.error('Error creating dessert:', error);
    return null;
  }
}

export async function updateDessert(id: number, data: Partial<Dessert>): Promise<Dessert | null> {
  try {
    const res = await fetch(`${API_URL}/desserts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update dessert');
    return res.json();
  } catch (error) {
    console.error('Error updating dessert:', error);
    return null;
  }
}

export async function deleteDessert(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/desserts/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (error) {
    console.error('Error deleting dessert:', error);
    return false;
  }
}

// ============================================
// ORDERS
// ============================================

export async function getOrders(processed?: boolean): Promise<Order[]> {
  try {
    const params = processed !== undefined ? `?processed=${processed}` : '';
    const res = await fetch(`${API_URL}/orders${params}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function getOrder(id: number): Promise<Order | null> {
  try {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch order');
    return res.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export async function createOrder(pizzas: number[], drinks: number[], desserts: number[]): Promise<Order | null> {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pizzas, drinks, desserts }),
    });
    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

export async function updateOrder(id: number, data: { pizzas?: number[], drinks?: number[], desserts?: number[] }): Promise<Order | null> {
  try {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update order');
    return res.json();
  } catch (error) {
    console.error('Error updating order:', error);
    return null;
  }
}

export async function deleteOrder(id: number): Promise<{ message: string } | null> {
  try {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete order');
    return res.json();
  } catch (error) {
    console.error('Error deleting order:', error);
    return null;
  }
}

export async function markOrderAsProcessed(id: number): Promise<Order | null> {
  try {
    const res = await fetch(`${API_URL}/orders/${id}/processed`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Failed to mark order as processed');
    return res.json();
  } catch (error) {
    console.error('Error marking order as processed:', error);
    return null;
  }
}

export async function updateOrderField(id: number, field: string, value: string): Promise<Order | null> {
  try {
    const res = await fetch(`${API_URL}/orders/${id}?field=${field}&value=${value}`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Failed to update order field');
    return res.json();
  } catch (error) {
    console.error('Error updating order field:', error);
    return null;
  }
}

// ============================================
// MENU
// ============================================

export async function getMenu(): Promise<any> {
  try {
    const res = await fetch(`${API_URL}/menu`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch menu');
    return res.json();
  } catch (error) {
    console.error('Error fetching menu:', error);
    return null;
  }
}

export async function getMenuByCategory(category: 'pizza' | 'drink' | 'dessert'): Promise<any> {
  try {
    const res = await fetch(`${API_URL}/menu/${category}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch menu category');
    return res.json();
  } catch (error) {
    console.error('Error fetching menu category:', error);
    return null;
  }
}
