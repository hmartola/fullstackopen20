import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, remove }) => {

  const [viewBlog, setViewBlog] = useState(false)

  const hideWhenVisible = { display: viewBlog ? 'none' : '' }
  const showWhenVisible = { display: viewBlog ? '' : 'none' }

  const deleteBlog = () => {
    if (blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username) {
      return (
        <button onClick={remove}>remove</button>
      )
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 5,
    whiteSpace: 'pre-wrap'
  }
  return (
    <div>
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author} <button onClick={() => setViewBlog(true)}>view</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author} <button onClick={() => setViewBlog(false)}>hide</button> {'\n'}
          {blog.url} {'\n'}
            likes: {blog.likes} <button onClick={like}>like</button> {'\n'}
          {blog.user.name} {'\n'}
          {deleteBlog()}
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired

}

export default Blog
