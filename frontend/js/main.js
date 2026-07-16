// ---------- Cart (persisted in localStorage) ----------
const CART_KEY = "market_cart_v1";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
  showToast(`Added to cart`);
}

function setCartQty(id, qty) {
  const cart = getCart();
  if (qty <= 0) { delete cart[id]; } else { cart[id] = qty; }
  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
  renderCartPage && renderCartPage();
}

function cartTotalItems() {
  const cart = getCart();
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = cartTotalItems();
}

// ---------- Toast ----------
let toastTimer;
function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="dot-ok">●</span> ${msg}`;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

// ---------- Rating stars ----------
function renderStars(rating) {
  return ICONS.star.repeat(1); // single star icon paired with numeric rating (kept minimal by design)
}

// ---------- Product card ----------
function productCardHTML(p) {
  const off = Math.round((1 - p.price / p.mrp) * 100);
  return `
  <div class="product-card">
    <a href="product.html?id=${p.id}" aria-label="${p.name}">
      <div class="product-thumb">
        ${p.tag ? `<span class="product-badge">${p.tag}</span>` : ""}
        ${productIcon(p.img)}
      </div>
    </a>
    <div class="product-body">
      <span class="product-cat">${categoryName(p.category)}</span>
      <a href="product.html?id=${p.id}"><h3 class="product-name">${p.name}</h3></a>
      <span class="product-rating">${renderStars(p.rating)} ${p.rating} <span class="count">(${p.reviews.toLocaleString("en-IN")})</span></span>
      <div class="price-ticket">
        <div>
          <span class="price-now">${formatINR(p.price)}</span>
          <span class="price-mrp">${formatINR(p.mrp)}</span>
          <div class="sku">SKU ${p.id}</div>
        </div>
        <span class="price-off">${off}% OFF</span>
      </div>
    </div>
    <button class="add-cart-btn" onclick="addToCart('${p.id}')">Add to Cart</button>
  </div>`;
}

function categoryName(id) {
  const c = CATEGORIES.find(c => c.id === id);
  return c ? c.name : id;
}

// ---------- Shared header/footer injection ----------
function renderChrome() {
  const headerMount = document.getElementById("headerMount");
  if (headerMount) {
    headerMount.innerHTML = `
    <div class="topbar">
      <div class="container">
        <span>Free delivery on orders over ₹499</span>
        <div class="topbar-links">
          <a href="#">Sell on Market</a>
          <a href="#">Help Center</a>
          <a href="#">Track Order</a>
        </div>
      </div>
    </div>
    <header class="site-header">
      <div class="container header-row">
        <a href="index.html" class="logo">market<span class="dot">.</span></a>
        <form class="search-form" role="search" onsubmit="return handleSearch(event)">
          <input type="text" id="searchInput" placeholder="Search for products, brands and more" aria-label="Search products">
          <button type="submit" aria-label="Search">${ICONS.search}</button>
        </form>
        <nav class="header-actions">
          <a href="#">${ICONS.user} Login</a>
          <a href="#">${ICONS.heart} Wishlist</a>
          <a href="cart.html">${ICONS.cart} Cart <span class="cart-count" id="cartCount">0</span></a>
        </nav>
      </div>
    </header>
    <nav class="cat-nav" aria-label="Categories">
      <div class="container">
        ${CATEGORIES.map(c => `<a href="shop.html?cat=${c.id}">${c.name}</a>`).join("")}
      </div>
    </nav>`;
  }

  const footerMount = document.getElementById("footerMount");
  if (footerMount) {
    footerMount.innerHTML = `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4>About</h4>
            <a href="#">Our story</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div>
            <h4>Customer Service</h4>
            <a href="#">Help center</a>
            <a href="#">Returns & refunds</a>
            <a href="#">Shipping info</a>
          </div>
          <div>
            <h4>Policies</h4>
            <a href="#">Terms of use</a>
            <a href="#">Privacy policy</a>
            <a href="#">Seller policy</a>
          </div>
          <div>
            <h4>Connect</h4>
            <a href="#">Instagram</a>
            <a href="#">X (Twitter)</a>
            <a href="#">Facebook</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Market. All rights reserved.</span>
          <span>Built for demo purposes.</span>
        </div>
      </div>
    </footer>`;
  }

  updateCartCount();
}

function handleSearch(e) {
  e.preventDefault();
  const q = document.getElementById("searchInput").value.trim();
  window.location.href = `shop.html?q=${encodeURIComponent(q)}`;
  return false;
}

document.addEventListener("DOMContentLoaded", renderChrome);
