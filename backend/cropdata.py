

import numpy as np
import pandas as pd
import warnings
from prophet import Prophet

warnings.filterwarnings('ignore')

df = pd.read_csv('Agriculture_price_dataset.csv')
df.head()

df.info()

df.shape

df.describe()

df.isnull().sum()

print(df.columns.tolist())

# 1. Clean column names

df.columns = (
    df.columns
      .str.strip()
      .str.lower()
      .str.replace(" ", "_")
)


# 2. Standardize key column names

column_mapping = {
    "commodity": "crop",
    "commodity_name": "crop",
    "state_name": "state",
    "market_name": "market",
    "arrival_date": "date",
    "price_date": "date",
    "modal_price": "price",
    "arrivals": "arrivals"
}

df = df.rename(columns={k: v for k, v in column_mapping.items() if k in df.columns})


# 3. Convert date column to datetime

df["date"] = pd.to_datetime(df["date"], errors="coerce")

# 4. Keep only ML-relevant columns

required_columns = ["date", "crop", "state", "market", "price"]
optional_columns = ["arrivals"]

final_columns = [c for c in required_columns + optional_columns if c in df.columns]
df = df[final_columns]

# 5. Light data cleaning

df = df.dropna(subset=["date", "crop", "state", "market", "price"])
df = df.drop_duplicates()

# 6. Normalize text fields
df["crop"] = df["crop"].str.strip().str.lower()
df["state"] = df["state"].str.strip().str.lower()
df["market"] = df["market"].str.strip().str.lower()

# 7. STRICT scope control (FINAL)

scope_conditions = (
    # Onion: Lucknow (UP) vs Sonipat (Haryana)
    (
        (df["crop"] == "onion") &
        (
            ((df["state"] == "uttar pradesh") & (df["market"] == "lucknow")) |
            ((df["state"] == "haryana") & (df["market"] == "sonipat"))
        )
    )
    |
    # Wheat: Meerut (UP) vs Kurukshetra (Haryana)
    (
        (df["crop"] == "wheat") &
        (
            ((df["state"] == "uttar pradesh") & (df["market"] == "meerut")) |
            ((df["state"] == "haryana") & (df["market"] == "kurukshetra"))
        )
    )
    |
    # Potato: Bewar (UP) vs Panipat (Haryana)
    (
        (df["crop"] == "potato") &
        (
            ((df["state"] == "uttar pradesh") & (df["market"] == "bewar")) |
            ((df["state"] == "haryana") & (df["market"] == "panipat"))
        )
    )
)

df_scoped = df[scope_conditions].copy()

# 8. Create crop-specific DataFrames
onion_df = df_scoped[df_scoped["crop"] == "onion"].copy()
wheat_df = df_scoped[df_scoped["crop"] == "wheat"].copy()
potato_df = df_scoped[df_scoped["crop"] == "potato"].copy()

# 9. Confirm final datasets

print("Final Scoped Dataset Shape:", df_scoped.shape)

print("\nOnion Dataset Shape:", onion_df.shape)
print(onion_df.head())

print("\nWheat Dataset Shape:", wheat_df.shape)
print(wheat_df.head())

print("\nPotato Dataset Shape:", potato_df.shape)
print(potato_df.head())

"""**EDA**"""

# Basic info
print(df_scoped.info())

# Check unique values
print("\nCrops:", df_scoped["crop"].unique())
print("States:", df_scoped["state"].unique())
print("Markets:", df_scoped["market"].unique())

records_per_series = (
    df_scoped
    .groupby(["crop", "state", "market"])
    .size()
    .reset_index(name="records")
    .sort_values("records", ascending=False)
)

print(records_per_series)

date_coverage = (
    df_scoped
    .groupby(["crop", "state", "market"])
    .agg(
        start_date=("date", "min"),
        end_date=("date", "max"),
        unique_days=("date", "nunique")
    )
    .reset_index()
)

print(date_coverage)

def missing_date_check(df):
    full_range = pd.date_range(df["date"].min(), df["date"].max(), freq="D")
    missing_days = len(full_range) - df["date"].nunique()
    return missing_days

missing_summary = (
    df_scoped
    .groupby(["crop", "state", "market"])
    .apply(missing_date_check)
    .reset_index(name="missing_days")
)

print(missing_summary)

price_check = (
    df_scoped
    .groupby(["crop", "state", "market"])
    .agg(
        min_price=("price", "min"),
        max_price=("price", "max")
    )
    .reset_index()
)

print(price_check)

df_scoped = df_scoped.sort_values(["crop", "state", "market", "date"])



