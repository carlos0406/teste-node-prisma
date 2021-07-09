import { Router } from 'express'
const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'start' })
})

export default routes
