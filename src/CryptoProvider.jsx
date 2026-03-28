import React, { createContext, useState, useEffect, useContext } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
     const [crypto, setCrypto] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     const updatePrice = () => {
          fetch('http://localhost:4000/market/bitcoin')
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
          updatePrice(); l
          const interval = setInterval(updatePrice, 60000); 
          return () => clearInterval(interval);
     }, []);

return (
    <CryptoContext.Provider value={{ crypto, loading, error }}>
      {children}
    </CryptoContext.Provider>
  );
};
