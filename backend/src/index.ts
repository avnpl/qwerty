import { PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

const server = app.listen(8080, () => {
  console.log('Server ready at http://localhost:8080')
})
