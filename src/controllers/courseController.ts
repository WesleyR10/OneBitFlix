import { Request, Response } from 'express'
import { courseService } from '../services/courseService'

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

//Metodo que retorna uma curso especifica - GET - /courses/:id
show: async (req: Request, res: Response) => {
  const { id } = req.params // Requisição passada no caso o id

  try {
    const course = await courseService.findByIdWithEpisodes(id)
    return res.json(course)
    } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message })
    }
}},


}