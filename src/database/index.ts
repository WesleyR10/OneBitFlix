import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'onebitflix_development',
  username: 'wesleyr',
  password: 'Wesley2015@',
	define: {
    underscored: true //snak_case
  }
})