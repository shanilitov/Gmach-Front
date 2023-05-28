import AlignItemsList from "../AlignItemsList"

export default function Deposits(props){
    let type= props.type
    let deposits= props.items
    return(
        <div>
    <h2
          style={{
            color: "rgb(0,32,96)",
            gridColumn: "2/span 3",
            gridRow: "1",
          }}
        >
          השקעות
        </h2>
        <AlignItemsList/>
        <AlignItemsList/>
        <AlignItemsList/>
        <AlignItemsList/>
        </div>
    )
}