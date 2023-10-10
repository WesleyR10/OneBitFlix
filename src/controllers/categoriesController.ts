import { Request, Response } from 'express'
import { categoryService } from '../services/categoryService'
import { getPaginationParams } from '../helpers/getPaginationParams'

export const categoriesController = {
    //Metodo que retorna todas as categorias - GET - /categories
    index: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req.query)

    try {
      const paginatedCategories = await categoryService.findAllPaginated(page, perPage)
        
      return res.json({paginatedCategories})
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
  }},

  //Metodo que retorna uma categoria especifica - GET - /categories/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params // Requisição passada no caso o id

    try {
      const category = await categoryService.findByIdWithCourses(id)
      return res.json(category)
      } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
  }}
}