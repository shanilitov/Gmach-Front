import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Deposit from './Deposit';
import Alert from './Alert';
import { useState } from 'react';
import moment from 'moment';
import ErrorAlert from './Alert';
import WaitComponent from './WaitComponent';
import Button from '@mui/material/Button';
import { data } from 'jquery';

export default function LoanCard(props) {
    console.log("I'm in LoanCard");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("")
    const [showAlert2, setShowAlert2] = useState(false);
    const [alertMsg2, setAlertMsg2] = useState("")
    const [isDeleted, setIsDeleted] = useState(false);
    const [inProgress, setInProgress] = useState(false);
    const admin = props.admin;

    const loan = props.loan;
    const LoanDate = props.date;
    const title = loan.loanId;
    const token = localStorage.getItem('token')

    React.useEffect(() => {
        const today = moment();
        if (moment(LoanDate, "DD/MM/YYYY") < today) {
            setAlertMsg("Worng!! Date of return passed!!");
            setShowAlert(true);
        }
    })

    function daysBetween(date) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const today = new Date();
        if (today < date) {
            setAlertMsg("Worng!! Date of return passed!!");
            setShowAlert(true);
        }
        const givenDate = moment(date, "DD/MM/YYYY").toDate();
        const diffDays = Math.round(Math.abs((today - givenDate) / oneDay));
        console.log("diffDays is: " + diffDays);
        return diffDays;
    }

    function deleteLoanRequest(loanId) {
        setInProgress(true)
        console.log("LoanId is: ", loanId);
        fetch(`https://localhost:7275/api/Message/DeleteLoneMessage?loanId=${loanId}`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*'
            }
        }
        )
            .then(data => {
                if (data.ok) {
                    console.log('Success');
                    setIsDeleted(true);
                    setInProgress(false);
                }
                else {
                    setIsDeleted(false);
                    setInProgress(false);
                }
            })

        fetch(`https://localhost:7275/api/LoanDetails/${loanId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'text/plain'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                setAlertMsg("Error: Network response was not ok");
                setShowAlert(true);
            }
            return response.json();
        })
            .then(data => {
                console.log(data)
                if (data) {
                    setIsDeleted(true);
                    setInProgress(false);
                }
                else {
                    setIsDeleted(false);
                    setInProgress(false);
                }
                console.log("isDeleted: ", isDeleted)
            })

            .catch(error => console.error('Error:', error));
    }


    return (
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="ProfileImg" src="https://digital-finance.co.il/wp-content/uploads/2021/01/%D7%94%D7%9C%D7%95%D7%95%D7%90%D7%94-%D7%9C%D7%A4%D7%99-%D7%A1%D7%9B%D7%95%D7%9D.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={`Loan Number ${title}`}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                            </Typography>
                            <h2>Loan amount: {(loan.sum) + "$"}</h2>
                            <h3>Debt maturity date: {LoanDate}</h3>
                            {loan.isAprovied ? "Approved\n" : "Loan is not approved yet"}
                            {loan.isAprovied && !showAlert ? `  Has to be retuned in ${daysBetween(LoanDate)} days` : <></>}
                            {loan.isAprovied && showAlert ? `   Time to retuned passed before ${daysBetween(LoanDate)} days` : <></>}
                            {loan.isAprovied ? <></> : <div style={{ padding: "5%" }}><Button variant="contained" onClick={() => { deleteLoanRequest(loan.loanId) }} value="Delete" color="primary" >
                                {inProgress ? <WaitComponent /> : 'Deleted'}</Button></div>}
                            {showAlert ? <Alert type="error" msg='Worng!! Date of return passed!!' /> : <></>}
                            {daysBetween(LoanDate) < 7 && !admin ? <ErrorAlert type="warning" msg="You have less than 7 days to return the loan" /> : <></>}

                        </React.Fragment>
                    }
                />
                {showAlert2 ? <Alert type="error" msg={alertMsg2} /> : <></>}
            </ListItem>
            <Divider variant="inset" component="li" />

        </List>
    )
}