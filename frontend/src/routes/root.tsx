import { Link, Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../index.css'

function Root() {
  return (
    <div className="flex justify-center">
      <div className="max-w-5xl w-full lg:py-6 py-4">
        <Navbar />
        <>
          <h1 className="text-4xl">Home Page</h1>
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
        <Outlet />
      </div>
    </div>
  )
}

export default Root
