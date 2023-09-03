import AlignItemsList from "../HelpingComponent/AlignItemsList"

export default function Loans(props) {
  // TODO: Ask from the server for the client real loans, and change the displaytion to them.
  // TODO: change the addLoan to a nicer view.
  // TODO: add option to see the state of loan application.
  let type = props.type
  let Loans = props.items
  return (
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
      <a href="AddLoan">Add Loan</a>
    </div>
  )
}