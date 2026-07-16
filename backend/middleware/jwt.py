import jwt
import os
from functools import wraps
from flask import request, jsonify

from database import users_collection


JWT_SECRET = os.getenv("JWT_SECRET")


def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:

            return jsonify({
                "success": False,
                "message": "Authorization token missing"
            }), 401

        try:

            token = auth_header.split(" ")[1]

            payload = jwt.decode(
                token,
                JWT_SECRET,
                algorithms=["HS256"]
            )

            user = users_collection.find_one({
                "email": payload["email"]
            })

            if not user:

                return jsonify({
                    "success": False,
                    "message": "User not found"
                }), 404

        except jwt.ExpiredSignatureError:

            return jsonify({
                "success": False,
                "message": "Token Expired"
            }), 401

        except jwt.InvalidTokenError:

            return jsonify({
                "success": False,
                "message": "Invalid Token"
            }), 401

        return f(user, *args, **kwargs)

    return decorated