import os
from pathlib import Path
import certifi
import mysql.connector
from dotenv import load_dotenv

# Automatically load .env from backend folder if present
env_path = Path(__file__).resolve().parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
load_dotenv()

def get_connection():
    settings = {
        "host": os.getenv("DB_HOST", "localhost"),
        "port": int(os.getenv("DB_PORT", "4000")),
        "user": os.getenv("DB_USER", "root"),
        "password": os.getenv("DB_PASSWORD", ""),
        "database": os.getenv("DB_NAME", "brew_haven"),
    }

    ssl_setting = os.getenv("DB_SSL", "false").lower()
    if ssl_setting in ("true", "1", "yes"):
        settings["ssl_ca"] = certifi.where()
        settings["ssl_verify_cert"] = True

    return mysql.connector.connect(**settings)
