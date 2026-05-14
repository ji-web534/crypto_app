import { useParams } from 'react-router-dom';
import "./details-bar.css"
export function Details_bar({ moneda }) { 
    // Si moneda no llega (por si acaso), evitamos que explote
    if (!moneda) return null; 

    return (
        <div className="Details-bar">
            <h1>{moneda.name}</h1>
            <p>Precio: {moneda.precio}</p>
        </div>
    );
}
