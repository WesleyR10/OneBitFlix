import { Favorite } from "../models"

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    const favorite = await Favorite.create({
      courseId,
      userId
    })

    return favorite
  },

  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [['user_id', 'userId']], // Do favorito quero apenas o userId
      where: {userId}, // Pegar somente do usuario passado
      include: {
        association: 'Course', // Essa e a funcionalidade extra daquela associação belongsTo Favorite/Course - Retorna os course
        attributes: [
          'id',
          'name',
          'synopsis',
          ['thumbnail_url', 'thumbnailUrl']
        ]
      }
  })
  return {
    userId, // Dessa forma retorna apenas um unico userId
    courses: favorites.map(favorite => favorite.Course) // Um unico array com todos os cursos
  }
}, 

  delete: async (userId: number, courseId: number) => {
  await Favorite.destroy({
    where: {  // Excluir aonde o user id e o courseId for igual o passado na requisição
      userId,
      courseId
    }
  })

  return 
},
}