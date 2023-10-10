import { Request, Response } from 'express'
import { Category } from '../models'

export const categoriesController = {
    //Metodo que retorna todas as categorias - GET - /categories
    index: async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll({
          attributes: ['id', 'name', 'position'], // Reflete no que vai ser retornado
          order: [['position', 'ASC']] // E a ordem e o campo position de forma ascedente
        })
        
        return res.json(categories)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
  }},

  //Metodo que retorna uma categoria especifica - GET - /categories/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params // Requisição passada no caso o id

    try {
        const categorie = await Category.findByPk(id,{
          attributes: ['id', 'name', 'position'], // Reflete no que vai ser retornado
        })
        
        return res.json(categorie)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
  }}
}