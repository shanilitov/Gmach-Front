import React, { useContext, useState, useNavigate } from "react";
import BasicTextFields from "../HelpingComponent/BasicTextFields";
import BasicButtons from "../HelpingComponent/BasicButtons";


function LogIn() {
  
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate()

    // TODO: Chane it! it's a reuse from my other project.
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
                        navigate(`/admin`)
                    }
                    //if it's a simple worker we will show the branch view
                    else {
                        navigate(`/shop/${temp.user_name}/${temp.branch_id}`)
                    }
                }
                //if this is no user he will see an annoncment and stay in the same screen
                else {
                    alert('please try again or go to sign-in if you still dont have an account')
                    navigate(`/login`)
                }
            })
    }

    const sighninClick = () => {
        console.log('go to sign-in')
        navigate('/signin')

    }
    //here my code ends....


    const myStyle = {
        width: '60%',
        height: '50%',
        marginTop: '15%',
        marginBottom: '25%',
        marginLeft: '40%',
        marginRight: '20%',
    }

    function loginClicked(){
        
    }

    return (
        <div id="LogIn" style={myStyle}>
            <h1>התחברות</h1>
            {/* work on the onChange */}
            <BasicTextFields value="שם" type="text" onChange={(event) => { setname(event.target.value)}} />
            <BasicTextFields value="סיסמא" type="password" />
            <BasicButtons value="התחבר" onClick="loginClicked"/>
            <a href="/sighnin">חדש במערכת? עבור להרשמה</a>
        </div>)
}

export default LogIn;

