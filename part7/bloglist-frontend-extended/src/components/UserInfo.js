import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserInfo = () => {

  const userList = useSelector(state => state.user)

  return (
    <table>
      <thead>
        <tr>
          <th>Users</th>
          <th>  |  blogs created</th>
        </tr>
      </thead>
      <tbody>
        {userList.map(user =>
          <tr key={user.id} style={{ textAlign: 'center' }}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>)}
      </tbody>
    </table>
  )
}

export default UserInfo