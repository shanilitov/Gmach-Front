import React, { useEffect, useState } from "react";
import Table from "./DataTable";


// Fetch data from the API
fetch("https://localhost:7275/api/Deposit/GetAll")
    .then(response => response.json())
    .then(data => {
        // Create a table element
        const table = document.createElement("table");

        // Create table headers
        const headers = ["User", "Amount", "Date"];
        const headerRow = document.createElement("tr");
        headers.forEach(headerText => {
            const header = document.createElement("th");
            header.textContent = headerText;
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);

        // Create table rows with deposit details
        data.forEach(deposit => {
            const row = document.createElement("tr");

            // Create table cells for each deposit detail
            const userCell = document.createElement("td");
            userCell.textContent = deposit.user;
            row.appendChild(userCell);

            const amountCell = document.createElement("td");
            amountCell.textContent = deposit.amount;
            row.appendChild(amountCell);

            const dateCell = document.createElement("td");
            dateCell.textContent = deposit.date;
            row.appendChild(dateCell);

            // Add click event listener to each row
            row.addEventListener("click", () => {
                // Handle click event to show more details
                console.log("Clicked on deposit:", deposit);
                // Add your code to show more details here
            });

            // Add the row to the table
            table.appendChild(row);
        });

        // Append the table to the document body or a specific element
        document.body.appendChild(table);
    })
    .catch(error => {
        console.error("Error fetching deposits:", error);
        // Handle error here
    });



const AllUsersDeposits = (props) => {
    const [deposits, setDeposits] = useState([]);
    let isAdmin = props.admin;

    useEffect(() => {
        fetch("https://localhost:7275/api/Deposit/GetAll")
            .then((response) => response.json())
            .then((data) => {
                setDeposits(data);
            })
            .catch((error) => {
                console.error("Error fetching deposits:", error);
                // Handle error here
            });
    }, []);


    const handleRowClick = (deposit) => {
        console.log("Clicked on deposit:", deposit);
        // Add your code to show more details here
    };

    return (
        (isAdmin ?
            < >
                <div style={{width:"250%"}}>
                    <h3>All users deposits:</h3>
                    <Table /></div>
            </> : null)
    );
};

export default AllUsersDeposits;
/**
 * {deposits.map((deposit) => (
                        <tr key={deposit.id} onClick={() => handleRowClick(deposit)}>
                            <td>{deposit.user}</td>
                            <td>{deposit.amount}</td>
                            <td>{deposit.date}</td>
                        </tr>
                    ))}
 */