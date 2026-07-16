from flask import Blueprint, jsonify
from bson import ObjectId

from database import users_collection
from database import products_collection
from database import orders_collection

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")


# =====================================
# DASHBOARD
# =====================================

@admin_bp.route("/dashboard", methods=["GET"])
def dashboard():

    total_users = users_collection.count_documents({})
    total_products = products_collection.count_documents({})
    total_orders = orders_collection.count_documents({})

    revenue = 0

    for order in orders_collection.find():

        revenue += order.get("total", 0)

    return jsonify({

        "success": True,

        "dashboard": {

            "users": total_users,
            "products": total_products,
            "orders": total_orders,
            "revenue": revenue

        }

    })


# =====================================
# GET ALL USERS
# =====================================

@admin_bp.route("/users", methods=["GET"])
def get_users():

    users = []

    for user in users_collection.find():

        user["_id"] = str(user["_id"])

        user.pop("password", None)

        users.append(user)

    return jsonify({

        "success": True,
        "count": len(users),
        "users": users

    })


# =====================================
# DELETE USER
# =====================================

@admin_bp.route("/users/delete/<user_id>", methods=["DELETE"])
def delete_user(user_id):

    users_collection.delete_one({

        "_id": ObjectId(user_id)

    })

    return jsonify({

        "success": True,
        "message": "User Deleted"

    })


# =====================================
# GET ALL PRODUCTS
# =====================================

@admin_bp.route("/products", methods=["GET"])
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


# =====================================
# DELETE PRODUCT
# =====================================

@admin_bp.route("/products/delete/<product_id>", methods=["DELETE"])
def delete_product(product_id):

    products_collection.delete_one({

        "_id": ObjectId(product_id)

    })

    return jsonify({

        "success": True,
        "message": "Product Deleted"

    })


# =====================================
# GET ALL ORDERS
# =====================================

@admin_bp.route("/orders", methods=["GET"])
def get_orders():

    orders = []

    for order in orders_collection.find():

        order["_id"] = str(order["_id"])

        orders.append(order)

    return jsonify({

        "success": True,
        "count": len(orders),
        "orders": orders

    })


# =====================================
# DELETE ORDER
# =====================================

@admin_bp.route("/orders/delete/<order_id>", methods=["DELETE"])
def delete_order(order_id):

    orders_collection.delete_one({

        "_id": ObjectId(order_id)

    })

    return jsonify({

        "success": True,
        "message": "Order Deleted"

    })