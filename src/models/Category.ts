import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

export interface Category{
  id: number
  name: string
  position: number
}

export interface CategoryCreationAttributes extends Optional<Category, 'id'> {} //Definimos as propriedades opcionais que não sao obrigatorio - Ou nao passo o id

export interface CategoryInstance extends Model<Category, CategoryCreationAttributes>, Category {}

export const Category = sequelize.define<CategoryInstance, Category>('Category', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  position: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER
  }
})