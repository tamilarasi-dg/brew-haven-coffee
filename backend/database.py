
import mysql.connector

def get_connection():
    connection = mysql.connector.connect(
        host="localhost",
        port=3307,
        user="root",
        password="Mysql@123",
        database="brew_haven"
    )

    return connection
