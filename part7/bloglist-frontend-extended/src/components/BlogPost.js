import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { likeBlog, removeBlog, addComment, getComments } from '../reducers/blogReducer'
import { showMessage } from '../reducers/messageReducer'

const BlogPost = () => {

  const dispatch = useDispatch()
  const { id } = useParams()
  const allBlogs = useSelector(state => state.blogs)
  const blog = allBlogs.find(match => match.id === id)

  const addLike = () => {
    try {
      dispatch(likeBlog(blog))
      dispatch(showMessage(`Liked '${blog.title}'!`, 5))
    } catch (e) {
      console.log(e)
    }
  }

  const deleteBtn = () => {
    if (blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username) {
      return (
        <button onClick={deleteBlog}>remove blog</button>
      )
    }
  }

  const deleteBlog = () => {
    try {
      const confirm = window.confirm(`Remove blog '${blog.title}' by '${blog.author}'?`)
      if (confirm) {
        dispatch(removeBlog(blog.id))
        dispatch(showMessage('Removed blog', 5))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const Comments = () => {
    const [content, setContent] = useState('')

    const contentChange = (event) => {
      setContent(event.target.value)
    }

    const handleCommentSubmit = (event) => {
      event.preventDefault()
      dispatch(addComment(blog.id, content))
      dispatch(showMessage('Comment added!', 5))
      //dispatch(getComments(blog.id))
    }

    if (blog.comments.length === 0) {
      return (
        <div>
          <form onSubmit={handleCommentSubmit}>
            <input id="content" type="text" value={content} name="title" onChange={contentChange}></input>
            <button>add comment</button>
          </form>
          <p>No comments... Be the first one to add!</p>
        </div>
      )
    } else {
      return (
        <div>
          <form onSubmit={handleCommentSubmit}>
            <input id="content" type="text" value={content} name="title" onChange={contentChange}></input>
            <button>add comment</button>
          </form>
          <ul>
            {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
          </ul>
        </div>
      )
    }
  }

  if (!blog)
    return null

  return (
    <div>
      <h2>{blog.title} | {blog.author}</h2>
      <a href={`${blog.url}`}>{blog.url}</a> <br />
      {blog.likes} likes <button onClick={addLike}>like</button> <br />
      added by {blog.user.name} <br /><br />
      {deleteBtn()}
      <h2>comments</h2>
      <Comments />
    </div>
  )
}

export default BlogPost