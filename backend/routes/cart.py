from flask import Blueprint, request, jsonify
from bson import ObjectId

from database import cart_collection
from database import products_collection

from routes.auth import token_required

cart_bp = Blueprint("cart", __name__, url_prefix="/api/cart")


# ====================================
# GET USER CART
# ====================================

@cart_bp.route("/", methods=["GET"])
@token_required
def get_cart(current_user):

    cart = []

    items = cart_collection.find({
        "user_email": current_user["email"]
    })

    for item in items:

        product = products_collection.find_one({
            "_id": ObjectId(item["product_id"])
        })

        if product:

            product["_id"] = str(product["_id"])

            cart.append({

                "cart_id": str(item["_id"]),
                "quantity": item["quantity"],
                "product": product

            })

    return jsonify({

        "success": True,
        "count": len(cart),
        "cart": cart

    })


# ====================================
# ADD TO CART
# ====================================

@cart_bp.route("/add", methods=["POST"])
@token_required
def add_to_cart(current_user):

    data = request.json

    product_id = data.get("product_id")
    quantity = int(data.get("quantity", 1))

    existing = cart_collection.find_one({

        "user_email": current_user["email"],
        "product_id": product_id

    })

    if existing:

        cart_collection.update_one(

            {"_id": existing["_id"]},

            {
                "$set": {
                    "quantity": existing["quantity"] + quantity
                }
            }

        )

        return jsonify({

            "success": True,
            "message": "Cart Updated"

        })

    cart_collection.insert_one({

        "user_email": current_user["email"],
        "product_id": product_id,
        "quantity": quantity

    })

    return jsonify({

        "success": True,
        "message": "Added To Cart"

    })


# ====================================
# UPDATE QUANTITY
# ====================================

@cart_bp.route("/update/<cart_id>", methods=["PUT"])
@token_required
def update_cart(current_user, cart_id):

    data = request.json

    quantity = int(data.get("quantity"))

    cart_collection.update_one(

        {
            "_id": ObjectId(cart_id),
            "user_email": current_user["email"]
        },

        {
            "$set": {
                "quantity": quantity
            }
        }

    )

    return jsonify({

        "success": True,
        "message": "Quantity Updated"

    })


# ====================================
# REMOVE ITEM
# ====================================

@cart_bp.route("/remove/<cart_id>", methods=["DELETE"])
@token_required
def remove_item(current_user, cart_id):

    cart_collection.delete_one({

        "_id": ObjectId(cart_id),
        "user_email": current_user["email"]

    })

    return jsonify({

        "success": True,
        "message": "Item Removed"

    })


# ====================================
# CLEAR CART
# ====================================

@cart_bp.route("/clear", methods=["DELETE"])
@token_required
def clear_cart(current_user):

    cart_collection.delete_many({

        "user_email": current_user["email"]

    })

    return jsonify({

        "success": True,
        "message": "Cart Cleared"

    })