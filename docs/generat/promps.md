# Prompts utilitzats a Google Stitch

Aquest fitxer conté la seqüència d'instruccions successives utilitzades a Google Stitch per generar el disseny i el codi base del catàleg i la capçalera de PratShop.


## Prompt 1: Generació Inicial (Estructura base i paleta)

Dissenya una interfície web extremadament minimalista i senzilla per a una botiga de tecnologia anomenada 'PratShop Tech'. La interfície ha de ser fàcil d'utilitzar per a tothom, amb molt d'espai en blanc i una tipografia sans-serif neta.

Paleta de colors estricta:
- Fons: #ffffff o gris clar #f8fafc
- Color principal (Capçalera i botons): Blau marí / Navy (#0a192f)
- Color d'accent (Detalls i etiquetes): Violeta pàl·lid (#d8b4fe)
- Text: #0f172a

Estructura bàsica requerida:

1. Capçalera neta: Títol 'PratShop Tech', un cercador bàsic, un filtre de categories senzill i una icona de carretó.
2. Catàleg: Una graella (grid) amb targetes de productes de tecnologia (auriculars, rellotges intel·ligents, etc.).
3. Targeta de producte: Imatge, títol, preu en negreta i un botó 'Afegir al carro'.

Genera un HTML semàntic simple (<header>, <main>, <article>, <button>) sense classes complexes. Mantén el CSS net i estructurat per blocs perquè sigui fàcil d'exportar.


## Prompt 2: Refinament (Esgotat, globus del carretó i correcció de marca)

Refina el disseny actual aplicant els canvis següents:

1. Correcció de marca a la capçalera: Canvia el títol principal a 'PratShop'. Elimina l'etiqueta lila petita que apareix al costat de PratShop i posa-hi al seu lloc la paraula 'Tech' amb una tipografia neta i discreta.
2. Variant de producte Esgotat: Fes que una de les targetes de producte tingui la variant 'Esgotat'. La targeta ha de mostrar l'etiqueta 'Sin stock' en violeta pàl·lid (#d8b4fe), amb el botó desactivat que digui 'Agotado'.
3. Carretó amb globus: A la capçalera, afegeix un petit globus (badge) arrodonit de color violeta pàl·lid sobre la icona del carretó que mestra el número '2'.

Mantén l'estructura del codi HTML el més concisa i directa possible, evitant embolcalls (divs) innecessaris.


## Prompt 3: Refinament (Adaptació a mòbil i correcció de disseny)

Ajusta la pantalla perquè sigui totalment adaptativa (Escriptori i Mòbil 390px) i corregeix el disseny:

1. Assegura't que la capçalera tingui un fons blau marí net (#0a192f) ben renderitzat, sense cercles gegants ni superposicions fosques.
2. En mòbil (390px), la capçalera i el catàleg s'han d'alinear en una sola columna fluida.
3. En CSS, utilitza Flexbox i CSS Grid senzills en lloc de posicions absolutes.
4. Assegura't que les classes CSS siguin noms descriptius i clars (ex: .capcalera, targeta-producte, .boto), evitant estils en línia per facilitar la conversió posterior a components.