import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { coursesController } from './controllers/courseController'
import { episodesController } from './controllers/episodesController'
import { favoritesController } from './controllers/favoritesController'
import { authController } from './controllers/authController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import { likesController } from './controllers/likesController'
import { usersController } from './controllers/usersController'

const router = express.Router()

// Todas as rotas de Login e Registro
router.post('/auth/register', authController.register) // Criação e autenticação do usuario
router.post('/auth/login', authController.login) // login do usuario

// Todas as rotas de Usuario
router.get('/users/current', ensureAuth, usersController.show) // Rota que devolve a lista de episodes assistido
router.get('/users/current/watching', ensureAuth, usersController.watching) // Rota que devolve dados do usuario


// ...Categorias
router.get('/categories', ensureAuth, categoriesController.index) //Rota que retorna todas as categorias
router.get('/categories/:id', ensureAuth, categoriesController.show) //Rota que retorna categoria especifica

// Todas as rotas de cursos
router.get('/courses/featured', ensureAuth, coursesController.featured) //Rota que retorna 3 cursos em destaque
router.get('/courses/newest', coursesController.newest) //Rota que retorna 10 cursos em lançamentos
router.get('/courses/popular', ensureAuth, coursesController.popular) //Rota que retorna 10 cursos mais populares
router.get('/courses/search', ensureAuth, coursesController.search) //Rota que busca um curso
router.get('/courses/:id', ensureAuth, coursesController.show) //Rota que retorna curso especifico

// Straming
router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream) // Retorna o video
router.get('/episodes/:id/watchTime', ensureAuth, episodesController.getWatchTime)
router.post('/episodes/:id/watchTime', ensureAuth, episodesController.setWatchTime)

//Favorites
router.post('/favorites', ensureAuth, favoritesController.save)
router.get('/favorites', ensureAuth, favoritesController.index)
router.delete('/favorites/:id', ensureAuth, favoritesController.delete)

//Likes
router.post('/likes', ensureAuth, likesController.save)
router.delete('/likes/:id', ensureAuth, likesController.delete)

export { router }