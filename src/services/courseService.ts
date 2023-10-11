import { Op } from 'sequelize'
import { Course } from '../models'

export const courseService = {

  getRandomFeaturedCourses: async () => {
    const featuredCourses  = await Course.findAll({
      attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
      where:{ // Pegar todos os cursos aonde
        featured: true // Featured for verdadeiro
      }
    })

    const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random()) // Ordenando de forma aleatoria
    return randomFeaturedCourses.slice(0,3) // Retorna a ordenação aleatoria cortando os elementos pegando a partir da posição zero ate a 3
  },

  getTopTenNewest: async () => {
    const courses  = await Course.findAll({
      order: [['updated_at', 'DESC']], // Ordenando pela data de atualização os cursos de forma descendente do maior para o menor
      limit: 10
    })
    return courses
  },

  findByName: async (name: string, page: number, perPage: number) =>{
    const offset = ( page - 1) * perPage
    const { count, rows } = await Course.findAndCountAll({
      attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
      where:{ // Pegar todos os cursos aonde
        name: {
          [Op.iLike]: `%${name}%` // Pesquisa por resultados de buscar semelhante - case insensitive - %% (Significa que quero procurar em qualquer posição)
        }
      },
      limit: perPage,
      offset
    })
  return {
    courses: rows,
    page,
    perPage,
    total: count
  }
  },

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
  }, 
}