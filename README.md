# MovieScope 🎬

Une application moderne de découverte et de recherche de films utilisant l'API The Movie Database (TMDB).

## ✨ Fonctionnalités

- **🎯 Films populaires** : Découvrez les films les plus populaires du moment
- **🔍 Recherche avancée** : Recherchez des films par titre en temps réel
- **📱 Design responsive** : Interface adaptée à tous les écrans (mobile, tablette, desktop)
- **🎨 Design moderne** : Interface utilisateur moderne avec animations fluides
- **📄 Pagination** : Navigation facile entre les pages de résultats
- **🎭 Détails complets** : Pages de détails avec synopsis, distribution et informations complètes
- **⚡ Performance optimisée** : Chargement rapide et expérience utilisateur fluide

## 🛠️ Technologies utilisées

- **React 19** : Framework JavaScript moderne
- **React Router** : Navigation entre les pages
- **Styled Components** : CSS-in-JS pour les styles dynamiques
- **CSS Modules** : Styles modulaires et encapsulés
- **Axios** : Client HTTP pour les appels API
- **The Movie Database API** : Base de données complète de films

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd moviescope
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'API TMDB**
   
   Pour utiliser l'application, vous devez obtenir une clé API gratuite sur [The Movie Database](https://developer.themoviedb.org/).
   
   - Créez un compte sur [TMDB](https://www.themoviedb.org/signup)
   - Allez dans vos paramètres de compte
   - Demandez une clé API (gratuite)
   - Remplacez `YOUR_TMDB_API_KEY` dans `src/services/tmdb.js` par votre clé

4. **Lancer l'application**
   ```bash
   npm start
   ```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── MovieCard.js     # Carte de film avec CSS Modules
│   ├── MovieCard.module.css
│   ├── NavBar.js        # Barre de navigation
│   └── navbar.css       # Styles CSS classiques
├── pages/               # Pages de l'application
│   ├── Home.js          # Page d'accueil avec recherche
│   ├── home.css         # Styles CSS classiques
│   ├── MovieDetail.js   # Page de détails avec styled-components
│   └── About.js         # Page à propos
├── services/            # Services API
│   └── tmdb.js          # Service TMDB avec Axios
├── data/                # Données statiques
│   └── movies.js        # Données de démonstration
└── styles/              # Styles globaux
    └── index.css        # Styles globaux et variables
```

## 🎨 Approches de styling

L'application démontre trois approches différentes de styling React :

1. **CSS classique** : `home.css`, `navbar.css`
2. **CSS Modules** : `MovieCard.module.css`
3. **CSS-in-JS** : `MovieDetail.js` avec styled-components

## 🔧 Fonctionnalités techniques

### Rendu conditionnel
- Affichage conditionnel des états de chargement
- Messages d'erreur et états vides
- Navigation conditionnelle

### Lists & Keys
- Utilisation correcte des clés uniques pour les listes de films
- Optimisation des performances de rendu

### React Router
- Navigation entre pages sans rechargement
- Paramètres d'URL pour les détails de films
- Gestion des routes 404

### Responsive Design
- Design mobile-first
- Grilles adaptatives
- Breakpoints optimisés

## 📱 Routes disponibles

- `/` - Page d'accueil avec films populaires et recherche
- `/movie/:id` - Page de détails d'un film spécifique
- `/about` - Page à propos

## 🔍 Fonctionnalités de recherche

- Recherche en temps réel
- Pagination des résultats
- Gestion des états de chargement
- Messages d'erreur informatifs

## 🎯 User Stories implémentées

✅ **En tant qu'utilisateur, je veux voir une liste de films avec leurs titres, affiches et notes**

✅ **En tant qu'utilisateur, je souhaite cliquer sur un film pour accéder à sa page de détails**

✅ **En tant qu'utilisateur, je veux voir un message spécial si aucun film ne correspond à ma recherche**

✅ **En tant qu'utilisateur, je souhaite que la mise en page s'adapte à mon écran (mobile, tablette, ordinateur)**

✅ **En tant qu'utilisateur, je veux naviguer entre les pages sans recharger le site**

## 🚀 Déploiement

L'application peut être déployée sur n'importe quelle plateforme de hosting statique :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `build/`.

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

**Note** : N'oubliez pas de configurer votre clé API TMDB pour que l'application fonctionne correctement !
