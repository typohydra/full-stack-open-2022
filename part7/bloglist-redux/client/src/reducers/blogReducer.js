import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const changedBlog = action.payload
      const { id } = changedBlog
      return state.map(blog => blog.id !== id ? blog : changedBlog)
    },
    removeBlog(state, action) {
      const deletedBlogId = action.payload
      return state.filter((blog) => blog.id !== deletedBlogId)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content, token) => {
  return async dispatch => {
    try {
      blogService.setToken(token)
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification({
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        style: 'success',
      }, 3))
    } catch (exception) {
      dispatch(setNotification({
        text: exception.response.data.error,
        style: 'error',
      }, 3))
    }
  }
}

export const addLikeToBlog = (blog) => {
  return async dispatch => {
    try {
      const changedBlog = await blogService.update(blog.id, blog)
      dispatch(updateBlog(changedBlog))
    } catch (exception) {
      setNotification(({
        text: exception.response.data.error,
        style: 'error',
      }, 3))
    }
  }
}

export const deleteBlog = (blog, token) => {
  return async dispatch => {
    try {
      blogService.setToken(token)
      await blogService.deleteBlog(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(setNotification({
        text: `Deleted blog ${blog.title} by ${blog.author}`,
        style: 'success',
      }, 3))
    } catch (exception) {
      dispatch(setNotification({
        text: exception.response.data.error,
        style: 'error',
      }, 3))
    }
  }
}

export default blogSlice.reducer