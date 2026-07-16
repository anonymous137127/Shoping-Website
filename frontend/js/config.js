// =====================================
// API Configuration
// =====================================

const CONFIG = {

    API_URL: "https://shopping-backend-s8l8.onrender.com/api",

    IMAGE_URL: "https://shopping-backend-s8l8.onrender.com",

    TOKEN_KEY: "token",

    USER_KEY: "user"

};


// =====================================
// Get JWT Token
// =====================================

function getToken(){

    return localStorage.getItem(CONFIG.TOKEN_KEY);

}


// =====================================
// Save JWT Token
// =====================================

function saveToken(token){

    localStorage.setItem(

        CONFIG.TOKEN_KEY,

        token

    );

}


// =====================================
// Remove JWT Token
// =====================================

function removeToken(){

    localStorage.removeItem(

        CONFIG.TOKEN_KEY

    );

}


// =====================================
// Save User
// =====================================

function saveUser(user){

    localStorage.setItem(

        CONFIG.USER_KEY,

        JSON.stringify(user)

    );

}


// =====================================
// Get User
// =====================================

function getUser(){

    const user = localStorage.getItem(

        CONFIG.USER_KEY

    );

    return user ? JSON.parse(user) : null;

}


// =====================================
// Logout
// =====================================

function logout(){

    localStorage.removeItem(

        CONFIG.TOKEN_KEY

    );

    localStorage.removeItem(

        CONFIG.USER_KEY

    );

    window.location.href="login.html";

}


// =====================================
// Check Login
// =====================================

function isLoggedIn(){

    return getToken() !== null;

}