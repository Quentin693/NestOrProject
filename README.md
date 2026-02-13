# 🍕 Nest-or - Pizzeria Italienne

Application web complète de commande en ligne pour pizzeria, avec un design premium inspiré de Deliveroo et Uber Eats.

![Hero Section](nestor-front/public/image.png)

## 📸 Aperçu

- **Design moderne** avec hero section personnalisée
- **UI premium** style Deliveroo/Uber Eats
- **Panier avec drawer** fluide et animé
- **Responsive** mobile-first
- **Connexion API** temps réel

## 🏗 Architecture

```
NestOrProject/
├── nestor-app/      # Backend NestJS (API REST)
│   ├── src/
│   │   ├── pizzas/
│   │   ├── drinks/
│   │   ├── desserts/
│   │   └── orders/
│   └── Port: 3001
│
└── nestor-front/    # Frontend Next.js 15
    ├── app/         # Pages (App Router)
    ├── components/  # Composants React
    ├── contexts/    # Context API (panier)
    ├── lib/         # Fonctions utilitaires
    └── Port: 3000
```

## 🚀 Démarrage Rapide

### Installation

```bash
# Backend
cd nestor-app
npm install

# Frontend
cd nestor-front
npm install
```

### Démarrage

**Terminal 1 - Backend**
```bash
cd nestor-app
npm run start:dev
```
→ API disponible sur http://localhost:3001

**Terminal 2 - Frontend**
```bash
cd nestor-front
npm run dev
```
→ Application disponible sur http://localhost:3000

## ✨ Fonctionnalités

### Frontend (Next.js 15)

- ✅ **Hero Section** avec image personnalisée et animations
- ✅ **Catalogue de produits** 
  - Pizzas avec ingrédients
  - Boissons (avec/sans alcool)
  - Desserts
- ✅ **Panier intelligent**
  - Drawer coulissant
  - Ajout/Suppression de produits
  - Gestion des quantités
  - Calcul automatique du total
  - Persistance localStorage
- ✅ **Header sticky** avec compteur de panier en temps réel
- ✅ **Design responsive** optimisé mobile
- ✅ **Animations fluides** et transitions
- ✅ **Images dynamiques** avec Unsplash

### Backend (NestJS)

- ✅ **API REST complète**
- ✅ **CRUD pour tous les produits** (pizzas, boissons, desserts)
- ✅ **Gestion des commandes**
- ✅ **Validation des données** (class-validator)
- ✅ **CORS configuré** pour le frontend
- ✅ **Recherche et filtres** (pizzas par prix/ingrédients)

## 🎨 Design System

### Palette de Couleurs

| Couleur | Hex | Usage |
|---------|-----|-------|
| Rouge primaire | `#c72027` | CTA, pizzas, branding |
| Rouge foncé | `#a01a20` | Hover states |
| Jaune | `#fef08a` | Accents, badges |
| Bleu | `#2563eb` | Boissons |
| Rose | `#db2777` | Desserts |

### Composants

- **Cards** : Ombres douces, hover avec scale
- **Buttons** : Rounded, transitions 300ms
- **Drawer** : Slide-in avec overlay
- **Badges** : Rounded-full avec icônes

## 📦 Technologies

### Frontend
- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **Icons** : Lucide React
- **State** : React Context API
- **Images** : Next/Image + Unsplash

### Backend
- **Framework** : NestJS
- **Language** : TypeScript
- **Validation** : class-validator
- **API** : REST

## 📡 API Endpoints

### Pizzas
- `GET /pizzas` - Liste toutes les pizzas
- `GET /pizzas/search?maxPrice=12&ingredient=mozzarella` - Recherche

### Boissons
- `GET /drinks` - Liste toutes les boissons
- `GET /drinks/:id` - Détails d'une boisson
- `POST /drinks` - Créer une boisson
- `PUT /drinks/:id` - Modifier
- `DELETE /drinks/:id` - Supprimer

### Desserts
- `GET /desserts` - Liste tous les desserts
- `GET /desserts/:id` - Détails d'un dessert

### Commandes
- `GET /orders` - Liste des commandes
- `GET /orders?processed=true` - Commandes traitées
- `GET /orders/:id` - Détails d'une commande
- `POST /orders` - Créer une commande
- `PUT /orders/:id` - Modifier
- `DELETE /orders/:id` - Supprimer
- `PATCH /orders/:id/processed` - Marquer comme traitée

## 🔧 Configuration

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend
Port par défaut : 3001 (configurable dans `main.ts`)

## 📱 Utilisation

1. **Parcourir** le menu (pizzas, boissons, desserts)
2. **Cliquer** sur "Ajouter au panier" pour chaque produit
3. **Ouvrir** le panier via l'icône en haut à droite
4. **Modifier** les quantités avec +/-
5. **Supprimer** des articles avec l'icône poubelle
6. **Voir** le total mis à jour en temps réel
7. **Commander** (à implémenter)

## 🐛 Dépannage

### Les produits ne chargent pas
- Vérifier que le backend tourne sur le port 3001
- Vérifier `.env.local` dans le frontend
- Ouvrir la console du navigateur

### Erreurs CORS
- Vérifier que `app.enableCors()` est activé dans `nestor-app/src/main.ts`
- Vérifier l'URL origin : `http://localhost:3000`

### Le panier ne se sauvegarde pas
- Le navigateur doit autoriser localStorage
- Ne pas utiliser la navigation privée

## 📝 Roadmap

- [ ] Page de checkout avec formulaire
- [ ] Intégration paiement (Stripe)
- [ ] Confirmation de commande par email
- [ ] Authentification utilisateur (JWT)
- [ ] Historique des commandes
- [ ] Suivi de livraison en temps réel
- [ ] Système de notation/avis
- [ ] Programme de fidélité
- [ ] Tests unitaires et e2e

## 🤝 Contribution

Projet créé pour **Nest-or** - Pizzeria Italienne Authentique

### Développement
```bash
# Linter
npm run lint

# Build
npm run build

# Production
npm run start
```

## 📄 Licence

© 2026 Nest-or - Tous droits réservés

---

**Bon appétit !** 🍕❤️
