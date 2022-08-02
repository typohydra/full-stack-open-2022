import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

let blog

beforeEach(() => {
  blog = {
    title: 'testing-title',
    author: 'testing-author',
    url: 'testing-url',
    likes: 42,
    user: {
      name: 'testing-user',
      username: 'testing-username'
    }
  }
})

test('form calls event handler with the right details when a new blog is created', async () => {
  const mockCreateBlogHandler = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={mockCreateBlogHandler}/>)
  const titleInput = container.querySelector('[name="title"]')
  const authorInput = container.querySelector('[name="author"]')
  const urlInput = container.querySelector('[name="url"]')
  const createButton = container.querySelector('[type="submit"]')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)
  await user.click(createButton)

  expect(mockCreateBlogHandler.mock.calls).toHaveLength(1)
  expect(mockCreateBlogHandler.mock.calls[0][0].title).toBe('testing-title')
  expect(mockCreateBlogHandler.mock.calls[0][0].author).toBe('testing-author')
  expect(mockCreateBlogHandler.mock.calls[0][0].url).toBe('testing-url')
})