import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review(props) {
 const Guarantor1= props.Guarantor1
   const Guarantor2= props.Guarantor2
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
       Before finish...
      </Typography>
      <FormControlLabel 
        control={
          <Checkbox color="secondary" name="" value="yes" required={true} />
        }
        label="I confirm that all the data I entered are true and correct."
      />
      <FormControlLabel 
        control={
          <Checkbox color="secondary" name="" value="yes" required={true} />
        }
        label="I confirm that I know that the association is not obligated to approve the loan I requested, and filling out this application form does not contain any approval for the loan."
      />
      <FormControlLabel
        control={
          <Checkbox color="secondary" name="" value="yes" required={true} />
        }
        label="I confirm that this loan is for my non-business need."
      />
      <FormControlLabel
        control={
          <Checkbox color="secondary" name="" value="yes" required={true} />
        }
        label="I declare that everything I have entered is correct."
      />
    </React.Fragment>
  );
}
