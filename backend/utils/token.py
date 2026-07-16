import jwt
import os
from datetime import datetime
from datetime import timedelta


JWT_SECRET = os.getenv("JWT_SECRET")


def generate_token(email):

    payload = {

        "email": email,

        "exp": datetime.utcnow() + timedelta(days=7)

    }

    token = jwt.encode(

        payload,

        JWT_SECRET,

        algorithm="HS256"

    )

    return token


def verify_token(token):

    try:

        payload = jwt.decode(

            token,

            JWT_SECRET,

            algorithms=["HS256"]

        )

        return payload

    except:

        return None