// =====================================
// Authentication Functions
// =====================================


// ===============================
// LOGIN
// ===============================

async function login(email, password){

    const result = await apiPost(

        "/auth/login",

        {

            email: email,

            password: password

        }

    );

    if(result.success){

        saveToken(result.token);

        saveUser(result.user);

    }

    return result;

}



// ===============================
// REGISTER
// ===============================

async function register(fullname, email, phone, password){

    return await apiPost(

        "/auth/register",

        {

            fullname: fullname,

            email: email,

            phone: phone,

            password: password

        }

    );

}



// ===============================
// GET CURRENT USER
// ===============================

async function getCurrentUser(){

    return await apiGet(

        "/auth/me"

    );

}



// ===============================
// LOGOUT
// ===============================

function logoutUser(){

    logout();

}



// ===============================
// CHECK LOGIN
// ===============================

function requireLogin(){

    if(!isLoggedIn()){

        window.location.href="login.html";

    }

}



// ===============================
// CHECK GUEST
// ===============================

function requireGuest(){

    if(isLoggedIn()){

        window.location.href="index.html";

    }

}



// ===============================
// GET USER NAME
// ===============================

function getUserName(){

    const user = getUser();

    if(user){

        return user.fullname;

    }

    return "";

}



// ===============================
// GET USER EMAIL
// ===============================

function getUserEmail(){

    const user = getUser();

    if(user){

        return user.email;

    }

    return "";

}



// ===============================
// GET USER ROLE
// ===============================

function getUserRole(){

    const user = getUser();

    if(user){

        return user.role;

    }

    return "guest";

}



// ===============================
// IS ADMIN
// ===============================

function isAdmin(){

    return getUserRole() === "admin";

}



// ===============================
// AUTO LOGOUT IF TOKEN MISSING
// ===============================

(function(){

    const protectedPages = [

        "profile.html",

        "cart.html",

        "checkout.html",

        "wishlist.html",

        "orders.html"

    ];

    const page = window.location.pathname.split("/").pop();

    if(

        protectedPages.includes(page)

        &&

        !isLoggedIn()

    ){

        window.location.href="login.html";

    }

})();