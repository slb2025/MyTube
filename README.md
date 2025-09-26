**MyTube**

**Vue d'ensemble du projet**
MyTube est une application web de streaming vidéo construite avec Angular. Elle permet aux utilisateurs de rechercher des films via l'API The Movie Database (TMDB), de visionner des bandes-annonces sur YouTube et de gérer leurs propres playlists.

**Fonctionnalités**
- *Recherche de films* : Recherchez des films ou explorez une liste de films populaires.
- *Visionnage de vidéos* : Regardez les bandes-annonces des films directement sur l'application.
- *Gestion de playlists* : Ajoutez ou retirez des films dans une playlist personnalisée.
- *Authentification locale* : Connectez-vous ou inscrivez-vous avec un système d'authentification simple et local.
- *Design responsive* : L'interface utilisateur est optimisée pour les appareils mobiles, les tablettes et les ordinateurs de bureau.

**Technologies Utilisées**
- *Frontend* : Angular
- *UI / Composants* : Angular Material
- *Requêtes HTTP* : HttpClient
- *Gestion d'état* : localStorage (pour l'authentification et les playlists)
- *API* : The Movie Database (TMDB) API
- *Système de construction* : Angular CLI

**Instructions de Démarrage**
Pour lancer une copie locale de l'application, suivez les étapes suivantes.

**Prérequis**
Assurez-vous que Node.js et Angular CLI sont installés sur votre machine.

**Vérifiez vos versions**
node --version
npm --version
ng version

**Installation**
Clonez le dépôt :
git clone https://github.com/slb2025/MyTube.git
    cd mytube

Installez les dépendances du projet :
    npm install

Configurez votre API Key TMDB. Créez un fichier src/environments/environment.ts et ajoutez-y votre clé :
    export const environment = {
    production: false,
    tmdbApiUrl: '[https://api.themoviedb.org/3](https://api.themoviedb.org/3)',
    >>>tmdbApiKey: 'VOTRE_CLÉ_API_ICI'<<<
    };

**Lancement du serveur de développement**
Pour démarrer l'application :
    ng serve

L'application sera accessible dans votre navigateur à l'adresse http://localhost:4200/.

**Structure du projet**
src/
├── app/
│   ├── app.ts
│   ├── core/
│   │   ├── header/
│   │   └── sidebar/
│   ├── pages/
│   │   ├── auth-page/
│   │   ├── search-page/
│   │   └── video-page/
│   └── services/
│       ├── auth-service.ts
│       ├── playlist-service.ts
│       └── search-service.ts
├── assets/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── styles.scss

**Licence**
Accès libre de droits, c'est cadeau :D