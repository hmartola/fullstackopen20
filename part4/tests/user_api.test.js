const bcrypt = require('bcryptjs')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('user focused tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })
    test('can create user meeting the requirements', async () => {
        const newUser = {
            username: 'mrjest',
            name: 'jest',
            password: 'secret'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('cannot create identical usernames', async () => {
        const newUser = {
            username: 'root',
            name: 'jest',
            password: 'secret'
        }
        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('`username` to be unique')
    })
    test('username must be given and contains 3 or more letters', async () => {
        const newUser = {
            username: 'us',
            name: 'jest',
            password: 'secret'
        }
        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
    test('password must be given and contains 3 or more letters', async () => {
        const newUser = {
            username: 'password',
            name: 'jest',
            password: 'pa'
        }
        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    mongoose.connection.close()
})