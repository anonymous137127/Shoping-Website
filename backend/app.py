from flask import Flask
from flask_cors import CORS

from config import Config

# =====================================
# Import Routes
# =====================================

from routes.auth import auth_bp
from routes.products import products_bp
from routes.cart import cart_bp
from routes.orders import orders_bp
from routes.users import users_bp
from routes.wishlist import wishlist_bp
from routes.admin import admin_bp
from routes.payment import payment_bp
from routes.admin_payment import admin_payment_bp


# =====================================
# Create Flask App
# =====================================

app = Flask(__name__)

app.config["SECRET_KEY"] = Config.SECRET_KEY

CORS(
    app,
    resources={r"/api/*": {"origins": "*"}}
)


# =====================================
# Register Blueprints
# =====================================

app.register_blueprint(auth_bp)
app.register_blueprint(products_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(orders_bp)
app.register_blueprint(users_bp)
app.register_blueprint(wishlist_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(payment_bp)
app.register_blueprint(admin_payment_bp)


# =====================================
# Home Route
# =====================================

@app.route("/")
def home():

    return {
        "success": True,
        "message": "Shopping Website API Running Successfully",
        "version": "1.0.0"
    }


# =====================================
# Health Check
# =====================================

@app.route("/health")
def health():

    return {
        "success": True,
        "status": "Healthy"
    }


# =====================================
# Run App
# =====================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=Config.PORT,

        debug=True

    )