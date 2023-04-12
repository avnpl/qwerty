import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../index.css'

function Root() {
  return (
    <div className="flex justify-center">
      <div className="max-w-5xl w-full lg:py-6 py-4">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Root
