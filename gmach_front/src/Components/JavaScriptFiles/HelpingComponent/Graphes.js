import * as React from 'react';
import { useEffect, useRef } from 'react';
import Chart from "chart.js/auto";
import Bar from './Bar';

export default function Graphes() {
    //Canvas 1 :
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // Add a reference to the chart instance
    //Canvas 2 :
    const chart2Ref = useRef(null);
    const chart2InstanceRef = useRef(null); // Add a reference to the second chart instance

    useEffect(() => {
        const xValues = ["Yanuar", "Februar", "Merch", "April"];
        const yValues = [55, 49, 44, 24];
        const barColors = ["rgb(0, 32, 96)", "rgb(223, 221, 53)", "rgba(0, 32, 96, 0.5)", "rgba(223, 221, 53, 0.5)"];

        if (chartRef.current) {
            // Destroy the existing chart if it exists
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // Create a new chart instance
            chartInstanceRef.current = new Chart(chartRef.current, {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: "Number of people who take loans from 'PlusMinus' in the last quarter"
                        }
                    }
                }
            });
        }



        //Canvas 2 :

        const x2Values = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
        const y2Values = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

        if (chart2Ref.current) {
            // Destroy the existing second chart if it exists
            if (chart2InstanceRef.current) {
                chart2InstanceRef.current.destroy();
            }

            // Create a new second chart instance
            chart2InstanceRef.current = new Chart(chart2Ref.current, {
                type: "line",
                data: {
                    labels: x2Values,
                    datasets: [{
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgb(223, 221, 53)",
                        borderColor: "rgba(223, 221, 53, 0.5)",
                        data: y2Values
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            min: 6,
                            max: 16
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }
    }, []);

    return (
        <div>
            <Bar />,
            <div style={{ padding: "2%", width: "50%" }}></div>
            <canvas ref={chartRef} id="myChart" style={{ width: '100%', maxWidth: '500px', marginTop: "10%", height: "90px" }}></canvas>
            <canvas ref={chart2Ref} id="myChart2" style={{ width: '80%', maxWidth: '700px', height: "80px" }}></canvas>
        </div>
    )
}
