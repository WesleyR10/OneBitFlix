import express from 'express'
import { categoriesController } from './controllers/categoriesController'

const router = express.Router()

// Todas as rotas de categorias
router.get('/categories', categoriesController.index) //Rota que retorna todas as categorias
router.get('/categories/:id', categoriesController.show) //Rota que retorna categoria especifica


export { router }