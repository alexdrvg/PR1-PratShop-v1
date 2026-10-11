import { NavLink } from 'react-router-dom';
import styles from './Capcalera.module.css';

interface CapcaleraProps {
  cerca: string;
  onCanviCerca: (text: string) => void;
  totalUnitatsCarro: number;
}

export default function Capcalera({ cerca, onCanviCerca, totalUnitatsCarro }: CapcaleraProps) {
  return (
    <header className={styles.capcalera}>
      <div className={styles.capcaleraContenidor}>
        
        {/* Logo i Insígnia */}
        <NavLink to="/" className={styles.logotipArea}>
          <span className={styles.logotipTitol}>PratShop</span>
          <span className={styles.logotipInsignia}>TECH</span>
        </NavLink>

        {/* Cercador */}
        <div className={styles.cercadorCaixa}>
          <svg className={styles.cercadorIcona} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className={styles.cercadorInput}
            placeholder="Cercar productes de tecnologia..."
            value={cerca}
            onChange={(e) => onCanviCerca(e.target.value)}
          />
        </div>

        {/* Accions i Carretó */}
        <div className={styles.capcaleraAccions}>
          <NavLink to="/carro" className={styles.botoCistella}>
            <span className={styles.cistellaIcona}>
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </span>
            <span>Carro</span>
            {/* El globus només es mostra quan hi ha unitats al carro (B11) */}
            {totalUnitatsCarro > 0 && (
              <span className={styles.cistellaComptador}>
                {totalUnitatsCarro}
              </span>
            )}
          </NavLink>
        </div>

      </div>
    </header>
  );
}