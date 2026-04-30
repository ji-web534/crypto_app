import React, { useEffect, useRef, useState } from 'react';
import * as LightweightCharts from 'lightweight-charts';

export default function CryptoChart({ data }) {
    const chartContainerRef = useRef();
    const chartRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // 1. Solo inicializamos si el contenedor tiene dimensiones reales
        if (chartContainerRef.current.clientWidth === 0) {
            const timeoutId = setTimeout(() => setIsReady(prev => !prev), 100);
            return () => clearTimeout(timeoutId);
        }

        try {
            // 2. Limpieza de seguridad
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
            chartContainerRef.current.innerHTML = '';

            // 3. Creación del gráfico
            const chart = LightweightCharts.createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                layout: {
                    background: { color: '#131722' },
                    textColor: '#d1d4dc',
                },
                timeScale: {
                    borderVisible: false,
                },
            });
            chartRef.current = chart;

            // 4. Creación de la serie usando el método de compatibilidad
            const areaSeries = chart.addAreaSeries({
                lineColor: '#2962ff',
                topColor: '#2962ff',
                bottomColor: 'rgba(41, 98, 255, 0.28)',
                lineWidth: 2,
            });

            // 5. Procesamiento de datos ultra-estricto (Anti-Assertion)
            if (data && data.length > 0) {
                const seenTimes = new Set();
                const cleanData = data
                    .map(item => ({
                        // Aseguramos segundos y números primitivos
                        time: Number(item.time) > 10000000000 ? Math.floor(Number(item.time) / 1000) : Math.floor(Number(item.time)),
                        value: parseFloat(item.value)
                    }))
                    .filter(item => {
                        if (isNaN(item.time) || isNaN(item.value) || seenTimes.has(item.time)) return false;
                        seenTimes.add(item.time);
                        return true;
                    })
                    .sort((a, b) => a.time - b.time);

                if (cleanData.length > 0) {
                    areaSeries.setData(cleanData);
                    chart.timeScale().fitContent();
                }
            }

            setIsReady(true);
        } catch (error) {
            console.error("❌ Error en el montaje del gráfico:", error);
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, [data, isReady]); // Re-ejecuta si los datos cambian o si el estado de listo cambia

    return (
        <div 
            ref={chartContainerRef} 
            style={{ 
                width: '100%', 
                height: '300px', 
                backgroundColor: '#131722',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }} 
        >
            {!chartRef.current && <span style={{ color: '#555' }}>Iniciando motor gráfico...</span>}
        </div>
    );
}