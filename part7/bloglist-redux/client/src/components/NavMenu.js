import { Link, useNavigate } from 'react-router-dom'
import { logOutUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Button } from '../StyledComponents/form.styled'
import { Nav } from '../StyledComponents/index.styled'

const NavMenu = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logOutUser())
    navigate('/')
  }

  return (
    <Nav>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>

      <p>{user.name} logged in</p>
      <Button type="button" onClick={handleLogout}>
          logout
      </Button>
    </Nav>
  )
}

export default NavMenu