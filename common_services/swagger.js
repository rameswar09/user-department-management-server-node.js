const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "User Mangement Mock APIs",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:8443",
        },
      ],
    },
    apis: ["./router/*.js"],
  };

const specs = swaggerJsdoc(options)

module.exports = (app) => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(specs))
}