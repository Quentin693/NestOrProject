import { Pizza, Drink, Dessert, Order } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Pizzas
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

// Drinks
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

// Desserts
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

// Orders
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
