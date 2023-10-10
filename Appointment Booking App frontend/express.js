//Load existing users from server
let users;

getUsers();

function getUsers()
{
let storedUsers = axios.get("http://localhost:8000/user/get-users");
storedUsers
.then((response) => {
    users = [...response.data] || [];
    console.log(response);
    
    // Display existing users on page load
    displayUsers();  
})
.catch((error) => console.log(error));
}



// Function to save users to Crud Crud server 
function saveUsersToServer(user) {
    axios.post("http://localhost:8000/user/add-user", user)
    .then((response) => {
        // Display the updated list
        location.reload();
        getUsers();
        console.log(response);
    })
    .catch((error) => console.log(error));
}


function editUserOnServer(userID, user) {
    console.log('user ID to edit user is: ')
    console.log(userID);

    axios.put(`http://localhost:8000/user/edit-user/${userID}`, user)
    .then((response) => {
        // Display the updated list
        location.reload();
        getUsers();
        console.log(response);
    })
    .catch((error) => console.log(error));   
}



function deleteUsersFromServer(userID) {
    console.log('user ID to delete user is: ')
    console.log(userID);

    axios.delete(`http://localhost:8000/user/delete-user/${userID}`)
    .then((response) => {
        console.log('record deleted');
        getUsers();
    })
    .catch((error) => console.log(error));  
}


// Function to add an user to the list
function addUser(name, email, phoneNumber) {
    users.push({'userName' : name, 'userEmail': email, 'userPhoneNumber': phoneNumber});
    const newUser = {'userName' : name, 'userEmail': email, 'userPhoneNumber': phoneNumber};
    
    saveUsersToServer(newUser);
}

// Function to display the submitted details
function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    console.log('users array in display function');
    console.log(users);

    users.forEach((user, index) => {
        const userElement = document.createElement('div');
        userElement.className = 'alert alert-info';

        // Display user details
        userElement.innerHTML = `
            <p><strong>name:</strong> ${user.userName}</p>
            <p><strong>email:</strong> ${user.userEmail}</p>
            <p><strong>phoneNumber:</strong> ${user.userPhoneNumber}</p>
        `;

        // Create Delete and Edit buttons with margin
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger delete-edit-buttons';
        deleteButton.textContent = 'Delete User';
        deleteButton.addEventListener('click', () => {
            // Remove the user from the array and re-display the list
            // users.splice(index, 1);
            deleteUsersFromServer(user.id);
            //saveUsersToLocalStorage();
        });

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning delete-edit-buttons';
        editButton.textContent = 'Edit User';
        editButton.addEventListener('click', () => {
            // Edit the user when the "Edit user" button is clicked
            editUser(index);
        });

        userElement.appendChild(deleteButton);
        userElement.appendChild(editButton);

        userList.appendChild(userElement);
    });
}

// Function to edit an user
function editUser(index) {
    const editedUser = users[index];
    console.log(editedUser);
    const userForm = document.getElementById('userForm');

    // Populate the form with the selected user's details
    document.getElementById('userName').value = editedUser.userName;
    document.getElementById('userEmail').value = editedUser.userEmail;
    document.getElementById('userPhoneNumber').value = editedUser.userPhoneNumber;

    // Change the form submit button to "Save Changes"
    userForm.querySelector('button[type="submit"]').textContent = 'Save Changes';

    // When the form is submitted again, update the user
    userForm.removeEventListener('submit', handleUserSubmission);

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const phoneNumber = parseFloat(document.getElementById('userPhoneNumber').value);

        if (name === null || email === null || phoneNumber === null) {
            alert('Please fill in all fields with valid data.');
        } else {
            // Update the selected user
            console.log(editedUser);
            const tempUser = {'userName' : name, 'userEmail': email, 'userPhoneNumber': phoneNumber};
            editUserOnServer(editedUser.id, tempUser);
            // Reset the form and button text
            userForm.reset();
            userForm.querySelector('button[type="submit"]').textContent = 'Submit';
        }
    });
}

// Handle form submission
function handleUserSubmission(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const phoneNumber = parseFloat(document.getElementById('userPhoneNumber').value);

    if (name === null || email === null || phoneNumber === null) {
        alert('Please fill in all fields with valid data.');
    } else {
        // Add the user to the list
        addUser(name, email, phoneNumber);
        // Reset the form
        e.target.reset();
        
    }
}

const userForm = document.getElementById('userForm');
userForm.addEventListener('submit', handleUserSubmission);
