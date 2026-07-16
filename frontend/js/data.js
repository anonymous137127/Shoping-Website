// PRODUCT CATALOG
// Each product has a ticket-style SKU which powers the site's signature price-tag element.
const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "device" },
  { id: "fashion", name: "Fashion", icon: "shirt" },
  { id: "home", name: "Home & Kitchen", icon: "home" },
  { id: "beauty", name: "Beauty", icon: "sparkle" },
  { id: "sports", name: "Sports", icon: "ball" },
  { id: "books", name: "Books", icon: "book" }
];

const PRODUCTS = [
  { id: "ELE-1001", name: "Nimbus Wireless Headphones", category: "electronics", price: 3499, mrp: 5999, rating: 4.3, reviews: 2140, stock: 24, img: "headphones", tag: "Bestseller", desc: "Over-ear wireless headphones with 40-hour battery life, active noise cancellation, and plush memory-foam ear cups built for all-day listening." },
  { id: "ELE-1002", name: "Pulse Smartwatch Series 3", category: "electronics", price: 6999, mrp: 9999, rating: 4.1, reviews: 980, stock: 15, img: "smartwatch", tag: "New", desc: "Track heart rate, sleep, and 20+ workout modes with a bright always-on display and 10-day battery life." },
  { id: "ELE-1003", name: "Volt 20000mAh Power Bank", category: "electronics", price: 1299, mrp: 1999, rating: 4.5, reviews: 5310, stock: 60, img: "powerbank", desc: "Fast-charge two devices at once with 20W USB-C output and a compact travel-friendly shell." },
  { id: "ELE-1004", name: "Aria 4K Action Camera", category: "electronics", price: 8499, mrp: 12999, rating: 4.0, reviews: 410, stock: 9, img: "camera", desc: "Waterproof up to 30m with image stabilization, slow-motion capture, and a wide-angle lens." },
  { id: "FAS-2001", name: "Classic Oxford Shirt", category: "fashion", price: 899, mrp: 1499, rating: 4.2, reviews: 1204, stock: 80, img: "shirt", tag: "Bestseller", desc: "100% breathable cotton with a tailored fit, mother-of-pearl buttons, and a wrinkle-resistant weave." },
  { id: "FAS-2002", name: "Everyday Denim Jacket", category: "fashion", price: 1899, mrp: 2999, rating: 4.4, reviews: 760, stock: 33, img: "jacket", desc: "A washed-denim jacket with a relaxed cut, built to layer through every season." },
  { id: "FAS-2003", name: "Trail Runner Sneakers", category: "fashion", price: 2399, mrp: 3999, rating: 4.6, reviews: 2890, stock: 45, img: "sneakers", tag: "New", desc: "Lightweight knit uppers with responsive cushioning for daily miles or daily errands." },
  { id: "FAS-2004", name: "Leather Minimalist Wallet", category: "fashion", price: 749, mrp: 1199, rating: 4.3, reviews: 640, stock: 70, img: "wallet", desc: "Full-grain leather, six card slots, and a slim profile that disappears in your pocket." },
  { id: "HOM-3001", name: "Cascade 7-in-1 Air Fryer", category: "home", price: 4599, mrp: 6999, rating: 4.5, reviews: 1870, stock: 20, img: "airfryer", tag: "Bestseller", desc: "Rapid air technology cooks with up to 85% less oil across 7 preset modes." },
  { id: "HOM-3002", name: "Drift Ceramic Cookware Set", category: "home", price: 3299, mrp: 4999, rating: 4.2, reviews: 530, stock: 18, img: "cookware", desc: "A 6-piece non-stick set with ceramic coating, safe up to 450°F, dishwasher friendly." },
  { id: "HOM-3003", name: "Lumen Smart Desk Lamp", category: "home", price: 1599, mrp: 2499, rating: 4.4, reviews: 990, stock: 40, img: "lamp", desc: "Adjustable color temperature, touch dimming, and a USB charging port built into the base." },
  { id: "HOM-3004", name: "Weighted Comfort Blanket", category: "home", price: 2199, mrp: 3499, rating: 4.6, reviews: 1420, stock: 27, img: "blanket", desc: "A 7kg glass-bead weighted blanket designed to ease you into deeper, calmer sleep." },
  { id: "BEA-4001", name: "Glow Vitamin C Serum", category: "beauty", price: 649, mrp: 999, rating: 4.3, reviews: 3020, stock: 90, img: "serum", tag: "Bestseller", desc: "20% vitamin C with hyaluronic acid to brighten skin tone and soften fine lines." },
  { id: "BEA-4002", name: "Matte Finish Lipstick Set", category: "beauty", price: 899, mrp: 1499, rating: 4.1, reviews: 640, stock: 55, img: "lipstick", desc: "A 4-shade set formulated for 8-hour wear without drying out your lips." },
  { id: "BEA-4003", name: "Hydra Boost Face Cream", category: "beauty", price: 499, mrp: 799, rating: 4.4, reviews: 1560, stock: 100, img: "cream", desc: "A lightweight daily moisturizer with ceramides and SPF 30 protection." },
  { id: "SPO-5001", name: "ProGrip Yoga Mat", category: "sports", price: 999, mrp: 1699, rating: 4.5, reviews: 1980, stock: 65, img: "yogamat", desc: "6mm non-slip cushioning with alignment lines for a steadier, more precise practice." },
  { id: "SPO-5002", name: "Momentum Adjustable Dumbbells", category: "sports", price: 5499, mrp: 7999, rating: 4.3, reviews: 410, stock: 12, img: "dumbbells", tag: "New", desc: "5-52.5 lbs per dumbbell with a quick-dial adjustment that replaces 15 sets of weights." },
  { id: "SPO-5003", name: "Endurance Cycling Bottle", category: "sports", price: 349, mrp: 599, rating: 4.2, reviews: 720, stock: 120, img: "bottle", desc: "Insulated, leak-proof, and built to clip onto any standard bike frame mount." },
  { id: "BOO-6001", name: "The Silent Orchard", category: "books", price: 399, mrp: 599, rating: 4.6, reviews: 2240, stock: 50, img: "book1", tag: "Bestseller", desc: "A quiet, atmospheric novel about three generations tied to one family orchard." },
  { id: "BOO-6002", name: "Atlas of SmallOuntries", category: "books", price: 549, mrp: 799, rating: 4.4, reviews: 890, stock: 38, img: "book2", desc: "An illustrated tour through the history and culture of the world's smallest nations." },
  { id: "BOO-6003", name: "Kitchen Chemistry", category: "books", price: 649, mrp: 999, rating: 4.5, reviews: 1330, stock: 44, img: "book3", desc: "The science behind everyday cooking, explained through 50 approachable recipes." }
];

function formatINR(n) {
  return "₹" + n.toLocaleString("en-IN");
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}
