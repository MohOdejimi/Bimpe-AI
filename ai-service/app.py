from flask import Flask, request, jsonify
from analyzer import analyze_lead

app = Flask(__name__)


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    text = data.get("text", "")
    location = data.get("location", "")

    if not text:
        return jsonify({
            "error": "Lead text is required"
        }), 400

    try:
        result = analyze_lead(text, location)

        return jsonify({
            "success": True,
            "result": result
        })

    except Exception as e:
        print("ERROR:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)