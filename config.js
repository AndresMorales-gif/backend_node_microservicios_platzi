require('dotenv').config()

module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT
  },
  mysqlService: {
    port: process.env.MYSQL_SERVICE_PORT || 3001,
    host: process.env.MYSQL_SERVICE_HOST || 'http://localhost'
  },
  postService: {
    port: process.env.POST_SERVICE_PORT || 3002,
    host: process.env.POST_SERVICE_HOST || 'http://localhost'
  }
}