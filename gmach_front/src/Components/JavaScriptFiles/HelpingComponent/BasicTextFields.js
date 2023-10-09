import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields(props) {
    const { header, type, func, text } = props;

    return (
        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label={header}  variant="outlined" type={type} onChange={func} content={text}    />
        </Box>
    );
}

