import {Like} from "../models"

export const likeService = {
  create: async (userId: number, courseId: number) => {
    const like = await Like.create({
      courseId,
      userId
    })

    return like
  },


  delete: async (userId: number, courseId: number) => {
  await Like.destroy({
    where: {  // Excluir aonde o user id e o courseId for igual o passado na requisição
      userId,
      courseId
    }
  })

  return 
},

isLiked: async (userId: number, courseId: number) => {
  const like = await Like.findOne({ // E um método de busca que verifica se tem like passando os mesmo parâmetros que foi utilizado para criar
    where: {
      userId,
      courseId
    }
  })

  return like !== null ? true : false
}}