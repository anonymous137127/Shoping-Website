from datetime import datetime


class Product:

    @staticmethod
    def create(data):

        return {

            "name": data.get("name"),

            "description": data.get("description"),

            "price": float(data.get("price", 0)),

            "category": data.get("category"),

            "brand": data.get("brand"),

            "stock": int(data.get("stock", 0)),

            "rating": 0,

            "reviews": 0,

            "image": data.get("image"),

            "created_at": datetime.utcnow()

        }