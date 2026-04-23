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
   const chart = LightweightCharts.createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
            layout: {
                background: { color: '#131722' },
                textColor: '#d1d4dc',
            },
        });

        try {
            // La serie se crea AQUÍ ADENTRO usando la constante 'chart'
            const areaSeries = chart.addAreaSeries({
                lineColor: '#2962ff',
                topColor: '#2962ff',
                bottomColor: 'rgba(41, 98, 255, 0.28)',
            });

            areaSeries.setData(data);
            chart.timeScale().fitContent();
        } catch (err) {
            console.error("❌ Error al añadir la serie:", err);
        }

        return () => chart.remove(); // Limpieza al salir
    }, [data]);

return (
    <div
        ref={chartContainerRef}
        className="crypto-chart-container"
        style={{ position: 'relative', width: '100%', minHeight: '300px' }}
    />
);
}
