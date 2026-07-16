// =====================================
// FOOTER
// =====================================

function loadFooter() {

    const footer = document.getElementById("footerMount");

    if (!footer) return;

    const year = new Date().getFullYear();

    footer.innerHTML = `

<footer class="footer">

<div class="container">

<div class="footer-grid">

<div class="footer-section">

<h2 class="footer-logo">

🛒 Market

</h2>

<p>

Your trusted online shopping destination.

Shop Electronics, Fashion, Home,

Beauty, Sports, Books and much more

at the best prices.

</p>

</div>

<div class="footer-section">

<h3>

Quick Links

</h3>

<ul class="footer-links">

<li><a href="index.html">🏠 Home</a></li>

<li><a href="shop.html">🛍 Shop</a></li>

<li><a href="search.html">🔍 Search</a></li>

<li><a href="cart.html">🛒 Cart</a></li>

<li><a href="checkout.html">💳 Checkout</a></li>

</ul>

</div>

<div class="footer-section">

<h3>

Customer

</h3>

<ul class="footer-links">

<li><a href="orders.html">📦 Orders</a></li>

<li><a href="wishlist.html">❤️ Wishlist</a></li>

<li><a href="profile.html">👤 Profile</a></li>

<li><a href="login.html">🔐 Login</a></li>

<li><a href="register.html">📝 Register</a></li>

</ul>

</div>

<div class="footer-section">

<h3>

Support

</h3>

<p>📧 support@market.com</p>

<p>📞 +91 9876543210</p>

<p>📍 Bengaluru, Karnataka, India</p>

<p>🕒 Mon - Sat : 9:00 AM - 6:00 PM</p>

</div>

</div>

<hr>

<div class="footer-bottom">

<div>

© ${year} Market. All Rights Reserved.

</div>

<div>

<a href="#">Privacy Policy</a>

|

<a href="#">Terms & Conditions</a>

|

<a href="#">Refund Policy</a>

</div>

</div>

</div>

</footer>

`;

}

// =====================================
// INITIALIZE FOOTER
// =====================================

document.addEventListener(

"DOMContentLoaded",

function(){

loadFooter();

}

);