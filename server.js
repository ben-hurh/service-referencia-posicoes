const express = require('express');
const {request, response, next} = require('express');
const express_async_errors = require('express-async-errors')
const cors = require('cors');
const { server } = require('./.env');
const routes = require('./routes');

const AppError = require('./errors/AppError')

const app = express()
app.use(cors({
  origin: server.whitelist,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use(express.json());
app.use(routes);

app.use((err, request, response, next) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }
  console.log(err)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
});

app.options('*', cors())

app.listen(server.port, () => { console.log(`Server running on port ${server.port}!`);})
