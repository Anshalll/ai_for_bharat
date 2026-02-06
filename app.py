from flask import Flask, jsonify
from cropdata import get_api_response
from flask_cors import CORS


app = Flask(__name__)
CORS(app , origins="*")

@app.route("/get_data" , methods=["GET"])
def get_data():
    data = get_api_response()
    return jsonify(data) , 200


app.run(debug=True)