# 🍕 NestOr Frontend - Interface Web Pizzeria

Interface web moderne et élégante pour la pizzeria NestOr, construite avec Next.js 16, React et Tailwind CSS.

## ✨ Fonctionnalités

### 🎨 Design Moderne
- **Interface responsive** adaptée à tous les écrans
- **Dégradés colorés** (orange/rouge) pour une ambiance chaleureuse
- **Animations fluides** et transitions élégantes
- **Icônes lucide-react** pour une meilleure UX

### 🛒 Panier Intelligent
- Ajout/suppression de produits en temps réel
- Gestion des quantités avec boutons +/-
- Calcul automatique du total
- **Détection automatique du menu promotionnel** (-10%)

### 🎁 Menu Promotionnel
Le système détecte automatiquement si votre panier contient :
- ✅ Au moins 1 pizza
- ✅ Au moins 1 boisson **sans alcool**
- ✅ Au moins 1 dessert

→ **Réduction de 10% appliquée automatiquement !**

### 📦 Commandes
- Passage de commande en un clic
- Notification de succès avec animation
- Envoi automatique à l'API backend

## 🚀 Démarrage

### Prérequis
- Node.js 18+ installé
- Backend NestJS lancé sur `http://localhost:3009`

### Installation et lancement

```bash
# Installation des dépendances (déjà fait)
npm install

# Lancer en mode développement
npm run dev

# Accéder à l'application
# Ouvrir http://localhost:3000 dans votre navigateur
```

### Build pour production

```bash
# Créer un build optimisé
npm run build

# Lancer en mode production
npm start
```

## 🏗️ Architecture

```
nestor-front/
├── app/
│   ├── page.tsx          # Page principale (menu + panier)
│   ├── layout.tsx        # Layout global
│   └── globals.css       # Styles globaux Tailwind
├── public/               # Assets statiques
└── package.json          # Dépendances
```

## 🎨 Design System

### Couleurs Principales
- **Orange** : `#F97316` - Pizzas, boutons principaux
- **Rouge** : `#DC2626` - Accents, dégradés
- **Bleu** : `#2563EB` - Boissons
- **Rose** : `#EC4899` - Desserts
- **Jaune** : `#FACC15` - Badge panier, promotion

### Composants Principaux

#### Header
- Logo avec icône pizza
- Bouton panier avec badge de quantité
- Position sticky pour rester visible

#### Sections Menu
- **Pizzas** : Cartes larges avec liste d'ingrédients
- **Boissons** : Cartes compactes avec badge alcool
- **Desserts** : Cartes simples et élégantes

#### Panier (Sidebar)
- Liste des articles avec quantités
- Boutons +/- pour ajuster
- Affichage du sous-total
- **Réduction menu** en vert si applicable
- Total en gras
- Bouton "Commander" avec dégradé

## 🔌 Intégration API

### Endpoints utilisés

```typescript
GET  /pizzas      // Liste des pizzas
GET  /drinks      // Liste des boissons
GET  /desserts    // Liste des desserts
POST /orders      // Créer une commande
```

### Format de commande envoyé

```json
{
  "pizzas": [1, 1, 2],      // IDs avec répétition selon quantité
  "drinks": [1, 3],
  "desserts": [2]
}
```

## 🎯 Expérience Utilisateur

### Feedback Visuel
- ✅ Boutons avec **hover effects**
- ✅ Badge quantité sur le panier
- ✅ **Bannière promotionnelle** animée (pulse)
- ✅ Notification de succès après commande (bounce)
- ✅ Transitions fluides sur toutes les actions

### Responsive Design
- **Desktop** : Menu 2/3 largeur + Panier 1/3 largeur (sidebar)
- **Tablet** : Grilles adaptatives
- **Mobile** : Layout vertical, panier en overlay

## 🧪 Scénarios de Test

### Test 1 : Menu Promotionnel
1. Ajouter 1 Margherita (8€)
2. Ajouter 1 Coca-Cola (2.5€) ← **Sans alcool**
3. Ajouter 1 Tiramisu (5€)
4. ✅ Vérifier : Réduction -10% appliquée
5. Total : 13.95€ au lieu de 15.50€

### Test 2 : Sans Promotion
1. Ajouter 1 Margherita (8€)
2. Ajouter 1 Bière (4€) ← **Avec alcool**
3. Ajouter 1 Tiramisu (5€)
4. ❌ Pas de réduction (boisson alcoolisée)
5. Total : 17€

### Test 3 : Commande Simple
1. Ajouter 2 Pepperoni (10€ × 2)
2. Total : 20€
3. Cliquer sur "Commander"
4. ✅ Vérifier : Notification de succès
5. ✅ Panier vidé automatiquement

## 🎨 Personnalisation

### Modifier les couleurs

```tsx
// Dans app/page.tsx
// Remplacer les classes Tailwind :
bg-gradient-to-r from-orange-500 to-red-500  // Boutons
bg-gradient-to-br from-orange-50 to-red-50   // Fond
```

### Changer l'URL de l'API

```tsx
// Dans app/page.tsx (ligne 6)
const API_URL = 'http://localhost:3009';
// Changer par votre URL de production
```

## 📊 Technologies Utilisées

- **Next.js 16** - Framework React avec Turbopack
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **lucide-react** - Icônes modernes
- **Fetch API** - Requêtes HTTP

## 🚀 Améliorations Futures

### Suggestions d'évolution
- [ ] Système d'authentification utilisateur
- [ ] Historique des commandes
- [ ] Recherche et filtres avancés
- [ ] Mode sombre
- [ ] Animations de transition de page
- [ ] Gestion d'erreurs réseau plus complète
- [ ] Cache des données menu
- [ ] PWA (Progressive Web App)
- [ ] Paiement en ligne
- [ ] Suivi de commande en temps réel

## 🎯 Performance

- ⚡ **Turbopack** pour un build ultra-rapide
- 🎨 **Tailwind JIT** pour un CSS optimisé
- 📦 **Code splitting** automatique par Next.js
- 🖼️ **Lazy loading** des images (si ajoutées)

## 📝 Notes Importantes

### CORS
Le backend doit avoir CORS activé pour autoriser les requêtes depuis `http://localhost:3000` (déjà configuré dans le backend).

### Serveur Backend
⚠️ **Assurez-vous que le backend NestJS tourne sur le port 3009** avant de lancer le frontend.

```bash
# Dans le dossier nestor-app
npm run start:dev
```

## 🎉 Résultat

Vous avez maintenant une **interface web complète et élégante** pour votre pizzeria avec :
- ✅ Design moderne et responsive
- ✅ Gestion intelligente du panier
- ✅ Détection automatique du menu promotionnel
- ✅ Intégration complète avec l'API backend
- ✅ Expérience utilisateur fluide et intuitive

**Bon appétit ! 🍕**
