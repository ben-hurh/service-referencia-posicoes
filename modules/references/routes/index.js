const { Router, request } = require('express');
const Controller = require('../controllers');
const routes = Router();

routes.get('/', async (req, resp) => {
    const controller = new Controller();
    resp.status(200).json(await controller.all(req));
});

routes.post('/find', async (req, resp) => {
    const controller = new Controller();
    resp.status(200).json(await controller.find(req));
});

routes.get('/:id', async (req, resp) => {
    const controller = new Controller();
    resp.status(200).json(await controller.show(req));
});

routes.post('/find', async (req, resp) => {
    const controller = new Controller();
    resp.status(200).json(await controller.find(req));
});

routes.post('/', async (req, resp) => {
    const controller = new Controller();
    resp.status(200).json(await controller.insert(req));
});

routes.put('/', async (req, resp) => {
    const controller = new Controller();
    resp.status(200).json(await controller.update(req));
});

routes.delete('/:id', async (req, resp) => {
    const controller = new Controller();
    resp.status(200).json(await controller.delete(req));
});


module.exports = routes;