import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState({title: '', author: '', url: ''})
  const [message, setMessage] = useState(null)

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
  const handleTitleChange = ({target}) => setBlog({...blog, title: target.value})
  const handleAuthorChange = ({target}) => setBlog({...blog, author: target.value})
  const handleUrlChange = ({target}) => setBlog({...blog, url: target.value})
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      blogService.setToken(user.token)
      const createdBlog = await blogService.create(blog)
      setBlogs(blogs.concat(createdBlog))

      setMessage({
        text: `a new blog ${blog.title} by ${blog.author} added`,
        style: 'success'
      })

      setBlog({title: '', author: '', url: ''})
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
      
      <BlogForm
        blog={blog}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        handleCreateBlog={handleCreateBlog}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
