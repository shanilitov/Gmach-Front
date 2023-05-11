import Bar from "./Bar";
import AlignItemsList from "./AlignItemsList";
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
      <h2 style={{marginLeft:'90%'}}>שלום, שרה</h2>
      <div style={container}>
        <h2
          style={{
            color: "rgb(0,32,96)",
            gridColumn: "1/span 2",
            gridRow: "1",
          }}
        >
          הלוואות
        </h2>
        <h2
          style={{
            color: "rgb(0,32,96)",
            gridColumn: "2/span 3",
            gridRow: "1",
          }}
        >
          השקעות
        </h2>
        <div>
          <div>
            <AlignItemsList type=""/>
          </div>
        </div>
        <div>
          <AlignItemsList  type=""/>
        </div>
      </div>
    </div>
  );
}
