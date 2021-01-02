const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
    //response.json(blogs.map(blog => blog.toJSON()))
  })


blogsRouter.get('/:id', async (request, response) => {
    const blogs = await Blog.findById(request.params.id)
    if (blogs)
      response.json(blogs)
    else
      response.status(404).end()
  })

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) 
    response.json(blog.comments)
   else 
    response.status(404).end()
})
  
blogsRouter.post('/', async (request, response) => {  
  const body = request.body
  console.log(request.token)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  }) 

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
  })

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const comment = body.comments
  
  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(comment)
  const newComment = await blog.save()
  response.json(newComment.toJSON())
})


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes 
  } 
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.json(updatedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const blog = await Blog.findById(request.params.id)
 
  if (blog.user.toString() === decodedToken.id){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
}) 

module.exports = blogsRouter