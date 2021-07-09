import { Request, Response } from 'express'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { prisma } from '@infra/prisma'

export class AuthController {
  async authUser(request: Request, response: Response) {
    const { username, password_hash } = request.body
    try {
      const md5password = md5(password_hash)

      const userDb = await prisma.user.findUnique({
        where: {
          username
        }
      })
      if (userDb.password_hash !== md5password) {
        return response.status(401).json({ errorMessage: 'incorrect password' })
      }
      const token = jwt.sign({ id: userDb.id }, process.env.SECRET_KEY, {
        expiresIn: 10800
      })

      return response
        .status(201)
        .json({ user: { id: userDb.id, username: userDb.username }, token })
    } catch (error) {
      return response.status(401).json({ errorMessage: 'user not found' })
    }
  }
}
