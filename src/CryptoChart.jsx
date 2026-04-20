import React, { useEffect, useRef } from 'react';
import * as LightweightCharts from 'lightweight-charts';

export default function CryptoChart({ data }) {
    const chartContainerRef = useRef();
    const chartRef = useRef(); // Guardaremos la instancia del gráfico aquí

    useEffect(() => {
        // 1. Evitamos crear el gráfico si no hay contenedor o si no hay datos
        if (!chartContainerRef.current || !data || data.length === 0) return;

        chartContainerRef.current.innerHTML = '';
        // 2. CREACIÓN DEL GRÁFICO
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
            layout: {
                backgroundColor: '#131722',
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: { color: '#2f333e' },
                horzLines: { color: '#2f333e' },
            },
        });

        // 3. CREACIÓN DE LA SERIE (Aquí es donde estaba tu error)
        // El método se llama sobre la instancia 'chart' que acabamos de crear
        const areaSeries = chart.addAreaSeries({
            lineColor: '#2962ff',
            topColor: '#2962ff',
            bottomColor: 'rgba(41, 98, 255, 0.28)',
            lineWidth: 2,
        });

        // 4. PASAR LOS DATOS
        areaSeries.setData(data);

        // Ajustar el gráfico para que se vean todos los puntos
        chart.timeScale().fitContent();

        // Guardamos la referencia para poder limpiar
        chartRef.current = chart;

        // 5. LIMPIEZA (Fundamental en React para que no se dupliquen gráficos)
        return () => {
            chart.remove();
        };
    }, [data]); // Se vuelve a ejecutar solo si cambian los datos

    return (
        <div 
            ref={chartContainerRef} 
            className="crypto-chart-container" 
            style={{ position: 'relative', width: '100%' }}
        />
    );
}
