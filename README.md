# 🌾 AI for Bharat – Crop Price & Market Advisor

## 🚀 Overview

AI for Bharat – Crop Price & Market Advisor is an AI-powered decision-support system designed to help small and marginal farmers in rural India make smarter selling decisions.

The platform analyzes historical mandi (market) price data (Kaggle + Agmarknet datasets) to:

- 📈 Predict short-term crop price trends  
- 🏪 Recommend the best nearby mandi  
- 🗣 Explain predictions in simple local language  
- 📊 Visualize price trends clearly  

This project was built for the **AI for Bharat Hackathon (Powered by AWS).**

🌐 Live Demo: http://13.201.19.252/

---

## 🎯 Problem Statement

Farmers in rural India lack transparent, forward-looking crop price intelligence.

Most existing platforms:

- Show only current prices  
- Provide raw numbers without guidance  
- Are English-heavy  
- Do not predict future prices  

As a result, farmers:

- Depend heavily on middlemen  
- Sell without knowing short-term price trends  
- Lack data-driven decision support  

---

## 👨‍🌾 Target Users

- Small & marginal farmers in rural India  
- Farmers using basic smartphones  
- Low-bandwidth rural internet users  
- Regional language speakers  

---

## 💡 What Makes This Different?

| Existing Solutions | Our Solution |
|-------------------|--------------|
| Show only current prices | Predict future prices |
| Raw numbers | Actionable advice (when & where to sell) |
| English-heavy | Local-language explanations |
| No reasoning | Explainable AI output |
| Assumes digital literacy | Rural-first low-bandwidth UI |

---

## 🔥 Core Features

### 📈 Crop Price Forecasting

- Uses time-series forecasting (Prophet)
- Linear Regression / Moving Average as baseline fallback
- Predicts short-term mandi price trends (7-day forecast)
- Dataset trained dynamically per crop-market pair

### 🏪 Best Mandi Recommendation

- Suggests the most profitable nearby market  
- Based on predicted price comparison  

### 📊 Price Trend Visualization

- Historical + forecast charts  
- Simple and clean visual interface  

### 🗣 LLM-Based Local Language Explanation

- Converts AI predictions into simple Hindi/regional explanations  
- Farmer-friendly insights  
- Explainable output  

### 💬 Natural Language Query Support

- Farmers can ask crop-related questions naturally  
- Text-ready (voice-ready architecture supported)  

### 📱 Low-Bandwidth Friendly Interface

- Designed for rural smartphones  
- Minimal data usage  
- Lightweight frontend  

### ⚖ Ethical & Responsible AI

- Uses public mandi datasets (Kaggle + Agmarknet)  
- Advisory-only predictions  
- Clear disclaimers to prevent misuse  

---

## 🏗 Architecture
- **User (Farmer)**
- **Frontend (Web / Mobile – React)**
- **Backend API (FastAPI)**
- **Price Forecast Model (Prophet / Baseline)**
- **Market Recommendation Logic**
- **LLM Explanation Generator**


---

## 🧠 Forecasting Model

### Primary Model
- Facebook Prophet (Time-Series Forecasting)

### Baseline Model
- Linear Regression / Moving Average (Fallback)

### Model Behavior
- Trained dynamically per crop-market dataset  
- Short-term (7-day) forecast generation  
- Forecast stored as JSON for backend consumption  

---

## 📂 Data Source

- Kaggle mandi price datasets  
- Public government mandi datasets (Agmarknet)  
- Cleaned historical CSV datasets  

### Data Storage

- CSV-based historical storage  
- JSON output for backend integration  
- Lightweight MVP architecture (no heavy DB required)

---

## 🛠 Tech Stack

### AI / ML
- Python  
- Prophet  
- Pandas  
- NumPy  
- Scikit-learn (baseline models)  

### LLM / NLP
- NLP-based local-language explanation generation  

### Backend
- Python  
- FastAPI  

### Frontend
- React  
- Chart.js  

### Storage
- CSV files  
- JSON-based outputs  

### Cloud & Deployment
- AWS EC2 (Cloud VM)  
- Lightweight infrastructure  
- SSL via Let’s Encrypt  

---

## 💰 Estimated Implementation Cost

### Estimated Monthly Cost

| Item | Cost (Approx) |
|------|---------------|
| Cloud VM (AWS) | ₹800 – ₹1,500 |
| Storage (Database + Backups) | ₹200 |
| Domain | ~₹70/month |
| SSL Certificate (Let’s Encrypt) | Free |
| Maintenance & Monitoring | ₹200 – ₹300 |

**Total Monthly Cost:** ₹1,000 – ₹2,000  

---

### Estimated Yearly Cost

≈ ₹15,000 – ₹25,000 per year  

---

## 📊 Impact on Rural India

- Empowers farmers with data-driven price awareness  
- Reduces dependency on middlemen  
- Improves rural market transparency  
- Supports ethical and inclusive AI adoption  
- Strengthens rural livelihoods  

---

## 🚀 Scalability

Easily extendable to:

- Multiple crops  
- Multiple states  
- Multiple mandis  
- Region-agnostic architecture  

Lightweight deployment under ₹2,000/month  

---

## 📌 Responsible AI Note

This platform provides advisory insights only.  
Predictions are probabilistic and should not be treated as guaranteed outcomes.

---

## 👥 Team

**Team Name:** Erika  
**Team Leader:** Pushkar Singh  

Built for AI for Bharat Hackathon (Powered by AWS).



