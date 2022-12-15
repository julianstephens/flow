# Server Architecture

Ts.ED is a framework built on top of [Express.js](https://expressjs.com/) that allows us to create a REST API primarily through the use of decorators. Ts.ED also integrates with [Prisma](https://www.prisma.io/) to generate types from our database schema. This means that our API is always in sync with the database and vice versa. Ts.ED also provides an easy way to document our API by providing utilities to generate OpenAPI documentation with [Swagger](https://tsed.io/tutorials/swagger.html).

## High Level Overview of Architecture

### Prisma

Prisma is an ORM that allows us to interact with the database without having to write any SQL. The database schema is defined in `prisma/schema.prisma`. After making modifications to the schema, you can use the Prisma CLI via the command `yarn prisma` to push your changes to the database.

### Models

Models are classes that Ts.ED uses to convert JSON objects in to their TS equivalent classes. Within the models, we can specify serialization mappings, data validation, and documentation information. These models are completely generated for us via the Prisma plugin. To make adjustments to the Ts.ED models, [utilize decorators within the Prisma schema](https://tsed.io/tutorials/prisma.html#generate-models-and-repositories). **DO NOT** modify the models directly as your changes will be overwritten the next time `yarn prisma generate` is run. 

### Controllers

Controllers handle requests coming from the client and return the appropriate response. This is also where most of the notation used to generate the OpenAPI documentation lays. 

All controllers must be denoted with the `@Controller("/api/path")`. Functions can then be added to the controller class to handle specific HTTP methods for this API endpoint. See the [Ts.ED Controller documentation](https://tsed.io/docs/controllers.html#routing) for a list of the available decorators for documenting endpoints.  
