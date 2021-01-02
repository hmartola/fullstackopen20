import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showMessage } from '../reducers/messageReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogVisible, setBlogVisible] = useState(false)

  const titleChange = (event) => {
    setTitle(event.target.value)
  }
  const authorChange = (event) => {
    setAuthor(event.target.value)
  }
  const urlChange = (event) => {
    setUrl(event.target.value)
  }

  const dispatch = useDispatch()
  //const blog = useSelector(state => state.blogs)

  const addBlog = (event) => {
    event.preventDefault()
    const content = {
      title: title,
      author: author,
      url: url
    }
    if ((content.title.trim() && content.author.trim() && content.url.trim()) !== '')  {
      dispatch(createBlog(content))
      dispatch(showMessage(`A new blog '${content.title}' by '${content.author}' created!`, 5))
    } else {
      dispatch(showMessage('Could not create blog, check all input fields', 5))
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  return (
    <div className="formDiv">
      <h3>Create New Blog</h3>

      <div style={hideWhenVisible}>
        <button onClick={() => setBlogVisible(true)}>new blog</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <div>
                title
            <input id="title" type="text" value={title} name="title" onChange={titleChange}></input>
          </div>
          <div>
                author
            <input id="author" type="text" value={author} name="author" onChange={authorChange}></input>
          </div>
          <div>
                url
            <input id="url" type="text" value={url} name="url" onChange={urlChange}></input>
          </div>
          <button type="submit">create blog</button>
        </form>
        <button onClick={() => setBlogVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default BlogForm