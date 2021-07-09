/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */
import request from 'supertest'
import app from '../src/infra/app'
import { prisma } from '@infra/prisma'

describe('testing post routes', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany()
    await prisma.post.deleteMany()
  })
  afterEach(async () => {
    await prisma.post.deleteMany()
  })
  afterAll(async () => {
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()
    await prisma.$disconnect()
  })
  it('should able create new post', async () => {
    await request(app).post('/users').send({
      username: 'John Doe',
      password_hash: 'password'
    })
    const responseAuth = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })

    const { token, user } = responseAuth.body
    const response = await request(app)
      .post('/posts')
      .send({
        title: 'Title test',
        slug: 'Slugtest',
        content: '<p> test</p>',
        createdBy: user.id
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(201)
    expect(response.body.slug).toBe('Slugtest')
  })

  it('should able not create new post', async () => {
    const responseAuth = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })

    const { token, user } = responseAuth.body
    const response = await request(app)
      .post('/posts')
      .send({
        title: 'Title test',
        slug: 'Slugtest',
        createdBy: user.id
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('error on create post')
  })
  it('should able list the posts', async () => {
    const responseAuth = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })

    const { token, user } = responseAuth.body
    await request(app)
      .post('/posts')
      .send({
        title: 'Title test',
        slug: 'Slugtest0',
        content: '<p> test</p>',
        createdBy: user.id
      })
      .set('Authorization', `Bearer ${token}`)
    await request(app)
      .post('/posts')
      .send({
        title: 'Title test',
        slug: 'Slugtest1',
        content: '<p> test</p>',
        createdBy: user.id
      })
      .set('Authorization', `Bearer ${token}`)
    const postslist = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`)
    expect(postslist.status).toBe(203)
  })
  it('should able create new post and get he', async () => {
    const responseAuth = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })

    const { token, user } = responseAuth.body
    const responseCreate = await request(app)
      .post('/posts')
      .send({
        title: 'Title test',
        slug: 'slugtest',
        content: '<p> test</p>',
        createdBy: user.id
      })
      .set('Authorization', `Bearer ${token}`)
    const responseShow = await request(app)
      .get('/posts/slugtest')
      .set('Authorization', `Bearer ${token}`)

    expect(responseShow.body).toEqual(responseCreate.body)
  })

  it('should not able get one post', async () => {
    const responseAuth = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })

    const { token } = responseAuth.body
    const responseShow = await request(app)
      .get('/posts/slugtest')
      .set('Authorization', `Bearer ${token}`)
    expect(responseShow.body).toEqual({ message: 'post not found' })
    expect(responseShow.status).toEqual(400)
  })
  it('should able create new post and delete he', async () => {
    const responseAuth = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })

    const { token, user } = responseAuth.body
    const responseCreate = await request(app)
      .post('/posts')
      .send({
        title: 'Title test',
        slug: 'slugtest',
        content: '<p> test</p>',
        createdBy: user.id
      })
      .set('Authorization', `Bearer ${token}`)
    const responseDelete = await request(app)
      .delete('/posts/' + responseCreate.body.id)
      .set('Authorization', `Bearer ${token}`)
    expect(responseDelete.status).toBe(204)
  })
  it('should not able delete one post', async () => {
    const responseAuth = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })

    const { token } = responseAuth.body

    const responseDelete = await request(app)
      .delete('/posts/fakeid')
      .set('Authorization', `Bearer ${token}`)
    expect(responseDelete.status).toBe(400)
  })

  it('should able update one post', async () => {
    const responseAuth = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })

    const { token, user } = responseAuth.body
    const responseCreate = await request(app)
      .post('/posts')
      .send({
        title: 'Title test',
        slug: 'slugtest',
        content: '<p>test</p>',
        createdBy: user.id
      })
      .set('Authorization', `Bearer ${token}`)

    const responseUpdate = await request(app)
      .put(`/posts/${responseCreate.body.id}`)
      .send({
        slug: 'slugtest1'
      })
      .set('Authorization', `Bearer ${token}`)
    expect(responseUpdate.body.slug).toBe('slugtest1')
    expect(responseUpdate.status).toBe(203)
  })

  it('should not able update one post', async () => {
    const responseAuth = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })

    const { token } = responseAuth.body

    const responseUpdate = await request(app)
      .put('/posts/fakeid')
      .send({
        slug: 'slugtest1'
      })
      .set('Authorization', `Bearer ${token}`)
    expect(responseUpdate.body.message).toBe('post not found')
    expect(responseUpdate.status).toBe(400)
  })
})
