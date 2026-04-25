import { useState, useEffect } from 'react';

export const useCrypto = () => {
  // 1. Cambiamos el estado inicial a 'null' o un objeto, ya que no recibimos una lista
  const [crypto, setCrypto] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. Usamos la URL que configuramos en el servidor (CoinGecko)
    fetch('http://localhost:4000/market/bitcoin')
      .then(res => {
        if (!res.ok) throw new Error("No se pudo conectar con el servidor local");
        return res.json();
      })
      .then(data => {
        // 3. 'data' ahora contiene { mensaje, nombre, precioActual, datosCompletos }
        console.log("Datos recibidos del server:", data);
        setCrypto(data); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error en el fetch del front:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { crypto, loading, error };
};