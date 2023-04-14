import { Form, redirect, useActionData } from 'react-router-dom'
import { loginFormDataSchema } from '../zod'

export const loginAction = async ({ request }: any) => {
  const data = await request.formData()
  const check = loginFormDataSchema.safeParse({
    username: data.get('username'),
    password: data.get('password'),
  })
  if (!check.success) {
    return { error: 'Invalid Form Data' }
  }

  const submission = { ...check.data }
  const result = await fetch('http://localhost:8000/api/getuser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...submission }),
  }).then((res) => res.json())

  if (!result.user) {
    return { error: 'Invalid credentials' }
  }
  const userObj = {
    username: result.user.username,
    password: result.user.password,
  }

  localStorage.setItem('user', JSON.stringify({ ...userObj }))
  return redirect('/')
}

export default function Login() {
  const data: any = useActionData()

  return (
    <Form method="post" action="/login" id="login-form" className="space-y-5">
      <p>
        <span>Username</span>
        <input
          name="username"
          placeholder="Username"
          aria-label="Username"
          type="text"
          className="mx-5 py-0.5 px-2 rounded-md border-2 border-neutral-700"
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
          required
        />
      </p>
      <p>
        <button
          className="px-4 pt-1 pb-2 rounded-md border-2 border-neutral-700"
          type="submit"
        >
          Login
        </button>
      </p>

      {data && data.error && <p>{data.error}</p>}
    </Form>
  )
}
