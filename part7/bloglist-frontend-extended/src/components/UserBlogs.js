import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserBlogs = () => {

  const allUsers = useSelector(state => state.user)
  const { id } = useParams()

  const user = allUsers.find(match => match.id === id)

  if (!user)
    return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>{user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}</ul>
    </div>
  )
}

export default UserBlogs