
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
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
