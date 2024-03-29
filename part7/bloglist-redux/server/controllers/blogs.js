const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  let blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url, 
    likes: body.likes,
    user: user._id
  })
  
  const savedBlog = await blog.save()
  savedBlog.populate("user", { username: 1, name: 1 })

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    return;
  }
  response.status(401).json({ error: 'permission denied, you can\'t delete this blog' })
})

blogsRouter.put('/:id', async (request, response) => {
  const {title, author, url, likes} = request.body
  const user = request.body.user

  const blog = {
    user: user.id,
    title,
    author,
    url,
    likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
                                .populate("user", { username: 1, name: 1 })

  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", { username: 1, name: 1 })
  blog.comments = blog.comments.concat(request.body.comment)

  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
