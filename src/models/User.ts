// src/models/User.ts

import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

export interface User {
  id: number
  firstName: string
  lastName: string
  phone: string
  birth: Date
  email: string
  password: string
  role: 'admin' | 'user' // Usuario so pode ter esses 2 perfil
}

export interface UserCreationAttributes
  extends Optional<User, 'id'> {}

export interface UserInstance
  extends Model<User, UserCreationAttributes>, User {}

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
})