import { Navigate } from "react-router-dom";
import BasicButtons from "./BasicButtons";
import CreateSvgIcon from "./CreateSvgIcon";
import "../../../CSSFiles/StylePage.css"
import logo from '../../../CSSFiles/Images/NewLogo3.PNG';
import { useNavigate } from "react-router-dom";

function Bar() {

  const navigate = useNavigate();

  const changeNavigate = () => {
    console.log("changeNavigate was called");
    navigate("/");
  };

  const myStyle = {
    display: 'grid',
    gridTemplateColumns: '30% 60% 10%',
    width: "100%",
    height: "auto",
    maxHight: "100px",
    marginTop: "0%",
    backgroundColor: "rgb(0,32,96)",
    position: "fixed",  /* Set the navbar to fixed position */
    zIndex: "1", /* Make sure that the navbar is on top of other content */
    marginBottom: "30%",
    paddingBottom: "1%",
    marginBottom: "30%",
  };
  const picture = {
    height: '100%',
    width: '100%',
    gridColumn: '1 / span 2',
    gridRow: '1'
  };

  return (
    <div>
      <div style={myStyle} className="bar">
        <div style={picture} id="logo">
          <img src={logo} alt="Logo" id="logo" />
        </div>
        <div id="homeBtn" onClick={changeNavigate}>
          <BasicButtons
            value={<CreateSvgIcon sx={{ backgroundColor: 'white', gridColumn: '2 / span 3', gridRow: '1' }} />}
            func=""
          ></BasicButtons>
        </div>
      </div>

    </div>
  );
}
export default Bar;
/*
 * <img src={require(`./logo3.jpg`)} />
 */