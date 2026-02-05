from flask import Flask, jsonify, request, session
from flask_cors import CORS
from mangum import Mangum
from flask_session import Session
import os
from dotenv import load_dotenv
import boto3
from controllers import auth

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
    if session.get("username"):
        return jsonify({"success": True , "message": "Already logged in"}), 200
    
    data = request.get_json()
    resp = auth.Login(data)

    if resp["success"]:
        return jsonify({"success" : True , "message": resp["message"]}), resp["code"]
    return jsonify({"success": False, "error": resp["error"]}), resp["code"]

@app.route("/api/register", methods=["POST"])
def register():
    if session.get("username"):
        return jsonify({"success": True , "message": "Already logged in"}), 200
    
    data = request.get_json()
    
    resp = auth.Register(data)
    
    if resp["success"]:
        return jsonify({"success" : True , "message": resp["message"]}), resp["code"]
    return jsonify({"success": False, "error": resp["error"]}), resp["code"]
    
    
    return jsonify(resp)



@app.route("/api/logout" , methods=["POST"])
def logout():
    if not session.get("username"):
        return jsonify({"success": False, "message": "No active session"}), 400
    
    session.clear()
    return jsonify({"success": True, "message": "Logged out successfully"}), 200



handler = Mangum(app)

if __name__ == "__main__":
    app.run(debug=True)
