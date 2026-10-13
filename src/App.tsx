import { useState } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import Inici from './pagines/Inici';
import Capcalera from './components/Capcalera';
import Cataleg from './pagines/Cataleg';
import FitxaProducte from './pagines/FitxaProducte' ;
import Carro from './pagines/Carro';
import Compra from './pagines/Compra';
import Confirmacio from './pagines/Confirmacio';
import Peu from './components/Peu';
import { Producte, LiniaCarro } from './tipus';

export default function App() {
  const [carro, setCarro] = useState<LiniaCarro[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const cercaActual = searchParams.get('cerca') || '';

  // Actualitza la cerca a la URL quan s'escriu a la capçalera
  const handleCanviCerca = (nouText: string) => {
    if (nouText) {
      searchParams.set('cerca', nouText);
    } else {
      searchParams.delete('cerca');
    }
    setSearchParams(searchParams);
    
    // Si no som al catàleg, redirigim automàticament
    if (window.location.pathname !== '/cataleg' && window.location.pathname !== '/') {
      navigate(`/cataleg?${searchParams.toString()}`);
    }
  };

  // Funció x afegir al carro
  const handleAfegirAlCarro = (producte: Producte) => {
    setCarro((carroAnterior) => {
      const liniaExistent = carroAnterior.find((l) => l.producte.id === producte.id);
      if (liniaExistent) {
        return carroAnterior.map((l) =>
          l.producte.id === producte.id
            ? { ...l, quantitat: Math.min(l.quantitat + 1, producte.estoc) }
            : l
        );
      }
      return [...carroAnterior, { producte, quantitat: 1 }];
    });
  };

  // Unitats totals x al globus de la capçalera
  const totalUnitatsCarro = carro.reduce((acc, l) => acc + l.quantitat, 0);

  // Funcions x gestionar el carro
  const handleCanviarQuantitat = (id: string, novaQuantitat: number) => {
    setCarro((prevCarro) =>
      prevCarro.map((item) =>
        item.producte.id === id ? { ...item, quantitat: novaQuantitat } : item
      )
    );
  };

  const handleEliminarDelCarro = (id: string) => {
    setCarro((prevCarro) => prevCarro.filter((item) => item.producte.id !== id));
  };

  const handleBuidarCarro = () => {
    setCarro([]);
  };

  const handleFinalitzarComanda = () => {
    setCarro([]);
  };

  return (
    <div className="app-contenidor">
      
      <Capcalera
        cerca={cercaActual}
        onCanviCerca={handleCanviCerca}
        totalUnitatsCarro={totalUnitatsCarro}
      />

    <Routes>
      <Route path="/" element={<Inici onAfegirAlCarro={handleAfegirAlCarro} />} />
      <Route path="/cataleg" element={<Cataleg onAfegirAlCarro={handleAfegirAlCarro} />} />
      <Route path="/producte/:id" element={<FitxaProducte onAfegirAlCarro={handleAfegirAlCarro} />} />
      <Route
        path="/carro"
        element={
          <Carro
            carro={carro}
            onCanviarQuantitat={handleCanviarQuantitat}
            onEliminar={handleEliminarDelCarro}
            onBuidarCarro={handleBuidarCarro}
          />
        }
      />
      <Route path="/compra" element={<Compra carro={carro} onFinalitzarComanda={handleFinalitzarComanda} />} />
      <Route path="/confirmacio" element={<Confirmacio />} />
      <Route path="*" element={<div style={{ padding: '3rem', textAlign: 'center' }}>Pàgina no trobada (404)</div>} />
    </Routes>

      <Peu/>

    </div>
  );
}