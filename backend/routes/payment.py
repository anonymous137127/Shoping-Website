from flask import Blueprint, request, jsonify
from datetime import datetime
from bson import ObjectId

from database import orders_collection

from routes.auth import token_required

payment_bp = Blueprint(
    "payment",
    __name__,
    url_prefix="/api/payment"
)


# =====================================
# VERIFY PAYMENT (MANUAL)
# =====================================

@payment_bp.route("/verify/<order_id>", methods=["POST"])
@token_required
def verify_payment(current_user, order_id):

    order = orders_collection.find_one({

        "_id": ObjectId(order_id),
        "user_email": current_user["email"]

    })

    if not order:

        return jsonify({

            "success": False,
            "message": "Order not found"

        }),404

    orders_collection.update_one(

        {

            "_id": ObjectId(order_id)

        },

        {

            "$set":{

                "payment_status":"Pending",
                "payment_method":"UPI",
                "payment_requested_at":datetime.utcnow()

            }

        }

    )

    return jsonify({

        "success":True,
        "message":"Payment submitted successfully. We will verify it shortly."

    })


# =====================================
# PAYMENT STATUS
# =====================================

@payment_bp.route("/status/<order_id>", methods=["GET"])
@token_required
def payment_status(current_user, order_id):

    order = orders_collection.find_one({

        "_id":ObjectId(order_id),
        "user_email":current_user["email"]

    })

    if not order:

        return jsonify({

            "success":False,
            "message":"Order not found"

        }),404

    return jsonify({

        "success":True,

        "payment_status":

        order.get(

            "payment_status",

            "Pending"

        ),

        "order_status":

        order.get(

            "status",

            "Pending"

        )

    })