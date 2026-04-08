import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
//empezando el componente 
export default function Crypto_grafico({ data }) {
    const chartContainerRef = useRef(); 

    useEffect(() => {
        if (!data || data.length === 0) return;

       
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { color: '#131722' },
                textColor: '#d1d4dc',
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
            grid: {
                vertLines: { color: '#1f2937' },
                horzLines: { color: '#1f2937' },
            },
        });

   
        const areaSeries = chart.addAreaSeries({
            lineColor: '#2962FF',
            topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)',
            lineWidth: 2,
        });

      
        areaSeries.setData(data);

        e
        chart.timeScale().fitContent();

        return () => {
            chart.remove();
        };
    }, [data]); 

    return <div ref={chartContainerRef} style={{ width: '100%' }} />;
}