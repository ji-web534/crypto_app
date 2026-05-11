import React, { useEffect, useRef } from 'react';
import * as Charts from 'lightweight-charts';
import "./crypto-chart.css"
export default function CryptoChart({ data }) {
    const chartContainerRef = useRef();
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartContainerRef.current || !data || data.length === 0) return;

        // 1. Limpieza total del DOM
        chartContainerRef.current.innerHTML = '';
        if (chartRef.current) {
            chartRef.current.remove();
            chartRef.current = null;
        }

        // 2. Procesamiento de datos ultra-seguro (Números puros)
        const seen = new Set();
        const cleanData = data
            .map(item => ({
                time: Math.floor(new Date(item.time).getTime() / 1000),
                value: parseFloat(item.value)
            }))
            .filter(item => {
                // Filtramos duplicados  y valores nulos
                if (isNaN(item.time) || isNaN(item.value) || seen.has(item.time)) return false;
                seen.add(item.time);
                return true;
            })
            .sort((a, b) => a.time - b.time);

        if (cleanData.length === 0) return;

      try {
    // 3. Crear el gráfico
    const chart = Charts.createChart(chartContainerRef.current, {
        // Usamos el ancho total del contenedor, o 800 como base si falla
        width: chartContainerRef.current.clientWidth || 800, 
        
        // Bajamos el alto a 400 o 500 (900 era demasiado)
        height: 400, 
        
        layout: { 
            background: { color: '#131722' }, 
            textColor: '#d1d4dc' 
        },
    });
            chartRef.current = chart;

            // 4. El método más antiguo y compatible
            const series = chart.addLineSeries({
                color: '#2962ff',
                lineWidth: 2,
            });

            series.setData(cleanData);
            chart.timeScale().fitContent();

        } catch (err) {
            console.error("❌ Fallo definitivo:", err);
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.remove();

                chartRef.current = null
            }
        };
    }, [data]);

    return (
        <div 
            ref={chartContainerRef} 
            style={{ 
            width: '175%', 
            Height: '100%', 
          
        }}
        />
    );
}