# 🛒 PratShop - Tenda d'Electrònica

Aquest projecte consisteix en el disseny i desenvolupament del catàleg de productes per a la botiga d'electrònica i tecnologia **PratShop**. La interfície ha estat inicialment dissenyada amb l'eina **Stitch de Google** i posteriorment modularitzada en components React/TypeScript amb CSS Modules.

---

## 🎨 Temàtica i paleta de colors

PratShop està enfocada a la distribució de tecnologia, hardware informàtic i components de rendiment.

* **Estil visual:** Modèrn, net i foscor funcional.
* **Paleta de colors:** Combinació de blau marí (`#00236f`), lila (`#340081`) i blau cobalt (`#0051d5`) amb accents clars per a fons i contenidors.

---

## 🚀 Característiques Principals

* **Navegació SPA i Rutes Dinàmiques**: Gestió de rutes amb `React Router DOM` (veure catàleg, filtre per cerca a la URL, fitxa de producte per ID, carro, compra i confirmació).
* **Disseny Responsiu i Layout Neteja**:
  * Implementació de **Flexbox** al contenidor principal per garantir un *sticky footer* (el peu de pàgina es manté a la part inferior en pàgines amb poc contingut).
  * **CSS Grid** adaptatiu amb `auto-fit` i `justify-content: center` per mostrar les targetes de producte de manera centrada i sense deformacions de mida.
* **Sistema de Carro de la Compra**:
  * Afegir productes des de l'inici, el catàleg o la fitxa detallada.
  * Modificació de quantitats, eliminació individual d'línies i opció de buidar el carro complet.
  * Indicador visual del nombre total d'unitats a la capçalera.
* **Formulari Controlat i Validació de Compra (`/compra`)**:
  * Arquitectura de formulari controlat 100% per l'estat de React (`useState`).
  * Validació pura (`validar(dades)`) que comprova camps obligatoris, format d'email, codi postal de 5 dígits i targeta de crèdit de 16 dígits.
  * Bloqueig d'enviament i visualització de missatges d'error sota cada camp si hi ha dades incorrectes o incompletes.
  * Neteja automàtica d'errors en temps real a mesura que l'usuari escriu (`onChange`).
  * Redirecció automàtica si s'intenta accedir a `/compra` amb el carro buit.
* **Finalització de la Comanda (`/confirmacio`)**:
  * Resum de compra amb número de comanda generat dinàmicament.
  * Buidat automàtic de l'estat del carro (`setCarro([])`) en completar el pagament.

---

## 🔗 Enllaç al Disseny Original

Pots visualitzar la maqueta i les pantalles generades directament a **Stitch**:

👉 **[Veure el disseny a Google Stitch](https://stitch.withgoogle.com/projects/12284746721374818274)**

---

## 📁 Estructura del Projecte

```text
src/
├── assets/             # Imprescindibles visual i imatges
├── components/         # Components reutilitzables (Capcalera, Peu, TargetaProducte, etc.)
├── dades/              # Mock data o llista de productes inicials
├── pagines/            # Vistes principals de l'aplicació
│   ├── Inici.tsx / Inici.module.css
│   ├── Cataleg.tsx / Cataleg.module.css
│   ├── FitxaProducte.tsx / FitxaProducte.module.css
│   ├── Carro.tsx / Carro.module.css
│   ├── Compra.tsx / Compra.module.css
│   └── Confirmacio.tsx / Confirmacio.module.css
├── tipus.ts            # Interfícies i tipus de TypeScript (Producte, LiniaCarro, etc.)
├── App.tsx             # Configuració de rutes i estat global del carro
└── main.tsx            # Punt d'entrada de la demostració