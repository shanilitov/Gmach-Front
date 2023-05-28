import Bar from "./Bar";
import VerticalTabs from "./VerticalTabs"
import AlignItemsList from "../AlignItemsList";
import { Margin } from "@mui/icons-material";
export default function Application(props) {
  /*user=props.user*/
  const container = {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    padding: "10%",
  };
  
  return (
    <div>
      <Bar />
      <div style={{display:'grid', gridTemplateColumns:'auto auto auto auto auto  ', marginRight:'10%', width:'100%'}} >
        <div style={{gridColumn:'1 /span 4'}} ><VerticalTabs/></div>
        <div style={{ gridColumns:'5/ span 6'}}> שלום, שרה</div>
     </div>
      <div>

      </div>
    </div>
  );
}
