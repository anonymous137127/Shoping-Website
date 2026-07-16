import os
import jwt

from functools import wraps
from flask import request, jsonify

from database import users_collection

JWT_SECRET = os.getenv("JWT_SECRET", "")


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

            parts = auth_header.split()

            if len(parts) != 2 or parts[0] != "Bearer":

                return jsonify({
                    "success": False,
                    "message": "Invalid Authorization Header"
                }), 401

            token = parts[1]

            payload = jwt.decode(
                token,
                JWT_SECRET,
                algorithms=["HS256"]
            )

            current_user = users_collection.find_one({
                "email": payload["email"]
            })

            if current_user is None:

                return jsonify({
                    "success": False,
                    "message": "User not found"
                }), 404

            return f(current_user, *args, **kwargs)

        except jwt.ExpiredSignatureError:

            return jsonify({
                "success": False,
                "message": "Token has expired"
            }), 401

        except jwt.InvalidTokenError:

            return jsonify({
                "success": False,
                "message": "Invalid token"
            }), 401

        except Exception as e:

            return jsonify({
                "success": False,
                "message": str(e)
            }), 500

    return decorated