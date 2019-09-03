/*
 * Begins DOM manipulation once content is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
    getEmployees().then(employeeSearchListener);
});

/**
 * Gets employees from randomuser.me API
 * Displays employees
 */
async function getEmployees() {
    await fetch(
        "https://randomuser.me/api/?results=30&nat=us&inc=name,email,location,picture"
    )
        .then(response => response.json())
        .then(displayEmployees)
        .catch(getEmployeesError);
}

/**
 * Displays employees
 * @param {*} jsonData Employee JSON object
 */
function displayEmployees(jsonData) {
    // Loops through each employee
    jsonData.results.forEach(employee => {
        // Creates employee card
        const employeeCard = document.createElement("div");
        employeeCard.className = "employee-card";
        document.querySelector("#employee-card-container").appendChild(employeeCard);

        // Creates employee picture
        const employeePicture = document.createElement("img");
        employeePicture.className = "employee-card-picture";
        employeePicture.src = employee.picture.thumbnail;
        employeePicture.alt = "Employee Picture";
        employeeCard.appendChild(employeePicture);

        // Creates employee info container (contains name, email, and location)
        const employeeCardInfoContainer = document.createElement("div");
        employeeCardInfoContainer.className = "employee-card-info";
        employeeCard.appendChild(employeeCardInfoContainer);

        // Creates employee name
        const employeeName = document.createElement("h2");
        employeeName.className = "employee-card-info-name";
        employeeName.textContent = `${employee.name.first} ${employee.name.last}`;
        employeeCardInfoContainer.appendChild(employeeName);

        // Creates employee email
        const employeeEmail = document.createElement("h3");
        employeeEmail.className = "employee-card-info-details";
        employeeEmail.textContent = employee.email;
        employeeCardInfoContainer.appendChild(employeeEmail);

        // Creates employee city
        const employeeCity = document.createElement("h3");
        employeeCity.classList = "employee-card-info-details employee-card-info-city";
        employeeCity.textContent = employee.location.city;
        employeeCardInfoContainer.appendChild(employeeCity);
    });
}

/**
 * Prints error from random user API fetch
 * @param {*} error Error message string
 */
function getEmployeesError(error) {
    console.log(error);
}

/**
 * Creates an event listener for when search box text is changed
 */
function employeeSearchListener() {
    const employeeCards = document.querySelectorAll(".employee-card");
    document.querySelector("#search").addEventListener("input", event => {
        searchEmployees(employeeCards, event);
    });
}

/**
 * Shows and hides employee cards based on search text matching the name of the employee
 * @param {*} employeeCards An array of employee card elements
 * @param {*} event The event that was triggered by the event listener
 */
function searchEmployees(employeeCards, event) {
    // Text from the search box
    const searchText = event.target.value.toLowerCase();

    // Shows or hides employee cards
    employeeCards.forEach(employee => {
        const employeeName = employee.childNodes[1].firstChild.textContent;
        if (employeeName.includes(searchText)) {
            employee.style.display = '';
        } else {
            employee.style.display = 'none';
        }
    });
}
