import React from 'react'
import './high_bar.css'
import { cryptos } from './crypto'
import { Link } from 'react-router-dom'
export default function high_bar() {
  return (
   
    
      
        <div className="high-bar" >
        {cryptos.map(crypto => (
          <Link to={`/crypto/${crypto.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
        <div key={crypto.id} className="crypto-card">
        <img src={crypto.imagen} alt={crypto.nombre} width="30" />
        <div>
          <h3>{crypto.nombre} ({crypto.simbolo})</h3>
          <p>Precio: ${crypto.precio.toLocaleString()}</p>
          
       
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
