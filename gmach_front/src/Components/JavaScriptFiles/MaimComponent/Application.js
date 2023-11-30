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
  console.log("ID id: ", id);


  const container = {
    display: "grid",

  };
  return (
    <div>
      <Bar />
      <div style={{ padding: "1%", position: "sticky", top: 0 }}>
        <div style={{ width: "100%", marginTop: "10%", color: "rgb(223, 221, 53)", backgroundColor: "rgba(223, 221, 53,0.115)", fontSize: "large" }}>
          <h2><strong>Hello, {name}</strong></h2>
        </div>
        <div style={{ marginTop: "10px" }}>
          <VerticalTabs userId={id} userName={name} />
        </div>
      </div>
      <div></div>
    </div>
  );


}
