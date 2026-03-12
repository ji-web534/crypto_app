import { useParams } from 'react-router-dom';
import { cryptos } from './crypto'
import "./details-bar.css"
export  function Details_bar() {
     const { id } = useParams();
const moneda = cryptos.find((c) => Number(c.id) === Number(id));
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
