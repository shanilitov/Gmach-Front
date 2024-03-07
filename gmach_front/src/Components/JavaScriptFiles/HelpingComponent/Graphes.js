import * as React from 'react';
import { useEffect, useRef } from 'react';
import Chart from "chart.js/auto";
import Bar from './Bar';
import "../../../CSSFiles/StylePage.css";
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Footer from './Footer';
import { PieChart } from '@mui/x-charts/PieChart';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';



export default function Graphes() {

    const sections = [
        { title: 'About us', url: '/AboutUs' },//Blog1- talking about the company.
        { title: 'Activity', url: '/Graphes' }, //Grafes- show the activity in company in grafs.
        //{ title: 'Searches', url: '/Searches' }, //Blog2- talking about searches in economy.
        // { title: 'Our services', url: '/Services' },//Blog3- talking about the services that we give.
        { title: 'Contact us', url: '/ContactUs' },//Blog4- details how to contact us.
        { title: 'Articles', url: '/Articles' },//Articles that talking about economy etc.
    ];

    //canvas 0:
    const series = [
        {
            data: [
                { id: 0, value: 30, label: 'Orthodox' },
                { id: 1, value: 12, label: 'Religious' },
                { id: 2, value: 4, label: 'Secular' },
            ],
        },
    ];

    //Canvas:
    const reason = [
        {
            data: [
                { id: 0, value: 4, label: 'Beginning of the month' },
                { id: 1, value: 16, label: 'Middle of the month' },
                { id: 2, value: 21, label: 'End of month' },
                
              
            ],
        },
    ];

    //Canvas 1 :
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // Add a reference to the chart instance
    const xValues = [];
    const yValues = [53, 50, 46, 42];
    //Canvas 2 :
    const chart2Ref = useRef(null);
    const chart2InstanceRef = useRef(null); // Add a reference to the second chart instance
    const x2Values = ["01/2023", "02/2023", "03/2023", "04/2023", "05/2023", "06/2023", "06/2023", "07/2023", "08/2023", "09/2023", "10/2023", "11/2023", "12/2023"];
    const y2Values = [5, 13, 7, 15, 13, 11, 24, 30, 29, 32, 45, 50, 53];

    const barColors = ["rgb(0, 32, 96)", "rgb(223, 221, 53)", "rgba(0, 32, 96, 0.5)", "rgba(223, 221, 53, 0.5)"];
    const token = localStorage.getItem('token');

    useEffect(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        xValues.length = 0;

        //Set the xValues to be the names of the last 4 months
        for (let i = currentMonth - 3; i <= currentMonth; i++) {
            const month = i <= 0 ? i + 12 : i;
            const monthName = new Date(currentDate.getFullYear(), month - 1, 1).toLocaleString('en-US', { month: 'long', locale: 'en-US' });
            console.log(monthName);
            xValues.push(monthName);
        }

        //Get the yValues from the server
        /*const getAllLoans = async () => {
             try {
                 const response = await fetch('https://localhost:7275/api/LoanDetails/GetAllApprovaledLoans')
                 let data = await response.json();
                 console.log("✍ data from server is: " + data);
                 data = data.filter(loan => new Date(loan.dateToGetBack).getMonth() + 1 >= currentMonth - 3);
                 console.log(data)
                 const sumTimes = Object.values(data.reduce((acc, loan) => {
                     const loanMonth = new Date(loan.dateToGetBack).getMonth() + 1;
                     const monthName = new Date(loan.dateToGetBack).toLocaleString('en-US', { month: 'long', locale: 'en-US' });
                     acc[monthName] = (acc[monthName] || 0) + 1;
                     console.log(monthName + ", " + acc[monthName]);
                     yValues.push(acc[monthName]);
                     
                 }, {}));
             }
             catch (error) {
                 console.error(error);
                 return [];
             }
         };
 
         const fetchData = async () => {
             yValues = await getAllLoans();
             console.log("End of fetchData: " + yValues);
         };
 
         fetchData();*/


    }, []);

    useEffect(() => {
        if (xValues.length > 0 && yValues.length > 0) {
            //Canvas 1 :
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
        }
        if (x2Values.length > 0 && y2Values.length > 0) {

            //Canvas 2 :
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
                                min: 5,
                                max: 60
                            }
                        },
                        plugins: {
                            legend: { display: false }
                        }
                    }
                });
            }
        }
    }
        , [xValues, yValues, x2Values, y2Values]);

    return (
        <div>
            <Bar />,
            <div style={{ zIndex: "99", height: "7%", backgroundColor: "rgba(0, 32, 96, 0.5)", marginTop: "9%", color: "rgb(223, 221, 53)", position: "fixed", width: "100%", padding: "1%" }}>
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
            <div style={{ padding: "5%", width: "90%", display: "flex", flexWrap: "nowrap", alignContent: " space-between" }}>
            <div style={{ display: "inline-block", marginLeft: "5%",paddingRight:"15%" }}>
                <div style={{ padding: "8%", width: "50%", display: "flex", flexWrap: "nowrap", alignContent: " space-between" }}></div>
                <div className="p_chart" >
                    <p ><em><strong>Divison of the total loan given in the last month by sectornn                </strong></em></p>
                </div>
                <Stack>
                    <PieChart
                        series={series}
                        slotProps={{ legend: { hidden: false ,  vertical: 'bottom', } }}
                        width={500}
                        height={300}
                        colors={["rgb(223, 221, 53)", "rgb(0, 32, 96)", "rgba(0, 32, 96, 0.5)"]}
                    />
                </Stack>
            </div>
            <div style={{ marginLeft: "5%", paddingRight:"15%", display:"inline-block" }}>
            <div style={{  width: "90%", display: "flex", flexWrap: "nowrap" }}></div>
                <div className="p_chart" >
                    <p style={{paddingTop:"45%", marginBottom:"-10%"}}><em><strong>Distribution of time for taking loans in the last month</strong></em></p>
                </div>
                    <PieChart
                        marginTop={0}
                        series={reason}
                        height={400}
                        width={400}
                        slotProps={{
                            legend: {
                                direction: 'row',
                                position: { vertical: 'bottom', horizontal: 'right' },
                                padding: 0,
                                
                            },
                        }}
                    colors={["rgb(223, 221, 53)", "rgb(0, 32, 96)", "rgba(0, 32, 96, 0.5)"]}
                    />
            </div>
            </div>
            
            <div style={{ padding: "2%", width: "80%", display: "flex", flexWrap: "nowrap", alignContent: " space-between" }}></div>
            <div className="p_chart" >
                <p ><em><strong>Number of people who take loans from 'PlusMinus' in the last quarter</strong></em></p>
            </div>
            <canvas ref={chartRef} id="myChart" style={{ width: '90%', maxWidth: '90%', margin: "3%", height: "90px" }}></canvas>

            <div className="p_chart">
                <p  ><em><strong>The average loan amount in the last year</strong></em></p>
            </div>
            <canvas ref={chart2Ref} id="myChart2" style={{ width: '90%', maxWidth: '90%', height: "80px", margin: "3%" }}></canvas>
            <Footer />
        </div>
    )
}
