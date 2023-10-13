import { Category } from './Category'
import { Course } from './Course'
import { Episode } from './Episode'
import { Favorite } from './Favorite'
import { User } from './User'


Category.hasMany(Course, {as: 'courses'}) // Uma categoria tem muitos cursos  -- Falei que as (como) vai ser courses

Episode.belongsTo(Course) // Um episodeo pertence a um unico curso

Course.belongsTo(Category,) // Um curso tem uma unica categoria
Course.hasMany(Episode, {as: 'episodes'}) // Uma curso tem muitos episodeos
Course.belongsToMany(User, {through: Favorite}) // Um curso tem muitos usuarios - through(atraves) dos favoritos 
Course.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'course_id' }) // Feito para acessar mais funcionalidades

User.belongsToMany(Course, {through: Favorite}) // Um usuario tem muitos cursos - through(atraves) dos favoritos
User.hasMany(Favorite, { as: 'favoritesCourses', foreignKey: 'user_id' }) // Feito para acessar mais funcionalidades

Favorite.belongsTo(Course) // Feito para acessar mais funcionalidades
Favorite.belongsTo(User) // Feito para acessar mais funcionalidades

export {
  Category,
  Course,
  Episode,
  User
}