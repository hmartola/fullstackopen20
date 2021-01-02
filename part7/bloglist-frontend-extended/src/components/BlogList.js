import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)

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
      {blogs
        .sort((a,b) => a.likes < b.likes ? 1 : -1)
        .map(blog =>
          <div key={blog.id}>
            <div style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}  -  {blog.author}</Link>
            </div>
          </div>
        )}
    </div>
  )
}

export default BlogList