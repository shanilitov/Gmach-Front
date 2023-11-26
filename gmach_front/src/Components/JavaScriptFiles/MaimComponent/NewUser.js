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



function NewUser() {
  //TODO: add function that sign in the user!

  let alert = false;
  //let message = ""
  /*let message = {
    text: "Sorry, some details are missing. Please fill in all fields.",
  };*/

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
    console.log("userName: " + userName);
    console.log("phone: " + phone);
    console.log("userId: " + userId);
    console.log("address: " + address);
    console.log("email: " + email);
    console.log("password:" + password);
    console.log("validPassword: " + validPassword);
    if (
      (userName !== "") &
      (userId !== "") &
      (address !== "") &
      (phone !== "") &
      (email !== "") &
      (password !== "") &
      (validPassword !== "")
    ) {
      console.log("All field are different of ''");
      if (password != validPassword) {
        console.log("Sorry, Password fields doesn't match.");
        setMessage("Sorry, Password fields doesn't match.");
        console.log("message.text: " + message);
        setShowAlert(true);
      } else {
        if (password.length < 8) {
          setMessage("Password must contains at least 8 chars.");
          console.log("Password must contains at least 8 chars.");
          console.log("message.text: " + message);
          setShowAlert(true);
        }
        if (phone.length != 10) {
          console.log("Not valid phone number.");
          setMessage("Not valid phone number.");
          setShowAlert(true);
          console.log("message.text: " + message);
        }
        if (!email.includes("@gmail.com")) {
          console.log("Not valid email address.");
          setMessage("Not valid email address.");
          setShowAlert(true);
        }
      }

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

      //let URL  ="https://localhost:7275"
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
                console.log("Server responsed!! Data: " + data);
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
      //Wheh ShowAlert is true, the user can't register and we show him this error message.
      else {
        setMessage("Sorry, some details are missing. Please fill in all fields.");
        alert = true;
        setShowAlert(true);
      }
    }


    return (
      <div>
        <div className="">
          Sara
          <img src={logoPhoto} alt="Logo" className="photo" />
          <h1 id="h_newUser" color="blue" >הרשמה</h1><div className="back">
            <div className="NewUserFeilds" onBlur={() => setShowAlert(false)}>
              <BasicTextFields
                header="שם"
                type="text"
                func={(ev) => setUserName(ev.target.value)}
                onBlur={() => setShowAlert(false)}
                required
              />
              <BasicTextFields
                header="תעודת זהות"
                type="number"
                id="idField"
                func={(ev) => setUserId(ev.target.value)}
                onBlur={() => setShowAlert(false)}
                required
              />
              <BasicTextFields
                header="כתובת"
                type="text"
                func={(ev) => setAddress(ev.target.value)}
                onBlur={() => setShowAlert(false)}
                required
              />
              <BasicTextFields
                header="טלפון"
                type="number"
                id="phoneField"
                onBlur={() => setShowAlert(false)}
                func={(ev) => setPhone(ev.target.value)}
                required
              />
              <BasicTextFields
                header="כתובת מייל"
                type="email"
                id="emailField"
                onBlur={() => setShowAlert(false)}
                func={(ev) => setEmail(ev.target.value)}
                required
              />
              <BasicTextFields
                header="צור סיסמא"
                type="password"
                id="passwordField"
                onBlur={() => setShowAlert(false)}
                func={(ev) => setPassword(ev.target.value)}
                required
              />
              <BasicTextFields
                header="חזור על הסיסמא"
                type="password"
                id="validField"
                onBlur={() => setShowAlert(false)}
                func={(ev) => setValidPassword(ev.target.value)}
                required
              />
            </div>
            <div id="NewUserBtn" /*onClick={checkNewUser}*/>
              <BasicButtons value="הרשם" function={checkNewUser} />
              {showAlert === true ? <ErrorAlert msg={message} /> : <></>}
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default NewUser;
//TODO: Check user input. In ID field- after each number check that user entered a number and not a letter. SARA.

//<CircularIntegration />