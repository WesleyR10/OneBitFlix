import { UserCreationAttributes } from './../models/User';
import { User } from '../models'

export const userService = {

  finByEmail: async (email:string) => { 
    const user = await User.findOne({ // findOne encontrar usuario por email que vem pelos parametros do frontend da funcao de callback acima
      where: { email } 
    }) 
    
    return user
},

  create:async (attributes: UserCreationAttributes) => { // Criar o usuario
    const user = await User.create(attributes)
    return user
  }
}