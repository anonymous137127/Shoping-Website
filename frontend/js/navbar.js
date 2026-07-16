// =====================================
// Navbar
// =====================================

function loadNavbar() {

    const header = document.getElementById("headerMount");

    if (!header) return;

    const loggedIn = isLoggedIn();

    const user = getUser();

    header.innerHTML = `

<header class="navbar">

<div class="container navbar-container">

<a href="index.html" class="logo">

🛒 Market

</a>

<nav class="nav-links">

<a href="index.html">Home</a>

<a href="shop.html">Shop</a>

<a href="search.html">Search</a>

<a href="cart.html">

Cart

<span id="cartCount" class="badge">0</span>

</a>

<a href="wishlist.html">

Wishlist

<span id="wishlistCount" class="badge">0</span>

</a>

${
loggedIn
?

`

<a href="orders.html">Orders</a>

<a href="profile.html">

${user.fullname}

</a>

<a href="#" id="logoutBtn">

Logout

</a>

`

:

`

<a href="login.html">

Login

</a>

<a href="register.html">

Register

</a>

`

}

</nav>

</div>

</header>

`;

    if (loggedIn) {

        const logoutBtn = document.getElementById("logoutBtn");

        if (logoutBtn) {

            logoutBtn.addEventListener("click", function (e) {

                e.preventDefault();

                if (confirm("Do you want to logout?")) {

                    logoutUser();

                }

            });

        }

        updateCartCount();

        updateWishlistCount();

    }

}



// =====================================
// Highlight Active Page
// =====================================

function activeNavbar() {

    const current = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === current) {

            link.classList.add("active");

        }

    });

}



// =====================================
// Initialize Navbar
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        loadNavbar();

        activeNavbar();

    }

);