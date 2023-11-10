import AdminJs from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import { sequelize } from '../database'
import { adminJsResources } from './resources'
import { locale } from './locale'
import { dashboardOptions } from './dashboard'
import { brandingOptions } from './branding'
import { authenticationOptions } from './authentication'
import session from 'express-session'
import connectSession from "connect-session-sequelize"
import { ADMINJS_COOKIE_PASSWORD } from '../config/environment'

const SequelizeStore = connectSession(session.Store)
const store = new SequelizeStore({db: sequelize})
store.sync()

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
  authenticationOptions ,
  null,
  {
	resave: false,
	saveUninitialized: false,
  store: store,
  secret: ADMINJS_COOKIE_PASSWORD
})