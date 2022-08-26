import { useEffect } from 'react'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import Blogs from './components/Blogs'
import User from './components/User'
import Blog from './components/Blog'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import NavMenu from './components/NavMenu'

import { CenteredBox, Page } from './StyledComponents/index.styled'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(loggedUser))
    }
  }, [])

  if (user === null) {
    return (
      <CenteredBox>
        <Notification />
        <Login />
      </CenteredBox>
    )
  }

  return (
    <Router>
      <Page>
        <NavMenu user={user} />
        <Notification />

        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<Blog loggedUser={user} />} />
          <Route path="/" element={<Blogs user={user} />} />
        </Routes>
      </Page>
    </Router>
  )
}

export default App
