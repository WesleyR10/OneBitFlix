import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import cors from "cors"
import { sequelize } from './database'
import { adminJs, adminJsRouter } from './adminjs'
import { router } from './routes'

const app = express()

app.use(cors())

app.use(adminJs.options.rootPath, adminJsRouter) // app.use(caminho, rotas) 

app.use(express.static('public')) // Servido como arquivo static

app.use(express.json()) // Serve para ler as requisições do corpo -- req.body

app.use(router) // Utilizar as rotas criadas no file routes.ts

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {

  sequelize.authenticate().then(() => {
    console.log('DB connection successfull.')
  })

  console.log(`Server started successfuly at port ${PORT}`)
})