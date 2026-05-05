
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

export default function CryptoChart({ data }) {
    const chartContainerRef = useRef();
    const chartRef = useRef(null);
    const [ready, setReady] = useState(false);

    // Esperamos a que React termine de montar todo
    useEffect(() => {
        const timer = setTimeout(() => setReady(true), 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!ready || !chartContainerRef.current || !data || data.length === 0) return;

        // Limpiamos si ya existe algo
        if (chartRef.current) {
            chartRef.current.remove();
            chartRef.current = null;
        }
        chartContainerRef.current.innerHTML = '';

        try {
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth || 600,
                height: 300,
                layout: { background: { color: '#131722' }, textColor: '#d1d4dc' },
            });
            chartRef.current = chart;

            const areaSeries = chart.addAreaSeries({
                lineColor: '#2962ff',
                topColor: '#2962ff',
                bottomColor: 'rgba(41, 98, 255, 0.28)',
            });

            // Limpieza de duplicados (por el error del 3 de mayo que vimos)
            const seen = new Set();
            const cleanData = data
                .filter(item => {
                    if (seen.has(item.time)) return false;
                    seen.add(item.time);
                    return true;
                })
                .map(item => ({
                    time: item.time,
                    value: parseFloat(item.value)
                }))
                .sort((a, b) => new Date(a.time) - new Date(b.time));

            areaSeries.setData(cleanData);
            chart.timeScale().fitContent();

        } catch (err) {
            console.error("Error en el gráfico:", err);
        }

        return () => { if (chartRef.current) chartRef.current.remove(); };
    }, [ready, data]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />;
}