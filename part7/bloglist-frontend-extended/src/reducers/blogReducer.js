import blogService from '../services/blogs'
import { showMessage } from './messageReducer'

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
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'CREATE_BLOG',
        data: newBlog
      })
      dispatch(showMessage({ type: 'ok', content: `New blog '${content.title}' by '${content.author}' created!` }, 5))

    } catch (e) {
      dispatch(showMessage({ type: 'error', content: 'Could not create blog, check all textfields' }, 5))
    }
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id
      })
      dispatch(showMessage({ type: 'ok', content: 'Succesfully deleted blog' }, 5))

    } catch (e) {
      dispatch(showMessage({ type: 'error', content: 'Could not delete blog' }, 5))
    }
  }
}

export const likeBlog = (blogObj) => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.update({ ...blogObj, likes: blogObj.likes + 1 })
      dispatch({
        type: 'LIKE_BLOG',
        data: likedBlog
      })
      dispatch(showMessage({ type: 'ok', content: `Liked '${blogObj.title}' !` }, 5))

    } catch (e) {
      dispatch(showMessage({ type: 'error', content: 'Could not add a like' }, 5))
    }
  }
}

export const addComment = (id, content) => {
  return async dispatch => {
    try {
      const comment = await blogService.addComment(id, content)
      dispatch({
        type: 'ADD_COMMENT',
        data: comment
      })
      dispatch(showMessage({ type: 'ok', content: 'Added new comment!' }, 5))

    } catch (e) {
      dispatch(showMessage({ type: 'error', content: 'Could not add comment' }, 5))
    }
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