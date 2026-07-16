// =====================================
// MARKET CONFIGURATION
// =====================================

const CONFIG = {

    // Backend API
    API_URL: "https://shopping-backend-s8l8.onrender.com/api",

    // Backend Base URL
    IMAGE_URL: "https://shopping-backend-s8l8.onrender.com",

    // LocalStorage Keys
    TOKEN_KEY: "token",
    USER_KEY: "user",
    CART_KEY: "market_cart_v1",
    WISHLIST_KEY: "market_wishlist",
    DELIVERY_KEY: "delivery"

};

// =====================================
// GLOBAL API URL
// =====================================

const API_URL = CONFIG.API_URL;

// =====================================
// TOKEN
// =====================================

function getToken() {

    return localStorage.getItem(CONFIG.TOKEN_KEY);

}

function saveToken(token) {

    localStorage.setItem(

        CONFIG.TOKEN_KEY,

        token

    );

}

function removeToken() {

    localStorage.removeItem(

        CONFIG.TOKEN_KEY

    );

}

// =====================================
// USER
// =====================================

function saveUser(user) {

    localStorage.setItem(

        CONFIG.USER_KEY,

        JSON.stringify(user)

    );

}

function getUser() {

    try {

        return JSON.parse(

            localStorage.getItem(CONFIG.USER_KEY)

        ) || null;

    } catch {

        return null;

    }

}

// =====================================
// LOGIN CHECK
// =====================================

function isLoggedIn() {

    return !!getToken();

}

// =====================================
// LOGOUT
// =====================================

function logout() {

    localStorage.removeItem(CONFIG.TOKEN_KEY);

    localStorage.removeItem(CONFIG.USER_KEY);

    localStorage.removeItem(CONFIG.CART_KEY);

    localStorage.removeItem(CONFIG.WISHLIST_KEY);

    localStorage.removeItem(CONFIG.DELIVERY_KEY);

    window.location.href = "login.html";

}

// =====================================
// AUTH HEADER
// =====================================

function authHeaders() {

    return {

        "Content-Type": "application/json",

        "Authorization": "Bearer " + getToken()

    };

}

// =====================================
// FETCH WRAPPER
// =====================================

async function apiRequest(endpoint, options = {}) {

    const response = await fetch(

        API_URL + endpoint,

        {

            ...options,

            headers: {

                ...authHeaders(),

                ...(options.headers || {})

            }

        }

    );

    return response.json();

}