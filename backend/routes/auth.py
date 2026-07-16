from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import users_collection
import jwt
import datetime
import os
from functools import wraps

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

JWT_SECRET = os.getenv("JWT_SECRET")


# ===========================
# JWT Token Required Decorator
# ===========================

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        token = request.headers.get("Authorization")

        if not token:
            return jsonify({
                "success": False,
                "message": "Token is missing"
            }), 401

        try:
            token = token.split(" ")[1]

            data = jwt.decode(
                token,
                JWT_SECRET,
                algorithms=["HS256"]
            )

            current_user = users_collection.find_one(
                {"email": data["email"]}
            )

            if not current_user:
                return jsonify({
                    "success": False,
                    "message": "User not found"
                }), 404

        except Exception as e:
            return jsonify({
                "success": False,
                "message": "Invalid Token",
                "error": str(e)
            }), 401

        return f(current_user, *args, **kwargs)

    return decorated


# ===========================
# Register
# ===========================

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.json

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
        "email": email
    })

    if existing:

        return jsonify({
            "success": False,
            "message": "Email already exists"
        }), 409

    hashed_password = generate_password_hash(password)

    user = {

        "fullname": fullname,
        "email": email,
        "phone": phone,
        "password": hashed_password,
        "profile": "",
        "role": "user",
        "created_at": datetime.datetime.utcnow()

    }

    users_collection.insert_one(user)

    return jsonify({

        "success": True,
        "message": "Registration Successful"

    }), 201


# ===========================
# Login
# ===========================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({
        "email": email
    })

    if not user:

        return jsonify({
            "success": False,
            "message": "Invalid Email"
        }), 401

    if not check_password_hash(user["password"], password):

        return jsonify({
            "success": False,
            "message": "Invalid Password"
        }), 401

    token = jwt.encode(

        {
            "email": user["email"],
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
            "role": user["role"]

        }

    })


# ===========================
# Logged In User
# ===========================

@auth_bp.route("/me", methods=["GET"])
@token_required
def me(current_user):

    return jsonify({

        "success": True,

        "user": {

            "fullname": current_user["fullname"],
            "email": current_user["email"],
            "phone": current_user["phone"],
            "role": current_user["role"]

        }

    })