import { config } from 'dotenv-flow'
import express from 'express'
import routes from './routes'
import cors from 'cors'

config({ silent: true })
const app = express()
app.use(express.json())
app.use(routes)
app.use(cors())

export default app
