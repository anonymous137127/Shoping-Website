from datetime import datetime


class Order:

    @staticmethod
    def create(

        user_email,
        fullname,
        address,
        payment_method,
        products,
        total

    ):

        return {

            "user_email": user_email,

            "fullname": fullname,

            "address": address,

            "payment_method": payment_method,

            "products": products,

            "total": total,

            "status": "Pending",

            "ordered_at": datetime.utcnow()

        }