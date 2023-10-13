import { sequelize } from '../database'
import { DataTypes, Model } from 'sequelize'


export interface Like {
  courseId: number
  userId: number
}

export interface LikeInstance extends Model<Like>, Like {}

export const Like = sequelize.define<LikeInstance, Like>('Like', {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  courseId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'courses',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})