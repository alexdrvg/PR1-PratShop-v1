/// <reference types="../vite-env.d.ts" />
import { Link } from 'react-router-dom';
import SelectorQuantitat from '../components/SelectorQuantitat';
import { LiniaCarro } from '../tipus';
import styles from './Carro.module.css';

interface CarroProps {
  carro: LiniaCarro[];
  onCanviarQuantitat: (id: string, novaQuantitat: number) => void;
  onEliminar: (id: string) => void;
  onBuidarCarro: () => void;
}

export default function Carro({
  carro,
  onCanviarQuantitat,
  onEliminar,
  onBuidarCarro,
}: CarroProps) {
  // Càlcul del total de la compra
  const total = carro.reduce(
    (acc, item) => acc + item.producte.preu * item.quantitat,
    0
  );

  if (carro.length === 0) {
    return (
      <div className={styles.carroBuitContenidor}>
        <h2>El teu carro està buit</h2>
        <p>Sembla que encara no has afegit cap producte a la teva compra.</p>
        <Link to="/cataleg" className={styles.botoExplorar}>
          Explorar el Catàleg
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.carroContenidor}>
      <div className={styles.carroCapcalera}>
        <h1 className={styles.titol}>El teu Carro de la Compra</h1>
        <button onClick={onBuidarCarro} className={styles.botoBuidar}>
          Buidar carro
        </button>
      </div>

      <div className={styles.taulaContenidor}>
        <div className={styles.capcaleraTaula}>
          <span>Producte</span>
          <span>Preu unitari</span>
          <span>Quantitat</span>
          <span>Subtotal</span>
          <span>Accions</span>
        </div>

        {carro.map(({ producte, quantitat }) => {
          const subtotal = producte.preu * quantitat;

          return (
            <div key={producte.id} className={styles.filaProducte}>
              {/* Producte (imatge i nom) */}
              <div className={styles.columnaProducte}>
                <Link to={`/producte/${producte.id}`} className={styles.imatgeEmbolcall}>
                  <img src={producte.imatge} alt={producte.nom} />
                </Link>
                <div className={styles.detallsProducte}>
                  <Link to={`/producte/${producte.id}`} className={styles.nomProducte}>
                    {producte.nom}
                  </Link>
                  <span className={styles.categoriaProducte}>{producte.categoria}</span>
                </div>
              </div>

              {/* Preu unitari */}
              <div className={styles.columnaPreu}>
                {producte.preu.toFixed(2)} €
              </div>

              {/* Quantitat amb SelectorQuantitat */}
              <div className={styles.columnaQuantitat}>
                <SelectorQuantitat
                  valor={quantitat}
                  maxim={producte.estoc}
                  onCanvi={(nouValor) => onCanviarQuantitat(producte.id, nouValor)}
                />
              </div>

              {/* Subtotal */}
              <div className={styles.columnaSubtotal}>
                {subtotal.toFixed(2)} €
              </div>

              {/* Eliminar */}
              <div className={styles.columnaAccions}>
                <button
                  onClick={() => onEliminar(producte.id)}
                  className={styles.botoEliminar}
                  title="Eliminar producte"
                >
                  &times; Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resum i total de la compra */}
      <div className={styles.resumContenidor}>
        <div className={styles.resumDetalls}>
          <div className={styles.liniaTotal}>
            <span>Total:</span>
            <span className={styles.preuTotal}>{total.toFixed(2)} €</span>
          </div>
        </div>
        <div className={styles.resumAccions}>
          <Link to="/cataleg" className={styles.botoSeguirComprant}>
            Seguir comprant
          </Link>
          <Link to="/compra" className={styles.botoTramitar}>
            Tramitar comanda
          </Link>
        </div>
      </div>
    </div>
  );
}