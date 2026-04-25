import { useParams } from 'react-router-dom';
import "./details-bar.css"

import {useCrypto} from './components/CryptoProvider.jsx'

export function Details_bar({ moneda }) { 
    // Si moneda no llega (por si acaso), evitamos que explote
    if (!moneda) return null; 

    return (
        <div className="details-bar">
            <h1>{moneda.name}</h1>
            <p>Precio: {moneda.price_usd}</p>
        </div>
    );
}
