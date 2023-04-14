import { createContext, useState } from 'react'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import Error from './components/error'
import AcceptRequests from './routes/acceptrequests'
import Login from './routes/login'
import NewMatches from './routes/newmatches'
import Register from './routes/register'
import Root from './routes/root'
import SendRequests from './routes/sendrequests'

export type ContextType = {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
} | null

export const LoginContext = createContext<ContextType>(null)

export function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'))

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route
          path="register"
          element={<Register />}
          errorElement={<Error />}
        />
        <Route path="login" element={<Login />} errorElement={<Error />} />
        <Route path="newmatches" element={<NewMatches />} />
        <Route path="acceptrequests" element={<AcceptRequests />} />
        <Route path="sendrequests" element={<SendRequests />} />
      </Route>
    )
  )
  return (
    <div className="flex justify-center">
      <div className="max-w-5xl w-full lg:py-6 py-4">
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
          <RouterProvider router={router} />
        </LoginContext.Provider>
      </div>
    </div>
  )
}
