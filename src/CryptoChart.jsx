import React, { useEffect, useRef } from 'react';
import * as LightweightCharts from 'lightweight-charts';

export default function CryptoChart({ data }) {
const chartContainerRef = useRef(null);
console.log("cosa",data)
    useEffect(() => {
        // Validación de entrada
        if (!data || data.length === 0 || !chartContainerRef.current) {
            return;
        }

        // 1. Limpieza absoluta del contenedor
        chartContainerRef.current.innerHTML = '';

        // 2. Creación del objeto chart
        const chart = LightweightCharts.createChart(chartContainerRef.current, {
            layout: { 
                background: { color: '#131722' }, 
                textColor: '#d1d4dc' 
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
        });

        // 3. LA CLAVE: Verificamos la existencia del método antes de llamarlo
        if (typeof chart.addAreaSeries === 'function') {
            const areaSeries = chart.addAreaSeries({
                lineColor: '#2962FF',
                topColor: '#2962FF',
                bottomColor: 'rgba(41, 98, 255, 0.28)',
                lineWidth: 2,
            });

            areaSeries.setData(data);
            chart.timeScale().fitContent();
        } else {
            console.error("Error crítico: El objeto chart no tiene el método addAreaSeries. Métodos disponibles:", Object.keys(chart));
        }

        // 4. Manejo de redimensionado
        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data]);

    return (
        <div 
            ref={chartContainerRef} 
            style={{ width: '100%', height: '300px' }} 
        />
    );
}