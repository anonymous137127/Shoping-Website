// =====================================
// Checkout Functions
// =====================================


// ===============================
// PLACE ORDER
// ===============================

async function placeOrder(address, paymentMethod){

    const result = await apiPost(

        "/orders/place",

        {

            address: address,

            payment_method: paymentMethod

        }

    );

    return result;

}



// ===============================
// VALIDATE ADDRESS
// ===============================

function validateAddress(address){

    if(address.trim()===""){

        alert("Please enter your shipping address.");

        return false;

    }

    if(address.length<10){

        alert("Address is too short.");

        return false;

    }

    return true;

}



// ===============================
// VALIDATE PAYMENT
// ===============================

function validatePayment(method){

    if(method===""){

        alert("Select a payment method.");

        return false;

    }

    return true;

}



// ===============================
// CHECKOUT
// ===============================

async function checkout(){

    const address =

    document.getElementById("address").value.trim();

    const paymentMethod =

    document.getElementById("payment_method").value;

    if(!validateAddress(address)){

        return;

    }

    if(!validatePayment(paymentMethod)){

        return;

    }

    const button =

    document.getElementById("placeOrderBtn");

    button.disabled = true;

    button.innerHTML = "Placing Order...";

    const result =

    await placeOrder(

        address,

        paymentMethod

    );

    button.disabled = false;

    button.innerHTML = "Place Order";

    if(result.success){

        alert(result.message);

        window.location.href="orders.html";

    }

    else{

        alert(result.message);

    }

}



// ===============================
// LOAD CHECKOUT PAGE
// ===============================

function initializeCheckout(){

    const form =

    document.getElementById("checkoutForm");

    if(!form){

        return;

    }

    form.addEventListener(

        "submit",

        function(e){

            e.preventDefault();

            checkout();

        }

    );

}



// ===============================
// AUTO INITIALIZE
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    initializeCheckout

);