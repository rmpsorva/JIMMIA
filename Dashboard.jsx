import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

function Dashboard() {
  const { connected, publicKey } = useWallet();
  const [precioCMC, setPrecioCMC] = useState(0.00001813);
  const [miBalance, setMiBalance] = useState(0);

  useEffect(() => {
    if (connected && publicKey) {
      setMiBalance(4500);
      setPrecioCMC(0.00001813);
    } else {
      setMiBalance(0);
    }
  }, [connected, publicKey]);

  const JIMMYA_POR_EMPANADA = 500;
  const empanadasDisponibles = Math.floor(miBalance / JIMMYA_POR_EMPANADA);

  return (
    <div className="dashboard-cocina-digital">
      {!connected ? (
        <div className="alerta-sabor-prohibido">
          <h2>⚠️ ¡JimmyA necesita su Phantom!</h2>
          <p>Conecta tu billetera para cocinar empanadas.</p>
        </div>
      ) : (
        <>
          <h1>🧑‍🍳 La Cocina Digital de JimmyA</h1>
          <div className="card-cripto-sabor">
            <h3>VALOR POR EMPANADA DIGITAL</h3>
            <p>${precioCMC.toFixed(8)} USD</p>
          </div>
          <div className="card-inventario">
            <h3>TU INVENTARIO</h3>
            <p>{miBalance} JIMMYA</p>
            <p>{empanadasDisponibles} Empanadas Secretas</p>
          </div>
          <button disabled={empanadasDisponibles === 0}>
            ¡COCINAR AHORA!
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;