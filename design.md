System Design Document
Mandi-Level Crop Price Forecasting System
(AI for Bharat – 7-Day Crop Price Advisor)
1. System Overview
The system is a cloud-deployed, backend-driven crop price forecasting platform that predicts 7-day future
mandi prices for:
Onion
Wheat
Potato
The system:
Trains a Facebook Prophet model dynamically per crop–market pair
Generates 7-day daily forecasts
Returns structured JSON output
Is deployed on AWS EC2
Uses CSV datasets stored in AWS S3
Serves data via Flask REST API
2. High-Level Architecture
Architecture Flow
Frontend (index.html)
↓
API Gateway
↓
Flask Backend (EC2)
↓
Data Layer (CSV from S3)
↓
Forecasting Layer (Prophet Model)
↓
JSON Response
3. Component-Level Design
3.1 Frontend Layer
Technology:
HTML + CSS + Vanilla JS
Hosted static frontend
Multi-language support (Hindi, English, Marathi, Tamil)
The frontend:
Calls backend API using 
fetch()
Renders crop cards dynamically
Displays:
Recommended market
Predicted average price
7-day forecast chart
Confidence intervals
API URL is configured in JS:
javascript
const API_URL = 'https://cvaxb6t5aa.execute-api.ap-south-1.amazonaws.com/prod/api/data';
The frontend does not perform forecasting logic.
It only consumes API responses.
3.2 API Layer (Flask Backend)
Technology:
Python
Flask
Deployment:
AWS EC2
Exposed via API Gateway
Primary Endpoint Example:
Returns structured JSON containing:
Crop name
Recommended market
Predicted average price
7-day forecast array
Confidence bounds
Explanation (English + Hindi)
3.3 Data Layer
Source:
AGMARKNET mandi-wise daily price data
Kaggle dataset (2023–2025)
Storage:
CSV files
Stored in AWS S3
Loaded in backend using pandas
Processing Steps:
1. Load CSV into pandas DataFrame
2. Filter by:
Crop
Market
3. Sort by date
4. Rename columns to Prophet format:
ds → date
y → price
No database used.
All computation done in memory.
4. Forecasting Model Design
Primary Model: Facebook Prophet
Why Prophet?
Handles seasonality
Robust to missing data
Works well for business time series
Requires minimal hyperparameter tuning
Model Configuration
Granularity: Daily
Seasonality:
Weekly seasonality enabled
No external regressors
Training Type: Dynamic (runtime training)
One independent model per crop–market pair
GET /get_data
Forecast Pipeline
For each crop–market:
1. Extract historical data
2. Format into Prophet-compatible DataFrame
3. Initialize Prophet model
4. Fit model
5. Generate future dataframe (7 days)
6. Predict future values
7. Extract:
Predicted price
Lower bound
Upper bound
8. Format into JSON
Fallback Strategy
If historical data is insufficient:
Use baseline persistence model
Predict next 7 days = last observed price
This ensures system robustness.
5. Data Flow Design
Step-by-Step Execution
1. User loads frontend
2. Frontend sends GET request to API
3. Flask endpoint triggered
4. CSV loaded from S3
5. Data filtered per crop
6. Prophet model trained
7. Forecast generated
8. JSON response returned
9. Frontend renders UI
6. AWS Deployment Architecture
Infrastructure Components
EC2 instance:
S3:
Hosts Flask backend
Runs Prophet training
Stores historical CSV datasets
API Gateway:
Provides secure public API endpoint
Deployment Characteristics
Stateless backend
No persistent database
Re-trains model per request
Scalable via EC2 resizing or load balancer (future improvement)
7. Performance Design
Current Approach
Model trained per request
Acceptable for hackathon scale
Suitable for moderate traffic
Future Optimization
Cache forecast results
Precompute daily forecasts
Store serialized model objects
Introduce Redis caching layer
8. Security Considerations
API accessible via HTTPS
No hardcoded credentials exposed
Input validation required for:
Crop name
Market name
Future improvements:
API key authentication
Rate limiting
9. Limitations
No database
No model persistence
Forecast accuracy dependent on dataset quality
No external factors (weather, policy, fuel cost) included
10. Future Enhancements
Add ARIMA/LSTM comparison module
Add external regressors (rainfall, fuel price)
Add cold storage optimization layer
Real-time AGMARKNET API integration
Mobile application