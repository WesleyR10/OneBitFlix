import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { coursesController } from './controllers/courseController'
import { episodesController } from './controllers/episodesController'
import { authController } from './controllers/authController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'

const router = express.Router()

// Todas as rotas de User
router.post('/auth/register', authController.register) // Criação e autenticação do usuario
router.post('/auth/login', authController.login) // login do usuario

// Todas as rotas de categorias
router.get('/categories', ensureAuth, categoriesController.index) //Rota que retorna todas as categorias
router.get('/categories/:id', ensureAuth, categoriesController.show) //Rota que retorna categoria especifica

// Todas as rotas de cursos
router.get('/courses/featured', ensureAuth, coursesController.featured) //Rota que retorna 3 cursos em destaque
router.get('/courses/newest', coursesController.newest) //Rota que retorna 10 cursos em lançamentos
router.get('/courses/search', ensureAuth, coursesController.search) //Rota que busca um curso
router.get('/courses/:id', ensureAuth, coursesController.show) //Rota que retorna curso especifico

// Straming
router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream) // Retorna o video

export { router }