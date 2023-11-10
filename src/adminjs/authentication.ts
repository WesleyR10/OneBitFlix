import { AuthenticationOptions } from '@adminjs/express'
import { User } from '../models'
import bcrypt from 'bcrypt'
import { ADMINJS_COOKIE_PASSWORD } from '../config/environment'

export const authenticationOptions: AuthenticationOptions =  {
  authenticate: async (email, password) => { 
    const user = await User.findOne({ where: { email } }) // findOne encontrar usuário por email que vem pelos parâmetros do frontend da função de callback acima 

    if (user && user.role === 'admin') { // Se usuário existir e se a permissão for admin
      const matched = await bcrypt.compare(password, user.password) // variável que compara a senha utilizando ela criptografada - Senha do parâmetro depois senha do banco de dados

      if (matched) { // Se senha sao iguais retorna user e autenticação foi bem sucedida
        return user
      }
    }

    return false
  },
  cookiePassword: ADMINJS_COOKIE_PASSWORD
}