
# def get_db_connection():
#     """Devuelve una conexión a la base de datos usando variables de entorno."""
#     return psycopg2.connect(
#         dbname=os.getenv("DB_NAME"),
#         user=os.getenv("DB_USER"),
#         password=os.getenv("DB_PASSWORD"),
#         host=os.getenv("DB_HOST"),
#         port=os.getenv("DB_PORT")
#     )


import os
import psycopg2
from dotenv import load_dotenv

# ensure environment variables are loaded once when module is imported
load_dotenv()

def get_db_connection():
    """Conexión flexible para local y Railway."""
    url = os.getenv("DATABASE_URL")
    
    if url:
        # Si existe DATABASE_URL (Railway), la usa directamente
        return psycopg2.connect(url)
    else:
        # Si no existe, usa tus variables individuales del .env (Local)
        return psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT")
        )