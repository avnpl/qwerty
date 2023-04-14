import { useContext, useState } from 'react'
import { LoginContext } from '../app'
import Error from '../components/error'

export const loginFunction = async (username: string, password: string) => {
  const result = await fetch('http://localhost:8000/api/getuser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json())

  if (!result.user) {
    return {
      success: false,
      message: 'Invalid credentials',
    }
  }
  const userObj = {
    username: result.user.username,
    password: result.user.password,
  }

  localStorage.setItem('user', JSON.stringify({ ...userObj }))
  return {
    success: true,
    message: 'Done',
  }
}

export default function Login() {
  const ctx = useContext(LoginContext)
  if (ctx === null) {
    return <Error />
  }
  const { setLoggedIn } = ctx

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const { success, message } = await loginFunction(username, password)
    if (!success) {
      setError(message)
    } else {
      setLoggedIn(true)
    }
  }

  return (
    <form className="space-y-5">
      <p>
        <span>Username</span>
        <input
          name="username"
          placeholder="Username"
          aria-label="Username"
          type="text"
          className="mx-5 py-0.5 px-2 rounded-md border-2 border-neutral-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </p>
      <p>
        <span>Password</span>
        <input
          name="password"
          placeholder="Password"
          aria-label="Password"
          type="password"
          className="mx-5 py-0.5 px-2 rounded-md border-2 border-neutral-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </p>
      <p>
        <button
          className="px-4 pt-1 pb-2 rounded-md border-2 border-neutral-700"
          onClick={(e) => {
            e.preventDefault()
            handleLogin()
          }}
        >
          Login
        </button>
      </p>

      {error && <p>{error}</p>}
    </form>
  )
}
