import { AuthenticationOptions } from '@adminjs/express'
import { User } from '../models'
import bcrypt from 'bcrypt'

export const authtenticationOptions: AuthenticationOptions =  {
  authenticate: async (email, password) => { 
    const user = await User.findOne({ where: { email } }) // findOne encontrar usuario por email que vem pelos parametros do frontend da funcao de callback acima 

    if (user && user.role === 'admin') { // Se usuario existir e se a permissão for admin
      const matched = await bcrypt.compare(password, user.password) // variavel que compara a senha utilizando ela criptografada - Senha do parametro depois senha do banco de dados

      if (matched) { // Se senha sao iguais retorna user e autenticação foi bem sucessidada
        return user
      }
    }

    return false
  },
  cookiePassword: 'senha-do-cookie'
}