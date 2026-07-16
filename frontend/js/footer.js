// =====================================
// Footer
// =====================================

function loadFooter() {

    const footer = document.getElementById("footerMount");

    if (!footer) return;

    const year = new Date().getFullYear();

    footer.innerHTML = `

<footer class="footer">

<div class="container">

<div class="footer-grid">

<div>

<h2 class="footer-logo">

🛒 Market

</h2>

<p>

Your trusted online shopping destination.

Shop Electronics, Fashion, Home,

Beauty, Sports and more at the

best prices.

</p>

</div>

<div>

<h3>

Quick Links

</h3>

<ul class="footer-links">

<li><a href="index.html">Home</a></li>

<li><a href="shop.html">Shop</a></li>

<li><a href="search.html">Search</a></li>

<li><a href="cart.html">Cart</a></li>

</ul>

</div>

<div>

<h3>

Customer

</h3>

<ul class="footer-links">

<li><a href="orders.html">Orders</a></li>

<li><a href="wishlist.html">Wishlist</a></li>

<li><a href="profile.html">Profile</a></li>

<li><a href="login.html">Login</a></li>

</ul>

</div>

<div>

<h3>

Contact

</h3>

<p>📧 support@market.com</p>

<p>📞 +91 9876543210</p>

<p>📍 Bengaluru, Karnataka, India</p>

</div>

</div>

<hr>

<div class="footer-bottom">

<p>

© ${year} Market. All Rights Reserved.

</p>

</div>

</div>

</footer>

`;

}

// =====================================
// Initialize Footer
// =====================================

document.addEventListener("DOMContentLoaded", loadFooter);