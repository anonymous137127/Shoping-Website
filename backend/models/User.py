from datetime import datetime


class User:

    @staticmethod
    def create(fullname, email, phone, password):

        return {

            "fullname": fullname,

            "email": email.lower(),

            "phone": phone,

            "password": password,

            "profile": "",

            "role": "user",

            "is_active": True,

            "created_at": datetime.utcnow()

        }