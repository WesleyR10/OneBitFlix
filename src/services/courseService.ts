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

    const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random()) // Ordenando de forma aleatória
    return randomFeaturedCourses.slice(0,3) // Retorna a ordenação aleatória cortando os elementos pegando a partir da posição zero ate a 3
  },

  getTopTenNewest: async () => {
    const courses  = await Course.findAll({
      order: [['created_at', 'DESC']], // Ordenando pela data de atualização os cursos de forma descendente do maior para o menor
      limit: 10
    })
    return courses
  },

  getTopTenByLikes:async () => {
    const result = await Course.sequelize?.query( 
      // Semelhante ao attributes
    `SELECT 
      courses.id,
      courses.name,
      courses.synopsis,
      courses.thumbnail_url AS thumbnailUrl,
      COUNT(users.id) AS likes 
    FROM courses
      LEFT OUTER JOIN likes
      ON courses.id = likes.course_id
      INNER JOIN users
      ON users.id = likes.user_id
    GROUP BY courses.id
    ORDER BY likes DESC
    LIMIT 10;` 
    )
    if(result){
      const [topTen,metadata] = result
      return topTen
    } else {
      return null
    }
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
      include: { // Include é uma associação
        association: 'episodes', // Associação definida no index do models ou automática de acordo com o nome
        attributes: ['id', 'name', 'synopsis', 'order', // Atributos que quero da associação 
          ['video_url', 'videoUrl'], // Aqui foi renomeado
          ['seconds_long', 'secondsLong']],  // Aqui foi renomeado
          
          order: [['order', 'ASC']],
          separate: true // Rodar o include em uma query separada para utilizar o order
      }
    })
    
    return courseWithEpisodes 
  }, 
}