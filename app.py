import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__, static_folder='./build', static_url_path='/')

# Enable CORS for the specific frontend origin
CORS(app, origins="http://localhost:3000")

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/checkin', methods=['GET'])
def checkIn_hardware():
    if request.method == 'OPTIONS':
        print("Handling preflight request...")
        response = jsonify({"message": "CORS preflight successful"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response, 200
    project_id = request.args.get('projectId')
    qty = request.args.get('qty', type=int)
    if not project_id or qty is None:
        return jsonify({"error": "Missing projectId or qty"}), 400
    return jsonify({"message": f"{qty} hardware checked in", "projectId": project_id, "qty": qty})


@app.route('/checkout', methods=['OPTIONS', 'GET'])
def checkOut_hardware():
    if request.method == 'OPTIONS':
        # CORS preflight request
        response = jsonify({"message": "CORS preflight successful"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Cache-Control", "no-store")  # Prevent caching
        return response, 200

    if request.method == 'GET':
        try:
            project_id = request.args.get('projectId')
            qty = request.args.get('qty', type=int)

            if not project_id or qty is None:
                return jsonify({"error": "Missing projectId or qty"}), 400

            response = jsonify({"message": f"{qty} hardware checked out", "projectId": project_id, "qty": qty})
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
            response.headers.add("Cache-Control", "no-store")  # Prevent caching
            return response
        except Exception as e:
            return jsonify({'message': str(e)}), 400

@app.route('/join', methods=['GET'])
def joinProject():
    if request.method == 'OPTIONS':
        print("Handling preflight request...")
        response = jsonify({"message": "CORS preflight successful"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response, 200
    project_id = request.args.get('projectId')
    if not project_id:
        return jsonify({"error": "Missing projectId"}), 400
    return jsonify({"message": f"Joined {project_id}", "projectId": project_id})

@app.route('/leave', methods=['GET'])
def leaveProject():
    if request.method == 'OPTIONS':
        print("Handling preflight request...")
        response = jsonify({"message": "CORS preflight successful"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response, 200
    project_id = request.args.get('projectId')
    if not project_id:
        return jsonify({"error": "Missing projectId"}), 400
    return jsonify({"message": f"Left {project_id}", "projectId": project_id})

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))