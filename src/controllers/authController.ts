import { Request, Response } from 'express'
import { userService } from '../services/userService'

export const authController = {
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, phone, birth, email, password } = req.body // Aqui pegamos os dados que serão passados no corpo da requisição

    try {
      const userAlreadyExists  = await userService.finByEmail(email) // Verifica se o usuario existe

      if(userAlreadyExists){
        throw new Error('Este e-mail já está cadastrado.')
      }

      const user = await userService.create({
        firstName,
        lastName,
        phone,
        birth,
        email,
        password,
        role: 'user'
      })

      return res.status(201).json(user)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}