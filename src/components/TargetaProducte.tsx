/// <reference types="../vite-env.d.ts" />
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Producte } from '../tipus';
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
      {/* Targeta de la imatge */}
      <div
        className={clsx(styles.targetaImatgedEmbolcall, {
          [styles.senseEstocImatge]: esgotat,
        })}
      >
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
      </div>

      {/* Contingut i detalls */}
      <div className={styles.targetaContingut}>
        <span className={styles.targetaCategoria}>{producte.categoria}</span>
        
        <Link to={`/producte/${producte.id}`} className={styles.targetaTitol}>
          {producte.nom}
        </Link>
        
        <p className={styles.targetaDescripcio}>{producte.descripcioCurta}</p>

        {/* Peu de la targeta (Preu i Botó) */}
        <div className={styles.targetaPeu}>
          <div className={styles.targetaPreuGrup}>
            <span className={styles.targetaPreu}>{producte.preu.toFixed(2)} €</span>
            {producte.preuAntic && (
              <span className={styles.targetaPreuAntic}>{producte.preuAntic.toFixed(2)} €</span>
            )}
          </div>

          <button
            type="button"
            className={clsx(styles.botoAfegir, {
              [styles.esgotat]: esgotat,
            })}
            disabled={esgotat}
            onClick={() => onAfegirAlCarro(producte)}
          >
            {esgotat ? 'Esgotat' : 'Afegir al carro'}
          </button>
        </div>
      </div>
    </article>
  );
}