# Voies d'Eau d'Europe

Site web de l'association **Voies d'Eau d'Europe** — une plateforme moderne,
responsive et accessible présentant les ressources documentaires sur les voies
navigables intérieures européennes.

Construit avec **HTML5 · CSS3 · jQuery 3 · Bootstrap 4** — aucun back-end,
aucun outil de build requis.

---

## 🗂 Structure du projet

```
voiesdeaudeurope/
├── index.html            # Page principale (landing page)
├── README.md
│
├── css/
│   └── styles.css        # Styles personnalisés (s'appuient sur Bootstrap 4)
│
├── js/
│   └── app.js            # Logique applicative & configuration des documents
│
├── assets/
│   └── hero-bg.jpg       # Image de fond du hero (optionnelle)
│
└── pdf/
    ├── carte-du-reseau.pdf
    ├── guide-navigation.pdf
    ├── reglementation.pdf
    └── horaires-ecluses.pdf
```

---

## 🚀 Mise en route

### Prérequis

Aucune dépendance locale — jQuery, Popper.js, Bootstrap et Font Awesome sont
chargés depuis des CDN publics.

### Lancement en local

Pour que la visionneuse PDF intégrée fonctionne, le site doit être servi via
HTTP (et non ouvert en tant que fichier local `file://`).

**Python 3** (intégré sur macOS / Linux) :

```bash
cd voiesdeaudeurope
python3 -m http.server 8080
```

**Node.js** (si disponible) :

```bash
npx serve .
```

Ouvrez ensuite `http://localhost:8080` dans votre navigateur.

---

## ➕ Ajouter un nouveau document PDF

1. Placez votre fichier PDF dans le dossier `pdf/`.

2. Ouvrez `js/app.js` et ajoutez une entrée dans le tableau `documents`
   au début du fichier :

   ```js
   {
     id:    'mon-document',          // Identifiant unique (sans espaces)
     title: 'Mon Document',          // Titre affiché sur le site
     desc:  'Courte description.',   // Description visible sur la carte
     file:  'pdf/mon-document.pdf',  // Chemin vers le PDF
     icon:  'fa-file-pdf'            // Icône Font Awesome 5 (optionnel)
   }
   ```

3. Sauvegardez le fichier — la carte et le lien de navigation
   apparaîtront automatiquement, sans aucune modification du HTML.

---

## 🔧 Dépendances (CDN — aucune installation requise)

| Bibliothèque    | Version | Rôle                                          |
|-----------------|---------|-----------------------------------------------|
| jQuery          | 3.6.4   | Requis par Bootstrap 4 ; manipulation du DOM  |
| Popper.js       | 1.16.1  | Requis par Bootstrap 4 (menus déroulants)     |
| Bootstrap       | 4.6.2   | Mise en page, composants, grille, modales      |
| Font Awesome    | 5.15.4  | Icônes vectorielles                           |
| Google Fonts    | —       | Typographies Raleway & Open Sans              |

> **Ordre de chargement JS** : jQuery → Popper.js → Bootstrap → app.js

---

## 📸 Image de fond (héro)

Placez une image nommée `hero-bg.jpg` dans le dossier `assets/` pour
personaliser l'arrière-plan du héro. Si l'image est absente, le dégradé
de couleur s'affiche seul.

---

## ♿ Accessibilité

- Structure sémantique HTML5 (`<nav>`, `<main>`, `<section>`, `<footer>`)
- Rôles et attributs ARIA sur tous les composants interactifs
- Lien d'évitement (_skip link_) pour les lecteurs d'écran
- Navigation clavier complète avec mise en évidence du focus
- Contrastes de couleurs conformes WCAG AA

---

## 📱 Responsive

- Navbar collapse sur téléphone (hamburger menu)
- Grille Bootstrap fluide : 1 → 2 → 4 colonnes selon la largeur d'écran
- Visionneuse PDF adaptée à la hauteur de l'écran (`75vh` / `55vh` mobile)
- Notice informative sur mobile pour les limitations du viewer PDF natif
