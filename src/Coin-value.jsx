import React from 'react'
import"./coin-value.css"
import { useParams } from 'react-router-dom';
import { cryptos } from './crypto';
export  function Coin_value() {
  const { id } = useParams();
const moneda = cryptos.find((c) => Number(c.id) === Number(id));

  return (
    <div className='Coin-value'style={{ color: moneda. cambio_24h >= 0 ? 'green' : 'red' }}>
       <div >
    
          <p > precio:${moneda.precio.toLocaleString()}</p>
          </div>
          <p className={moneda.cambio_24h > 0 ? 'up' : 'down'}>
            {moneda.cambio_24h}% en las últimas 24hs
          </p>
        

   
        <div >
          <p  > {moneda.descripcion}</p>
        </div>
    </div>
  )
}
