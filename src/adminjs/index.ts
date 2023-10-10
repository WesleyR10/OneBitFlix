import AdminJs from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import { sequelize } from '../database'
import { adminJsResources } from './resources'
import { User } from '../models'
import bcrypt from 'bcrypt'

AdminJs.registerAdapter(AdminJsSequelize)

export const adminJs = new AdminJs({
  databases: [sequelize],
  rootPath: '/admin', // Caminho para o admin
  resources: adminJsResources,
  branding: { // Modificando as cores do adminJs
    companyName: 'OneBitFlix',
    logo: '/logoOnebitflix.svg',
    theme: {
      colors: {
        primary100: '#ff0043',
	      primary80: '#ff1a57',
	      primary60: '#ff3369',
	      primary40: '#ff4d7c',
		    primary20: '#ff668f',
	      grey100: '#151515',
	      grey80: '#333333',
	      grey60: '#4d4d4d',
	      grey40: '#666666',
	      grey20: '#dddddd',
	      filterBg: '#333333',
	      accent: '#151515',
	      hoverBg: '#151515',
      }
    }
  }
})

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => { 
    const user = await User.findOne({ where: { email } }) // findOne encontrar usuario por email que vem pelos parametros do frontend da funcao de callback acima 

    if (user && user.role === 'admin') { // Se usuario existir e se a permissão for admin
      const matched = await bcrypt.compare(password, user.password) // variavel que compara a senha utilizando ela criptografada - Senha do parametro depois senha do banco de dados

      if (matched) { // Se senha sao iguais retorna user e autenticação foi bem sucessidada
        return user
      }
    }

    return false
  },
  cookiePassword: 'senha-do-cookie'
}, null, {
	resave: false,
	saveUninitialized: false
})