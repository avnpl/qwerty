export default function Register({}) {
  return (
    <form action="post" id="register-form" className="space-y-5">
      <p>
        <span>Name</span>
        <input
          placeholder="Name"
          aria-label="Name"
          type="text"
          className="mx-5 py-0.5 px-2 rounded-md border-2 border-neutral-700"
          required
        />
      </p>
      <p>
        <span>Email</span>
        <input
          placeholder="Email"
          aria-label="Email"
          type="email"
          className="mx-5 py-0.5 px-2 rounded-md border-2 border-neutral-700"
          required
        />
      </p>
      <p>
        <span>Username</span>
        <input
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
          placeholder="Password"
          aria-label="Password"
          type="password"
          className="mx-5 py-0.5 px-2 rounded-md border-2 border-neutral-700"
          required
        />
      </p>
      <p>
        <span>Bio</span>
        <input
          name="bio"
          placeholder="Enter Bio"
          className="mx-5 py-0.5 px-2 rounded-md border-2 border-neutral-700"
          required
        />
      </p>
      <p>
        <button
          className="px-4 pt-1 pb-2 rounded-md border-2 border-neutral-700"
          type="submit"
        >
          Register
        </button>
      </p>
    </form>
  )
}
