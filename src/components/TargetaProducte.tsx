/// <reference types="../vite-env.d.ts" />
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { Producte } from '../tipus';
import styles from './TargetaProducte.module.css';

interface TargetaProducteProps {
  producte: Producte;
  onAfegirAlCarro: (producte: Producte) => void;
}

export default function TargetaProducte({ producte, onAfegirAlCarro }: TargetaProducteProps) {
  const esgotat = producte.estoc === 0;

  return (
    <article
      className={clsx(styles.targetaProducte, {
        [styles.senseEstoc]: esgotat,
      })}
    >
      {/* targeta envoltada x el link per anar a la pagina FitxaProducte */}
      <Link to={`/producte/${producte.id}`} className={styles.targetaImatgedEmbolcall}>
        <div className={styles.targetaCapcaleraImatge}>
          {esgotat ? (
            <span className={styles.insigniaTargeta}>Sense stock</span>
          ) : producte.insignia ? (
            <span className={styles.insigniaTargeta}>{producte.insignia}</span>
          ) : null}
        </div>

        <div className={styles.targetaSvgContenidor}>
          <img src={producte.imatge} alt={producte.nom} />
        </div>
      </Link>

      {/* contingut i informació */}
      <div className={styles.targetaContingut}>
        <span className={styles.targetaCategoria}>{producte.categoria}</span>
        
        {/* un sol títol envoltat pel Link*/}
        <Link to={`/producte/${producte.id}`} style={{ textDecoration: 'none' }}>
          <h3 className={styles.targetaTitol}>{producte.nom}</h3>
        </Link>

        <p className={styles.targetaDescripcio}>{producte.descripcioCurta}</p>

        {/* preu i botó */}
        <div className={styles.targetaPeu}>
          <div className={styles.targetaPreuGrup}>
            <span className={styles.targetaPreu}>{producte.preu.toFixed(2)} €</span>
            {producte.preuAntic && (
              <span className={styles.targetaPreuAntic}>
                {producte.preuAntic.toFixed(2)} €
              </span>
            )}
          </div>

          <button
            onClick={() => onAfegirAlCarro(producte)}
            disabled={esgotat}
            className={clsx(styles.botoAfegir, {
              [styles.esgotat]: esgotat,
            })}
          >
            {esgotat ? 'Esgotat' : 'Afegir al carro'}
          </button>
        </div>
      </div>
    </article>
  );
}