import * as React from 'react';
import { useEffect, useRef } from 'react';
import Chart from "chart.js/auto";
import Bar from './Bar';
import "../../../CSSFiles/StylePage.css";
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Footer from './Footer';



export default function Graphes() {

    const sections = [
        { title: 'About us', url: '/AboutUs' },//Blog1- talking about the company.
        { title: 'Activity', url: '/Graphes' }, //Grafes- show the activity in company in grafs.
        //{ title: 'Searches', url: '/Searches' }, //Blog2- talking about searches in economy.
       // { title: 'Our services', url: '/Services' },//Blog3- talking about the services that we give.
        { title: 'Contact us', url: '/ContactUs' },//Blog4- details how to contact us.
        { title: 'Articles', url: '/Articles' },//Articles that talking about economy etc.
    ];

    //Canvas 1 :
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // Add a reference to the chart instance
    //Canvas 2 :
    const chart2Ref = useRef(null);
    const chart2InstanceRef = useRef(null); // Add a reference to the second chart instance

    useEffect(() => {
        const xValues = ["Yanuar", "Februar", "Merch", "April"];
        const yValues = [55, 42, 49, 33];
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
                            text: ""
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
            <div style={{ zIndex: "99", height: "5%", backgroundColor:"rgba(0, 32, 96, 0.5)", marginTop: "9%", color: "rgb(223, 221, 53)", position: "fixed", width: "100%", padding: "1%"}}>
                <Toolbar
                    component="nav"
                    variant="dense"
                    sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
                >
                    {sections.map((section) => (
                        <Link
                            color="inherit"
                            noWrap
                            key={section.title}
                            variant="body2"
                            href={section.url}
                            sx={{ p: 1, flexShrink: 0 }}
                        >
                            {section.title}
                        </Link>
                    ))}
                </Toolbar>
            </div>
            <div style={{ padding: "2%", width: "80%", display: "flex", flexWrap: "nowrap",alignContent: " space-between" }}></div>
            <div className="p_chart" >
                <p ><em><strong>Number of people who take loans from 'PlusMinus' in the last quarter</strong></em></p>
            </div>
            <canvas ref={chartRef} id="myChart" style={{ width: '90%', maxWidth: '90%', margin: "3%", height: "90px" }}></canvas>

            <div className="p_chart">
                <p  ><em><strong>The average loan amount in the last quarter</strong></em></p>
            </div>
            <canvas ref={chart2Ref} id="myChart2" style={{ width: '90%', maxWidth: '90%', height: "80px", margin: "3%" }}></canvas>
        <Footer/>
        </div>
    )
}
