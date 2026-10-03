from flask import Flask, request, jsonify
from analyze import analyze_lead

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json

    text = data["text"]
    location = data["location"]

    result = analyze_lead(text, location)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)