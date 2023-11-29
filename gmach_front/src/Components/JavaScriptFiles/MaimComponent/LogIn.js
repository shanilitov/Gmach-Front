import React, { useContext, useState, useNavigate } from "react";
import BasicTextFields from "../HelpingComponent/BasicTextFields";
import BasicButtons from "../HelpingComponent/BasicButtons";
import { Navigate } from "react-router-dom";
import Bar from "../HelpingComponent/Bar";
import logoPhoto from "../../../img/logoPhoto.png";
import "../../../CSSFiles/StylePage.css"
import SignUp from "./NewUser";
import App from "../../../App";

function LogIn() {

    const [name, setname] = useState('');
    const [password, setpassword] = useState('');

    //const navigate = useNavigate();
    /*const changeNavigate = (path) => {
        console.log('navigate to ' + path)
        navigate(path)
    }*/

    //const [isRegistered, setIsRegistered] = React.useState(true);


    // TODO: Change it! it's a reuse from my other project. Shani.
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
        if(response.status === 200){
            console.log("server sent: ", response.json()[2])
            console.log("Success")
            //navigate('/Register')
        }
        return response.json()
    }

   
    const subClick = () => {
        console.log('sub click')
        let data = {
            'userName': name,
            'password': password
        }
        console.log(JSON.stringify(data))
        postData('https://localhost:7275/api/User/LogIn', data)
            .then(response => response.json())
            .then(json => console.log("JSON: ",json))
            .catch(error => console.log('Authorization failed: ' + error.message));

        //todo: add here navigate to "/App" if its Success, with the user details
        //and change the IsRegisted to be true.

        //example:
        // .then(ans => {

        //     console.log('ans: ' + ans)
        //     //ans = [{"id":1,"user_name":"malca","password":"123","branch_id":null,"adamin":1}]
        //     let temp = JSON.parse(ans)
        //     console.log(temp)
        //     temp = temp[0]
        //     console.log(temp)

        //     if (temp !== undefined) {
        //         //if it's the admin he will see the admin viwe
        //         if (temp.adamin) {
        //             Navigate(`/admin`)
        //         }
        //         //if it's a simple worker we will show the branch view
        //         else {
        //             Navigate(`/shop/${temp.user_name}/${temp.branch_id}`)
        //         }
        //     }
        //     //if this is no user he will see an annoncment and stay in the same screen
        //     else {
        //         alert('please try again or go to sign-in if you still dont have an account')
        //         Navigate(`/login`)
        //     }
        // })

    }

    const sighninClick = () => {
        console.log('go to sign-in')
        Navigate('/SignUp')

    }
    //here my code ends....



    function loginClicked() {
        console.log('login clicked')
        // if(name !== '' && password !== ''){
        //     console.log('not empty')
        //     subClick()
        // }
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

