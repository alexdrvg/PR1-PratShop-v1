/// <reference types="../vite-env.d.ts" />
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTES_INICIALS } from '../dades/productes';
import type { Producte } from '../tipus';
import styles from './FitxaProducte.module.css';

interface DetallProducteProps {
  onAfegirAlCarro: (producte: Producte) => void;
}

export default function DetallProducte({ onAfegirAlCarro }: DetallProducteProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // buscar productes x el seu id
  const producte = PRODUCTES_INICIALS.find((p) => p.id === id);

  if (!producte) {
    return (
      <div className={styles.noTrobat}>
        <h2>Producte no trobat</h2>
        <p>El producte que cerques no existeix o ha estat retirat.</p>
        <Link to="/cataleg" className={styles.botoTornar}>
          Tornar al Catàleg
        </Link>
      </div>
    );
  }

  const hiHaEstoc = producte.estoc > 0;

  return (
    <div className={styles.detallContenidor}>
      {/* Botó de navegació cap enrere */}
      <button onClick={() => navigate(-1)} className={styles.botoEnrere}>
        &larr; Tornar
      </button>

      <div className={styles.detallTargeta}>
        {/* Imatge del producte */}
        <div className={styles.imatgeEmbolcall}>
          {producte.insignia && (
            <span className={styles.insignia}>{producte.insignia}</span>
          )}
          <img
            src={producte.imatge}
            alt={producte.nom}
            className={styles.imatge}
          />
        </div>

        {/* Informació i accions */}
        <div className={styles.infoContenidor}>
          <span className={styles.categoria}>{producte.categoria}</span>
          <h1 className={styles.titol}>{producte.nom}</h1>

          <p className={styles.descripcio}>{producte.descripcioCurta}</p>

          <div className={styles.preuGrup}>
            <span className={styles.preu}>{producte.preu.toFixed(2)} €</span>
            {producte.preuAntic && (
              <span className={styles.preuAntic}>
                {producte.preuAntic.toFixed(2)} €
              </span>
            )}
          </div>

          <div className={styles.estocInfo}>
            {hiHaEstoc ? (
              <span className={styles.ambEstoc}>
                &bull; En estoc ({producte.estoc} unitats disponibles)
              </span>
            ) : (
              <span className={styles.senseEstoc}>&bull; Producte esgotat</span>
            )}
          </div>

          {/* Botó principal d'afegir al carro */}
          <button
            onClick={() => onAfegirAlCarro(producte)}
            disabled={!hiHaEstoc}
            className={`${styles.botoAfegir} ${!hiHaEstoc ? styles.esgotat : ''}`}
          >
            {hiHaEstoc ? 'Afegir al carro' : 'Esgotat'}
          </button>
        </div>
      </div>
    </div>
  );
}