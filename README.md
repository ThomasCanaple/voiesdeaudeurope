# Voies d'Eau d'Europe

Site web de l'association **Voies d'Eau d'Europe — Des bateaux par-dessus les montagnes**.

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
│   └── app.js            # Logique applicative & configuration des tomes/documents
│
├── assets/
│   └── hero-bg.jpg       # Image de fond du hero (optionnelle)
│
└── pdf/
    └── (placer les PDF locaux ici si besoin)
```

---

## 🚀 Mise en route

### Prérequis

Aucune dépendance locale — jQuery, Popper.js et Bootstrap sont
chargés depuis des CDN publics. Les PDF sont servis directement depuis
`voiesdeaudeurope.eu`.

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

## 📚 Structure des documents

Les documents sont organisés par **Tomes** dans le fichier `js/app.js` :

| Tome | Contenu |
|------|---------|
| Tome 1 | Histoire + Annexe : Le Soliton |
| Tome 2 | Les écluses (chapitres 1–8, 10–12) |
| Tome 3 | Parties 1–4 |
| Tome 4 | Parties 1–4 |
| Tome 5 | Parties 1–4 |
| Tome 6 | Parties 1–3 (avec note de l'éditrice pour la Partie 3) |

---

## ➕ Ajouter un nouveau document PDF

1. Ouvrez `js/app.js` et repérez le tableau `tomes`.

2. Pour ajouter un document à un Tome existant, ajoutez une entrée dans son
   tableau `documents` :

   ```js
   {
     id:    'mon-document',          // Identifiant unique (sans espaces)
     title: 'Mon Document',          // Titre affiché sur le site
     file:  'pdf/mon-document.pdf',  // URL ou chemin vers le PDF
     // citation: 'Note optionnelle affichée sous le PDF dans la visionneuse.'
   }
   ```

3. Pour ajouter un nouveau Tome, ajoutez un objet dans le tableau `tomes` :

   ```js
   {
     id:    'tome-7',
     label: 'Tome 7',
     icon:  'book',      // Icône du sprite SVG (index.html)
     documents: [ /* vos documents ici */ ]
   }
   ```

4. Sauvegardez — le titre de Tome, les liens de navigation et la liste des
   documents apparaîtront automatiquement, sans aucune modification du HTML.

5. Ajoutez l'URL du nouveau PDF dans `sitemap.xml` pour que les moteurs de
   recherche le trouvent.

Chaque document a un lien direct partageable : `#doc-<id>`, par exemple
`https://www.voiesdeaudeurope.eu/#doc-t2-ch3` ouvre directement le chapitre 3
du Tome 2.

---

## 🔧 Dépendances (CDN — aucune installation requise)

| Bibliothèque    | Version | Rôle                                          |
|-----------------|---------|-----------------------------------------------|
| jQuery          | 3.6.4   | Requis par Bootstrap 4 ; manipulation du DOM  |
| Popper.js       | 1.16.1  | Requis par Bootstrap 4 (menus déroulants)     |
| Bootstrap       | 4.6.2   | Mise en page, composants, grille, modales      |
| Font Awesome    | 5.15.4  | Icônes, copiées en sprite SVG dans index.html |

Les polices Raleway et Open Sans (licence SIL OFL) sont hébergées dans
`fonts/` : aucune requête n'est envoyée à Google.

> **Ordre de chargement JS** : jQuery → Popper.js → Bootstrap → app.js

---

## 📸 Image de fond (héro)

Le héro utilise un dégradé de couleur seul. Pour ajouter une photo, placez
`hero-bg.jpg` dans `assets/` et ajoutez-la après le dégradé dans la règle
`.hero-section` de `css/styles.css` (exemple en commentaire dans la règle).

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
- Visionneuse PDF adaptée à la hauteur de l'écran (`75vh` / `55vh` mobile)
- Sur mobile (iOS/Android), les PDF s'ouvrent automatiquement dans un nouvel onglet
