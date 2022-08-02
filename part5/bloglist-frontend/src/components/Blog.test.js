import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let container

beforeEach(() => {
  const loggedUser = {
    username: 'testing-username'
  }

  const blog = {
    title: 'testing-title',
    author: 'testing-author',
    url: 'testing-url',
    likes: 42,
    user: {
      name: 'testing-user',
      username: 'testing-username'
    }
  }

  container = render(<Blog blog={blog} loggedUser={loggedUser} />).container
})

test('blog component only renders title and author', () => {
  const div1 = container.querySelector('.title-author')
  const div2 = container.querySelector('.title-author-url-likes')

  expect(div1).not.toHaveStyle('display: none')
  expect(div2).toHaveStyle('display: none')
})


test('blog component renders url and likes after button click', async () => {
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const div = container.querySelector('.title-author-url-likes')
  expect(div).not.toHaveStyle('display: none')
})