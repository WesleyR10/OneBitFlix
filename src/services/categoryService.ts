import { Category } from '../models'

export const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage // Serve para pular alguns registros de acordo com oq for passado e a pagina que estamos

    const {count, rows} = await Category.findAndCountAll({ // Encontrar e contar todos
      attributes: ['id', 'name', 'position'], // Reflete no que vai ser retornado
      order: [['position', 'ASC']], // E a ordem e o campo position de forma ascedente
      limit: perPage, // Serve para pegarmos uma quantidade especifica de registro
      offset
    })
  

    return {
      categories: rows, // Array com todas as linhas (conteudos)
      page, // Pagina que estamos
      perPage, // Quantidade por pagina
      total: count // Quantidade maxima de registro
    }
  }
}