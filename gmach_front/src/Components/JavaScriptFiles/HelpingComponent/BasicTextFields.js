import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields(props) {
   
let value=props.value
 let type=props.type  
    return (
        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label={value}  variant="outlined" type={type} />

        </Box>
    );
}
