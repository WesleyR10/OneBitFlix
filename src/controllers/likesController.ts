import { likeService } from './../services/likeService';
import { Response } from 'express'
import { AuthenticatedRequest } from "../middlewares/auth";

export const likesController = {
 // POST /likes
  save: async (req: AuthenticatedRequest, res: Response) => { // AuthenticatedRequest é o Request do express so que ele estende a instancia de user
    const userId = req.user!.id // Sendo possível pegar o user dessa forma, do token decodificado
    const { courseId } = req.body

    try {
      const like = await likeService.create(userId, Number(courseId))
      return res.status(201).json(like)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

   // DELETE /likes/:id
  delete: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const courseId = req.params.id // Na url

    try {
      await likeService.delete(userId, Number(courseId))
      return res.status(204).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
  }
