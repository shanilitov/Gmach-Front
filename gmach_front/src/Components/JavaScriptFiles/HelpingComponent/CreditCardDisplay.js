import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Alert from './Alert';
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
    const userID = props.userID;
    const creditCards = props.numbers
    console.log("Type of creditCards: ", typeof creditCards)
    const [hover, setHover] = React.useState(false);
    console.log("CreditCardDisplay: ", creditCards);
    const [elevation, setElevation] = React.useState(3);
    const [selectedCard, setSelectedCard] = React.useState(null); // Add selectedCard state
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(false);
    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [userCards, setUserCards] = useState([]); // Array of user credit cards
    const [HasCards, setHasCard] = useState(false)
    const token = localStorage.getItem('token')
    let x = 0;

    const GetUserCards = async () => {
        try {
            const response = await fetch(`https://localhost:7275/api/Card/GetAllCards/${userID}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
            const data = await response.json().then(data => {console.log(data)
            console.log("Data is: ", data);
            
            if (data.length > 0) {
                console.log(data)
                setUserCards(data);
                console.log("In the function")
                setHasCard(true)
            }
            else {
                setAlertMsg("You don't have any credit cards saved in system.\n Please add a new credit card.")
                setShowAlert(true);
            }});
        } catch (error) {
            console.error('Error fetching credit cards:', error);
            setErrorMsg("Error fetching credit cards: " + error);
            setError(true);
        }
    };


    useEffect(() => {
        async function fetchUserCards() {
            const cards = await GetUserCards();
        }
        console.log("In useEffect")
        fetchUserCards();
    }, []);

    return (
        <Grid item xs={6}>


            {showAlert ? (<Alert severity="info" type="info" msg={alertMsg} />) : (<></>)}
            {console.log("In the main return value", userCards)}
            {HasCards ? 
            
            creditCards.map(element => (
                <div
                    style={{ cursor: 'pointer', margin: '10px' }}
                    onClick={() => {
                        setSelectedCard(element);
                        props.setCard(element);
                    }}
                    key={element}
                >
                    <Item elevation={elevation} selected={selectedCard === element}>
                        {`XXXX-XXXX-XXXX-${element.slice(-4)}`}
                    </Item>
                </div>
            )) : 'No cards found.'}

        </Grid>
    );
}
//          {creditCards ? <CreditCardDisplay numbers={UserCards} setCard={handleCard} /> : 'Loading...'}
/**
 * To see how it works, you can try this snippet:
 *  {

                creditCards.map(element => (
                    <div
                        style={{ cursor: 'pointer', margin: '10px' }}
                        onClick={() => {
                            setSelectedCard(element);
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
 */