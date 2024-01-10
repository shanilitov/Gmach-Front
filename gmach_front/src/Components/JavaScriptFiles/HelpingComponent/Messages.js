import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { List } from '@mui/material';
import DemoPaper from '@mui/material/Paper';
import ForumIcon from '@mui/icons-material/Forum';
import SnackbarContent from '@mui/material/SnackbarContent';
import "../../../CSSFiles/StylePage.css";



export default function Messages(props) {
    return (
     
            <div style={{ color: 'rgb(0, 32, 96)', width: '300%', '@media (max-width: 600px)': { width: '100%' } }}>
                <h3>Messages from users:</h3>
                    <div className='adminMessages'>
                    <SnackbarContent message="Admin messaged to user." sx={{width:"50%", backgroundColor:"rgb(0, 32, 96)", marginTop:"2%", marginBottom:"2%"}}/>
                   </div>
                    <div className='userMessages'>
                    <SnackbarContent message="User messaged to admin. Want to get a answer. " sx={{width:"50%", backgroundColor:"rgba(223, 221, 53)",  marginTop:"2%", marginBottom:"2%", color:"rgb(0, 32, 96)"}}/>

                    </div>
            </div>
       
    )
}