import AlignItemsList from "../HelpingComponent/AlignItemsList"

export default function Loans(props){
   let type= props.type
    let Loans= props.items
    return(
        <div>
            <h2
          style={{
            color: "rgb(0,32,96)",
            gridColumn: "1/span 2",
            gridRow: "1",
          }}
        >
          הלוואות
        </h2>
        <AlignItemsList></AlignItemsList>
        </div>
    )
}