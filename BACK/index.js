require('dotenv').config();
const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const router = require('./app/router');
const app = express();

const options = {
  info: {
    version: '1.0.0',
    title: 'API-MyMusicalWorld',
    description: 'MyMusicalWorld\'s librairy',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
};

const firstFunction = expressJSDocSwagger(app)(options);

// firstFunction(options);



const port = process.env.PORT || 5050;

// /**
//  * GET /api/v1
//  * @summary This is the summary of the endpoint
//  * @return {object} 200 - success response
//  */
//  app.get('/api/v1', (req, res) => res.json({
//   success: true,
// }));

// On passe l'app express en paramètre, puis on ré-exécute cette fonction
// en passant l'objet de config en argument


app.use((request, response, next) => {
  console.log('passé par là')
  next();
})

// on importe le module cors
const cors = require('cors');
//on met à jour les options de notre module cors
const corsOptions = {
  exposedHeaders: `Authorization`,
};
// et on l'applique dans un middleware pour autoriser tous les domaines à se connecter à notre API
// app.use(cors('*'));
app.use(cors(corsOptions));

app.use(express.json());

app.use(router)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

