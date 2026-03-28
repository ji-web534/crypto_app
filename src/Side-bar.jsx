import React from 'react'
import './side-bar.css'


import { useCrypto } from './crypto.jsx'
import { Link } from 'react-router-dom'
export default function Side_bar() {
  const { cryptos, loading, error } = useCrypto(); 

  // 2. Manejamos el estado de carga y error)
  if (loading) return <div className="side-bar">Cargando criptos...</div>;
  if (error) return <div className="side-bar">Error: {error}</div>;
  return (



    <div className="side-bar"  >
      <div class="buscador">
        <input
          type="text"
          class="buscador-input"
          placeholder="Buscar moneda..."
        />
      </div>
      {Crypto.map(crypto => (
        <Link to={`/crypto/${crypto.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
          <div key={crypto.id} className="crypto-card">
            <img src={crypto.imagen} alt={crypto.nombre} width="30" />
            <div className=''>

              <h3>{crypto.nombre} ({crypto.simbolo})</h3>
              <p>Precio: ${crypto.precio?.toLocaleString()}</p>


              <p style={{ color: crypto.cambio_24h >= 0 ? 'green' : 'red' }}>
                {crypto.cambio_24h >= 0 ? '▲' : '▼'} {Math.abs(crypto.cambio_24h)}%
              </p>

            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
