import { useEffect, useState } from 'react'
import API from '../lib/api'
import { useAuthStore } from '../lib/store'
import Link from 'next/link'

export default function Home() {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [content, setContent] = useState('')
  const token = useAuthStore((s) => s.token)

  async function loadNotes() {
    if (!token) return
    try {
      const res = await API.get('/notes/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setNotes(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  async function saveNote() {
    try {
      await API.put(
        `/notes/${selectedNote.note_id}`,
        { title: selectedNote.title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSelectedNote(null)
      loadNotes()
    } catch (e) {
      alert('save failed')
    }
  }

  async function deleteNote() {
    try {
      await API.delete(`/notes/${selectedNote.note_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSelectedNote(null)
      loadNotes()
    } catch (e) {
      alert('delete failed')
    }
  }

  useEffect(() => {
    loadNotes()
  }, [token])

  if (!token) {
    return (
      <div className="login-page">
        <div className="login-window">
          <h2 className="login-title">Please Login</h2>
          <Link href="/signin">
            <button className="btn btn-login">Go to Login</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Keep Notes</div>
        <div className="nav-links">
          <Link href="/">Notes</Link>
          <Link href="/create">New Note</Link>
          <Link href="/account">Account</Link>
          <button
            className="btn btn-logout"
            onClick={() => useAuthStore.getState().clear()}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Greeting */}
      <h1 className="greeting">Good Morning Deva!</h1>

      {/* Notes grid */}
      <div className="notes-grid">
        {notes.map((n) => (
          <div
            key={n.note_id}
            className="note-card"
            onClick={() => {
              setSelectedNote(n)
              setContent(n.content)
            }}
          >
            <h3>{n.title}</h3>
            <p>{n.content}</p>
            <small>Last updated: {new Date(n.last_update).toLocaleString()}</small>
          </div>
        ))}
      </div>

      {/* Modal for editing */}
      {selectedNote && (
        <div className="modal-overlay">
          <div className="modal-window">
            <div className="window-header">{selectedNote.title}</div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
            />
            <div className="button-group">
              <button className="btn btn-save" onClick={saveNote}>
                Save
              </button>
              <button className="btn btn-danger" onClick={deleteNote}>
                Delete
              </button>
              <button
                className="btn btn-register"
                onClick={() => setSelectedNote(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
