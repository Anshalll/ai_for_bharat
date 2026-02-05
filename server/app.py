from flask import Flask, jsonify, request, session
from flask_cors import CORS
from mangum import Mangum
from flask_session import Session
import os
from dotenv import load_dotenv
import boto3

load_dotenv()

app = Flask(__name__)


app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

app.config["SESSION_TYPE"] = "dynamodb"
app.config["SESSION_DYNAMODB"] = boto3.resource(
    "dynamodb",
    region_name="ap-south-1"
)
app.config["SESSION_DYNAMODB_TABLE"] = os.getenv("SESSION_DB_NAME")
app.config["SESSION_PERMANENT"] = False

Session(app)

CORS(app, origins="*")

@app.route("/")
def home():
    return "Hello Lambda"

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "password":
        session.clear()  
        session["user"] = username
        return jsonify({"message": "Login successful"}), 200

    return jsonify({"message": "Invalid credentials"}), 401


@app.route("/set")
def set_session():
    session.clear()
    session["user"] = "LambdaUser"
    return "Session Saved"


@app.route("/get")
def get_session():
    return jsonify({"session_user": session.get("user", "No session")})


handler = Mangum(app)

if __name__ == "__main__":
    app.run(debug=True)
