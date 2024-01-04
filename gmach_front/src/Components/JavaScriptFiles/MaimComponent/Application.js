import Bar from "../HelpingComponent/Bar";
import VerticalTabs from "../HelpingComponent/VerticalTabs";
import AlignItemsList from "../HelpingComponent/AlignItemsList";
import { Margin } from "@mui/icons-material";
import AddLoan from "./AddLoan"
import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


export default function Application(props) {

  const { id } = useParams();
  const { name } = useParams();

  //This function is used to get the cookie value
  //If the cookie is not expired- we will enable the admin more options
  // If the cookie is in expired- we will enable the user to log in again
  function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find(row => row.startsWith(name + '='));
    if (cookie) {
      let value = cookie.split('=')[1];
      return value;
    }
    return null;
  }

  
  React.useEffect(()=>{
    console.log("ID id: ", id);
    console.log("Cookie value is: ", getCookie('admin'));
  })
  


  const container = {
    display: "grid",

  };
  return (
    <div>
      <Bar />
      <div style={{ padding: "1%", position: "sticky", top: 0 }}>
        <div style={{ width: "100%", marginTop: "10%", color: "rgb(223, 221, 53)", backgroundColor: "rgba(223, 221, 53,0.115)", fontSize: "large" }}>
          <p style={{fontSize:"30px"}}> <strong>Hello, {name}</strong></p>
        </div>
        <div style={{ marginTop: "10px" }}>
          <VerticalTabs userId={id} userName={name}  />
        </div>
      </div>
      <div></div>
    </div>
  );


}
