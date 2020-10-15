import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const titleChange = (event) => {
    setTitle(event.target.value)
  }
  const authorChange = (event) => {
    setAuthor(event.target.value)
  }
  const urlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
                title
          <input type="text" value={title} name="title" onChange={titleChange}></input>
        </div>
        <div>
                author
          <input type="text" value={author} name="author" onChange={authorChange}></input>
        </div>
        <div>
                url
          <input type="text" value={url} name="url" onChange={urlChange}></input>
        </div>
        <button type="submit">create blog</button>
      </form>
    </div>
  )
}

export default BlogForm

/**<form onSubmit={addBlog}>
      <div>
        title
        <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)}></input>
      </div>
      <div>
        author
        <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)}></input>
      </div>
      <div>
        url
        <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)}></input>
      </div>
      <button type="submit">create</button>

      const BlogForm = ({addBlog, titleChange, authorChange, urlChange, title, author, url}) => {
    return (
        <div>
            <h2>Create New Blog</h2>
            <form onSubmit={addBlog}>
            <div>
                title
                <input type="text" value={title} name="title" onChange={titleChange}></input>
            </div>
            <div>
                author
                <input type="text" value={author} name="author" onChange={authorChange}></input>
            </div>
            <div>
                url
                <input type="text" value={url} name="url" onChange={urlChange}></input>
            </div>
            <button type="submit">create blog</button>
            </form>
        </div>
    )
}*/