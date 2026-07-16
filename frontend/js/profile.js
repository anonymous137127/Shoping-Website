// =====================================
// Profile Functions
// =====================================


// ===============================
// LOAD PROFILE
// ===============================

async function loadProfile(){

    const result = await apiGet(

        "/users/profile"

    );

    if(result.success){

        document.getElementById("fullname").value = result.user.fullname;

        document.getElementById("email").value = result.user.email;

        document.getElementById("phone").value = result.user.phone;

        document.getElementById("profile").value =

        result.user.profile || "";

    }

    else{

        alert(result.message);

        logoutUser();

    }

}



// ===============================
// UPDATE PROFILE
// ===============================

async function updateProfile(){

    const fullname =

    document.getElementById("fullname").value.trim();

    const phone =

    document.getElementById("phone").value.trim();

    const profile =

    document.getElementById("profile").value.trim();

    const result = await apiPut(

        "/users/profile",

        {

            fullname,

            phone,

            profile

        }

    );

    alert(result.message);

}



// ===============================
// CHANGE PASSWORD
// ===============================

async function changePassword(){

    const oldPassword =

    document.getElementById("oldPassword").value;

    const newPassword =

    document.getElementById("newPassword").value;

    if(newPassword.length < 6){

        alert("Password must be at least 6 characters.");

        return;

    }

    const result = await apiPut(

        "/users/change-password",

        {

            old_password: oldPassword,

            new_password: newPassword

        }

    );

    alert(result.message);

    if(result.success){

        document.getElementById("oldPassword").value="";

        document.getElementById("newPassword").value="";

    }

}



// ===============================
// DELETE ACCOUNT
// ===============================

async function deleteAccount(){

    const confirmDelete = confirm(

        "Are you sure you want to delete your account?"

    );

    if(!confirmDelete){

        return;

    }

    const result = await apiDelete(

        "/users/delete"

    );

    alert(result.message);

    if(result.success){

        logoutUser();

    }

}



// ===============================
// INITIALIZE PROFILE PAGE
// ===============================

function initializeProfile(){

    if(!document.getElementById("profileForm")){

        return;

    }

    loadProfile();

    document

    .getElementById("profileForm")

    .addEventListener(

        "submit",

        function(e){

            e.preventDefault();

            updateProfile();

        }

    );

    document

    .getElementById("passwordForm")

    .addEventListener(

        "submit",

        function(e){

            e.preventDefault();

            changePassword();

        }

    );

    document

    .getElementById("deleteBtn")

    .addEventListener(

        "click",

        deleteAccount

    );

}



// ===============================
// AUTO LOAD
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    initializeProfile

);