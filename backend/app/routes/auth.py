from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from ..utils import get_db, hash_password, verify_password, create_jwt
from motor.motor_asyncio import AsyncIOMotorDatabase
import uuid

router = APIRouter()

class SignUpBody(BaseModel):
    username: str
    email: EmailStr
    password: str

class SignInBody(BaseModel):
    email: EmailStr
    password: str

@router.post('/signup')
async def signup(body: SignUpBody, db: AsyncIOMotorDatabase = Depends(get_db)):
    users = db['users']
    existing = await users.find_one({'email': body.email})
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    user = {
        'user_id': str(uuid.uuid4()),
        'username': body.username,
        'email': body.email,
        'password': hash_password(body.password),
    }
    await users.insert_one(user)
    return {'msg': 'user_created'}

@router.post('/signin')
async def signin(body: SignInBody, db: AsyncIOMotorDatabase = Depends(get_db)):
    users = db['users']
    user = await users.find_one({'email': body.email})
    if not user or not verify_password(body.password, user['password']):
        raise HTTPException(status_code=401, detail='Invalid credentials')
    token = create_jwt({'user_id': user['user_id'], 'email': user['email']})
    return {'access_token': token}
