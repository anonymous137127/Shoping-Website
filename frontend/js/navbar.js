// =====================================
// NAVBAR
// =====================================

function loadNavbar() {

    const header = document.getElementById("headerMount");

    if (!header) return;

    const token = localStorage.getItem("token");

    const loggedIn = !!token;

    let user = {};

    try {

        user = JSON.parse(localStorage.getItem("user")) || {};

    } catch {

        user = {};

    }

    header.innerHTML = `

<header class="navbar">

<div class="container navbar-container">

<a href="index.html" class="logo">

🛒 <strong>NandiMart</strong>

</a>

<nav class="nav-links">

<a href="index.html">Home</a>

<a href="shop.html">Shop</a>

<a href="search.html">Search</a>

<a href="wishlist.html">

❤️ Wishlist

<span id="wishlistCount" class="badge">0</span>

</a>

<a href="cart.html">

🛒 Cart

<span id="cartCount" class="badge">0</span>

</a>

${loggedIn ? `

<a href="orders.html">

📦 Orders

</a>

<a href="profile.html">

👤 ${user.fullname || "Profile"}

</a>

<a href="#" id="logoutBtn">

🚪 Logout

</a>

` : `

<a href="login.html">

🔐 Login

</a>

<a href="register.html">

📝 Register

</a>

`}

</nav>

</div>

</header>

`;

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function (e) {

            e.preventDefault();

            if (!confirm("Are you sure you want to logout?")) return;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("market_cart_v1");
            localStorage.removeItem("market_wishlist");

            window.location.href = "login.html";

        });

    }

    if (typeof updateCartCount === "function") {

        updateCartCount();

    }

    if (typeof updateWishlistCount === "function") {

        updateWishlistCount();

    }

}

// =====================================
// ACTIVE MENU
// =====================================

function activeNavbar() {

    const current = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === current) {

            link.classList.add("active");

        }

    });

}

// =====================================
// INIT
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    loadNavbar();

    activeNavbar();

});