import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ErrorAlert({msg}) {
  //let message = props.msg.text;
  console.log("msg is: "+ msg )
  console.log("msg.text is: "+ msg)
  //console.log(message.msgText)
  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <Alert severity="error">{`${msg}`}</Alert>
    </Stack>
  );
}

// More options:
// <Alert severity="warning">This is a warning alert — check it out!</Alert>
//<Alert severity="info">This is an info alert — check it out!</Alert>
