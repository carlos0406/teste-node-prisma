import { UserController } from '@controllers/UserController'
import { Router } from 'express'
const routes = Router()

// instanciando controllers
const userController = new UserController()
// rota de criacao de usuario
routes.post('/users', userController.create)

export default routes
