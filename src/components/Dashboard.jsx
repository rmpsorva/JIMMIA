import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
// Asegúrate de importar tus servicios para leer el balance SPL y el precio de CMC
// import { fetchJimmyAPrice } from '../services/cmcService'; 
// import { fetchSPLBalance } from '../services/solanaService'; 


function Dashboard() {
  const { connected, publicKey } = useWallet();
  
  // Usamos el precio de la imagen como placeholder inicial: $0.00001813
  const [precioCMC, setPrecioCMC] = useState(0.00001813); 
  const [miBalance, setMiBalance] = useState(0); 
  
  // --- Lógica JavaScript ---
  
  useEffect(() => {
    // Si el usuario está conectado, cargamos el balance y el precio en tiempo real
    if (connected && publicKey) {
      // **AQUÍ VA LA IMPLEMENTACIÓN REAL DEL FETCH DE DATOS**
      // const price = await fetchJimmyAPrice(import.meta.env.VITE_CMC_API_KEY);
      // const balance = await fetchSPLBalance(publicKey);
      
      // PLACEHOLDERS para fines de la demo:
      setMiBalance(4500); // Ejemplo: 4500 $JIMMYA
      setPrecioCMC(0.00001813); // Precio de la imagen

    } else {
      // Mantiene el último precio conocido incluso desconectado
      setPrecioCMC(0.00001813);
      setMiBalance(0);
    }
  }, [connected, publicKey]);

  // Cálculo de Empanadas (500 JIMMYA por empanada)
  const JIMMYA_POR_EMPANADA = 500;
  const empanadasDisponibles = Math.floor(miBalance / JIMMYA_POR_EMPANADA);

  // Función placeholder para la transacción de compra
  const handleBuyEmpanada = () => {
    console.log("Iniciando transacción para el sabor prohibido...");
    // TODO: Implementar la firma de la transacción de Solana aquí
  };

  // --- HTML/JSX de la Interfaz ---
  
  return (
    <div className="dashboard-cocina-digital">
      
      {!connected && (
        <div className="alerta-sabor-prohibido">
          <h2>⚠️ ¡JimmyA necesita su Phantom!</h2>
          <p>Sin tu llave digital, ¡no hay acceso a los ingredientes secretos! Conecta tu billetera.</p>
        </div>
      )}

      {/* Interfaz cuando está conectado */}
      {connected && (
        <>
          <h1>🧑‍🍳 La Cocina Digital de JimmyA</h1>
          
          {/* Tarjeta de Precio en Tiempo Real */}
          <div className="card-cripto-sabor">
            <h3>VALOR DE CAMBIO POR EMPANADA DIGITAL</h3>
            <p className="precio-real-cmc">
              {`$${precioCMC.toFixed(8)} USD`} 
              <span className="cambio-diario"> (FDV: $1.81K)</span> 
            </p>
          </div>
          
          {/* Tarjeta de Balance y Empanadas */}
          <div className="card-inventario">
            <img src="/assets/jimmy-cyborg.png" alt="JimmyA Cyborg" className="logo-jimmy-comic" /> 
            <h3>TU INVENTARIO DE HARINA DIGITAL ($JIMMYA)</h3>
            <p className="balance-jimmy">
              {`${miBalance} JIMMYA`}
            </p>
            <p className="equivalente-empanadas">
              ¡Esto te alcanza para **{empanadasDisponibles}** Empanadas Secretas!
            </p>
          </div>
          
          {/* Botón de Pago Único (Transacción) */}
          <button 
            className="btn-sabor-prohibido" 
            disabled={empanadasDisponibles === 0}
            onClick={handleBuyEmpanada}
          >
            {empanadasDisponibles > 0 
              ? "¡FIRMA AQUÍ PARA EL SABOR PROHIBIDO! (Paga 500 $JIMMYA)" 
              : "¡NECESITAS MÁS JIMMYA PARA COCINAR!"}
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;
