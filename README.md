Search files...
Read file: README.md
Read file: src/pages/Lessons.jsx
Read file: src/pages/Critique.jsx
Read file: src/pages/Canvas.jsx
# Documentație Artsy Lab

## Descriere generală

**Artsy Lab** este o platformă web interactivă dedicată învățării desenului de portret, combinând lecții structurate, un canvas digital avansat și feedback automatizat cu ajutorul AI. Scopul aplicației este să transforme procesul de învățare artistică într-o experiență captivantă, accesibilă și modernă.

---

## Funcționalități principale

### 1. Canvas Interactiv
- Utilizatorii pot desena direct în browser folosind instrumente digitale (pensulă, radieră, paletă de culori, ajustare grosime).
- Fiecare lecție oferă o imagine de referință ce poate fi afișată/ascunsă.
- Suportă descărcarea desenului ca imagine PNG și resetarea canvas-ului.
- Comenzi rapide de la tastatură pentru schimbarea rapidă a instrumentelor.

### 2. Lecții Structurate
- Curriculum progresiv cu lecții despre: forma capului, ochi, nas, gură.
- Fiecare lecție conține:
  - Obiective clare
  - Sfaturi practice
  - Grad de dificultate și durată estimată
  - Blocarea/deblocarea progresivă a lecțiilor pe măsură ce utilizatorul avansează
- Progresul este salvat local (localStorage).

### 3. Feedback AI (Critique)
- După finalizarea unui desen, utilizatorul poate trimite lucrarea pentru analiză AI.
- AI-ul returnează un scor (0-100) și feedback personalizat pentru îmbunătățire.
- Utilizatorul poate adăuga propriile note/reflecții.
- Posibilitatea de a descărca desenul și de a continua cu următoarea lecție.

### 4. Comunitate și Profil
- Utilizatorii pot accesa o galerie, profil personal și o secțiune de comunitate (funcționalități detaliate în alte componente).

---

## Structura aplicației

### Pagini principale

- **Index.jsx**: Pagina de start, prezentare generală a platformei și funcționalităților.
- **Lessons.jsx**: Listă de lecții, progres, acces la fiecare lecție.
- **Canvas.jsx**: Canvas de desen pentru fiecare lecție, cu instrumente și referințe.
- **Critique.jsx**: Pagina de feedback AI pentru desenul finalizat.
- **Profile.jsx, Gallery.jsx, Community.jsx**: Funcționalități sociale și de portofoliu.

### Componente UI

- Butoane, carduri, badge-uri, progres bar, dialoguri, etc. (vezi `src/components/ui/`)
- Navbar, AboutUs, ConfigTest pentru navigare și prezentare.

### Management stare și autentificare

- Context pentru autentificare (`src/lib/AuthContext.jsx`)
- Starea lecțiilor și progresul sunt stocate in baza de date.

---

## Fluxul utilizatorului

1. **Autentificare/Înregistrare** (opțional, pentru funcționalități avansate)
2. **Parcurgerea lecțiilor**: utilizatorul începe cu prima lecție, completează desenul pe canvas, primește feedback, deblochează următoarea lecție.
3. **Feedback AI**: la finalul fiecărei lecții, desenul poate fi analizat de AI pentru feedback personalizat.
4. **Progres și portofoliu**: utilizatorul își poate urmări progresul, salva/descarca lucrările și interacționa cu comunitatea.

---

## Tehnologii folosite

- **React** (Vite)
- **Context API** pentru stare globală (autentificare)
- **Tailwind CSS** și SCSS pentru stilizare
- **Lucide React** pentru iconografie
- **LocalStorage** pentru salvarea progresului
- **API extern** pentru feedback AI

---

## Instalare și rulare

1. Instalează dependențele:
   ```bash
   npm install
   ```
2. Pornește aplicația:
   ```bash
   npm run dev
   ```
3. Accesează în browser la `http://localhost:5173`

---

## Extensibilitate

- Poți adăuga noi lecții în `src/pages/Lessons.jsx` și `src/pages/Canvas.jsx`.
- Feedback-ul AI poate fi extins cu noi endpoint-uri sau modele.
- Componentele UI sunt modulare și pot fi reutilizate.