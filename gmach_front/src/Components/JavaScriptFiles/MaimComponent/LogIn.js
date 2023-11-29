import React, { useContext, useState } from "react";
import BasicTextFields from "../HelpingComponent/BasicTextFields";
import BasicButtons from "../HelpingComponent/BasicButtons";
import Bar from "../HelpingComponent/Bar";
import logoPhoto from "../../../img/logoPhoto.png";
import "../../../CSSFiles/StylePage.css"
import SignUp from "./NewUser";
import App from "../../../App";
import { useNavigate } from "react-router-dom";


function LogIn() {

    const [name, setname] = useState('');
    const [password, setpassword] = useState('');


    //Navigate in case user register
    const navigate = useNavigate();
    const NavigateFunc = (data) => {
        navigate('/Register', {props: { 'user': data }})
    }


    async function postData(url = '', data = {}) {
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
        return response.json()
    }

    const subClick = () => {
        console.log('sub click')
        let data = {
            'userName': name,
            'password': password
        }
        console.log(JSON.stringify(data))
        try {
            postData('https://localhost:7275/api/User/LogIn', data)// TODO: check what is my url
                .then((data) => {
                    console.log("Server responsed!! Data: " + JSON.stringify(data));

                    if (data === undefined) {
                        console.log("Error in server!")
                    }
                    else {
                        NavigateFunc(data)
                    }
                })
                .catch(error => console.log('Authorization failed: ' + error.message));

        }
        catch (Error) {
            console.log("Error.message  ", Error.message);
        }
    }


    function loginClicked() {
        console.log('login clicked')

        if (name !== null && password !== null) {
            console.log("Not null")
            subClick()
        }
        else
            console.log("Not all")
    }


    return (
        <div id="LogIn" >
            <img src={logoPhoto} alt="Logo" className="photo" />
            <div className="back">
                <div className="LogInFields">
                    <h1>התחברות</h1>
                    {/* work on the onChange */}
                    <BasicTextFields header="שם" type="text" func={(event) => { setname(event.target.value) }} />
                    <BasicTextFields header="סיסמא" type="password" func={(event) => { setpassword(event.target.value) }} />
                    <div onClick={loginClicked}><BasicButtons value="התחבר" /></div>
                    <a href="SignUp" >חדש במערכת? עבור להרשמה</a>
                </div>
            </div>
        </div>)
}

export default LogIn;

