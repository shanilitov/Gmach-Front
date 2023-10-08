import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ErrorAlert({msg}) {
  //let message = props.msg;
  console.log("Console: "+msg.text)
  //console.log(message.msgText)
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">{msg.text}</Alert>
    </Stack>
  );
}

// More options:
// <Alert severity="warning">This is a warning alert — check it out!</Alert>
//<Alert severity="info">This is an info alert — check it out!</Alert>
