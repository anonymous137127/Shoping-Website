from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

from database import users_collection
from middleware.jwt import token_required

users_bp = Blueprint(
    "users",
    __name__,
    url_prefix="/api/users"
)


# =====================================
# GET PROFILE
# =====================================

@users_bp.route("/profile", methods=["GET"])
@token_required
def get_profile(current_user):

    return jsonify({

        "success": True,

        "user": {

            "fullname": current_user["fullname"],

            "email": current_user["email"],

            "phone": current_user["phone"],

            "profile": current_user.get("profile", ""),

            "role": current_user["role"]

        }

    })


# =====================================
# UPDATE PROFILE
# =====================================

@users_bp.route("/profile", methods=["PUT"])
@token_required
def update_profile(current_user):

    data = request.get_json()

    fullname = data.get("fullname")
    phone = data.get("phone")
    profile = data.get("profile")

    users_collection.update_one(

        {
            "email": current_user["email"]
        },

        {
            "$set": {

                "fullname": fullname,

                "phone": phone,

                "profile": profile

            }

        }

    )

    return jsonify({

        "success": True,

        "message": "Profile Updated Successfully"

    })


# =====================================
# CHANGE PASSWORD
# =====================================

@users_bp.route("/change-password", methods=["PUT"])
@token_required
def change_password(current_user):

    data = request.get_json()

    old_password = data.get("old_password")
    new_password = data.get("new_password")

    if not check_password_hash(

        current_user["password"],
        old_password

    ):

        return jsonify({

            "success": False,

            "message": "Old Password Incorrect"

        }), 400

    new_hash = generate_password_hash(new_password)

    users_collection.update_one(

        {
            "email": current_user["email"]
        },

        {
            "$set": {

                "password": new_hash

            }

        }

    )

    return jsonify({

        "success": True,

        "message": "Password Changed Successfully"

    })


# =====================================
# DELETE ACCOUNT
# =====================================

@users_bp.route("/delete", methods=["DELETE"])
@token_required
def delete_account(current_user):

    users_collection.delete_one({

        "email": current_user["email"]

    })

    return jsonify({

        "success": True,

        "message": "Account Deleted Successfully"

    })


# =====================================
# USER INFO
# =====================================

@users_bp.route("/me", methods=["GET"])
@token_required
def me(current_user):

    return jsonify({

        "success": True,

        "user": {

            "fullname": current_user["fullname"],

            "email": current_user["email"],

            "phone": current_user["phone"],

            "profile": current_user.get("profile", ""),

            "role": current_user["role"]

        }

    })