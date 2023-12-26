import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import BasicButtons from "../HelpingComponent/BasicButtons";
import Bar from "../HelpingComponent/Bar";
import logoPhoto from "../../../img/logoPhoto.png";
import "../../../CSSFiles/StylePage.css"
import SignUp from "./NewUser";
import App from "../../../App";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../HelpingComponent/ErrorAlert";
import AdminLogIn from "./AdminLogIn";
import WaitComponent from "../HelpingComponent/WaitComponent";


function LogIn() {

    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [alertMsg, setAlertMsg] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [user, setUser] = useState({});
    const [wait, setWait] = useState(false);



    //Navigate in case user register
    const navigate = useNavigate();
    const NavigateFunc = (id, name) => {
        navigate(`/Register/${id}/${name}`)
    }

    async function FetchData() {
        if (showAlert || name == "" || password == "") {
            console.log("Showlert is: ", showAlert, ". Not all fiels are full. Name: ", name, ", Password: ", password)
            setAlertMsg("One or more fields are empty!")
            setShowAlert(true)
        }
        else {
            let URL = "https://localhost:7275/api/User/LogIn";
            let data = {
                'userName': name,
                'password': password
            }
            let option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            console.log("Before fetch. data: ", data);
            console.log(showAlert);
            if (showAlert != true) {
                console.log("Before fetch. name: ", name + " Password: ", password)
                try {
                    await fetch(URL, option)
                        .then((response) => {
                            response.json().then((data) => {
                                console.log("Server responsed!! Data: " + JSON.stringify(data));
                                console.log("User id is: " + data.userId)
                                if (data.userId != undefined && data.userId > 0) {
                                    if (data.userId == 20) //This is the admin id                                       
                                    {
                                        console.log("Admin is logged in!")
                                        setWait(true)
                                        let date = new Date();
                                        date.setTime(date.getTime() + (1 * 60 * 60 * 1000)); // 1 hour
                                        document.cookie = `admin=true; expires=${date.toUTCString()}; path=/`;
                                        setTimeout(() => {
                                            //window.location.href = "Register/Application/Admin";
                                            NavigateFunc(data.userId, data.userName)
                                            //navigate("/Admin")
                                        }, 2000)
                                    }
                                    else {
                                        NavigateFunc(data.userId, data.userName)
                                    }
                                }
                                else {
                                    if (data.title == "Not Found" || data.status == 404) {
                                        console.log("User not found!")
                                        setAlertMsg("User not found in database. Please register.")
                                        setShowAlert(true)
                                        setTimeout(() => {
                                            navigate("/SignUp")
                                        }, 5000);
                                    }
                                }
                            }).catch((error) => {
                                console.error('Error:', error);
                                setAlertMsg("Error: " + error);
                                setShowAlert(true);
                            }).finally(() => {
                                console.log("Finally");
                            });
                        })
                }
                catch (Error) {
                    console.log("Error:  ", Error.message);
                    setAlertMsg("Error:  " + Error.message)
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false)
                    }, 3000);
                }
            }
        }
    }

    function loginClicked() {
        console.log('login clicked')
        if ((name != null && password != null) && (name != "" && password != "")) {
            console.log("Not null")
            FetchData()
        }
        else {
            console.log("Not all fiels are full")
            setAlertMsg("One or more fields are empty!")
            console.log(name, password)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 2000)

        }
    }


    return (
        <div id="LogIn" >
            <img src={logoPhoto} alt="Logo" className="photo" />
            <div className="back">
                <div className="LogInFields">
                    <h1>התחברות</h1>
                    {/* work on the onChange */}
                    <div style={{ margin: " 4% 4% 4% 0% " }}>
                        <TextField
                            header="Name"
                            type="text"
                            label="Name"
                            onChange={(ev) => {
                                const englishTextRegex = /^[A-Za-z]+$/;
                                if (englishTextRegex.test(ev.target.value) || ev.target.value === "") {
                                    setShowAlert(false);
                                    setname(ev.target.value); // Set the valid input to the name variable
                                } else {
                                    setShowAlert(true);
                                    setAlertMsg("User name must be in English letters only.");
                                }
                            }}
                        />
                    </div>
                    <div style={{ margin: "4% 4% 4% 0% " }}>
                        <TextField header="Password" type="password" label="Password" onChange={(ev) => {
                            const numberRegex = /^[0-9]+$/;
                            if (numberRegex.test(ev.target.value) || ev.target.value === "") {
                                setShowAlert(false);
                                setpassword(ev.target.value)
                            } else {
                                setAlertMsg("Password must contain only numbers.");
                                setShowAlert(true);
                            }
                        }} />
                    </div>
                    <div onClick={loginClicked}><BasicButtons value="התחבר" /></div>
                    {wait ? <WaitComponent /> : null}
                    {showAlert ? <ErrorAlert msg={alertMsg} /> : null}
                    <div><a href="SignUp" >חדש במערכת? עבור להרשמה</a></div>
                    
                    <h4>
                        <a href="Admin" >admin</a>
                    </h4>

                </div>
            </div>
        </div>)
}


export default LogIn;





//Code that we don't need anymore. I save it here just in case we need it again. Sara.

/* async function postData(url = '', data = {}) {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Accept', 'text/plain');
     // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
     headers.append('Origin', 'http://localhost:3000');
     const response = await fetch(url, {
         method: 'POST',
         mode: 'cors',
         cache: 'no-cache',
         headers: headers,
         body: JSON.stringify(data)
     });
     console.log(response)
     if (response.ok) {
         const jsonData = await response.json();
         console.log("server sent: ", jsonData)
         console.log("Success")
         setUser(jsonData)
     }
     else {
 
     }
     return response.json()
 }*/


/*const subClick = async () => {
    console.log('sub click')
    let data = {
        'userName': name,
        'password': password
    }
    console.log(JSON.stringify(data))
    try {
        const response = await postData('https://localhost:7275/api/User/LogIn', data);
        const jsonData = await response.clone().json();
        console.log("Server responsed!! Data: " + JSON.stringify(jsonData));

        if (jsonData === undefined) {
            console.log("Error in server!");
        } else {
            NavigateFunc(jsonData);
        }
    } catch (error) {
        console.log('Authorization failed: ' + error.message);
    }

}*/
/*
const nodemailer = require('nodemailer');

async function sendEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'sara.daum.il@gmail.com',
        pass: 'sara&Google305'
      }
    });

    const mailOptions = {
      from: 'library.project@gmail.com',
      to: 'sara.daum.il@example.com',
      subject: 'Hello',
      text: 'Do you try enter to system??.'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

*/