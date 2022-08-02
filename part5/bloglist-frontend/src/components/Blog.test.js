import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog component only renders title and author', () => {
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

  const { container } = render(<Blog blog={blog} loggedUser={loggedUser} />)

  const div1 = container.querySelector('.title-author')
  const div2 = container.querySelector('.title-author-url-likes')

  expect(div1).not.toHaveStyle('display: none')
  expect(div2).toHaveStyle('display: none')
})
