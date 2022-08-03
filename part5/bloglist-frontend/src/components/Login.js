const Login = ({ username, password, handleLogin, handleUsernameChange, handlePasswordChange }) => {
  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input data-cy='username'
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input data-cy='password'
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <button data-cy='login' type='submit'>login</button>
      </form>
    </>
  )
}

export default Login
