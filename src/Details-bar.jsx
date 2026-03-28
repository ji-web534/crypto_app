import { useParams } from 'react-router-dom';
import "./details-bar.css"

import {Crypto} from './CryptoProvider.jsx'

export  function Details_bar() {
     const { id } = useParams();
const moneda =  Crypto.find((c) => Number(c.id) === Number(id));
  return (
    <div>
     <div className="Details-bar">
   
          <img src={moneda.imagen} alt={moneda.nombre} width="60" />
          <div>
            <h3>{moneda.nombre} <span>{moneda.simbolo}</span></h3>
            
            <p>Volumen 24h: {moneda.volumen_24h}</p>
              
          </div>
       
        </div> 
    </div>
  )
}
