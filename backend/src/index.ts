import { PrismaClient } from '@prisma/client'
import express from 'express'
import morgan from 'morgan'
import { matchRoutes } from './matchRoutes'
import { userRoutes } from './userRoutes'
require('dotenv').config()

const prisma = new PrismaClient()
const app = express()
const port = process.env.PORT
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(userRoutes)
app.use(matchRoutes)

const server = app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`)
})
