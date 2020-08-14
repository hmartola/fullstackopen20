const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  })

blogsRouter.get('/:id', async (request, response) => {
    const blogs = await Blog.findById(request.params.id)
    if (blogs)
      response.json(blogs)
    else
      response.status(404).end()
  })
  
blogsRouter.post('/', async (request, response) => {  
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.json(savedBlog)
    
  })

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter