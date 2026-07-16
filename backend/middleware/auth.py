from functools import wraps
from flask import jsonify

from middleware.jwt import token_required


def admin_required(f):

    @token_required
    @wraps(f)
    def decorated(current_user, *args, **kwargs):

        if current_user.get("role") != "admin":

            return jsonify({

                "success": False,
                "message": "Admin Access Required"

            }), 403

        return f(current_user, *args, **kwargs)

    return decorated