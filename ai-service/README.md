# AI Microservice

This microservice handles the AI analysis component of **AI Sales Scout**. It receives candidate posts and business profile data, analyzes buying intent, and returns structured opportunity evaluations.

## 🚀 Setup & Execution

### 1. Create Virtual Environment & Install Dependencies
```bash
cd ai-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure Environment
Copy `.env.example` to `.env` (defaults to PORT 8000):
```bash
cp .env.example .env
```

### 3. Run Flask App
```bash
python app.py
```
The AI service will run on `http://localhost:8000`.

## 📡 API Specification

### POST `/analyze`

#### Request Body:
```json
{
  "post": {
    "source": "Facebook",
    "text": "Does anyone know a developer that can build a website for my restaurant in Lagos?",
    "location": "Lagos",
    "url": "https://facebook.com/example-post"
  },
  "business": {
    "name": "Chizu",
    "whatTheySell": "Websites for restaurants",
    "targetCustomer": "Restaurants in Lagos",
    "phone": "+2348000000000"
  }
}
```

#### Response Body:
```json
{
  "isOpportunity": true,
  "intent": "high",
  "urgency": "High",
  "service": "Website Development for Restaurant",
  "reason": "High intent: Post explicitly requests a developer to build a website for a restaurant in Lagos.",
  "suggestedReply": "Hello! I saw your post looking for a web developer..."
}
```
