import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { List } from '@mui/material';
import DemoPaper from '@mui/material/Paper';
import ForumIcon from '@mui/icons-material/Forum';



export default function Messages(props) {
    return (
        <div>
            <div style={{ color: 'rgb(0, 32, 96)', }}>
                <h3>Messages from users:</h3>
                <List>
                    <div>
                        <ul>
                            <li>                            <ForumIcon />
                            </li>
                        </ul>
                        <DemoPaper variant="elevation" elevation={24} style={{ padding: "5%" }}>
                            <div>
                                <p>Message number 1</p>
                            </div></DemoPaper>
                    </div>
                </List>
            </div>
        </div>
    )
}