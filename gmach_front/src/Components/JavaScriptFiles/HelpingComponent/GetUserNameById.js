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
            const response = await fetch(`https://localhost:7275/api/User/GetUserName/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json(); // Use .json(), not JSON.parse()
            console.log("🍄🍄Data received:", data, " Type is: ", typeof(data));
            return data;
        } catch (err) {
            console.error("Error fetching data:", err);
            throw err;
        }
    }
}