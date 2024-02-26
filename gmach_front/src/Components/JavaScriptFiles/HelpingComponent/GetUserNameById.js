import { json } from "react-router-dom";

export default function GetUserNameById(id){
    
    const token = localStorage.getItem('token');

    try{
        return fetchUserName(id)
    }
    catch(err){
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
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Data received:", data);
            return data; // Returning JSON object instead of JSON string
        } catch (err) {
            console.error("Error fetching data:", err);
            throw err;
        }
    }
}