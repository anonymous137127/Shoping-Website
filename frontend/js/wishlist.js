// =====================================
// Wishlist Functions
// =====================================


// ===============================
// GET WISHLIST
// ===============================

async function getWishlist(){

    return await apiGet(

        "/wishlist/"

    );

}



// ===============================
// ADD TO WISHLIST
// ===============================

async function addToWishlist(productId){

    const result = await apiPost(

        "/wishlist/add",

        {

            product_id: productId

        }

    );

    if(result.success){

        alert(result.message);

        await updateWishlistCount();

    }

    return result;

}



// ===============================
// REMOVE FROM WISHLIST
// ===============================

async function removeWishlistItem(wishlistId){

    const result = await apiDelete(

        "/wishlist/remove/" + wishlistId

    );

    if(result.success){

        await updateWishlistCount();

    }

    return result;

}



// ===============================
// MOVE TO CART
// ===============================

async function moveWishlistToCart(wishlistId){

    const result = await apiPost(

        "/wishlist/move-to-cart/" + wishlistId,

        {}

    );

    if(result.success){

        await updateWishlistCount();

        await updateCartCount();

    }

    return result;

}



// ===============================
// UPDATE WISHLIST COUNT
// ===============================

async function updateWishlistCount(){

    const result = await getWishlist();

    const badge = document.getElementById("wishlistCount");

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
// RENDER WISHLIST
// ===============================

function renderWishlist(containerId, wishlist){

    const container = document.getElementById(containerId);

    if(!container){

        return;

    }

    if(wishlist.length===0){

        container.innerHTML = `

        <div class="empty-state">

            <h2>

                Wishlist is Empty

            </h2>

            <p>

                Save products to buy later.

            </p>

            <a

            href="shop.html"

            class="btn btn-primary">

                Browse Products

            </a>

        </div>

        `;

        return;

    }

    let html = '<div class="product-grid">';

    wishlist.forEach(item=>{

        const product = item.product;

        html += `

        <div class="product-card">

            <img

            src="${product.image}"

            alt="${product.name}"

            class="product-image">

            <div class="product-content">

                <span class="product-category">

                    ${product.category}

                </span>

                <h3>

                    ${product.name}

                </h3>

                <p>

                    ${product.brand}

                </p>

                <div class="product-price">

                    ₹${product.price}

                </div>

                <div class="product-rating">

                    ⭐ ${product.rating}

                </div>

                <button

                class="btn btn-primary btn-block"

                onclick="moveItem('${item.wishlist_id}')">

                    Move To Cart

                </button>

                <button

                class="btn btn-danger btn-block"

                onclick="removeItem('${item.wishlist_id}')">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    html += "</div>";

    container.innerHTML = html;

}



// ===============================
// LOAD WISHLIST
// ===============================

async function loadWishlist(containerId){

    const result = await getWishlist();

    if(result.success){

        renderWishlist(

            containerId,

            result.wishlist

        );

    }

}



// ===============================
// MOVE ITEM
// ===============================

async function moveItem(wishlistId){

    const result = await moveWishlistToCart(

        wishlistId

    );

    alert(result.message);

    loadWishlist("wishlistContainer");

}



// ===============================
// REMOVE ITEM
// ===============================

async function removeItem(wishlistId){

    if(!confirm("Remove this product from wishlist?")){

        return;

    }

    const result = await removeWishlistItem(

        wishlistId

    );

    alert(result.message);

    loadWishlist("wishlistContainer");

}