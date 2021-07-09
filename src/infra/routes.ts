import { AuthController } from '@controllers/AuthController'
import { UserController } from '@controllers/UserController'
import { PostController } from '@controllers/PostController'
import { Auth } from '@middlewares/auth'
import { Router } from 'express'
const routes = Router()

// instanciando controllers
const userController = new UserController()
const authController = new AuthController()
const postController = new PostController()
// rota de criacao de usuario
routes.post('/users', userController.create)
// rota de autenticaçao
routes.post('/authentication', authController.authUser)
// rota de criacao de posts
routes.post('/posts', Auth, postController.create)
// rota de listagem de posts
routes.get('/posts', Auth, postController.index)
// rota de buscar somente um post
routes.get('/posts/:slug', Auth, postController.show)
// rota para deletar um post
routes.delete('/posts/:id', Auth, postController.del)
// rota de edicao de um post
routes.put('/posts/:id', Auth, postController.change)
export default routes
