'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Copy, Check } from 'lucide-react';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  params?: string;
  body?: string;
}

interface EndpointCategory {
  name: string;
  icon: string;
  endpoints: Endpoint[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const categories: EndpointCategory[] = [
  {
    name: 'Pizzas',
    icon: '🍕',
    endpoints: [
      { method: 'GET', path: '/pizzas', description: 'Liste toutes les pizzas' },
      { method: 'GET', path: '/pizzas/:id', description: 'Détails d\'une pizza', params: 'id: string' },
      { method: 'GET', path: '/pizzas/search', description: 'Recherche par prix/ingrédient', params: 'maxPrice?: number, ingredient?: string' },
      { method: 'POST', path: '/pizzas', description: 'Créer une pizza', body: '{\n  "name": "string",\n  "ingredients": ["string"],\n  "price": number\n}' },
      { method: 'PUT', path: '/pizzas/:id', description: 'Modifier une pizza', params: 'id: string', body: '{\n  "name"?: "string",\n  "ingredients"?: ["string"],\n  "price"?: number\n}' },
      { method: 'DELETE', path: '/pizzas/:id', description: 'Supprimer une pizza', params: 'id: string' },
    ],
  },
  {
    name: 'Drinks',
    icon: '🥤',
    endpoints: [
      { method: 'GET', path: '/drinks', description: 'Liste toutes les boissons' },
      { method: 'GET', path: '/drinks/:id', description: 'Détails d\'une boisson', params: 'id: number' },
      { method: 'POST', path: '/drinks', description: 'Créer une boisson', body: '{\n  "name": "string",\n  "price": number,\n  "size": "string",\n  "withAlcohol": boolean,\n  "available": boolean\n}' },
      { method: 'PUT', path: '/drinks/:id', description: 'Modifier une boisson', params: 'id: number', body: '{\n  "name"?: "string",\n  "price"?: number,\n  "size"?: "string",\n  "withAlcohol"?: boolean,\n  "available"?: boolean\n}' },
      { method: 'DELETE', path: '/drinks/:id', description: 'Supprimer une boisson', params: 'id: number' },
    ],
  },
  {
    name: 'Desserts',
    icon: '🍰',
    endpoints: [
      { method: 'GET', path: '/desserts', description: 'Liste tous les desserts' },
      { method: 'GET', path: '/desserts/:id', description: 'Détails d\'un dessert', params: 'id: number' },
      { method: 'POST', path: '/desserts', description: 'Créer un dessert', body: '{\n  "name": "string",\n  "price": number,\n  "available": boolean\n}' },
      { method: 'PUT', path: '/desserts/:id', description: 'Modifier un dessert', params: 'id: number', body: '{\n  "name"?: "string",\n  "price"?: number,\n  "available"?: boolean\n}' },
      { method: 'DELETE', path: '/desserts/:id', description: 'Supprimer un dessert', params: 'id: number' },
    ],
  },
  {
    name: 'Orders',
    icon: '📦',
    endpoints: [
      { method: 'GET', path: '/orders', description: 'Liste des commandes', params: 'processed?: boolean' },
      { method: 'GET', path: '/orders/:id', description: 'Détails d\'une commande', params: 'id: number' },
      { method: 'POST', path: '/orders', description: 'Créer une commande', body: '{\n  "pizzas": [number],\n  "drinks": [number],\n  "desserts": [number]\n}' },
      { method: 'PUT', path: '/orders/:id', description: 'Modifier une commande', params: 'id: number', body: '{\n  "pizzas"?: [number],\n  "drinks"?: [number],\n  "desserts"?: [number]\n}' },
      { method: 'PATCH', path: '/orders/:id/processed', description: 'Marquer comme traitée', params: 'id: number' },
      { method: 'PATCH', path: '/orders/:id', description: 'Modifier un champ', params: 'id: number, field: string, value: string' },
      { method: 'DELETE', path: '/orders/:id', description: 'Supprimer une commande', params: 'id: number' },
    ],
  },
  {
    name: 'Menu',
    icon: '🍽️',
    endpoints: [
      { method: 'GET', path: '/menu', description: 'Menu complet avec prix calculés' },
      { method: 'GET', path: '/menu/:category', description: 'Menu par catégorie', params: 'category: "pizza" | "drink" | "dessert"' },
    ],
  },
];

const methodColors = {
  GET: 'bg-blue-500',
  POST: 'bg-green-500',
  PUT: 'bg-orange-500',
  PATCH: 'bg-purple-500',
  DELETE: 'bg-red-500',
};

export default function ApiExplorer() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Pizzas']));
  const [expandedEndpoints, setExpandedEndpoints] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleEndpoint = (key: string) => {
    const newExpanded = new Set(expandedEndpoints);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedEndpoints(newExpanded);
  };

  const testEndpoint = async (endpoint: Endpoint, categoryName: string) => {
    const key = `${categoryName}-${endpoint.method}-${endpoint.path}`;
    setLoading({ ...loading, [key]: true });

    try {
      let url = `${API_URL}${endpoint.path}`;
      
      // Pour les endpoints de test, on utilise des valeurs par défaut
      if (endpoint.path.includes(':id')) {
        // Pour orders, on utilise un ID qui existe probablement (le plus récent)
        if (endpoint.path.includes('/orders')) {
          url = url.replace(':id', '15');
        } else {
          url = url.replace(':id', '1');
        }
      }
      if (endpoint.path.includes(':category')) {
        url = url.replace(':category', 'pizza');
      }
      
      // Pour PATCH /orders/:id (avec query params), ajouter les params
      if (endpoint.method === 'PATCH' && endpoint.path === '/orders/:id' && endpoint.description === 'Modifier un champ') {
        url += '?field=processed&value=true';
      }

      const options: RequestInit = {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (endpoint.body && (endpoint.method === 'POST' || endpoint.method === 'PUT' || endpoint.method === 'PATCH')) {
        // Pour POST/PUT, on utilise un body d'exemple
        if (endpoint.path.includes('/pizzas')) {
          if (!endpoint.path.includes(':id')) {
            // POST pizza
            options.body = JSON.stringify({
              name: 'Pizza Test',
              ingredients: ['tomate', 'mozzarella'],
              price: 10,
            });
          } else if (endpoint.method === 'PUT') {
            // PUT pizza/:id
            options.body = JSON.stringify({
              name: 'Pizza Modifiée',
              price: 11,
            });
          }
        } else if (endpoint.path.includes('/orders')) {
          if (!endpoint.path.includes(':id')) {
            // POST order
            options.body = JSON.stringify({
              pizzas: [1],
              drinks: [1],
              desserts: [1],
            });
          } else if (endpoint.method === 'PUT') {
            // PUT order/:id
            options.body = JSON.stringify({
              pizzas: [1, 2],
              drinks: [1],
            });
          }
        } else if (endpoint.path.includes('/drinks') && endpoint.method === 'PUT') {
          options.body = JSON.stringify({
            name: 'Boisson Modifiée',
            price: 3,
          });
        } else if (endpoint.path.includes('/desserts') && endpoint.method === 'PUT') {
          options.body = JSON.stringify({
            name: 'Dessert Modifié',
            price: 5.5,
          });
        }
      }

      const response = await fetch(url, options);
      const data = await response.json();

      setResults({
        ...results,
        [key]: {
          status: response.status,
          statusText: response.statusText,
          data,
          timestamp: new Date().toLocaleTimeString('fr-FR'),
        },
      });
    } catch (error: any) {
      setResults({
        ...results,
        [key]: {
          error: error.message,
          timestamp: new Date().toLocaleTimeString('fr-FR'),
        },
      });
    } finally {
      setLoading({ ...loading, [key]: false });
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateCurlCommand = (endpoint: Endpoint) => {
    let url = `${API_URL}${endpoint.path}`;
    if (endpoint.path.includes(':id')) url = url.replace(':id', '1');
    if (endpoint.path.includes(':category')) url = url.replace(':category', 'pizza');

    let curl = `curl -X ${endpoint.method} "${url}"`;
    
    if (endpoint.body) {
      curl += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${endpoint.body}'`;
    }

    return curl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            API Explorer
          </h1>
          <p className="text-slate-400">
            Explorez et testez tous les endpoints disponibles • {API_URL}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4"
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="text-slate-400 text-sm">{cat.name}</div>
              <div className="text-white text-2xl font-bold">{cat.endpoints.length}</div>
            </div>
          ))}
        </div>

        {/* Endpoints */}
        <div className="space-y-4">
          {categories.map((category) => {
            const isExpanded = expandedCategories.has(category.name);
            
            return (
              <div
                key={category.name}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-xl font-bold text-white">{category.name}</h2>
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
                      {category.endpoints.length} endpoints
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="text-slate-400" />
                  ) : (
                    <ChevronRight className="text-slate-400" />
                  )}
                </button>

                {/* Endpoints List */}
                {isExpanded && (
                  <div className="border-t border-slate-700">
                    {category.endpoints.map((endpoint, idx) => {
                      const key = `${category.name}-${endpoint.method}-${endpoint.path}`;
                      const isEndpointExpanded = expandedEndpoints.has(key);
                      const result = results[key];
                      const isLoading = loading[key];

                      return (
                        <div
                          key={key}
                          className="border-b border-slate-700 last:border-b-0"
                        >
                          {/* Endpoint Header */}
                          <div className="px-6 py-4 hover:bg-slate-700/30 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span
                                    className={`${methodColors[endpoint.method]} text-white text-xs font-bold px-2 py-1 rounded`}
                                  >
                                    {endpoint.method}
                                  </span>
                                  <code className="text-slate-300 font-mono text-sm">
                                    {endpoint.path}
                                  </code>
                                </div>
                                <p className="text-slate-400 text-sm mb-2">
                                  {endpoint.description}
                                </p>
                                {endpoint.params && (
                                  <p className="text-slate-500 text-xs">
                                    Params: <code>{endpoint.params}</code>
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleEndpoint(key)}
                                  className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded transition-colors"
                                >
                                  {isEndpointExpanded ? 'Masquer' : 'Détails'}
                                </button>
                                <button
                                  onClick={() => testEndpoint(endpoint, category.name)}
                                  disabled={isLoading}
                                  className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm rounded transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Play size={14} />
                                  {isLoading ? 'Test...' : 'Tester'}
                                </button>
                              </div>
                            </div>

                            {/* Expanded Details */}
                            {isEndpointExpanded && (
                              <div className="mt-4 space-y-4">
                                {/* URL */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-slate-300 text-sm font-semibold">URL</h4>
                                    <button
                                      onClick={() =>
                                        copyToClipboard(
                                          `${API_URL}${endpoint.path}`,
                                          `url-${key}`
                                        )
                                      }
                                      className="text-slate-400 hover:text-white transition-colors"
                                    >
                                      {copied === `url-${key}` ? (
                                        <Check size={16} />
                                      ) : (
                                        <Copy size={16} />
                                      )}
                                    </button>
                                  </div>
                                  <code className="block bg-slate-900 text-emerald-400 px-4 py-2 rounded text-sm">
                                    {API_URL}
                                    {endpoint.path}
                                  </code>
                                </div>

                                {/* Body */}
                                {endpoint.body && (
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="text-slate-300 text-sm font-semibold">
                                        Body
                                      </h4>
                                      <button
                                        onClick={() =>
                                          copyToClipboard(endpoint.body!, `body-${key}`)
                                        }
                                        className="text-slate-400 hover:text-white transition-colors"
                                      >
                                        {copied === `body-${key}` ? (
                                          <Check size={16} />
                                        ) : (
                                          <Copy size={16} />
                                        )}
                                      </button>
                                    </div>
                                    <pre className="bg-slate-900 text-slate-300 px-4 py-2 rounded text-sm overflow-x-auto">
                                      {endpoint.body}
                                    </pre>
                                  </div>
                                )}

                                {/* cURL */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-slate-300 text-sm font-semibold">cURL</h4>
                                    <button
                                      onClick={() =>
                                        copyToClipboard(
                                          generateCurlCommand(endpoint),
                                          `curl-${key}`
                                        )
                                      }
                                      className="text-slate-400 hover:text-white transition-colors"
                                    >
                                      {copied === `curl-${key}` ? (
                                        <Check size={16} />
                                      ) : (
                                        <Copy size={16} />
                                      )}
                                    </button>
                                  </div>
                                  <pre className="bg-slate-900 text-blue-400 px-4 py-2 rounded text-sm overflow-x-auto">
                                    {generateCurlCommand(endpoint)}
                                  </pre>
                                </div>

                                {/* Result */}
                                {result && (
                                  <div>
                                    <h4 className="text-slate-300 text-sm font-semibold mb-2">
                                      Résultat • {result.timestamp}
                                    </h4>
                                    {result.error ? (
                                      <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-2 rounded text-sm">
                                        ❌ {result.error}
                                      </div>
                                    ) : (
                                      <div>
                                        <div className="flex items-center gap-2 mb-2">
                                          <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${
                                              result.status >= 200 && result.status < 300
                                                ? 'bg-green-900/30 text-green-400'
                                                : 'bg-red-900/30 text-red-400'
                                            }`}
                                          >
                                            {result.status} {result.statusText}
                                          </span>
                                        </div>
                                        <pre className="bg-slate-900 text-slate-300 px-4 py-2 rounded text-sm overflow-x-auto max-h-96">
                                          {JSON.stringify(result.data, null, 2)}
                                        </pre>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
