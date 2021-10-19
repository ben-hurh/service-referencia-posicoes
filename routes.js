const referencesRouter = require('./modules/references/routes');

const { Router } = require('express');
const routes = Router();

routes.use('/references', referencesRouter);

module.exports = routes;