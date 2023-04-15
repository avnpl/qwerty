import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { LoginContext } from '../app'
import Error from '../components/error'
import Navbar from '../components/navbar'
import '../index.css'

function Root() {
  const ctx = useContext(LoginContext)
  if (ctx === null) {
    return <Error />
  }
  const { loggedIn } = ctx

  return (
    <div className="flex justify-center">
      <div className="max-w-5xl w-full lg:py-6 py-4">
        <Navbar />
        {loggedIn && (
          <>
            <div className="flex flex-row justify-between">
              <ul>
                <li>
                  <Link to="/newmatches">New Matches</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="/acceptrequests">Accept Requests</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="/sendrequests">Send Requests</Link>
                </li>
              </ul>
            </div>
          </>
        )}
        <Outlet />
      </div>
    </div>
  )
}

export default Root
