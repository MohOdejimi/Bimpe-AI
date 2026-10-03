"""
FLASK AI MICROSERVICE

Exposes POST /analyze to evaluate candidate posts for buying intent.
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from analyzer import analyze_opportunity

load_dotenv()

app = Flask(__name__)
CORS(app)

PORT = int(os.getenv("PORT", 8000))

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "service": "AI Microservice"
    })

@app.route('/analyze', methods=['POST'])
def analyze():
    """
    POST /analyze
    Input payload:
      {
        "post": { "text": "...", "location": "..." },
        "business": { "whatTheySell": "...", "targetCustomer": "..." }
      }
    """
    data = request.get_json() or {}
    post = data.get('post', {})
    business = data.get('business', {})
    
    # TODO: Pass payload to analyzer and return structured JSON result
    result = analyze_opportunity(post, business)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True)
