Mandi-Level Crop Price Forecasting System
1. Problem Statement
Small and marginal farmers in India sell crops such as onion, wheat, and potato in local mandis without
knowing future price trends. They rely only on historical or current prices, leading to poor selling
decisions and unstable income.
There is no accessible, mandi-level forecasting system that predicts short-term (7-day) crop prices using
historical data.
This project builds a backend forecasting system that predicts 7-day future prices for selected crops and
exposes the results in JSON format for integration into applications.
2. Scope of the System
The system supports:
Crops:
Onion
Wheat
Potato
Forecast Horizon:
Fixed 7-day prediction window
Output:
Structured JSON forecast data
This system focuses on backend forecasting and API exposure, with optional frontend visualization.
3. Target Users
3.1 Primary Users
Small and marginal farmers selling onion, wheat, or potato in local mandis.
They use forecasts to decide optimal selling time.
3.2 Secondary Users
Agri-tech platforms integrating the JSON forecast API.
Traders and commission agents monitoring short-term trends.
Government analysts evaluating mandi volatility.
4. Functional Requirements
4.1 Input Requirements
The system shall:
1. Accept crop name as input (onion, wheat, potato only).
2. Accept mandi name as input.
3. Automatically generate a 7-day forecast (no variable horizon).
Invalid crop inputs must return an error response.
4.2 Data Processing Requirements
The system shall:
1. Retrieve historical mandi price data for selected crop.
2. Clean historical data:
Handle missing values.
Remove duplicates.
Ensure date consistency.
3. Prepare time-series formatted data for forecasting model.
4.3 Forecast Generation Requirements
The system shall:
1. Use a time-series forecasting model.
2. Generate predicted prices for the next 7 days.
3. Include confidence intervals (if supported by model).
4. Recompute forecast dynamically when new request is made.
4.4 API Requirements
The system shall expose at least one REST endpoint:
GET /forecast?crop={crop}&mandi={mandi}
The API shall return JSON format:
Example:
json
{
}
"crop": "onion",
"mandi": "Lucknow",
"forecast_horizon_days": 7,
"forecast": [
{
"date": "2026-02-16",
"predicted_price": 1450,
"confidence_interval": {
"lower": 1380,
"upper": 1520
}
}
]
The API must:
Return HTTP 400 for invalid crop.
Return HTTP 404 if mandi data not found.
Return HTTP 200 for valid request.
4.5 Frontend Requirements (If Implemented)
The frontend shall:
1. Provide dropdown for crop selection (onion, wheat, potato).
2. Provide input for mandi name.
3. Display 7-day forecast results.
4. Optionally display trend graph.
5. Non-Functional Requirements
5.1 Performance
Forecast API response time ≤ 3 seconds under normal load.
Data preprocessing should not exceed acceptable delay per request.
5.2 Scalability
System shall support at least 5,000 concurrent forecast requests.
Architecture should allow horizontal scaling if deployed on cloud.
5.3 Reliability
Forecast API availability ≥ 95%.
System must handle invalid input gracefully.
5.4 Usability
JSON response must be structured and readable.
Frontend (if provided) must be simple and intuitive.
5.5 Maintainability
The system shall follow modular separation:
Data ingestion module
Preprocessing module
Forecasting model module
API layer
Frontend (optional)
5.6 Security
API must prevent injection-based inputs.
Rate limiting should be considered.
No sensitive credentials should be exposed in code.
6. Assumptions
Historical mandi data is available and reliable.
Forecasting model performance is acceptable for short-term prediction.
Users have basic internet access.
7. Constraints
Forecast horizon fixed at 7 days.
Only three crops supported.
Accuracy depends on quality of historical data.
8. Acceptance Criteria
The system will be considered complete if:
1. Forecast API returns valid 7-day predictions.
2. JSON structure matches defined schema.
3. Invalid inputs are handled properly.
4. Frontend (if present) correctly displa