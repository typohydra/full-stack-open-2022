import { useDispatch } from 'react-redux'
import { logInUser } from '../reducers/userReducer'
import { useField } from '../hooks/index'

const Login = () => {
  const dispatch = useDispatch()
  const { reset: usernameReset, ...username } = useField('text')
  const { reset: passwordReset, ...password } = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logInUser({ username: username.value, password: password.value }))
    usernameReset()
    passwordReset()
  }

  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-cy="username"
            name="Username"
            {...username}
          />
        </div>
        <div>
          password
          <input
            data-cy="password"
            name="Password"
            {...password}
          />
        </div>
        <button data-cy="login" type="submit">
          login
        </button>
      </form>
    </>
  )
}

export default Login
