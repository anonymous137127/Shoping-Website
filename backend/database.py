from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)

db = client[Config.DATABASE_NAME]

users_collection = db["users"]
products_collection = db["products"]
cart_collection = db["cart"]
wishlist_collection = db["wishlist"]
orders_collection = db["orders"]
admins_collection = db["admins"]
reviews_collection = db["reviews"]