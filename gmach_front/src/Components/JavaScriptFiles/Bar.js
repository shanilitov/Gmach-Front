import BasicButtons from "./BasicButtons";
import CreateSvgIcon from "./CreateSvgIcon";

function Bar() {
  const myStyle = {
    display: 'grid',
    gridTemplateColumns: '30% 60% 10%',
    width: "100%",
    height: "100px",
    marginTop: "0%",
    backgroundColor: "rgb(0,32,96)",
  };
  const picture = {
    width: "30px",
    height: "80px",
   gridColumn: '1 / span 2',
    gridRow: '1'
  };
  return (
    <div>
      <div style={myStyle}>
        <div style={picture}>
        
        </div>
        <BasicButtons value={<CreateSvgIcon sx={{ backgroundColor:'white', gridColumn: '2 / span 3', gridRow:'1' }} />}  func=""></BasicButtons>
       
      </div>
    </div>
  );
}
export default Bar;
/*
 * <img src={require(`./logo3.jpg`)} />
 */