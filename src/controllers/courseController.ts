import { Request, Response } from 'express'
import { courseService } from '../services/courseService'

export const coursesController  = {
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
}}
}