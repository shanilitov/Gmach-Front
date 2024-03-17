import React, { useContext, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import WaitComponent from './WaitComponent';
import { data } from "jquery";


export default function AllUsers() {

    const token = localStorage.getItem('token')

    const id = 20
    const name = 'adPlusadMinus'

    const [users, setUsers] = useState([])
    const [userUnderWarning, setUsersUnderWarning] = useState([])

    const [flag, setFlag] = useState(true)

    useEffect(() => {
        if (flag)
            fetchAllUsers()
        setTimeout(() => {
            setFlag(false)
            console.log(users)
            console.log(userUnderWarning)
        }, 3000);
    }, [])

    function fetchAllUsers() {
        fetch(`https://localhost:7275/api/User/GetAllUsers`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'text/plain'
            }
        })
            .then(res =>
                res.json()

            ).then(
                data => {
                    console.log(data)
                    setUsers(data)
                }
            )
            .then(
                users.forEach(u => {
                    fetch(`https://localhost:7275/api/User/IsUserOnBlackList/${u.userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'accept': 'text/plain'
                        }
                    })
                        .then(res => {
                            if (res.ok) {
                                let ans = res.json()
                                console.log('ans is', ans)
                                if (ans) {
                                    let temp = userUnderWarning
                                    temp.add(u.userId)
                                    setUsersUnderWarning(temp)
                                    console.log('user under warning', userUnderWarning)
                                }
                            }
                        })
            })
            )
            .catch(err => console.log(err))
    }

    

    const removeUserToWarningList = (userId) => {

        fetch(`https://localhost:7275/api/User/RemoveUserToBlackList/${userId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': 'text/plain'
                }
            }
        ).then(res => {
            if (res.ok) {
                console.log('Success');

            }
        }
        ).catch(error => console.error('Error:', error));


    }

    const usersDisplay = users.map((user, index) => (
        <div key={index}>
            {`Name: ${user.userName}`}
            {`Email: ${user.userEmail}`}
            {`Phone: ${user.userPhone}`}
            {userUnderWarning.findIndex(u => u == user.userId) !== -1 ?
                <div>

                    {`USER UNDER WARNING`}
                    <div style={{ padding: "5%" }}>
                        <Button variant="contained" onClick={() => { removeUserToWarningList(user.userId) }} value="Add" color="primary" >
                            {'Remove user from black list'}
                        </Button>
                    </div>
                </div>
                : <> </>}
        </div>

    ))


    return (
        <div>
            {
                !flag ?
                    <div>
                        {usersDisplay}
                    </div>
                    : <WaitComponent />
            }
        </div>
    )


}