import express from 'express';
import cors from 'cors';

import scoutRoutes from './routes/scout.routes.js';
import leadRoutes from './routes/lead.routes.js';
import businessRoutes from './routes/business.routes.js';

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/scout', scoutRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/business', businessRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'AI Sales Scout Backend API',
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

export default app;