def train_forecast_model(df, forecast_weeks=4):
    """
    Uses Prophet if sufficient weekly data exists,
    otherwise falls back to a rolling-average baseline.
    """

    # Weekly aggregation
    weekly_df = (
        df[["date", "price"]]
        .set_index("date")
        .resample("W")["price"]
        .mean()
        .reset_index()
    )

    weekly_points = weekly_df.shape[0]

    # -----------------------------
    # CASE 1: Enough data → Prophet
    # -----------------------------
    if weekly_points >= 6:
        prophet_df = weekly_df.rename(columns={"date": "ds", "price": "y"})

        model = Prophet(
            daily_seasonality=False,
            weekly_seasonality=False,
            yearly_seasonality=False
        )

        model.fit(prophet_df)

        future = model.make_future_dataframe(periods=forecast_weeks, freq="W")
        forecast = model.predict(future)

        output = forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]]
        output["model_used"] = "prophet"

        return output

    # -----------------------------
    # CASE 2: Sparse data → Baseline
    # -----------------------------
    else:
        last_price = weekly_df["price"].iloc[-1]

        future_dates = pd.date_range(
            start=weekly_df["date"].max(),
            periods=forecast_weeks + 1,
            freq="W"
        )[1:]

        output = pd.DataFrame({
            "ds": future_dates,
            "yhat": [last_price] * forecast_weeks,
            "yhat_lower": [last_price * 0.95] * forecast_weeks,
            "yhat_upper": [last_price * 1.05] * forecast_weeks,
            "model_used": "baseline"
        })

        return output

forecast_results = []

grouped = df_scoped.groupby(["crop", "state", "market"])

for (crop, state, market), group_df in grouped:
    try:
        forecast_df = train_forecast_model(group_df, forecast_weeks=4)

        # Add identifiers back
        forecast_df["crop"] = crop
        forecast_df["state"] = state
        forecast_df["market"] = market

        forecast_results.append(forecast_df)

        print(f"Model trained successfully for {crop} | {market}, {state}")

    except Exception as e:
        print(f"Skipped {crop} | {market}, {state} — Reason: {e}")

final_forecast_df = pd.concat(forecast_results, ignore_index=True)

# Sort for readability and consistency
final_forecast_df = final_forecast_df.sort_values(
    ["crop", "state", "market", "ds"]
)

print("\nFinal Forecast Data Shape:", final_forecast_df.shape)
print(final_forecast_df.head())



def predict_next_7_days(df):
    """
    Generates next 7 days daily price prediction using a
    Trend-Based Baseline to avoid flat lines.
    """
    results = []
    grouped = df.groupby(["crop", "state", "market"])

    for (crop, state, market), group_df in grouped:
        group_df = group_df.sort_values("date")

        # 1. Get the last known price and date
        last_date = group_df["date"].max()
        last_price = group_df.loc[group_df["date"] == last_date, "price"].iloc[0]

        # 2. Calculate a simple trend (Change over last 5 records)
        # If we have at least 2 records, calculate daily change; else change is 0
        if len(group_df) > 1:
            recent_data = group_df.tail(5)
            # Simple linear trend: (last - first) / number of steps
            total_change = recent_data['price'].iloc[-1] - recent_data['price'].iloc[0]
            daily_trend = total_change / len(recent_data)
        else:
            daily_trend = 0

        # 3. Create next 7 days with trend applied
        future_dates = pd.date_range(
            start=last_date + pd.Timedelta(days=1),
            periods=7,
            freq="D"
        )

        for i, d in enumerate(future_dates, 1):
            # Apply the trend: Price = last_price + (trend * days_out)
            # We add a tiny bit of random noise (0.1%) for visual realism
            noise = np.random.uniform(-0.001, 0.001) * last_price
            prediction = last_price + (daily_trend * i) + noise

            results.append({
                "date": d,
                "predicted_price": round(prediction, 2),
                "lower_bound": round(prediction * 0.95, 2),
                "upper_bound": round(prediction * 1.05, 2),
                "model_used": "trend_baseline",
                "crop": crop,
                "state": state,
                "market": market
            })

    return pd.DataFrame(results)

# Re-run the prediction
next_7_day_predictions = predict_next_7_days(df_scoped)

next_7_day_predictions = predict_next_7_days(df_scoped)

print(next_7_day_predictions.head())
print("\nShape:", next_7_day_predictions.shape)


