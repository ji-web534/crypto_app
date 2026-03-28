import React from 'react'
import './main-screen.css'
import {Crypto} from './CryptoProvider.jsx'
import { useParams } from 'react-router-dom' 
import { Details_bar } from './Details-bar';
import { Coin_value } from './Coin-value.JSX';

export default function Main_screen() {
 const { id } = useParams();
const moneda = Crypto.find((c) => Number(c.id) === Number(id));

if (!moneda) {
 return (
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Error: Moneda no encontrada</h2>
        <p>Buscamos el ID: {id}</p>
        <p>IDs disponibles: {crypto.map(c => c.id).join(", ")}</p>
      </div>
    );
  }

  return (
     <div className="main-screen">
      
      <div> 
        
        <Details_bar  />

        <div >
          <img className="crypto_chart"
            src={moneda.grafico} 
            alt="trend" 
            style={{ 
              filter: moneda.cambio_24h > 0 
                ? 'hue-rotate(80deg) saturate(5)' 
                : 'hue-rotate(300deg) saturate(5)' 
            }} 
          />
        </div>

      <Coin_value/>

      </div>
    </div>
  )
  
}
