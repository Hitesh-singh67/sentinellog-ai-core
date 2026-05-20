# SentinelLog-AI: Headless Network Security & Log Analyzer

SentinelLog-AI is an enterprise-grade, headless backend data pipeline built with Node.js and TypeScript. It continuously ingests, parses, and evaluates high-velocity network firewall and application logs. The core engine applies automated rule-based threat metrics to score incoming packet telemetry and dynamically triggers an advanced AI evaluation pipeline via the Google Gen AI SDK when anomalies cross dangerous thresholds.

Designed with no visual user-interface overhead, this infrastructure component focuses strictly on low-latency data processing, security compliance profiling, and database indexing optimization.

---

## 🚀 Core Architectural Features

- **Automated Logging Data Pipeline:** Implements an asynchronous headless parsing structure capable of sorting through high-volume incoming server request parameters without blocking event loop processes.
- **Rule-Based Threat Scoring:** Evaluates server logs against security constraints, checking for abnormal HTTP status flags (brute-force sweeps) and scanning raw payloads using regex filters for signature patterns like SQL Injection (SQLi) and Directory Traversal.
- **Conditional AI Profiling:** Optimizes processing costs and limits API usage by activating the `gemini-2.5-flash` model only when algorithmic threat thresholds cross a danger limit ($\ge 0.70$).
- **Optimized Network Storage Layer:** Utilizes native PostgreSQL `inet` data primitives inside Supabase to handle IPv4/IPv6 address entries optimally, alongside targeted B-Tree database indexing for low-latency security auditing lookups.

---

## 📂 System Directory Structure

```text
sentinellog-ai-core/
├── src/
│   ├── config/             # Supabase client and runtime environment verification
│   ├── pipeline/           # Log ingestion pipelines and security rule matrices
│   ├── routes/             # Core headless endpoint mapping declarations
│   ├── services/           # Google Gen AI integration pipelines and SDK setups
│   └── server.ts           # System entry point initialization script
├── database/
│   └── logs_schema.sql     # High-throughput relational database indexing layouts
├── .env.example            # Configuration boilerplate credentials reference
├── package.json
└── tsconfig.json