def compare_mandies(predictions_df):
    """
    Compares mandis for each crop based on
    average predicted price over next 7 days.
    """

    # 1. Aggregate predictions per crop-market
    mandi_summary = (
        predictions_df
        .groupby(["crop", "state", "market"])
        .agg(
            avg_predicted_price=("predicted_price", "mean"),
            min_price=("predicted_price", "min"),
            max_price=("predicted_price", "max")
        )
        .reset_index()
    )

    # 2. Rank mandis within each crop
    mandi_summary["rank"] = (
        mandi_summary
        .groupby("crop")["avg_predicted_price"]
        .rank(ascending=False, method="dense")
    )

    # 3. Sort for readability
    mandi_summary = mandi_summary.sort_values(
        ["crop", "rank"]
    )

    return mandi_summary

mandi_comparison = compare_mandies(next_7_day_predictions)

print(mandi_comparison)

def recommend_best_market(mandi_comparison_df):
    """
    Selects the best market for each crop based on ranking.
    Rank = 1 means best market.
    """

    # Filter only best-ranked mandis
    best_markets = (
        mandi_comparison_df
        .loc[mandi_comparison_df["rank"] == 1]
        .copy()
    )

    # Add recommendation text (optional but useful)
    best_markets["recommendation"] = (
        "Recommended market to sell " + best_markets["crop"]
    )

    # Sort for clean output
    best_markets = best_markets.sort_values("crop")

    return best_markets

best_market_recommendations = recommend_best_market(mandi_comparison)

print(best_market_recommendations)

def generate_simple_explanation(df):
    """
    Generates simple English + Hindi explanations
    for best market recommendations.
    """

    explanations = []

    for _, row in df.iterrows():
        crop = row["crop"].capitalize()
        market = row["market"].capitalize()
        state = row["state"].capitalize()
        price = round(row["avg_predicted_price"], 2)

        # English explanation
        english_text = (
            f"For {crop}, {market} market in {state} is recommended "
            f"because the predicted average price for the next 7 days "
            f"is around ₹{price}. This may give better selling value."
        )

        # Hindi explanation (simple & safe)
        hindi_text = (
            f"{crop} ke liye {state} ke {market} mandi behtar hai, "
            f"kyunki agle 7 dinon ka andaza lagaya gaya ausat bhav "
            f"lagbhag ₹{price} hai. Is mandi mein bechna faydemand ho sakta hai."
        )

        explanations.append({
            "crop": row["crop"],
            "state": row["state"],
            "market": row["market"],
            "predicted_price": price,
            "english_explanation": english_text,
            "hindi_explanation": hindi_text
        })

    return pd.DataFrame(explanations)

explanation_df = generate_simple_explanation(best_market_recommendations)

print(explanation_df[["crop", "english_explanation", "hindi_explanation"]])

print(explanation_df.loc[0, "english_explanation"])
print(explanation_df.loc[0, "hindi_explanation"])

def build_api_response(predictions_df, best_market_df, explanation_df):
    """
    Packages all outputs into a clean API-ready JSON structure.
    """

    response = {
        "project": "AI for Bharat – Crop Price & Market Advisor",
        "disclaimer": (
            "Prices are advisory predictions based on publicly available data. "
            "Actual market prices may vary."
        ),
        "data": []
    }

    for _, row in best_market_df.iterrows():
        crop = row["crop"]
        state = row["state"]
        market = row["market"]
        avg_price = round(row["avg_predicted_price"], 2)

        # Get 7-day predictions for this crop-market
        future_prices = (
            predictions_df[
                (predictions_df["crop"] == crop) &
                (predictions_df["state"] == state) &
                (predictions_df["market"] == market)
            ]
            .sort_values("date")
        )

        future_list = []
        for _, fp in future_prices.iterrows():
            future_list.append({
                "date": fp["date"].strftime("%Y-%m-%d"),
                "predicted_price": round(fp["predicted_price"], 2),
                "lower_bound": round(fp["lower_bound"], 2),
                "upper_bound": round(fp["upper_bound"], 2),
                "model_used": fp["model_used"]
            })

        # Get explanation text
        explanation_row = explanation_df[
            (explanation_df["crop"] == crop) &
            (explanation_df["state"] == state) &
            (explanation_df["market"] == market)
        ].iloc[0]

        response["data"].append({
            "crop": crop,
            "recommended_market": {
                "market": market,
                "state": state,
                "predicted_average_price": avg_price
            },
            "next_7_days_forecast": future_list,
            "explanation": {
                "english": explanation_row["english_explanation"],
                "hindi": explanation_row["hindi_explanation"]
            }
        })

    return response
def get_api_response():
    api_response = build_api_response(
        next_7_day_predictions,
        best_market_recommendations,
        explanation_df
    )
    return api_response

