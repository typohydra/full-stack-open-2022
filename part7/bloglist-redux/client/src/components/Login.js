import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logInUser } from '../reducers/userReducer'


const Login = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logInUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-cy="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            data-cy="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
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
