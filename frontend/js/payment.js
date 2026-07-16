// =====================================
// PAYMENT CONFIG
// =====================================

const UPI_ID = "BHARATPE2O0D0U6X3M52305@unitype";
const MERCHANT_NAME = "Nandi Groups";

document.addEventListener("DOMContentLoaded", () => {
    loadPayment();
});

// =====================================
// LOAD PAYMENT
// =====================================

function loadPayment() {

    const cart = JSON.parse(localStorage.getItem("market_cart_v1") || "{}");

    if (Object.keys(cart).length === 0) {

        alert("Your cart is empty.");

        window.location.href = "cart.html";

        return;

    }

    let total = 0;

    let html = "";

    Object.keys(cart).forEach(id => {

        const product = getProductById(id);

        if (!product) return;

        const qty = cart[id];

        const subtotal = product.price * qty;

        total += subtotal;

        html += `

        <div class="summary-item">

            <span>${product.name} × ${qty}</span>

            <span>₹${subtotal.toLocaleString("en-IN")}</span>

        </div>

        `;

    });

    document.getElementById("orderSummary").innerHTML = html;

    document.getElementById("totalAmount").innerHTML =
        "₹" + total.toLocaleString("en-IN");

    document.getElementById("upiId").innerHTML = UPI_ID;

    generateQR(total);

    countdown();

}

// =====================================
// QR
// =====================================

function generateQR(amount) {

    const upi =

        `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&cu=INR`;

    document.getElementById("paymentQR").src =

        `https://quickchart.io/qr?size=300&text=${encodeURIComponent(upi)}`;

}

// =====================================
// TIMER
// =====================================

function countdown() {

    let sec = 5;

    const timer = document.getElementById("timer");

    timer.innerHTML = sec;

    const interval = setInterval(() => {

        sec--;

        if (sec >= 0) {

            timer.innerHTML = sec;

        } else {

            clearInterval(interval);

            timer.innerHTML = "Waiting Payment";

        }

    }, 1000);

}

// =====================================
// PAYMENT COMPLETED
// =====================================

async function paymentCompleted() {

    const token = getToken();

    if (!token) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    const delivery = JSON.parse(

        localStorage.getItem("delivery") || "{}"

    );

    if (!delivery.address) {

        alert("Please complete checkout.");

        window.location.href = "checkout.html";

        return;

    }

    const cart = JSON.parse(

        localStorage.getItem("market_cart_v1") || "{}"

    );

    let products = [];

    Object.keys(cart).forEach(id => {

        const product = getProductById(id);

        if (!product) return;

        products.push({

            product_id: product.id,

            name: product.name,

            price: product.price,

            quantity: cart[id]

        });

    });

    if (products.length === 0) {

        alert("Cart is empty.");

        return;

    }

    const btn = document.getElementById("paymentBtn");

    btn.disabled = true;

    btn.innerHTML = "Processing...";

    try {

        const response = await fetch(

            API_URL + "/orders/place",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + token

                },

                body: JSON.stringify({

                    address:
`${delivery.address},
${delivery.city},
${delivery.state},
${delivery.pincode}`,

                    payment_method: "UPI",

                    products: products

                })

            }

        );

        const data = await response.json();

        console.log(data);

        if (response.ok && data.success) {

            localStorage.removeItem("market_cart_v1");

            localStorage.removeItem("delivery");

            alert("Order placed successfully!");

            window.location.href =

                "success.html?order=" + data.order_id;

        } else {

            alert(data.message || "Unable to place order.");

        }

    } catch (err) {

        console.error(err);

        alert("Server connection failed.");

    }

    btn.disabled = false;

    btn.innerHTML = "I Have Completed Payment";

}