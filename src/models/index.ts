import { Category } from './Category'
import { Course } from './Course'
import { Episode } from './Episode'
import { User } from './User'


Category.hasMany(Course, {as: 'courses'}) // Uma categoria tem muitos cursos  -- Falei que as (como) vai ser courses
Course.belongsTo(Category) // Um curso tem uma unica categoria

Course.hasMany(Episode) // Uma curso tem muitos episodeos 
Episode.belongsTo(Course) // Um episodeo pertence a um unico curso

export {
  Category,
  Course,
  Episode,
  User
}