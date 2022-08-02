import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let loggedUser, blog

beforeEach(() => {
  loggedUser = {
    username: 'testing-username'
  }

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

test('blog component only renders title and author', () => {
  const { container } = render(<Blog blog={blog} loggedUser={loggedUser} />)

  const div1 = container.querySelector('.title-author')
  const div2 = container.querySelector('.title-author-url-likes')

  expect(div1).not.toHaveStyle('display: none')
  expect(div2).toHaveStyle('display: none')
})


test('blog component renders url and likes after button click', async () => {
  const { container } = render(<Blog blog={blog} loggedUser={loggedUser} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const div = container.querySelector('.title-author-url-likes')
  expect(div).not.toHaveStyle('display: none')
})

test('if like button is clicked twice then event handle is called twice', async () => {
  const mockLikeHandler = jest.fn()

  render(<Blog blog={blog} loggedUser={loggedUser} likeBlog={mockLikeHandler}/>)

  const user = userEvent.setup()
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})