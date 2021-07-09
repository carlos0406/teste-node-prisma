import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
export function Auth(request: Request, response: Response, next: NextFunction) {
  // pega o header de autorizacao
  const authHeader = request.headers.authorization
  // caso nao tenha header de autorizacao retorna erro
  if (!authHeader) {
    return response.status(401).send({ error: 'token not sent' })
  }
  // separado o token para checar padrao
  const tokenSplit = authHeader.split(' ')
  // caso o token nao tenha sido enviado no formato correto retorna erro
  if (tokenSplit.length !== 2) {
    return response.status(401).send({ error: 'bad formatted token' })
  }

  const [schema, token] = tokenSplit
  // verifica se a primeira palavra do header e igual a Bearer
  if (!/^Bearer$/i.test(schema)) {
    // retornar erro caso o header nao comece com Bearer
    return response
      .status(401)
      .send({ error: `token not starts with "Bearer"` })
  }
  // verifca se o token enviado foi gerado com a chave correta
  jwt.verify(token, process.env.SECRET_KEY, err => {
    // caso o token nao tenha sido gerado pela chave correta retorna erro
    if (err) {
      return response.status(401).send({ error: 'invalid token' })
    }
    // permite com que a rota seja executada com token valido
    return next()
  })
}
