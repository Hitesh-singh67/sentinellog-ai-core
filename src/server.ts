import express from 'express';
import dotenv from 'dotenv';
import logRoutes from './routes/logs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enforce standard middleware processing limits
app.use(express.json());

// Mount Backend Ingestion Architecture Core Routing Pipelines
app.use('/api/logs', logRoutes);

// Health check endpoint for system monitoring utilities
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'online', 
    engine: 'SentinelLog-AI Core',
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`\n===============================================================`);
  console.log(` 🛡️  SentinelLog-AI Core Processing Network Pipeline Successfully Booted`);
  console.log(` 🚀 Headless Infrastructure Engine active on port ${PORT}`);
  console.log(`===============================================================\n`);
});
