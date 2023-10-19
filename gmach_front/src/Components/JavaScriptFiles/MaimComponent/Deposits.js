import AlignItemsList from "../HelpingComponent/AlignItemsList"

export default function Deposits(props) {
  // TODO: ask from the server for the deposit of the client, and display them in the current template.
  // TODO: add option to open a new investment.
  let type = props.type
  let deposits = props.items
  return (
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
      <AlignItemsList />
      <AlignItemsList />
      <AlignItemsList />
      <AlignItemsList />
      <h6>Want to add a amount for deposit? click <a href="/NewDeposit">here</a>.</h6>
    </div>
  )
}