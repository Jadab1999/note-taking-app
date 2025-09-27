import { useState } from 'react'
import API from '../lib/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    try {
      await API.post('/auth/signup', { username, email, password })
      alert('Registered, please sign in')
      router.push('/signin')
    } catch (err) {
      alert('signup failed')
    }
  }

  return (
    <div className="login-page">
      <div className="login-window">
        <div className="window-header">Register</div>
        <h2 className="login-title">Register</h2>
        <form onSubmit={submit} className="login-form">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-group">
            <button className="btn btn-login" type="submit">
              Register
            </button>
            <Link href="/signin">
              <button type="button" className="btn btn-register">
                Back to Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
