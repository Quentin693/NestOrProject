# Nest-or Front - Pizzeria Italienne 🍕

Application frontend Next.js 15 pour la commande de pizzas, boissons et desserts.

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Configuration

Créez un fichier `.env.local` :

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Lancement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🎨 Fonctionnalités

- ✅ **Hero Section** avec design premium inspiré de Deliveroo/Uber Eats
- ✅ **Catalogue de produits** : Pizzas, Boissons, Desserts
- ✅ **Panier avec Drawer** : Design moderne avec animations fluides
- ✅ **Gestion du panier** : Ajout, suppression, modification des quantités
- ✅ **Persistance** : Panier sauvegardé dans localStorage
- ✅ **Responsive** : Design optimisé mobile-first
- ✅ **Connexion API** : Communication avec le backend NestJS

## 🛠 Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Icônes** : Lucide React
- **State Management** : React Context API

## 📁 Structure du projet

```
nestor-front/
├── app/
│   ├── layout.tsx        # Layout principal avec CartProvider
│   ├── page.tsx          # Page d'accueil
│   └── globals.css       # Styles globaux
├── components/
│   ├── Hero.tsx          # Section hero
│   ├── Header.tsx        # Header avec bouton panier
│   ├── CartDrawer.tsx    # Drawer du panier
│   ├── PizzaCard.tsx     # Carte produit pizza
│   ├── DrinkCard.tsx     # Carte produit boisson
│   └── DessertCard.tsx   # Carte produit dessert
├── contexts/
│   └── CartContext.tsx   # Context pour la gestion du panier
├── lib/
│   └── api.ts           # Fonctions API
├── types/
│   └── index.ts         # Types TypeScript
└── public/              # Assets statiques
```

## 🎨 Palette de couleurs

- **Rouge primaire** : `#c72027`
- **Rouge foncé** : `#a01a20`
- **Jaune** : `#fef08a`
- **Bleu** : `#2563eb` (boissons)
- **Rose** : `#db2777` (desserts)

## 🔗 Backend

Le frontend communique avec l'API NestJS sur `http://localhost:3001`

Endpoints utilisés :
- `GET /pizzas` - Liste des pizzas
- `GET /drinks` - Liste des boissons
- `GET /desserts` - Liste des desserts
- `POST /orders` - Création d'une commande

## 📝 TODO

- [ ] Implémenter la création de commande complète
- [ ] Ajouter une page de checkout
- [ ] Ajouter l'authentification utilisateur
- [ ] Ajouter le suivi de commande
- [ ] Tests unitaires et e2e

## 📄 Licence

© 2026 Nest-or - Tous droits réservés
