// =====================================
// PAYMENT CONFIG
// =====================================

const UPI_ID = "BHARATPE2O0D0U6X3M52305@unitype";
const MERCHANT_NAME = "Nandi Groups";

let currentTotal = 0;

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

    currentTotal = total;

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
// TIMER — 5 minutes, MM:SS + progress ring
// =====================================

function countdown() {

    const TOTAL_SECONDS = 5 * 60; // 5 minutes

    let secondsLeft = TOTAL_SECONDS;

    const timerEl = document.getElementById("timer");

    const ringEl = document.getElementById("timerRing");

    const box = document.querySelector(".countdown-box");

    const statusText = document.querySelector(".status-text");

    const statusSub = document.querySelector(".status-sub");

    const circumference = 2 * Math.PI * 45;

    if (ringEl) {

        ringEl.style.strokeDasharray = circumference;

        ringEl.style.strokeDashoffset = 0;

    }

    function formatTime(s) {

        const m = Math.floor(s / 60);

        const sec = s % 60;

        return `${m}:${sec.toString().padStart(2, "0")}`;

    }

    if (timerEl) timerEl.textContent = formatTime(secondsLeft);

    const interval = setInterval(() => {

        secondsLeft--;

        if (secondsLeft < 0) {

            clearInterval(interval);

            if (timerEl) timerEl.textContent = "0:00";

            if (statusText) statusText.textContent = "Payment session expired";

            if (statusSub) statusSub.textContent = "Please retry payment to continue.";

            if (box) box.classList.add("expired");

            return;

        }

        if (timerEl) timerEl.textContent = formatTime(secondsLeft);

        if (ringEl) {

            const progress = secondsLeft / TOTAL_SECONDS;

            ringEl.style.strokeDashoffset = circumference * (1 - progress);

        }

        if (box && secondsLeft <= 30) {

            box.classList.add("urgent");

        }

    }, 1000);

}

// =====================================
// UPI APP DEEP LINKS
// =====================================

function payVia(app) {

    const payeeName = MERCHANT_NAME;

    const note = "Order Payment";

    if (!currentTotal || currentTotal <= 0) {

        alert("Payment details are still loading. Please wait a moment and try again.");

        return;

    }

    const baseParams =
        `pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(payeeName)}&am=${encodeURIComponent(currentTotal)}&cu=INR&tn=${encodeURIComponent(note)}`;

    // App-specific UPI deep link schemes
    const schemes = {

        phonepe: `phonepe://pay?${baseParams}`,

        gpay: `tez://upi/pay?${baseParams}`,

        paytm: `paytmmp://pay?${baseParams}`,

        bhim: `bhim://pay?${baseParams}`

    };

    // Generic UPI intent as a fallback (works with any UPI app on most Android/iOS devices)
    const genericUpiLink = `upi://pay?${baseParams}`;

    const targetLink = schemes[app] || genericUpiLink;

    // If the specific app isn't installed, the browser stays in focus;
    // fall back to the generic UPI link after a short delay.
    const fallbackTimer = setTimeout(() => {

        window.location.href = genericUpiLink;

    }, 1200);

    window.addEventListener("blur", () => clearTimeout(fallbackTimer), { once: true });

    window.location.href = targetLink;

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