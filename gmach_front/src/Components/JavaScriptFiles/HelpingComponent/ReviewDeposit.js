import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';


export default function Review(props) {
    const payments = [
        { name: 'Card number', detail: `xxxx-xxxx-xxxx-${props.cardNumber.slice(-4)}` },
        { name: 'Expiry date', detail: props.expDate },
    ];

    function addCommasToNumber(str) {
        const num = parseInt(str.replace(/,/g, ''));
        return num.toLocaleString('en-US');
    }
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Deposit details
            </Typography>
            <List disablePadding>

                <ListItem sx={{ py: 1, px: 15 }}>
                    <ListItemText primary="Deposit amount:" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }} color={"#1976d2"}>
                        {addCommasToNumber(`${props.amount}`)+`$`}
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 15 }}>
                    <ListItemText primary="Date of back:" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }} color={"#1976d2"}>
                        {new Date(props.date).toLocaleDateString()}
                    </Typography>
                </ListItem>
                    {/*</ListItem> <Grid item container direction="column" xs={12} sm={6}>*/}
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>

                <Grid container>
                    {payments.map((payment) => (
                        <React.Fragment key={payment.name}>
                            <ListItem sx={{ py: 1, px: 15 }}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom >{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography gutterBottom style={{width:"140%"}}  sx={{ fontWeight: 700 }} color={"#1976d2"}>{payment.detail}</Typography>
                                </Grid>
                            </ListItem>
                        </React.Fragment>
                    ))}
                </Grid>
            </List>
            <Grid container spacing={2}>

            </Grid>
        </React.Fragment>
    );
}