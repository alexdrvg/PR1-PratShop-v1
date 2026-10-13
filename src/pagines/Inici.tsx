/// <reference types="../vite-env.d.ts" />
import { Link } from 'react-router-dom';
import { PRODUCTES_INICIALS } from '../dades/productes';
import TargetaProducte from '../components/TargetaProducte';
import { Producte } from '../tipus';
import styles from './Inici.module.css';

interface IniciProps {
  onAfegirAlCarro: (producte: Producte) => void;
}

export default function Inici({ onAfegirAlCarro }: IniciProps) {
  // Filtrem per mostrar només els productes destinats/destacats (p. ex. els que tenen insígnia)
  const productesDestacats = PRODUCTES_INICIALS.filter((p) => p.insignia);

  return (
    <div className={styles.iniciContenidor}>
      {/* Secció Hero / Presentació */}
      <section className={styles.hero}>
        <div className={styles.heroContingut}>
          <span className={styles.heroSubtitol}>TECNOLOGIA ESSENCIAL</span>
          <h1 className={styles.heroTitol}>Minimalisme i rendiment per al teu dia a dia</h1>
          <p className={styles.heroDescripcio}>
            Descobreix la nostra selecció exclusiva d'auriculars, relotges intel·ligents i accessoris dissenyats per simplificar la teva vida.
          </p>
          
          {/* Botó destacat cap al Catàleg */}
          <Link to="/cataleg" className={styles.botoHero}>
            Veure el Catàleg
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Secció de Productes Destacats */}
      <section className={styles.seccioDestacats}>
        <h2 className={styles.titolSeccio}>Productes Destacats</h2>
        <div className={styles.graellaDestacats}>
          {productesDestacats.map((producte) => (
            <TargetaProducte
              key={producte.id}
              producte={producte}
              onAfegirAlCarro={onAfegirAlCarro}
            />
          ))}
        </div>
      </section>
    </div>
  );
}