import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
export function Auth(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return response.status(401).send({ error: 'token not sent' })
  }
  const tokenSplit = authHeader.split(' ')
  if (tokenSplit.length !== 2) {
    return response.status(401).send({ error: 'bad formatted token' })
  }

  const [schema, token] = tokenSplit

  if (!/^Bearer$/i.test(schema)) {
    return response
      .status(401)
      .send({ error: `token not starts with "Bearer"` })
  }

  jwt.verify(token, process.env.SECRET_KEY, err => {
    if (err) {
      return response.status(401).send({ error: 'invalid token' })
    }

    return next()
  })
}
