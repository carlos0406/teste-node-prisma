/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */
import request from 'supertest'
import app from '../src/infra/app'
import { prisma } from '@infra/prisma'

describe('testing user routes', () => {
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
  it('should create new user', async () => {
    const response = await request(app).post('/users').send({
      username: 'John Doe',
      password_hash: 'senha'
    })

    expect(response.status).toBe(201)
    expect(response.body.username).toBe('John Doe')
  })

  it('should dont create new user', async () => {
    await request(app).post('/users').send({
      username: 'John Doe',
      password_hash: 'senha'
    })

    const response = await request(app).post('/users').send({
      username: 'John Doe',
      password_hash: 'senha'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('error on create user')
  })
})
