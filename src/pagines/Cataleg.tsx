/// <reference types="../vite-env.d.ts" />
import { useSearchParams } from 'react-router-dom';
import { PRODUCTES_INICIALS } from '../dades/productes';
import { Producte, Categoria } from '../tipus';
import TargetaProducte from '../components/TargetaProducte';
import styles from './Cataleg.module.css';

interface CatalegProps {
  onAfegirAlCarro: (producte: Producte) => void;
}

const CATEGORIES: Categoria[] = ['Auriculars', 'Smartwatches', 'Audio & Altaveus', 'Accessoris'];

export default function Cataleg({ onAfegirAlCarro }: CatalegProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const cerca = searchParams.get('cerca') || '';
  const categoriaSeleccionada = searchParams.get('categoria') || 'Totes';

  // Canviar filtre de categoria a la URL
  const handleCanviCategoria = (cat: string) => {
    if (cat === 'Totes') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', cat);
    }
    setSearchParams(searchParams);
  };

  // Filtrar productes segons text de cerca i categoria seleccionada
  const productesFiltrats = PRODUCTES_INICIALS.filter((producte) => {
    const coincideixNom = producte.nom.toLowerCase().includes(cerca.toLowerCase());
    const coincideixCategoria =
      categoriaSeleccionada === 'Totes' || producte.categoria === categoriaSeleccionada;
    return coincideixNom && coincideixCategoria;
  });

  return (
    <main className={styles.contenidor}>
      {/* Barra de filtres per categoria */}
      <div className={styles.seccioFiltres}>
        <div className={styles.categoriesGrup}>
          <button
            type="button"
            className={`${styles.botoFiltre} ${categoriaSeleccionada === 'Totes' ? styles.actiu : ''}`}
            onClick={() => handleCanviCategoria('Totes')}
          >
            Tots els productes
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.botoFiltre} ${categoriaSeleccionada === cat ? styles.actiu : ''}`}
              onClick={() => handleCanviCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Text de comptador (Requisit B7) */}
        <span className={styles.comptadorResultats}>
          Mostrant {productesFiltrats.length} de {PRODUCTES_INICIALS.length} productes
        </span>
      </div>

      {/* Graella de targetes o missatge de buit */}
      {productesFiltrats.length > 0 ? (
        <div className={styles.graella}>
          {productesFiltrats.map((producte) => (
            <TargetaProducte
              key={producte.id}
              producte={producte}
              onAfegirAlCarro={onAfegirAlCarro}
            />
          ))}
        </div>
      ) : (
        <div className={styles.senseResultats}>
          <h3>No s'han trobat productes</h3>
          <p>Prova de cercar un altre terme o canvia el filtre de categoria.</p>
        </div>
      )}
    </main>
  );
}