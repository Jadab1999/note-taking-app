import { useState } from 'react'
import API from '../lib/api'
import { useAuthStore } from '../lib/store'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setToken = useAuthStore((s) => s.setToken)
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    try {
      const res = await API.post('/auth/signin', { email, password })
      setToken(res.data.access_token)
      router.push('/')
    } catch (err) {
      alert('signin failed')
    }
  }

  return (
    <div className="login-page">
      <div className="login-window">
        <div className="window-header">Login</div>
        <h2 className="login-title">Login</h2>
        <form onSubmit={submit} className="login-form">
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
              Login
            </button>
            <Link href="/signup">
              <button type="button" className="btn btn-register">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
