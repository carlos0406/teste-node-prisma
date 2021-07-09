import { Request, Response } from 'express'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { prisma } from '@infra/prisma'

export class AuthController {
  async authUser(request: Request, response: Response) {
    // pegado dados do usuario
    const { username, password_hash } = request.body
    try {
      // criptografando a senha
      const md5password = md5(password_hash)
      // tentando busca usuario com o username da request
      const userDb = await prisma.user.findUnique({
        where: {
          username
        }
      })
      // verificando igualdade da senha
      // caso a senha não seja compativel retorna erro
      if (userDb.password_hash !== md5password) {
        return response.status(401).json({ errorMessage: 'incorrect password' })
      }
      // gerando token baseado no id do usuario
      const token = jwt.sign({ id: userDb.id }, process.env.SECRET_KEY, {
        expiresIn: 10800
      })
      // sem erros no processo
      // retorna o usuario encontrado sem a senha e o token
      return response
        .status(201)
        .json({ user: { id: userDb.id, username: userDb.username }, token })
    } catch (error) {
      // qualquer erro inesperado retorna que o usuario nao foi encontrado
      return response.status(401).json({ errorMessage: 'user not found' })
    }
  }
}
