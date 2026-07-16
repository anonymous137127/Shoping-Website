// =====================================
// CART
// =====================================

const CART_KEY = "market_cart_v1";

function getCart() {

    try {

        return JSON.parse(localStorage.getItem(CART_KEY)) || {};

    } catch {

        return {};

    }

}

function saveCart(cart) {

    localStorage.setItem(

        CART_KEY,

        JSON.stringify(cart)

    );

    updateCartCount();

}

function addToCart(id, qty = 1) {

    const cart = getCart();

    cart[id] = (cart[id] || 0) + qty;

    saveCart(cart);

    showToast("Product added to cart");

}

function setCartQty(id, qty) {

    const cart = getCart();

    if (qty <= 0) {

        delete cart[id];

    } else {

        cart[id] = qty;

    }

    saveCart(cart);

}

function removeFromCart(id) {

    const cart = getCart();

    delete cart[id];

    saveCart(cart);

    if (typeof renderCartPage === "function") {

        renderCartPage();

    }

}

function cartTotalItems() {

    const cart = getCart();

    return Object.values(cart).reduce(

        (a, b) => a + b,

        0

    );

}

function updateCartCount() {

    const el = document.getElementById("cartCount");

    if (el) {

        el.textContent = cartTotalItems();

    }

}

// =====================================
// TOAST
// =====================================

let toastTimer;

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.innerHTML = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

// =====================================
// PRODUCT CARD
// =====================================

function renderStars(rating) {

    return `${ICONS.star} ${rating}`;

}

function categoryName(id) {

    const c = CATEGORIES.find(

        item => item.id === id

    );

    return c ? c.name : id;

}

function productCardHTML(product) {

    const discount = Math.round(

        (1 - product.price / product.mrp) * 100

    );

    return `

<div class="product-card">

<a href="product.html?id=${product.id}">

<div class="product-thumb">

${product.tag ? `<span class="product-badge">${product.tag}</span>` : ""}

${productIcon(product.img)}

</div>

</a>

<div class="product-body">

<span class="product-cat">

${categoryName(product.category)}

</span>

<h3 class="product-name">

${product.name}

</h3>

<div class="product-rating">

${renderStars(product.rating)}

(${product.reviews.toLocaleString("en-IN")})

</div>

<div class="price-ticket">

<div>

<div class="price-now">

${formatINR(product.price)}

</div>

<div class="price-mrp">

${formatINR(product.mrp)}

</div>

</div>

<div class="price-off">

${discount}% OFF

</div>

</div>

<button

class="btn btn-primary btn-block"

onclick="addToCart('${product.id}')">

Add To Cart

</button>

</div>

</div>

`;

}

// =====================================
// HEADER + FOOTER
// =====================================

function renderChrome() {

    if (typeof loadNavbar === "function") {

        loadNavbar();

    }

    if (typeof loadFooter === "function") {

        loadFooter();

    }

    updateCartCount();

    if (typeof updateWishlistCount === "function") {

        updateWishlistCount();

    }

}

// =====================================
// SEARCH
// =====================================

function handleSearch(e) {

    e.preventDefault();

    const input = document.getElementById("searchInput");

    if (!input) return false;

    const q = input.value.trim();

    if (!q) return false;

    window.location.href =

        "search.html?q=" +

        encodeURIComponent(q);

    return false;

}

// =====================================
// INITIALIZE
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        renderChrome();

    }

);