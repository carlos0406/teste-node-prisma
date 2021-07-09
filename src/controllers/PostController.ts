import { Request, Response } from 'express'
import { prisma } from '@infra/prisma'
export class PostController {
  async create(request: Request, response: Response) {
    try {
      // pegando dados da request
      const postInsert = request.body
      // fazendo insert no banco de dados
      const post = await prisma.post.create({
        data: postInsert
      })
      // retornando post cadastrado
      return response.status(201).json(post)
    } catch (error) {
      // caso exista erro nos dados retorna erro
      return response
        .status(400)
        .json({ message: 'error on create post', error })
    }
  }

  async index(request: Request, response: Response) {
    // buscando os posts no banco de dados
    const posts = await prisma.post.findMany()
    // retornandos os posts encontrados
    return response.status(203).json(posts)
  }

  async show(request: Request, response: Response) {
    const { slug } = request.params
    const post = await prisma.post.findUnique({
      where: {
        slug
      }
    })
    if (!post) {
      return response.status(400).json({ message: 'post not found' })
    } else {
      return response.status(203).json(post)
    }
  }

  async del(request: Request, response: Response) {
    const { id } = request.params
    try {
      await prisma.post.delete({
        where: { id }
      })
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async change(request: Request, response: Response) {
    const { id } = request.params
    const { body } = request
    try {
      const post = await prisma.post.update({
        where: {
          id
        },
        data: body
      })
      return response.status(203).json(post)
    } catch (error) {
      return response.status(400).json({ message: 'post not found' })
    }
  }
}
