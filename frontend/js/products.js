// =====================================
// Product Functions
// =====================================


// ===============================
// GET ALL PRODUCTS
// ===============================

async function getProducts(){

    return await apiGet(

        "/products/"

    );

}



// ===============================
// GET SINGLE PRODUCT
// ===============================

async function getProduct(id){

    return await apiGet(

        "/products/" + id

    );

}



// ===============================
// SEARCH PRODUCTS
// ===============================

async function searchProducts(keyword){

    return await apiGet(

        "/products/search?q=" +

        encodeURIComponent(keyword)

    );

}



// ===============================
// CATEGORY PRODUCTS
// ===============================

async function getCategoryProducts(category){

    return await apiGet(

        "/products/category/" +

        encodeURIComponent(category)

    );

}



// ===============================
// ADD PRODUCT (ADMIN)
// ===============================

async function addProduct(product){

    return await apiPost(

        "/products/",

        product

    );

}



// ===============================
// UPDATE PRODUCT (ADMIN)
// ===============================

async function updateProduct(id, product){

    return await apiPut(

        "/products/" + id,

        product

    );

}



// ===============================
// DELETE PRODUCT (ADMIN)
// ===============================

async function deleteProduct(id){

    return await apiDelete(

        "/products/" + id

    );

}



// ===============================
// PRODUCT CARD
// ===============================

function productCard(product){

    return `

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

            <p class="product-brand">

                ${product.brand}

            </p>

            <div class="product-price">

                ₹${product.price}

            </div>

            <div class="product-rating">

                ⭐ ${product.rating}

            </div>

            <a

            href="product.html?id=${product._id}"

            class="btn btn-primary btn-block">

                View Product

            </a>

        </div>

    </div>

    `;

}



// ===============================
// RENDER PRODUCTS
// ===============================

function renderProducts(containerId, products){

    const container =

    document.getElementById(containerId);

    if(!container){

        return;

    }

    if(products.length===0){

        container.innerHTML=`

        <div class="empty-state">

            <h3>

                No Products Found

            </h3>

        </div>

        `;

        return;

    }

    container.innerHTML=

    products

    .map(productCard)

    .join("");

}



// ===============================
// LOAD ALL PRODUCTS
// ===============================

async function loadProducts(containerId){

    const result=

    await getProducts();

    if(result.success){

        renderProducts(

            containerId,

            result.products

        );

    }

}



// ===============================
// LOAD PRODUCT DETAILS
// ===============================

async function loadProductDetails(id){

    const result=

    await getProduct(id);

    return result;

}



// ===============================
// LOAD CATEGORY
// ===============================

async function loadCategory(category, containerId){

    const result=

    await getCategoryProducts(

        category

    );

    if(result.success){

        renderProducts(

            containerId,

            result.products

        );

    }

}



// ===============================
// LOAD SEARCH
// ===============================

async function loadSearch(keyword, containerId){

    const result=

    await searchProducts(

        keyword

    );

    if(result.success){

        renderProducts(

            containerId,

            result.products

        );

    }

}