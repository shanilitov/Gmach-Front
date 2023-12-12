import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme, selected }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    padding: theme.spacing(1),
    lineHeight: '60px',
    transition: 'box-shadow 0.3s ease-in-out',
    backgroundColor: selected ? '#1976d234' : 'inherit', // Set background color based on selectedCard state
    '&:hover': {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
}));


export default function CreditCardDisplay(props) {
    const creditCards = props.numbers
    console.log("Type of creditCards: ", typeof creditCards)
    //creditCards = creditCards.split(',');
    const [hover, setHover] = React.useState(false);
    console.log("CreditCardDisplay: ", creditCards);
    const [elevation, setElevation] = React.useState(3);
    const [selectedCard, setSelectedCard] = React.useState(null); // Add selectedCard state

    let x = 0;

    return (
        <Grid item xs={6}>

            {

                creditCards.map(element => (
                    <div
                        style={{ cursor: 'pointer', margin: '10px' }}
                        onMouseOver={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={() => { setSelectedCard(element);
                            props.setCard(element);
                        }}
                        key={element}
                    >
                        <Item elevation={elevation} selected={selectedCard === element}>
                            {`XXXX-XXXX-XXXX-${element.slice(-4)}`}
                        </Item>
                    </div>
                ))
            }
        </Grid>
    );
}
