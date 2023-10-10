import AdminJs, { PageHandler } from 'adminjs'
import { Category, Course, Episode, User } from '../models'

export const dashboardOptions: {
  handler?: PageHandler
  component?: string
} = {
    component: AdminJs.bundle('./components/Dashboard'), // Arquivo tsx que configura a exibição da tela inical adminjs
		handler: async (req, res, context) => {
      const courses = await Course.count() // Conta o numero de registro no banco de dados
      const episodes = await Episode.count() // Conta o numero de registro no banco de dados
      const category = await Category.count() // Conta o numero de registro no banco de dados
      const standardUsers = await User.count({ where: { role: 'user' } }) // Conta o numero de usuarios padrao no banco de dados

      res.json({
        'Cursos': courses,
        'Episódios': episodes,
        'Categorias': category,
        'Usuários': standardUsers
      })
    }
  }
