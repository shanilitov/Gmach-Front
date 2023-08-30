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
    //const [isRegistered, setIsRegistered] = React.useState(true);

   // const navigate = useNavigate();

    // TODO: Change it! it's a reuse from my other project. Shani.
    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response)
        return response.json()
    }

    const subClick = () => {
        let data = {
            'name': name,
            'password': password
        }
        postData('http://localhost:3600/login', data)// TODO: check what is my url
            .then(ans => {

                console.log('ans: ' + ans)
                //ans = [{"id":1,"user_name":"malca","password":"123","branch_id":null,"adamin":1}]
                let temp = JSON.parse(ans)
                console.log(temp)
                temp = temp[0]
                console.log(temp)

                if (temp !== undefined) {
                    //if it's the admin he will see the admin viwe
                    if (temp.adamin) {
                        Navigate(`/admin`)
                    }
                    //if it's a simple worker we will show the branch view
                    else {
                        Navigate(`/shop/${temp.user_name}/${temp.branch_id}`)
                    }
                }
                //if this is no user he will see an annoncment and stay in the same screen
                else {
                    alert('please try again or go to sign-in if you still dont have an account')
                    Navigate(`/login`)
                }
            })
    }

    const sighninClick = () => {
        console.log('go to sign-in')
        Navigate('/signin')

    }
    //here my code ends....


   
    function loginClicked(){
        console.log('login clicked')
        if(name !== '' && password !== ''){
            subClick()
        }
        else{
            alert('invalid field')
        }
    }

    return (
        <div id="LogIn" >
        <img src= {logoPhoto} alt="Logo" className ="photo" />
        <div id="back">
        <div className="LogInFields">
            <h1>התחברות</h1>
            {/* work on the onChange */}
            <BasicTextFields value="שם" type="text" onChange={(event) => { setname(event.target.value)}} />
            <BasicTextFields value="סיסמא" type="password" onChange={(event) => { setpassword(event.target.value)}}/>
            <BasicButtons value="התחבר" onClick={loginClicked()}/>
            <a href="SignUp" >חדש במערכת? עבור להרשמה</a>
        </div>
        </div>
        </div>)
}

export default LogIn;

