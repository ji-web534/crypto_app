import React, { createContext, useState, useEffect, useContext } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
     const [crypto, setCrypto] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     const updatePrice = () => {
          fetch('http://localhost:4000/market/all')
               .then(res => res.json())
               .then(data => {
                    setCrypto(data);
                    setLoading(false);
               })
               .catch(err => {
                    setError(err.message);
                    setLoading(false);
               });
     };

     useEffect(() => {
          updatePrice(); 
          const interval = setInterval(updatePrice, 60000); 
          return () => clearInterval(interval);
     }, []);

return (
    <CryptoContext.Provider value={{ crypto, loading, error }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
     const context = useContext(CryptoContext);
     if (!context) {
          throw new Error("useCrypto debe usarse dentro de un proveedor Crypto");
     }
     return context;};
