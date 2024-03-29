import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import BasicButtons from "../HelpingComponent/BasicButtons";
import Bar from "../HelpingComponent/Bar";
import "../../../CSSFiles/StylePage.css"
import SignUp from "./NewUser";
import App from "../../../App";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../HelpingComponent/ErrorAlert";
import AdminLogIn from "./AdminLogIn";
import WaitComponent from "../HelpingComponent/WaitComponent";
import logo from '../../../CSSFiles/Images/Logo1.PNG';


function LogIn() {

    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [alertMsg, setAlertMsg] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [user, setUser] = useState({});
    const [wait, setWait] = useState(false);

    const token = localStorage.getItem('token')

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
            login(name, password)

            let URL = "https://localhost:7275/api/User/LogIn";
            let data = {
                'userName': name,
                'password': password
            }
            let option = {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
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

                                        //Set cookie for admin
                                        //let date = new Date();
                                        //date.setTime(date.getTime() + (1 * 60 * 60 * 1000)); // 1 hour
                                        //document.cookie = `admin=true; expires=${date.toUTCString()}; path=/`;


                                        //Set local storage for admin
                                        localStorage.setItem("admin", true);
                                        const expirationDate = new Date();
                                        expirationDate.setTime(expirationDate.getTime() + (1 * 60 * 60 * 1000)); // 1 hour
                                        localStorage.setItem("admin", true);
                                        localStorage.setItem("adminExpiration", expirationDate.getTime());
                                        NavigateFunc(data.userId, data.userName)

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
                    if (Error == 'TypeError: Failed to fetch') { setAlertMsg("Server is down. Please try again later.") }
                    else {
                        setAlertMsg("Error: " + Error.message)
                    }
                    console.log("Error: ", Error.message);
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false)
                    }, 4000);
                }
            }
        }
    }

    // פונקציה שבוצעת התחברות ומקבלת את הטוקן מהשרת
    async function login(username, password) {
        try {
            const response = await fetch("https://localhost:7275/login", {
                method: 'POST',
                body: new URLSearchParams({
                    'username': username,
                    'password': password
                }),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                // שמירת הטוקן ב-LocalStorage (או במקום אחר)
                localStorage.setItem('token', token);

            } else {
                console.error('Failed to login:', response.statusText);
                setAlertMsg('Failed to login:', response.statusText)
                console.log("Error: ", Error.message);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false)
                }, 4000);
            }
        } catch (Error) {
            if (Error == 'TypeError: Failed to fetch') { setAlertMsg("Server is down. Please try again later.") }
            else {
                setAlertMsg("Error: " + Error.message)
            }
            console.log("Error: ", Error.message);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false)
            }, 4000);
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
        <div id="LogIn">
            {[
                <img
                    src={logo}
                    alt="Logo"
                    id="CBarLogo"
                    style={{
                        height: "auto",
                        width: "80%",
                        height: "auto",
                        transition: "0.6s",
                        fontSize: "35px",
                        margin: "0.5%",
                        position: "fixed",
                    }}
                    key="logo"
                />,
                <div className="backLogIn" key="backLogIn">
                    <div className="LogInFields" style={{ color: "#1976d2" }}>
                        <h1>Log In</h1>
                        {/* work on the onChange */}
                        <div style={{ margin: " 4% 4% 4% 4% " }}>


                            <TextField
                                header="Name"
                                type="text"
                                label="Name"
                                onChange={(ev) => {
                                    const englishTextRegex = /^[A-Za-z\s]+$/;
                                    if (
                                        englishTextRegex.test(ev.target.value) ||
                                        ev.target.value === ""
                                    ) {
                                        setShowAlert(false);
                                        setname(ev.target.value); // Set the valid input to the name variable
                                    }
                                }}
                                onBlur={(ev) => {
                                    const englishTextRegex = /^[A-Za-z\s]+$/;
                                    if (
                                        englishTextRegex.test(ev.target.value) ||
                                        ev.target.value === ""
                                    ) {
                                        setShowAlert(false);
                                        setname(ev.target.value); // Set the valid input to the name variable
                                    }
                                }}
                                key="textField1"
                            />


                            <TextField
                                header="Password"
                                type="password"
                                label="Password"
                                onChange={(ev) => {
                                    const numberRegex = /^[0-9]+$/;
                                    if (
                                        numberRegex.test(ev.target.value) ||
                                        ev.target.value === ""
                                    ) {
                                        setShowAlert(false);
                                        setpassword(ev.target.value); // Set the valid input to the name variable
                                    }
                                }}
                                onBlur={(ev) => {
                                    const numberRegex = /^[0-9]+$/;
                                    if (
                                        numberRegex.test(ev.target.value) ||
                                        ev.target.value === ""
                                    ) {
                                        setShowAlert(false);
                                        setpassword(ev.target.value); // Set the valid input to the name variable
                                    }
                                }}
                                key="textField2"
                            />
                        </div>
                        <div onClick={loginClicked}><BasicButtons value="LogIn" /></div>
                        {wait ? <WaitComponent /> : null}
                        {showAlert ? <ErrorAlert msg={alertMsg} /> : null}
                        <div style={{ color: " rgb(80, 133, 202)" }}>
                            <br></br><a href="SignUp" style={{ color: "#1976d2" }}><strong>New user? Please register</strong></a></div>

                        {/* <h4>
                                     <a href="Admin" style={{ color: "#1976d2" }}>admin</a>
                                 </h4> */}



                    </div>
                </div>

            ]}
        </div>
    );
}


export default LogIn;





