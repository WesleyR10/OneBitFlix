import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import bcrypt from 'bcrypt'
import { EpisodeInstance } from './Episode'

type CheckPasswordCallback = (err?: Error | undefined, isSame?: boolean) => void
export interface User {
  id: number
  firstName: string
  lastName: string
  phone: string
  birth: Date
  email: string
  password: string
  role: 'admin' | 'user' // Usuário so pode ter esses 2 perfil
}

export interface UserCreationAttributes
  extends Optional<User, 'id'> {}

export interface UserInstance
  extends Model<User, UserCreationAttributes>, User {
    Episodes?: EpisodeInstance[]             
    checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void// Minha instancia utiliza como funcionalidade extra esse método criado para check de senha
  }

export const User = sequelize.define<UserInstance, User>('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },
  birth: {
    allowNull: false,
    type: DataTypes.DATE
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    validate: { // Garantir que o texto passado é um email
      isEmail: true  
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: { // Garantir que o texto é admin ou user
      isIn: [['admin', 'user']]  
    }
  }
}, {
  hooks: {
    // Antes de registro ser salvo ou atualizado
    beforeSave: async (user) => {
      // isNewRecord(propriedade do sequelize) retorna verdadeiro se propriedade ainda nao existir no banco de dados ou a senha do user foi atualizada (changed)
      if (user.isNewRecord || user.changed('password')) { 
        user.password = await bcrypt.hash(user.password.toString(), 10); // hash cria a senha criptografada
      }
    }
  }
})

User.prototype.checkPassword = function (password: string, callbackfn: CheckPasswordCallback){ // checkPasswordCallback -> type criado no começo do arquivo
  bcrypt.compare(password, this.password, (err, isSame) => {
    if (err) {
      callbackfn(err)
    } else {
      callbackfn(err, isSame)
    }
  })
}