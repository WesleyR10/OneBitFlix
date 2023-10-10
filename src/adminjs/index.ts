import AdminJs from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import { sequelize } from '../database'
import { adminJsResources } from './resources'
import { locale } from './locale'
import { dashboardOptions } from './dashboard'
import { brandingOptions } from './branding'
import { authtenticationOptions } from './authentication'

AdminJs.registerAdapter(AdminJsSequelize)

export const adminJs = new AdminJs({
  databases: [sequelize],
  rootPath: '/admin', // Caminho para o admin
  resources: adminJsResources,
  branding: brandingOptions, // Modificando as cores do adminJs
  locale: locale, //Tradução 
  dashboard: dashboardOptions 
})

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
  adminJs, 
  authtenticationOptions ,
  null,
  {
	resave: false,
	saveUninitialized: false
})