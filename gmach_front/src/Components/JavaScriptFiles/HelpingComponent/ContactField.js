import * as React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DraftsIcon from '@mui/icons-material/Drafts';
import PhoneIcon from '@mui/icons-material/Phone';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import EditNoteIcon from '@mui/icons-material/EditNote';



export default function contactField(props) {
    console.log(props)
    const text = props.text;
    const type = props.type;
    const icon = props.icon;
    return (
        <div>
            <div className='contactFields'>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        {text}
                    </InputLabel>
                    <Input
                        type={type}
                        id=""
                        className={icon == "EditNoteIcon"? 'EditNoteField' : ''}
                        startAdornment={
                            <InputAdornment position="start" color="rgb(0, 32, 96)">
                                {(icon == "AccountCircle") ? <AccountCircle sx={{ color: "rgb(223, 221, 53)" }} /> :
                                    (icon == 'DraftsIcon') ? <DraftsIcon sx={{ color: "rgb(223, 221, 53)" }} /> :
                                    (icon == "EditNoteIcon")?<EditNoteIcon sx={{ color: "rgb(223, 221, 53)" }}/>: <PhoneIcon sx={{ color: "rgb(223, 221, 53)" }} />

                                }
                            </InputAdornment>
                        }
                            />
                            </FormControl>
            </div>
        </div>
    )
}