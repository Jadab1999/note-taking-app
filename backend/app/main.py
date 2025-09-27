from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, notes
import os

app = FastAPI(title='Notes App API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.router, prefix='/api/auth', tags=['auth'])
app.include_router(notes.router, prefix='/api/notes', tags=['notes'])

@app.get('/ping')
def ping():
    return {'ok': True}
