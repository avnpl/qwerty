import { useRouteError } from 'react-router-dom'

export default function Error() {
  const error: any = useRouteError()
  console.error(error)

  return (
    <div className="grid place-items-center mx-auto">
      <div>
        <h1 className="text-5xl my-4 mx-2">Oops!</h1>
        <p className="text-xl m-2">Sorry, an unexpected error has occurred.</p>
        <p className="m-2">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  )
}
