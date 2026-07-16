from flask import Blueprint, request, jsonify
from bson import ObjectId

from database import wishlist_collection
from database import products_collection
from database import cart_collection

from routes.auth import token_required

wishlist_bp = Blueprint("wishlist", __name__, url_prefix="/api/wishlist")


# =====================================
# GET WISHLIST
# =====================================

@wishlist_bp.route("/", methods=["GET"])
@token_required
def get_wishlist(current_user):

    wishlist = []

    items = wishlist_collection.find({
        "user_email": current_user["email"]
    })

    for item in items:

        product = products_collection.find_one({
            "_id": ObjectId(item["product_id"])
        })

        if product:

            product["_id"] = str(product["_id"])

            wishlist.append({

                "wishlist_id": str(item["_id"]),
                "product": product

            })

    return jsonify({

        "success": True,
        "count": len(wishlist),
        "wishlist": wishlist

    })


# =====================================
# ADD TO WISHLIST
# =====================================

@wishlist_bp.route("/add", methods=["POST"])
@token_required
def add_to_wishlist(current_user):

    data = request.json

    product_id = data.get("product_id")

    existing = wishlist_collection.find_one({

        "user_email": current_user["email"],
        "product_id": product_id

    })

    if existing:

        return jsonify({

            "success": False,
            "message": "Product already exists in wishlist"

        }), 400

    wishlist_collection.insert_one({

        "user_email": current_user["email"],
        "product_id": product_id

    })

    return jsonify({

        "success": True,
        "message": "Added to Wishlist"

    })


# =====================================
# REMOVE FROM WISHLIST
# =====================================

@wishlist_bp.route("/remove/<wishlist_id>", methods=["DELETE"])
@token_required
def remove_from_wishlist(current_user, wishlist_id):

    wishlist_collection.delete_one({

        "_id": ObjectId(wishlist_id),
        "user_email": current_user["email"]

    })

    return jsonify({

        "success": True,
        "message": "Removed from Wishlist"

    })


# =====================================
# MOVE TO CART
# =====================================

@wishlist_bp.route("/move-to-cart/<wishlist_id>", methods=["POST"])
@token_required
def move_to_cart(current_user, wishlist_id):

    item = wishlist_collection.find_one({

        "_id": ObjectId(wishlist_id),
        "user_email": current_user["email"]

    })

    if not item:

        return jsonify({

            "success": False,
            "message": "Wishlist item not found"

        }), 404

    existing = cart_collection.find_one({

        "user_email": current_user["email"],
        "product_id": item["product_id"]

    })

    if existing:

        cart_collection.update_one(

            {
                "_id": existing["_id"]
            },

            {
                "$inc": {
                    "quantity": 1
                }
            }

        )

    else:

        cart_collection.insert_one({

            "user_email": current_user["email"],
            "product_id": item["product_id"],
            "quantity": 1

        })

    wishlist_collection.delete_one({

        "_id": ObjectId(wishlist_id)

    })

    return jsonify({

        "success": True,
        "message": "Moved to Cart"

    })