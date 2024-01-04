import React from "react";
import { useState } from "react";
import BasicTextFields from "../HelpingComponent/BasicTextFields";
import BasicButtons from "../HelpingComponent/BasicButtons";
import "../../../CSSFiles/StylePage.css";
import AlignItemsList from "../HelpingComponent/AlignItemsList";
import CreateSvgIcon from "../HelpingComponent/CreateSvgIcon";
import ResponsiveAppBar from "../HelpingComponent/ResponsiveAppBar";
import { Password } from "@mui/icons-material";
import ErrorAlert from "../HelpingComponent/ErrorAlert";
import logoPhoto from "../../../img/logoPhoto.png";
import CircularIntegration from "../HelpingComponent/CircularIntegration";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from '../../../CSSFiles/Images/Logo1.PNG';

function NewUser() {

  //Navigate in case user register
  const navigate = useNavigate();
  const NavigateFunc = (data) => {
    let id = data.userId
    let name = data.userName
    navigate(`/Register/${id}/${name}`)
  }

  //chack if the values are good filled
  function isInputValid() {
    //return true; // just till we finish
    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return false;
    }
    if (phone.length !== 10) {
      setMessage("Not a valid phone number.");
      return false;
    }
    if (!email.includes("@gmail.com")) {
      setMessage("Not a valid email address.");
      return false;
    }
    return true;
  }




  let alert = false;

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");

  function checkNewUser() {

    //help consols:
    console.log("userName: " + userName);
    console.log("phone: " + phone);
    console.log("userId: " + userId);
    console.log("address: " + address);
    console.log("email: " + email);
    console.log("password:" + password);
    console.log("validPassword: " + validPassword);

    if (isInputValid()) {
      //This object used to register user
      const NewUser = {
        UserEmail: email,
        UserPhone: phone,
        UserAddress: address,
        UserIdentityNumber: userId,
        UserName: userName,
        UserPassword: password
      };
      //This object used to check if current user already exist.
      const user = {
        UserName: userName,
        Password: password,
      };

      let URL = "https://localhost:7275/api/User/SignIn";
      let data = NewUser;

      let option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      console.log("Before fetch. data: ", data, data.name, data.password);
      console.log(showAlert);
      if (showAlert != true) {
        console.log("Before fetch")
        try {
          fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...NewUser, // spread the existing fields
              //Don't need to add this fields because they already exist in NewUser object.
            }),
          })
            .then((response) => {
              response.json().then((data) => {
                console.log("Server responsed!! Data: " + JSON.stringify(data));
                if (data.userId === 0) {
                  console.log("User Exist!")
                }
                else {
                  if (data.userId < 0) {
                    console.log("Error in server!")
                  }
                  else {
                    console.log("data: ", data, "JSON.stringify(data): ", JSON.stringify(data));
                    data = {userId: data, userName: userName}
                    NavigateFunc(data)
                  }
                }
              })

                .catch((error) => {
                  console.error('Error:', error);
                })
                .finally(() => {
                  console.log("Finally");
                });
            })
        }
        catch (Error) {
          console.log("Error.message  ", Error.message);
        }
      }
      //When ShowAlert is true, the user can't register and we show him this error message.
      else {
        setMessage("Sorry, some details are missing. Please fill in all fields.");
        alert = true;
        setShowAlert(true);
      }
    }
    else {
      setShowAlert(true);
    }
  }



  return (
    <div>
        <div >
          <a href="/">
        <img src={logo} alt='Logo' id='CBarLogo' style={{
          height: "auto",
          width: "80%",
          transition: "0.4s",
          fontSize: "35px",
          margin:"0",
          position: "fixed",  
        }} />
        </a>
        </div>
        <div className="" >
        <h1 id="h_newUser" color="blue" >Sign Up</h1><div className="back">
          <div className="NewUserFeilds" onBlur={() => setShowAlert(false)}>
            <BasicTextFields
              header="User name"
              type="text"
              func={(ev) => setUserName(ev.target.value)}
              onBlur={() => setShowAlert(false)}
              required
            />
            <BasicTextFields
              header="ID number"
              type="number"
              id="idField"
              func={(ev) => setUserId(ev.target.value)}
              onBlur={() => setShowAlert(false)}
              required
            />
            <BasicTextFields
              header="Address"
              type="text"
              func={(ev) => setAddress(ev.target.value)}
              onBlur={() => setShowAlert(false)}
              required
            />
            <BasicTextFields
              header="Phone number"
              type="number"
              id="phoneField"
              onBlur={() => setShowAlert(false)}
              func={(ev) => setPhone(ev.target.value)}
              required
            />
            <BasicTextFields
              header="Email"
              type="email"
              id="emailField"
              onBlur={() => setShowAlert(false)}
              func={(ev) => setEmail(ev.target.value)}
              required
            />
            <BasicTextFields
              header="Password"
              type="password"
              id="passwordField"
              onBlur={() => setShowAlert(false)}
              func={(ev) => setPassword(ev.target.value)}
              required
            />
            <BasicTextFields
              header="Confirm password"
              type="password"
              id="validField"
              onBlur={() => setShowAlert(false)}
              func={(ev) => setValidPassword(ev.target.value)}
              required
            />
          </div>
          <div id="NewUserBtn" /*onClick={checkNewUser}*/>
            <BasicButtons value="Register" function={checkNewUser} />
            {showAlert === true ? <ErrorAlert msg={message} /> : <></>}
          </div>
        </div>
      </div>

    </div>
  );
}

export default NewUser;
//TODO: Check user input. In ID field- after each number check that user entered a number and not a letter. SARA.

//<CircularIntegration />