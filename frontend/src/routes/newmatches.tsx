import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { LoginContext } from '../app'
import Error from '../components/error'

export default function NewMatches() {
  const ctx = useContext(LoginContext)
  if (ctx === null) {
    return <Error />
  }
  const { loggedIn } = ctx

  return (
    <>
      {!loggedIn ? (
        <Navigate to="/login" />
      ) : (
        <>
          <h1>New Matches</h1>
        </>
      )}
    </>
  )
}
