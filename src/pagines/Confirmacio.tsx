import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Confirmacio.module.css';

export default function Confirmacio() {
  // inicilitzem l'estat executant la funcion 1 cop amb el render inicial 
  const [numComanda] = useState(() => 'PS-' + Math.floor(100000 + Math.random() * 900000));
  return (
    <div className={styles.confirmacioContenidor}>
      <div className={styles.targetaConfirmacio}>
        <div className={styles.iconaExit}>✓</div>

        <h1 className={styles.titol}>Comanda Confirmada!</h1>
        <p className={styles.subtitol}>
          Gràcies per la teva compra a <strong>Prat Shop Tech</strong>.
        </p>

        <div className={styles.caixaDetalls}>
          <div className={styles.filaDetall}>
            <span>Número de Comanda:</span>
            <strong>{numComanda}</strong>
          </div>
          <div className={styles.filaDetall}>
            <span>Estat:</span>
            <span className={styles.estatPagat}>Pagat i Processant</span>
          </div>
          <div className={styles.filaDetall}>
            <span>Temps d'enviament estimat:</span>
            <span>24 - 48 hores</span>
          </div>
        </div>

        <p className={styles.notaEmail}>
          T'hem enviat un correu electrònic amb el resum de la comanda i la informació de seguiment.
        </p>

        <div className={styles.accions}>
          <Link to="/cataleg" className={styles.botoPrincipal}>
            Continuar Comprant
          </Link>
          <Link to="/" className={styles.botoSecundari}>
            Tornar a l'Inici
          </Link>
        </div>
      </div>
    </div>
  );
}