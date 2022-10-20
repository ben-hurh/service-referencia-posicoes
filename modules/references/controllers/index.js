const { v4: uuidv4 } = require('uuid');
const ReferencesModel = require('../../../shared/models/references');
const PositionsReferencesService = require('../../../shared/services/positionsReferences');

<<<<<<< HEAD
class Controller {
	constructor() {
		this.referencesModel = new ReferencesModel();
	}

	async all(req) {
=======
class Controller{
	constructor(){
		this.referencesModel = new ReferencesModel();
	}

	async all(req){
>>>>>>> upstream/master
		const positionsReferencesService = new PositionsReferencesService();
		return await positionsReferencesService.all();
	}

<<<<<<< HEAD
	async show(req) {
=======
	async show(req){
>>>>>>> upstream/master
		this.referencesModel.id = req.params.id;
		this.referencesModel.active = true;
		const positionsReferencesService = new PositionsReferencesService();
		return await positionsReferencesService.show(this.referencesModel);
	}

<<<<<<< HEAD
	async insert(req) {
		const { id_local, name, latitude, longitude, uf, id_customer, city } = req.body;
		this.referencesModel.id = uuidv4()
=======
	async insert(req){
		const { id_local, name, latitude, longitude, uf, id_customer } = req.body;
		this.referencesModel.id =	uuidv4()
>>>>>>> upstream/master
		this.referencesModel.id_local = id_local;
		this.referencesModel.name = name;
		this.referencesModel.latitude = latitude;
		this.referencesModel.longitude = longitude;
		this.referencesModel.uf = uf;
		this.referencesModel.id_customer = id_customer;
<<<<<<< HEAD
		this.referencesModel.created_at = new Date(); new Date();
		this.referencesModel.updated_at = new Date();
		this.referencesModel.active = true;
		this.referencesModel.city = city;
=======
		this.referencesModel.created_at = new Date();new Date();
		this.referencesModel.updated_at = new Date();
		this.referencesModel.active = true;
>>>>>>> upstream/master
		const positionsReferencesService = new PositionsReferencesService();
		return await positionsReferencesService.insert(this.referencesModel);
	}

<<<<<<< HEAD
	async update(req) {
		const { id, id_local, name, latitude, longitude, uf, id_customer, city } = req.body;
=======
	async update(req){
		const { id, id_local, name, latitude, longitude, uf, id_customer } = req.body;
>>>>>>> upstream/master
		req.params.id = id;
		const register = await this.show(req);
		this.referencesModel.id = id;
		this.referencesModel.id_local = id_local;
		this.referencesModel.name = name;
		this.referencesModel.latitude = latitude;
		this.referencesModel.longitude = longitude;
		this.referencesModel.uf = uf;
		this.referencesModel.id_customer = id_customer;
		this.referencesModel.created_at = register.created_at;
		this.referencesModel.updated_at = new Date();
		this.referencesModel.active = true;
<<<<<<< HEAD
		this.referencesModel.city = city;
=======
>>>>>>> upstream/master
		const positionsReferencesService = new PositionsReferencesService();
		return await positionsReferencesService.update(this.referencesModel);
	}

<<<<<<< HEAD
	async delete(req) {
		const register = await this.show(req);
		const { id, id_local, name, latitude, longitude, uf, id_customer, city } = register;
=======
	async delete(req){
		const register = await this.show(req);
		const { id, id_local, name, latitude, longitude, uf, id_customer } = register;
>>>>>>> upstream/master
		this.referencesModel.id = id;
		this.referencesModel.id_local = id_local;
		this.referencesModel.name = name;
		this.referencesModel.latitude = latitude;
		this.referencesModel.longitude = longitude;
		this.referencesModel.uf = uf;
		this.referencesModel.id_customer = id_customer;
		this.referencesModel.created_at = register.created_at;
		this.referencesModel.updated_at = new Date();
		this.referencesModel.active = false;
<<<<<<< HEAD
		this.referencesModel.city = city;
=======
>>>>>>> upstream/master
		const positionsReferencesService = new PositionsReferencesService();
		return await positionsReferencesService.delete(this.referencesModel);
	}

<<<<<<< HEAD
	async find(req) {
=======
	async find(req){
>>>>>>> upstream/master
		const { latitude, longitude, id_customer } = req.body
		this.referencesModel.latitude = latitude;
		this.referencesModel.longitude = longitude;
		this.referencesModel.id_customer = id_customer;
		const positionsReferencesService = new PositionsReferencesService();
		return await positionsReferencesService.find(this.referencesModel);
	}
}

module.exports = Controller