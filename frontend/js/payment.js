// =====================================
// PAYMENT CONFIG
// =====================================

const UPI_ID = "BHARATPE2O0D0U6X3M52305@unitype";
const MERCHANT_NAME = "Nandi Groups";

// =====================================
// LOAD PAYMENT
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    loadPayment();

});

function loadPayment() {

    const delivery = JSON.parse(localStorage.getItem("delivery") || "{}");

    const cart = JSON.parse(localStorage.getItem("market_cart_v1") || "{}");

    let total = 0;

    let items = [];

    Object.keys(cart).forEach(id => {

        const product = getProductById(id);

        if (!product) return;

        const qty = cart[id];

        total += product.price * qty;

        items.push({
            product_id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty
        });

    });

    document.getElementById("totalAmount").innerHTML =
        "₹" + total.toLocaleString("en-IN");

    document.getElementById("upiId").innerHTML =
        UPI_ID;

    document.getElementById("orderSummary").innerHTML =
        items.map(item => `
            <div class="summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>₹${(item.price * item.quantity).toLocaleString("en-IN")}</span>
            </div>
        `).join("");

    generateQR(total);

    countdown();

}

// =====================================
// QR CODE
// =====================================

function generateQR(amount) {

    const upi =

`upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&cu=INR`;

    const qr =

`https://quickchart.io/qr?size=300&text=${encodeURIComponent(upi)}`;

    document.getElementById("paymentQR").src = qr;

}

// =====================================
// COUNTDOWN
// =====================================

function countdown() {

    let sec = 5;

    const timer = document.getElementById("timer");

    const interval = setInterval(() => {

        timer.innerHTML = sec;

        sec--;

        if (sec < 0) {

            clearInterval(interval);

            timer.innerHTML = "Waiting Payment";

        }

    },1000);

}

// =====================================
// PAYMENT COMPLETED
// =====================================

async function paymentCompleted() {

    const delivery = JSON.parse(

        localStorage.getItem("delivery")

    );

    const token = localStorage.getItem("token");

    const response = await fetch(

        API_URL + "/orders/place",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                Authorization:"Bearer " + token

            },

            body:JSON.stringify({

                address:

`${delivery.address},
${delivery.city},
${delivery.state},
${delivery.pincode}`,

                payment_method:"UPI"

            })

        }

    );

    const data = await response.json();

    if(data.success){

        localStorage.removeItem("market_cart_v1");

        window.location.href=

"success.html?order="+data.order_id;

    }else{

        alert(data.message);

    }

}