import { config } from 'dotenv-flow'
import express from 'express'
import routes from './routes'
import cors from 'cors'
import swagger from './swagger.json'
import swaggerUi from 'swagger-ui-express'

config({ silent: true })
const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger))
app.use(routes)
app.use(cors())

export default app
