import { AuthController } from '@controllers/AuthController'
import { UserController } from '@controllers/UserController'
import { Router } from 'express'
const routes = Router()

// instanciando controllers
const userController = new UserController()
const authController = new AuthController()
// rota de criacao de usuario
routes.post('/users', userController.create)
// rota de autenticaçao
routes.post('/authentication', authController.authUser)
export default routes
