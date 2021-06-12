import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

  // Definir state
  const [presupuesto, setPresupuesto] = useState(0);
  const [restante, setRestante] = useState(0);
  const [mostrarpregunta, setPregunta] = useState(true);
  const [gastos, setGastos] = useState([]);
  const [gasto, setGasto] = useState({});
  const [creargasto, setCrearGasto] = useState(false);

  // UseEffect que actualiza el restante
  useEffect(() => {
    // Agrega el nuevo presupuesto
    if(creargasto) {
      setGastos([
        ...gastos,
        gasto
      ]);

      // resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      setRestante(presupuestoRestante);

      // Resetear a false
      setCrearGasto(false);

    }
  }, [gasto, creargasto, gastos, restante]);

  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>

        <div className="contenido-principal contenido">
          { mostrarpregunta ? 
            (
              <Pregunta 
                setPresupuesto={setPresupuesto}
                setRestante={setRestante}
                setPregunta={setPregunta}
              />
            ) : 
            (
              <div className="row">
                <div className="one-half column">
                  <Formulario
                    setGasto={setGasto}
                    setCrearGasto={setCrearGasto}
                  />
                </div>

                <div className="one-half column">
                  <Listado 
                    gastos={gastos}
                  />

                  <ControlPresupuesto
                    presupuesto={presupuesto}
                    restante={restante}
                  />
                </div>
              </div>
            )
          }
        </div>
      </header>
    </div>
  );
}

export default App;
