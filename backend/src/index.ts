import { PrismaClient } from '@prisma/client'
import express from 'express'
import morgan from 'morgan'
import { router } from './routes'

const prisma = new PrismaClient()
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(router)
app.use(morgan('dev'))

const server = app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`)
})
