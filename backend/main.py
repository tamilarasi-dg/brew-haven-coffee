import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection

app = FastAPI(title="Brew Haven API")

# Configure CORS
# In production, ALLOWED_ORIGINS can be set to "https://your-frontend.vercel.app,http://localhost:5173"
# If not specified or '*', allows all origins so the deployed frontend can connect immediately.
allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", "*")
if allowed_origins_raw.strip() == "*":
    allow_origins = ["*"]
    allow_credentials = False
else:
    allow_origins = [o.strip() for o in allowed_origins_raw.split(",") if o.strip()]
    allow_credentials = True

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to Brew Haven Backend!"}

@app.get("/test-db")
def test_db():
    try:
        connection = get_connection()
        connection.close()
        return {"message": "MySQL connected successfully!"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/coffees")
def get_coffees():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM coffees")
    coffees = cursor.fetchall()

    cursor.close()
    connection.close()

    return coffees

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
