
import React from 'react';
import Bar from './Bar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';


function Contact(){
    const sections = [
        { title: 'About us', url: '/AboutUs' },//Blog1- talking about the company.
        { title: 'Activity', url: '/Graphes' }, //Grafes- show the activity in company in grafs.
        { title: 'Searches', url: '/Searches' }, //Blog2- talking about searches in economy.
        { title: 'Our services', url: '/Services' },//Blog3- talking about the services that we give.
        { title: 'Contact us', url: '/ContactUs' },//Blog4- details how to contact us.
        { title: 'Articles', url: '/Articles' },//Articles that talking about economy etc.
    ];


    return (
        <div>
            <Bar />
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
            <h1>Contact Component</h1>
            {/* Add your contact form or any other content here */}
        </div>
    );
};

export default Contact;
