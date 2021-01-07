import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

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

  const addBlog = (event) => {
    event.preventDefault()
    const content = {
      title: title.trim(),
      author: author.trim(),
      url: url.trim()
    }
    dispatch(createBlog(content))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  return (
    <div className="formDiv" style={{ marginTop: 20, marginBottom: 30, padding: 10, borderRadius: 5, background: 'darkgray' }}>
      <h5>Create New Blog</h5>

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