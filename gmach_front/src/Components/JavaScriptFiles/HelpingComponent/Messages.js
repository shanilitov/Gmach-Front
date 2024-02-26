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
    const id = props.id;
    const message = props.message
    const isHandled = props.isHandled
    const token = localStorage.getItem('token')


    //const viewed = props.viewed

 
    console.log('in messages')
    return (

        <div style={{ color: 'rgb(0, 32, 96)', width: 'fit-content'}}>
            {id === 20 ?
                <div className='adminMessages'>
                    <SnackbarContent message={message} sx={{ width: "fit-content", backgroundColor: "rgb(0, 32, 96)", marginTop: "2%", marginBottom: "2%" }} />
                    
                </div>
                :
                <div className='userMessages'>
                    <SnackbarContent message={message} sx={{ width: "fit-content", backgroundColor: "rgba(223, 221, 53)", marginTop: "2%", marginBottom: "2%", color: "rgb(0, 32, 96)"}} />

                </div>
            }
        </div>

    )
}