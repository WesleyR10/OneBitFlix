import { Request, Response } from 'express'
import { userService } from '../services/userService'
import { jwtService } from '../services/jwtService'

export const authController = {
    // POST /auth/register
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
  },

      // POST /auth/login
      login: async (req: Request, res: Response) => {
        const { email, password } = req.body // Aqui pegamos os dados que serão passados no corpo da requisição para efetuar o login

        try {
          const user = await userService.finByEmail(email) // Tentar obter o usuario pelo seu email

          if(!user){ // Se não tiver um usuario
            return res.status(404).json({ message: 'E-mail não registrado' })
          }          

          user.checkPassword(password, (err, isSame) => {
            if(err) return res.status(400).json({message: err.message}) // Se deu erro dentro do processo retorna a message para o frontEnd

            if(!isSame) return res.status(401).json({message: "Senha incorreta"}) // Retorna a resposta se o erro ocorreu por causa da senha

            const payload = {
              id: user.id, // O user e a verificação por email que foi feita la em cima e retornou todos os dados desse usuario
              firstName: user.firstName,
              email: user.email
            }

            // Criação do token
            const token = jwtService.signToken(payload, '1d') // Token expira em 1 dia

            return res.json({authenticated: true, ...payload, token})
          }
        )

        } catch (err) {
          if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
          }
        }
      }
}