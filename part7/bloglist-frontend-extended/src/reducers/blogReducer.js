import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data

  case 'CREATE_BLOG':
    return [
      ...state,
      action.data
    ]

  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)

  case 'LIKE_BLOG': {
    const id = action.data.id
    const blog = state.find(b => b.id === id)
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    return state.map(blog => blog.id !== id ? blog : likedBlog)
  }

  case 'ADD_COMMENT':
    return [
      ...state,
      action.data
    ]

  case 'GET_COMMENTS':
    return action.data

  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const init = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: init
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export const likeBlog = (blogObj) => {
  return async dispatch => {
    const likedBlog = await blogService.update({ ...blogObj, likes: blogObj.likes + 1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const addComment = (id, content) => {
  return async dispatch => {
    const comment = await blogService.addComment(id, content)
    dispatch({
      type: 'ADD_COMMENT',
      data: comment
    })
  }
}

export const getComments = (id) => {
  return async dispatch => {
    const comments = await blogService.getComment(id)
    dispatch({
      type: 'GET_COMMENTS',
      data: comments
    })
  }
}

export default blogReducer