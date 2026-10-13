import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LiniaCarro } from '../tipus';
import styles from './Compra.module.css';

interface CompraProps {
  carro: LiniaCarro[];
  onFinalitzarComanda: () => void;
}

type Dades = {
  nom: string;
  correu: string;
  direccio: string;
  poblacio: string;
  codiPostal: string;
  targeta: string;
};

type Errors = Partial<Record<keyof Dades, string>>;

const BUIT: Dades = {
  nom: '',
  correu: '',
  direccio: '',
  poblacio: '',
  codiPostal: '',
  targeta: '',
};

// Validació pura: rep dades i torna errors sense tocar l'estat
function validar(dades: Dades): Errors {
  const errors: Errors = {};

  if (dades.nom.trim().length < 2) {
    errors.nom = 'Escriu el teu nom complet';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dades.correu)) {
    errors.correu = 'El correu no té un format vàlid';
  }

  if (dades.direccio.trim().length < 5) {
    errors.direccio = "La direcció d'enviament és obligatòria";
  }

  if (dades.poblacio.trim().length < 2) {
    errors.poblacio = 'La població és obligatòria';
  }

  if (!/^\d{5}$/.test(dades.codiPostal.trim())) {
    errors.codiPostal = 'El codi postal ha de tenir exactament 5 dígits';
  }

  const targetaNeta = dades.targeta.replace(/\s/g, '');
  if (!/^\d{16}$/.test(targetaNeta)) {
    errors.targeta = 'La targeta ha de tenir 16 dígits numèrics';
  }

  return errors;
}

export default function Compra({ carro, onFinalitzarComanda }: CompraProps) {
  const navigate = useNavigate();

  const [dades, setDades] = useState<Dades>(BUIT);
  const [errors, setErrors] = useState<Errors>({});

  // Si el carro està buit, no es pot realitzar la compra
  if (carro.length === 0) {
    return (
      <div className={styles.compraBuidContenidor}>
        <h2>No pots tramitar una comanda buida</h2>
        <p>Afegeix algun producte al teu carro abans de procedir al pagament.</p>
        <Link to="/cataleg" className={styles.botoExplorar}>
          Anar al Catàleg
        </Link>
      </div>
    );
  }

  const total = carro.reduce(
    (acc, item) => acc + item.producte.preu * item.quantitat,
    0
  );

  // Un sol manegador genèric per actualitzar qualsevol camp de l'estat
  function canvia<Camp extends keyof Dades>(camp: Camp, valor: Dades[Camp]) {
    setDades({ ...dades, [camp]: valor });
    // Si hi havia un error en aquest camp, el netegem en escriure
    if (errors[camp]) {
      setErrors({ ...errors, [camp]: undefined });
    }
  }

  function envia(esdeveniment: React.FormEvent<HTMLFormElement>) {
    esdeveniment.preventDefault();

    const trobats = validar(dades);
    setErrors(trobats);

    // només finalitzem la comanda si NO hi ha cap error
    if (Object.keys(trobats).length === 0) {
      onFinalitzarComanda();
      navigate('/confirmacio');
    }
  }

  return (
    <div className={styles.compraContenidor}>
      <h1 className={styles.titol}>Dades de la Comanda</h1>

      <div className={styles.compraLayout}>
        <form className={styles.formulari} onSubmit={envia} noValidate>
          <div className={styles.seccioForm}>
            <h2>1. Dades Personals i d'Enviament</h2>

            <div className={styles.camp}>
              <label htmlFor="nom">Nom i Cognoms *</label>
              <input
                id="nom"
                type="text"
                value={dades.nom}
                onChange={(e) => canvia('nom', e.target.value)}
                className={errors.nom ? styles.inputError : ''}
                placeholder="Ex. Alexandra Raymi"
              />
              {errors.nom && <p className={styles.textError}>{errors.nom}</p>}
            </div>

            <div className={styles.camp}>
              <label htmlFor="correu">Correu Electrònic *</label>
              <input
                id="correu"
                type="email"
                value={dades.correu}
                onChange={(e) => canvia('correu', e.target.value)}
                className={errors.correu ? styles.inputError : ''}
                placeholder="prat@example.com"
              />
              {errors.correu && <p className={styles.textError}>{errors.correu}</p>}
            </div>

            <div className={styles.camp}>
              <label htmlFor="direccio">Direcció d'Enviament *</label>
              <input
                id="direccio"
                type="text"
                value={dades.direccio}
                onChange={(e) => canvia('direccio', e.target.value)}
                className={errors.direccio ? styles.inputError : ''}
                placeholder="Carrer Major, 12, At. 2a"
              />
              {errors.direccio && <p className={styles.textError}>{errors.direccio}</p>}
            </div>

            <div className={styles.filaFila}>
              <div className={styles.camp}>
                <label htmlFor="poblacio">Població *</label>
                <input
                  id="poblacio"
                  type="text"
                  value={dades.poblacio}
                  onChange={(e) => canvia('poblacio', e.target.value)}
                  className={errors.poblacio ? styles.inputError : ''}
                  placeholder="Barcelona"
                />
                {errors.poblacio && <p className={styles.textError}>{errors.poblacio}</p>}
              </div>

              <div className={styles.camp}>
                <label htmlFor="codiPostal">Codi Postal *</label>
                <input
                  id="codiPostal"
                  type="text"
                  value={dades.codiPostal}
                  onChange={(e) => canvia('codiPostal', e.target.value)}
                  className={errors.codiPostal ? styles.inputError : ''}
                  placeholder="08901"
                  maxLength={5}
                />
                {errors.codiPostal && <p className={styles.textError}>{errors.codiPostal}</p>}
              </div>
            </div>
          </div>

          <div className={styles.seccioForm}>
            <h2>2. Pagament amb Targeta</h2>

            <div className={styles.camp}>
              <label htmlFor="targeta">Número de Targeta *</label>
              <input
                id="targeta"
                type="text"
                value={dades.targeta}
                onChange={(e) => canvia('targeta', e.target.value)}
                className={errors.targeta ? styles.inputError : ''}
                placeholder="1234567891011121"
                maxLength={19}
              />
              {errors.targeta && <p className={styles.textError}>{errors.targeta}</p>}
            </div>
          </div>

          <div className={styles.accionsForm}>
            <Link to="/carro" className={styles.botoTornar}>
              &larr; Tornar al Carro
            </Link>
            <button type="submit" className={styles.botoFinalitzar}>
              Finalitzar i Pagar ({total.toFixed(2)} €)
            </button>
          </div>
        </form>

        {/* Resum lateral de la comanda */}
        <div className={styles.resumCaixa}>
          <h2>Resum de la Comanda</h2>
          <div className={styles.resumLlista}>
            {carro.map((item) => (
              <div key={item.producte.id} className={styles.resumItem}>
                <div>
                  <span className={styles.resumNom}>{item.producte.nom}</span>
                  <span className={styles.resumQuantitat}> x {item.quantitat}</span>
                </div>
                <span>{(item.producte.preu * item.quantitat).toFixed(2)} €</span>
              </div>
            ))}
          </div>
          <div className={styles.resumTotal}>
            <span>Total a Pagar</span>
            <strong>{total.toFixed(2)} €</strong>
          </div>
        </div>
      </div>
    </div>
  );
}