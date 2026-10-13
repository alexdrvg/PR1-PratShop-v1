/// <reference types="../vite-env.d.ts" /> 
import styles from './SelectorQuantitat.module.css';

type Props = {
  valor: number;
  minim?: number; // x defecte 1
  maxim: number; // l'estoc del producte
  onCanvi: (nouValor: number) => void;
};

export default function SelectorQuantitat({ valor, minim = 1, maxim, onCanvi }: Props) {
  return (
    <div className={styles.contenidor}>
      <button
        type="button"
        className={styles.boto}
        disabled={valor <= minim}
        onClick={() => onCanvi(valor - 1)}
        aria-label="Disminuir quantitat"
      >
        −
      </button>

      <span className={styles.valor}>{valor}</span>

      <button
        type="button"
        className={styles.boto}
        disabled={valor >= maxim}
        onClick={() => onCanvi(valor + 1)}
        aria-label="Augmentar quantitat"
      >
        +
      </button>
    </div>
  );
}