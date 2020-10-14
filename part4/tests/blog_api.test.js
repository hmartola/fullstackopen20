const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initBlogs = [
    {
        title: 'React for dummies',
        author: 'Facebook',
        url: 'unknown',
        likes: 1337
    },
    {
        title: 'Guide to Gwent',
        author: 'cd projekt red',
        url: 'unknown',
        likes: 666
    },
    {
        title: 'three',
        author: 'what',
        url: 'unknown',
        likes: 3
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObj = new Blog(initBlogs[0])
    await blogObj.save()

    blogObj = new Blog(initBlogs[1])
    await blogObj.save()

    blogObj = new Blog(initBlogs[2])
    await blogObj.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
})

test('id property is defined', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(item => {
        expect(item.id).toBeDefined();
      }) 
})

test('a new blog can be added', async () => {
    const newUser = {
        username: `${Date.now()}`,
        name: 'Token',
        password: 'p455w0rd'
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
    
    const login = await api
        .post('/api/login')
        .send({username: newUser.username, password: newUser.password})

    const newBlog = {
        title: 'Test to Add',
        author: 'me',
        url: 'unknown',
        likes: 101,
    }
    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${login.body.token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body.map(b => b.title)
    expect(response.body).toHaveLength(initBlogs.length + 1)
    expect(blogs).toContain(
        'Test to Add'
    )
})

test('missing likes is by default 0', async () => {
    const newUser = {
        username: `${Date.now()}`,
        name: 'Token',
        password: 'p455w0rd'
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
    
    const login = await api
        .post('/api/login')
        .send({username: newUser.username, password: newUser.password})

    const newBlog = {
        title: 'Zero likes',
        author: 'zeroo',
        url: 'unknown'
    }
    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${login.body.token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const litem = res.body[res.body.length - 1]
    expect(litem.likes).toBeDefined()
    expect(litem.likes).toBe(0)
 
})

test('missing content leads to a 400 bad request', async () => {
    const newUser = {
        username: `${Date.now()}`,
        name: 'Token',
        password: 'p455w0rd'
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
    
    const login = await api
        .post('/api/login')
        .send({username: newUser.username, password: newUser.password})

    const newBlog = {
        title: 'hm',
        author: 'hm',
        url: '',
        likes:  5 
    }
    const res = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${login.body.token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('adding blog without token leads to 401 unauthorized', async () => {
    const newBlog = {
        title: 'noToken',
        author: 'token',
        url: 'noo',
        likes:  5,
    }
    const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})