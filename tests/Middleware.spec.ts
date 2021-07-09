/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */
import request from 'supertest'
import app from '../src/infra/app'
import { prisma } from '@infra/prisma'

describe('testing auth middleware', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany()
    await prisma.post.deleteMany()
  })
  afterEach(async () => {
    await prisma.post.deleteMany()
  })
  afterAll(async () => {
    await prisma.user.deleteMany()
    await prisma.$disconnect()
  })
  it('create user to test', async () => {
    await request(app).post('/users').send({
      username: 'John Doe',
      password_hash: 'password'
    })
  })

  it('shold not create new post, beacause token not sent', async () => {
    const responseAuth = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })
    const { user } = responseAuth.body
    const response = await request(app).post('/posts').send({
      title: 'Title test',
      slug: 'Slugtest',
      content: '<p> test</p>',
      createdBy: user.id
    })
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('token not sent')
  })
  it('shold not create new post, beacause bad formatted token', async () => {
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
      .set('Authorization', `Random${token}`)
    expect(response.status).toBe(401)
    expect(response.body.error).toBe(`bad formatted token`)
  })
  it('shold not create new post, beacause token not starts with "Bearer"', async () => {
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
      .set('Authorization', `Random ${token}`)
    expect(response.status).toBe(401)
    expect(response.body.error).toBe(`token not starts with "Bearer"`)
  })

  it('shold not create new post, beacause token is inval', async () => {
    const responseAuth = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })
    const { user } = responseAuth.body
    const response = await request(app)
      .post('/posts')
      .send({
        title: 'Title test',
        slug: 'Slugtest',
        content: '<p> test</p>',
        createdBy: user.id
      })
      .set('Authorization', 'Bearer randomtoken123')
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('invalid token')
  })
})
