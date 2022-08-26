import { useDispatch } from 'react-redux'
import { logInUser } from '../reducers/userReducer'
import { useField } from '../hooks/index'
import { Button, Form } from '../StyledComponents/form.styled'

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
      <Form onSubmit={handleLogin}>
        <h1>log in to application</h1>
        <label>
          username
          <input
            data-cy="username"
            name="Username"
            {...username}
          />
        </label>
        <label>
          password
          <input
            data-cy="password"
            name="Password"
            {...password}
          />
        </label>
        <Button data-cy="login" type="submit">
          login
        </Button>
      </Form>
    </>
  )
}

export default Login
