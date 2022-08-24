import { Link, useNavigate } from 'react-router-dom'
import { logOutUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const NavMenu = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const navMenuStyle = {
    padding: 10,
    backgroundColor: 'lightgray',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 10
  }

  const handleLogout = () => {
    dispatch(logOutUser())
    navigate('/')
  }

  return (
    <div style={navMenuStyle}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>

      {user.name} logged in
      <div>
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  )
}

export default NavMenu