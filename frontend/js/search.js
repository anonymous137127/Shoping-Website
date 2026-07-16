// =====================================
// Search Functions
// =====================================


// ===============================
// SEARCH PRODUCTS
// ===============================

async function searchProducts(keyword){

    if(keyword.trim()===""){

        return;

    }

    const result = await apiGet(

        "/products/search?q=" +

        encodeURIComponent(keyword)

    );

    return result;

}



// ===============================
// RENDER SEARCH RESULTS
// ===============================

function renderSearchResults(containerId, products){

    const container =

    document.getElementById(containerId);

    if(!container){

        return;

    }

    if(products.length===0){

        container.innerHTML=`

        <div class="empty-state">

            <h2>

                No Products Found

            </h2>

            <p>

                Try another keyword.

            </p>

        </div>

        `;

        return;

    }

    let html='<div class="product-grid">';

    products.forEach(product=>{

        html+=`

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

                <a

                href="product.html?id=${product._id}"

                class="btn btn-primary btn-block">

                    View Product

                </a>

            </div>

        </div>

        `;

    });

    html+="</div>";

    container.innerHTML=html;

}



// ===============================
// PERFORM SEARCH
// ===============================

async function performSearch(){

    const keyword =

    document

    .getElementById("searchInput")

    .value

    .trim();

    if(keyword===""){

        alert("Enter product name.");

        return;

    }

    const result =

    await searchProducts(

        keyword

    );

    if(result.success){

        renderSearchResults(

            "searchResults",

            result.products

        );

    }

    else{

        alert(result.message);

    }

}



// ===============================
// ENTER KEY SEARCH
// ===============================

function initializeSearch(){

    const input =

    document.getElementById("searchInput");

    const button =

    document.getElementById("searchBtn");

    if(!input || !button){

        return;

    }

    button.addEventListener(

        "click",

        performSearch

    );

    input.addEventListener(

        "keypress",

        function(e){

            if(e.key==="Enter"){

                performSearch();

            }

        }

    );

}



// ===============================
// AUTO SEARCH FROM URL
// ===============================

async function searchFromURL(){

    const params =

    new URLSearchParams(

        window.location.search

    );

    const keyword =

    params.get("q");

    if(!keyword){

        return;

    }

    document.getElementById(

        "searchInput"

    ).value = keyword;

    const result =

    await searchProducts(

        keyword

    );

    if(result.success){

        renderSearchResults(

            "searchResults",

            result.products

        );

    }

}



// ===============================
// AUTO LOAD
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    function(){

        initializeSearch();

        searchFromURL();

    }

);