import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    padding: theme.spacing(1),
    lineHeight: '60px',
    transition: 'box-shadow 0.3s ease-in-out',
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
    let x = 0;

    React.useEffect(() => {
        if (hover === true)
            setElevation(16)
        else
            setElevation(3)
    }, [])

    return (
        <Grid item xs={6}>
            {creditCards.map(element => (
                <div
                style={{ cursor: 'pointer', margin: '10px' }}
                    onMouseOver={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    key={element}
                >
                    <Item elevation={elevation}>
                        {`XXXX-XXXX-XXXX-${element.slice(-4)}`}
                    </Item>
                </div>
            ))}
        </Grid>
    );
}
