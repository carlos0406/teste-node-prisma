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
    // pegando slug pelo paramentro da requisicao
    const { slug } = request.params
    // buscando um usuario pelo slug
    const post = await prisma.post.findUnique({
      where: {
        slug
      }
    })
    if (!post) {
      // caso o post nao seja encontrado retorna um erro
      return response.status(400).json({ message: 'post not found' })
    } else {
      // caso encontre um post retorna todos os dados
      return response.status(203).json(post)
    }
  }

  async del(request: Request, response: Response) {
    // pegando o id pelo parametro da requisicao
    const { id } = request.params
    try {
      // tentando deletar um usuario com o id do parametro
      await prisma.post.delete({
        where: { id }
      })
      // casso encontre e delete um usuario retorna status 204
      return response.status(204).send()
    } catch (error) {
      // caso nao encontre um usuario retorna erro
      return response.status(400).json(error)
    }
  }

  async change(request: Request, response: Response) {
    // pegando o id pelo parametro da requisicao
    const { id } = request.params
    // pegado os dados para alteracao
    const { body } = request
    try {
      // encontra um post pelo id e edita com o corpo da requisicao
      const post = await prisma.post.update({
        where: {
          id
        },
        data: body
      })
      // retorna o post com os dados novos
      return response.status(203).json(post)
    } catch (error) {
      // caso nao encontre o post retorna erro
      return response.status(400).json({ message: 'post not found' })
    }
  }
}
