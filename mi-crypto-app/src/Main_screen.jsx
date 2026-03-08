import React from 'react'
import './main_screen.css'
import { cryptos } from './crypto'
export default function main_screen() {
  return (
    <div className="main-screen">
      {cryptos.map((crypto) => (
  <div key={crypto.id} className="crypto_main_card">
    <div className="coin_info">
      <img src={crypto.imagen} alt={crypto.nombre} width="40" />
      <div>
        <h3>{crypto.nombre} <span>{crypto.simbolo}</span></h3>
        <p>Vol: {crypto.volumen_24h}</p>
      </div>
    </div>

    {/* Gráfico de tendencia */}
    <div className="crypto_chart">
      <img 
        src={crypto.grafico} 
        alt="trend" 
        style={{ 
        
          filter: crypto.cambio_24h > 0 
            ? 'hue-rotate(80deg) saturate(5)' 
            : 'hue-rotate(300deg) saturate(5)' 
        }} 
      />
    </div>

    <div className="coin_price">
      <p className="price_val">${crypto.precio.toLocaleString()}</p>
      <p className={crypto.cambio_24h > 0 ? 'up' : 'down'}>
        {crypto.cambio_24h}%
      </p>
    </div>
  </div>
))}
    </div>
  )
}
