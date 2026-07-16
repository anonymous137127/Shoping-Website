from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import users_collection
from middleware.jwt import token_required
import jwt
import datetime
import os

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

JWT_SECRET = os.getenv("JWT_SECRET")


# =====================================
# REGISTER
# =====================================

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    fullname = data.get("fullname")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    if not fullname or not email or not phone or not password:

        return jsonify({
            "success": False,
            "message": "All fields are required"
        }), 400

    existing = users_collection.find_one({
        "email": email.lower()
    })

    if existing:

        return jsonify({
            "success": False,
            "message": "Email already exists"
        }), 409

    hashed_password = generate_password_hash(password)

    user = {

        "fullname": fullname,

        "email": email.lower(),

        "phone": phone,

        "password": hashed_password,

        "profile": "",

        "role": "user",

        "is_active": True,

        "created_at": datetime.datetime.utcnow()

    }

    users_collection.insert_one(user)

    return jsonify({

        "success": True,

        "message": "Registration Successful"

    }), 201


# =====================================
# LOGIN
# =====================================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({

        "email": email.lower()

    })

    if not user:

        return jsonify({

            "success": False,

            "message": "Invalid Email or Password"

        }), 401

    if not check_password_hash(

        user["password"],
        password

    ):

        return jsonify({

            "success": False,

            "message": "Invalid Email or Password"

        }), 401

    token = jwt.encode(

        {

            "email": user["email"],

            "role": user["role"],

            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)

        },

        JWT_SECRET,

        algorithm="HS256"

    )

    return jsonify({

        "success": True,

        "message": "Login Successful",

        "token": token,

        "user": {

            "fullname": user["fullname"],

            "email": user["email"],

            "phone": user["phone"],

            "profile": user.get("profile", ""),

            "role": user["role"]

        }

    })


# =====================================
# CURRENT USER
# =====================================

@auth_bp.route("/me", methods=["GET"])
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


# =====================================
# LOGOUT
# =====================================

@auth_bp.route("/logout", methods=["POST"])
@token_required
def logout(current_user):

    return jsonify({

        "success": True,

        "message": "Logout Successful"

    })