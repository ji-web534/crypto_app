import React from 'react'
import './side-bar.css'
import { useCrypto } from './CryptoProvider.jsx';
import { Link } from 'react-router-dom';
import { createChart } from 'lightweight-charts';
export default function Side_bar() {
  const { crypto, loading, error, } = useCrypto();
  //creamos la funcion que se encarga de el camio de color


  const definirColor24h = (variacion) => {
    if (variacion > 0) return '#22c55e'; // Un verde moderno
    if (variacion < 0) return '#ef4444'; // Un rojo moderno
    return '#94a3b8';                    // Gris si no hubo cambio
  };



  // Manejamos el estado de carga y error)
  if (loading) return <div className="side-bar">Cargando criptos...</div>;
  if (error) return <div className="side-bar">Error: {error}</div>;
  console.log("Estructura de la primera cripto:", crypto[0]);
  return (<div className="side-bar"  >
      <div className="buscador">
        <input
          type="text"
          className="buscador-input"
          placeholder="Buscar moneda..."
        />
      </div>
      {crypto.map(item => (
        <Link key={item.id} to={`/crypto/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
          <div className="crypto-card">
            <img src={item.image} alt={item.name} width="30" />
            <div className=''>

              <h3>{item.name} ({item.symbol})</h3>
              <p>Precio: ${item.current_price?.toLocaleString()}</p>



              <p style={{ color: definirColor24h(item.cambio_24h) }}>
                {item.cryptocambio_24h >= 0 ? '▲' : '▼'} {Math.abs(item.cambio_24h).toFixed(2)}%
              </p>

            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
