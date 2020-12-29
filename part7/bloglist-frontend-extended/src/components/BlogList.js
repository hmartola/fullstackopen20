import React from 'react'
import { useSelector } from 'react-redux'
//import { useDispatch } from 'react-redux'
import Blog from './Blog'

//const dispatch = useDispatch()

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      {blogs
        .sort((a,b) => a.likes < b.likes ? 1 : -1)
        .map(blog =>
          <div key={blog.id}>
            <div>
              <Blog blog={blog} />
            </div>
          </div>
        )}
    </div>
  )
}

export default BlogList