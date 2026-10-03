<<<<<<< HEAD
"# Bimpe-AI" 
"# Bimpe-AI" 
=======
# AI Sales Scout - Backend

AI Sales Scout automatically finds public social posts where people are actively looking for products or services, evaluates buying intent using AI, saves qualified opportunities, and triggers automated voice calls to business owners for high-intent leads.

---

## 🛠️ Architecture

```text
backend/
├── src/
│   ├── config/
│   │   └── database.js        # Mongoose MongoDB connection
│   ├── controllers/
│   │   ├── scout.controller.js   # Scout orchestration flow
│   │   ├── lead.controller.js    # Lead retrieval and status updates
│   │   └── business.controller.js # Business profile management
│   ├── models/
│   │   ├── Business.js           # Mongoose Business schema
│   │   └── Lead.js               # Mongoose Lead schema
│   ├── routes/
│   │   ├── scout.routes.js       # /api/scout routes
│   │   ├── lead.routes.js        # /api/leads routes
│   │   └── business.routes.js    # /api/business routes
│   ├── services/
│   │   ├── discovery.service.js   # Public post candidate discovery
│   │   ├── ai-analysis.service.js # Client bridge to Python AI service
│   │   └── voice.service.js       # BimpeAI voice notification service
│   ├── app.js                    # Express app configuration & middleware
│   └── server.js                 # Server entry point (Port 5000)
│
├── ai-service/                   # Python Flask AI microservice
│   ├── app.py
│   ├── analyzer.py
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── .env                          # Local environment variables (git-ignored)
├── .env.example                  # Environment template
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Ensure your `.env` contains your MongoDB connection URI:
```env
MONGODB_URI=mongodb://localhost:27017/ai_sales_scout
PORT=5000
AI_SERVICE_URL=http://localhost:8000
BIMPEAI_API_KEY=
BIMPEAI_BASE_URL=https://api.bimpe.ai
```

### 3. Run Development Server
```bash
npm run dev
```

The Node.js server will run at: [http://localhost:5000](http://localhost:5000)

---

## 🤖 Running the Python AI Service (Flask)

To run the Python AI service alongside the Node backend:
```bash
cd ai-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```
The AI service runs at: [http://localhost:8000](http://localhost:8000)

*(Note: If the Python AI service is not running, the Node backend seamlessly falls back to local intent evaluation so discovery flows uninterrupted).*

---

## 📡 API Endpoints

### 1. Start Scout Discovery
`POST /api/scout/start`

**Request Body:**
```json
{
  "name": "Chizu",
  "whatTheySell": "Websites for restaurants",
  "targetCustomer": "Restaurants in Lagos",
  "phone": "+2348000000000"
}
```

**Response:**
```json
{
  "message": "Scout discovery completed",
  "business": {
    "name": "Chizu",
    "whatTheySell": "Websites for restaurants",
    "targetCustomer": "Restaurants in Lagos",
    "phone": "+2348000000000"
  },
  "totalDiscovered": 3,
  "leads": [...]
}
```

---

### 2. Get All Discovered Leads
`GET /api/leads`

*Optional Query Parameter:* `?status=new` | `contacted` | `closed`

---

### 3. Get Single Lead by ID
`GET /api/leads/:id`

---

### 4. Update Lead Status
`PATCH /api/leads/:id/status`

**Request Body:**
```json
{
  "status": "contacted"
}
```

---

### 5. Get Active Business Profile
`GET /api/business/profile`
>>>>>>> 7f65b74 (Bootstrap oja-server backend codebase)
