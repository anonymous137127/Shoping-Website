from datetime import datetime


class Cart:

    @staticmethod
    def create(user_email, product_id, quantity=1):

        return {

            "user_email": user_email,

            "product_id": product_id,

            "quantity": quantity,

            "created_at": datetime.utcnow()

        }