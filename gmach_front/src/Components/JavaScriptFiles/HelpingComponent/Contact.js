
import React from 'react';
import Bar from './Bar';
import "../../../CSSFiles/StylePage.css"
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import ContactField from './ContactField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import  { useState } from 'react';

function Contact() {
    const sections = [
        { title: 'About us', url: '/AboutUs' },
        { title: 'Activity', url: '/Graphes' },
        { title: 'Searches', url: '/Searches' },
        { title: 'Our services', url: '/Services' },
        { title: 'Contact us', url: '/ContactUs' },
        { title: 'Articles', url: '/Articles' },
    ];
    const [content, setContent] = useState('fields');

    return (
        <div>
            <Bar />
            <div style={{ zIndex: "99", height: "5%", marginTop: "10%", backgroundColor: "rgba(0, 32, 96, 0.5)", color: "rgb(223, 221, 53)", position: "fixed", width: "100%", padding: "1%" }}>
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
        <div style={{ marginTop: "15%", display: "inline-block", width: "50%", marginLeft: "25%" }}>
            <h1>Contact us</h1>
            {(content === 'fields') ? (
                <div className='contactFields'>
                    <ContactField text="Name" type="text" icon="AccountCircle" />
                    <ContactField text="Email" type="email" icon="DraftsIcon" />
                    <ContactField text="Phone" type="tel" icon="PhoneIcon" />
                    <ContactField text="Message" type="text" icon="EditNoteIcon" />
                    <div className='contactFields'>
                        <Button variant="outlined" endIcon={<SendIcon />} onClick={()=>{setContent('send')}}>
                            Send
                        </Button>
                    </div>

                </div>
            ) : (
                <div className='contentSend'>
                    <h1>Thank you for contacting us!</h1>
                    <h2>We will contact you as soon as possible.</h2>
                </div>
            )}
           <h2>Here you can find all the information about our company.</h2>
            <h3>Address: 1st Street, New York City, USA</h3>
            <h3>Phone: 123456789</h3>
            <h3>Email: library.project.me@gmail.com </h3>
            <h3>Facebook: https://www.facebook.com/library.project.me</h3>
            <h3>Twitter: https://twitter.com/library.project.me</h3>
            <h3>Instagram: https://www.instagram.com/library.project.me</h3>
        </div>
        </div>
    );
}

export default Contact;


