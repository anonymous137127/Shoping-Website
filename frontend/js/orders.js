// =====================================
// Orders Functions
// =====================================


// ===============================
// GET MY ORDERS
// ===============================

async function getOrders(){

    return await apiGet(

        "/orders/"

    );

}



// ===============================
// GET SINGLE ORDER
// ===============================

async function getOrder(orderId){

    return await apiGet(

        "/orders/" + orderId

    );

}



// ===============================
// CANCEL ORDER
// ===============================

async function cancelOrder(orderId){

    if(!confirm("Are you sure you want to cancel this order?")){

        return;

    }

    const result = await apiPut(

        "/orders/cancel/" + orderId,

        {}

    );

    alert(result.message);

    if(result.success){

        loadOrders("ordersContainer");

    }

}



// ===============================
// ORDER STATUS COLOR
// ===============================

function getStatusColor(status){

    switch(status){

        case "Pending":

            return "#ff9800";

        case "Processing":

            return "#2196f3";

        case "Shipped":

            return "#673ab7";

        case "Delivered":

            return "#4caf50";

        case "Cancelled":

            return "#f44336";

        default:

            return "#777";

    }

}



// ===============================
// RENDER ORDERS
// ===============================

function renderOrders(containerId, orders){

    const container =

    document.getElementById(containerId);

    if(!container){

        return;

    }

    if(orders.length===0){

        container.innerHTML=`

        <div class="empty-state">

            <h2>

                No Orders Found

            </h2>

            <p>

                Start shopping today.

            </p>

            <a

            href="shop.html"

            class="btn btn-primary">

                Shop Now

            </a>

        </div>

        `;

        return;

    }

    let html="";

    orders.forEach(order=>{

        html+=`

        <div class="profile-card">

            <h3>

                Order #${order._id}

            </h3>

            <p>

                <strong>Status :</strong>

                <span style="color:${getStatusColor(order.status)}">

                ${order.status}

                </span>

            </p>

            <p>

                <strong>Total :</strong>

                ₹${order.total}

            </p>

            <p>

                <strong>Payment :</strong>

                ${order.payment_method}

            </p>

            <p>

                <strong>Address :</strong>

                ${order.address}

            </p>

            <p>

                <strong>Date :</strong>

                ${new Date(order.ordered_at).toLocaleString()}

            </p>

            <hr>

            <h4>

                Products

            </h4>

            <ul>

            ${order.products.map(product=>`

                <li>

                    ${product.name}

                    ×

                    ${product.quantity}

                    -

                    ₹${product.subtotal}

                </li>

            `).join("")}

            </ul>

            ${

                order.status==="Pending"

                ?

                `

                <button

                class="btn btn-danger"

                onclick="cancelOrder('${order._id}')">

                Cancel Order

                </button>

                `

                :

                ""

            }

        </div>

        <br>

        `;

    });

    container.innerHTML=html;

}



// ===============================
// LOAD ORDERS
// ===============================

async function loadOrders(containerId){

    const result = await getOrders();

    if(result.success){

        renderOrders(

            containerId,

            result.orders

        );

    }

    else{

        document

        .getElementById(containerId)

        .innerHTML =

        `

        <div class="empty-state">

            <h2>

                Unable to load orders.

            </h2>

        </div>

        `;

    }

}



// ===============================
// REFRESH ORDERS
// ===============================

function refreshOrders(){

    loadOrders(

        "ordersContainer"

    );

}



// ===============================
// AUTO LOAD
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    function(){

        if(document.getElementById("ordersContainer")){

            loadOrders(

                "ordersContainer"

            );

        }

    }

);