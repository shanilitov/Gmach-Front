import Bar from "../HelpingComponent/Bar";
import VerticalTabs from "../HelpingComponent/VerticalTabs";
import AlignItemsList from "../HelpingComponent/AlignItemsList";
import { Margin } from "@mui/icons-material";
import AddLoan from "./AddLoan"
import { useState } from "react";
import * as React from "react";


export default function Application(props) {
  
  const [User, setUser] = React.useState({})

  //check if any user sent as a props
  React.useEffect(()=>{
    if(props.user){
      console.log(props.user)
      setUser(props.user)
    }
  })

  

  const container = {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    padding: "10%",
  };

  return (
    <div>
      <Bar />
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto auto  ', marginRight: '10%', width: '100%' }} >
        <div style={{ gridColumn: '1 /span 4' }} ><VerticalTabs user={User}/></div>
        <div style={{ gridColumns: '5/ span 6' }}>  {User.userName} ,שלום</div>
      </div>
      <div>

      </div>
    </div>
  );
}
