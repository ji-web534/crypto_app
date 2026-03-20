import React, { useState, useEffect } from 'react';
// <-- fetch sin terminar 
 export const Crypto = ({ coinName }) => {
const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Solo pedimos la lista completa una vez
    fetch('http://localhost:4000/market/all')
      .then(res => {
        if (!res.ok) throw new Error("Error en la red");
        return res.json();
      })
      .then(data => {
        setCryptos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Retornamos los datos para que el componente padre los use
  return { cryptos, loading, error };
};