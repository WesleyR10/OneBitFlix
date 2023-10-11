import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { coursesController } from './controllers/courseController'

const router = express.Router()

// Todas as rotas de categorias
router.get('/categories', categoriesController.index) //Rota que retorna todas as categorias
router.get('/categories/:id', categoriesController.show) //Rota que retorna categoria especifica

// Todas as rotas de cursos
router.get('/courses/featured', coursesController.featured) //Rota que retorna 3 cursos em destaque
router.get('/courses/:id', coursesController.show) //Rota que retorna curso especifico

export { router }