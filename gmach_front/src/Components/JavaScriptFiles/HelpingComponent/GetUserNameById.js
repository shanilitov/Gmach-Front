import { json } from "react-router-dom";

export default function GetUserNameById(id) {

    const token = localStorage.getItem('token');

    try {
        return fetchUserName(id)
    }
    catch (err) {
        return ''
    }

    async function fetchUserName(id) {
        try {
            fetch(`https://localhost:7275/api/User/GetUserName/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .then(data => {
                    console.log("🎶🎶🎶 is data iPromise??? ", data);
                    if (data) {
                        console.log("🌵  data in fetchUserName(): ", data);
                        return data;
                    }
                    else {
                        console.log("No data in fetchUserName()");
                        return '';
                    }
                }
                )
              
        } catch (err) {
            console.error("Error fetching data:", err);
            throw err;
        }
    }
}