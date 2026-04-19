import React, { useState, useEffect } from 'react'
import './main-screen.css'
import { useCrypto } from './CryptoProvider.jsx'
import { useParams } from 'react-router-dom' 
import { Details_bar } from './Details-bar';
import { Coin_value } from './Coin-value.jsx'; 
import CryptoChart from './CryptoChart.jsx';

export default function Main_screen() {
    const { crypto, loading: cryptoLoading } = useCrypto(); 
    const { id } = useParams();
    
    // ESTADOS para el gráfico
    const [chartData, setChartData] = useState([]);
    const [loadingChart, setLoadingChart] = useState(true);

    const moneda = crypto.find((c) => String(c.id) === String(id));

    // EFECTO para buscar los datos cuando cambia la moneda (el ID)
    useEffect(() => {
        setChartData([]);
        const fetchHistory = async () => {
            try {
                setLoadingChart(true);
                const response = await fetch(`http://localhost:4000/market/history/${id}`);
                
                // ¡IMPORTANTE! Validar si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.status}`);
                }

                const data = await response.json();
                
                // ¡IMPORTANTE! Validar que 'data' sea un array antes de transformarlo
                if (Array.isArray(data)) {
                    // Transformamos los datos a un formato que el gráfico entienda
                    const formatted = data.map(item => ({
                        time: item.fecha, 
                        value: item.precio 
                    }));

                    // FILTRO ANTI-DUPLICADOS: La librería falla si hay dos fechas iguales.
                    // También ordenamos por fecha para asegurar que la línea se dibuje bien.
                    const uniqueData = formatted
                        .filter((v, i, a) => a.findIndex(t => t.time === v.time) === i)
                        .sort((a, b) => new Date(a.time) - new Date(b.time));

                    // Guardamos los datos limpios en el estado
                    setChartData(uniqueData);

                } else {
                    console.error("Los datos recibidos no son un array:", data);
                    setChartData([]); 
                }

            } catch (error) {
                console.error("Error cargando historial:", error);
                setChartData([]); 
            } finally {
                setLoadingChart(false);
            }
        };

        if (id) fetchHistory();
    }, [id]); // Solo se ejecuta cuando el ID de la URL cambia

    // Validaciones de UI
    if (cryptoLoading) return <p>Cargando datos de la API...</p>;
    
    if (!moneda) {
        return (
            <div style={{ padding: "20px", color: "red" }}>
                <h2>Error: Moneda no encontrada</h2>
                <p>Buscamos el ID: {id}</p>
            </div>
        );
    }

    return (
        <div className="main-screen">
            <div> 
                <Details_bar moneda={moneda} />

                <div>
                    <div className="chart-wrapper">
                        {loadingChart ? (
                            <p>Cargando gráfico...</p> 
                        ) : (
                            <CryptoChart data={chartData} /> 
                        )}
                    </div>
                </div>

                <Coin_value moneda={moneda}/>
            </div>
        </div>
    )
}