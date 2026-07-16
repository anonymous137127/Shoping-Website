from flask import Blueprint, jsonify, request
from bson import ObjectId

from database import orders_collection

admin_payment_bp = Blueprint(
    "admin_payment",
    __name__,
    url_prefix="/api/admin/payment"
)


# =====================================
# GET ALL PAYMENTS
# =====================================

@admin_payment_bp.route("/", methods=["GET"])
def all_payments():

    payments = []

    for order in orders_collection.find():

        order["_id"] = str(order["_id"])

        payments.append({

            "order_id": order["_id"],
            "customer": order.get("fullname"),
            "email": order.get("user_email"),
            "amount": order.get("total"),
            "payment_status": order.get("payment_status", "Pending"),
            "order_status": order.get("status", "Pending"),
            "payment_method": order.get("payment_method", "UPI")

        })

    return jsonify({

        "success": True,
        "count": len(payments),
        "payments": payments

    })


# =====================================
# APPROVE PAYMENT
# =====================================

@admin_payment_bp.route("/approve/<order_id>", methods=["PUT"])
def approve_payment(order_id):

    orders_collection.update_one(

        {

            "_id": ObjectId(order_id)

        },

        {

            "$set":{

                "payment_status":"Paid",
                "status":"Confirmed"

            }

        }

    )

    return jsonify({

        "success":True,
        "message":"Payment Approved"

    })


# =====================================
# REJECT PAYMENT
# =====================================

@admin_payment_bp.route("/reject/<order_id>", methods=["PUT"])
def reject_payment(order_id):

    orders_collection.update_one(

        {

            "_id":ObjectId(order_id)

        },

        {

            "$set":{

                "payment_status":"Rejected"

            }

        }

    )

    return jsonify({

        "success":True,
        "message":"Payment Rejected"

    })


# =====================================
# SHIP ORDER
# =====================================

@admin_payment_bp.route("/ship/<order_id>", methods=["PUT"])
def ship_order(order_id):

    orders_collection.update_one(

        {

            "_id":ObjectId(order_id)

        },

        {

            "$set":{

                "status":"Shipped"

            }

        }

    )

    return jsonify({

        "success":True,
        "message":"Order Shipped"

    })


# =====================================
# DELIVER ORDER
# =====================================

@admin_payment_bp.route("/deliver/<order_id>", methods=["PUT"])
def deliver_order(order_id):

    orders_collection.update_one(

        {

            "_id":ObjectId(order_id)

        },

        {

            "$set":{

                "status":"Delivered"

            }

        }

    )

    return jsonify({

        "success":True,
        "message":"Order Delivered"

    })