// =====================================
// Cart Functions
// =====================================


// ===============================
// GET CART
// ===============================

async function getCart(){

    return await apiGet(

        "/cart/"

    );

}



// ===============================
// ADD TO CART
// ===============================

async function addToCart(productId, quantity = 1){

    const result = await apiPost(

        "/cart/add",

        {

            product_id: productId,

            quantity: quantity

        }

    );

    if(result.success){

        alert(result.message);

        await updateCartCount();

    }

    return result;

}



// ===============================
// UPDATE CART
// ===============================

async function updateCart(cartId, quantity){

    const result = await apiPut(

        "/cart/update/" + cartId,

        {

            quantity: quantity

        }

    );

    return result;

}



// ===============================
// REMOVE ITEM
// ===============================

async function removeCartItem(cartId){

    const result = await apiDelete(

        "/cart/remove/" + cartId

    );

    if(result.success){

        await updateCartCount();

    }

    return result;

}



// ===============================
// CLEAR CART
// ===============================

async function clearCart(){

    const result = await apiDelete(

        "/cart/clear"

    );

    if(result.success){

        await updateCartCount();

    }

    return result;

}



// ===============================
// CART COUNT
// ===============================

async function updateCartCount(){

    const result = await getCart();

    const badge = document.getElementById("cartCount");

    if(!badge){

        return;

    }

    if(result.success){

        badge.innerHTML = result.count;

    }

    else{

        badge.innerHTML = "0";

    }

}



// ===============================
// CALCULATE TOTAL
// ===============================

function calculateCartTotal(cart){

    let total = 0;

    cart.forEach(item=>{

        total +=

        item.product.price *

        item.quantity;

    });

    return total;

}



// ===============================
// RENDER CART
// ===============================

function renderCart(containerId, cart){

    const container =

    document.getElementById(containerId);

    if(!container){

        return;

    }

    if(cart.length===0){

        container.innerHTML=`

        <div class="empty-state">

            <h2>

                Your Cart is Empty

            </h2>

            <a

            href="shop.html"

            class="btn btn-primary">

            Continue Shopping

            </a>

        </div>

        `;

        return;

    }

    let html="";

    cart.forEach(item=>{

        html+=`

        <div class="cart-item">

            <img

            src="${item.product.image}"

            class="cart-image">

            <div class="cart-details">

                <h3>

                    ${item.product.name}

                </h3>

                <p>

                    ${item.product.brand}

                </p>

                <h4>

                    ₹${item.product.price}

                </h4>

                <p>

                    Quantity :

                    ${item.quantity}

                </p>

            </div>

            <div>

                <button

                class="btn btn-danger"

                onclick="removeItem('${item.cart_id}')">

                Remove

                </button>

            </div>

        </div>

        `;

    });

    html+=`

    <div class="cart-total">

        <h2>

        Total :

        ₹${calculateCartTotal(cart)}

        </h2>

        <a

        href="checkout.html"

        class="btn btn-primary">

        Checkout

        </a>

    </div>

    `;

    container.innerHTML=html;

}



// ===============================
// LOAD CART
// ===============================

async function loadCart(containerId){

    const result=

    await getCart();

    if(result.success){

        renderCart(

            containerId,

            result.cart

        );

    }

}



// ===============================
// REMOVE ITEM
// ===============================

async function removeItem(cartId){

    if(!confirm("Remove this item?")){

        return;

    }

    const result=

    await removeCartItem(cartId);

    alert(result.message);

    loadCart("cartContainer");

}



// ===============================
// BUY NOW
// ===============================

function buyNow(){

    window.location.href="checkout.html";

}