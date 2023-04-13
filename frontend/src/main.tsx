import { ThemeProvider } from 'next-themes'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Error from './components/error'
import { Home } from './routes/home'
import Login, { loginAction } from './routes/login'
import Register from './routes/register'
import Root from './routes/root'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route index element={<Home />} errorElement={<Error />} />
      <Route path="register" element={<Register />} errorElement={<Error />} />
      <Route
        path="login"
        element={<Login />}
        action={loginAction}
        errorElement={<Error />}
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider attribute="class" enableSystem={true}>
    <React.StrictMode>
      <div className="flex justify-center">
        <div className="max-w-5xl w-full lg:py-6 py-4">
          <RouterProvider router={router} />
        </div>
      </div>
    </React.StrictMode>
  </ThemeProvider>
)
