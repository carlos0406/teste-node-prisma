import { Request, Response } from 'express'
import { prisma } from '@infra/prisma'
import md5 from 'md5'
type UserProps = {
  id: string
  username: string
  password_hash: string
}
type ResponseUser = Omit<UserProps, 'password_hash'>
export class UserController {
  async create(request: Request, response: Response) {
    try {
      // pegando dados da request
      const userInsert: UserProps = request.body
      // criptografando a senha
      userInsert.password_hash = md5(userInsert.password_hash)

      // fazendo insert no banco de dados
      const { id, username }: ResponseUser = await prisma.user.create({
        data: userInsert
      }) // retirando senha do usuario
      // retornando usuario cadastrado
      return response.status(201).json({ id, username })
    } catch (error) {
      // caso exista erro nos dados retorna erro
      return response
        .status(400)
        .json({ message: 'error on create user', error })
    }
  }
}
