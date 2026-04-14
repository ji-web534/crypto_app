import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function CryptoChart({ data }) {
    const chartContainerRef = useRef();
   
    const chartRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0 || !chartContainerRef.current) return;

        chartRef.current = createChart(chartContainerRef.current, {
            layout: { 
                background: { color: '#131722' }, 
                textColor: '#d1d4dc' 
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
            grid: {
                vertLines: { color: '#2B2B43' },
                horzLines: { color: '#2B2B43' },
            },
        });

     
        const areaSeries = chartRef.current.addAreaSeries({
            lineColor: '#2962FF',
            topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)',
            lineWidth: 2,
        });

     
        areaSeries.setData(data);
        chartRef.current.timeScale().fitContent();

        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.applyOptions({ 
                    width: chartContainerRef.current.clientWidth 
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, [data]);

    return (
        <div
            ref={chartContainerRef}
            style={{ width: '100%', position: 'relative' }}
        />
    );
}