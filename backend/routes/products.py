from flask import Blueprint, request, jsonify
from bson import ObjectId
from database import products_collection

products_bp = Blueprint("products", __name__, url_prefix="/api/products")


# ===============================
# GET ALL PRODUCTS
# ===============================

@products_bp.route("/", methods=["GET"])
def get_products():

    products = []

    for product in products_collection.find():

        product["_id"] = str(product["_id"])
        products.append(product)

    return jsonify({
        "success": True,
        "count": len(products),
        "products": products
    })


# ===============================
# GET SINGLE PRODUCT
# ===============================

@products_bp.route("/<id>", methods=["GET"])
def get_product(id):

    try:

        product = products_collection.find_one({
            "_id": ObjectId(id)
        })

        if not product:

            return jsonify({
                "success": False,
                "message": "Product not found"
            }), 404

        product["_id"] = str(product["_id"])

        return jsonify({
            "success": True,
            "product": product
        })

    except:

        return jsonify({
            "success": False,
            "message": "Invalid Product ID"
        }), 400


# ===============================
# SEARCH PRODUCTS
# ===============================

@products_bp.route("/search", methods=["GET"])
def search_products():

    keyword = request.args.get("q", "")

    products = []

    query = {
        "name": {
            "$regex": keyword,
            "$options": "i"
        }
    }

    for product in products_collection.find(query):

        product["_id"] = str(product["_id"])
        products.append(product)

    return jsonify({
        "success": True,
        "count": len(products),
        "products": products
    })


# ===============================
# CATEGORY FILTER
# ===============================

@products_bp.route("/category/<category>", methods=["GET"])
def category(category):

    products = []

    for product in products_collection.find({
        "category": category
    }):

        product["_id"] = str(product["_id"])
        products.append(product)

    return jsonify({
        "success": True,
        "count": len(products),
        "products": products
    })


# ===============================
# ADD PRODUCT
# ===============================

@products_bp.route("/", methods=["POST"])
def add_product():

    data = request.json

    product = {

        "name": data.get("name"),
        "price": data.get("price"),
        "description": data.get("description"),
        "category": data.get("category"),
        "brand": data.get("brand"),
        "stock": data.get("stock"),
        "rating": 0,
        "reviews": 0,
        "image": data.get("image")

    }

    result = products_collection.insert_one(product)

    return jsonify({

        "success": True,
        "message": "Product Added",
        "id": str(result.inserted_id)

    }), 201


# ===============================
# UPDATE PRODUCT
# ===============================

@products_bp.route("/<id>", methods=["PUT"])
def update_product(id):

    data = request.json

    products_collection.update_one(

        {
            "_id": ObjectId(id)
        },

        {
            "$set": data
        }

    )

    return jsonify({

        "success": True,
        "message": "Product Updated"

    })


# ===============================
# DELETE PRODUCT
# ===============================

@products_bp.route("/<id>", methods=["DELETE"])
def delete_product(id):

    products_collection.delete_one({

        "_id": ObjectId(id)

    })

    return jsonify({

        "success": True,
        "message": "Product Deleted"

    })