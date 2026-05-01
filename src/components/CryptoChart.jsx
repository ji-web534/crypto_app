import React, { useEffect, useRef, useState } from 'react';
// Importamos las funciones por separado para que Vite no las pierda
import { createChart, SeriesType } from 'lightweight-charts';

export default function CryptoChart({ data }) {
    const chartContainerRef = useRef();
    const chartRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Si el contenedor no tiene ancho, esperamos un poco
        if (chartContainerRef.current.clientWidth === 0) {
            const timeoutId = setTimeout(() => setIsReady(prev => !prev), 100);
            return () => clearTimeout(timeoutId);
        }

        try {
            if (chartRef.current) {
                chartRef.current.remove();
            }
            chartContainerRef.current.innerHTML = '';

            // 1. Crear el gráfico base
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                layout: { background: { color: '#131722' }, textColor: '#d1d4dc' },
            });
            chartRef.current = chart;

            // 2. LA CLAVE: Usar el método genérico addSeries con el tipo explícito
            // Esto evita buscar 'addAreaSeries' en el objeto chart
            const areaSeries = chart.addSeries(SeriesType.Area, {
                lineColor: '#2962ff',
                topColor: '#2962ff',
                bottomColor: 'rgba(41, 98, 255, 0.28)',
            });

            // 3. Procesar datos (asegurando que sean los del dashboard de criptos)
            if (data && data.length > 0) {
                const seenTimes = new Set();
                const cleanData = [...data]
                    .map(item => ({
                        // Corrección de timestamps para Windows/Vite
                        time: Number(item.time) > 10000000000 ? Math.floor(Number(item.time) / 1000) : Math.floor(Number(item.time)),
                        value: parseFloat(item.value)
                    }))
                    .filter(item => {
                        if (isNaN(item.time) || isNaN(item.value) || seenTimes.has(item.time)) return false;
                        seenTimes.add(item.time);
                        return true;
                    })
                    .sort((a, b) => a.time - b.time);

                areaSeries.setData(cleanData);
                chart.timeScale().fitContent();
            }

        } catch (error) {
            console.error("❌ Error con SeriesType:", error);
            // Si SeriesType falla por la exportación, usamos el string como último recurso
            try {
                const fallbackSeries = chartRef.current.addSeries('Area', { lineColor: '#2962ff' });
                console.log("Se usó fallback de string con éxito");
            } catch (e) {
                console.error("Fallo total de la librería");
            }
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, [data, isReady]);

    return (
        <div 
            ref={chartContainerRef} 
            style={{ width: '100%', height: '300px', backgroundColor: '#131722' }} 
        />
    );
}