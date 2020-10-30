import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog/>', () => {
  let component
  const blog = { title: 'thisIsATitle', author: 'jest', url: 'www', likes: 69, user: 'test' }
  const username = { username: 'test1' }

  test('renders only title and author without click event', () => {
    component = render(
      <Blog blog={blog} user={username}></Blog>
    )
    const div = component.container.querySelector('.beforeViewClick')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes)
  })

  test('renders title, author, url and likes after clicking button', () => {
    component = render(
      <Blog blog={blog} user={username}></Blog>
    )
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.afterViewClick')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })

  test('double clicking the like button calls the event handler twice', () => {
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} user={username} like={mockHandler}></Blog>
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('BlogForm is called by the event handles with correct details', () => {
    const createBlog = jest.fn()
    const component = render(
      <BlogForm createBlog={createBlog}></BlogForm>
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(author, {
      target: { value: 'jest' }
    })
    fireEvent.change(url, {
      target: { value: 'com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('jest')
    expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
    expect(createBlog.mock.calls[0][0].url).toBe('com')
  })
})