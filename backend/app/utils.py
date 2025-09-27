import os
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import Depends, HTTPException, Header
from jose import jwt, JWTError
from passlib.context import CryptContext

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
JWT_SECRET = os.getenv('JWT_SECRET', 'supersecretchangeme')
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

client = AsyncIOMotorClient(MONGO_URL)
db = client['notes_app_db']

async def get_db():
    return db

def hash_password(pw: str) -> str:
    return pwd_context.hash(pw)

def verify_password(pw: str, hashed: str) -> bool:
    return pwd_context.verify(pw, hashed)

def create_jwt(payload: dict) -> str:
    return jwt.encode(payload, JWT_SECRET, algorithm='HS256')

async def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail='Missing authorization header')
    try:
        scheme, token = authorization.split()
        if scheme.lower() != 'bearer':
            raise HTTPException(status_code=401, detail='Invalid auth scheme')
        data = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return data
    except Exception as e:
        raise HTTPException(status_code=401, detail='Invalid token') from e
