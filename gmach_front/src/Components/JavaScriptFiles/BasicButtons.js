import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
    let value = props.value;
    let func = props.function;
    //let color = props.color;

    return (
        <Stack spacing={5} direction="row">
            <Button variant="outlined"  size='large' onClick={func}>{value}</Button>
        </Stack>
    );


    window.open()
}