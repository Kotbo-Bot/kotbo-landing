# Démarche de Conception & Intégration : Landing Page Kotbo

Ce document explique les choix artistiques, techniques et structurels réalisés pour la création de la landing page de **Kotbo**, le centre de contrôle pour communautés Discord.

---

## 1. Vision UI/UX : Du Chaos à l'Ordre

L'objectif principal était de faire comprendre que Kotbo n'est pas "juste un bot", mais un **véritable ERP communautaire**. Pour cela, j'ai opté pour une approche visuelle contrastée :

*   **Le Chaos (Le problème)** : Représenté par un style "Tableau Blanc" (Whiteboard). J'ai créé des composants décoratifs personnalisés (`PostIt.svelte`, `MarkerCircle.svelte`, `HandDrawnArrow.svelte`) avec une police manuscrite (`Caveat`). Cela illustre visuellement le désordre des gestions classiques (tableurs Excel, messages perdus, post-its éparpillés).
*   **L'Ordre (La solution)** : Représenté par les **Vrais Écrans** de Kotbo incrustés dans la page. Ils apportent le côté "Premium" et sérieux de l'outil, montrant instantanément la qualité de l'interface.

## 2. Intégration Fidèle des "Vrais Écrans"

La priorité absolue était de ne pas utiliser de faux mockups génériques, mais de montrer la **véritable application**.

### A. Fusion de la Direction Artistique
J'ai importé et fusionné le fichier `app.css` original du dashboard (avec ses variables `--surface-container-low`, `--primary-color`, etc.) directement dans le layout de la landing page. Ainsi, les composants rendus sur la page vitrine héritent de 100% du CSS du vrai bot.

### B. Le "MockDashboardLayout"
Pour que les widgets ressemblent à de véritables captures d'écran interactives, j'ai conçu un composant `MockDashboardLayout.svelte` qui recrée la structure de l'application :
*   La **Sidebar** (avec le vrai logo `favicon.svg` et les catégories).
*   La **Navbar** (avec les notifications et le profil utilisateur).
*   Le **Conteneur Principal** où sont injectées les vues.

### C. Réplication du DOM Svelte
Les composants internes (`MockProfile.svelte`, `MockTickets.svelte`, `MockSanction.svelte`, `MockStaff.svelte`) ne sont pas des approximations. J'ai copié/collé l'**arborescence HTML exacte** et les classes Tailwind des fichiers `.svelte` du code source original (`kotbo-bot-origins/apps/dashboard`). Le rendu est ainsi _pixel-perfect_.

## 3. Choix Techniques & Résolution de Problèmes

*   **SvelteKit (SSG) & Cloudflare Pages** : La landing est conçue pour être statique, rapide, et hébergée à coût nul.
*   **Tailwind v4** : Utilisé pour un style moderne et rapide (animations légères, glassmorphism, positionnements absolus complexes).
*   **Gestion des Post-its (Z-index & Overflow)** : J'ai ajusté finement les valeurs `absolute`, `scale` et `z-index` pour garantir que les décorations (flèches, notes) habillent le texte sans jamais le rendre illisible (notamment dans le _Hero Header_ et la section _Bazar_).

### Le cas des Icônes (`@getpapillon/papicons`)
Le dashboard original utilise la librairie `@getpapillon/papicons` (basée sur React). Dans un environnement SvelteKit pur et statique, cette librairie React génère des erreurs de compilation ESM insurmontables sans alourdir le bundler.
**Ma solution :** 
J'ai réécrit le composant `Papicon.svelte` pour agir comme un "routeur d'icônes". Il intercepte les noms originaux des icônes (ex: `shieldwarning`, `usersfour`) et les redirige de manière transparente vers leurs équivalents exacts dans **`@lucide/svelte`**.
*   **Résultat** : Un rendu visuel identique, 0 erreur de dépendance React, et un build SvelteKit ultra-rapide et natif.

---

**Conclusion** : La page vitrine est désormais le parfait pont entre le message marketing (Storytelling du désordre vers l'ordre) et la preuve par l'image (via le clonage exact des interfaces de l'application).
