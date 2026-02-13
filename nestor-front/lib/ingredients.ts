import { Ingredient } from '@/types';

export const AVAILABLE_INGREDIENTS: Ingredient[] = [
  // Fromages
  { id: 'mozzarella', name: 'Mozzarella', price: 1.5, category: 'cheese' },
  { id: 'parmesan', name: 'Parmesan', price: 1.5, category: 'cheese' },
  { id: 'gorgonzola', name: 'Gorgonzola', price: 2.0, category: 'cheese' },
  { id: 'chevre', name: 'Chèvre', price: 2.0, category: 'cheese' },
  { id: 'ricotta', name: 'Ricotta', price: 1.5, category: 'cheese' },
  
  // Viandes
  { id: 'pepperoni', name: 'Pepperoni', price: 2.5, category: 'meat' },
  { id: 'jambon', name: 'Jambon', price: 2.0, category: 'meat' },
  { id: 'chorizo', name: 'Chorizo', price: 2.5, category: 'meat' },
  { id: 'poulet', name: 'Poulet', price: 2.5, category: 'meat' },
  { id: 'bacon', name: 'Bacon', price: 2.0, category: 'meat' },
  { id: 'merguez', name: 'Merguez', price: 2.5, category: 'meat' },
  { id: 'boeuf', name: 'Boeuf haché', price: 2.5, category: 'meat' },
  
  // Légumes
  { id: 'tomate', name: 'Tomates fraîches', price: 1.0, category: 'vegetable' },
  { id: 'champignon', name: 'Champignons', price: 1.5, category: 'vegetable' },
  { id: 'poivron', name: 'Poivrons', price: 1.5, category: 'vegetable' },
  { id: 'oignon', name: 'Oignons', price: 1.0, category: 'vegetable' },
  { id: 'olive', name: 'Olives', price: 1.5, category: 'vegetable' },
  { id: 'roquette', name: 'Roquette', price: 1.5, category: 'vegetable' },
  { id: 'artichaut', name: 'Artichauts', price: 2.0, category: 'vegetable' },
  { id: 'aubergine', name: 'Aubergines', price: 1.5, category: 'vegetable' },
  { id: 'courgette', name: 'Courgettes', price: 1.5, category: 'vegetable' },
  { id: 'mais', name: 'Maïs', price: 1.0, category: 'vegetable' },
  { id: 'piment', name: 'Piments', price: 1.0, category: 'vegetable' },
  
  // Sauces et bases
  { id: 'sauce-tomate', name: 'Sauce tomate', price: 0, category: 'sauce' },
  { id: 'creme', name: 'Crème fraîche', price: 1.0, category: 'sauce' },
  { id: 'pesto', name: 'Pesto', price: 1.5, category: 'sauce' },
  { id: 'basilic', name: 'Basilic frais', price: 1.0, category: 'base' },
  { id: 'origan', name: 'Origan', price: 0.5, category: 'base' },
];

export const INGREDIENT_CATEGORIES = {
  cheese: { name: 'Fromages', icon: '🧀', color: 'yellow' },
  meat: { name: 'Viandes', icon: '🥓', color: 'red' },
  vegetable: { name: 'Légumes', icon: '🥬', color: 'green' },
  sauce: { name: 'Sauces', icon: '🍅', color: 'orange' },
  base: { name: 'Aromates', icon: '🌿', color: 'teal' },
};
