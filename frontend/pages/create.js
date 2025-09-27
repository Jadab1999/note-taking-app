import { useState } from 'react'
import API from '../lib/api'
import { useAuthStore } from '../lib/store'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function CreateNote() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const token = useAuthStore((s) => s.token)
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    try {
      await API.post(
        '/notes/',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      router.push('/')
    } catch (e) {
      alert('create failed')
    }
  }

  return (
    <div className="login-page">
      <div className="login-window">
        <div className="window-header">New Note</div>
        <h2 className="login-title">Create Note</h2>
        <form onSubmit={submit} className="login-form">
          <label>Title</label>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Content</label>
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
          />
          <div className="button-group">
            <button className="btn btn-login" type="submit">
              Save
            </button>
            <Link href="/">
              <button type="button" className="btn btn-register">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
