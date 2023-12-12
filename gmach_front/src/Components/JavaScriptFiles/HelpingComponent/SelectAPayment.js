import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAPayment(props) {
    const [payment, setPayment] = React.useState(1); // Set the initial value to 1
    const paymentText = ["Add a new payment details", "Use an exist card"];

    const handleChange = (event) => {
        console.log("The value is: ", event.target.value);
        setPayment(event.target.value);
        props.setPayment(event.target.value);
    };

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200, maxWidth: "100%", marginTop: "-4%" }}>
                <Select
                    value={payment}
                    onChange={handleChange}
                    displayEmpty
                >
                    <MenuItem value={1}>Add a new payment details</MenuItem>
                    <MenuItem value={2}>Use an exist card</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
