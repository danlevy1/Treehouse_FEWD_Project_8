/*
 * Begins DOM manipulation once content is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
    getEmployees().then(jsonData => {
        if (jsonData !== null) {
            const employeeCards = document.querySelectorAll(".employee-card");
            employeeSearchListener(employeeCards);
            employeeCardListener(employeeCards, jsonData);
        }
    });
});

/**
 * Gets employees from randomuser.me API
 * Displays employees
 */
async function getEmployees() {
    let jsonData;
    await fetch(
        "https://randomuser.me/api/?results=12&nat=us&inc=name,email,location,picture,cell,dob"
    )
        .then(response => response.json())
        .then(data => {
            jsonData = data.results;
            displayEmployees(jsonData);
        })
        .catch(getEmployeesError);
    return jsonData;
}

/**
 * Displays employees
 * @param {*} jsonData Employee JSON object
 */
function displayEmployees(jsonData) {
    // Loops through each employee
    jsonData.forEach(employee => {
        // Creates employee card
        const employeeCard = document.createElement("div");
        employeeCard.className = "employee-card";
        document.querySelector("#employee-card-container").appendChild(employeeCard);

        // Creates employee picture
        const employeePicture = document.createElement("img");
        employeePicture.className = "employee-card-picture";
        employeePicture.src = employee.picture.medium;
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
 * @param {*} employeeCards An array of employee card elements
 */
function employeeSearchListener(employeeCards) {
    document.querySelector("#search").addEventListener("input", event => {
        searchEmployees(employeeCards, event);
    });
}

/**
 * Creates an event listener for when an employee card is clicked
 * @param {*} employeeCards An array of employee card elements
 * @param {*} employees An array of employees
 */
function employeeCardListener(employeeCards, employees) {
    // console.log(employeeCards);
    employeeCards.forEach((employeeCard, index) => {
        employeeCard.addEventListener("click", event => {
            displayModalView(employees, index);
        });
    });
}

/**
 * Creates and displays a modal view for the employee
 * @param {*} employees An array of employees
 * @param {*} index The index of the employee clicked on the the employees array
 */
function displayModalView(employees, index) {
    const bodyElement = document.querySelector("body");
    const employee = employees[index];

    // Creates modal view container
    const modalViewContainer = document.createElement("div");
    modalViewContainer.className = "modal-view-container";
    bodyElement.appendChild(modalViewContainer);

    // Adds click event listener to modal view
    modalViewContainer.addEventListener("click", event => {
        if (event.target.className === "modal-view-container") {
            bodyElement.removeChild(modalViewContainer);
        }
    });

    // Creates modal view
    const modalView = document.createElement("div");
    modalView.className = "modal-view";
    modalViewContainer.appendChild(modalView);

    // Creates close button
    const closeButton = document.createElement("img");
    closeButton.className = "modal-view-close-button";
    closeButton.src = "img/close-icon-fa.svg";
    closeButton.alt = "Close Button";
    modalView.appendChild(closeButton);

    // Adds click event listener to close button
    closeButton.addEventListener("click", () => {
        bodyElement.removeChild(modalViewContainer);
    });

    // Creates left arrow button
    const leftArrow = document.createElement("img");
    leftArrow.className = "modal-view-arrow-button modal-view-left-arrow-button";
    leftArrow.src = "img/left-icon-fa.svg";
    leftArrow.alt = "Left Arrow";
    modalView.appendChild(leftArrow);

    // Adds click event listener to left arrow button
    leftArrow.addEventListener("click", () => {
        index = getPrevEmployee(employees, index);
        updateModalView(
            employees[index],
            employeePicture,
            employeeName,
            employeeEmail,
            employeeCity,
            employeePhone,
            employeeAddress,
            employeeBirthday
        );
    });

    // Creates right arrow button
    const rightArrow = document.createElement("img");
    rightArrow.className = "modal-view-arrow-button modal-view-right-arrow-button";
    rightArrow.src = "img/right-icon-fa.svg";
    rightArrow.alt = "Right Arrow";
    modalView.appendChild(rightArrow);

    // Adds click event listener to right arrow button
    rightArrow.addEventListener("click", () => {
        index = getNextEmployee(employees, index);
        updateModalView(
            employees[index],
            employeePicture,
            employeeName,
            employeeEmail,
            employeeCity,
            employeePhone,
            employeeAddress,
            employeeBirthday
        );
    });

    // Creates employee picture
    const employeePicture = document.createElement("img");
    employeePicture.className = "modal-view-employee-picture";
    employeePicture.src = employee.picture.large;
    employeePicture.alt = "Employee Picture";
    modalView.appendChild(employeePicture);

    // Creates employee name
    const employeeName = document.createElement("h2");
    employeeName.className = "modal-view-employee-name capitalize";
    employeeName.textContent = `${employee.name.first} ${employee.name.last}`;
    modalView.appendChild(employeeName);

    // Creates employee email
    const employeeEmail = document.createElement("h3");
    employeeEmail.className = "modal-view-employee-details";
    employeeEmail.textContent = employee.email;
    modalView.appendChild(employeeEmail);

    // Creates employee city
    const employeeCity = document.createElement("h3");
    employeeCity.classList = "modal-view-employee-details capitalize";
    employeeCity.textContent = employee.location.city;
    modalView.appendChild(employeeCity);

    // Creates line
    const lineDiv = document.createElement("div");
    lineDiv.className = "modal-view-line";
    modalView.appendChild(lineDiv);

    // Creates employee cell phone number
    const employeePhone = document.createElement("h3");
    employeePhone.classList = "modal-view-employee-details";
    employeePhone.textContent = employee.cell;
    modalView.appendChild(employeePhone);

    // Creates employee address
    const employeeAddress = document.createElement("h3");
    employeeAddress.classList = "modal-view-employee-details capitalize";
    employeeAddress.textContent = `${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
    modalView.appendChild(employeeAddress);

    // Creates employee Birthday
    const employeeBirthday = document.createElement("h3");
    employeeBirthday.classList = "modal-view-employee-details";
    const dob = new Date(employee.dob.date);
    employeeBirthday.textContent = `Birthday: ${dob.getMonth() +
        1}/${dob.getDate()}/${dob.getFullYear()}`;
    modalView.appendChild(employeeBirthday);
}

/**
 * Returns the index of the next employee in the list
 * @param {*} employees An array of employees
 * @param {*} currentIndex The current index
 */
function getNextEmployee(employees, currentIndex) {
    if (currentIndex + 1 > employees.length - 1) {
        return 0;
    } else {
        return currentIndex + 1;
    }
}

/**
 * Returns the index of the previous employee in the list
 * @param {*} employees An array of employees
 * @param {*} currentIndex The current index
 */
function getPrevEmployee(employees, currentIndex) {
    if (currentIndex - 1 < 0) {
        return employees.length - 1;
    } else {
        return currentIndex - 1;
    }
}

/**
 * Updates the modal view to show a different employee
 * @param {*} employee The employee to show
 * @param {*} pictureElement The employee picture element
 * @param {*} nameElement The employee name element
 * @param {*} emailElement The employee email element
 * @param {*} cityElement The employee city element
 * @param {*} phoneElement The employee phone element
 * @param {*} addressElement The employee address element
 * @param {*} birthdayElement The employee birthday element
 */
function updateModalView(
    employee,
    pictureElement,
    nameElement,
    emailElement,
    cityElement,
    phoneElement,
    addressElement,
    birthdayElement
) {
    pictureElement.src = employee.picture.large;
    nameElement.textContent = `${employee.name.first} ${employee.name.last}`;
    emailElement.textContent = employee.email;
    cityElement.textContent = employee.location.city;
    phoneElement.textContent = employee.cell;
    addressElement.textContent = `${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
    const dob = new Date(employee.dob.date);
    birthdayElement.textContent = `Birthday: ${dob.getMonth() +
        1}/${dob.getDate()}/${dob.getFullYear()}`;
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
            employee.style.display = "";
        } else {
            employee.style.display = "none";
        }
    });
}
