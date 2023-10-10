import { Course } from '../models'

export const courseService = {

  findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes  = await Course.findByPk(id, {
      attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
      include: { // Include é uma assosiação
        association: 'episodes', // Assosiação definida no index do models ou automatica de acordo com o nome
        attributes: ['id', 'name', 'synopsis', 'order', // Atributos que quero da assosiação 
          ['video_url', 'videoUrl'], // Aqui foi renomeado
          ['seconds_long', 'secondsLong']],  // Aqui foi renomeado
          
          order: [['order', 'ASC']],
          separate: true // Rodar o include em uma query separada para utilizar o order
      }
    })
    
    return courseWithEpisodes 
  }
}