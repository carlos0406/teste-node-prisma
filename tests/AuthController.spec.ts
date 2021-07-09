/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */
import request from 'supertest'
import app from '../src/infra/app'
import { prisma } from '@infra/prisma'

describe('Testing auth routes', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany()
  })
  afterEach(async () => {
    await prisma.user.deleteMany()
  })
  afterAll(async () => {
    await prisma.user.deleteMany()
    await prisma.$disconnect()
  })
  it('should able autheticate', async () => {
    await request(app).post('/users').send({
      username: 'John Doe',
      password_hash: 'password'
    })
    const response = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })
    expect(response.status).toBe(201)
    expect(response.body.user.username).toEqual('John Doe')
    expect(response.body.token.length > 0).toBe(true)
  })

  it('should not be able to authenticate,because incorrect password', async () => {
    await request(app).post('/users').send({
      username: 'John Doe',
      password_hash: 'password1'
    })
    const response = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })
    expect(response.status).toBe(401)
    expect(response.body.errorMessage).toEqual('incorrect password')
  })

  it('should not able to authenticate,because user not found', async () => {
    await request(app).post('/users').send({
      username: 'John Doe1',
      password_hash: 'password'
    })
    const response = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })
    expect(response.status).toBe(401)
    expect(response.body.errorMessage).toEqual('user not found')
  })
  it('should not able autheticate because request without credendials', async () => {
    await request(app).post('/users').send({})
    const response = await request(app).post('/authentication').send({
      username: 'John Doe',
      password_hash: 'password'
    })
    expect(response.status).toBe(401)
  })
})
