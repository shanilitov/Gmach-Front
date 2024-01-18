
import React from 'react';
import Bar from './Bar';
import "../../../CSSFiles/StylePage.css"
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import ContactField from './ContactField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Footer from './Footer';
import WaitComponent from './WaitComponent';

function Contact() {
    const sections = [
        { title: 'About us', url: '/AboutUs' },
        { title: 'Activity', url: '/Graphes' },
        //{ title: 'Searches', url: '/Searches' },
        { title: 'Our services', url: '/Services' },
        { title: 'Contact us', url: '/ContactUs' },
        { title: 'Articles', url: '/Articles' },
    ];
    const [content, setContent] = useState('fields');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [_message, setMessage] = useState('');
    const [wait, setWait] = useState(false);

    const sendData = () => {
        if (name === '' || email === '' || phone === '' || _message === '') {
            console.log("empty fields. name: " + name + " email: " + email + " phone: " + phone + " message: " + _message )
            setContent('wait')
            setTimeout(() => {
                alert("Please fill all the fields")
                setContent('fields')

            }, 1500);
        }
        else {
            setContent(<WaitComponent />)
            setWait(true)
            console.log("send data")
            let message = `${email},${name},${phone},${_message}`;
            const data = {
                id: 0,
                FromUserId: -2,
                toUserId: 20,
                text: message,
                viewed: false
            }
            fetch('https://localhost:7275/api/Message/SendNewMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((response) => response.json()).then((data) => {
                if (data === true) {
                    console.log('Success:', data);

                    setTimeout(() => {
                        setWait(false)
                        setContent('send')
                    }, 2000);
                }

                else {
                    console.log('Error:', data);
                    setContent('fields')

                }
            }
            ).catch((error) => {
                console.error('Error:', error);
            });
        }

    }




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
            <div style={{ marginTop: "15%", display: "inline-block", width: "50%", marginLeft: "25%", color: '#002060' }}>
                {(content === 'send') ? (
                    <div className='contentSend'>
                        <h1>Thank you for contacting us!</h1>
                        <h2>We will contact you as soon as possible.</h2>
                    </div>
                ) :
                    (
                        <div className='contactFields'>
                            <h1 >Contact us</h1>
                            <div onChange={(ev) => { setName(ev) }}>
                            <ContactField text="Name" type="text" icon="AccountCircle"  />
                            </div>
                            <div onFocus={(ev) => { setEmail(ev) }} > 
                            <ContactField text="Email" type="email" icon="DraftsIcon" />
                            </div>  
                            <div onFocus={(ev) => { setPhone(ev) }} >
                            <ContactField text="Phone" type="tel" icon="PhoneIcon" />
                            </div>
                            <div onChange={(ev) => { setMessage(ev) }} >
                            <ContactField text="Message" type="text" icon="EditNoteIcon" />
                            </div>
                            <div className='contactFields'>
                                <Button variant="outlined" endIcon={<SendIcon />} onClick={() => { sendData() }}>
                                    {content === 'fields' ? 'Send' : <WaitComponent />}
                                </Button>
                            </div>
                            <h3>Here you can find all the information about our company.</h3>
                            <div className='contactDetails'><h4><LocationOnIcon sx={{ color: "rgb(223, 221, 53)" }} /> 1st Street, New York City, USA</h4></div>
                            <div className='contactDetails'><h4><CallIcon sx={{ color: "rgb(223, 221, 53)" }} /> 123456789</h4></div>
                            <div className='contactDetails'><h4><MailOutlineIcon sx={{ color: "rgb(223, 221, 53)" }} /> library.project.me@gmail.com </h4></div>

                        </div>
                    )
                }

            </div>
            <Footer />
        </div>
    );
}

export default Contact;


