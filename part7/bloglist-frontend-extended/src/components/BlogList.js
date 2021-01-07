import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div style={{ marginTop: 10 }}>
      <Table striped>
        <tbody>
          {blogs
            .sort((a,b) => a.likes < b.likes ? 1 : -1)
            .map(blog =>
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
                </td>
                <td>
                  {blog.author}
                </td>
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList