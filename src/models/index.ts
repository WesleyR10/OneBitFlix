import { Category } from './Category'
import { Course } from './Course'

Category.hasMany(Course) // Uma categoria tem muitos cursos 
Course.belongsTo(Category) // Um curso tem uma unica categoria

export {
  Category,
  Course
}