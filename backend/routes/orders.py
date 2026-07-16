from flask import Blueprint, request, jsonify
from bson import ObjectId
from datetime import datetime

from database import (
    orders_collection
)

from middleware.jwt import token_required

orders_bp = Blueprint(
    "orders",
    __name__,
    url_prefix="/api/orders"
)


# =====================================
# PLACE ORDER
# =====================================

@orders_bp.route("/place", methods=["POST"])
@token_required
def place_order(current_user):

    data = request.get_json()

    address = data.get("address")
    payment_method = data.get("payment_method", "UPI")
    products = data.get("products", [])

    if not address:
        return jsonify({
            "success": False,
            "message": "Address is required"
        }), 400

    if len(products) == 0:
        return jsonify({
            "success": False,
            "message": "Cart is empty"
        }), 400

    order_products = []
    total_amount = 0

    for item in products:

        quantity = int(item.get("quantity", 1))
        price = float(item.get("price", 0))
        subtotal = quantity * price

        total_amount += subtotal

        order_products.append({

            "product_id": item.get("product_id"),
            "name": item.get("name"),
            "price": price,
            "quantity": quantity,
            "subtotal": subtotal

        })

    order = {

        "user_email": current_user["email"],
        "fullname": current_user["fullname"],
        "address": address,
        "products": order_products,
        "payment_method": payment_method,
        "payment_status": "Pending",
        "status": "Pending",
        "total": total_amount,
        "ordered_at": datetime.utcnow()

    }

    result = orders_collection.insert_one(order)

    return jsonify({

        "success": True,
        "message": "Order placed successfully.",
        "order_id": str(result.inserted_id)

    }), 201


# =====================================
# GET MY ORDERS
# =====================================

@orders_bp.route("/", methods=["GET"])
@token_required
def my_orders(current_user):

    orders = []

    for order in orders_collection.find({

        "user_email": current_user["email"]

    }).sort("ordered_at", -1):

        order["_id"] = str(order["_id"])

        orders.append(order)

    return jsonify({

        "success": True,
        "count": len(orders),
        "orders": orders

    })


# =====================================
# GET SINGLE ORDER
# =====================================

@orders_bp.route("/<order_id>", methods=["GET"])
@token_required
def single_order(current_user, order_id):

    if not ObjectId.is_valid(order_id):

        return jsonify({
            "success": False,
            "message": "Invalid Order ID"
        }), 400

    order = orders_collection.find_one({

        "_id": ObjectId(order_id),
        "user_email": current_user["email"]

    })

    if not order:

        return jsonify({
            "success": False,
            "message": "Order Not Found"
        }), 404

    order["_id"] = str(order["_id"])

    return jsonify({

        "success": True,
        "order": order

    })


# =====================================
# CANCEL ORDER
# =====================================

@orders_bp.route("/cancel/<order_id>", methods=["PUT"])
@token_required
def cancel_order(current_user, order_id):

    if not ObjectId.is_valid(order_id):

        return jsonify({
            "success": False,
            "message": "Invalid Order ID"
        }), 400

    order = orders_collection.find_one({

        "_id": ObjectId(order_id),
        "user_email": current_user["email"]

    })

    if not order:

        return jsonify({
            "success": False,
            "message": "Order Not Found"
        }), 404

    if order["status"] in ["Delivered", "Cancelled"]:

        return jsonify({
            "success": False,
            "message": "Order cannot be cancelled"
        }), 400

    orders_collection.update_one(

        {
            "_id": ObjectId(order_id)
        },

        {
            "$set": {
                "status": "Cancelled"
            }
        }

    )

    return jsonify({

        "success": True,
        "message": "Order Cancelled"

    })


# =====================================
# ADMIN UPDATE STATUS
# =====================================

@orders_bp.route("/status/<order_id>", methods=["PUT"])
def update_status(order_id):

    if not ObjectId.is_valid(order_id):

        return jsonify({
            "success": False,
            "message": "Invalid Order ID"
        }), 400

    data = request.get_json()

    orders_collection.update_one(

        {
            "_id": ObjectId(order_id)
        },

        {
            "$set": {

                "status": data.get("status"),
                "payment_status": data.get("payment_status", "Approved")

            }
        }

    )

    return jsonify({

        "success": True,
        "message": "Order Status Updated"

    })