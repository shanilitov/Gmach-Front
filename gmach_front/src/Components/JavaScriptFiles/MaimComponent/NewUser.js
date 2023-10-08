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

function NewUser() {
  //TODO: add function that sighn in the user!

  let alert = false;
  //let message = ""
  let message ={ text: '' }

  const [showAlert, setShowAlert] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");

  function checkNewUser() {
    if (
      (userName !== "") &
      (userId !== "") &
      (address !== "") &
      (phone !== "") &
      (email !== "") &
      (password !== "") &
      (validPassword !== "")
    ) {
      if (password != validPassword) {
        setShowAlert(true);
        message.text = "Sorry, Password fileds doesn't match.";
      } else {
        if (password.length < 6) {
          setShowAlert(true);
          message.text = "Password must contains at least 6 chars.";
        }
        const user = {
          id: userId,
          name: userName,
          password: password,
          email: email,
          address: address,
          phone: phone,
        };
      }
    } else {
      alert = true;
      message.text = "Sorry, some details are missing. Please fill in all fields.";
      setShowAlert(true);
    }
  }

  return (
    <div>
      <div className="NewUserPage">
        <h1 id="h_newUser">הרשמה</h1>
        <div className="AllFeilds" onBlur={() => setShowAlert(false)}>
          <BasicTextFields
            value="שם"
            type="text"
            onChange={(ev) => setUserName(ev.target.value)}
            onBlur={() => setShowAlert(false)}
            required
          />
          <BasicTextFields
            value="תעודת זהות"
            type="number"
            id="idField"
            onChange={(ev) => setUserId(ev.target.value)}
            onBlur={() => setShowAlert(false)}
            required
          />
          <BasicTextFields
            value="כתובת"
            type="text"
            id="addressField"
            onChange={(ev) => setAddress(ev.target.value)}
            onBlur={() => setShowAlert(false)}
            required
          />
          <BasicTextFields
            value="טלפון"
            type="number"
            if="phoneField"
            onBlur={() => setShowAlert(false)}
            onChange={(ev) => setPhone(ev.target.value)}
            required
          />
          <BasicTextFields
            value="כתובת מייל"
            type="email"
            id="emailField"
            onBlur={() => setShowAlert(false)}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
          <BasicTextFields
            value="צור סיסמא"
            type="password"
            id="passwordField"
            onBlur={() => setShowAlert(false)}
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
          <BasicTextFields
            value="חזור על הסיסמא"
            type="password"
            id="validField"
            onBlur={() => setShowAlert(false)}
            onChange={(ev) => setValidPassword(ev.target.value)}
            required
          />
        </div>
      </div>

      <div id="NewUserBtn" onClick={checkNewUser}>
        {showAlert === true ? <ErrorAlert msg={message} /> : <></>}
        <BasicButtons value="הרשם" />
      </div>
    </div>
  );
}
export default NewUser;
//TODO: Check user input. In ID field- after each number check that user entered a number and not a letter. SARA.
