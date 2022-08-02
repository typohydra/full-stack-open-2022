import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBologAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
  
  const handleUsernameChange = ({target}) => setUsername(target.value)
  const handlePasswordChange = ({target}) => setPassword(target.value)
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBologAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setMessage({
        text: exception.response.data.error,
        style: 'error'
      })
      setTimeout(() => {setMessage(null)}, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService.setToken(user.token)
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))

      setMessage({
        text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        style: 'success'
      })
    }
    catch (exception) {
      setMessage({
        text: exception.response.data.error,
        style: 'error'
      })      
    }
    setTimeout(() => {setMessage(null)}, 3000)
  }

  const  likeBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : {...updatedBlog, user: blogObject.user}))
    }
    catch (exception) {
      setMessage({
        text: exception.response.data.error,
        style: 'error'
      })   
    }
    setTimeout(() => {setMessage(null)}, 3000)
  }

  const deleteBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      await blogService.deleteBlog(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      setMessage({
        text: `Deleted blog ${blogObject.title} by ${blogObject.author}`,
        style: 'success'
      })
    }
    catch (exception) {
      setMessage({
        text: exception.response.data.error,
        style: 'error'
      })   
    }
    setTimeout(() => {setMessage(null)}, 3000)
  }

  if(user === null) {
    return (
      <div>
        <Notification 
          message={message} 
        />        
        <Login 
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification 
        message={message} 
      />

      <h2>blogs</h2>
      {user.name} logged in
      <button type='button' onClick={handleLogout}>logout</button>
      
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
          />
      </Togglable>

      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            loggedUser={user}
          />
      )}
    </div>
  )
}

export default App
