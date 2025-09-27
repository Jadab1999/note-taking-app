from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ..utils import get_db, get_current_user
from motor.motor_asyncio import AsyncIOMotorDatabase
import uuid, datetime

router = APIRouter()

class NoteIn(BaseModel):
    title: str
    content: Optional[str] = ''

class NoteOut(NoteIn):
    note_id: str
    created_on: str
    last_update: str

@router.get('/', response_model=List[NoteOut])
async def list_notes(db: AsyncIOMotorDatabase = Depends(get_db), user=Depends(get_current_user)):
    notes = db['notes']
    cursor = notes.find({'user_id': user['user_id']}).sort('created_on', -1)
    out = []
    async for n in cursor:
        out.append(NoteOut(**{
            'note_id': n['note_id'],
            'title': n['title'],
            'content': n.get('content',''),
            'created_on': n['created_on'],
            'last_update': n.get('last_update', n['created_on'])
        }))
    return out

@router.post('/')
async def create_note(payload: NoteIn, db: AsyncIOMotorDatabase = Depends(get_db), user=Depends(get_current_user)):
    notes = db['notes']
    now = datetime.datetime.utcnow().isoformat()
    note = {
        'note_id': str(uuid.uuid4()),
        'user_id': user['user_id'],
        'title': payload.title,
        'content': payload.content,
        'created_on': now,
        'last_update': now
    }
    await notes.insert_one(note)
    return {'msg': 'created', 'note_id': note['note_id']}

@router.put('/{note_id}')
async def update_note(note_id: str, payload: NoteIn, db: AsyncIOMotorDatabase = Depends(get_db), user=Depends(get_current_user)):
    notes = db['notes']
    res = await notes.update_one({'note_id': note_id, 'user_id': user['user_id']}, {'$set': {'title': payload.title, 'content': payload.content, 'last_update': datetime.datetime.utcnow().isoformat()}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail='Note not found')
    return {'msg': 'updated'}

@router.delete('/{note_id}')
async def delete_note(note_id: str, db: AsyncIOMotorDatabase = Depends(get_db), user=Depends(get_current_user)):
    notes = db['notes']
    res = await notes.delete_one({'note_id': note_id, 'user_id': user['user_id']})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail='Note not found')
    return {'msg': 'deleted'}
