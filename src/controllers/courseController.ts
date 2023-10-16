import { Request, Response } from 'express'
import { courseService } from '../services/courseService'
import { getPaginationParams } from '../helpers/getPaginationParams'
import { AuthenticatedRequest } from '../middlewares/auth'
import { likeService } from '../services/likeService'
import { favoriteService } from '../services/favoriteService'

export const coursesController  = {
//Metodo que retorna curso em destaque - GET - /courses/featured
featured: async (req: Request, res: Response) => {
  try {
    const featuredCourses = await courseService.getRandomFeaturedCourses()
    return res.json(featuredCourses)
    } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message })
    }
}},

//Metodo que retorna cursos em lançamentos - GET - /courses/newest
newest: async (req: Request, res: Response) => {
  try {
    const NewestCourses = await courseService.getTopTenNewest()
    return res.json(NewestCourses)
    } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message })
    }
}},

//Metodo que busca cursos- GET - /courses/search?name
search: async (req: Request, res: Response) => {
  const {name} = req.query // Feito para pegar o nome passado no corpo da requisição
  const [page, perPage] = getPaginationParams(req.query)

  try {
    if (typeof name !== 'string') throw new Error('name param must be of type string'); // Definimos que o name tinha que ser string no service precisando dessa verificação para se nao for string
    const courses = await courseService.findByName(name, page, perPage)
    return res.json(courses)
    } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message })
    }
}},

//Metodo que retorna uma curso especifica - GET - /courses/:id
show: async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id
  const courseId = req.params.id // Requisição passada no caso o id

  try {
    const course = await courseService.findByIdWithEpisodes(courseId)
    
    if(!course) { return res.json({message: 'Curso não encontrado'}) }

    const liked = await likeService.isLiked(userId, Number(courseId))
    const favorited = await favoriteService.isFavorited(userId, Number(courseId))
    return res.json({...course.get(), favorited, liked})
    } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({ message: err.message })
    }
}},


}