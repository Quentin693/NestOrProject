'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import {
  getPizzas, createPizza, updatePizza, deletePizza,
  getDrinks, createDrink, updateDrink, deleteDrink,
  getDesserts, createDessert, updateDessert, deleteDessert,
  getOrders, markOrderAsProcessed, deleteOrder
} from '@/lib/api';
import { Pizza, Drink, Dessert, Order } from '@/types';

type Tab = 'pizzas' | 'drinks' | 'desserts' | 'orders';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('pizzas');
  const [loading, setLoading] = useState(false);
  
  // Data
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Form data
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'pizzas') {
        const data = await getPizzas();
        setPizzas(data);
      } else if (activeTab === 'drinks') {
        const data = await getDrinks();
        setDrinks(data);
      } else if (activeTab === 'desserts') {
        const data = await getDesserts();
        setDesserts(data);
      } else if (activeTab === 'orders') {
        const data = await getOrders();
        setOrders(data);
      }
    } catch (error) {
      console.error('Erreur de chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({});
    setShowModal(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === 'pizzas') {
        if (editingItem) {
          await updatePizza(editingItem.id, formData);
        } else {
          await createPizza(formData);
        }
      } else if (activeTab === 'drinks') {
        if (editingItem) {
          await updateDrink(editingItem.id, formData);
        } else {
          await createDrink(formData);
        }
      } else if (activeTab === 'desserts') {
        if (editingItem) {
          await updateDessert(editingItem.id, formData);
        } else {
          await createDessert(formData);
        }
      }

      setShowModal(false);
      loadData();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;

    setLoading(true);
    try {
      if (activeTab === 'pizzas') {
        await deletePizza(id as string);
      } else if (activeTab === 'drinks') {
        await deleteDrink(id as number);
      } else if (activeTab === 'desserts') {
        await deleteDessert(id as number);
      } else if (activeTab === 'orders') {
        await deleteOrder(id as number);
      }
      loadData();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsProcessed = async (id: number) => {
    setLoading(true);
    try {
      await markOrderAsProcessed(id);
      loadData();
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 pt-8 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Administration</h1>
          <p className="text-stone-400">Gérez vos pizzas, boissons, desserts et commandes</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'pizzas', label: '🍕 Pizzas', count: pizzas.length },
            { id: 'drinks', label: '🥤 Boissons', count: drinks.length },
            { id: 'desserts', label: '🍰 Desserts', count: desserts.length },
            { id: 'orders', label: '📦 Commandes', count: orders.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#c72027] text-white shadow-lg'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>

          {activeTab !== 'orders' && (
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 px-6 py-3 bg-[#c72027] hover:bg-[#a01a20] text-white rounded-lg font-bold transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Ajouter
            </button>
          )}
        </div>

        {/* Content */}
        <div className="bg-stone-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-stone-700">
          {loading && !showModal ? (
            <div className="text-center py-20">
              <RefreshCw className="w-12 h-12 text-stone-400 animate-spin mx-auto mb-4" />
              <p className="text-stone-400">Chargement...</p>
            </div>
          ) : (
            <>
              {/* Pizzas */}
              {activeTab === 'pizzas' && (
                <div className="space-y-4">
                  {pizzas.map((pizza) => (
                    <div
                      key={pizza.id}
                      className="bg-stone-900/50 rounded-xl p-6 border border-stone-700 hover:border-[#c72027] transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{pizza.name}</h3>
                          <p className="text-stone-400 text-sm mb-2">
                            {pizza.ingredients?.join(', ')}
                          </p>
                          <p className="text-[#c72027] font-bold text-lg">{pizza.price} €</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(pizza)}
                            className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(pizza.id)}
                            className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Drinks */}
              {activeTab === 'drinks' && (
                <div className="space-y-4">
                  {drinks.map((drink) => (
                    <div
                      key={drink.id}
                      className="bg-stone-900/50 rounded-xl p-6 border border-stone-700 hover:border-blue-600 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{drink.name}</h3>
                          <div className="flex gap-3 items-center mb-2">
                            <span className="text-stone-400 text-sm">{drink.size}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              drink.withAlcohol 
                                ? 'bg-purple-900/30 text-purple-400' 
                                : 'bg-green-900/30 text-green-400'
                            }`}>
                              {drink.withAlcohol ? 'Avec alcool' : 'Sans alcool'}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              drink.available 
                                ? 'bg-green-900/30 text-green-400' 
                                : 'bg-red-900/30 text-red-400'
                            }`}>
                              {drink.available ? 'Disponible' : 'Indisponible'}
                            </span>
                          </div>
                          <p className="text-blue-500 font-bold text-lg">{drink.price} €</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(drink)}
                            className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(drink.id)}
                            className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Desserts */}
              {activeTab === 'desserts' && (
                <div className="space-y-4">
                  {desserts.map((dessert) => (
                    <div
                      key={dessert.id}
                      className="bg-stone-900/50 rounded-xl p-6 border border-stone-700 hover:border-pink-600 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{dessert.name}</h3>
                          <div className="flex gap-3 items-center mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              dessert.available 
                                ? 'bg-green-900/30 text-green-400' 
                                : 'bg-red-900/30 text-red-400'
                            }`}>
                              {dessert.available ? 'Disponible' : 'Indisponible'}
                            </span>
                          </div>
                          <p className="text-pink-500 font-bold text-lg">{dessert.price} €</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(dessert)}
                            className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(dessert.id)}
                            className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Orders */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className={`rounded-xl p-6 border transition-colors ${
                        order.processed
                          ? 'bg-green-900/20 border-green-700'
                          : 'bg-stone-900/50 border-stone-700 hover:border-yellow-600'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-bold text-white">Commande #{order.id}</h3>
                            {order.processed ? (
                              <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm font-semibold flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                Traitée
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-sm font-semibold flex items-center gap-1">
                                <XCircle className="w-4 h-4" />
                                En attente
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-1 text-sm text-stone-400 mb-3">
                            <p>🍕 Pizzas: {order.pizzas?.length || 0}</p>
                            <p>🥤 Boissons: {order.drinks?.length || 0}</p>
                            <p>🍰 Desserts: {order.desserts?.length || 0}</p>
                            <p className="text-xs text-stone-500">
                              {new Date(order.createdAt).toLocaleString('fr-FR')}
                            </p>
                          </div>
                          
                          <p className="text-[#c72027] font-bold text-xl">{order.totalPrice} €</p>
                        </div>
                        
                        <div className="flex gap-2">
                          {!order.processed && (
                            <button
                              onClick={() => handleMarkAsProcessed(order.id)}
                              className="p-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                              title="Marquer comme traitée"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-stone-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingItem ? 'Modifier' : 'Ajouter'} {
                activeTab === 'pizzas' ? 'une pizza' :
                activeTab === 'drinks' ? 'une boisson' :
                'un dessert'
              }
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pizza Form */}
              {activeTab === 'pizzas' && (
                <>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-2">Nom *</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-white focus:border-[#c72027] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-2">
                      Ingrédients (séparés par des virgules) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ingredients?.join(', ') || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        ingredients: e.target.value.split(',').map(i => i.trim()) 
                      })}
                      className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-white focus:border-[#c72027] focus:outline-none"
                      placeholder="tomate, mozzarella, basilic"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-2">Prix (€) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-white focus:border-[#c72027] focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Drink Form */}
              {activeTab === 'drinks' && (
                <>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-2">Nom *</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-2">Taille *</label>
                    <input
                      type="text"
                      required
                      value={formData.size || ''}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-white focus:border-blue-600 focus:outline-none"
                      placeholder="33cl, 50cl, 1L..."
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-2">Prix (€) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.withAlcohol || false}
                        onChange={(e) => setFormData({ ...formData, withAlcohol: e.target.checked })}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-stone-300">Avec alcool</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.available !== false}
                        onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-stone-300">Disponible</span>
                    </label>
                  </div>
                </>
              )}

              {/* Dessert Form */}
              {activeTab === 'desserts' && (
                <>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-2">Nom *</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-white focus:border-pink-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-2">Prix (€) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-white focus:border-pink-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.available !== false}
                        onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-stone-300">Disponible</span>
                    </label>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-stone-700 hover:bg-stone-600 text-white rounded-lg font-bold transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#c72027] hover:bg-[#a01a20] text-white rounded-lg font-bold transition-colors disabled:opacity-50"
                >
                  {loading ? 'En cours...' : editingItem ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
