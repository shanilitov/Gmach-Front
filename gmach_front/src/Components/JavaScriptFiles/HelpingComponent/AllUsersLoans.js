// Fetch data from the API endpoint
fetch("https://localhost:7275/api/LoanDetails/GetAll")
    .then(response => response.json())
    .then(data => {
        // Create a container element to hold the cards
        const container = document.createElement("div");
        container.classList.add("card-container");

        // Iterate over the data and create a card for each loan
        data.forEach(loan => {
            // Create a card element
            const card = document.createElement("div");
            card.classList.add("card");

            // Create elements for each loan property and add them to the card
            const loanId = document.createElement("p");
            loanId.textContent = `Loan ID: ${loan.id}`;
            card.appendChild(loanId);

            const borrower = document.createElement("p");
            borrower.textContent = `Borrower: ${loan.borrower}`;
            card.appendChild(borrower);

            // Add a click event listener to the card to show more details
            card.addEventListener("click", () => {
                // Show more details for the clicked loan
                showLoanDetails(loan);
            });

            // Add the card to the container
            container.appendChild(card);
        });

        // Append the container to the document body
        document.body.appendChild(container);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

// Function to show more details for a loan
function showLoanDetails(loan) {
    // Implement your logic to show more details for the loan
    // For example, you can display a modal or navigate to a new page
    console.log("Loan details:", loan);
}
