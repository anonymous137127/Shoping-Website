// =====================================
// PAYMENT CONFIG
// =====================================

const UPI_ID = "BHARATPE2O0D0U6X3M52305@unitype";
const MERCHANT_NAME = "Nandi Groups";

document.addEventListener("DOMContentLoaded", () => {

    loadPayment();

});

// =====================================
// LOAD PAYMENT PAGE
// =====================================

function loadPayment() {

    const cart = JSON.parse(localStorage.getItem("market_cart_v1") || "{}");

    const ids = Object.keys(cart);

    if (ids.length === 0) {

        alert("Your cart is empty.");

        window.location.href = "cart.html";

        return;

    }

    let total = 0;

    let html = "";

    ids.forEach(id => {

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
// GENERATE QR
// =====================================

function generateQR(amount) {

    const upiLink =
        `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&cu=INR`;

    document.getElementById("paymentQR").src =
        `https://quickchart.io/qr?size=300&text=${encodeURIComponent(upiLink)}`;

}

// =====================================
// COUNTDOWN
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

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    const delivery = JSON.parse(localStorage.getItem("delivery") || "{}");

    if (!delivery.address) {

        alert("Delivery address not found.");

        window.location.href = "checkout.html";

        return;

    }

    const btn = document.getElementById("paymentBtn");

    if (btn) {

        btn.disabled = true;

        btn.innerHTML = "Processing...";

    }

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

                    payment_method: "UPI"

                })

            }

        );

        const data = await response.json();

        if (data.success) {

            localStorage.removeItem("market_cart_v1");
            localStorage.removeItem("delivery");

            window.location.href =
                "success.html?order=" + data.order_id;

        } else {

            alert(data.message || "Unable to place order.");

        }

    } catch (err) {

        console.error(err);

        alert("Unable to connect to the server.");

    }

    if (btn) {

        btn.disabled = false;

        btn.innerHTML = "I Have Completed Payment";

    }

}